"use client";

import { EventTableData, PaymentStatus } from "@/app/dashboard/types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import { Loader2 } from "lucide-react";

interface PaymentButtonProps {
    event: EventTableData;
    paymentStatus: PaymentStatus;
    onPaymentClick: () => Promise<void>;
}

export function PaymentButton({
    event,
    paymentStatus,
    onPaymentClick,
}: PaymentButtonProps) {
    if (!event.price || event.price === "N/A") return null;

    if (paymentStatus === "paid") {
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

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                            onClick={onPaymentClick}
                            disabled={paymentStatus === "processing"}
                            className="w-[100px]"
                        >
                            {paymentStatus === "processing" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing
                                </>
                            ) : (
                                "Pay Now"
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
