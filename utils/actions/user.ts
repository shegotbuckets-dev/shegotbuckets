"use server";

import { Database } from "@/constants/supabase";
import { createAdminClient } from "@/lib/supabase-admin";

import { unstable_noStore as noStore } from "next/cache";

import { fetchSingleFromTable } from "./supabase";

type TableRow<T extends keyof Database["public"]["Tables"]> =
    Database["public"]["Tables"][T]["Row"];

export async function fetchUserData(userId: string) {
    if (!userId) {
        throw new Error("User ID is required");
    }

    const supabase = await createAdminClient();
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) {
        if (error.code === "PGRST116") return null;
        throw new Error(`Failed to fetch user data: ${error.message}`);
    }

    return data;
}

export async function fetchUserDataCollectedStatus(
    userId: string
): Promise<boolean> {
    if (!userId) {
        throw new Error("User ID is required");
    }

    const supabase = await createAdminClient();
    const { data, error } = await supabase
        .from("users")
        .select("data_collected")
        .eq("user_id", userId)
        .single();

    if (error) {
        if (error.code === "PGRST116") return false;
        throw new Error(`Failed to fetch user data: ${error.message}`);
    }

    return data?.data_collected ?? false;
}

export async function updateUserRegistrationData(
    userId: string,
    data: {
        legal_first_name: string;
        legal_last_name: string;
        preferred_first_name: string | null;
        date_of_birth: string;
        phone_number: string;
        address: string;
        instagram_account: string | null;
        player_introduction: string | null;
        headshot_url: string;
    }
) {
    const supabase = await createAdminClient();
    const { error } = await supabase
        .from("users")
        .update({
            ...data,
            data_collected: true,
        })
        .eq("user_id", userId);

    if (error) {
        throw new Error(`Failed to update user registration: ${error.message}`);
    }

    return { success: true };
}

export async function submitRegistration(formData: FormData) {
    noStore();
    const supabase = await createAdminClient();

    try {
        const userId = formData.get("userId") as string;
        const headshot = formData.get("headshot") as File;

        if (!userId || !headshot) {
            throw new Error("Missing required fields");
        }

        // Upload headshot
        const fileExt = headshot.name.split(".").pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from("players")
            .upload(fileName, headshot, {
                contentType: headshot.type,
                cacheControl: "3600",
                upsert: false,
            });

        if (uploadError) {
            throw new Error(`Failed to upload file: ${uploadError.message}`);
        }

        const {
            data: { publicUrl },
        } = supabase.storage.from("players").getPublicUrl(fileName);

        // Update user data
        const { error: updateError } = await supabase
            .from("users")
            .update({
                legal_first_name: formData.get("legalFirstName"),
                legal_last_name: formData.get("legalLastName"),
                preferred_first_name:
                    formData.get("preferredFirstName") || null,
                date_of_birth: formData.get("dateOfBirth"),
                phone_number: formData.get("phoneNumber"),
                address: formData.get("address"),
                instagram_account: formData.get("instagramAccount") || null,
                player_introduction: formData.get("playerIntroduction") || null,
                headshot_url: publicUrl,
                data_collected: true,
            })
            .eq("user_id", userId);

        if (updateError) {
            throw new Error(
                `Failed to update user data: ${updateError.message}`
            );
        }

        return { success: true };
    } catch (error) {
        throw error;
    }
}
