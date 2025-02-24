import {
    BADGE_TEXT,
    STATUS_BADGE_CLASSNAME,
    STATUS_BADGE_CLASSNAME_CLICKABLE,
    WaiverCellProps,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

import { WaiverButton } from "./waiver-button";

export const WaiverCell = ({ event, onButtonSuccess }: WaiverCellProps) => {
    console.log("[WaiverCell] Rendering with event:", {
        id: event.event_id,
        isRegistered: event.userStatus.isRegistered,
        waiverSigned: event.userStatus.waiverSigned,
    });

    if (!event.userStatus.isRegistered) {
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
