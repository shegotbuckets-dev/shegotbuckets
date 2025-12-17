import {
    BADGE_TEXT,
    STATUS_BADGE_CLASSNAME,
    STATUS_BADGE_CLASSNAME_CLICKABLE,
    WaiverCellProps,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

import { memo } from "react";

import { WaiverButton } from "./waiver-button";

const WaiverCellComponent = ({ event, onButtonSuccess }: WaiverCellProps) => {
    // Only allow waiver access if payment is complete
    const isPaid = event.userStatus.paymentStatus;

    if (!isPaid) {
        return (
            <Badge variant="secondary" className={STATUS_BADGE_CLASSNAME}>
                {BADGE_TEXT.NA}
            </Badge>
        );
    }

    return event.userStatus.waiverSigned ? (
        <Badge variant="green" className={STATUS_BADGE_CLASSNAME}>
            {BADGE_TEXT.WAIVER_SIGNED}
        </Badge>
    ) : (
        <Badge variant="pending" className={STATUS_BADGE_CLASSNAME_CLICKABLE}>
            <WaiverButton event={event} onButtonSuccess={onButtonSuccess} />
        </Badge>
    );
};

// Export memoized component
export const WaiverCell = memo(WaiverCellComponent);

WaiverCell.displayName = "WaiverCell";
