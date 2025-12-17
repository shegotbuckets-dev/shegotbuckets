/* eslint-disable no-console */
import { StripePriceIds } from "@/app/dashboard/types";
import { createAdminClient } from "@/lib/supabase-admin";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get("email");
        const userId = searchParams.get("user_id"); // Optional - for future use

        if (!userEmail && !userId) {
            return NextResponse.json(
                { error: "User email or ID is required" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Use optimized RPC function
        const { data, error } = await supabase.rpc("get_user_dashboard_data", {
            p_user_id: userId || null,
            p_user_email: userEmail || null,
        });

        if (error) {
            console.error("RPC error:", error);
            throw error;
        }

        // Parse stripe_price_ids for each event
        const parseStripePriceIds = (priceIds: any): StripePriceIds | null => {
            if (!priceIds) return null;
            try {
                const parsed =
                    typeof priceIds === "string"
                        ? JSON.parse(priceIds)
                        : priceIds;

                if (parsed.required || parsed.optional) {
                    return {
                        required: Array.isArray(parsed.required)
                            ? parsed.required
                            : [],
                        optional: Array.isArray(parsed.optional)
                            ? parsed.optional
                            : [],
                    };
                }
            } catch (e) {
                console.error("Error parsing stripe_price_ids:", e);
            }
            return null;
        };

        const activeEvents = (data?.activeEvents || []).map((event: any) => ({
            ...event,
            stripe_price_ids: parseStripePriceIds(event.stripe_price_ids),
        }));

        const previousEvents = (data?.previousEvents || []).map(
            (event: any) => ({
                ...event,
                stripe_price_ids: parseStripePriceIds(event.stripe_price_ids),
            })
        );

        // Split active events into available and coming soon
        const availableEvents = activeEvents.filter((event: any) =>
            event.display_registration_status?.toLowerCase().startsWith("open")
        );

        const comingSoonEvents = activeEvents.filter(
            (event: any) =>
                !event.display_registration_status
                    ?.toLowerCase()
                    .startsWith("open")
        );

        return NextResponse.json({
            availableEvents,
            comingSoonEvents,
            previousEvents,
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}
