import TeamMarquee from "@/components/common/team-marquee";
import WorkInProgress from "@/components/common/wip";
import AboutInforEvent from "@/components/events/about-info";
import AnchorNavBar from "@/components/events/anchor-nav";
import HallOfRecord from "@/components/events/hall-record";
import HeroSectionEvent from "@/components/events/hero-section";
import LeagueInfor from "@/components/events/league-info";
import Registration from "@/components/events/registration";
import { fetchLeagueById } from "@/utils/actions/supabase";

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
            <HeroSectionEvent league={league} />
            {/* Team Marquee */}
            <TeamMarquee />
            {/* About Infor Section */}
            <AboutInforEvent league={league} />
            {/* League Information */}
            <LeagueInfor />
            {/* Hall of Record */}
            <HallOfRecord />
            {/* Registration Section */}
            <Registration />
            {/* Anchor Navbar */}
            <AnchorNavBar />
        </div>
    );
}
