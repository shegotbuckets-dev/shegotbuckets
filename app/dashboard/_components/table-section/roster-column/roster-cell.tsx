import {
    BADGE_TEXT,
    BaseCellProps,
    STATUS_BADGE_CLASSNAME,
    STATUS_BADGE_CLASSNAME_CLICKABLE,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

import { memo } from "react";

import { RosterButton } from "./roster-button";

const RosterCellComponent = ({ event }: BaseCellProps) => {
    if (event.userStatus.isRegistered) {
        return (
            <Badge variant="green" className={STATUS_BADGE_CLASSNAME_CLICKABLE}>
                <RosterButton event={event} />
            </Badge>
        );
    }

    return (
        <Badge variant="secondary" className={STATUS_BADGE_CLASSNAME}>
            {BADGE_TEXT.NA}
        </Badge>
    );
};

// Export memoized component
export const RosterCell = memo(RosterCellComponent);

RosterCell.displayName = "RosterCell";
