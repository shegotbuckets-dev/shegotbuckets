import { HeartBeatButton } from "@/components/common/heartbeat-button";
import { Button } from "@/components/ui/button";
import { getVercelBlobUrl } from "@/utils/helpers";

import { Suspense } from "react";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function BackgroundVideo() {
    return (
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full min-w-full w-[177.77777778vh] -translate-x-1/2 -translate-y-1/2 object-cover"
        >
            <source
                src={getVercelBlobUrl(
                    "home/SGBTrailer-yexozbQXf3PHdB6cSLo3JwoWo0MCBC.mp4"
                )}
                type="video/mp4"
            />
        </video>
    );
}

function VideoPlaceholder() {
    return (
        <Image
            src="/images/sgb-homevideo-placeholder.png"
            alt="She Got Buckets background"
            fill
            className="object-cover"
            priority
        />
    );
}

export default function HeroSection() {
    return (
        <section
            className="relative h-[90vh] w-full overflow-hidden flex items-center"
            aria-label="She Got Buckets Hero"
        >
            {/* Video Background */}
            <div className="absolute inset-0 h-full">
                <Suspense fallback={<VideoPlaceholder />}>
                    <BackgroundVideo />
                </Suspense>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Content */}
            <div className="relative text-white px-4 sm:px-6 lg:px-8 w-full md:w-1/2">
                <h1 className="scroll-m-20 font-semibold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
                    <span className="block">TAKE THE SHOT</span>
                    <span className="block">
                        BECAUSE &quot;SHE GOT BUCKETS&quot;
                    </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6">
                    Empowering Asian women through basketball by fostering
                    unity, inclusion, and opportunity on and off the court.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm sm:max-w-none mx-auto">
                    <HeartBeatButton>Become an Athlete</HeartBeatButton>
                    <Link href="/dashboard" className="w-full">
                        <Button
                            variant="expandIcon"
                            className="flex gap-1 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 text-base py-3 px-6 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full sm:w-auto h-[48px]"
                            Icon={() => (
                                <ArrowRight
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                />
                            )}
                            iconPlacement="right"
                        >
                            Become a Supporter
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
