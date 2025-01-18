import { AboutHero } from "./_components/about-hero";
import { AboutJourney } from "./_components/about-journey";
import { AboutMembers } from "./_components/about-members";
import { AboutWhoWeAre } from "./_components/about-whoweare";

export default function About() {
    return (
        <main className="min-h-screen bg-background">
            <AboutHero />
            <AboutWhoWeAre />
            <AboutJourney />
            <AboutMembers />
        </main>
    );
}
