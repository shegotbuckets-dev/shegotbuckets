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

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

// import { PaymentCell } from "./payment-column/payment-cell";
import { RegisterOrParticipatedCell } from "./register-column/register-cell";
import { RosterCell } from "./roster-column/roster-cell";
import { TeamCell } from "./simple-cells";
import { WaiverCell } from "./waiver-column/waiver-cell";

function prepareTableHeader(events: EventBasicInfo[]) {
    const hasTeams = events.some(
        (event) => event.userStatus.team !== undefined
    );
    const isActive = events[0]?.active ?? false;

    if (isActive) {
        return hasTeams ? HEADERS.activeWithTeam : HEADERS.active;
    }
    return hasTeams ? HEADERS.previousWithTeam : HEADERS.previous;
}

export function EventsTable({
    events,
    onButtonSuccess,
    loading,
}: EventsTableProps & { loading: boolean }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isFlashing, setIsFlashing] = useState(false);
    const eventId = searchParams.get("eventId");

    useEffect(() => {
        const success = searchParams.get("success");
        const eventId = searchParams.get("event_id");
        if (success === "true" && eventId) {
            onButtonSuccess();
            router.replace("/dashboard/home");
        }
    }, [searchParams, onButtonSuccess, router]);

    useEffect(() => {
        if (eventId) {
            setIsFlashing(true);
            const timer = setTimeout(() => {
                setIsFlashing(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [eventId]);

    const tableHeaders = prepareTableHeader(events);
    const hasTeamColumn = events.some(
        (event) => event.userStatus.team !== undefined
    );

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
                    {loading
                        ? // Show skeleton rows while loading
                          Array.from({ length: 3 }).map((_, rowIndex) => (
                              <TableRow key={`skeleton-${rowIndex}`}>
                                  {Array.from({
                                      length: tableHeaders.length,
                                  }).map((_, cellIndex) => (
                                      <TableCell key={`cell-${cellIndex}`}>
                                          <Skeleton className="h-4 w-full" />
                                      </TableCell>
                                  ))}
                              </TableRow>
                          ))
                        : // Show actual data when loaded
                          events.map((event) => (
                              <TableRow
                                  key={event.event_id}
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
                                      <RosterCell event={event} />
                                  </TableCell>
                                  {event.active && (
                                      <TableCell>
                                          <WaiverCell
                                              event={event}
                                              onButtonSuccess={onButtonSuccess}
                                          />
                                      </TableCell>
                                  )}
                                  {/* {event.active && (
                                      <TableCell>
                                          <PaymentCell event={event} />
                                      </TableCell>
                                  )} */}
                              </TableRow>
                          ))}
                </TableBody>
            </Table>
        </div>
    );
}
