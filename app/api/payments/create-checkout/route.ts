import { stripe } from "@/lib/stripe";

import { NextResponse } from "next/server";

const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

export async function POST(req: Request) {
    try {
        const {
            event_id,
            registration_id,
            team_id,
            user_email,
            email,
            eventName,
            hasTeam2,
        } = await req.json();

        const line_items = [
            {
                price: "price_1QrTB3KcXW8i0WF4S1Pv94uW",
                quantity: 1,
            },
        ];

        // Add team 2 fee if selected
        if (hasTeam2) {
            line_items.push({
                price: "price_1QrTCIKcXW8i0WF4aVmz6zmd",
                quantity: 1,
            });
        }

        const session = await stripe.checkout.sessions.create({
            line_items,
            allow_promotion_codes: true,
            metadata: {
                event_id,
                registration_id,
                team_id,
                user_email,
            },
            customer_email: email,
            mode: "payment",
            success_url: `${baseUrl}/dashboard?success=true&event_id=${event_id}&t=${Date.now()}`,
            cancel_url: `${baseUrl}/dashboard?canceled=true`,
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            // Custom text for checkout page
            custom_text: {
                submit: {
                    message: `Registration fee for SGB ${eventName}. You will receive a confirmation email after payment.`,
                },
            },
            // Tax settings
            automatic_tax: {
                enabled: true,
            },
            // Description that appears on receipts and invoices
            payment_intent_data: {
                description: `SGB Tournament Registration - ${eventName}`,
                statement_descriptor: "SGB TOURNAMENT",
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        return NextResponse.json(
            { error: "Error creating checkout session" },
            { status: 500 }
        );
    }
}
