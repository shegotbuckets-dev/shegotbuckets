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
                <iframe
                    src="https://www.youtube.com/embed/fzOtrEZ9Nsk?autoplay=1&controls=0&mute=1&loop=1&playlist=fzOtrEZ9Nsk&enablejsapi=1"
                    allow="autoplay; encrypted-media"
                    className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full min-w-full w-[177.77777778vh] -translate-x-1/2 -translate-y-1/2"
                    style={{ border: "none" }}
                />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Content */}
            <div className="relative text-white px-4 sm:px-6 lg:px-8 w-1/2">
                <h1 className="scroll-m-20 font-semibold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
                    <span className="block">TAKE THE SHOT</span>
                    <span className="block">BECAUSE "SHE GOT BUCKETS"</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6">
                    Empowering Asian women through basketball by fostering
                    unity, inclusion, and opportunity on and off the court.
                </p>
                <div className="flex items-center gap-3">
                    <Link href="/dashboard">
                        <Button className="animate-buttonheartbeat rounded-md bg-orange-600 hover:bg-orange-500 text-base font-semibold text-white py-3 px-6">
                            Become an Athlete
                        </Button>
                    </Link>

                    <Link href="/dashboard">
                        <Button
                            variant="expandIcon"
                            className="flex gap-1 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 text-base py-3 px-6 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
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
