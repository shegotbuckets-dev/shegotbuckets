import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getMediaUrl } from "@/lib/utils";
import { SupabaseStorageBucket } from "@/utils/types";

import Image from "next/image";

type Champion = {
    id: number;
    name: string;
    year: number;
    imageUrl: string;
};

const champions: Champion[] = [
    {
        id: 1,
        name: "Team Alpha",
        year: 2024,
        imageUrl: getMediaUrl(
            SupabaseStorageBucket.LEAGUES,
            "hor-2024.png",
            "fdcd383d-931a-43f8-8b2d-11f25eb5b4fd"
        ),
    },
    {
        id: 2,
        name: "Hoops Elite",
        year: 2023,
        imageUrl: getMediaUrl(
            SupabaseStorageBucket.LEAGUES,
            "hor-2023.png",
            "fdcd383d-931a-43f8-8b2d-11f25eb5b4fd"
        ),
    },
];

export default function HallOfRecord() {
    return (
        <section className="py-20 bg-gray-200/25" id="hallRecord-event">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Hall of Record
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {champions.map((champion) => (
                        <Card
                            key={champion.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="aspect-video relative">
                                <Image
                                    src={champion.imageUrl}
                                    alt={`${champion.name} team photo`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                            <CardHeader className="p-6">
                                <CardTitle className="text-2xl mb-2">
                                    {champion.name}
                                </CardTitle>
                                <p className="text-lg text-muted-foreground">
                                    {champion.year}
                                </p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
