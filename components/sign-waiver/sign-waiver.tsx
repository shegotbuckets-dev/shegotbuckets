"use client";

import { SignatureCanvas } from "@/components/sign-waiver/signature-canvas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { emailAPI } from "@/utils/hook/useEmail";

import { useEffect, useRef, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { InfoIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmailData {
    name: string;
    email: string;
}

interface EmailResponse {
    data: { id: string };
}

export default function SignWaiver() {
    const [isBottomReached, setIsBottomReached] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [signature, setSignature] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const router = useRouter();

    let user = null;
    user = useUser();

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (scrollHeight - scrollTop <= clientHeight + 1) {
                setIsBottomReached(true);
            }
        }
    };

    const onClose = () => {
        setIsDialogOpen(false);
    };

    const onSave = (signature: any) => {
        setSignature(signature);
    };

    const handleSignWaiver = async () => {
        setIsLoading(true);

        try {
            const response = await emailAPI<EmailData, EmailResponse>({
                method: "POST",
                endpoint: "/api/email",
                data: {
                    name: user.user?.firstName || " ",
                    email: user.user?.emailAddresses[0].emailAddress || " ",
                },
            });

            if (response.data.id) {
                setShowSuccessDialog(true);
            } else {
                throw new Error("Something wrong");
            }
        } catch (error) {
            setShowErrorDialog(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseAndRedirect = () => {
        setShowSuccessDialog(false);
        setIsDialogOpen(false);
        router.push("/dashboard");
    };

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener("scroll", handleScroll);
            return () =>
                scrollElement.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const isButtonEnabled = isBottomReached && isChecked && signature;

    return (
        <div className="max-w-2xl mx-auto pt-6 space-y-6">
            <h1 className="text-3xl font-bold text-center">
                Waiver and Release of Liability
            </h1>

            <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                    Please read the entire document,check the agreement box,and
                    sign your name to complete the waiver
                </AlertDescription>
            </Alert>

            <div
                className="h-[300px] border rounded-md p-4 overflow-auto"
                ref={scrollRef}
            >
                <div className="space-y-4">
                    <p>
                        I,the undersigned participant,acknowledge that I have
                        voluntarily chosen to participate in the basketball
                        activities organized by She Got Buckets (hereinafter
                        referred to as SGB). I am fully aware of the risks and
                        hazards connected with the activity,including physical
                        injury or even death,and hereby elect to voluntarily
                        participate in said activity, knowing that the activity
                        may be hazardous to my property and me.
                    </p>
                    <p>
                        I understand that SGB does not require me to participate
                        in this activity. I voluntarily assume full
                        responsibility for any risks of loss, property damage,
                        or personal injury that may be sustained by me, or any
                        loss or damage to property owned by me,as a result of
                        being engaged in such an activity.
                    </p>
                    <p>
                        I hereby RELEASE,WAIVE,DISCHARGE,AND COVENANT NOT TO SUE
                        She Got Buckets,its officers,servants,agents,and
                        employees (hereinafter referred to as RELEASEES) from
                        any and all liability,claims,demands,actions and causes
                        of action whatsoever arising out of or related to any
                        loss,damage,or injury,including death,that may be
                        sustained by me,or to any property belonging to me,while
                        participating in physical activity,or while on or upon
                        the premises where the activity is being conducted.
                    </p>
                    <p>
                        It is my expressed intent that this release and hold
                        harmless agreement shall bind the members of my family
                        and spouse,if I am alive,and my heirs,assigns and
                        personal representative,if I am deceased,and shall be
                        deemed as a RELEASE,WAIVER,DISCHARGE,and CONVENTION NOT
                        TO SUE the above-named RELEASEES.
                    </p>
                    <p>
                        In signing this release,I acknowledge and represent that
                        I HAVE READ THE FOREGOING Waiver of Liability and Hold
                        Harmless Agreement,UNDERSTAND IT AND SIGN IT VOLUNTARILY
                        as my own free act and deed; no oral
                        representations,statements or inducements,apart from the
                        foregoing written agreements have been made; and I
                        EXECUTE THIS RELEASE FOR FULL,ADEQUATE AND COMPLETE
                        CONSIDERATION FULLY INTENDING TO BE BOUND BY SAME.
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox
                    id="terms"
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                        setIsChecked(checked as boolean)
                    }
                />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    I have read and agree to the terms and conditions
                </label>
            </div>
            <Button
                className={cn(
                    "w-full transition-colors bg-red-500 hover:bg-red-600"
                )}
                onClick={() => {
                    setIsDialogOpen(true);
                }}
            >
                click here to sign your name !!!
            </Button>
            {signature && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">
                        Your Signature:
                    </h3>
                    <img
                        src={signature}
                        alt="Your signature"
                        className="border rounded"
                    />
                </div>
            )}

            <Button
                className={cn(
                    "w-full transition-colors",
                    isButtonEnabled
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                )}
                disabled={!isButtonEnabled || isLoading}
                onClick={handleSignWaiver}
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

            <Dialog open={isDialogOpen} onOpenChange={() => {}}>
                <DialogContent className="sm:max-w-[50rem]">
                    <SignatureCanvas onSave={onSave} onClose={onClose} />
                </DialogContent>
            </Dialog>

            <Dialog open={showSuccessDialog} onOpenChange={() => {}}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Waiver Signed Successfully</DialogTitle>
                        <DialogDescription>
                            Thank you for signing the waiver. Your signature has
                            been recorded.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <img
                            src={signature || ""}
                            alt="Your signature"
                            className="border rounded w-full"
                        />
                    </div>
                    <Button onClick={handleCloseAndRedirect} className="mt-4">
                        Close
                    </Button>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={showErrorDialog}
                onOpenChange={setShowErrorDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Error</AlertDialogTitle>
                        <AlertDialogDescription>
                            Looks like something went completely wrong!!!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogAction>OK</AlertDialogAction>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
