import { StripePriceIds } from "@/app/dashboard/types";
import { fetchFromTable } from "@/utils/actions/supabase";

import { NextResponse } from "next/server";

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

        const processedEvents = events.map((event) => {
            const eventRegistrations = registrations.filter(
                (r) => r.event_id === event.event_id
            );

            const currentUserPlayerRecord = currentUserPlayerRecords.find(
                (playerRecord) =>
                    eventRegistrations.some(
                        (registration) =>
                            registration.registration_id ===
                            playerRecord.registration_id
                    )
            );

            const userRegistration = currentUserPlayerRecord
                ? eventRegistrations.find(
                      (registration) =>
                          registration.registration_id ===
                          currentUserPlayerRecord.registration_id
                  )
                : undefined;

            const team_id = userRegistration?.team_id || undefined;

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
                    isRegistered: !!currentUserPlayerRecord,
                    registration_id: userRegistration?.registration_id,
                    team: userRegistration?.team_id
                        ? teamMap.get(userRegistration.team_id)
                        : undefined,
                    team_id,
                    waiverSigned: !!currentUserPlayerRecord?.waiver_signed,
                    paymentStatus: userRegistration?.paid ?? false,
                },
                stripe_price_ids: parsedPriceIds,
            };
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
