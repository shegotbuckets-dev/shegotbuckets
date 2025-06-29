import { AnchorNavBar } from "@/components/common/anchor-nav";
import TeamMarquee from "@/components/common/team-marquee";
import WorkInProgress from "@/components/common/wip";
import { fetchEvents, fetchLeagueById } from "@/utils/actions/supabase";

import { EventRegistration } from "../_components/event-registration";
import { HallOfRecord } from "../_components/hall-of-record";
import { LeagueEvents } from "../_components/league-events";
import { LeagueHero } from "../_components/league-hero";
import { LeagueInfo } from "../_components/league-info";
import { RegistrationTimeline } from "../_components/registration-timeline";

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

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            {/* This ensures there's only one H1 on the page, which will be in the LeagueHero component */}
            {/* The H1 in LeagueHero displays the league name */}
            {/* Hero Section */}
            <LeagueHero league={league} events={events} />
            {/* Team Marquee */}
            {/* <TeamMarquee /> */}
            {/* About Infor Section */}
            <LeagueEvents league={league} events={events} />
            {/* Registration Timeline */}
            <RegistrationTimeline />
            {/* League Information */}
            <LeagueInfo />
            {/* Hall of Record */}
            {/* <HallOfRecord /> */}
            {/* Registration Section */}
            <EventRegistration league={league} events={events} />
            {/* Anchor Navbar */}
            <AnchorNavBar />
        </div>
    );
}
