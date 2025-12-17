import { Separator } from "@/components/ui/separator";
import { fetchEvents } from "@/utils/actions/supabase";

import EventSection from "./_components/event-section";
import { EventsHero } from "./_components/events-hero";

export const metadata = {
    title: "Events",
    description:
        "Explore upcoming She Got Buckets events, tournaments, and basketball programs. Register for events and join our community of empowered women athletes.",
    openGraph: {
        title: "She Got Buckets Events",
        description:
            "Explore upcoming She Got Buckets events, tournaments, and basketball programs. Register for events and join our community of empowered women athletes.",
    },
};

export default async function EventsPage() {
    const allEvents = await fetchEvents();

    // Filter active events and sort by date ascending
    const activeEvents = allEvents
        .filter((event) => event.active === true)
        .sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            return a.date.localeCompare(b.date);
        });

    return (
        <main className="min-h-screen">
            {/* Hero section - no background needed as it has its own background */}
            <EventsHero />

            {/* Events section */}
            <div className="flex w-full justify-center items-center bg-white/10">
                <div className="w-full max-w-5xl px-6 py-12 md:py-16 lg:py-20">
                    {/* Events List */}
                    {activeEvents.length > 0 ? (
                        <div>
                            {activeEvents.map((event) => (
                                <EventSection
                                    key={event.event_id}
                                    event={event}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-12">
                            <p className="text-xl">
                                No upcoming events at this time.
                            </p>
                            <p className="text-sm mt-2">
                                Check back soon for new events!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
