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
        <section className="py-5">
            {/* Section Title */}
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-purple-900 dark:text-purple-400">
                {sectionTitle}
            </h2>

            {/* Event Details */}
            <div className="space-y-2 mb-4 text-[15px] font-semibold text-gray-800 dark:text-gray-200">
                <div>
                    <span>EVENT TITLE: </span>
                    <span className="font-normal">{event.title}</span>
                </div>

                <div>
                    <span>DATE: </span>
                    <span className="font-normal">{displayDate}</span>
                </div>

                <div>
                    <span>LOCATION: </span>
                    <span className="font-normal">{displayLocation}</span>
                </div>

                <div>
                    <span>REGISTRATION: </span>
                    <span className="text-purple-900 dark:text-purple-400">
                        {registrationStatus}
                    </span>
                </div>
            </div>

            {/* Action Buttons - only show if external URL exists */}
            {event.event_external_url && (
                <div className="flex gap-1 w-full">
                    <Button
                        asChild
                        size="default"
                        className="flex-1 bg-purple-700 hover:bg-purple-800 h-9 uppercase"
                    >
                        <Link href="/dashboard/home">REGISTER NOW</Link>
                    </Button>

                    <Button
                        asChild
                        size="default"
                        variant="outline"
                        className="flex-1 border-purple-700 text-purple-700 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950 h-9 uppercase"
                    >
                        <Link
                            href={event.event_external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            VIEW MORE INFO
                        </Link>
                    </Button>
                </div>
            )}
        </section>
    );
}
