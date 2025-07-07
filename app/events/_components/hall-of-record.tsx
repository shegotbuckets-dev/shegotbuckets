import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/motion-carousel";
import { CarouselNavigation } from "@/components/ui/motion-carousel";
import { getMediaUrl } from "@/lib/utils";
import { SupabaseStorageBucket } from "@/utils/types";

import Image from "next/image";

type Champion = {
    id: number;
    name: string;
    year: number;
    level: "Elite" | "Rising Star" | "Champion";
    imageUrl: string;
};

const nationalChampions: Champion[] = [
    {
        id: 1,
        name: "UCLA CWB",
        year: 2025,
        level: "Champion",
        imageUrl: getMediaUrl(
            SupabaseStorageBucket.LEAGUES,
            "hor-2025.jpg",
            "fdcd383d-931a-43f8-8b2d-11f25eb5b4fd"
        ),
    },
    {
        id: 2,
        name: "HARVARD CWB",
        year: 2024,
        level: "Champion",
        imageUrl: getMediaUrl(
            SupabaseStorageBucket.LEAGUES,
            "hor-2024.png",
            "fdcd383d-931a-43f8-8b2d-11f25eb5b4fd"
        ),
    },
    {
        id: 3,
        name: "UMICH CWB",
        year: 2023,
        level: "Champion",
        imageUrl: getMediaUrl(
            SupabaseStorageBucket.LEAGUES,
            "hor-2023.png",
            "fdcd383d-931a-43f8-8b2d-11f25eb5b4fd"
        ),
    },
];

const regionalChampions: Champion[] = [
    {
        id: 1,
        name: "UCLA Xiaolongbao",
        year: 2024,
        level: "Elite",
        imageUrl: getMediaUrl(
            SupabaseStorageBucket.LEAGUES,
            "el-hor-2024.jpg",
            "b4c3c012-ad36-48ac-a60c-8c1264f707b9"
        ),
    },
    {
        id: 2,
        name: "New York Lady Rockits",
        year: 2024,
        level: "Rising Star",
        imageUrl: getMediaUrl(
            SupabaseStorageBucket.LEAGUES,
            "rs-hor-2024.jpg",
            "b4c3c012-ad36-48ac-a60c-8c1264f707b9"
        ),
    },
];

export const HallOfRecord = ({ isRegional }: { isRegional?: boolean }) => {
    const champions = isRegional ? regionalChampions : nationalChampions;

    const maxSlides = {
        lg: Math.max(0, champions.length - 3),
        md: Math.max(0, champions.length - 2),
        sm: Math.max(0, champions.length - 1),
        default: Math.max(0, champions.length - 1),
    };

    const rightChevronEnabled = {
        lg: champions.length > 3,
        md: champions.length > 2,
        sm: champions.length > 1,
        default: champions.length > 1,
    };

    return (
        <section className="py-20 bg-gray-200/25" id="hallRecord-event">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Hall of Record
                </h2>
                <div className="relative w-full px-4 sm:px-8 md:px-12">
                    <Carousel className="overflow-visible">
                        <CarouselContent className="-ml-4">
                            {champions.map((champion) => (
                                <CarouselItem
                                    key={champion.id}
                                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                                >
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="aspect-video relative">
                                            <Image
                                                src={champion.imageUrl}
                                                alt={`${champion.name} team photo`}
                                                fill
                                                className="object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                        <CardHeader className="p-6">
                                            <CardTitle className="text-2xl mb-2">
                                                {champion.name}
                                            </CardTitle>
                                            <p className="text-lg text-muted-foreground">
                                                {champion.level}
                                            </p>
                                            <p className="text-lg text-muted-foreground">
                                                {champion.year}
                                            </p>
                                        </CardHeader>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNavigation
                            className="absolute -left-4 sm:-left-8 md:-left-12 top-1/2 flex w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] md:w-[calc(100%+6rem)] -translate-y-1/2 justify-between"
                            classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800 z-10"
                            alwaysShow
                            maxSlides={maxSlides}
                            rightChevronEnabled={rightChevronEnabled}
                        />
                    </Carousel>
                </div>
            </div>
        </section>
    );
};
