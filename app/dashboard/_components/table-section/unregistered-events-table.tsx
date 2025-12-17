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

import { memo } from "react";

import { RegisterOrParticipatedCell } from "./register-column/register-cell";

const HEADERS = ["Event", "Season", "Date", "Location", "Register"];

interface UnregisteredEventsTableProps {
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

function UnregisteredEventsTableComponent({
    events,
    onButtonSuccess,
    loading,
}: UnregisteredEventsTableProps) {
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
                                No events available to register
                            </TableCell>
                        </TableRow>
                    ) : (
                        events.map((event) => (
                            <TableRow key={event.event_id}>
                                <TableCell className="font-medium">
                                    {event.title_short ?? event.title}
                                </TableCell>
                                <TableCell>{event.subtitle}</TableCell>
                                <TableCell>{event.date}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>
                                    <RegisterOrParticipatedCell
                                        event={event}
                                        onButtonSuccess={onButtonSuccess}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

// Export memoized component
export const UnregisteredEventsTable = memo(UnregisteredEventsTableComponent);

UnregisteredEventsTable.displayName = "UnregisteredEventsTable";
