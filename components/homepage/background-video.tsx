"use client";

import { getMediaUrl } from "@/lib/utils";
import { SupabaseStorageBucket } from "@/utils/types";

import { useEffect, useState } from "react";

export function BackgroundVideo() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isVideoError, setIsVideoError] = useState(false);

    useEffect(() => {
        const video = document.querySelector("video");
        if (video) {
            video.addEventListener("loadeddata", () => setIsVideoLoaded(true));
            video.addEventListener("error", () => setIsVideoError(true));
        }
    }, []);

    if (isVideoError) {
        return null; // Will fall back to placeholder
    }

    return (
        <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full min-w-full w-[177.77777778vh] -translate-x-1/2 -translate-y-1/2 object-cover"
            style={{ opacity: isVideoLoaded ? 1 : 0 }}
        >
            <source
                src={getMediaUrl(SupabaseStorageBucket.HOME, "sgb-trailer.mp4")}
                type="video/mp4"
            />
            <source
                src={getMediaUrl(
                    SupabaseStorageBucket.HOME,
                    "sgb-trailer.webm"
                )}
                type="video/webm"
            />
        </video>
    );
}
