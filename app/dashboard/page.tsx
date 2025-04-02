"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { DashboardContent } from "./_components/dashboard-content";

// Note: Metadata must be in a Server Component, so we can't add it directly here
// The title will be inherited from the layout or can be set in a parent layout

export default function DashboardPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Clean up URL if it has payment params
    useEffect(() => {
        // Add a small delay to ensure toast is shown
        const timeoutId = setTimeout(() => {
            if (searchParams.get("success") || searchParams.get("canceled")) {
                router.replace("/dashboard/home");
            }
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [searchParams, router]);

    return (
        <main className="flex-1 overflow-y-auto">
            <h1 className="sr-only">She Got Buckets Dashboard</h1>
            <DashboardContent />
        </main>
    );
}
