import { RosterData, UseRegisterFormProps } from "@/app/dashboard/types";
import { useToast } from "@/components/ui/use-toast";
import { isValidEmail } from "@/lib/utils";

import { useCallback, useState } from "react";

import Papa from "papaparse";

export const useRegisterForm = ({
    event,
    teams,
    registrations,
    onButtonSuccess,
}: UseRegisterFormProps) => {
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

    const verifyRosterData = (parsedData: RosterData[]): boolean => {
        // Validate required columns exist
        const requiredColumns = [
            "legal_first_name",
            "legal_last_name",
            "email",
            "jersey_number",
        ];

        if (parsedData.length < 5) {
            toast({
                variant: "destructive",
                title: "Invalid roster size",
                description:
                    "Please make sure all players in the roster. You should have at least 5 players for the team",
            });
            return false;
        }

        const missingColumns = requiredColumns.filter(
            (column) => !Object.keys(parsedData[0] || {}).includes(column)
        );

        if (missingColumns.length > 0) {
            toast({
                variant: "destructive",
                title: "Invalid CSV Format",
                description: `Missing required columns: ${missingColumns.join(", ")}. Please use the template provided.`,
            });
            return false;
        }

        // Convert all emails to lowercase for consistent validation
        const emails = parsedData.map((player) =>
            player.email.trim().toLowerCase()
        );

        // Validate email format for all players
        // Checks if each email follows a valid email pattern (e.g., user@domain.com)
        const invalidEmails = emails.filter((email) => !isValidEmail(email));
        if (invalidEmails.length > 0) {
            toast({
                variant: "destructive",
                title: "Invalid Email",
                description: `Please correct the following invalid email entries: ${invalidEmails.join(", ")}`,
            });
            return false;
        }

        // Check for duplicate email addresses
        // Ensures each player has a unique email address in the roster
        const duplicateEmails = emails.filter(
            (email, index) => emails.indexOf(email) !== index
        );
        if (duplicateEmails.length > 0) {
            toast({
                variant: "destructive",
                title: "Duplicate Emails Found",
                description: `Please remove duplicate email entries for: ${duplicateEmails.join(", ")}`,
            });
            return false;
        }

        // Extract jersey numbers for validation
        const jerseyNumbers = parsedData.map((player) => player.jersey_number);

        // Check for duplicate jersey numbers within the team
        // Ensures each player has a unique jersey number
        const duplicateJerseyNumbers = jerseyNumbers.filter(
            (jerseyNumber, index) =>
                jerseyNumbers.indexOf(jerseyNumber) !== index
        );
        if (duplicateJerseyNumbers.length > 0) {
            toast({
                variant: "destructive",
                title: "Duplicate Jersey Numbers Found",
                description: `Please remove duplicate jersey number entries for: ${duplicateJerseyNumbers.join(", ")}`,
            });
            return false;
        }

        // Validate that all jersey numbers are valid integers
        // Ensures jersey numbers can be properly stored and displayed
        const invalidJerseyNumbers = parsedData.filter((player) =>
            isNaN(parseInt(player.jersey_number, 10))
        );
        if (invalidJerseyNumbers.length > 0) {
            toast({
                variant: "destructive",
                title: "Invalid Jersey Numbers",
                description: "All jersey numbers must be valid integers",
            });
            return false;
        }

        return true;
    };

    const handleConfirmRegistration = async () => {
        try {
            setIsRegistering(true);

            // Validate basic form requirements
            // Ensures team is selected and roster file is uploaded
            if (!selectedTeam || !uploadedFile) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description:
                        "Please select a team and upload a roster file",
                });
                return;
            }

            // Validate roster data format and content
            if (!verifyRosterData(parsedData)) {
                setIsRegistering(false);
                return;
            }

            const team = teams.find((t) => t.name === selectedTeam);
            if (!team?.team_id) return;

            // Check if team is already registered for this event
            // Prevents duplicate team registrations
            const isTeamRegistered = registrations.some(
                (registration) => registration.team_id === team.team_id
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

            // Prepare registration data
            // Normalize email addresses and convert jersey numbers to integers
            const data = {
                event_id: event.event_id,
                team_id: team.team_id,
                players: parsedData.map((player) => ({
                    user_email: player.email.trim().toLowerCase(),
                    first_name: player.legal_first_name,
                    last_name: player.legal_last_name,
                    jersey_number: parseInt(player.jersey_number, 10),
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
