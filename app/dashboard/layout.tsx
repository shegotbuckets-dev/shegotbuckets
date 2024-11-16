import { DashboardSidebar } from "@/app/dashboard/_components/dashboard-sidebar";
import DashboardTopNav from "@/app/dashboard/_components/dashboard-top-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div className="w-full flex flex-col min-h-screen">
                <DashboardTopNav />
                <div className="flex-1 flex overflow-hidden">
                    <DashboardSidebar />
                    <main className="flex-1 w-full overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
