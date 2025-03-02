import { DashboardData } from "@/app/dashboard/types";
import { fetchFromTable } from "@/utils/actions/supabase";

import { useCallback, useEffect, useState } from "react";

export const useDashboardData = () => {
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
                fetchFromTable("event_registrations"),
                fetchFromTable("event_players"),
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
};
