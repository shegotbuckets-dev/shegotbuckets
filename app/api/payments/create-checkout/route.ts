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
            eventNameFull,
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

        // Calculate processing fee if enabled
        const processingFeeEnabled =
            process.env.STRIPE_PROCESSING_FEE_ENABLED === "true";

        let processingFee = 0;
        let processingFeeFormatted = "0.00";

        if (processingFeeEnabled) {
            // Fetch price amounts to calculate subtotal
            const priceAmounts = await Promise.all(
                stripe_price_ids.required.map(async (priceId: string) => {
                    const price = await stripe.prices.retrieve(priceId);
                    return price.unit_amount || 0;
                })
            );

            // Calculate subtotal in dollars
            const subtotalCents = priceAmounts.reduce(
                (sum, amount) => sum + amount,
                0
            );
            const subtotal = subtotalCents / 100;

            // Calculate processing fee using grossed-up formula
            // This ensures we pass 100% of Stripe's fees to the customer
            const feeRate = parseFloat(
                process.env.STRIPE_PROCESSING_FEE_RATE || "0.029"
            );
            const feeFixed = parseFloat(
                process.env.STRIPE_PROCESSING_FEE_FIXED || "0.30"
            );

            // Grossed-up formula: ((subtotal + fixed_fee) / (1 - rate)) - subtotal
            processingFee = (subtotal + feeFixed) / (1 - feeRate) - subtotal;

            // Round to 2 decimal places (standard for currency)
            processingFee = Math.round(processingFee * 100) / 100;
            processingFeeFormatted = processingFee.toFixed(2);

            // Create dynamic price for processing fee
            const feePrice = await stripe.prices.create({
                currency: "usd",
                unit_amount: Math.round(processingFee * 100), // Convert to cents
                product_data: {
                    name: `Payment Processing Fee ($${subtotal.toFixed(2)} × ${(feeRate * 100).toFixed(1)}% + $${feeFixed.toFixed(2)} = $${processingFeeFormatted})`,
                },
            });

            // Add processing fee to line items
            line_items.push({
                price: feePrice.id,
                quantity: 1,
            });
        }

        // Handle optional items - show as suggested items in checkout
        const optional_items = stripe_price_ids.optional?.length
            ? stripe_price_ids.optional.map((priceId: string) => ({
                  price: priceId,
                  quantity: 1,
              }))
            : undefined;

        // Build metadata - include user info for new registrations
        const metadata: Record<string, string> = {
            event_id,
            team_id,
            team_name: team_name || "Unknown Team",
            user_email: user_email || email,
            event_name_short: eventName,
            event_name_full: eventNameFull,
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

        // Add processing fee info to metadata for tracking
        if (processingFeeEnabled && processingFee > 0) {
            metadata.processing_fee = processingFeeFormatted;
            metadata.processing_fee_enabled = "true";
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
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            // Custom text for checkout page
            custom_text: {
                submit: {
                    message: processingFeeEnabled
                        ? `Registration fee for SGB ${eventName} for team: ${team_name || "Unknown Team"}. Includes $${processingFeeFormatted} payment processing fee.`
                        : `Registration fee for SGB ${eventName} for team: ${team_name || "Unknown Team"}.`,
                },
            },
            // Tax settings
            automatic_tax: {
                enabled: false,
            },
            // Description that appears on receipts and invoices
            payment_intent_data: {
                description: `SGB Tournament Registration - ${eventNameFull} - Team: ${team_name || "Unknown Team"}`,
                statement_descriptor: "She Got Buckets Inc",
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
