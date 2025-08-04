import {
    BADGE_TEXT,
    BaseCellProps,
    TEAM_BADGE_CLASSNAME,
    WAIVER_BADGE_CLASSNAME,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

import { memo } from "react";

const TeamCellComponent = ({ event }: BaseCellProps) => {
    return (
        <Badge variant="secondary" className={TEAM_BADGE_CLASSNAME}>
            {event.userStatus.team ?? BADGE_TEXT.NA}
        </Badge>
    );
};

// Export memoized component
export const TeamCell = memo(TeamCellComponent);

TeamCell.displayName = "TeamCell";

const WaiverCellInRosterComponent = ({ value }: { value: string }) => {
    return (
        <Badge
            variant={value === "Signed" ? "green" : "pending"}
            className={WAIVER_BADGE_CLASSNAME}
        >
            {value}
        </Badge>
    );
};

// Export memoized component
export const WaiverCellInRoster = memo(WaiverCellInRosterComponent);

WaiverCellInRoster.displayName = "WaiverCellInRoster";
