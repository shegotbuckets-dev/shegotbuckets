import { endpointSecret, stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";

import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { Stripe } from "stripe";

interface PaymentData {
    payment_id: string;
    event_id: string | undefined;
    registration_id: string | undefined;
    team_id: string | undefined;
    user_email: string | null;
    amount: number;
    currency: string;
    payment_status: boolean;
    metadata: {
        event_id?: string;
        registration_id?: string;
        team_id?: string;
        stripe_session_id: string;
    };
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json(
            {
                error: `Webhook verification failed: ${
                    err instanceof Error ? err.message : "Unknown error"
                }`,
            },
            { status: 400 }
        );
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        // Validate required metadata
        if (!session.metadata?.event_id || !session.metadata?.registration_id) {
            console.error(
                "Missing required metadata in session:",
                session.metadata
            );
            return NextResponse.json(
                { error: "Missing required payment metadata" },
                { status: 400 }
            );
        }

        try {
            const supabase = await createAdminClient();

            const paymentData: PaymentData = {
                payment_id: randomUUID(),
                event_id: session.metadata.event_id,
                registration_id: session.metadata.registration_id,
                team_id: session.metadata.team_id,
                user_email: session.customer_email,
                amount: session.amount_total ?? 0,
                currency: session.currency ?? "usd",
                payment_status: true,
                metadata: {
                    ...session.metadata,
                    stripe_session_id: session.id,
                },
            };

            const { data, error } = await supabase
                .from("event_payments")
                .insert(paymentData)
                .select();

            if (error) {
                console.error("Database error:", {
                    code: error.code,
                    message: error.message,
                });
                throw error;
            }

            console.info(
                `Payment recorded successfully for event: ${session.metadata.event_id}`
            );
            return NextResponse.json({ status: "success", data });
        } catch (error) {
            console.error("Payment recording failed:", error);
            return NextResponse.json(
                {
                    error: "Failed to record payment",
                    details:
                        error instanceof Error
                            ? error.message
                            : "Unknown error",
                },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ status: "success" });
}
