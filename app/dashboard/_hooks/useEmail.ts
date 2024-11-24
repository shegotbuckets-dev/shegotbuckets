type emailData = {
    name: string;
    email: string;
    signatureData: string;
    firstName: string;
    lastName: string;
    tournamentName: string;
    location: string;
    eventDate: string;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions {
    method: HttpMethod;
    endpoint: string;
    data?: emailData;
}

export const emailAPI = async <T, R>({
    method,
    endpoint,
    data,
}: ApiOptions): Promise<R> => {
    const response = await fetch(endpoint, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};
