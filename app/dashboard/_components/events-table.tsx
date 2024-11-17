"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Database } from "@/constants/supabase";

import { useMemo } from "react";

import { useUser } from "@clerk/nextjs";

import { RegisterButton } from "./register-button";
import { RosterButton } from "./roster-button";
import SignWaiverButton from "./sign-waiver-button";

export interface EventTableData {
    id: string;
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
    eventRegistrations: Database["public"]["Tables"]["registrations"]["Row"][];
    registrationPlayers: Database["public"]["Tables"]["registration_players"]["Row"][];
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

    const userRegistrationData = eventRegistrations.reduce<{
        registered: boolean;
        teamId?: string;
        waiverSigned: boolean;
        regPlayers: Database["public"]["Tables"]["registration_players"]["Row"][];
    }>(
        (acc, registration) => {
            const regPlayers = registrationPlayers.filter(
                (player) =>
                    player.registration_id === registration.registration_id
            );

            const userPlayerData = registrationPlayers.find(
                (player) =>
                    player.registration_id === registration.registration_id &&
                    player.user_email === user_email
            );

            if (userPlayerData) {
                return {
                    registered: true,
                    teamId: registration.team_id,
                    waiverSigned: userPlayerData.waiver_signed,
                    regPlayers: regPlayers,
                };
            }
            return { ...acc, regPlayers: regPlayers };
        },
        { registered: false, waiverSigned: false, regPlayers: [] }
    );

    const team =
        userRegistrationData.registered && userRegistrationData.teamId
            ? (teams.find(
                  (team) => team.team_id === userRegistrationData.teamId
              )?.name ?? "N/A")
            : "N/A";

    return {
        id: event.event_id,
        name: event.title_short ?? event.title,
        subtitle: event.subtitle ?? "N/A",
        date: event.date ?? "N/A",
        location: event.location ?? "N/A",
        price: event.price ?? "N/A",
        team,
        registered: userRegistrationData.registered,
        rosterUploaded: userRegistrationData.regPlayers.length > 0,
        waiverSigned: userRegistrationData.waiverSigned,
        active: event.active,
        eventRegistrations: eventRegistrations,
        registrationPlayers: userRegistrationData.regPlayers,
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

function RegisterOrParticipatedCell({
    event,
    teams,
}: {
    event: EventTableData;
    teams: Database["public"]["Tables"]["teams"]["Row"][];
}) {
    if (!event.active) {
        return (
            <Badge variant={event.registered ? "active" : "secondary"}>
                {event.registered ? "Yes" : "No"}
            </Badge>
        );
    }

    return event.registered ? (
        <Badge variant="active">Registered</Badge>
    ) : (
        <RegisterButton
            event={event}
            teams={teams}
            eventRegistrations={event.eventRegistrations}
        />
    );
}

export default function EventsTable({
    eventData,
}: {
    eventData: {
        events: Database["public"]["Tables"]["events"]["Row"][];
        teams: Database["public"]["Tables"]["teams"]["Row"][];
        registrations: Database["public"]["Tables"]["registrations"]["Row"][];
        registrationPlayers: Database["public"]["Tables"]["registration_players"]["Row"][];
    };
}) {
    const { user } = useUser();
    const email = user?.emailAddresses[0].emailAddress;

    const { tableData, tableHeaders } = useMemo(() => {
        const data = eventData.events.map((event) =>
            prepareTableData(
                event,
                email,
                eventData.registrations,
                eventData.registrationPlayers,
                eventData.teams
            )
        );
        return {
            tableData: data,
            tableHeaders: prepareTableHeader(data),
        };
    }, [eventData, email]);

    return (
        <EventsTableContent
            tableData={tableData}
            tableHeaders={[...tableHeaders]}
            teams={eventData.teams}
        />
    );
}

function RosterCell({ event }: { event: EventTableData }) {
    if (!event.active) {
        return (
            <Badge variant={event.registered ? "active" : "secondary"}>
                {event.registered ? "Yes" : "N/A"}
            </Badge>
        );
    }

    if (event.rosterUploaded) {
        return <RosterButton event={event} />;
    }

    return <Badge variant="secondary">N/A</Badge>;
}

function WaiverCell({ event }: { event: EventTableData }) {
    if (!event.registered) {
        return <Badge variant="secondary">N/A</Badge>;
    }

    return event.waiverSigned ? (
        <Badge variant="secondary">Waiver Signed</Badge>
    ) : (
        <SignWaiverButton />
    );
}

function EventsTableContent({
    tableData,
    tableHeaders,
    teams,
}: {
    tableData: EventTableData[];
    tableHeaders: readonly string[];
    teams: Database["public"]["Tables"]["teams"]["Row"][];
}) {
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
                        <TableRow key={event.id}>
                            <TableCell className="font-medium">
                                {event.name}
                            </TableCell>
                            <TableCell>{event.subtitle}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            {event.team !== "N/A" && (
                                <TableCell>{event.team}</TableCell>
                            )}
                            <TableCell>
                                <RegisterOrParticipatedCell
                                    event={event}
                                    teams={teams}
                                />
                            </TableCell>
                            <TableCell>
                                <RosterCell event={event} />
                            </TableCell>
                            {event.active && (
                                <TableCell>
                                    <WaiverCell event={event} />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
