import { useToast } from "@/components/ui/use-toast";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

export const usePaymentSuccess = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const success = searchParams.get("success");
        if (success === "true") {
            toast({
                title: "Payment Successful",
                description: "Your payment has been processed successfully.",
                variant: "default",
            });

            // Clean up URL
            const url = new URL(window.location.href);
            url.searchParams.delete("success");
            url.searchParams.delete("event_id");
            url.searchParams.delete("t");
            router.replace(url.pathname);
        }
    }, [searchParams, router, toast]);
};
