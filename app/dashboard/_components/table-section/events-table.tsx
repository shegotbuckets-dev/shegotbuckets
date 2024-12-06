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

import { RegisterOrParticipatedCell } from "./register-column/register-cell";
import { RosterCell } from "./roster-column/roster-cell";
import { TeamCell } from "./simple-cells";
import { WaiverCell } from "./waiver-column/waiver-cell";

function prepareTableData(
    event: Database["public"]["Tables"]["events"]["Row"],
    user_email: string | undefined,
    registrations: Database["public"]["Tables"]["registrations"]["Row"][],
    registrationPlayers: Database["public"]["Tables"]["registration_players"]["Row"][],
    teams: Database["public"]["Tables"]["teams"]["Row"][]
): EventTableData {
    const eventRegistrations = registrations.filter(
        (registration) => registration.event_id === event.event_id
    );

    const userEventData = eventRegistrations.reduce<UserEventData>(
        (acc, registration) => {
            const userPlayerData = registrationPlayers.find(
                (player) =>
                    player.registration_id === registration.registration_id &&
                    player.user_email?.toLocaleLowerCase() === user_email
            );

            if (userPlayerData) {
                return {
                    registered: true,
                    teamId: registration.team_id,
                    registration_id: userPlayerData.registration_id,
                    waiverSigned: userPlayerData.waiver_signed,
                };
            }
            return { ...acc };
        },
        {
            registration_id: undefined,
            registered: false,
            teamId: undefined,
            waiverSigned: false,
        }
    );

    const team = userEventData.registered
        ? (teams.find((team) => team.team_id === userEventData.teamId)?.name ??
          "N/A")
        : "N/A";

    const roster = userEventData.registered
        ? registrationPlayers.filter(
              (player) =>
                  player.registration_id === userEventData.registration_id
          )
        : [];

    return {
        event_id: event.event_id,
        registration_id: userEventData.registration_id,
        name: event.title_short ?? event.title,
        subtitle: event.subtitle ?? "N/A",
        date: event.date ?? "N/A",
        location: event.location ?? "N/A",
        price: event.price ?? "N/A",
        active: event.active,
        team,
        registered: userEventData.registered,
        rosterUploaded: roster.length > 0,
        roster: roster,
        waiverSigned: userEventData.waiverSigned,
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
                dashboardData.teams
            )
        );
        return {
            tableData: data,
            tableHeaders: prepareTableHeader(data),
        };
    }, [dashboardData, email]);

    const hasTeamColumn = tableData.some((event) => event.team !== "N/A");

    const searchParams = useSearchParams();

    const conferenceId = searchParams.get("conferenceId");

    useEffect(() => {
        if (conferenceId) {
            setIsFlashing(true);

            const timer = setTimeout(() => {
                setIsFlashing(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [conferenceId]);

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
                                event.event_id === conferenceId
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
