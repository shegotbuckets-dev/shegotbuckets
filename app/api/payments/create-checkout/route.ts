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
            registration_id, // Optional now - for existing registrations
            team_id,
            team_name,
            user_email,
            email,
            first_name,
            last_name,
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

        // Handle optional items based on hasTeam2
        let optional_items = undefined;

        if (stripe_price_ids.optional?.length) {
            if (hasTeam2) {
                // Pre-select the optional items in the cart with adjustable quantity
                stripe_price_ids.optional.forEach((priceId: string) => {
                    line_items.push({
                        price: priceId,
                        quantity: 1, // Pre-selected with quantity 1
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 0, // Can be removed
                            maximum: 10,
                        },
                    });
                });
            } else {
                // Show as suggested items only
                optional_items = stripe_price_ids.optional.map(
                    (priceId: string) => ({
                        price: priceId,
                        quantity: 1,
                    })
                );
            }
        }

        // Build metadata - include user info for new registrations
        const metadata: Record<string, string> = {
            event_id,
            team_id,
            team_name: team_name || "Unknown Team",
            user_email: user_email || email,
        };

        // Add registration_id if it exists (for multi-team registrations)
        if (registration_id) {
            metadata.registration_id = registration_id;
        }

        // Add user details for new registrations (when no registration_id)
        if (!registration_id && first_name && last_name) {
            metadata.first_name = first_name;
            metadata.last_name = last_name;
        }

        // Build success URL based on whether registration exists
        const successParams = new URLSearchParams({
            success: "true",
            event_id,
            team_id,
        });
        if (registration_id) {
            successParams.append("registration_id", registration_id);
        }

        const session = await stripe.checkout.sessions.create({
            line_items,
            ...(optional_items && { optional_items }),
            allow_promotion_codes: true,
            metadata,
            customer_email: email,
            mode: "payment",
            success_url: `${baseUrl}${successUrl}?${successParams.toString()}`,
            cancel_url: `${baseUrl}${cancelUrl}?canceled=true`,
            // payment_method_types: ["card", "us_bank_account"],
            payment_method_types: ["us_bank_account", "card"],
            billing_address_collection: "auto",
            // Custom text for checkout page
            custom_text: {
                submit: {
                    message: `Registration fee for SGB ${eventName} for team: ${team_name || "Unknown Team"}. Please enter your team name in the 'Full name' field. You will receive a confirmation email after payment.`,
                },
            },
            // Tax settings
            automatic_tax: {
                enabled: false,
            },
            // Description that appears on receipts and invoices
            payment_intent_data: {
                description: `SGB Tournament Registration - ${eventName} - Team: ${team_name || "Unknown Team"}`,
                statement_descriptor: "SGB TOURNAMENT",
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        return NextResponse.json(
            {
                error: "Error creating checkout session",
                details:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
