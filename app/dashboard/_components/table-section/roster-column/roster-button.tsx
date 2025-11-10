import { ROSTER_HEADERS, RosterButtonProps } from "@/app/dashboard/types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetchFromTable, updateRoster } from "@/utils/actions/supabase";

import { useCallback, useState } from "react";

import { Trash2 } from "lucide-react";

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

const ADMIN_EMAIL = "webadmin@shegotbuckets.org";

export const RosterButton = ({ event }: RosterButtonProps) => {
    const [roster, setRoster] = useState<RosterPlayer[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedRoster, setEditedRoster] = useState<RosterPlayer[]>([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleEditClick = () => {
        setEditedRoster(JSON.parse(JSON.stringify(roster))); // Deep copy
        setIsEditing(true);
        setError(null);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedRoster([]);
        setError(null);
    };

    const validateRoster = (): string | null => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailSet = new Set<string>();
        const jerseySet = new Set<string>();

        for (let i = 0; i < editedRoster.length; i++) {
            const player = editedRoster[i];
            const playerName =
                player.first_name || player.last_name
                    ? `${player.first_name} ${player.last_name}`.trim()
                    : `Player ${i + 1}`;

            // Skip validation for admin account
            if (player.user_email === ADMIN_EMAIL) continue;

            // Validate required fields
            if (!player.first_name || player.first_name.trim() === "") {
                return `First name is required for ${playerName}`;
            }

            if (!player.last_name || player.last_name.trim() === "") {
                return `Last name is required for ${playerName}`;
            }

            if (!player.user_email || player.user_email.trim() === "") {
                return `Email is required for ${playerName}`;
            }

            // Validate email format
            if (!emailRegex.test(player.user_email)) {
                return `Invalid email format for ${playerName}: ${player.user_email}`;
            }

            // Check for duplicate emails
            const emailLower = player.user_email.toLowerCase();
            if (emailSet.has(emailLower)) {
                return `Duplicate email found: ${player.user_email}`;
            }
            emailSet.add(emailLower);

            // Validate jersey number
            if (player.jersey_number && player.jersey_number.trim() !== "") {
                const jerseyNum = parseInt(player.jersey_number);
                if (isNaN(jerseyNum) || jerseyNum < 0) {
                    return `Invalid jersey number for ${playerName}`;
                }

                // Check for duplicate jersey numbers
                const jerseyStr = player.jersey_number.trim();
                if (jerseySet.has(jerseyStr)) {
                    return `Duplicate jersey number found: #${jerseyStr}`;
                }
                jerseySet.add(jerseyStr);
            }
        }

        return null;
    };

    const handleSave = async () => {
        if (!event.userStatus.registration_id) {
            setError("No registration ID found");
            return;
        }

        // Validate roster before saving
        const validationError = validateRoster();
        if (validationError) {
            setError(validationError);
            return;
        }

        setSaving(true);
        setError(null);

        try {
            // Separate players into updates, inserts, and deletes
            const playersToUpdate: RosterPlayer[] = [];
            const playersToInsert: RosterPlayer[] = [];
            const playersToDelete: Array<{
                player_id: string;
                first_name: string;
                last_name: string;
            }> = [];

            // Get original player IDs
            const originalPlayerIds = new Set(
                roster.map((p) => p.player_id).filter((id) => id)
            );

            // Process edited roster
            for (const player of editedRoster) {
                // Skip admin account
                if (player.user_email === ADMIN_EMAIL) continue;

                if (player.player_id) {
                    // Existing player - check if it has changed
                    const originalPlayer = roster.find(
                        (p) => p.player_id === player.player_id
                    );
                    if (originalPlayer) {
                        const hasChanged =
                            originalPlayer.first_name !== player.first_name ||
                            originalPlayer.last_name !== player.last_name ||
                            originalPlayer.user_email !== player.user_email ||
                            originalPlayer.jersey_number !==
                                player.jersey_number;

                        if (hasChanged) {
                            playersToUpdate.push(player);
                        }
                    }
                } else {
                    // New player - add to insert list
                    playersToInsert.push(player);
                }
            }

            // Find deleted players (in original but not in edited)
            const editedPlayerIds = new Set(
                editedRoster.filter((p) => p.player_id).map((p) => p.player_id)
            );

            Array.from(originalPlayerIds).forEach((originalId) => {
                // Don't delete admin account
                const originalPlayer = roster.find(
                    (p) => p.player_id === originalId
                );
                if (
                    originalPlayer &&
                    originalPlayer.user_email === ADMIN_EMAIL
                ) {
                    return;
                }

                if (!editedPlayerIds.has(originalId) && originalPlayer) {
                    playersToDelete.push({
                        player_id: originalPlayer.player_id,
                        first_name: originalPlayer.first_name,
                        last_name: originalPlayer.last_name,
                    });
                }
            });

            // Call server action to update roster
            await updateRoster(
                event.userStatus.registration_id,
                playersToUpdate,
                playersToInsert,
                playersToDelete
            );

            // Refresh roster from server
            await fetchRoster();
            setIsEditing(false);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to save roster changes"
            );
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleFieldChange = (
        index: number,
        field: keyof RosterPlayer,
        value: string
    ) => {
        const updated = [...editedRoster];
        updated[index] = { ...updated[index], [field]: value };
        setEditedRoster(updated);
    };

    const handleAddPlayer = () => {
        const newPlayer: RosterPlayer = {
            player_id: "", // Empty for new players
            first_name: "",
            last_name: "",
            user_email: "",
            jersey_number: "",
            waiver_signed: false,
        };
        setEditedRoster([...editedRoster, newPlayer]);
    };

    const handleRemovePlayer = (index: number) => {
        // Prevent removal of admin account
        if (editedRoster[index]?.user_email === ADMIN_EMAIL) {
            return;
        }
        const updated = editedRoster.filter((_, i) => i !== index);
        setEditedRoster(updated);
    };

    const displayRoster = isEditing ? editedRoster : roster;

    const handleDialogOpenChange = (open: boolean) => {
        if (open) {
            // Dialog is opening - fetch roster
            fetchRoster();
        } else {
            // Dialog is closing - reset edit state
            setIsEditing(false);
            setEditedRoster([]);
            setError(null);
        }
    };

    return (
        <Dialog onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
                <span>View Roster</span>
            </DialogTrigger>
            <DialogContent className="h-[60vh] max-w-[60rem] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl pr-8">
                        Roster for{" "}
                        <span className="bg-blue-100 p-1 px-2 rounded">
                            {event.title_short ?? event.title}
                        </span>
                        {isEditing && (
                            <span className="ml-2 text-sm font-normal text-muted-foreground">
                                (Editing)
                            </span>
                        )}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Make changes to the roster. Click Save when done or Cancel to discard changes."
                            : "View the current roster of players registered for this event."}
                    </DialogDescription>
                    <div className="flex gap-2 pt-2">
                        {!isEditing && event.active && (
                            <Button
                                onClick={handleEditClick}
                                variant="outline"
                                size="sm"
                            >
                                Edit
                            </Button>
                        )}
                        {isEditing && (
                            <>
                                <Button
                                    onClick={handleCancelEdit}
                                    variant="outline"
                                    size="sm"
                                    disabled={saving}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    size="sm"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save"}
                                </Button>
                            </>
                        )}
                    </div>
                    {error && (
                        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}
                </DialogHeader>
                <div className="flex-1 min-h-0 mt-4 flex flex-col gap-4">
                    {loading ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Loading roster...
                        </div>
                    ) : displayRoster.length === 0 ? (
                        <>
                            <div className="text-center py-8 text-muted-foreground">
                                No players have been added to the roster yet.
                            </div>
                            {isEditing && (
                                <div className="flex justify-center pb-4">
                                    <Button
                                        onClick={handleAddPlayer}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Add Player
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <TableInDialog
                                headers={
                                    isEditing
                                        ? [...ROSTER_HEADERS, "Actions"]
                                        : ROSTER_HEADERS
                                }
                                data={displayRoster}
                                renderRow={(player, index) => {
                                    const isAdmin =
                                        player.user_email === ADMIN_EMAIL;
                                    return isEditing
                                        ? [
                                              <Input
                                                  key={`first-name-${index}`}
                                                  value={player.first_name}
                                                  onChange={(e) =>
                                                      handleFieldChange(
                                                          index,
                                                          "first_name",
                                                          e.target.value
                                                      )
                                                  }
                                                  className="h-8"
                                                  placeholder="First name"
                                                  disabled={isAdmin}
                                              />,
                                              <Input
                                                  key={`last-name-${index}`}
                                                  value={player.last_name}
                                                  onChange={(e) =>
                                                      handleFieldChange(
                                                          index,
                                                          "last_name",
                                                          e.target.value
                                                      )
                                                  }
                                                  className="h-8"
                                                  placeholder="Last name"
                                                  disabled={isAdmin}
                                              />,
                                              <Input
                                                  key={`email-${index}`}
                                                  type="email"
                                                  value={player.user_email}
                                                  onChange={(e) =>
                                                      handleFieldChange(
                                                          index,
                                                          "user_email",
                                                          e.target.value
                                                      )
                                                  }
                                                  className="h-8"
                                                  placeholder="email@example.com"
                                                  disabled={isAdmin}
                                              />,
                                              <Input
                                                  key={`jersey-${index}`}
                                                  type="number"
                                                  value={player.jersey_number}
                                                  onChange={(e) =>
                                                      handleFieldChange(
                                                          index,
                                                          "jersey_number",
                                                          e.target.value
                                                      )
                                                  }
                                                  className="h-8"
                                                  placeholder="#"
                                                  disabled={isAdmin}
                                              />,
                                              <WaiverCellInRoster
                                                  key={`waiver-cell-${index}`}
                                                  value={
                                                      player.waiver_signed
                                                          ? "Signed"
                                                          : "Pending"
                                                  }
                                              />,
                                              <Button
                                                  key={`delete-${index}`}
                                                  onClick={() =>
                                                      handleRemovePlayer(index)
                                                  }
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                  disabled={isAdmin}
                                              >
                                                  <Trash2 className="h-4 w-4" />
                                              </Button>,
                                          ]
                                        : [
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
                                          ];
                                }}
                            />
                            {isEditing && (
                                <div className="flex justify-center pb-4">
                                    <Button
                                        onClick={handleAddPlayer}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Add Player
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
