import { ROSTER_HEADERS, RosterButtonProps } from "@/app/dashboard/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { TableInDialog } from "../table-in-dialog";

export const RosterButton = ({ event }: RosterButtonProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>View Roster</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Roster for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {event.name}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[400px]">
                    {event.roster.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No players have been added to the roster yet.
                        </div>
                    ) : (
                        <TableInDialog
                            headers={ROSTER_HEADERS}
                            data={event.roster}
                            renderRow={(player) => [
                                player.first_name,
                                player.last_name,
                                player.user_email,
                            ]}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
