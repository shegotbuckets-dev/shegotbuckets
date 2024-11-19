import { DashboardData } from "@/app/dashboard/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { EventsTable } from "./events-table";

export const EventsTableContainer = ({
    loading,
    dashboardData,
    onButtonSuccess,
}: {
    loading: boolean;
    dashboardData: DashboardData;
    onButtonSuccess: () => void;
}) => {
    if (loading) {
        return <TableSkeleton />;
    }

    if (dashboardData.events.length === 0) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="flex flex-col items-center text-center max-w-md">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2">
                        No events found
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Check back later for updates!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <EventsTable
            dashboardData={dashboardData}
            onButtonSuccess={onButtonSuccess}
        />
    );
};

function TableSkeleton() {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: 7 }).map((_, i) => (
                            <TableHead key={i}>
                                <Skeleton className="h-4 w-20" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 3 }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: 7 }).map((_, cellIndex) => (
                                <TableCell key={cellIndex}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
