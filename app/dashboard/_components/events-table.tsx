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

import { RegisterButton } from "./register-button";
import SignWaiverButton from "./sign-waiver-button";
import { UploadRosterButton } from "./upload-roster-button";

export default function EventsTable({
    events,
    teams,
}: {
    events: Database["public"]["Tables"]["events"]["Row"][];
    teams?: Database["public"]["Tables"]["teams"]["Row"][];
}) {
    return (
        <div>
            {events && events.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Season</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Register</TableHead>
                                <TableHead>Roster</TableHead>
                                <TableHead>Waiver</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.event_id}>
                                    <TableCell className="font-medium">
                                        {event.title_short ?? event.title}
                                    </TableCell>
                                    <TableCell>{event.subtitle}</TableCell>
                                    <TableCell>{event.date || "N/A"}</TableCell>
                                    <TableCell className="line-clamp-1">
                                        {event.location || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                        {event.active ? (
                                            <RegisterButton
                                                event={event}
                                                teams={teams ?? []}
                                            />
                                        ) : (
                                            <Badge variant="secondary">
                                                N/A
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {event.active ? (
                                            <UploadRosterButton event={event} />
                                        ) : (
                                            <Badge variant="secondary">
                                                N/A
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {event.active ? (
                                            <SignWaiverButton />
                                        ) : (
                                            <Badge variant="secondary">
                                                N/A
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p className="text-center py-4 text-sm sm:text-base text-muted-foreground">
                    No registered events found.
                </p>
            )}
        </div>
    );
}
