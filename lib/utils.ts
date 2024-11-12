import { SupabaseStorageBucket } from "@/utils/types";

import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getMediaUrl(
    bucket: SupabaseStorageBucket,
    image: string,
    path?: string
) {
    if (!image) return "/images/sgb-homevideo-placeholder.png";

    return path
        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}/${image}`
        : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${image}`;
}
