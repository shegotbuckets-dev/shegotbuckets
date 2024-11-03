"use client";

import { Logos } from "@/components/common/logos";
import ModeToggle from "@/components/common/mode-toggle";
import { UserProfile } from "@/components/common/user-profile";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import config from "@/config";

import { ReactNode } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { Banknote, Folder, HomeIcon, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

// Define navigation items for mobile menu
const mobileNavItems = [
    { href: "/dashboard", icon: HomeIcon, label: "Dashboard" },
    { href: "/dashboard/events", icon: Folder, label: "Events" },
    { href: "/dashboard/payments", icon: Banknote, label: "Payments" },
    {
        href: "/dashboard/settings",
        icon: Settings,
        label: "Settings",
        separator: true,
    },
];

// Reusable mobile menu link component
const MobileNavLink = ({
    href,
    icon: Icon,
    label,
}: {
    href: string;
    icon: any;
    label: string;
}) => (
    <DialogClose asChild>
        <Link
            href={href}
            className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
        >
            <Icon className="mr-2 h-4 w-4" />
            {label}
        </Link>
    </DialogClose>
);

export default function DashboardTopNav({ children }: { children: ReactNode }) {
    const { theme } = useTheme();

    return (
        <div className="flex flex-col">
            <header className="flex h-14 lg:h-16 items-center gap-4 border-b px-3">
                <Dialog>
                    <SheetTrigger className="min-[1024px]:hidden transition">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="w-5 h-5"
                            aria-label="Open menu"
                            asChild
                        >
                            <GiHamburgerMenu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <Link href="/dashboard">
                                <SheetTitle>Menu</SheetTitle>
                            </Link>
                        </SheetHeader>
                        <nav className="flex flex-col space-y-1 mt-2">
                            {mobileNavItems.map((item, index) => (
                                <>
                                    {item.separator && (
                                        <Separator className="my-3" />
                                    )}
                                    <MobileNavLink key={item.href} {...item} />
                                </>
                            ))}
                        </nav>
                    </SheetContent>
                </Dialog>

                <div className="flex-1 flex justify-center">
                    <Link href="/">
                        <Logos.sgbLogo
                            currentTheme={theme ?? "light"}
                            size="small"
                        />
                    </Link>
                </div>

                <div className="flex justify-center items-center gap-2">
                    {config?.auth?.enabled && <UserProfile />}
                    <ModeToggle />
                </div>
            </header>
            {children}
        </div>
    );
}
