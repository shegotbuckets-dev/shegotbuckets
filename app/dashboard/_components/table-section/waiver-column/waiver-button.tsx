import { WaiverCellProps } from "@/app/dashboard/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { WaiverDialogContent } from "./waiver-dialog-content";

export const WaiverButton = ({ event, onButtonSuccess }: WaiverCellProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>Sign Waiver</span>
            </DialogTrigger>
            <DialogContent className="max-w-[50rem] max-h-svh overflow-auto">
                <WaiverDialogContent
                    event={event}
                    onButtonSuccess={onButtonSuccess}
                />
            </DialogContent>
        </Dialog>
    );
};
