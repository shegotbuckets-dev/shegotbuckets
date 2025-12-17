import { EventBasicInfo } from "@/app/dashboard/types";
import { useToast } from "@/components/ui/use-toast";

import { useCallback, useState } from "react";

import { useUser } from "@clerk/nextjs";

interface UseJoinTeamProps {
    event: EventBasicInfo;
    onSuccess: () => void;
}

export const useJoinTeam = ({ event, onSuccess }: UseJoinTeamProps) => {
    const { user } = useUser();
    const { toast } = useToast();
    const [registrationId, setRegistrationId] = useState<string>("");
    const [jerseyNumber, setJerseyNumber] = useState<string>("");
    const [isJoining, setIsJoining] = useState(false);
    const [open, setOpen] = useState(false);

    const handleJoin = async () => {
        try {
            setIsJoining(true);

            if (!registrationId || !jerseyNumber) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description:
                        "Please enter registration ID and jersey number",
                });
                return;
            }

            if (registrationId.trim().length != 8) {
                toast({
                    variant: "destructive",
                    title: "Invalid Registration ID",
                    description:
                        "Registration ID must be a 8 characters string",
                });
                return;
            }

            const jerseyNum = parseInt(jerseyNumber, 10);
            if (isNaN(jerseyNum) || jerseyNum < 0 || jerseyNum >= 100) {
                toast({
                    variant: "destructive",
                    title: "Invalid Jersey Number",
                    description: "Jersey number must be between 0 and 99",
                });
                return;
            }

            const userEmail = user?.emailAddresses[0]?.emailAddress;
            const userId = user?.id;
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

            const response = await fetch("/api/join-team", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    registration_id: registrationId.trim(),
                    event_id: event.original_event_id,
                    user_email: userEmail,
                    user_id: userId,
                    first_name: firstName,
                    last_name: lastName,
                    jersey_number: jerseyNum,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to join team");
            }

            toast({
                variant: "success",
                title: "Successfully Joined Team!",
                description: data.message,
            });

            resetForm();
            setOpen(false);
            onSuccess();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Join Failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred",
            });
        } finally {
            setIsJoining(false);
        }
    };

    const resetForm = useCallback(() => {
        setRegistrationId("");
        setJerseyNumber("");
    }, []);

    return {
        registrationId,
        setRegistrationId,
        jerseyNumber,
        setJerseyNumber,
        isJoining,
        open,
        setOpen,
        resetForm,
        handleJoin,
    };
};
