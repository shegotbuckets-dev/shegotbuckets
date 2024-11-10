import { useQuery } from "@tanstack/react-query";

const fetchEventsFromAPI = async () => {
    const response = await fetch("/api/events");
    if (!response.ok) throw new Error("Failed to fetch events");

    return response.json();
};

export const useEvents = () => {
    return useQuery({
        queryKey: ["get-events"],
        queryFn: fetchEventsFromAPI,
    });
};
