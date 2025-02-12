import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase-server";

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
            price,
            email,
            eventName,
        } = await req.json();

        // Ensure price is a valid number
        const unitAmount = Math.round(
            typeof price === "string" ? parseFloat(price) : price
        );

        // Validate the amount
        if (isNaN(unitAmount)) {
            return NextResponse.json(
                { error: "Invalid price amount" },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: eventName,
                        },
                        unit_amount: unitAmount, // This will be in cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                event_id,
                registration_id,
                team_id,
                user_email,
            },
            customer_email: email,
            mode: "payment",
            success_url: `${baseUrl}/dashboard?success=true&event_id=${event_id}`,
            cancel_url: `${baseUrl}/dashboard?canceled=true`,
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
