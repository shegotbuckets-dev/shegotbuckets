import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNavigation,
} from "@/components/ui/motion-carousel";
import {
    Dialog,
    DialogButton,
    DialogClose,
    DialogContainer,
    DialogContent,
    DialogDescription,
    DialogImage,
    DialogSubtitle,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/motion-dialog";

import React from "react";

import { PlusIcon } from "lucide-react";
import Link from "next/link";

// Mock data for upcoming events
interface Event {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
}
const events: { [key: string]: Event } = {
    event1: {
        id: "event1",
        title: "College Basketball League",
        subtitle: "Spring 2024 Season",
        image: "/images/sgb-homevideo-placeholder.png",
        description: `Join our competitive college basketball league starting this spring. 
        Teams will compete in a round-robin format followed by playoffs. 
        Perfect for college students looking to play organized basketball.`,
        date: "Starts March 15, 2024",
        location: "Main Campus Arena",
        price: "$250 per team",
    },
    event2: {
        id: "event2",
        title: "Summer Skills Camp",
        subtitle: "Elite Training Program",
        image: "/images/league.png",
        description: `Intensive basketball skills development camp led by professional coaches. 
        Focus on fundamentals, advanced techniques, and game strategy. 
        Limited spots available for serious players looking to improve their game.`,
        date: "July 10-24, 2024",
        location: "SGB Training Facility",
        price: "$450 per player",
    },
    event3: {
        id: "event3",
        title: "National Tournament",
        subtitle: "Championship Series",
        image: "/images/sgb-homevideo-placeholder.png",
        description: `Annual national tournament bringing together top teams from across the country. 
        Compete against the best talent and showcase your skills. 
        Tournament includes division brackets for different skill levels.`,
        date: "August 15-20, 2024",
        location: "National Sports Complex",
        price: "$600 per team",
    },
    event4: {
        id: "event4",
        title: "National Tournament",
        subtitle: "Championship Series",
        image: "/images/league.png",
        description: `Annual national tournament bringing together top teams from across the country. 
        Compete against the best talent and showcase your skills. 
        Tournament includes division brackets for different skill levels.`,
        date: "August 15-20, 2024",
        location: "National Sports Complex",
        price: "$600 per team",
    },
};

// Add this interface near the top of the file, after the imports
interface Event {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    date: string;
    location: string;
    price: string;
}

function EventDialog({ event }: { event: Event }) {
    return (
        <Dialog
            transition={{
                type: "spring",
                bounce: 0.05,
                duration: 0.25,
            }}
        >
            <DialogTrigger
                style={{
                    borderRadius: "12px",
                }}
                className="flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
            >
                <DialogImage
                    src={event.image}
                    alt={event.title}
                    className="h-48 w-full object-cover"
                />
                <div className="flex flex-grow flex-row items-end justify-between p-4">
                    <div className="min-h-[80px]">
                        <DialogTitle className="text-zinc-950 dark:text-zinc-50">
                            {event.title}
                        </DialogTitle>
                        <DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
                            {event.subtitle}
                        </DialogSubtitle>
                    </div>
                    <button
                        type="button"
                        className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
                        aria-label="Open dialog"
                    >
                        <PlusIcon size={12} />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContainer>
                <DialogContent
                    style={{
                        borderRadius: "24px",
                    }}
                    className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
                >
                    <DialogImage
                        src={event.image}
                        alt={event.title}
                        className="h-64 w-full object-cover"
                    />
                    <div className="p-8">
                        <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
                            {event.title}
                        </DialogTitle>
                        <DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
                            {event.subtitle}
                        </DialogSubtitle>
                        <DialogDescription
                            disableLayoutAnimation
                            variants={{
                                initial: { opacity: 0, scale: 0.8, y: 100 },
                                animate: { opacity: 1, scale: 1, y: 0 },
                                exit: { opacity: 0, scale: 0.8, y: 100 },
                            }}
                        >
                            <p className="mt-2 text-zinc-500 dark:text-zinc-500">
                                {event.description}
                            </p>
                            <div className="mt-4 space-y-2">
                                <p className="text-zinc-500">
                                    <strong>Date:</strong> {event.date}
                                </p>
                                <p className="text-zinc-500">
                                    <strong>Location:</strong> {event.location}
                                </p>
                                <p className="text-zinc-500">
                                    <strong>Price:</strong> {event.price}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <DialogButton
                                    href="/about"
                                    buttonText="Register Now"
                                />
                                <DialogButton
                                    href={`/eventpage/${event.id}`}
                                    buttonText="Event Details"
                                    buttonVariant="outline"
                                    buttonClassName="w-full border-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                />
                            </div>
                        </DialogDescription>
                    </div>
                    <DialogClose className="text-zinc-50" />
                </DialogContent>
            </DialogContainer>
        </Dialog>
    );
}

function CarouselNavigationComponent({
    carouselNavPosition,
}: {
    carouselNavPosition: "default" | "bottom" | "top";
}) {
    switch (carouselNavPosition) {
        case "bottom":
            return (
                <CarouselNavigation
                    className="absolute -top-10 left-auto bottom-auto w-full justify-end gap-2"
                    classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                    alwaysShow
                />
            );
        case "top":
            return (
                <CarouselNavigation
                    className="absolute -top-10 left-auto bottom-auto w-full justify-end gap-2"
                    classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                    alwaysShow
                />
            );
        case "default":
            return (
                <CarouselNavigation
                    className="absolute -left-[12%] top-1/2 flex w-[120%] -translate-y-1/2 justify-between px-2"
                    classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
                    alwaysShow
                />
            );
        default:
            return <CarouselNavigation />;
    }
}

export default function EventsCarousel({
    carouselNavPosition,
}: {
    carouselNavPosition: "default" | "bottom" | "top";
}) {
    return (
        <div className="relative w-full px-4">
            <Carousel>
                <CarouselContent className="-ml-4">
                    {Object.values(events).map((event: Event) => (
                        <CarouselItem
                            key={event.id}
                            className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                        >
                            <EventDialog event={event} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNavigationComponent
                    carouselNavPosition={carouselNavPosition}
                />
            </Carousel>
        </div>
    );
}
