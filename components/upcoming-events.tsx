import { Button } from "@/components/ui/button";
import {
    Dialog,
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

// Mock data for upcoming events
const upcomingEvents = [
    {
        id: 1,
        title: "College Basketball League",
        subtitle: "Spring 2024 Season",
        image: "/images/league.png",
        description: `Join our competitive college basketball league starting this spring. 
        Teams will compete in a round-robin format followed by playoffs. 
        Perfect for college students looking to play organized basketball.`,
        date: "Starts March 15, 2024",
        location: "Main Campus Arena",
        price: "$250 per team",
    },
    {
        id: 2,
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
    {
        id: 3,
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
];

// Add this interface near the top of the file, after the imports
interface Event {
    id: number;
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
                            <Button className="mt-4">Register Now</Button>
                        </DialogDescription>
                    </div>
                    <DialogClose className="text-zinc-50" />
                </DialogContent>
            </DialogContainer>
        </Dialog>
    );
}

interface UpcomingEventsProps {
    className?: string;
}

export default function UpcomingEvents({ className }: UpcomingEventsProps) {
    return (
        <div className="flex flex-wrap gap-4 justify-start">
            {upcomingEvents.map((event) => (
                <EventDialog key={event.id} event={event} />
            ))}
        </div>
    );
}
