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
        <div className="flex flex-col justify-center items-start flex-wrap px-4 pt-4 gap-4">
            <Card className="w-full max-w-6xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 mb-2">
                    <CardTitle className="text-2xl font-bold">
                        Welcome to She Got Buckets!
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="w-full max-w-6xl">
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Previous Events</CardTitle>
                        <CardDescription>
                            Previous events that you have participated in
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="/dashboard/events">
                            View All
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                        <main className="flex flex-col gap-2 lg:gap-2 h-[300px] w-full">
                            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-xl font-bold tracking-tight">
                                        You have no activily with us so far
                                    </h1>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Events will show when you participate in
                                        events with She Got Buckets
                                    </p>
                                </div>
                            </div>
                        </main>
                    </div>
                </CardContent>
            </Card>
            <Card className="shadow-lg w-full max-w-6xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <EventsCarousel carouselNavPosition="top" />
                </CardContent>
            </Card>
        </div>
    );
}
