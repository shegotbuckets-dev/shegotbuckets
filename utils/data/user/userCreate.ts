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
            return error;
        }

        return { success: true };
    } catch (error: any) {
        throw error;
    }
};
