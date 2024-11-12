import { createAdminClient } from "@/lib/supabase-admin";
import { userCreateProps } from "@/utils/types";

export const userCreate = async ({
    email,
    first_name,
    last_name,
    profile_image_url,
    user_id,
}: userCreateProps) => {
    const supabase = createAdminClient();

    try {
        const { error } = await supabase
            .from("users")
            .insert([
                { email, first_name, last_name, profile_image_url, user_id },
            ]);

        if (error) {
            console.error("[UserCreate] Failed:", {
                userId: user_id,
                error: error.message,
                code: error.code,
            });
            return error;
        }

        console.log("[UserCreate] Success:", { userId: user_id, email });
        return { success: true };
    } catch (error: any) {
        console.error("[UserCreate] Exception:", {
            userId: user_id,
            error: error.message,
        });
        throw error;
    }
};
