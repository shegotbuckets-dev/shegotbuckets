import { RegisterButtonProps, RosterData } from "@/app/dashboard/types";
import { useToast } from "@/components/ui/use-toast";

import { useCallback, useState } from "react";

import Papa from "papaparse";

export const useRegisterForm = ({
    event,
    teams,
    registrations,
    onButtonSuccess,
}: RegisterButtonProps) => {
    const { toast } = useToast();
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [open, setOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<RosterData[]>([]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            setUploadedFile(file);

            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setParsedData(results.data as RosterData[]);
                },
                error: (error) => {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: `Error parsing CSV: ${error.message}`,
                    });
                },
            });
        },
        [toast]
    );

    const handleConfirmRegistration = async () => {
        try {
            setIsRegistering(true);
            if (!selectedTeam || !uploadedFile) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description:
                        "Please select a team and upload a roster file",
                });
                return;
            }

            const emails = parsedData.map((player) =>
                player.email.toLowerCase()
            );
            const duplicateEmails = emails.filter(
                (email, index) => emails.indexOf(email) !== index
            );

            if (duplicateEmails.length > 0) {
                toast({
                    variant: "destructive",
                    title: "Duplicate Emails Found",
                    description: `Please remove duplicate entries for: ${duplicateEmails.join(", ")}`,
                });
                setIsRegistering(false);
                return;
            }

            const team = teams.find((t) => t.name === selectedTeam);
            if (!team?.team_id) return;

            const isTeamRegistered = registrations.some(
                (registration) =>
                    registration.team_id === team.team_id &&
                    registration.event_id === event.event_id
            );

            if (isTeamRegistered) {
                toast({
                    variant: "warning",
                    title: "Team Already Registered",
                    description: `${selectedTeam} is already registered for this event. Contact SGB IT support if you want to update your roster.`,
                });
                setIsRegistering(false);
                return;
            }

            const data = {
                event_id: event.event_id,
                team_id: team.team_id,
                players: parsedData.map((player) => ({
                    user_email: player.email,
                    first_name: player.first_name,
                    last_name: player.last_name,
                })),
            };

            const response = await fetch("/api/register-event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to register player");
            }

            toast({
                variant: "success",
                title: "Registration Successful",
                description:
                    "Team registered and roster uploaded successfully.",
            });

            resetForm();
            setOpen(false);
            onButtonSuccess();
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
        setUploadedFile(null);
        setParsedData([]);
    }, []);

    return {
        selectedTeam,
        setSelectedTeam,
        isRegistering,
        open,
        setOpen,
        uploadedFile,
        parsedData,
        onDrop,
        resetForm,
        handleConfirmRegistration,
    };
};
