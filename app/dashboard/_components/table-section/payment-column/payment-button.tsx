"use client";

import { PaymentButtonProps } from "@/app/dashboard/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function PaymentButton({
    event,
    paymentStatus,
    onPaymentClick,
    isLoading,
}: PaymentButtonProps) {
    const [hasTeam2, setHasTeam2] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const buttonText = paymentStatus ? "Paid" : "Pay Now";
    const disabled = paymentStatus || isLoading;

    const handlePayClick = async () => {
        await onPaymentClick(hasTeam2);
        setDialogOpen(false);
    };

    if (paymentStatus) {
        return (
            <Button variant="outline" disabled className="w-[100px]">
                Paid
            </Button>
        );
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <span>Pay Now</span>
            </DialogTrigger>

            <DialogContent className="max-w-[60rem] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Payment for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {event.title_short ?? event.title}
                        </span>
                    </DialogTitle>
                </DialogHeader>

                {/* Payment Details */}
                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                    <div className="font-medium">Event:</div>
                    <div>{event.title_short ?? event.title}</div>
                    <div className="font-medium">Season:</div>
                    <div>{event.subtitle}</div>
                    <div className="font-medium">Date:</div>
                    <div>{event.date}</div>
                    <div className="font-medium">Location:</div>
                    <div>{event.location}</div>
                    <div className="font-medium">Team:</div>
                    <div>{event.userStatus.team ?? "N/A"}</div>
                    <div className="font-medium">Amount:</div>
                    <div>{event.price}</div>
                </div>

                <Separator className="my-4" />

                {/* Team 2 Checkbox */}
                {event.league_id !== "b4c3c012-ad36-48ac-a60c-8c1264f707b9" && (
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="team2"
                            checked={hasTeam2}
                            onCheckedChange={(checked) =>
                                setHasTeam2(!!checked)
                            }
                        />
                        <label htmlFor="team2" className="text-sm">
                            I have a team 2 to participate
                        </label>
                    </div>
                )}

                <DialogFooter className="mt-4">
                    <Button
                        onClick={handlePayClick}
                        disabled={disabled}
                        className="w-[100px]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            buttonText
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
