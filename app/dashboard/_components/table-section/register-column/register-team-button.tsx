"use client";

import { useRegisterTeam } from "@/app/dashboard/_hooks/useRegisterTeam";
import { EventBasicInfo, TeamOption } from "@/app/dashboard/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
    const [hasTeam2, setHasTeam2] = useState(false);

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

                        {/* Team 2 Checkbox */}
                        {event.league_id !==
                            "b4c3c012-ad36-48ac-a60c-8c1264f707b9" && (
                            <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-900 rounded">
                                <Checkbox
                                    id="team2-register"
                                    checked={hasTeam2}
                                    onCheckedChange={(checked) =>
                                        setHasTeam2(!!checked)
                                    }
                                />
                                <label
                                    htmlFor="team2-register"
                                    className="text-sm cursor-pointer"
                                >
                                    I have a team 2 to participate
                                </label>
                            </div>
                        )}

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
