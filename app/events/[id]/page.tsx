import { AnchorNavBar } from "@/components/common/anchor-nav";
import TeamMarquee from "@/components/common/team-marquee";
import WorkInProgress from "@/components/common/wip";
import { fetchEvents, fetchLeagueById } from "@/utils/actions/supabase";

import { EventRegistration } from "../_components/event-registration";
import { HallOfRecord } from "../_components/hall-of-record";
import { LeagueEvents } from "../_components/league-events";
import { LeagueHero } from "../_components/league-hero";
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

    let events = await fetchEvents();
    if (!events) {
        return <WorkInProgress features={[]} />;
    }
    events = events.filter((event) => event.league_id === league.league_id);

    switch (params.id) {
        case "b4c3c012-ad36-48ac-a60c-8c1264f707b9":
            const isRegional = true;
            return (
                <div className="min-h-screen bg-background text-foreground pt-20">
                    {/* Hero Section */}
                    <LeagueHero league={league} events={events} />
                    {/* About Infor Section */}
                    <LeagueEvents league={league} events={events} />
                    {/* League Information */}
                    <LeagueInfo isRegional={isRegional} />
                    {/* Registration Section */}
                    <EventRegistration league={league} events={events} />
                    {/* Anchor Navbar */}
                    <AnchorNavBar />
                </div>
            );
        default:
            return (
                <div className="min-h-screen bg-background text-foreground pt-20">
                    {/* Hero Section */}
                    <LeagueHero league={league} events={events} />
                    {/* Team Marquee */}
                    <TeamMarquee />
                    {/* About Infor Section */}
                    <LeagueEvents league={league} events={events} />
                    {/* League Information */}
                    <LeagueInfo />
                    {/* Hall of Record */}
                    <HallOfRecord />
                    {/* Registration Section */}
                    <EventRegistration league={league} events={events} />
                    {/* Anchor Navbar */}
                    <AnchorNavBar />
                </div>
            );
    }
}
