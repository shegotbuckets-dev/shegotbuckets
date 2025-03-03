import { stripe } from "@/lib/stripe";

import { NextResponse } from "next/server";

const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

const successUrl =
    process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL || "/dashboard/home";
const cancelUrl =
    process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL || "/dashboard/home";

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
            stripe_price_ids,
        } = await req.json();

        // Validate price IDs
        if (!stripe_price_ids?.required?.length) {
            return NextResponse.json(
                { error: "Invalid price configuration" },
                { status: 400 }
            );
        }

        // Create line items from required prices
        const line_items = stripe_price_ids.required.map((priceId: string) => ({
            price: priceId,
            quantity: 1,
        }));

        // Add optional prices if hasTeam2 is true
        if (hasTeam2 && stripe_price_ids.optional?.length) {
            stripe_price_ids.optional.forEach((priceId: string) => {
                line_items.push({
                    price: priceId,
                    quantity: 1,
                });
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
            success_url: `${baseUrl}${successUrl}?success=true`,
            cancel_url: `${baseUrl}${cancelUrl}?canceled=true`,
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
        return NextResponse.json(
            { error: "Error creating checkout session" + error },
            { status: 500 }
        );
    }
}
