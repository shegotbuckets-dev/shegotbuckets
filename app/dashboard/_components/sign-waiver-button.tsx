import SignWaiver from "@/components/sign-waiver/sign-waiver";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

import { EventTableData } from "./events-table";

interface SignWaiverButtonProps {
    event: EventTableData;
    onButtonSuccess: () => void;
}

export default function SignWaiverButton({
    event,
    onButtonSuccess,
}: SignWaiverButtonProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>Sign Waiver</span>
            </DialogTrigger>
            <DialogContent className="max-w-[50rem] max-h-svh overflow-auto">
                <SignWaiver event={event} onButtonSuccess={onButtonSuccess} />
            </DialogContent>
        </Dialog>
    );
}
