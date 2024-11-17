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

const BADGE_CLASSNAME =
    "w-24 h-6 truncate text-center justify-center cursor-default";
const BADGE_CLASSNAME_CLICKABLE =
    "w-24 h-6 truncate text-center justify-center cursor-pointer";

function RegisterOrParticipatedCell({
    event,
    teams,
    onRegisterSuccess,
}: {
    event: EventTableData;
    teams: Database["public"]["Tables"]["teams"]["Row"][];
    onRegisterSuccess: () => void;
}) {
    if (!event.active) {
        return (
            <Badge
                variant={event.registered ? "green" : "secondary"}
                className={BADGE_CLASSNAME}
            >
                {event.registered ? "Yes" : "No"}
            </Badge>
        );
    }

    return event.registered ? (
        <Badge variant="green" className={BADGE_CLASSNAME}>
            Registered
        </Badge>
    ) : (
        <Badge variant="outline" className={BADGE_CLASSNAME_CLICKABLE}>
            <RegisterButton
                event={event}
                teams={teams}
                eventRegistrations={event.eventRegistrations}
                onRegisterSuccess={onRegisterSuccess}
            />
        </Badge>
    );
}

export default function EventsTable({
    eventData,
    onRegisterSuccess,
}: {
    eventData: {
        events: Database["public"]["Tables"]["events"]["Row"][];
        teams: Database["public"]["Tables"]["teams"]["Row"][];
        registrations: Database["public"]["Tables"]["registrations"]["Row"][];
        registrationPlayers: Database["public"]["Tables"]["registration_players"]["Row"][];
    };
    onRegisterSuccess: () => void;
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
            onRegisterSuccess={onRegisterSuccess}
        />
    );
}

function RosterCell({ event }: { event: EventTableData }) {
    if (!event.active) {
        return (
            <Badge
                variant={event.registered ? "green" : "secondary"}
                className={BADGE_CLASSNAME}
            >
                {event.registered ? "Yes" : "N/A"}
            </Badge>
        );
    }

    if (event.rosterUploaded) {
        return (
            <Badge variant="green" className={BADGE_CLASSNAME_CLICKABLE}>
                <RosterButton event={event} />
            </Badge>
        );
    }

    return (
        <Badge variant="secondary" className={BADGE_CLASSNAME}>
            N/A
        </Badge>
    );
}

function WaiverCell({ event }: { event: EventTableData }) {
    if (!event.registered) {
        return (
            <Badge variant="secondary" className={BADGE_CLASSNAME}>
                N/A
            </Badge>
        );
    }

    return event.waiverSigned ? (
        <Badge variant="green" className={BADGE_CLASSNAME}>
            Waiver Signed
        </Badge>
    ) : (
        <Badge variant="pending" className={BADGE_CLASSNAME_CLICKABLE}>
            <SignWaiverButton />
        </Badge>
    );
}

function TeamCell({ event }: { event: EventTableData }) {
    return (
        <Badge variant="secondary" className={BADGE_CLASSNAME}>
            {event.team !== "N/A" ? event.team : "N/A"}
        </Badge>
    );
}

function EventsTableContent({
    tableData,
    tableHeaders,
    teams,
    onRegisterSuccess,
}: {
    tableData: EventTableData[];
    tableHeaders: readonly string[];
    teams: Database["public"]["Tables"]["teams"]["Row"][];
    onRegisterSuccess: () => void;
}) {
    const hasTeamColumn = tableData.some((event) => event.team !== "N/A");

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
                            {hasTeamColumn && (
                                <TableCell>
                                    <TeamCell event={event} />
                                </TableCell>
                            )}
                            <TableCell>
                                <RegisterOrParticipatedCell
                                    event={event}
                                    teams={teams}
                                    onRegisterSuccess={onRegisterSuccess}
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
