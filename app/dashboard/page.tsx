import EventsCarousel from "@/components/common/events-carousel";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function Dashboard() {
    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">
            {/* Welcome Card */}
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 mb-2">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
                        Welcome to She Got Buckets!
                    </CardTitle>
                </CardHeader>
            </Card>

            {/* Previous Events Card */}
            <Card className="w-full">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0">
                    <div className="grid gap-2">
                        <CardTitle className="text-lg sm:text-xl">
                            Previous Events
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                            Previous events that you have participated in
                        </CardDescription>
                    </div>
                    <Button
                        asChild
                        size="sm"
                        className="w-fit sm:ml-auto gap-1"
                    >
                        <Link href="/dashboard/events">
                            View All
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="max-h-[320px] overflow-y-auto">
                        <main className="flex flex-col gap-2 h-[300px] w-full">
                            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4 sm:p-6">
                                <div className="flex flex-col items-center text-center max-w-md">
                                    <h1 className="text-lg sm:text-xl font-bold tracking-tight mb-2">
                                        You have no activity with us so far
                                    </h1>
                                    <p className="text-sm sm:text-base text-muted-foreground">
                                        Events will show when you participate in
                                        events with She Got Buckets
                                    </p>
                                </div>
                            </div>
                        </main>
                    </div>
                </CardContent>
            </Card>

            {/* Explore Events Card */}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">
                        Explore All Events
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EventsCarousel carouselNavPosition="top" />
                </CardContent>
            </Card>
        </div>
    );
}
