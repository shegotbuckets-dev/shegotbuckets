import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
    id: string;
    name: string;
    date: string;
    location: string;
}

// This would typically come from a database or API
const events: Event[] = [
    {
        id: "1",
        name: "Summer Basketball Camp",
        date: "2024-07-15",
        location: "City Sports Center",
    },
    {
        id: "2",
        name: "Women's 3x3 Tournament",
        date: "2024-08-20",
        location: "Downtown Courts",
    },
    {
        id: "3",
        name: "Youth Skills Workshop",
        date: "2024-06-10",
        location: "Community Gym",
    },
    {
        id: "4",
        name: "Charity Game",
        date: "2023-12-01",
        location: "Main Arena",
    },
    {
        id: "5",
        name: "Coach Clinic",
        date: "2023-11-15",
        location: "Training Center",
    },
];

export default function DashboardPage() {
    const currentDate = new Date();
    const registeredEvents = events.slice(0, 2); // Simulating registered events
    const upcomingEvents = events.filter(
        (event) => new Date(event.date) > currentDate
    );
    const previousEvents = events.filter(
        (event) => new Date(event.date) <= currentDate
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8">
                She Got Buckets Dashboard
            </h1>

            <div className="grid gap-8">
                <EventSection
                    title="Registered Events"
                    events={registeredEvents}
                />
                <EventSection title="Upcoming Events" events={upcomingEvents} />
                <EventSection title="Previous Events" events={previousEvents} />
            </div>
        </div>
    );
}

function EventSection({ title, events }: { title: string; events: Event[] }) {
    return (
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-2xl font-semibold">{title}</h2>
            </div>
            <div className="p-4">
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
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

function EventCard({ event }: { event: Event }) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg sm:text-xl">
                    {event.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow pt-2">
                <p className="text-sm text-muted-foreground mb-1">
                    Date: {event.date}
                </p>
                <p className="text-sm text-muted-foreground">
                    Location: {event.location}
                </p>
            </CardContent>
        </Card>
    );
}
