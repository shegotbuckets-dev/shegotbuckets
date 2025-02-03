"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { fetchUserDataCollectedStatus } from "@/utils/actions/user";

import { ReactNode, useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { DashboardTopNav } from "./_components/dashboard-topnav";

function DashboardSkeleton() {
    return (
        <div className="w-full flex flex-col min-h-screen">
            <div className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="flex-1 flex">
                <div className="flex-1 w-full p-8">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <Skeleton className="h-8 w-48" />
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { userId } = useAuth();
    const [hasAccess, setHasAccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUserDataStatus = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }

            try {
                const dataCollected =
                    await fetchUserDataCollectedStatus(userId);
                setHasAccess(dataCollected);

                // Redirect logic
                if (!dataCollected && pathname !== "/dashboard") {
                    router.push("/dashboard");
                } else if (dataCollected && pathname === "/dashboard") {
                    router.push("/dashboard/home");
                }
            } catch (error) {
                console.error("Error checking user data status:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUserDataStatus();
    }, [userId, pathname, router]);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    const showSidebar = hasAccess && pathname !== "/dashboard";

    return (
        <SidebarProvider>
            <div className="w-full flex flex-col min-h-screen">
                <DashboardTopNav showSidebarTrigger={showSidebar} />
                <div className="flex-1 flex overflow-hidden">
                    {showSidebar && <DashboardSidebar />}
                    <main className="flex-1 w-full overflow-auto mt-16">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster />
        </SidebarProvider>
    );
}
