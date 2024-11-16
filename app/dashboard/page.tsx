import EventsTable from "@/app/dashboard/_components/events-table";
import { Database } from "@/constants/supabase";
import { fetchEvents, fetchTeams } from "@/utils/actions/supabase";

export default async function DashboardPage() {
    const events = await fetchEvents();
    const teams = await fetchTeams();
    const availableEvents = events.filter((event) => event.active);
    const pastEvents = events.filter((event) => !event.active);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8">
                She Got Buckets Dashboard
            </h1>

            <div className="grid gap-8">
                {/* <EventSection
                    title="Registered Events"
                    events={registeredEvents}
                /> */}
                <EventSection
                    title="Available Events"
                    events={availableEvents}
                    teams={teams}
                />
                <EventSection title="Previous Events" events={pastEvents} />
            </div>
        </div>
    );
}

type EventSectionProps = {
    title: string;
    events: Database["public"]["Tables"]["events"]["Row"][];
    teams?: Database["public"]["Tables"]["teams"]["Row"][];
};

function EventSection({ title, events, teams }: EventSectionProps) {
    return (
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-2xl font-semibold">{title}</h2>
            </div>
            <div className="p-4">
                {events.length > 0 ? (
                    <EventsTable events={events} teams={teams} />
                ) : (
                    <div className="flex justify-center items-center py-8">
                        <div className="flex flex-col items-center text-center max-w-md">
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2">
                                You have no activity with us so far
                            </h3>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Events will show when you participate in events
                                with She Got Buckets
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
