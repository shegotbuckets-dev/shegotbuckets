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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
    const [teams, setTeams] = useState<TeamOption[]>([]);
    const [loading, setLoading] = useState(false);

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

    return (
        <Dialog
            open={open}
            onOpenChange={(open) => {
                if (!open) {
                    resetForm();
                }
                setOpen(open);
            }}
        >
            <DialogTrigger asChild>
                <span>Register</span>
            </DialogTrigger>

            <DialogContent className="max-w-[40rem]">
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
                            />
                        </DialogDescription>
                        <Separator />
                    </div>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="text-sm font-medium">
                        Select your team to register for this event
                    </div>
                    <Select
                        onValueChange={setSelectedTeam}
                        value={selectedTeam}
                        disabled={loading || isRegistering}
                    >
                        <SelectTrigger autoFocus={false}>
                            <SelectValue
                                placeholder={
                                    loading ? "Loading teams..." : "Select team"
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {teams
                                .sort((a, b) => a.name.localeCompare(b.name))
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

                    <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950 p-3 rounded">
                        <p className="font-semibold mb-1">What happens next?</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>You&apos;ll be added to the team roster</li>
                            <li>
                                You&apos;ll receive a Registration ID to share
                                with teammates
                            </li>
                            <li>
                                You can add more players by editing the roster
                            </li>
                            <li>
                                Complete waiver signing and payment to finalize
                            </li>
                        </ul>
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
                        {isRegistering ? "Registering..." : "Register Team"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
