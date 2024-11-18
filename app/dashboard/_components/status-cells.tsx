import { EventTableData } from "@/app/dashboard/_components/events-table";
import { RegisterButton } from "@/app/dashboard/_components/register-button";
import { Badge } from "@/components/ui/badge";
import { DashboardData } from "@/utils/hook/useDashboardData";

import { RosterButton } from "./roster-button";
import SignWaiverButton from "./sign-waiver-button";

const BADGE_CLASSNAME =
    "w-24 h-6 truncate text-center justify-center cursor-default";
const BADGE_CLASSNAME_CLICKABLE =
    "w-24 h-6 truncate text-center justify-center cursor-pointer";
export function RosterCell({ event }: { event: EventTableData }) {
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

export function WaiverCell({
    event,
    onButtonSuccess,
}: {
    event: EventTableData;
    onButtonSuccess: () => void;
}) {
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
            <SignWaiverButton event={event} onButtonSuccess={onButtonSuccess} />
        </Badge>
    );
}

export function TeamCell({ event }: { event: EventTableData }) {
    return (
        <Badge variant="secondary" className={BADGE_CLASSNAME}>
            {event.team !== "N/A" ? event.team : "N/A"}
        </Badge>
    );
}

export function RegisterOrParticipatedCell({
    event,
    dashboardData,
    onButtonSuccess,
}: {
    event: EventTableData;
    dashboardData: DashboardData;
    onButtonSuccess: () => void;
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
                teams={dashboardData.teams}
                registrations={dashboardData.registrations}
                onButtonSuccess={onButtonSuccess}
            />
        </Badge>
    );
}
