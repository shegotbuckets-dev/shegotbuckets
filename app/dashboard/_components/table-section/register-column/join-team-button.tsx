"use client";

import { useJoinTeam } from "@/app/dashboard/_hooks/useJoinTeam";
import { EventBasicInfo } from "@/app/dashboard/types";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { EventDetails } from "./event-details";

interface JoinTeamButtonProps {
    event: EventBasicInfo;
    onButtonSuccess: () => void;
}

export const JoinTeamButton = ({
    event,
    onButtonSuccess,
}: JoinTeamButtonProps) => {
    const {
        registrationId,
        setRegistrationId,
        jerseyNumber,
        setJerseyNumber,
        isJoining,
        open,
        setOpen,
        resetForm,
        handleJoin,
    } = useJoinTeam({
        event,
        onSuccess: onButtonSuccess,
    });

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
                <span>Join Team</span>
            </DialogTrigger>

            <DialogContent className="max-w-[40rem]">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Join Team for{" "}
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
                    <div className="text-sm text-muted-foreground">
                        Enter the Registration ID shared by your team captain to
                        join their roster
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="registration-id">
                            Registration ID{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="registration-id"
                            placeholder="e.g., 550e8400"
                            value={registrationId}
                            onChange={(e) => setRegistrationId(e.target.value)}
                            disabled={isJoining}
                        />
                        <p className="text-xs text-muted-foreground">
                            The 8-character ID provided by your team captain
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="jersey-number">
                            Jersey Number{" "}
                            <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="jersey-number"
                            type="number"
                            placeholder="0-99"
                            min="0"
                            max="99"
                            value={jerseyNumber}
                            onChange={(e) => setJerseyNumber(e.target.value)}
                            disabled={isJoining}
                        />
                        <p className="text-xs text-muted-foreground">
                            Choose a number between 0 and 99
                        </p>
                    </div>

                    <div className="text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-950 p-3 rounded">
                        <p className="font-semibold mb-1">⚠️ Important</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Make sure the Registration ID is correct</li>
                            <li>
                                Choose a jersey number not taken by other
                                teammates
                            </li>
                            <li>
                                You&apos;ll be added to the team roster
                                immediately
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
                        disabled={isJoining}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleJoin}
                        disabled={!registrationId || !jerseyNumber || isJoining}
                    >
                        {isJoining ? "Joining..." : "Join Team"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
