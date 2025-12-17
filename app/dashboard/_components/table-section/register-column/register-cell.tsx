import {
    BADGE_TEXT,
    RegisterOrParticipatedCellProps,
    STATUS_BADGE_CLASSNAME,
    STATUS_BADGE_CLASSNAME_CLICKABLE,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

import { memo } from "react";

import { RegisterTeamButton } from "./register-team-button";

const RegisterOrParticipatedCellComponent = ({
    event,
    onButtonSuccess,
}: RegisterOrParticipatedCellProps) => {
    // For previous (inactive) events, show participation status
    if (!event.active) {
        return (
            <Badge
                variant={event.userStatus.isRegistered ? "green" : "secondary"}
                className={STATUS_BADGE_CLASSNAME}
            >
                {event.userStatus.isRegistered ? BADGE_TEXT.YES : BADGE_TEXT.NO}
            </Badge>
        );
    }

    // For active events, check payment status first
    const isPaid = event.userStatus.paymentStatus;
    const isRegistered = event.userStatus.isRegistered;
    const userTeamCount = event.user_team_count ?? 0;
    const maxTeams = event.allow_multi_team ? 10 : 1; // this number matches the supabase.rpc function number
    const atTeamLimit = userTeamCount >= maxTeams;

    // If user is registered but hasn't paid, show "Pending Payment"
    if (isRegistered && !isPaid) {
        return (
            <Badge variant="pending" className={STATUS_BADGE_CLASSNAME}>
                Pending Payment
            </Badge>
        );
    }

    // If user has paid and reached team limit, show only "Registered" badge
    if (isPaid && atTeamLimit) {
        return (
            <Badge variant="green" className={STATUS_BADGE_CLASSNAME}>
                {BADGE_TEXT.REGISTERED}
            </Badge>
        );
    }

    // If user paid for at least one team but not at limit, show Registered + Register button
    if (isPaid && userTeamCount > 0 && userTeamCount < maxTeams) {
        return (
            <div className="flex flex-col gap-1">
                <Badge variant="green" className={STATUS_BADGE_CLASSNAME}>
                    {BADGE_TEXT.REGISTERED}
                </Badge>
                <Badge
                    variant="outline"
                    className={STATUS_BADGE_CLASSNAME_CLICKABLE}
                >
                    <RegisterTeamButton
                        event={event}
                        onButtonSuccess={onButtonSuccess}
                    />
                </Badge>
            </div>
        );
    }

    // User not registered yet - show only Register button
    return (
        <Badge variant="outline" className={STATUS_BADGE_CLASSNAME_CLICKABLE}>
            <RegisterTeamButton
                event={event}
                onButtonSuccess={onButtonSuccess}
            />
        </Badge>
    );
};

// Export memoized component
export const RegisterOrParticipatedCell = memo(
    RegisterOrParticipatedCellComponent
);

RegisterOrParticipatedCell.displayName = "RegisterOrParticipatedCell";
