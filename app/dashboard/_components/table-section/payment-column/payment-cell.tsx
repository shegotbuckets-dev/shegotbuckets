import {
    BADGE_TEXT,
    EventTableData,
    STATUS_BADGE_CLASSNAME,
    STATUS_BADGE_CLASSNAME_CLICKABLE,
} from "@/app/dashboard/types";
import { Badge } from "@/components/ui/badge";

import { PaymentButton } from "./payment-button";

interface PaymentCellProps {
    event: EventTableData;
    onButtonSuccess?: () => void;
}

export function PaymentCell({ event, onButtonSuccess }: PaymentCellProps) {
    const handlePaymentClick = async () => {
        try {
            // This will be implemented later with Stripe
            // For now, just call onButtonSuccess
            await onButtonSuccess?.();
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    // TODO: Uncomment this check when implementing full payment flow
    // if (!event.registered) {
    //     return (
    //         <Badge variant="secondary" className={STATUS_BADGE_CLASSNAME}>
    //             {BADGE_TEXT.NA}
    //         </Badge>
    //     );
    // }

    return event.paymentStatus === "paid" ? (
        <Badge variant="green" className={STATUS_BADGE_CLASSNAME}>
            Paid
        </Badge>
    ) : (
        <Badge variant="outline" className={STATUS_BADGE_CLASSNAME_CLICKABLE}>
            <PaymentButton
                event={event}
                paymentStatus={event.paymentStatus}
                onPaymentClick={handlePaymentClick}
            />
        </Badge>
    );
}
