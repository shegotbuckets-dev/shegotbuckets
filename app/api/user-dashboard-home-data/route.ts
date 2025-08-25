/* eslint-disable no-console */
import { StripePriceIds } from "@/app/dashboard/types";
import { fetchFromTable } from "@/utils/actions/supabase";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userEmail = searchParams.get("email");

        if (!userEmail) {
            return NextResponse.json(
                { error: "User email is required" },
                { status: 400 }
            );
        }

        const [events, teams, registrations, currentUserPlayerRecords] =
            await Promise.all([
                fetchFromTable("events"),
                fetchFromTable("teams"),
                fetchFromTable("event_registrations"),
                fetchFromTable("event_players", {
                    eq: { column: "user_email", value: userEmail },
                }),
            ]);

        const teamMap = new Map(teams.map((team) => [team.team_id, team.name]));

        const processedEvents = events.flatMap((event) => {
            const eventRegistrations = registrations.filter(
                (r) => r.event_id === event.event_id
            );

            // Find ALL player records for this user in this event (supports multi-team users)
            const userPlayerRecordsForEvent = currentUserPlayerRecords.filter(
                (playerRecord) =>
                    eventRegistrations.some(
                        (registration) =>
                            registration.registration_id ===
                            playerRecord.registration_id
                    )
            );

            // Parse price IDs once for this event
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

            // If user has no registrations for this event, return single entry with no team
            if (userPlayerRecordsForEvent.length === 0) {
                return [
                    {
                        ...event,
                        original_event_id: event.event_id,
                        userStatus: {
                            isRegistered: false,
                            registration_id: undefined,
                            team: undefined,
                            team_id: undefined,
                            waiverSigned: false,
                            paymentStatus: false,
                        },
                        stripe_price_ids: parsedPriceIds,
                    },
                ];
            }

            // Create separate event entry for each team the user is registered with
            return userPlayerRecordsForEvent.map((playerRecord) => {
                const userRegistration = eventRegistrations.find(
                    (registration) =>
                        registration.registration_id ===
                        playerRecord.registration_id
                );

                const team_id = userRegistration?.team_id || undefined;

                return {
                    ...event,
                    // Add unique identifier for multi-team scenarios
                    event_id: `${event.event_id}_${team_id || "no_team"}`,
                    original_event_id: event.event_id,
                    userStatus: {
                        isRegistered: true,
                        registration_id: userRegistration?.registration_id,
                        team: team_id ? teamMap.get(team_id) : undefined,
                        team_id,
                        waiverSigned: !!playerRecord?.waiver_signed,
                        paymentStatus: userRegistration?.paid ?? false,
                    },
                    stripe_price_ids: parsedPriceIds,
                };
            });
        });

        return NextResponse.json({
            activeEvents: processedEvents.filter((e) => e.active),
            previousEvents: processedEvents.filter((e) => !e.active),
        });
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}
