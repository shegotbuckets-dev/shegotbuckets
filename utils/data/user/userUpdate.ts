"server only";

import { userUpdateProps } from "@/utils/types";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const userUpdate = async ({
    email,
    first_name,
    last_name,
    profile_image_url,
    user_id,
}: userUpdateProps) => {
    // Verify environment variables
    if (
        !process.env.SUPABASE_SERVICE_ROLE_KEY ||
        !process.env.NEXT_PUBLIC_SUPABASE_URL
    ) {
        throw new Error("Missing required Supabase configuration");
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
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

    try {
        const { error } = await supabase
            .from("users")
            .update({
                email,
                first_name,
                last_name,
                profile_image_url,
            })
            .eq("user_id", user_id);

        if (error) {
            console.error("[UserUpdate] Failed:", {
                userId: user_id,
                error: error.message,
                code: error.code,
            });
            return error;
        }

        console.log("[UserUpdate] Success:", {
            userId: user_id,
            email,
        });

        return { success: true };
    } catch (error: any) {
        console.error("[UserUpdate] Exception:", {
            userId: user_id,
            error: error.message,
        });
        throw error;
    }
};
