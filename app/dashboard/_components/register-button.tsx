"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/constants/supabase";
import { insertMultipleRowsToTable } from "@/utils/actions/supabase";

import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

export function RegisterButton({
    event,
    teams,
}: {
    event: Database["public"]["Tables"]["events"]["Row"];
    teams: Database["public"]["Tables"]["teams"]["Row"][];
}) {
    const { toast } = useToast();
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [open, setOpen] = useState(false);

    const handleConfirmRegistration = async () => {
        if (selectedTeam) {
            try {
                const registration_id = uuidv4();
                const team_id = teams.find(
                    (t) => t.name === selectedTeam
                )?.team_id;

                if (!team_id) {
                    throw new Error("Team not found from database");
                }

                const regData = {
                    registration_id: registration_id,
                    event_id: event.event_id,
                    team_id: team_id,
                    created_at: new Date().toISOString(),
                };
                await insertMultipleRowsToTable("registrations", [regData]);

                setIsRegistered(true);
                setOpen(false);
                toast({
                    title: "Success",
                    description:
                        "Team registered successfully, go back to the dashboard and upload your roster for next step.",
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `Error registering ${selectedTeam} to ${event.title_short ?? event.title}: ${error}`,
                });
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={isRegistered ? "secondary" : "action"}
                    className={
                        isRegistered ? "cursor-not-allowed" : "cursor-pointer"
                    }
                    disabled={isRegistered}
                >
                    {isRegistered ? "Registered" : "Register"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Register for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {event.title_short ?? event.title}
                        </span>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className="mt-4 space-y-2">
                            <div>
                                <strong>Date:</strong> {event.date || "N/A"}
                            </div>
                            <div>
                                <strong>Location:</strong>{" "}
                                {event.location || "N/A"}
                            </div>
                            <div>
                                <strong>Price:</strong> {event.price || "N/A"}
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div className="text-foreground">
                    Select your team and upload your roster to register for this
                    event.
                </div>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Select onValueChange={setSelectedTeam}>
                            <SelectTrigger className="col-span-4">
                                <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                                {teams.map((team) => (
                                    <SelectItem
                                        key={team.team_id}
                                        value={team.name}
                                    >
                                        {team.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                    <Button
                        onClick={handleConfirmRegistration}
                        disabled={!selectedTeam}
                    >
                        Confirm Registration
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
