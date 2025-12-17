import { WaiverCellProps } from "@/app/dashboard/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

import { WaiverDialogContent } from "./waiver-dialog-content";

export const WaiverButton = ({ event, onButtonSuccess }: WaiverCellProps) => {
    const [open, setOpen] = useState(false);

    const handleWaiverSigned = () => {
        setOpen(false);
        onButtonSuccess();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span>Sign Waiver</span>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[95vw] md:max-w-[50rem] max-h-svh overflow-auto">
                <DialogDescription className="sr-only">
                    Waiver signing interface
                </DialogDescription>
                <WaiverDialogContent
                    event={event}
                    onButtonSuccess={handleWaiverSigned}
                />
            </DialogContent>
        </Dialog>
    );
};
