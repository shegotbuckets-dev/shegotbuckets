"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface YouTubePlayerProps {
    videoId: string;
    title?: string;
    autoplay?: boolean;
    muted?: boolean;
    controls?: boolean;
    loop?: boolean;
    fallbackMessage?: string;
    hidePlayButton?: boolean;
}

export default function YouTubePlayer({
    videoId,
    title = "YouTube Video",
    autoplay = false,
    muted = false,
    controls = true,
    loop = false,
    fallbackMessage = "Your browser doesn't support embedded videos. You can watch it on YouTube instead.",
    hidePlayButton = false,
}: YouTubePlayerProps) {
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [error, setError] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${
        muted ? 1 : 0
    }&controls=${controls ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${videoId}`;
    const directYouTubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Check if iframe is supported
    const isIframeSupported = () => {
        try {
            return (
                typeof window !== "undefined" && "HTMLIFrameElement" in window
            );
        } catch {
            return false;
        }
    };

    // Handle component mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fallback component when video can't be played
    const FallbackContent = () => (
        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <div className="mb-4">
                <svg
                    className="w-12 h-12 text-gray-400 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                {fallbackMessage}
            </p>
            <Link
                href={directYouTubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
            >
                Watch on YouTube
            </Link>
        </div>
    );

    // Show thumbnail while component is mounting
    if (!isMounted) {
        return (
            <div className="relative aspect-video w-full">
                <Image
                    src={thumbnailUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                    onError={() => setError(true)}
                />
            </div>
        );
    }

    if (!isIframeSupported() || error) {
        return (
            <div className="relative aspect-video w-full">
                <FallbackContent />
            </div>
        );
    }

    return (
        <div className="relative aspect-video w-full">
            {!isPlaying ? (
                <div
                    onClick={() => setIsPlaying(true)}
                    className="cursor-pointer relative w-full h-full"
                >
                    <Image
                        src={thumbnailUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                        onError={() => setError(true)}
                    />
                    {!hidePlayButton && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <iframe
                    src={videoUrl}
                    title={title}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setError(true)}
                />
            )}
        </div>
    );
}
