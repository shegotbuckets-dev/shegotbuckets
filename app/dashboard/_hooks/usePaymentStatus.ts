import { useToast } from "@/components/ui/use-toast";

import { useEffect, useRef } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const usePaymentStatus = () => {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const toastShown = useRef(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (toastShown.current) return;

        const success = searchParams.get("success");
        if (success === "true") {
            toastShown.current = true;
            queryClient.invalidateQueries({
                queryKey: ["user-dashboard-home-data"],
            });
            toast({
                title: "Payment Successful",
                description: "Your payment has been processed successfully.",
                variant: "success",
            });
            return;
        }

        const canceled = searchParams.get("canceled");
        if (canceled === "true") {
            toastShown.current = true;
            toast({
                title: "Payment Cancelled",
                description: "Your payment was cancelled.",
                variant: "destructive",
            });
        }
    }, [searchParams, toast, queryClient]);
};
