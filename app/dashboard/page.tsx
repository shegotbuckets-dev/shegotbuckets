import EventsCarousel from "@/components/events-carousel/events-carousel";
import SignWaiver from "@/components/sign-waiver/sign-waiver";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { CheckCircle, XCircle } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Updated mock data
const events = [
    {
        id: "INV001",
        status: "success",
        eventName: "College Basketball League",
        date: "2024-03-01",
        waiverSigned: false,
    },
    {
        id: "INV002",
        status: "pending",
        eventName: "National Tournaments",
        date: "2024-03-02",
        waiverSigned: false,
    },
    {
        id: "INV003",
        status: "success",
        eventName: "Summer Camp",
        date: "2024-03-03",
        waiverSigned: true,
    },
    {
        id: "INV004",
        status: "failed",
        eventName: "Thanksgiving Camp",
        date: "2024-03-04",
        waiverSigned: true,
    },
];

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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event ID</TableHead>
                                <TableHead>Event Name</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">
                                        {event.id}
                                    </TableCell>
                                    <TableCell className="max-w-[200px]">
                                        {event.eventName}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            event.date
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {event.waiverSigned ? (
                                            <span className="flex items-center text-green-600">
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                Signed
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-red-600">
                                                <XCircle className="w-4 h-4 mr-2" />
                                                Not Signed
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {event.waiverSigned ? (
                                            <span className="text-sm text-gray-500">
                                                Waiver already signed
                                            </span>
                                        ) : (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        Sign Waiver
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-[50rem] max-h-svh overflow-auto">
                                                    <DialogHeader>
                                                        <DialogTitle></DialogTitle>
                                                    </DialogHeader>
                                                    <SignWaiver />
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
