import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createAdminClient = async () => {
    if (
        !process.env.SUPABASE_SERVICE_ROLE_KEY ||
        !process.env.NEXT_PUBLIC_SUPABASE_URL
    ) {
        throw new Error("Missing required Supabase configuration");
    }

    const cookieStore = await cookies();
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );
};
