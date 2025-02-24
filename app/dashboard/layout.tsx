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
import { useRegistrationStatus } from "./_hooks/useRegistrationStatus";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { loading, status } = useRegistrationStatus();

    useEffect(() => {
        if (!loading && status.userData) {
            if (status.isRegistered) {
                if (pathname === "/dashboard") {
                    router.push("/dashboard/home");
                }
            } else {
                if (pathname !== "/dashboard") {
                    router.push("/dashboard");
                }
            }
        }
    }, [loading, status, pathname, router]);

    // Show skeleton only while loading
    if (loading) {
        return (
            <div className="w-full flex flex-col min-h-screen">
                <DashboardTopNav showSidebarTrigger={false} />
                <Skeleton className="w-full h-16" />
                <Skeleton className="w-full h-full" />
            </div>
        );
    }

    // Show landing page for unregistered users (even if userData is null)
    if (!status.isRegistered) {
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
                <div className="flex-1 flex overflow-hidden">
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
