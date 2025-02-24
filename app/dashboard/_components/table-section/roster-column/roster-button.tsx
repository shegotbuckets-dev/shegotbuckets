import { ROSTER_HEADERS, RosterButtonProps } from "@/app/dashboard/types";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { fetchFromTable } from "@/utils/actions/supabase";

import { useCallback, useState } from "react";

import { WaiverCellInRoster } from "../simple-cells";
import { TableInDialog } from "../table-in-dialog";

interface RosterPlayer {
    player_id: string;
    first_name: string;
    last_name: string;
    user_email: string;
    jersey_number: string;
    waiver_signed: boolean;
}

export const RosterButton = ({ event }: RosterButtonProps) => {
    const [roster, setRoster] = useState<RosterPlayer[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchRoster = useCallback(async () => {
        if (!event.userStatus.registration_id) return;

        setLoading(true);
        try {
            const players = await fetchFromTable("event_players", {
                eq: {
                    column: "registration_id",
                    value: event.userStatus.registration_id,
                },
            });
            setRoster(
                players.map((player) => ({
                    player_id: player.player_id,
                    first_name: player.first_name ?? "",
                    last_name: player.last_name ?? "",
                    user_email: player.user_email ?? "",
                    jersey_number: String(player.jersey_number ?? ""),
                    waiver_signed: player.waiver_signed ?? false,
                }))
            );
        } catch (error) {
            console.error("Error fetching roster:", error);
        } finally {
            setLoading(false);
        }
    }, [event.userStatus.registration_id]);

    return (
        <Dialog onOpenChange={(open) => open && fetchRoster()}>
            <DialogTrigger asChild>
                <span>View Roster</span>
            </DialogTrigger>
            <DialogContent className="h-[60vh] max-w-[60rem] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Roster for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {event.title_short ?? event.title}
                        </span>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-1 min-h-0 mt-4">
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Loading roster...
                        </div>
                    ) : roster.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No players have been added to the roster yet.
                        </div>
                    ) : (
                        <TableInDialog
                            headers={ROSTER_HEADERS}
                            data={roster}
                            renderRow={(player) => [
                                player.first_name,
                                player.last_name,
                                player.user_email,
                                player.jersey_number,
                                <WaiverCellInRoster
                                    key={`waiver-cell-${player.player_id}`}
                                    value={
                                        player.waiver_signed
                                            ? "Signed"
                                            : "Pending"
                                    }
                                />,
                            ]}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
