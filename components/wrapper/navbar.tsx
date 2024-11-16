"use client";

import { HeartBeatButton } from "@/components/common/heartbeat-button";
import { Logos } from "@/components/common/logos";
import ModeToggle from "@/components/common/mode-toggle";
import { UserProfile } from "@/components/common/user-profile";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Database } from "@/constants/supabase";
import { cn } from "@/lib/utils";
import { useLeagues } from "@/utils/hook/useLeagues";

import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import Link from "next/link";

interface NavItemChild {
    id: string;
    title: string;
    subtitle?: string;
}

interface NavItem {
    title: string;
    href: string;
    children?: NavItemChild[];
}

const getNavItems = (eventChildren: NavItemChild[]): NavItem[] => {
    return [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "About Us",
            href: "/about",
        },
        {
            title: "Events",
            href: "/events",
            children: eventChildren,
        },
        {
            title: "Get Involved",
            href: "/get-involved",
        },
    ];
};

const getLeagueComponents = (
    leagues: Database["public"]["Tables"]["leagues"]["Row"][]
): NavItemChild[] => {
    return leagues?.map((league) => ({
        id: league.league_id,
        title: league.name,
        subtitle: league.description ?? "",
    }));
};

export default function NavBar() {
    const { theme, systemTheme } = useTheme();
    const { userId } = useAuth();
    const [mounted, setMounted] = React.useState(false);
    const { data: leagues } = useLeagues();
    const leagueComponents = getLeagueComponents(leagues);
    const navItems = getNavItems(leagueComponents);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = mounted
        ? theme === "system"
            ? systemTheme
            : theme
        : "light";

    return (
        <div
            className={cn(
                "flex min-w-full fixed justify-between border-b z-30",
                "min-[825px]:p-2 p-1",
                currentTheme === "dark"
                    ? "bg-black"
                    : "bg-white dark:bg-opacity-50"
            )}
        >
            {/* Mobile Navigation */}
            <div className="flex justify-between w-full items-center min-[825px]:hidden">
                <MobileMenu navItems={navItems} />
                <Logos.sgbLogo currentTheme={currentTheme ?? "light"} />
                <div className="flex items-center gap-2">
                    {userId && <UserProfile />}
                    {!userId && (
                        <HeartBeatButton
                            variant="small"
                            className="text-xs py-1 px-2"
                        >
                            Join
                        </HeartBeatButton>
                    )}
                </div>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="py-1 flex-grow max-[825px]:hidden">
                <div className="flex justify-between items-center w-full">
                    <NavigationMenuList className="flex items-center gap-6">
                        <Logos.sgbLogo
                            currentTheme={currentTheme ?? "light"}
                            size="large"
                        />
                        <DesktopMenuItems navItems={navItems} />
                    </NavigationMenuList>
                </div>
            </NavigationMenu>

            {/* Desktop User Actions */}
            <div className="flex items-center gap-4 max-[825px]:hidden">
                {userId && <UserProfile />}
                <div className="hover:bg-accent rounded-md">
                    <ModeToggle />
                </div>
                {!userId && (
                    <Link href="/dashboard">
                        <Button
                            variant="default"
                            className="animate-buttonheartbeat bg-orange-600 hover:bg-orange-500 text-white px-4 py-1"
                        >
                            Become an Athlete
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

const MobileMenu = ({ navItems }: { navItems: NavItem[] }) => (
    <Dialog>
        <SheetTrigger className="transition">
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
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-1 mt-2">
                {navItems.map((item) => (
                    <div key={item.title}>
                        {item.children ? (
                            <>
                                <div className="px-4 py-1 font-semibold">
                                    {item.title}
                                </div>
                                <div className="pl-6 flex flex-col">
                                    {item.children.map((child) => (
                                        <DialogClose key={child.id} asChild>
                                            <Link
                                                href={`/${item.href}/${child.id}`}
                                                className="px-4 py-1 hover:underline"
                                            >
                                                {child.title}
                                            </Link>
                                        </DialogClose>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <DialogClose asChild>
                                <Link
                                    href={item.href}
                                    className="px-4 py-1 hover:underline"
                                >
                                    {item.title}
                                </Link>
                            </DialogClose>
                        )}
                    </div>
                ))}
            </nav>
        </SheetContent>
    </Dialog>
);

const DesktopMenuItems = ({ navItems }: { navItems: NavItem[] }) => (
    <div className="flex items-center gap-4">
        {navItems.map((item) =>
            item.children ? (
                <NavigationMenuItem
                    className="max-[825px]:hidden"
                    key={item.title}
                >
                    <NavigationMenuTrigger className="dark:bg-black dark:bg-opacity-50 text-base">
                        {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="flex flex-col w-[300px] gap-2 p-2 lg:w-[500px] rounded-md bg-background border mt-2">
                            {item.children.map((child) => (
                                <ListItem
                                    key={child.title}
                                    title={child.title}
                                    href={`${item.href}/${child.id}`}
                                ></ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            ) : (
                <NavigationMenuItem
                    className="max-[825px]:hidden"
                    key={item.title}
                >
                    <Link href={item.href} legacyBehavior passHref>
                        <Button variant="ghost" className="text-base px-4 py-1">
                            {item.title}
                        </Button>
                    </Link>
                </NavigationMenuItem>
            )
        )}
    </div>
);

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
    <li>
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                className={cn(
                    "block select-none rounded-md p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-accent focus:shadow-[0_0_0_2px] focus:shadow-violet7",
                    className
                )}
                {...props}
            >
                <div className="mb-[5px] font-medium leading-[1.2] text-violet12">
                    {title}
                </div>
                <p className="leading-[1.4] text-mauve11">{children}</p>
            </a>
        </NavigationMenuLink>
    </li>
));
ListItem.displayName = "ListItem";
