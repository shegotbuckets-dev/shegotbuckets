import { HeartBeatButton } from "@/components/common/heartbeat-button";
import RegistrationButton from "@/components/common/register-button";
import { Button } from "@/components/ui/button";
import { Database } from "@/constants/supabase";
import { getMediaUrl } from "@/lib/utils";
import { SupabaseStorageBucket } from "@/utils/types";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const LeagueHero = ({
    league,
    events,
}: {
    league: Database["public"]["Tables"]["leagues"]["Row"];
    events: Database["public"]["Tables"]["events"]["Row"][];
}) => {
    const { league_id, image, name } = league;

    return (
        <section
            className="relative h-[55vh] w-full overflow-hidden flex items-center"
            id="heroCard-event"
        >
            <div className="absolute inset-0">
                <Image
                    src={getMediaUrl(
                        SupabaseStorageBucket.LEAGUES,
                        image ?? "",
                        league_id
                    )}
                    alt="Event background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative text-white px-4 sm:px-6 lg:px-8 w-full md:w-1/2">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-16 mb-4 leading-tight line-clamp-2"
                    id="page-title"
                >
                    {name}
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 mb-4">
                    2024 -2025 Season
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8"></div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm sm:max-w-none">
                    <RegistrationButton options={events}>
                        <HeartBeatButton>Register Now</HeartBeatButton>
                    </RegistrationButton>
                    <Link href="/qna" className="w-full sm:w-auto">
                        <Button
                            variant="expandIcon"
                            className="flex gap-1 text-gray-800 dark:text-white hover:text-black dark:hover:text-gray-300 text-base py-3 px-6 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full sm:w-auto h-[48px]"
                            Icon={() => (
                                <ArrowRight
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                />
                            )}
                            iconPlacement="right"
                        >
                            Registration Tutorial
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
