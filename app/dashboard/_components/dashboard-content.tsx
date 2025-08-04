"use client";

import { useDashboardHomeData } from "@/app/dashboard/_hooks/useDashboardHomeData";

import { useCallback } from "react";

import { EventsTable } from "./table-section/events-table";

export const DashboardContent = () => {
    const { loading, eventsData, refresh } = useDashboardHomeData();

    const handleTableAction = useCallback(() => {
        refresh();
    }, [refresh]);

    return (
        <div className="space-y-6">
            {/* Available Events */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-semibold">Available Events</h2>
                    <h3 className="text-sm text-muted-foreground">
                        If you don&apos;t see your team in register popup,
                        please contact us at info@shegotbuckets.org.
                    </h3>
                </div>
                <div className="p-4">
                    <EventsTable
                        events={eventsData?.activeEvents ?? []}
                        onButtonSuccess={handleTableAction}
                        loading={loading}
                    />
                </div>
            </section>

            {/* Previous Events */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-semibold">Previous Events</h2>
                </div>
                <div className="p-4">
                    <EventsTable
                        events={eventsData.previousEvents}
                        onButtonSuccess={handleTableAction}
                        loading={loading}
                    />
                </div>
            </section>
        </div>
    );
};
