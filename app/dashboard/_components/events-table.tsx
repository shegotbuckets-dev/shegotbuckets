"use client";

import {
    RegisterOrParticipatedCell,
    RosterCell,
    TeamCell,
    WaiverCell,
} from "@/app/dashboard/_components/status-cells";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Database } from "@/constants/supabase";
import { DashboardData } from "@/utils/hook/useDashboardData";

import { useEffect, useMemo, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export interface EventTableData {
    event_id: string;
    registration_id: string | undefined;
    name: string;
    subtitle: string;
    date: string;
    location: string;
    price: string;
    team: string;
    registered: boolean;
    rosterUploaded: boolean;
    waiverSigned: boolean;
    active: boolean;
    roster: Database["public"]["Tables"]["registration_players"]["Row"][];
}

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

    const userEventData = eventRegistrations.reduce<{
        registration_id: string | undefined;
        registered: boolean;
        teamId: string | undefined;
        waiverSigned: boolean;
    }>(
        (acc, registration) => {
            const userPlayerData = registrationPlayers.find(
                (player) =>
                    player.registration_id === registration.registration_id &&
                    player.user_email === user_email
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

const HEADERS = {
    active: [
        "Event",
        "Season",
        "Date",
        "Location",
        "Register",
        "Roster",
        "Waiver",
    ],
    activeWithTeam: [
        "Event",
        "Season",
        "Date",
        "Location",
        "Team",
        "Register",
        "Roster",
        "Waiver",
    ],
    previous: ["Event", "Season", "Date", "Location", "Participated", "Roster"],
    previousWithTeam: [
        "Event",
        "Season",
        "Date",
        "Location",
        "Team",
        "Participated",
        "Roster",
    ],
} as const;

function prepareTableHeader(events: EventTableData[]) {
    const hasTeams = events.some((event) => event.team !== "N/A");
    const isActive = events[0]?.active ?? false;

    if (isActive) {
        return hasTeams ? HEADERS.activeWithTeam : HEADERS.active;
    }
    return hasTeams ? HEADERS.previousWithTeam : HEADERS.previous;
}

export default function EventsTable({
    dashboardData,
    onButtonSuccess,
}: {
    dashboardData: DashboardData;
    onButtonSuccess: () => void;
}) {
    const { user } = useUser();
    const email = user?.emailAddresses[0].emailAddress;

    const [isFlashing, setIsFlashing] = useState(false);

    const { tableData, tableHeaders } = useMemo(() => {
        const data = dashboardData.events.map((event) =>
            prepareTableData(
                event,
                email,
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
}
