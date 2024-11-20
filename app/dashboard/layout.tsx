import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

import { ReactNode } from "react";

import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { DashboardTopNav } from "./_components/dashboard-topnav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div className="w-full flex flex-col min-h-screen">
                <DashboardTopNav />
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
