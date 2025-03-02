import { endpointSecret, stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase-admin";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { Stripe } from "stripe";

function generateUUID(): string {
    return crypto.randomUUID();
}

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("stripe-signature")!;

    let event: Stripe.Event;
    try {
        event = await stripe.webhooks.constructEventAsync(
            body,
            signature,
            endpointSecret
        );
    } catch (err) {
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
        if (
            !session.metadata?.event_id ||
            !session.metadata?.registration_id ||
            !session.metadata?.team_id
        ) {
            return NextResponse.json(
                { error: "Missing required payment metadata" },
                { status: 400 }
            );
        }

        try {
            const supabase = await createAdminClient();

            const rpcParams = {
                p_payment_id: generateUUID(),
                p_event_id: session.metadata.event_id,
                p_registration_id: session.metadata.registration_id,
                p_team_id: session.metadata.team_id,
                p_amount: session.amount_total,
                p_currency: session.currency,
                p_metadata: {
                    stripe_session_id: session.id,
                    ...session.metadata,
                },
                p_user_email: session.customer_email,
            };

            const { error } = await supabase.rpc(
                "on_after_payment_succeed",
                rpcParams
            );

            if (error) {
                console.error("RPC error:", error); // Log the specific error
                throw error;
            }

            console.info(
                `Payment recorded successfully for event: ${session.metadata.event_id}`
            );
            return NextResponse.json({ status: "success" });
        } catch (error) {
            console.error("Webhook error details:", error); // Log the full error
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
