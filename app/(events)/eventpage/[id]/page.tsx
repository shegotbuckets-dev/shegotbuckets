import AboutInforEvent from "@/components/events/about-infor";
import AnchorNavBar from "@/components/events/anchor-nav";
import HallOfRecord from "@/components/events/hall-record";
import HeroSectionEvent from "@/components/events/hero-section";
import LeagueInfor from "@/components/events/league-infor";
import Registration from "@/components/events/registration";
import { BASKETBALL_EVENTS } from "@/public/constants/events";

export const metadata = {
    title: "Events",
};

export default async function EventPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;

    const eventData = BASKETBALL_EVENTS[id.toString()];
    // Option 1: Add a loading check
    if (!eventData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            {/* Hero Section */}
            <HeroSectionEvent eventData={eventData} />
            {/* Hall of Record */}
            <HallOfRecord />
            {/* About Infor Section */}
            <AboutInforEvent eventData={eventData} />
            <LeagueInfor eventData={eventData} />
            {/* Registration Section */}
            <Registration />
            {/* Anchor Navbar */}
            <AnchorNavBar />
        </div>
    );
}
