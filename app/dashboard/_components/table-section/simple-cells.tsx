import {
    BADGE_TEXT,
    BaseCellProps,
    TEAM_BADGE_CLASSNAME,
    WAIVER_BADGE_CLASSNAME,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

export const TeamCell = ({ event }: BaseCellProps) => {
    return (
        <Badge variant="secondary" className={TEAM_BADGE_CLASSNAME}>
            {event.userStatus.team ?? BADGE_TEXT.NA}
        </Badge>
    );
};

export const WaiverCellInRoster = ({ value }: { value: string }) => {
    return (
        <Badge
            variant={value === "Signed" ? "green" : "pending"}
            className={WAIVER_BADGE_CLASSNAME}
        >
            {value}
        </Badge>
    );
};
