"use client";

import {
    BADGE_TEXT,
    BaseCellProps,
    PaymentRequestData,
    STATUS_BADGE_CLASSNAME,
    STATUS_BADGE_CLASSNAME_CLICKABLE,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";

import { PaymentButton } from "./payment-button";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export const PaymentCell = ({ event }: BaseCellProps) => {
    const { user } = useUser();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async (hasTeam2: boolean) => {
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

            if (!event.stripe_price_ids) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Event pricing information not found",
                });
                return;
            }

            const paymentData: PaymentRequestData = {
                event_id: event.event_id,
                registration_id: event.userStatus.registration_id,
                email,
                eventName: `${event.title_short ?? event.title} - ${event.subtitle}`,
                hasTeam2,
                stripe_price_ids: event.stripe_price_ids,
            };

            const response = await fetch("/api/payments/create-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData),
            });

            const { sessionId, error } = await response.json();
            if (error) throw new Error(error);

            const stripe = await stripePromise;
            await stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error("Payment error:", error);
            toast({
                variant: "destructive",
                title: "Payment Error",
                description: "Failed to process payment",
            });
            setIsLoading(false);
        }
    };

    if (!event.userStatus.isRegistered) {
        return (
            <Badge variant="secondary" className={STATUS_BADGE_CLASSNAME}>
                {BADGE_TEXT.NA}
            </Badge>
        );
    }

    return event.userStatus.paymentStatus ? (
        <Badge variant="green" className={STATUS_BADGE_CLASSNAME}>
            Paid
        </Badge>
    ) : (
        <Badge variant="pending" className={STATUS_BADGE_CLASSNAME_CLICKABLE}>
            <PaymentButton
                event={event}
                paymentStatus={event.userStatus.paymentStatus}
                onPaymentClick={handlePayment}
                isLoading={isLoading}
            />
        </Badge>
    );
};
