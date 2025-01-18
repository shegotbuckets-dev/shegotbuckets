import { useQuery } from "@tanstack/react-query";

const fetchMembersFromAPI = async () => {
    const response = await fetch("/api/members");
    if (!response.ok) throw new Error("Failed to fetch members");

    return response.json();
};

export const useMembers = () => {
    return useQuery({
        queryKey: ["get-members"],
        queryFn: fetchMembersFromAPI,
    });
};
