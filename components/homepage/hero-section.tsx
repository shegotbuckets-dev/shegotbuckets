import YouTubePlayer from "@/components/youtube";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";

export default function HeroSection() {
    return (
        <section
            className="relative h-[90vh] w-full overflow-hidden flex items-center"
            aria-label="She Got Buckets Hero"
        >
            {/* YouTube Video Background */}
            <div className="absolute inset-0 h-full">
                <YouTubePlayer
                    videoId="fzOtrEZ9Nsk"
                    title="She Got Buckets Background Video"
                    autoplay={true}
                    muted={true}
                    controls={false}
                    loop={true}
                    hidePlayButton={true}
                />
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
                <div className="flex flex-col sm:flex-row items-center gap-3">
                    <Link href="/dashboard">
                        <Button className="animate-buttonheartbeat rounded-md bg-orange-600 hover:bg-orange-500 text-base font-semibold text-white py-3 px-6 w-full sm:w-auto">
                            Become an Athlete
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button
                            variant="expandIcon"
                            className="flex gap-1 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 text-base py-3 px-6 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
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
