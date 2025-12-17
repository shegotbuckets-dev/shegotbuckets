"use client";

import { useRegisterTeam } from "@/app/dashboard/_hooks/useRegisterTeam";
import { EventBasicInfo, TeamOption } from "@/app/dashboard/types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { fetchFromTable } from "@/utils/actions/supabase";

import { useEffect, useState } from "react";

import { EventDetails } from "./event-details";

interface RegisterTeamButtonProps {
    event: EventBasicInfo;
    onButtonSuccess: () => void;
}

export const RegisterTeamButton = ({
    event,
    onButtonSuccess,
}: RegisterTeamButtonProps) => {
    const { toast } = useToast();
    const [teams, setTeams] = useState<TeamOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasTeam2, setHasTeam2] = useState(false);
    const [isCreatingTeam, setIsCreatingTeam] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [createTeamError, setCreateTeamError] = useState<string | null>(null);
    const [isCreatingInProgress, setIsCreatingInProgress] = useState(false);

    const {
        selectedTeam,
        setSelectedTeam,
        isRegistering,
        open,
        setOpen,
        resetForm,
        handleRegister,
    } = useRegisterTeam({
        event,
        teams,
        hasTeam2,
        onSuccess: onButtonSuccess,
    });

    // Fetch teams when dialog opens
    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            try {
                const teamsData = await fetchFromTable("teams", {
                    eq: {
                        column: "league_id",
                        value: event.league_id ?? "",
                    },
                });
                setTeams(teamsData);
            } catch (error) {
                console.error("Error fetching teams:", error);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchTeams();
        }
    }, [open, event.league_id]);

    const handleCreateTeam = async () => {
        // Reset error
        setCreateTeamError(null);

        // Validate team name
        const trimmedName = newTeamName.trim();
        if (!trimmedName) {
            setCreateTeamError("Team name is required");
            return;
        }

        if (trimmedName.length > 100) {
            setCreateTeamError("Team name must be 100 characters or less");
            return;
        }

        // Check for duplicate locally (case-insensitive)
        const duplicate = teams.find(
            (t) => t.name.toLowerCase() === trimmedName.toLowerCase()
        );
        if (duplicate) {
            setCreateTeamError(
                "A team with this name already exists in this league"
            );
            return;
        }

        setIsCreatingInProgress(true);
        try {
            const response = await fetch("/api/teams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: trimmedName,
                    league_id: event.league_id,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error || "Failed to create team";
                setCreateTeamError(errorMessage);
                toast({
                    variant: "destructive",
                    title: "Failed to create team",
                    description: errorMessage,
                });
                return;
            }

            // Add new team to the list
            const newTeam: TeamOption = {
                team_id: data.team_id,
                name: data.name,
            };
            setTeams([...teams, newTeam]);

            // Auto-select the new team
            setSelectedTeam(newTeam.name);

            // Show success toast
            toast({
                variant: "success",
                title: "Team created successfully",
                description: `"${newTeam.name}" has been added to the team list.`,
            });

            // Exit creation mode
            setIsCreatingTeam(false);
            setNewTeamName("");
            setCreateTeamError(null);
        } catch (error) {
            console.error("Error creating team:", error);
            const errorMessage =
                "An unexpected error occurred. Please try again.";
            setCreateTeamError(errorMessage);
            toast({
                variant: "destructive",
                title: "Error creating team",
                description: errorMessage,
            });
        } finally {
            setIsCreatingInProgress(false);
        }
    };

    const handleCancelCreate = () => {
        setIsCreatingTeam(false);
        setNewTeamName("");
        setCreateTeamError(null);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => {
                if (!open) {
                    resetForm();
                    handleCancelCreate();
                }
                setOpen(open);
            }}
        >
            <DialogTrigger asChild>
                <span>Register</span>
            </DialogTrigger>

            <DialogContent className="max-w-[95vw] sm:max-w-[40rem]">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Register for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {event.title_short ?? event.title}
                        </span>
                    </DialogTitle>
                    <div className="space-y-4 pt-2">
                        <Separator />
                        <DialogDescription asChild>
                            <EventDetails
                                date={event.date ?? "TBD"}
                                location={event.location ?? "TBD"}
                                price={event.price ?? "TBD"}
                                hasTeam2={hasTeam2}
                                setHasTeam2={setHasTeam2}
                                leagueId={event.league_id}
                            />
                        </DialogDescription>
                        <Separator />
                    </div>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="text-sm font-medium">
                        {isCreatingTeam
                            ? "Create a new team"
                            : "Select your team to register for this event"}
                    </div>

                    {!isCreatingTeam ? (
                        <>
                            <Select
                                onValueChange={setSelectedTeam}
                                value={selectedTeam}
                                disabled={loading || isRegistering}
                            >
                                <SelectTrigger autoFocus={false}>
                                    <SelectValue
                                        placeholder={
                                            loading
                                                ? "Loading teams..."
                                                : "Select team"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {teams
                                        .sort((a, b) =>
                                            a.name.localeCompare(b.name)
                                        )
                                        .map((team) => (
                                            <SelectItem
                                                key={team.team_id}
                                                value={team.name}
                                            >
                                                {team.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                onClick={() => setIsCreatingTeam(true)}
                                disabled={loading || isRegistering}
                                className="w-full"
                            >
                                + Create New Team
                            </Button>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <Input
                                placeholder="Enter team name (e.g., Lakers, Warriors)"
                                value={newTeamName}
                                onChange={(e) => setNewTeamName(e.target.value)}
                                disabled={isCreatingInProgress}
                                autoFocus
                            />
                            {createTeamError && (
                                <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                                    {createTeamError}
                                </p>
                            )}
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleCreateTeam}
                                    disabled={isCreatingInProgress}
                                    className="flex-1"
                                >
                                    {isCreatingInProgress
                                        ? "Creating..."
                                        : "Create Team"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleCancelCreate}
                                    disabled={isCreatingInProgress}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-950 p-3 rounded border border-amber-200 dark:border-amber-800">
                            <p className="font-semibold mb-1 text-amber-900 dark:text-amber-100">
                                Payment Required
                            </p>
                            <p className="mb-2">
                                Registration requires immediate payment of{" "}
                                <span className="font-bold text-amber-900 dark:text-amber-100">
                                    {event.price ?? "TBD"}
                                </span>
                            </p>
                            <p className="text-xs">
                                You&apos;ll be redirected to secure payment
                                after clicking &quot;Register & Pay&quot;
                            </p>
                        </div>

                        <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950 p-3 rounded">
                            <p className="font-semibold mb-1">
                                What happens next?
                            </p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>
                                    You&apos;ll be redirected to complete
                                    payment
                                </li>
                                <li>
                                    After payment, you&apos;ll receive a
                                    Registration ID
                                </li>
                                <li>
                                    You can then add players, sign waivers, and
                                    edit roster
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => {
                            resetForm();
                            setOpen(false);
                        }}
                        disabled={isRegistering}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleRegister}
                        disabled={!selectedTeam || isRegistering || loading}
                    >
                        {isRegistering ? "Processing..." : "Register & Pay"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
