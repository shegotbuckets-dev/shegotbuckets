import { AboutHero } from "./_components/about-hero";
import { AboutJourney } from "./_components/about-journey";
import { AboutMembers } from "./_components/about-members";
import { AboutStory } from "./_components/about-story";

export default function About() {
    return (
        <main className="min-h-screen">
            {/* Hero section - no background needed as it has its own background */}
            <AboutHero />

            {/* Story section - white/transparent background */}
            <div className="flex w-full justify-center items-center bg-white/10">
                <div className="w-full max-w-7xl">
                    <AboutStory />
                </div>
            </div>

            {/* Journey section - light background */}
            <div className="flex w-full justify-center items-center bg-gray-200/25">
                <div className="w-full max-w-7xl">
                    <AboutJourney />
                </div>
            </div>

            {/* Members section - white/transparent background */}
            <div
                id="team-section"
                className="flex w-full justify-center items-center bg-white/10"
            >
                <div className="w-full max-w-7xl">
                    <AboutMembers />
                </div>
            </div>
        </main>
    );
}
