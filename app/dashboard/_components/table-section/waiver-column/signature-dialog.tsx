import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { SignatureCanvas } from "./signature-canvas";

interface SignatureDialogProps {
    signature: string | null;
    onSignatureSave: (signature: string) => void;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const SignatureDialog = ({
    signature,
    onSignatureSave,
    isOpen,
    onOpenChange,
}: SignatureDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {signature ? (
                    <img
                        src={signature}
                        alt="Your signature"
                        className="border-2 border-gray-200 rounded-lg h-32 w-full object-contain cursor-pointer"
                    />
                ) : (
                    <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg h-32 flex items-center justify-center cursor-pointer">
                        <span className="text-muted-foreground text-sm italic">
                            Click here to sign your name
                        </span>
                    </div>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-[50rem] max-h-svh overflow-auto">
                <SignatureCanvas
                    onSave={onSignatureSave}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
};
