import { createClient } from "@supabase/supabase-js";

type GetPublicUrlResponse = {
    publicUrl: string;
};

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
);

export const getImageUrl = async (
    backet: string,
    path: string
): Promise<string> => {
    const { data, error } = (await supabase.storage
        .from(backet)
        .getPublicUrl(path)) as {
        data: GetPublicUrlResponse | null;
        error: Error | null;
    };

    if (error) {
        throw new Error(`Error fetching image URL: ${error.message}`);
    }

    if (!data) {
        throw new Error("No data returned when fetching image URL");
    }

    return data.publicUrl;
};
