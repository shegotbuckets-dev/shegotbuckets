import { Database } from "@/constants/supabase";
import { fetchFromTable } from "@/utils/actions/supabase";

import { useCallback, useEffect, useState } from "react";

export type DashboardData = {
    events: Database["public"]["Tables"]["events"]["Row"][];
    teams: Database["public"]["Tables"]["teams"]["Row"][];
    registrations: Database["public"]["Tables"]["registrations"]["Row"][];
    registrationPlayers: Database["public"]["Tables"]["registration_players"]["Row"][];
};

export function useDashboardData() {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        events: [],
        teams: [],
        registrations: [],
        registrationPlayers: [],
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [events, teams, registrations, players] = await Promise.all([
                fetchFromTable("events"),
                fetchFromTable("teams"),
                fetchFromTable("registrations"),
                fetchFromTable("registration_players"),
            ]);

            setDashboardData({
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
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        loading,
        dashboardData,
        refresh: fetchData,
    };
}
