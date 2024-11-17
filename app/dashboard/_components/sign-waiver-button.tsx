import SignWaiver from "@/components/sign-waiver/sign-waiver";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function SignWaiverButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>Sign Waiver</span>
            </DialogTrigger>
            <DialogContent className="max-w-[50rem] max-h-svh overflow-auto">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>
                <SignWaiver />
            </DialogContent>
        </Dialog>
    );
}
