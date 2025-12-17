import { createAdminClient } from "@/lib/supabase-admin";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get("event_id");
        const teamId = searchParams.get("team_id");

        if (!eventId || !teamId) {
            return NextResponse.json(
                { error: "Missing event_id or team_id" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Get the latest registration for this event and team
        const { data, error } = await supabase
            .from("event_registrations")
            .select("registration_id, paid")
            .eq("event_id", eventId)
            .eq("team_id", teamId)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return NextResponse.json(
                    { error: "Registration not found" },
                    { status: 404 }
                );
            }
            throw error;
        }

        return NextResponse.json({
            registration_id: data.registration_id,
            paid: data.paid,
        });
    } catch (error) {
        console.error("Error fetching registration:", error);
        return NextResponse.json(
            {
                error: "Failed to fetch registration",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
