import { useQuery } from "@tanstack/react-query";

const fetchLeaguesFromAPI = async () => {
    const response = await fetch("/api/leagues");
    if (!response.ok) throw new Error("Failed to fetch leagues");

    return response.json();
};

export const useLeagues = () => {
    return useQuery({
        queryKey: ["get-leagues"],
        queryFn: fetchLeaguesFromAPI,
    });
};
