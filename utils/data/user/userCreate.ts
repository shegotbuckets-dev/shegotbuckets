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
        const { error } = await supabase.from("users").insert([
            {
                email,
                first_name,
                last_name,
                profile_image_url,
                user_id,
                data_collected: false,
                // Initialize all registration fields as null
                legal_first_name: null,
                legal_last_name: null,
                preferred_first_name: null,
                date_of_birth: null,
                phone_number: null,
                address: null,
                instagram_account: null,
                player_introduction: null,
                headshot_url: null,
            },
        ]);

        if (error) {
            return error;
        }

        return { success: true };
    } catch (error: any) {
        throw error;
    }
};
