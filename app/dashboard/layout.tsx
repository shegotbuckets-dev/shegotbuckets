import { ReactNode } from "react";

import DashboardSideBar from "./_components/dashboard-side-bar";
import DashboardTopNav from "./_components/dashboard-top-nav";

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <DashboardSideBar />
            <DashboardTopNav>
                <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
            </DashboardTopNav>
        </div>
    );
}
