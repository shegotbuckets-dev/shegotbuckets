import { WaiverCellProps } from "@/app/dashboard/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";

import { WaiverDialogContent } from "./waiver-dialog-content";

export const WaiverButton = ({ event, onButtonSuccess }: WaiverCellProps) => {
    const [open, setOpen] = useState(false);

    const handleWaiverSigned = () => {
        console.log("[WaiverButton] Waiver signed, refreshing");
        setOpen(false);
        onButtonSuccess();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span>Sign Waiver</span>
            </DialogTrigger>
            <DialogContent className="max-w-[50rem] max-h-svh overflow-auto">
                <WaiverDialogContent
                    event={event}
                    onButtonSuccess={handleWaiverSigned}
                />
            </DialogContent>
        </Dialog>
    );
};
