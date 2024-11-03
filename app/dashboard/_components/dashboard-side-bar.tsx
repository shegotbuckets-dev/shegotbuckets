"use client";

import { Separator } from "@/components/ui/separator";

import { basketball } from "@lucide/lab";
import clsx from "clsx";
import { CircleDollarSign, HomeIcon, Icon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define navigation items
const navItems = [
    { href: "/dashboard", icon: HomeIcon, label: "Home" },
    {
        href: "/dashboard/events",
        icon: basketball,
        label: "Events",
        isLucideLab: true,
    },
    { href: "/dashboard/payments", icon: CircleDollarSign, label: "Payments" },
    {
        href: "/dashboard/settings",
        icon: Settings,
        label: "Settings",
        id: "onboarding",
    },
];

export default function DashboardSideBar() {
    const pathname = usePathname();

    const NavLink = ({
        href,
        icon: IconComponent,
        label,
        isLucideLab,
        id,
    }: any) => (
        <Link
            className={clsx(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                {
                    "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50":
                        pathname === href,
                }
            )}
            href={href}
            id={id}
        >
            <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white">
                {isLucideLab ? (
                    <Icon iconNode={IconComponent} className="h-3 w-3" />
                ) : (
                    <IconComponent className="h-3 w-3" />
                )}
            </div>
            {label}
        </Link>
    );

    return (
        <div className="lg:block hidden border-r h-full">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 lg:h-16 items-center border-b px-3 w-full">
                    <Link
                        className="flex items-center gap-2 font-semibold ml-1"
                        href="/dashboard"
                    >
                        <span>SGB Dashboard</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {navItems.slice(0, 3).map((item) => (
                            <NavLink key={item.href} {...item} />
                        ))}
                        <Separator className="my-3" />
                        <NavLink {...navItems[3]} />
                    </nav>
                </div>
            </div>
        </div>
    );
}
