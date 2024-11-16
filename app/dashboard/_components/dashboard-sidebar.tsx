import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";

import * as React from "react";

import { basketball } from "@lucide/lab";
import {
    CircleDollarSign,
    HomeIcon,
    Icon,
    Settings,
    Users,
} from "lucide-react";
import type { IconNode } from "lucide-react";

// Define a type for our menu items
type MenuItem = {
    title: string;
    url: string;
    icon: any;
    isLab?: boolean;
    separator?: boolean;
};

// Menu items.
const items: MenuItem[] = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: HomeIcon,
    },
    {
        title: "Events",
        url: "/dashboard/events",
        icon: basketball,
        isLab: true,
    },
    // {
    //     title: "Payments",
    //     url: "/dashboard/payments",
    //     icon: CircleDollarSign,
    // },
    {
        title: "Team Roster",
        url: "/dashboard/roster",
        icon: Users,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        separator: true,
    },
];

export function DashboardSidebar() {
    return (
        <Sidebar variant="sidebar" className="top-[3.5rem] lg:top-16">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item, index) => (
                                <React.Fragment key={item.title}>
                                    {item.separator && <SidebarSeparator />}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                {item.isLab ? (
                                                    <Icon
                                                        iconNode={
                                                            item.icon as IconNode
                                                        }
                                                        className="h-3 w-3"
                                                    />
                                                ) : (
                                                    <item.icon className="h-3 w-3" />
                                                )}
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </React.Fragment>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
