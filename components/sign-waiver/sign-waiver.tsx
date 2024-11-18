"use client";

import { EventTableData } from "@/app/dashboard/_components/events-table";
import { SignatureCanvas } from "@/components/sign-waiver/signature-canvas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { emailAPI } from "@/utils/hook/useEmail";

import { useCallback, useEffect, useRef, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { InfoIcon, Loader2 } from "lucide-react";

interface EmailData {
    name: string;
    email: string;
}

interface EmailResponse {
    data: { id: string };
}

interface SignWaiverProps {
    onButtonSuccess: () => void;
    event: EventTableData;
}

export default function SignWaiver({
    onButtonSuccess,
    event,
}: SignWaiverProps) {
    // States
    const [isBottomReached, setIsBottomReached] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [signature, setSignature] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [openSignatureDialog, setOpenSignatureDialog] = useState(false);

    // Refs
    const scrollRef = useRef<HTMLDivElement>(null);

    // Hooks
    const { toast } = useToast();
    const { user } = useUser();
    const userEmail = user?.emailAddresses[0].emailAddress;

    // Handlers
    const handleScroll = useCallback(() => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (scrollHeight - scrollTop <= clientHeight + 1) {
                setIsBottomReached(true);
            }
        }
    }, []);

    const handleUserWaiverStatusUpdate = useCallback(
        async (status: boolean) => {
            try {
                const response = await fetch("/api/update-waiver-status", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        registration_id: event.registration_id,
                        user_email: userEmail,
                        status,
                    }),
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(
                        `Failed to update waiver record: ${result.error}`
                    );
                }
            } catch (error) {
                throw new Error(
                    "Failed to update waiver status: unknown error"
                );
            }
        },
        [userEmail]
    );

    const handleSignWaiver = useCallback(async () => {
        setIsLoading(true);
        try {
            await handleUserWaiverStatusUpdate(true);
            const response = await emailAPI<EmailData, EmailResponse>({
                method: "POST",
                endpoint: "/api/email",
                data: {
                    name: user?.firstName || " ",
                    email: userEmail || " ",
                },
            });

            if (response.data.id) {
                toast({
                    variant: "success",
                    title: "Waiver Signed",
                    description:
                        "Waiver signed successfully. Check your email for confirmation.",
                });
                onButtonSuccess();
            } else {
                throw new Error("Email sending failed");
            }
        } catch (error) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "Something went wrong, please try again",
            });
            await handleUserWaiverStatusUpdate(false);
        } finally {
            setIsLoading(false);
        }
    }, [handleUserWaiverStatusUpdate, user, userEmail, toast, onButtonSuccess]);

    // Effects
    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (scrollElement) {
            scrollElement.addEventListener("scroll", handleScroll);
            return () =>
                scrollElement.removeEventListener("scroll", handleScroll);
        }
    }, [handleScroll]);

    const isButtonEnabled = isBottomReached && isChecked && signature;

    return (
        <div className="max-w-2xl mx-auto pt-6 space-y-6">
            <h1 className="text-3xl font-bold text-center">
                Waiver and Release of Liability
            </h1>

            <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                    Please read the entire document, check the agreement box,
                    and sign your name to complete the waiver
                </AlertDescription>
            </Alert>

            <div
                ref={scrollRef}
                className="h-[300px] border rounded-md p-4 overflow-auto"
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

            {!isBottomReached && (
                <div className="text-xs text-muted-foreground text-center italic">
                    Scroll down to read all the terms
                </div>
            )}

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

            <Dialog
                open={openSignatureDialog}
                onOpenChange={setOpenSignatureDialog}
            >
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
                        onSave={setSignature}
                        onCancel={() => setOpenSignatureDialog(false)}
                    />
                </DialogContent>
            </Dialog>

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
        </div>
    );
}
