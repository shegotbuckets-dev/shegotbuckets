"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { useCallback, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { UserPlus } from "lucide-react";

export const JoinRegistrationGlobal = () => {
    const { user } = useUser();
    const { toast } = useToast();
    const [registrationId, setRegistrationId] = useState("");
    const [jerseyNumber, setJerseyNumber] = useState("");
    const [isJoining, setIsJoining] = useState(false);

    const handleJoin = async () => {
        try {
            setIsJoining(true);

            if (!registrationId || !jerseyNumber) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description:
                        "Please enter registration ID and jersey number",
                });
                return;
            }

            if (registrationId.trim().length != 8) {
                toast({
                    variant: "destructive",
                    title: "Invalid Registration ID",
                    description:
                        "Registration ID must be a 8 characters string.",
                });
                return;
            }

            const jerseyNum = parseInt(jerseyNumber, 10);
            if (isNaN(jerseyNum) || jerseyNum < 0 || jerseyNum >= 100) {
                toast({
                    variant: "destructive",
                    title: "Invalid Jersey Number",
                    description: "Jersey number must be between 0 and 99",
                });
                return;
            }

            const userEmail = user?.emailAddresses[0]?.emailAddress;
            const userId = user?.id;
            const firstName = user?.firstName;
            const lastName = user?.lastName;

            if (!userEmail || !firstName || !lastName) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description:
                        "User information not found. Please try logging in again.",
                });
                return;
            }

            // We need to fetch the event_id from the registration
            // First, get registration details
            const registrationResponse = await fetch(
                `/api/get-registration?registration_id=${registrationId.trim()}`
            );

            if (!registrationResponse.ok) {
                throw new Error("Invalid registration ID");
            }

            const registrationData = await registrationResponse.json();

            const response = await fetch("/api/join-team", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    registration_id: registrationData.registration_id, // Use full UUID from response
                    event_id: registrationData.event_id,
                    user_email: userEmail,
                    user_id: userId,
                    first_name: firstName,
                    last_name: lastName,
                    jersey_number: jerseyNum,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to join team");
            }

            toast({
                variant: "success",
                title: "Successfully Joined Team!",
                description: data.message,
            });

            resetForm();

            // Reload page to refresh dashboard
            window.location.reload();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Join Failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred",
            });
        } finally {
            setIsJoining(false);
        }
    };

    const resetForm = useCallback(() => {
        setRegistrationId("");
        setJerseyNumber("");
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                            Add Yourself to Roster
                        </h3>
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        Have a Registration ID from your team captain? Enter it
                        below to add yourself to their roster.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:w-auto">
                    <div className="space-y-1">
                        <Label
                            htmlFor="reg-id"
                            className="text-xs text-blue-900 dark:text-blue-100"
                        >
                            Registration ID
                        </Label>
                        <Input
                            id="reg-id"
                            placeholder="e.g., 550e8400"
                            value={registrationId}
                            onChange={(e) => setRegistrationId(e.target.value)}
                            disabled={isJoining}
                            className="w-full sm:w-40"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label
                            htmlFor="jersey"
                            className="text-xs text-blue-900 dark:text-blue-100"
                        >
                            Jersey #
                        </Label>
                        <Input
                            id="jersey"
                            type="number"
                            placeholder="0-99"
                            min="0"
                            max="99"
                            value={jerseyNumber}
                            onChange={(e) => setJerseyNumber(e.target.value)}
                            disabled={isJoining}
                            className="w-full sm:w-24"
                        />
                    </div>

                    <div className="flex items-end">
                        <Button
                            onClick={handleJoin}
                            disabled={
                                !registrationId || !jerseyNumber || isJoining
                            }
                            className="w-full sm:w-auto"
                        >
                            {isJoining ? "Joining..." : "Join Team"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
