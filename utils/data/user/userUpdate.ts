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
            return error;
        }

        return { success: true };
    } catch (error: any) {
        throw error;
    }
};
