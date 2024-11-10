// import { Clerk } from "@clerk/clerk-js";
import { createClient } from "@supabase/supabase-js";

type GetPublicUrlResponse = {
    publicUrl: string;
};

// Initialize Supabase client without setting auth initially
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Use the anon key for client-side requests
);

// // Function to set the JWT token for Supabase authentication
// export const setSupabaseAuth = async () => {
//     const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!);
//     await clerk.load();
//     const jwt = await clerk.session?.getToken();
//     if (jwt) {
//         supabase.auth.setSession({ access_token: jwt, refresh_token: "" });
//     } else {
//         supabase.auth.setSession({
//             access_token: "",
//             refresh_token: "",
//         });
//     }
// };

// Function to get a public image URL from Supabase storage
export const getImageUrl = async (
    bucket: string,
    path: string
): Promise<string> => {
    const { data, error } = (await supabase.storage
        .from(bucket)
        .getPublicUrl(path)) as {
        data: GetPublicUrlResponse | null;
        error: Error | null;
    };

    if (error) {
        throw new Error(`Error fetching image URL: ${error.message}`);
    }

    if (!data) {
        throw new Error("No data returned when fetching image URL");
    }

    return data.publicUrl;
};

export default supabase;
