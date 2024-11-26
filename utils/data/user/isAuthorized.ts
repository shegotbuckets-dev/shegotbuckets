"server only";

import config from "@/tailwind.config";

import { clerkClient } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const isAuthorized = async (
    userId: string
): Promise<{ authorized: boolean; message: string }> => {
    // if (!config?.payments?.enabled) {
    //     return {
    //         authorized: true,
    //         message: "Payments are disabled",
    //     };
    // }

    const clerk = await clerkClient();
    const result = await clerk.users.getUser(userId);

    if (!result) {
        return {
            authorized: false,
            message: "User not found",
        };
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
            },
        }
    );

    try {
        const { data, error } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("user_id", userId);

        if (error?.code)
            return {
                authorized: false,
                message: error.message,
            };

        if (data && data[0].status === "active") {
            return {
                authorized: true,
                message: "User is subscribed",
            };
        }

        return {
            authorized: false,
            message: "User is not subscribed",
        };
    } catch (error: any) {
        return {
            authorized: false,
            message: error.message,
        };
    }
};
