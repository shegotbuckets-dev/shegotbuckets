// app/api/media/route.ts
import { fetchMediaFromBlob } from "@/utils/actions/blob";

import { NextRequest, NextResponse } from "next/server";

const CACHE_MAX_AGE = 86400; // 1 day
const CACHE_S_MAXAGE = 31536000; // 1 year
export const revalidate = 86400;

// Utility function to determine content type based on file extension
function getContentType(extension: string): string {
    switch (extension.toLowerCase()) {
        case "jpg":
        case "jpeg":
        case "png":
        case "webp":
            return `image/${extension}`;
        case "mp4":
        case "webm":
            return `video/${extension}`;
        default:
            throw new Error("Unsupported media type");
    }
}

export async function GET(request: NextRequest) {
    try {
        // Get URL parameters using the URL API
        const { searchParams } = new URL(request.url);
        const mediaUrl = searchParams.get("mediaUrl");
        const ext = searchParams.get("ext");

        if (!mediaUrl || !ext) {
            return NextResponse.json(
                { error: "Missing media URL or extension" },
                { status: 400 }
            );
        }

        const contentType = getContentType(ext);
        const media = await fetchMediaFromBlob(mediaUrl);

        if (!media) {
            return NextResponse.json(
                { error: "Failed to load media" },
                { status: 500 }
            );
        }

        const response = new NextResponse(media, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": `public, max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_S_MAXAGE}, stale-while-revalidate`,
            },
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error processing media request" },
            { status: 500 }
        );
    }
}
