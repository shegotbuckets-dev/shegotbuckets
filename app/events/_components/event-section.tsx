import { Button } from "@/components/ui/button";
import { Database } from "@/constants/supabase";

import Link from "next/link";

type Event = Database["public"]["Tables"]["events"]["Row"];

interface EventSectionProps {
    event: Event;
}

export default function EventSection({ event }: EventSectionProps) {
    const sectionTitle =
        event.display_event_section_title_full ||
        event.title_short ||
        event.title;
    const displayDate = event.display_date || event.date || "Date TBD";
    const displayLocation =
        event.display_location_full || event.location || "Location TBD";
    const registrationStatus =
        event.display_registration_status || (event.active ? "OPEN" : "CLOSED");

    return (
        <section className="py-5 border-b last:border-b-0">
            {/* Section Title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-900 dark:text-purple-400">
                {sectionTitle}
            </h2>

            {/* Event Details */}
            <div className="space-y-2 mb-4 text-gray-800 dark:text-gray-200">
                <div>
                    <span className="font-semibold">EVENT TITLE: </span>
                    <span>{event.title}</span>
                </div>

                <div>
                    <span className="font-semibold">DATE: </span>
                    <span>{displayDate}</span>
                </div>

                <div>
                    <span className="font-semibold">LOCATION: </span>
                    <span>{displayLocation}</span>
                </div>

                <div>
                    <span className="font-semibold">REGISTRATION: </span>
                    <span className="font-semibold text-purple-900 dark:text-purple-400">
                        {registrationStatus}
                    </span>
                </div>
            </div>

            {/* Action Buttons - only show if external URL exists */}
            {event.event_external_url && (
                <div className="flex flex-wrap gap-4">
                    <Button
                        asChild
                        size="lg"
                        className="bg-purple-700 hover:bg-purple-800"
                    >
                        <Link href="/dashboard/home">Register Now</Link>
                    </Button>

                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-purple-700 text-purple-700 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950"
                    >
                        <Link
                            href={event.event_external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            VIEW MORE
                        </Link>
                    </Button>
                </div>
            )}
        </section>
    );
}
