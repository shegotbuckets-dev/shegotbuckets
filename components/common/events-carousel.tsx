import RegistrationButton from "@/components/common/register-button";
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
import { Database } from "@/constants/supabase";
import { fetchEvents } from "@/utils/actions/events";

import React from "react";

import { PlusIcon } from "lucide-react";

function EventDialog({
    event,
}: {
    event: Database["public"]["Tables"]["events"]["Row"];
}) {
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
                className="flex h-72 w-full max-w-[270px] mx-auto flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
            >
                <div className="h-40 w-full">
                    <DialogImage
                        src={event.image ?? ""}
                        alt={event.title}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex flex-1 flex-row items-start justify-between p-4 h-32">
                    <div className="flex flex-col justify-between h-full overflow-hidden">
                        <div>
                            <DialogTitle className="text-zinc-950 dark:text-zinc-50 line-clamp-2 text-base">
                                {event.title}
                            </DialogTitle>
                            <DialogSubtitle className="text-zinc-700 dark:text-zinc-400 line-clamp-2 text-sm mt-1">
                                {event.subtitle}
                            </DialogSubtitle>
                        </div>
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
                    className="pointer-events-auto relative flex h-auto w-[95%] sm:w-[90%] max-w-[400px] sm:max-w-[500px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 mx-auto"
                >
                    <DialogImage
                        src={event.image ?? ""}
                        alt={event.title}
                        className="h-48 sm:h-64 w-full object-cover"
                    />
                    <div className="p-4 sm:p-8">
                        <DialogTitle className="text-xl sm:text-2xl text-zinc-950 dark:text-zinc-50">
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
                            <div className="flex flex-row gap-4 mt-4">
                                <RegistrationButton>
                                    <Button>Register Now</Button>
                                </RegistrationButton>
                                <div className="sm:w-[140px]">
                                    <DialogButton
                                        href={`/eventpage/${event.event_id}`}
                                        buttonText="Event Details"
                                        buttonVariant="outline"
                                        buttonClassName="w-full border-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    />
                                </div>
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
        case "default":
            return (
                <CarouselNavigation
                    className="absolute -left-4 sm:-left-8 md:-left-12 top-1/2 flex w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] md:w-[calc(100%+6rem)] -translate-y-1/2 justify-between"
                    classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800 z-10"
                    alwaysShow
                />
            );
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
        default:
            return <CarouselNavigation />;
    }
}

export default async function EventsCarousel({
    carouselNavPosition,
}: {
    carouselNavPosition: "default" | "bottom" | "top";
}) {
    const events = await fetchEvents();
    if (!events) {
        return null;
    }

    return (
        <div className="relative w-full px-4 sm:px-8 md:px-12">
            <Carousel className="overflow-visible">
                <CarouselContent className="-ml-4">
                    {events.map((event) => (
                        <CarouselItem
                            key={event.event_id}
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
