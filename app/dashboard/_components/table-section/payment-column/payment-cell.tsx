import {
    BADGE_TEXT,
    BaseCellProps,
    STATUS_BADGE_CLASSNAME,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

import { memo } from "react";

const PaymentCellComponent = ({ event }: BaseCellProps) => {
    // Only show "Paid" if payment is complete, otherwise show N/A
    return event.userStatus.paymentStatus ? (
        <Badge variant="green" className={STATUS_BADGE_CLASSNAME}>
            Paid
        </Badge>
    ) : (
        <Badge variant="secondary" className={STATUS_BADGE_CLASSNAME}>
            {BADGE_TEXT.NA}
        </Badge>
    );
};

// Export memoized component
export const PaymentCell = memo(PaymentCellComponent);

PaymentCell.displayName = "PaymentCell";
