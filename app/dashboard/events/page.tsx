import EventsCarousel from "@/components/common/events-carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

export default function EventsPage() {
    return (
        <div className="flex flex-col justify-center items-start flex-wrap px-4 pt-4 gap-4">
            <div className="grid md:grid-cols-1 sm:grid-cols-1 w-full gap-3">
                <Card className="shadow-lg w-full max-w-6xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">My Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold tracking-tight">
                                You have no events
                            </h1>
                            <p className="text-sm text-muted-foreground mb-3">
                                Events will show after you played with us!
                            </p>
                            <Button>Register for an Event</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="shadow-lg w-full max-w-6xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Upcoming Events
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4 justify-start">
                            <EventsCarousel carouselNavPosition="top" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
