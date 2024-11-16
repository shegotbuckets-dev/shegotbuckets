import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Database } from "@/constants/supabase";

export default function RegisteredEvents({
    events,
}: {
    events: Database["public"]["Tables"]["events"]["Row"][];
}) {
    return (
        <div>
            {events && events.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Waiver</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.event_id}>
                                    <TableCell className="font-medium">
                                        {event.title}
                                    </TableCell>
                                    <TableCell>{event.date || "N/A"}</TableCell>
                                    <TableCell>
                                        {event.location || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                event.active
                                                    ? "default"
                                                    : "secondary"
                                            }
                                        >
                                            {event.active
                                                ? "Active"
                                                : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">Pending</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-4">
                    <p className="text-sm sm:text-base text-muted-foreground">
                        No registered events found.
                    </p>
                </div>
            )}
        </div>
    );
}
