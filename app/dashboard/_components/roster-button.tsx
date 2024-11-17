import { Button } from "@/components/ui/button";
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

import { EventTableData } from "./events-table";

interface RosterButtonProps {
    event: EventTableData;
}

export function RosterButton({ event }: RosterButtonProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>View Roster</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Roster for {event.name}
                    </DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[400px]">
                    {event.registrationPlayers.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No players have been added to the roster yet.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Email</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {event.registrationPlayers.map(
                                    (player, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {player.first_name}
                                            </TableCell>
                                            <TableCell>
                                                {player.last_name}
                                            </TableCell>
                                            <TableCell>
                                                {player.user_email}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
