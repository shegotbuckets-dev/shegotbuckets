"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";

import { ReactNode } from "react";
import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { DashboardTopNav } from "./_components/dashboard-topnav";
import { LandingPage } from "./_components/landing-page";
import { usePaymentStatus } from "./_hooks/usePaymentStatus";
import { useRegistrationStatus } from "./_hooks/useRegistrationStatus";

// export const metadata: Metadata = {
//     title: "Dashboard",
//     description:
//         "Access your She Got Buckets account, manage your profile, and view your event registrations.",
//     // No OpenGraph/Twitter cards needed for authenticated pages
// };

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { loading, status } = useRegistrationStatus();
    usePaymentStatus();

    useEffect(() => {
        // Only redirect if explicitly not registered
        // Don't redirect during loading or when status is uncertain
        if (!loading && status.userData && !status.isRegistered) {
            if (pathname !== "/dashboard") {
                router.replace("/dashboard");
            }
        }
    }, [loading, status, pathname, router]);

    // Keep current view during loading
    if (loading) {
        return (
            <div className="w-full flex flex-col min-h-screen">
                <DashboardTopNav showSidebarTrigger={false} />
                <Skeleton className="w-full h-16" />
                <Skeleton className="w-full h-full" />
            </div>
        );
    }

    // Show landing page only when explicitly not registered
    if (status.userData && !status.isRegistered) {
        return (
            <div className="w-full flex flex-col min-h-screen">
                <DashboardTopNav showSidebarTrigger={false} />
                <main className="flex-1 w-full overflow-auto mt-16">
                    <LandingPage />
                </main>
            </div>
        );
    }

    return (
        <SidebarProvider>
            <div className="w-full flex flex-col min-h-screen">
                <DashboardTopNav showSidebarTrigger={true} />
                <div className="flex-1 flex">
                    <DashboardSidebar />
                    <main className="flex-1 w-full overflow-auto mt-16">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster />
        </SidebarProvider>
    );
}
