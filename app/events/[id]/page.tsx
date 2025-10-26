import { LeagueType } from "@/app/dashboard/types";
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

    // Determine league behavior based on database enum
    const allowsMultipleTeams = league.league_type === LeagueType.FREETEAM;

    return (
        <div className="min-h-screen bg-background text-foreground pt-20">
            {/* Hero Section */}
            <LeagueHero league={league} events={events} />
            {/* Team Marquee - only show for single-team leagues */}
            {!allowsMultipleTeams && <TeamMarquee />}
            {/* About Info Section */}
            <LeagueEvents
                league={league}
                events={events}
                allowsMultipleTeams={allowsMultipleTeams}
            />
            {/* League Information */}
            <LeagueInfo allowsMultipleTeams={allowsMultipleTeams} />
            {/* Hall of Record */}
            <HallOfRecord allowsMultipleTeams={allowsMultipleTeams} />
            {/* Registration Section */}
            <EventRegistration league={league} events={events} />
            {/* Anchor Navbar */}
            <AnchorNavBar />
        </div>
    );
}
