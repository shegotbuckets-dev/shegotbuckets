import EventCard from "@/components/homepage/events-carousel/event-card";
import EventsCarouselNav from "@/components/homepage/events-carousel/events-carousel-nav";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/motion-carousel";
import { fetchEvents } from "@/utils/actions/supabase";

import React from "react";

export default async function EventsCarousel({
    carouselNavPosition,
}: {
    carouselNavPosition: "default" | "bottom" | "top";
}) {
    const events = await fetchEvents();
    if (!events) {
        return null;
    }

    const maxSlides = {
        lg: Math.max(0, events.length - 4),
        md: Math.max(0, events.length - 3),
        sm: Math.max(0, events.length - 2),
        default: Math.max(0, events.length - 1),
    };

    const rightChevronEnabled = {
        lg: events.length > 4,
        md: events.length > 3,
        sm: events.length > 2,
        default: events.length > 1,
    };

    return (
        <div className="relative w-full px-4 sm:px-8 md:px-12">
            <Carousel className="overflow-visible">
                <CarouselContent className="-ml-4">
                    {events
                        .sort((a, b) =>
                            a.active === b.active ? 0 : a.active ? -1 : 1
                        )
                        .map((event) => (
                            <CarouselItem
                                key={event.event_id}
                                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                            >
                                <EventCard event={event} />
                            </CarouselItem>
                        ))}
                </CarouselContent>
                <EventsCarouselNav
                    carouselNavPosition={carouselNavPosition}
                    rightChevronEnabled={rightChevronEnabled}
                    maxSlides={maxSlides}
                />
            </Carousel>
        </div>
    );
}
