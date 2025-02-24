import { SidebarNav } from "@/app/dashboard/types";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import * as React from "react";

import { HomeIcon, User2Icon } from "lucide-react";
import { usePathname } from "next/navigation";

// Menu items.
const items: SidebarNav[] = [
    {
        title: "Home",
        url: "/dashboard/home",
        icon: HomeIcon,
    },
    {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User2Icon,
    },
    // Add future menu items here
    // {
    //     title: "Events",
    //     url: "/dashboard/events",
    //     icon: basketball,
    //     isLab: true,
    // },
];

export function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="top-[3.5rem] lg:top-16">
            <SidebarContent>
                <SidebarGroup>
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Dashboard
                        </h2>
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.url}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        className="w-full"
                                    >
                                        <a
                                            href={item.url}
                                            className="flex items-center gap-3"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            <span className="text-sm font-medium">
                                                {item.title}
                                            </span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
