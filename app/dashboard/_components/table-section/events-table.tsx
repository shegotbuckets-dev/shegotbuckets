"use client";

import {
    EventBasicInfo,
    EventsTableProps,
    HEADERS,
} from "@/app/dashboard/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FixedSizeList as List } from "react-window";

import { useRouter, useSearchParams } from "next/navigation";

import { PaymentCell } from "./payment-column/payment-cell";
import { RegisterOrParticipatedCell } from "./register-column/register-cell";
import { RosterCell } from "./roster-column/roster-cell";
import { TeamCell } from "./simple-cells";
import { WaiverCell } from "./waiver-column/waiver-cell";

// Memoize the prepareTableHeader function
const prepareTableHeader = (events: EventBasicInfo[]) => {
    const hasTeams = events.some(
        (event) => event.userStatus.team !== undefined
    );
    const isActive = events[0]?.active ?? false;

    if (isActive) {
        return hasTeams ? HEADERS.activeWithTeam : HEADERS.active;
    }
    return hasTeams ? HEADERS.previousWithTeam : HEADERS.previous;
};

// Memoized table row component to prevent unnecessary re-renders
const TableRowMemo = memo(
    ({
        event,
        hasTeamColumn,
        onButtonSuccess,
        isFlashing,
        eventId,
        style,
    }: {
        event: EventBasicInfo;
        hasTeamColumn: boolean;
        onButtonSuccess: () => void;
        isFlashing: boolean;
        eventId: string | null;
        style?: React.CSSProperties;
    }) => (
        <TableRow
            style={style}
            className={
                isFlashing && event.event_id === eventId
                    ? "animate-pulse bg-yellow-100 dark:bg-yellow-800 transition-colors duration-770 ease-in-out"
                    : ""
            }
        >
            <TableCell className="font-medium">
                {event.title_short ?? event.title}
            </TableCell>
            <TableCell>{event.subtitle}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.location}</TableCell>
            {hasTeamColumn && (
                <TableCell>
                    <TeamCell event={event} />
                </TableCell>
            )}
            <TableCell>
                <RegisterOrParticipatedCell
                    event={event}
                    onButtonSuccess={onButtonSuccess}
                />
            </TableCell>
            <TableCell>
                <RosterCell event={event} onButtonSuccess={onButtonSuccess} />
            </TableCell>
            {event.active && (
                <TableCell>
                    <WaiverCell
                        event={event}
                        onButtonSuccess={onButtonSuccess}
                    />
                </TableCell>
            )}
            {event.active && (
                <TableCell>
                    <PaymentCell event={event} />
                </TableCell>
            )}
        </TableRow>
    )
);

TableRowMemo.displayName = "TableRowMemo";

// Memoized skeleton rows component
const SkeletonRows = memo(
    ({ tableHeadersLength }: { tableHeadersLength: number }) => (
        <>
            {Array.from({ length: 3 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                    {Array.from({
                        length: tableHeadersLength,
                    }).map((_, cellIndex) => (
                        <TableCell key={`cell-${cellIndex}`}>
                            <Skeleton className="h-4 w-full" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
);

SkeletonRows.displayName = "SkeletonRows";

// Virtualized row renderer
const VirtualizedRow = memo(
    ({
        index,
        style,
        data,
    }: {
        index: number;
        style: React.CSSProperties;
        data: {
            events: EventBasicInfo[];
            hasTeamColumn: boolean;
            onButtonSuccess: () => void;
            isFlashing: boolean;
            eventId: string | null;
        };
    }) => {
        const event = data.events[index];
        return (
            <TableRowMemo
                event={event}
                hasTeamColumn={data.hasTeamColumn}
                onButtonSuccess={data.onButtonSuccess}
                isFlashing={data.isFlashing}
                eventId={data.eventId}
                style={style}
            />
        );
    }
);

VirtualizedRow.displayName = "VirtualizedRow";

function EventsTableComponent({
    events,
    onButtonSuccess,
    loading,
}: EventsTableProps & { loading: boolean }) {
    const searchParams = useSearchParams();
    const router = useRouter();
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
        if (success === "true" && eventId) {
            memoizedOnButtonSuccess();
            handleSuccessRedirect();
        }
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

    // Memoize expensive calculations
    const tableHeaders = useMemo(() => prepareTableHeader(events), [events]);
    const hasTeamColumn = useMemo(
        () => events.some((event) => event.userStatus.team !== undefined),
        [events]
    );

    // Determine if we should use virtual scrolling (more than 20 events)
    const shouldUseVirtualization = events.length > 20;
    const rowHeight = 60; // Approximate height of each row

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableHeaders.map((header) => (
                            <TableHead key={header}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <SkeletonRows
                            tableHeadersLength={tableHeaders.length}
                        />
                    ) : shouldUseVirtualization ? (
                        <List
                            height={Math.min(events.length * rowHeight, 600)} // Max height of 600px
                            width="100%"
                            itemCount={events.length}
                            itemSize={rowHeight}
                            itemData={{
                                events,
                                hasTeamColumn,
                                onButtonSuccess: memoizedOnButtonSuccess,
                                isFlashing: flashingEventId !== null,
                                eventId: flashingEventId,
                            }}
                        >
                            {VirtualizedRow}
                        </List>
                    ) : (
                        events.map((event) => (
                            <TableRowMemo
                                key={event.event_id}
                                event={event}
                                hasTeamColumn={hasTeamColumn}
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
export const EventsTable = memo(EventsTableComponent);

EventsTable.displayName = "EventsTable";
