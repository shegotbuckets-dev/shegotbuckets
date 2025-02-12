"use client";

import {
    BADGE_TEXT,
    EventTableData,
    STATUS_BADGE_CLASSNAME,
    STATUS_BADGE_CLASSNAME_CLICKABLE,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";

import { PaymentButton } from "./payment-button";

interface PaymentCellProps {
    event: EventTableData;
    onButtonSuccess?: () => void;
}

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function PaymentCell({ event, onButtonSuccess }: PaymentCellProps) {
    const { user } = useUser();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            const email = user?.emailAddresses[0]?.emailAddress;
            if (!email) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "No user email found",
                });
                return;
            }

            if (event.price_number === -1) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "No price found",
                });
                return;
            }

            const response = await fetch("/api/payments/create-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event_id: event.event_id,
                    registration_id: event.registration_id,
                    team_id: event.team_id,
                    user_email: event.user_email,
                    price: event.price_number,
                    email,
                    eventName: event.name,
                }),
            });

            const { sessionId, error } = await response.json();
            if (error) throw new Error(error);

            const stripe = await stripePromise;
            const { error: redirectError } =
                (await stripe?.redirectToCheckout({ sessionId })) ?? {};
            if (redirectError) throw redirectError;

            await onButtonSuccess?.();
        } catch (error) {
            console.error("Payment error:", error);
            toast({
                variant: "destructive",
                title: "Payment Error",
                description: "Failed to process payment",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!event.registered) {
        return (
            <Badge variant="secondary" className={STATUS_BADGE_CLASSNAME}>
                {BADGE_TEXT.NA}
            </Badge>
        );
    }

    return event.paymentStatus ? (
        <Badge variant="green" className={STATUS_BADGE_CLASSNAME}>
            Paid
        </Badge>
    ) : (
        <Badge
            variant={event.paymentStatus ? "green" : "pending"}
            className={STATUS_BADGE_CLASSNAME_CLICKABLE}
        >
            <PaymentButton
                event={event}
                paymentStatus={event.paymentStatus}
                onPaymentClick={handlePayment}
                isLoading={isLoading}
            />
        </Badge>
    );
}
