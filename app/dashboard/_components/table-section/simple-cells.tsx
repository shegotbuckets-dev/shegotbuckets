import {
    BADGE_TEXT,
    BaseCellProps,
    TEAM_BADGE_CLASSNAME,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

export const TeamCell = ({ event }: BaseCellProps) => {
    return (
        <Badge variant="secondary" className={TEAM_BADGE_CLASSNAME}>
            {event.team !== BADGE_TEXT.NA ? event.team : BADGE_TEXT.NA}
        </Badge>
    );
};
