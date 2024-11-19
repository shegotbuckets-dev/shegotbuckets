"use client";

import { useDashboardData } from "@/app/dashboard/_hooks/useDashboardData";

import { EventsTableContainer } from "./table-section/events-table-container";

export const DashboardContent = () => {
    const { loading, dashboardData, refresh } = useDashboardData();

    return (
        <div className="space-y-6">
            {/* Available Events */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-semibold">Available Events</h2>
                </div>
                <div className="p-4">
                    <EventsTableContainer
                        loading={loading}
                        dashboardData={{
                            ...dashboardData,
                            events: dashboardData.events.filter(
                                (event) => event.active
                            ),
                        }}
                        onButtonSuccess={refresh}
                    />
                </div>
            </section>

            {/* Previous Events */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-semibold">Previous Events</h2>
                </div>
                <div className="p-4">
                    <EventsTableContainer
                        loading={loading}
                        dashboardData={{
                            ...dashboardData,
                            events: dashboardData.events.filter(
                                (event) => !event.active
                            ),
                        }}
                        onButtonSuccess={refresh}
                    />
                </div>
            </section>
        </div>
    );
};
