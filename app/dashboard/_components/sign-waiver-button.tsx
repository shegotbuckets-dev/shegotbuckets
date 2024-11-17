import SignWaiver from "@/components/sign-waiver/sign-waiver";
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
                <Button variant="outline" size="sm">
                    Sign Waiver
                </Button>
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
