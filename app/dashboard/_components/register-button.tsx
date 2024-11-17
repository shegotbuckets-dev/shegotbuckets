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
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/constants/supabase";
import { insertMultipleRowsToTable } from "@/utils/actions/supabase";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

import { EventTableData } from "./events-table";

interface RegisterButtonProps {
    event: EventTableData;
    teams: Database["public"]["Tables"]["teams"]["Row"][];
    eventRegistrations: Database["public"]["Tables"]["registrations"]["Row"][];
}

interface EventDetailsProps {
    date: string;
    location: string;
    price: string;
}

interface RosterData {
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
    eventRegistrations,
}: RegisterButtonProps) {
    const { toast } = useToast();
    const [selectedTeam, setSelectedTeam] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [open, setOpen] = useState(false);

    // Add new states for roster upload
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

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "text/csv": [".csv"],
        },
        multiple: false,
        disabled: isRegistering,
    });

    const renderPreviewTable = () => {
        if (!parsedData.length) return null;

        const columns = Object.keys(parsedData[0]);

        return (
            <div className="overflow-auto max-h-[400px] mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column} className="text-center">
                                    {column}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {parsedData.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column}
                                        className="text-center"
                                    >
                                        {row[column]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    };

    const handleConfirmRegistration = async () => {
        if (!selectedTeam || !uploadedFile) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please select a team and upload a roster file",
            });
            return;
        }

        setIsRegistering(true);
        const team = teams.find((t) => t.name === selectedTeam);
        if (!team?.team_id) return;

        const isTeamRegistered = eventRegistrations.some(
            (registration) => registration.team_id === team.team_id
        );

        if (isTeamRegistered) {
            toast({
                variant: "warning",
                title: "Team Already Registered",
                description: `${selectedTeam} is already registered for this event.`,
            });
            setIsRegistering(false);
            return;
        }

        try {
            const registrationData = {
                registration_id: uuidv4(),
                event_id: event.id,
                team_id: team.team_id,
                created_at: new Date().toISOString(),
            };

            await insertMultipleRowsToTable("registrations", [
                registrationData,
            ]);

            // Here you can add the roster upload logic
            // const regPlayers = parsedData.map((row) => ({
            //     registration_id: registrationData.registration_id,
            //     first_name: row.first_name,
            //     last_name: row.last_name,
            //     user_email: row.gmail,
            // }));
            // await insertMultipleRowsToTable("registration_players", regPlayers);

            setOpen(false);
            toast({
                title: "Registration Successful",
                description:
                    "Team registered and roster uploaded successfully.",
            });
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
                <Button variant="action">Register</Button>
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

                    <div className="space-y-4 flex-1 min-h-0 pb-4">
                        <div className="text-sm">
                            <strong>
                                CSV must have these columns: first_name,
                                last_name, gmail
                            </strong>
                        </div>
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer h-[calc(100%-2rem)] overflow-auto ${
                                isDragActive
                                    ? "border-primary"
                                    : "border-gray-300"
                            } ${isRegistering ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            <input {...getInputProps()} />
                            <div className="text-lg text-muted-foreground mb-4 sticky top-0 bg-background py-2">
                                {uploadedFile
                                    ? `File uploaded: ${uploadedFile.name}`
                                    : "Put your roster in CSV format here."}
                            </div>
                            {renderPreviewTable()}
                        </div>
                    </div>

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
