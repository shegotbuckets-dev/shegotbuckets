"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    ELIGIBILITY_DATA_CHINESE,
    ELIGIBILITY_DATA_ENGLISH,
    REGIONAL_ELIGIBILITY_DATA_CHINESE,
    REGIONAL_ELIGIBILITY_DATA_ENGLISH,
    REGIONAL_RULE_BOOK_DATA_ENGLISH,
    RULE_BOOK_DATA_CHINESE,
    RULE_BOOK_DATA_ENGLISH,
    SEEDING_DATA_CHINESE,
    SEEDING_DATA_ENGLISH,
} from "@/constants/events";

import {
    Award,
    BookOpen,
    ChartGantt,
    Flag,
    Shuffle,
    Trophy,
    Users,
} from "lucide-react";

import { LeagueInfoContent, LeagueInfoDialog } from "./league-info-dialog";
import { RegistrationTimeline } from "./registration-timeline";

export const LeagueInfo = ({
    allowsMultipleTeams = false,
}: {
    allowsMultipleTeams?: boolean;
}) => {
    return (
        <section className="pt-20 pb-28 bg-white/10" id="information-event">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center">
                    League Info
                </h2>
                {allowsMultipleTeams ? <RegistrationGuide /> : <Seeding />}
                <ParticipationEligibility
                    allowsMultipleTeams={allowsMultipleTeams}
                />
                <RuleBook allowsMultipleTeams={allowsMultipleTeams} />
                <div className="grid md:grid-cols-3 gap-8 py-3">
                    <Card>
                        <CardContent className="flex flex-col items-center p-6">
                            <Flag className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Certified Referees
                            </h3>
                            <p className="text-center">
                                Two certified referees per game
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex flex-col items-center p-6">
                            <Trophy className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Playoffs
                            </h3>
                            <p className="text-center">
                                Single-elimination playoffs for eligible teams
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex flex-col items-center p-6">
                            <Award className="w-12 h-12 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">
                                Prizes
                            </h3>
                            <p className="text-center">
                                Team championship prizes
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

const RuleBook = ({
    allowsMultipleTeams,
}: {
    allowsMultipleTeams: boolean;
}) => {
    return (
        <LeagueInfoDialog
            id="ruleBook-event"
            icon={BookOpen}
            gradientColors={{
                from: "blue-50",
                to: "indigo-50",
                darkFrom: "blue-900/20",
                darkTo: "indigo-900/20",
            }}
            title="Rule Book"
            description="Essential guidelines for all players"
            buttonText="View Rules"
            englishData={
                allowsMultipleTeams
                    ? REGIONAL_RULE_BOOK_DATA_ENGLISH
                    : RULE_BOOK_DATA_ENGLISH
            }
            chineseData={
                allowsMultipleTeams ? undefined : RULE_BOOK_DATA_CHINESE
            }
            infoComponent={LeagueInfoContent}
        />
    );
};

const ParticipationEligibility = ({
    allowsMultipleTeams,
}: {
    allowsMultipleTeams: boolean;
}) => {
    return (
        <LeagueInfoDialog
            id="participation-eligibility"
            icon={Users}
            gradientColors={{
                from: "orange-50",
                to: "amber-50",
                darkFrom: "orange-900/20",
                darkTo: "amber-900/20",
            }}
            title="Participation Eligibility"
            description="Requirements for league participation"
            buttonText="View Eligibility"
            englishData={
                allowsMultipleTeams
                    ? REGIONAL_ELIGIBILITY_DATA_ENGLISH
                    : ELIGIBILITY_DATA_ENGLISH
            }
            chineseData={
                allowsMultipleTeams
                    ? REGIONAL_ELIGIBILITY_DATA_CHINESE
                    : ELIGIBILITY_DATA_CHINESE
            }
            infoComponent={LeagueInfoContent}
        />
    );
};

const Seeding = () => {
    return (
        <LeagueInfoDialog
            id="seeding"
            icon={Shuffle}
            gradientColors={{
                from: "green-50",
                to: "emerald-50",
                darkFrom: "green-900/20",
                darkTo: "emerald-900/20",
            }}
            title="Seeding Rules"
            description="Team seeding and tournament structure"
            buttonText="View Seeding"
            englishData={SEEDING_DATA_ENGLISH}
            chineseData={SEEDING_DATA_CHINESE}
            infoComponent={LeagueInfoContent}
        />
    );
};

const RegistrationGuide = () => {
    return (
        <LeagueInfoDialog
            id="registration-guide"
            icon={ChartGantt}
            gradientColors={{
                from: "green-50",
                to: "emerald-50",
                darkFrom: "green-900/20",
                darkTo: "emerald-900/20",
            }}
            title="Registration Guide"
            description="Guidelines for league registration"
            buttonText="View Important Dates"
            infoComponentRegional={RegistrationTimeline}
        />
    );
};
