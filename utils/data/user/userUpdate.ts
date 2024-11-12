"server only";

import { createAdminClient } from "@/lib/supabase-admin";
import { userUpdateProps } from "@/utils/types";

export const userUpdate = async ({
    email,
    first_name,
    last_name,
    profile_image_url,
    user_id,
}: userUpdateProps) => {
    const supabase = createAdminClient();

    try {
        const { error } = await supabase
            .from("users")
            .update({ email, first_name, last_name, profile_image_url })
            .eq("user_id", user_id);

        if (error) {
            console.error("[UserUpdate] Failed:", {
                userId: user_id,
                error: error.message,
                code: error.code,
            });
            return error;
        }

        console.log("[UserUpdate] Success:", { userId: user_id, email });
        return { success: true };
    } catch (error: any) {
        console.error("[UserUpdate] Exception:", {
            userId: user_id,
            error: error.message,
        });
        throw error;
    }
};
