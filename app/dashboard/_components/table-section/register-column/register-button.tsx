"use client";

import { useRegisterForm } from "@/app/dashboard/_hooks/useRegisterForm";
import { RegisterButtonProps } from "@/app/dashboard/types";
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

import { EventDetails } from "./event-details";
import { RosterUploadArea } from "./roster-upload-area";

export const RegisterButton = (props: RegisterButtonProps) => {
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
    } = useRegisterForm(props);

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
            <DialogContent className="max-w-[50rem] max-h-svh overflow-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Register for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {props.event.name}
                        </span>
                    </DialogTitle>
                    <div className="space-y-4 pt-2">
                        <Separator />
                        <DialogDescription asChild>
                            <EventDetails
                                date={props.event.date}
                                location={props.event.location}
                                price={props.event.price}
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
                                {props.teams.map((team) => (
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

                    <RosterUploadArea
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
};
