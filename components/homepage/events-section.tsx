import { TITLE_TAILWIND_CLASS } from "@/utils/constants";
import UpcomingEvents from "@/components/upcoming-events";

export default function EventsSection() {
    return (
        <div className="w-full flex flex-col items-center my-8">
            <header className="text-center">
                <h1
                    className={`${TITLE_TAILWIND_CLASS} font-semibold tracking-tight dark:text-white text-gray-900 mb-4`}
                >
                    Upcoming Events
                </h1>
                <p className="text-gray-600 dark:text-gray-400 pb-6">
                    Checkout our upcoming events this year!
                </p>
                <div className="relative left-1/2 -translate-x-1/2 h-px bg-gray-200 dark:bg-gray-700 w-screen max-w-[75vw] mb-6" />
            </header>

            <div className="flex flex-wrap justify-start gap-6 w-full">
                <UpcomingEvents />
            </div>
        </div>
    );
}
