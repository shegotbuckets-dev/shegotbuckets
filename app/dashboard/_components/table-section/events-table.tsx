"use client";

import {
    EventTableData,
    EventsTableProps,
    HEADERS,
    UserEventData,
} from "@/app/dashboard/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Database } from "@/constants/supabase";

import { useEffect, useMemo, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

import { PaymentCell } from "./payment-column/payment-cell";
import { RegisterOrParticipatedCell } from "./register-column/register-cell";
import { RosterCell } from "./roster-column/roster-cell";
import { TeamCell } from "./simple-cells";
import { WaiverCell } from "./waiver-column/waiver-cell";

function prepareTableData(
    event: Database["public"]["Tables"]["events"]["Row"],
    user_email: string | undefined,
    registrations: Database["public"]["Tables"]["event_registrations"]["Row"][],
    registrationPlayers: Database["public"]["Tables"]["event_players"]["Row"][],
    teams: Database["public"]["Tables"]["teams"]["Row"][],
    payments: Database["public"]["Tables"]["event_payments"]["Row"][]
): EventTableData {
    // First find user's registration for this event
    const { userPlayer, userRegistration } = registrationPlayers.reduce<{
        userPlayer: (typeof registrationPlayers)[0] | undefined;
        userRegistration: (typeof registrations)[0] | undefined;
    }>(
        (acc, player) => {
            if (acc.userPlayer) return acc; // Already found

            const registration = registrations.find(
                (reg) =>
                    reg.event_id === event.event_id &&
                    reg.registration_id === player.registration_id
            );

            if (
                registration &&
                player.user_email?.toLowerCase() === user_email?.toLowerCase()
            ) {
                acc.userPlayer = player;
                acc.userRegistration = registration;
            }

            return acc;
        },
        { userPlayer: undefined, userRegistration: undefined }
    );

    // Then get all players for this registration
    const allPlayers = userRegistration
        ? registrationPlayers.filter(
              (player) =>
                  player.registration_id === userRegistration.registration_id
          )
        : [];

    const userEventData: UserEventData = {
        registration_id: userPlayer?.registration_id,
        registered: !!userPlayer,
        teamId: userRegistration?.team_id,
        waiverSigned: !!userPlayer?.waiver_signed,
    };

    // Get payment in one lookup
    const paymentForRegistration = userRegistration
        ? payments.find(
              (p) => p.registration_id === userRegistration.registration_id
          )
        : undefined;

    // Get team name in one lookup
    const team = userRegistration?.team_id
        ? (teams.find((t) => t.team_id === userRegistration.team_id)?.name ??
          "N/A")
        : "N/A";

    return {
        event_id: event.event_id,
        registration_id: userEventData.registration_id,
        name: event.title_short ?? event.title,
        subtitle: event.subtitle ?? "N/A",
        date: event.date ?? "N/A",
        location: event.location ?? "N/A",
        price: event.price ?? "N/A",
        active: event.active,
        user_email: userPlayer?.user_email ?? "N/A",
        team_id: userEventData.teamId ?? "N/A",
        team,
        registered: userEventData.registered,
        rosterUploaded: allPlayers.length > 0,
        roster: allPlayers,
        waiverSigned: userEventData.waiverSigned,
        paymentStatus: paymentForRegistration?.payment_status ?? false,
        paymentLink: event.payment_link,
    };
}

function prepareTableHeader(events: EventTableData[]) {
    const hasTeams = events.some((event) => event.team !== "N/A");
    const isActive = events[0]?.active ?? false;

    if (isActive) {
        return hasTeams ? HEADERS.activeWithTeam : HEADERS.active;
    }
    return hasTeams ? HEADERS.previousWithTeam : HEADERS.previous;
}

export const EventsTable = ({
    dashboardData,
    onButtonSuccess,
}: EventsTableProps) => {
    const { user } = useUser();
    const email = user?.emailAddresses[0].emailAddress;

    const [isFlashing, setIsFlashing] = useState(false);

    const { tableData, tableHeaders } = useMemo(() => {
        const data = dashboardData.events.map((event) =>
            prepareTableData(
                event,
                email?.toLocaleLowerCase(),
                dashboardData.registrations,
                dashboardData.registrationPlayers,
                dashboardData.teams,
                dashboardData.payments
            )
        );
        return {
            tableData: data,
            tableHeaders: prepareTableHeader(data),
        };
    }, [dashboardData, email]);

    const hasTeamColumn = tableData.some((event) => event.team !== "N/A");

    const searchParams = useSearchParams();

    const eventId = searchParams.get("eventId");

    useEffect(() => {
        if (eventId) {
            setIsFlashing(true);

            const timer = setTimeout(() => {
                setIsFlashing(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [eventId]);

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
                    {tableData.map((event) => (
                        <TableRow
                            key={event.event_id}
                            className={
                                isFlashing &&
                                searchParams &&
                                event.event_id === eventId
                                    ? "animate-pulse bg-yellow-100 dark:bg-yellow-800 transition-colors duration-770 ease-in-out"
                                    : ""
                            }
                        >
                            <TableCell className="font-medium">
                                {event.name}
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
                                    dashboardData={dashboardData}
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
                            {event.active && (
                                <TableCell>
                                    <PaymentCell
                                        event={event}
                                        onButtonSuccess={onButtonSuccess}
                                    />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
