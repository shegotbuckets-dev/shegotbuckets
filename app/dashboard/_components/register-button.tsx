"use client";

import { RegisterEventBody } from "@/app/api/register-event/route";
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
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/constants/supabase";
import { DashboardData } from "@/utils/hook/useDashboardData";

import { useState } from "react";

import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

import { EventTableData } from "./events-table";
import { RosterUpload } from "./roster-upload";

interface RegisterButtonProps {
    event: EventTableData;
    teams: Database["public"]["Tables"]["teams"]["Row"][];
    registrations: Database["public"]["Tables"]["registrations"]["Row"][];
    onButtonSuccess: () => void;
}

interface EventDetailsProps {
    date: string;
    location: string;
    price: string;
}

export interface RosterData {
    first_name: string;
    last_name: string;
    gmail: string;
    [key: string]: string;
}

const EventDetails = ({ date, location, price }: EventDetailsProps) => (
    <div className="text-sm text-foreground space-y-1">
        <div>
            <strong>Date:</strong> {date}
        </div>
        <div>
            <strong>Location:</strong> {location}
        </div>
        <div>
            <strong>Price:</strong> {price}
        </div>
    </div>
);

export function RegisterButton({
    event,
    teams,
    registrations,
    onButtonSuccess,
}: RegisterButtonProps) {
    const { toast } = useToast();
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [open, setOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<RosterData[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
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
    };

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

            // get the selected team information from dashboard data
            const team = teams.find((t) => t.name === selectedTeam);
            if (!team?.team_id) return;

            // check if the team is already registered for the event
            const isTeamRegistered = registrations.some(
                (registration) =>
                    registration.team_id === team.team_id &&
                    registration.event_id === event.event_id
            );

            // if the team is already registered, show a toast and block current registration
            if (isTeamRegistered) {
                toast({
                    variant: "warning",
                    title: "Team Already Registered",
                    description: `${selectedTeam} is already registered for this event.`,
                });
                setIsRegistering(false);
                return;
            }

            // register the team for the event
            const data: RegisterEventBody = {
                event_id: event.event_id,
                team_id: team.team_id,
                players: parsedData.map((player) => ({
                    user_email: player.gmail,
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

    const resetForm = () => {
        setSelectedTeam("");
        setUploadedFile(null);
        setParsedData([]);
    };

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
            <DialogContent className="sm:max-w-[600px] md:max-w-[700px] h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Register for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {event.name}
                        </span>
                    </DialogTitle>
                    <div className="space-y-4 pt-2">
                        <Separator />
                        <DialogDescription asChild>
                            <EventDetails
                                date={event.date}
                                location={event.location}
                                price={event.price}
                            />
                        </DialogDescription>
                        <Separator />
                    </div>
                </DialogHeader>

                <div className="flex flex-col flex-1 space-y-6">
                    <div className="space-y-4">
                        <div className="text-sm">
                            <strong>
                                Select your team and upload your roster to
                                register for this event.
                            </strong>
                        </div>

                        <Select
                            onValueChange={setSelectedTeam}
                            value={selectedTeam}
                        >
                            <SelectTrigger>
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

                    <RosterUpload
                        uploadedFile={uploadedFile}
                        parsedData={parsedData}
                        isRegistering={isRegistering}
                        onDrop={onDrop}
                    />

                    <div className="flex justify-end space-x-2">
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
}
