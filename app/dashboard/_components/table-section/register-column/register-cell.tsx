import {
    BADGE_TEXT,
    RegisterOrParticipatedCellProps,
    STATUS_BADGE_CLASSNAME,
    STATUS_BADGE_CLASSNAME_CLICKABLE,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

import { RegisterButton } from "./register-button";

export const RegisterOrParticipatedCell = ({
    event,
    dashboardData,
    onButtonSuccess,
}: RegisterOrParticipatedCellProps) => {
    if (!event.active) {
        return (
            <Badge
                variant={event.registered ? "green" : "secondary"}
                className={STATUS_BADGE_CLASSNAME}
            >
                {event.registered ? BADGE_TEXT.YES : BADGE_TEXT.NO}
            </Badge>
        );
    }

    return event.registered ? (
        <Badge variant="green" className={STATUS_BADGE_CLASSNAME}>
            {BADGE_TEXT.REGISTERED}
        </Badge>
    ) : (
        <Badge variant="outline" className={STATUS_BADGE_CLASSNAME_CLICKABLE}>
            <RegisterButton
                event={event}
                teams={dashboardData.teams}
                registrations={dashboardData.registrations}
                onButtonSuccess={onButtonSuccess}
            />
        </Badge>
    );
};
