"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEventsData } from "@/utils/hook/useEventsData";

import EventsTable from "./events-table";

export default function EventSection() {
    const { loading, eventData } = useEventsData();

    return (
        <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-semibold">Available Events</h2>
                </div>
                <div className="p-4">
                    <EventsTableContainer
                        loading={loading}
                        eventData={{
                            ...eventData,
                            events: eventData.events.filter(
                                (event) => event.active
                            ),
                        }}
                    />
                </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-semibold">Previous Events</h2>
                </div>
                <div className="p-4">
                    <EventsTableContainer
                        loading={loading}
                        eventData={{
                            ...eventData,
                            events: eventData.events.filter(
                                (event) => !event.active
                            ),
                        }}
                    />
                </div>
            </section>
        </div>
    );
}

function EventsTableContainer({
    loading,
    eventData,
}: {
    loading: boolean;
    eventData: ReturnType<typeof useEventsData>["eventData"];
}) {
    if (loading) {
        return <TableSkeleton />;
    }

    if (eventData.events.length === 0) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="flex flex-col items-center text-center max-w-md">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2">
                        No events found
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Check back later for updates!
                    </p>
                </div>
            </div>
        );
    }

    return <EventsTable eventData={eventData} />;
}

function TableSkeleton() {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: 7 }).map((_, i) => (
                            <TableHead key={i}>
                                <Skeleton className="h-4 w-20" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 3 }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: 7 }).map((_, cellIndex) => (
                                <TableCell key={cellIndex}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
