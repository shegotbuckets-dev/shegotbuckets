import { AnchorNavBar } from "@/components/common/anchor-nav";
import TeamMarquee from "@/components/common/team-marquee";
import WorkInProgress from "@/components/common/wip";
import { fetchLeagueById } from "@/utils/actions/supabase";

import { EventAbout } from "../_components/event-about";
import { EventHeroSection } from "../_components/event-hero";
import { EventRegistration } from "../_components/event-registration";
import { HallOfRecord } from "../_components/hall-of-record";
import { LeagueInfo } from "../_components/league-info";

export const metadata = {
    title: "Events",
};

export default async function EventPage({
    params,
}: {
    params: { id: string };
}) {
    const league = await fetchLeagueById(params.id);
    // Option 1: Add a loading check
    if (!league || !league.image) {
        return <WorkInProgress features={[]} />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            {/* Hero Section */}
            <EventHeroSection league={league} />
            {/* Team Marquee */}
            <TeamMarquee />
            {/* About Infor Section */}
            <EventAbout league={league} />
            {/* League Information */}
            <LeagueInfo />
            {/* Hall of Record */}
            <HallOfRecord />
            {/* Registration Section */}
            <EventRegistration />
            {/* Anchor Navbar */}
            <AnchorNavBar />
        </div>
    );
}
