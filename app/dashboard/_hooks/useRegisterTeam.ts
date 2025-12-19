import {
    EventBasicInfo,
    PaymentRequestData,
    TeamOption,
} from "@/app/dashboard/types";
import { useToast } from "@/components/ui/use-toast";

import { useCallback, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { Stripe, loadStripe } from "@stripe/stripe-js";

// Lazy load Stripe with error handling
let stripePromise: Promise<Stripe | null> | null = null;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        ).catch((error) => {
            console.error("Failed to load Stripe.js:", error);
            stripePromise = null; // Reset so it can retry
            throw new Error("Failed to load payment system. Please try again.");
        });
    }
    return stripePromise;
};

interface UseRegisterTeamProps {
    event: EventBasicInfo;
    teams: TeamOption[];
    onSuccess: () => void;
}

export const useRegisterTeam = ({
    event,
    teams,
    onSuccess,
}: UseRegisterTeamProps) => {
    const { user } = useUser();
    const { toast } = useToast();
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [open, setOpen] = useState(false);

    const handleRegister = async () => {
        try {
            setIsRegistering(true);

            if (!selectedTeam) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Please select a team",
                });
                return;
            }

            const team = teams.find((t) => t.name === selectedTeam);
            if (!team?.team_id) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Invalid team selection",
                });
                return;
            }

            const userEmail = user?.emailAddresses[0]?.emailAddress;
            const firstName = user?.firstName;
            const lastName = user?.lastName;

            if (!userEmail || !firstName || !lastName) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description:
                        "User information not found. Please try logging in again.",
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

            // Go straight to payment - registration will be created on payment success
            const paymentData: PaymentRequestData = {
                event_id: event.original_event_id,
                team_id: team.team_id,
                team_name: team.name,
                user_email: userEmail,
                email: userEmail,
                first_name: firstName,
                last_name: lastName,
                eventName: `${event.title_short ?? event.title} - ${event.subtitle}`,
                stripe_price_ids: event.stripe_price_ids,
            };

            // Create checkout session
            const paymentResponse = await fetch(
                "/api/payments/create-checkout",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(paymentData),
                }
            );

            const { sessionId, error: paymentError } =
                await paymentResponse.json();
            if (paymentError) {
                toast({
                    variant: "destructive",
                    title: "Payment Error",
                    description: paymentError,
                });
                setIsRegistering(false);
                return;
            }

            // Close dialog before redirecting
            resetForm();
            setOpen(false);

            // Redirect to Stripe checkout
            const stripe = await getStripe();
            if (!stripe) {
                throw new Error("Failed to initialize payment system");
            }
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error("Payment error:", error);
            toast({
                variant: "destructive",
                title: "Payment Error",
                description:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred",
            });
        } finally {
            setIsRegistering(false);
        }
    };

    const resetForm = useCallback(() => {
        setSelectedTeam("");
    }, []);

    return {
        selectedTeam,
        setSelectedTeam,
        isRegistering,
        open,
        setOpen,
        resetForm,
        handleRegister,
    };
};
