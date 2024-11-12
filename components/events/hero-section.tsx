import { HeartBeatButton } from "@/components/common/heartbeat-button";
import RegistrationButton from "@/components/common/register-button";
import { Database } from "@/constants/supabase";
import { getMediaUrl } from "@/lib/utils";
import { SupabaseStorageBucket } from "@/utils/types";

import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";

export default function HeroSectionEvent({
    event,
}: {
    event: Database["public"]["Tables"]["leagues"]["Row"];
}) {
    const { image, name, date, location } = event;

    return (
        <section
            className="relative h-[55vh] w-full overflow-hidden flex items-center"
            id="heroCard-event"
        >
            <div className="absolute inset-0">
                <Image
                    src={getMediaUrl(
                        SupabaseStorageBucket.LEAGUES,
                        image ?? ""
                    )}
                    alt="Event background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative text-white px-4 sm:px-6 lg:px-8 w-full md:w-1/2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-16 mb-4 leading-tight line-clamp-2">
                    {name}
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 mb-4">
                    2024 -2025 Season
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex items-center text-gray-200 text-sm sm:text-base">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center text-gray-200 text-sm sm:text-base">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center text-gray-200 text-sm sm:text-base">
                        <Users className="w-4 h-4 mr-2" />
                        <span>32 Teams</span>
                    </div>
                </div>
                <RegistrationButton>
                    <HeartBeatButton>Register Now</HeartBeatButton>
                </RegistrationButton>
            </div>
        </section>
    );
}
