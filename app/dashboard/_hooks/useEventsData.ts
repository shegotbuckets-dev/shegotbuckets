import { EventsData, StripePriceIds } from "@/app/dashboard/types";
import { fetchFromTable } from "@/utils/actions/supabase";

import { useCallback, useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

export const useEventsData = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [eventsData, setEventsData] = useState<EventsData>({
        activeEvents: [],
        previousEvents: [],
    });

    const fetchEventsData = useCallback(async () => {
        const userEmail = user?.emailAddresses[0]?.emailAddress;
        if (!userEmail) {
            setLoading(false);
            return;
        }

        try {
            const events = await fetchFromTable("events");
            const registrations = await fetchFromTable("event_registrations");
            const payments = await fetchFromTable("event_payments");
            const teams = await fetchFromTable("teams");

            // Get only this user's player records
            const userPlayers = await fetchFromTable("event_players", {
                eq: { column: "user_email", value: userEmail },
            });

            const teamMap = new Map(
                teams.map((team) => [team.team_id, team.name])
            );

            const processedEvents = events.map((event) => {
                // Get all registrations for this eventc
                const eventRegistrations = registrations.filter(
                    (r) => r.event_id === event.event_id
                );

                // Find if user is registered in any team for this event
                const userPlayer = userPlayers.find((p) =>
                    eventRegistrations.some(
                        (r) => r.registration_id === p.registration_id
                    )
                );

                // Get user's specific registration if they're registered
                const userRegistration = userPlayer
                    ? eventRegistrations.find(
                          (r) =>
                              r.registration_id === userPlayer.registration_id
                      )
                    : undefined;

                const paymentStatus = payments
                    .filter((p) => p.event_id === event.event_id)
                    .some(
                        (p) =>
                            p.registration_id ===
                                userRegistration?.registration_id &&
                            p.payment_status === true
                    );

                // Transform stripe_price_ids from Json to StripePriceIds
                let parsedPriceIds: StripePriceIds | null = null;
                if (event.stripe_price_ids) {
                    try {
                        const priceIds =
                            typeof event.stripe_price_ids === "string"
                                ? JSON.parse(event.stripe_price_ids)
                                : event.stripe_price_ids;

                        if (priceIds.required || priceIds.optional) {
                            parsedPriceIds = {
                                required: Array.isArray(priceIds.required)
                                    ? priceIds.required
                                    : [],
                                optional: Array.isArray(priceIds.optional)
                                    ? priceIds.optional
                                    : [],
                            };
                        }
                    } catch (e) {
                        console.error("Error parsing stripe_price_ids:", e);
                    }
                }

                return {
                    ...event,
                    userStatus: {
                        isRegistered: !!userPlayer,
                        registration_id: userRegistration?.registration_id,
                        team: userRegistration?.team_id
                            ? teamMap.get(userRegistration.team_id)
                            : undefined,
                        waiverSigned: !!userPlayer?.waiver_signed,
                        paymentStatus: paymentStatus,
                    },
                    stripe_price_ids: parsedPriceIds,
                };
            });

            setEventsData({
                activeEvents: processedEvents.filter((e) => e.active),
                previousEvents: processedEvents.filter((e) => !e.active),
            });
        } catch (error) {
            setEventsData({
                activeEvents: [],
                previousEvents: [],
            });
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchEventsData();
    }, [fetchEventsData]);

    return { loading, eventsData, refresh: fetchEventsData };
};
