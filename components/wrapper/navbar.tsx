"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogClose } from "@radix-ui/react-dialog";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import ModeToggle from "../mode-toggle";
import { Button } from "../ui/button";
import {
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { UserProfile } from "../user-profile";

const components: { id: string; title: string; subtitle: string }[] = [
    {
        id: "event1",
        title: "College Basketball League",
        subtitle: "Spring 2024 Season",
    },
    {
        id: "event2",
        title: "Summer Skills Camp",
        subtitle: "Spring 2024 Season",
    },
    {
        id: "event2",
        title: "National Tournament",
        subtitle: "Championship Series",
    },
];

const navItems: {
    title: string;
    href: string;
    components?: { id: string; title: string; subtitle: string }[];
}[] = [
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
        href: "/",
        components: components,
    },
    {
        title: "Get Involved",
        href: "/get-involved",
    },
];

export default function NavBar() {
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    let userId = null;
    const user = useAuth();
    userId = user?.userId;

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Default to light theme while mounting
    const currentTheme = mounted
        ? theme === "system"
            ? systemTheme
            : theme
        : "light";

    return (
        <div
            className={cn(
                "flex min-w-full fixed justify-between p-2 border-b z-30",
                currentTheme === "dark"
                    ? "bg-black"
                    : "bg-white dark:bg-opacity-50"
            )}
        >
            <div className="flex justify-between w-full min-[825px]:hidden">
                <Dialog>
                    <SheetTrigger className="p-2 transition">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="w-4 h-4"
                            aria-label="Open menu"
                            asChild
                        >
                            <GiHamburgerMenu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Next Starter</SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col space-y-3 mt-[1rem]">
                            <DialogClose asChild>
                                <Link href="/">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Home
                                    </Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link
                                    href="/dashboard"
                                    legacyBehavior
                                    passHref
                                    className="cursor-pointer"
                                >
                                    <Button variant="outline">Dashboard</Button>
                                </Link>
                            </DialogClose>
                        </div>
                    </SheetContent>
                </Dialog>
                <ModeToggle />
            </div>
            <NavigationMenu className="py-1">
                <NavigationMenuList className="max-[825px]:hidden flex gap-4 w-[100%] justify-between pr-3">
                    <Link
                        href="/"
                        className="flex items-center h-16"
                        aria-label="Home"
                    >
                        {currentTheme === "dark" ? (
                            <Image
                                src="/images/sgb-dark.png"
                                alt="SGBLogo"
                                width={120}
                                height={60}
                                className="w-[120px] h-[60px]"
                                priority
                            />
                        ) : (
                            <Image
                                src="/images/sgb-light.png"
                                alt="SGB Logo"
                                width={120}
                                height={60}
                                className="w-[120px] h-[60px]"
                                priority
                            />
                        )}
                        <span className="sr-only">Home</span>
                    </Link>
                </NavigationMenuList>
                <NavigationMenuList>
                    {navItems.map((item) =>
                        item.components ? (
                            <NavigationMenuItem
                                className="max-[825px]:hidden ml-6"
                                key={item.title}
                            >
                                <NavigationMenuTrigger className="dark:bg-black dark:bg-opacity-50 text-base">
                                    {item.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul
                                        className={cn(
                                            "flex flex-col w-[300px] gap-2 p-2 lg:w-[500px] rounded-md",
                                            currentTheme === "dark"
                                                ? "bg-black"
                                                : "bg-white dark:bg-opacity-50"
                                        )}
                                    >
                                        {item.components.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={`/eventpage/${component.id}`}
                                            >
                                                {component.subtitle}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ) : (
                            <NavigationMenuItem
                                className="max-[825px]:hidden"
                                key={item.title}
                            >
                                <Link
                                    href={item.href}
                                    legacyBehavior
                                    passHref
                                    key={item.title}
                                >
                                    <Button
                                        variant="ghost"
                                        className="text-base px-4 py-1"
                                    >
                                        {item.title}
                                    </Button>
                                </Link>
                            </NavigationMenuItem>
                        )
                    )}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4 max-[825px]:hidden">
                {userId && (
                    <Link href="/dashboard">
                        <Button
                            variant="outline"
                            className="rounded-md text-base font-semibold px-4 py-1"
                        >
                            User Portal
                        </Button>
                    </Link>
                )}
                {userId && <UserProfile />}
                <ModeToggle />
            </div>
        </div>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
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
    );
});
ListItem.displayName = "ListItem";
