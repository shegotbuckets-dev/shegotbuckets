"use client";

import { Logos } from "@/components/common/logos";
import ModeToggle from "@/components/common/mode-toggle";
import { UserProfile } from "@/components/common/user-profile";
import { SidebarTrigger } from "@/components/ui/sidebar";
import config from "@/config";

import { useTheme } from "next-themes";
import Link from "next/link";

interface DashboardTopNavProps {
    showSidebarTrigger?: boolean;
}

export const DashboardTopNav = ({
    showSidebarTrigger = true,
}: DashboardTopNavProps) => {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col w-full">
            <header className="fixed top-0 z-50 flex w-full h-14 lg:h-16 items-center border-b px-3 lg:px-6 bg-white dark:bg-gray-800 shadow">
                {/* Left section - Sidebar Trigger */}
                <div className="flex items-center">
                    {showSidebarTrigger && <SidebarTrigger />}
                </div>

                {/* Center section - Logo */}
                <div className="flex-1 flex justify-center items-center">
                    <Link href="/">
                        <Logos.sgbLogo
                            currentTheme={theme ?? "light"}
                            size="small"
                        />
                    </Link>
                </div>

                {/* Right section - User Profile & Mode Toggle */}
                <div className="flex items-center gap-2 lg:gap-4">
                    {config?.auth?.enabled && <UserProfile />}
                    <ModeToggle />
                </div>
            </header>
        </div>
    );
};
