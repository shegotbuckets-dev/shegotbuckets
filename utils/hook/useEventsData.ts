import { Database } from "@/constants/supabase";
import { fetchFromTable } from "@/utils/actions/supabase";

import { useEffect, useState } from "react";

export function useEventsData() {
    const [eventData, setEventData] = useState<{
        events: Database["public"]["Tables"]["events"]["Row"][];
        teams: Database["public"]["Tables"]["teams"]["Row"][];
        registrations: Database["public"]["Tables"]["registrations"]["Row"][];
        registrationPlayers: Database["public"]["Tables"]["registration_players"]["Row"][];
    }>({
        events: [],
        teams: [],
        registrations: [],
        registrationPlayers: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [events, teams, registrations, players] =
                    await Promise.all([
                        fetchFromTable("events"),
                        fetchFromTable("teams"),
                        fetchFromTable("registrations"),
                        fetchFromTable("registration_players"),
                    ]);

                setEventData({
                    events,
                    teams,
                    registrations,
                    registrationPlayers: players,
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { loading, eventData };
}
