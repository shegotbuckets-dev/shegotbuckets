import { EventsData } from "@/app/dashboard/types";

import { useCallback } from "react";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

// Keep fetcher in the same file
const fetchDashboardHomeData = async (
    userId: string,
    userEmail: string
): Promise<EventsData> => {
    const params = new URLSearchParams();
    if (userId) params.append("user_id", userId);
    if (userEmail) params.append("email", userEmail);

    const response = await fetch(
        `/api/user-dashboard-home-data?${params.toString()}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }
    return response.json();
};

export const useDashboardHomeData = () => {
    const { user } = useUser();
    const userId = user?.id;
    const userEmail = user?.emailAddresses[0]?.emailAddress;

    const query = useQuery<EventsData>({
        queryKey: ["user-dashboard-home-data", userId, userEmail],
        queryFn: () => fetchDashboardHomeData(userId!, userEmail!),
        enabled: !!userId || !!userEmail, // Can use either
        // In React Query v5, cacheTime is renamed to gcTime
        gcTime: 30 * 60 * 1000, // 30 minutes
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    // Memoize the refresh function to prevent unnecessary re-renders
    const memoizedRefresh = useCallback(() => {
        query.refetch();
    }, [query.refetch]);

    return {
        loading: query.isLoading,
        eventsData: query.data ?? {
            availableEvents: [],
            comingSoonEvents: [],
            previousEvents: [],
        },
        refresh: memoizedRefresh,
    };
};
