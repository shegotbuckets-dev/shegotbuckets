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

const HEADERS = ["Event", "Date", "Location", "Registration Status"];

interface ComingSoonEventsTableProps {
    events: EventBasicInfo[];
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

function ComingSoonEventsTableComponent({
    events,
    loading,
}: ComingSoonEventsTableProps) {
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
                                No events coming soon
                            </TableCell>
                        </TableRow>
                    ) : (
                        events.map((event) => (
                            <TableRow key={event.event_id}>
                                <TableCell className="font-medium">
                                    {event.title_short ?? event.title}
                                </TableCell>
                                <TableCell>{event.date}</TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell className="text-sm">
                                    {event.display_registration_status ||
                                        "Coming Soon"}
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
export const ComingSoonEventsTable = memo(ComingSoonEventsTableComponent);

ComingSoonEventsTable.displayName = "ComingSoonEventsTable";
