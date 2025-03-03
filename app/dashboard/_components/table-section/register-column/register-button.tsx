"use client";

import { useRegisterForm } from "@/app/dashboard/_hooks/useRegisterForm";
import { RegisterButtonProps, TeamOption } from "@/app/dashboard/types";
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
import { Database } from "@/constants/supabase";
import { fetchFromTable } from "@/utils/actions/supabase";

import { useEffect, useState } from "react";

import { EventDetails } from "./event-details";
import { RosterUploadArea } from "./roster-upload-area";

export const RegisterButton = ({
    event,
    onButtonSuccess,
}: RegisterButtonProps) => {
    const [teams, setTeams] = useState<TeamOption[]>([]);
    const [registrations, setRegistrations] = useState<
        Database["public"]["Tables"]["event_registrations"]["Row"][]
    >([]);
    const [loading, setLoading] = useState(false);

    const {
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
    } = useRegisterForm({
        event,
        teams,
        registrations,
        onButtonSuccess,
    });

    // Fetch both teams and registrations when dialog opens
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [teamsData, registrationsData] = await Promise.all([
                    fetchFromTable("teams"),
                    fetchFromTable("event_registrations", {
                        eq: {
                            column: "event_id",
                            value: event.event_id,
                        },
                    }),
                ]);
                setTeams(teamsData);
                setRegistrations(registrationsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchData();
        }
    }, [open]);

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

            <DialogContent className="h-[80vh] max-w-[60rem] flex flex-col">
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

                <div className="flex flex-col flex-1">
                    <div className="mb-4">
                        <div className="text-sm font-bold mb-4">
                            Select your team and upload your roster to register
                            for this event.
                        </div>
                        <Select
                            onValueChange={setSelectedTeam}
                            value={selectedTeam}
                            disabled={loading}
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
                    </div>

                    <div className="flex-1 min-h-0 mb-4">
                        <RosterUploadArea
                            uploadedFile={uploadedFile}
                            parsedData={parsedData}
                            isRegistering={isRegistering}
                            onDrop={onDrop}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                            variant="outline"
                            onClick={resetForm}
                            disabled={
                                isRegistering ||
                                (!uploadedFile && !selectedTeam)
                            }
                        >
                            Clear
                        </Button>
                        <Button
                            onClick={handleConfirmRegistration}
                            disabled={
                                !selectedTeam ||
                                !uploadedFile ||
                                parsedData.length === 0 ||
                                isRegistering
                            }
                        >
                            {isRegistering
                                ? "Registering..."
                                : "Confirm Registration"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
