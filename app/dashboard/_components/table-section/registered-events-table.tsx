"use client";

import { EventBasicInfo } from "@/app/dashboard/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

import { memo, useCallback, useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { PaymentCell } from "./payment-column/payment-cell";
import { RegisterOrParticipatedCell } from "./register-column/register-cell";
import { RosterCell } from "./roster-column/roster-cell";
import { TeamCell } from "./simple-cells";
import { WaiverCell } from "./waiver-column/waiver-cell";

const HEADERS = [
    "Event",
    "Date",
    "Location",
    "Team",
    "Register",
    "Roster",
    "Waiver",
    "Payment",
];

interface RegisteredEventsTableProps {
    events: EventBasicInfo[];
    onButtonSuccess: () => void;
    loading: boolean;
}

// Memoized skeleton rows component
const SkeletonRows = memo(() => (
    <>
        {Array.from({ length: 3 }).map((_, rowIndex) => (
            <TableRow key={`skeleton-${rowIndex}`}>
                {Array.from({ length: HEADERS.length }).map((_, cellIndex) => (
                    <TableCell key={`cell-${cellIndex}`}>
                        <Skeleton className="h-4 w-full" />
                    </TableCell>
                ))}
            </TableRow>
        ))}
    </>
));

SkeletonRows.displayName = "SkeletonRows";

// Memoized table row component
const TableRowMemo = memo(
    ({
        event,
        onButtonSuccess,
        isFlashing,
        eventId,
    }: {
        event: EventBasicInfo;
        onButtonSuccess: () => void;
        isFlashing: boolean;
        eventId: string | null;
    }) => (
        <TableRow
            className={
                isFlashing && event.event_id === eventId
                    ? "animate-pulse bg-yellow-100 dark:bg-yellow-800 transition-colors duration-770 ease-in-out"
                    : ""
            }
        >
            <TableCell className="font-medium">
                {event.title_short ?? event.title}
            </TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>
                <TeamCell event={event} />
            </TableCell>
            <TableCell>
                <RegisterOrParticipatedCell
                    event={event}
                    onButtonSuccess={onButtonSuccess}
                />
            </TableCell>
            <TableCell>
                <RosterCell event={event} onButtonSuccess={onButtonSuccess} />
            </TableCell>
            <TableCell>
                <WaiverCell event={event} onButtonSuccess={onButtonSuccess} />
            </TableCell>
            <TableCell>
                <PaymentCell event={event} />
            </TableCell>
        </TableRow>
    )
);

TableRowMemo.displayName = "TableRowMemo";

function RegisteredEventsTableComponent({
    events,
    onButtonSuccess,
    loading,
}: RegisteredEventsTableProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();
    const [flashingEventId, setFlashingEventId] = useState<string | null>(null);
    const eventId = searchParams.get("eventId");

    // Memoize the onButtonSuccess callback to prevent unnecessary re-renders
    const memoizedOnButtonSuccess = useCallback(() => {
        onButtonSuccess();
    }, [onButtonSuccess]);

    // Memoize router operations
    const handleSuccessRedirect = useCallback(() => {
        router.replace("/dashboard/home");
    }, [router]);

    useEffect(() => {
        const success = searchParams.get("success");
        const eventId = searchParams.get("event_id");
        const teamId = searchParams.get("team_id");
        let registrationId = searchParams.get("registration_id");

        const handlePaymentSuccess = async () => {
            if (success !== "true" || !eventId) return;

            // If no registration_id in URL, fetch it (new registration flow)
            if (!registrationId && teamId) {
                try {
                    const response = await fetch(
                        `/api/get-latest-registration?event_id=${eventId}&team_id=${teamId}`
                    );
                    const data = await response.json();
                    if (data.registration_id) {
                        registrationId = data.registration_id;
                    }
                } catch (error) {
                    console.error("Failed to fetch registration:", error);
                }
            }

            // Show registration ID toast if available
            if (registrationId) {
                const registrationIdShort = registrationId.substring(0, 8);
                toast({
                    variant: "success",
                    title: "Payment Successful!",
                    description: `Registration ID: ${registrationIdShort}. Click to copy and share with teammates!`,
                    duration: 10000, // Show for 10 seconds
                    onClick: () => {
                        navigator.clipboard.writeText(registrationIdShort);
                        toast({
                            title: "Copied!",
                            description: "Registration ID copied to clipboard",
                        });
                    },
                });
            }

            memoizedOnButtonSuccess();
            handleSuccessRedirect();
        };

        handlePaymentSuccess();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, memoizedOnButtonSuccess, handleSuccessRedirect]);

    useEffect(() => {
        if (eventId) {
            setFlashingEventId(eventId);
            const timer = setTimeout(() => {
                setFlashingEventId(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [eventId]);

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {HEADERS.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <SkeletonRows />
                    ) : events.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={HEADERS.length}
                                className="text-center text-muted-foreground py-8"
                            >
                                No active registrations
                            </TableCell>
                        </TableRow>
                    ) : (
                        events.map((event) => (
                            <TableRowMemo
                                key={event.event_id}
                                event={event}
                                onButtonSuccess={memoizedOnButtonSuccess}
                                isFlashing={flashingEventId === event.event_id}
                                eventId={flashingEventId}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

// Export memoized component
export const RegisteredEventsTable = memo(RegisteredEventsTableComponent);

RegisteredEventsTable.displayName = "RegisteredEventsTable";
