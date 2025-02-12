"use client";

import { EventTableData } from "@/app/dashboard/types";
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
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

import { Loader2 } from "lucide-react";

interface PaymentButtonProps {
    event: EventTableData;
    paymentStatus: boolean;
    onPaymentClick: (hasTeam2: boolean) => void;
    isLoading: boolean;
}

export function PaymentButton({
    event,
    paymentStatus,
    onPaymentClick,
    isLoading,
}: PaymentButtonProps) {
    const [hasTeam2, setHasTeam2] = useState(false);
    const buttonText = paymentStatus ? "Paid" : "Pay Now";
    const disabled = paymentStatus || isLoading;

    if (paymentStatus) {
        return (
            <Button variant="outline" disabled className="w-[100px]">
                Paid
            </Button>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>Pay Now</span>
            </DialogTrigger>

            <DialogContent className="max-w-[60rem] flex flex-col">
                {/* Fixed Header */}
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Payment for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {event.name}
                        </span>
                    </DialogTitle>
                    <div className="pt-2">
                        <Separator />
                        <DialogDescription className="py-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="font-medium">Event:</div>
                                <div>{event.name}</div>
                                <div className="font-medium">Season:</div>
                                <div>{event.subtitle}</div>
                                <div className="font-medium">Date:</div>
                                <div>{event.date}</div>
                                <div className="font-medium">Location:</div>
                                <div>{event.location}</div>
                                <div className="font-medium">Team:</div>
                                <div>{event.team}</div>
                                <div className="font-medium">Amount:</div>
                                <div>{event.price}</div>
                            </div>
                        </DialogDescription>
                        <Separator />
                    </div>
                </DialogHeader>

                {/* Main Content */}
                <div className="flex flex-col">
                    <div className="text-sm font-bold py-4">
                        Review your payment details and click Pay Now to proceed
                        to secure payment.
                    </div>

                    {/* Add checkbox before buttons */}
                    <div className="flex items-center space-x-2 py-4">
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

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                            onClick={() => onPaymentClick(hasTeam2)}
                            disabled={disabled}
                            className="w-[100px]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Redirecting...
                                </>
                            ) : (
                                buttonText
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
