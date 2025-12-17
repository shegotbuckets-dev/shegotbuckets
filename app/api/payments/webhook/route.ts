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
        // Validate required metadata (now without registration_id)
        if (
            !session.metadata?.event_id ||
            !session.metadata?.team_id ||
            !session.metadata?.user_email ||
            !session.metadata?.first_name ||
            !session.metadata?.last_name
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
                p_team_id: session.metadata.team_id,
                p_user_email: session.metadata.user_email,
                p_first_name: session.metadata.first_name,
                p_last_name: session.metadata.last_name,
                p_amount: session.amount_total,
                p_currency: session.currency,
                p_metadata: {
                    stripe_session_id: session.id,
                    ...session.metadata,
                },
            };

            const { data, error } = await supabase.rpc(
                "register_team_on_payment",
                rpcParams
            );

            if (error) {
                console.error("RPC error:", error);
                throw error;
            }

            // Check if registration was successful
            if (!data?.success) {
                console.error("Registration failed:", data?.error);
                return NextResponse.json(
                    {
                        error: data?.error || "Registration failed",
                        status: data?.status || 500,
                    },
                    { status: data?.status || 500 }
                );
            }

            console.info(
                `Team registered and payment recorded successfully for event: ${session.metadata.event_id}, registration: ${data.registration_id}`
            );
            return NextResponse.json({
                status: "success",
                registration_id: data.registration_id,
            });
        } catch (error) {
            console.error("Webhook error details:", error);
            return NextResponse.json(
                {
                    error: "Failed to process payment and registration",
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
