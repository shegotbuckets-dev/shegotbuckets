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
// import { BarChartComponent } from "./_components/bar-chart";
// import { BarChartBetter } from "./_components/bar-chart-better";

export default async function Dashboard() {
    return (
        <div className="flex flex-col justify-center items-start flex-wrap px-4 pt-4 gap-4">
            <Card className="w-1/2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        SGB User Portal
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">
                        Welcome to She Got Buckets!
                    </p>
                </CardContent>
            </Card>
            {/* <div className="flex flex-wrap gap-2">
                <BarChartComponent />
                <BarChartBetter />
            </div> */}
            <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full gap-3">
                <Card className="">
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
                            {" "}
                            {/* Adjust maxHeight according to your design */}
                            <main className="flex flex-col gap-2 lg:gap-2 h-[300px] w-full">
                                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-xl font-bold tracking-tight">
                                            You have no activily with us so far
                                        </h1>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Events will show when you
                                            participate in events with She Got
                                            Buckets
                                        </p>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
