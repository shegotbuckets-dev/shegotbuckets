import {
    type CookieOptions,
    createServerClient as serverClient,
} from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerClient = async () => {
    const cookieStore = await cookies();
    return serverClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {}
                },
                remove(name: string, options: CookieOptions) {
                    try {
                        cookieStore.set({ name, value: "", ...options });
                    } catch (error) {}
                },
            },
        }
    );
};
