import { Separator } from "@/components/ui/separator";

import EventsCarousel from "./events-carousel/events-carousel";

export const EventsSection = () => {
    return (
        <section className="w-4/5 mx-auto my-12 md:my-16 lg:my-20">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-4">
                    Inspiring Events
                </h2>
                <Separator className="mb-16 mx-auto w-96" />
                <EventsCarousel carouselNavPosition="default" />
            </div>
        </section>
    );
};
