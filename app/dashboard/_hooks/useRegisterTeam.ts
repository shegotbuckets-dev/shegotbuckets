import { EventBasicInfo, TeamOption } from "@/app/dashboard/types";
import { useToast } from "@/components/ui/use-toast";

import { useCallback, useState } from "react";

import { useUser } from "@clerk/nextjs";

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

            const response = await fetch("/api/register-team", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event_id: event.original_event_id,
                    team_id: team.team_id,
                    user_email: userEmail,
                    first_name: firstName,
                    last_name: lastName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to register team");
            }

            // Show success with registration ID
            const registrationIdShort = data.registration_id
                ? data.registration_id.substring(0, 8)
                : "";

            resetForm();
            setOpen(false);

            // Show toast after dialog closes
            setTimeout(() => {
                toast({
                    variant: "success",
                    title: "Team Registered Successfully!",
                    description: `Registration ID: ${registrationIdShort}. Click to copy and share with teammates!`,
                    duration: 10000, // Show for 10 seconds
                    onClick: () => {
                        navigator.clipboard.writeText(registrationIdShort);
                        toast({
                            title: "Copied!",
                            description: "Registration ID copied to clipboard",
                        });
                    },
                });
            }, 100);

            onSuccess();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Registration Failed",
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
