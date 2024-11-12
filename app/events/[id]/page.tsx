import TeamMarquee from "@/components/common/team-marquee";
import AboutInforEvent from "@/components/events/about-infor";
import AnchorNavBar from "@/components/events/anchor-nav";
import HallOfRecord from "@/components/events/hall-record";
import HeroSectionEvent from "@/components/events/hero-section";
import LeagueInfor from "@/components/events/league-infor";
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
    const event = await fetchLeagueById(params.id);
    // Option 1: Add a loading check
    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            {/* Hero Section */}
            <HeroSectionEvent event={event} />
            {/* Team Marquee */}
            <TeamMarquee />
            {/* About Infor Section */}
            <AboutInforEvent />
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
