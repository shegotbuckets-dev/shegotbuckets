import { WaiverCellProps } from "@/app/dashboard/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { WaiverDialogContent } from "./waiver-dialog-content";

export const WaiverButton = ({ event, onButtonSuccess }: WaiverCellProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>Sign Waiver</span>
            </DialogTrigger>
            <DialogContent className="max-w-[50rem] max-h-svh overflow-auto">
                <DialogHeader>
                    <DialogTitle className="text-3xl pt-8 pb-4 font-bold text-center">
                        PUBLICITY WAIVER AND RELEASE
                    </DialogTitle>
                </DialogHeader>
                <WaiverDialogContent
                    event={event}
                    onButtonSuccess={onButtonSuccess}
                />
            </DialogContent>
        </Dialog>
    );
};
