// app/api/media/[filename]/route.ts
import { fetchMediaFromBlob } from "@/utils/actions/blob";
import { getContentType } from "@/utils/helpers";

import { NextRequest, NextResponse } from "next/server";

export const revalidate = 86400; // Revalidate every 24 hours

const CACHE_MAX_AGE = 86400; // 1 day
const CACHE_S_MAXAGE = 31536000; // 1 year

export async function GET(
    request: NextRequest,
    { params }: { params: { filename: string } }
) {
    try {
        const { filename } = params;

        // Extract the file path and extension from the filename
        const [path, ext] = filename.split(".");
        if (!path || !ext) {
            return NextResponse.json(
                { error: "Invalid filename format" },
                { status: 400 }
            );
        }

        // Construct the full media URL from Vercel Blob storage
        const mediaUrl = `${process.env.VERCEL_BLOB_URL}/${path}.${ext}`;
        const contentType = getContentType(ext);

        // Fetch the media file from Vercel Blob
        const media = await fetchMediaFromBlob(mediaUrl);

        if (!media) {
            return NextResponse.json(
                { error: "Failed to load media" },
                { status: 500 }
            );
        }

        return new NextResponse(media, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_S_MAXAGE}, stale-while-revalidate`,
            },
        });
    } catch (error) {
        console.error("Error processing media request:", error);
        return NextResponse.json(
            { error: "Error processing media request" },
            { status: 500 }
        );
    }
}
