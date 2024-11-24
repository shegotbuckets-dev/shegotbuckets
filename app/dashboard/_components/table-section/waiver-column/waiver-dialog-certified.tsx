import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { useState } from "react";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface SignatureDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    handleSignWaiverEvent: () => void;
    isLoading: boolean;
}

export const CertifiedDialog = ({
    isOpen,
    onOpenChange,
    handleSignWaiverEvent,
    isLoading,
}: SignatureDialogProps) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">
                        Certification
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-sm text-gray-700 font-semibold bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-400">
                            I CERTIFY THAT I HAVE READ THIS DOCUMENT, AND I
                            FULLY UNDERSTAND ITS CONTENT. I AM AWARE THAT THIS
                            IS A RELEASE OF LIABILITY AND A CONTRACT AND I SIGN
                            IT OF MY OWN FREE WILL.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex items-start space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Checkbox
                            id="terms"
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                                setIsChecked(checked as boolean)
                            }
                            className="mt-1"
                        />
                        <Label
                            htmlFor="terms"
                            className="text-sm text-gray-600 cursor-pointer"
                        >
                            By checking this box, I am signing this document
                            electronically. I agree that my electronic signature
                            is the legal equivalent of my manual/handwritten
                            signature on this document.
                        </Label>
                    </motion.div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSignWaiverEvent}
                        className="relative"
                        disabled={!isChecked || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Sign Waiver"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
