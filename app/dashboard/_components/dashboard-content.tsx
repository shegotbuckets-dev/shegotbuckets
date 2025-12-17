"use client";

import { useDashboardHomeData } from "@/app/dashboard/_hooks/useDashboardHomeData";

import { useCallback } from "react";

import { JoinRegistrationGlobal } from "./join-registration-global";
import { ComingSoonEventsTable } from "./table-section/coming-soon-events-table";
import { PreviousEventsTable } from "./table-section/previous-events-table";
import { RegisteredEventsTable } from "./table-section/registered-events-table";
import { UnregisteredEventsTable } from "./table-section/unregistered-events-table";

export const DashboardContent = () => {
    const { loading, eventsData, refresh } = useDashboardHomeData();

    const handleTableAction = useCallback(() => {
        refresh();
    }, [refresh]);

    // Split available events into registered and unregistered
    const registeredEvents = (eventsData?.availableEvents ?? []).filter(
        (event) => event.userStatus.isRegistered
    );
    const unregisteredEvents = (eventsData?.availableEvents ?? []).filter(
        (event) => !event.userStatus.isRegistered
    );

    return (
        <div className="space-y-6 max-w-full overflow-hidden">
            {/* Global Join Team Section */}
            <JoinRegistrationGlobal />

            {/* Events Available for Register */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Events Available
                    </h2>
                </div>
                <div className="p-2 sm:p-4 space-y-6">
                    {/* Your Active Registrations */}
                    {registeredEvents.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3 px-2">
                                Your Active Registrations
                            </h3>
                            <RegisteredEventsTable
                                events={registeredEvents}
                                onButtonSuccess={handleTableAction}
                                loading={loading}
                            />
                        </div>
                    )}

                    {/* Events You Can Register For */}
                    {unregisteredEvents.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3 px-2">
                                Events You Can Register For
                            </h3>
                            <UnregisteredEventsTable
                                events={unregisteredEvents}
                                onButtonSuccess={handleTableAction}
                                loading={loading}
                            />
                        </div>
                    )}

                    {/* Empty state when no available events */}
                    {registeredEvents.length === 0 &&
                        unregisteredEvents.length === 0 &&
                        !loading && (
                            <div className="text-center text-muted-foreground py-8">
                                No events available to register
                            </div>
                        )}
                </div>
            </section>

            {/* Events Coming Soon */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Events Coming Soon
                    </h2>
                    <h3 className="text-xs sm:text-sm text-muted-foreground">
                        Registration will open soon for these events.
                    </h3>
                </div>
                <div className="p-2 sm:p-4">
                    <ComingSoonEventsTable
                        events={eventsData?.comingSoonEvents ?? []}
                        loading={loading}
                    />
                </div>
            </section>

            {/* Events Participated Previously */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Events Participated Previously
                    </h2>
                </div>
                <div className="p-2 sm:p-4">
                    <PreviousEventsTable
                        events={eventsData?.previousEvents ?? []}
                        onButtonSuccess={handleTableAction}
                        loading={loading}
                    />
                </div>
            </section>
        </div>
    );
};
