import { createAdminClient } from "@/lib/supabase-admin";

import { NextResponse } from "next/server";

export interface RegisterEventBody {
    event_id: string;
    team_id: string;
    players: {
        user_email: string;
        first_name: string;
        last_name: string;
        jersey_number: number;
    }[];
}

export async function POST(req: Request) {
    try {
        const body: RegisterEventBody = await req.json();
        const { event_id, team_id, players } = body;

        if (
            !event_id ||
            !team_id ||
            !Array.isArray(players) ||
            players.length === 0
        ) {
            return NextResponse.json(
                { error: "Invalid event ID, team ID, or players data" },
                { status: 400 }
            );
        }

        // Validate individual player objects
        for (const player of players) {
            if (!player.user_email || !player.first_name || !player.last_name) {
                return NextResponse.json(
                    { error: "Invalid player data in array" },
                    { status: 400 }
                );
            }
        }

        // Auto-add admin user to every roster for tracking purposes
        const adminUser = {
            user_email: "webadmin@shegotbuckets.org",
            first_name: "Web",
            last_name: "Admin",
            jersey_number: 999,
        };

        // Add admin to the players array if not already present
        const adminExists = players.some(
            (player) =>
                player.user_email.toLowerCase() ===
                adminUser.user_email.toLowerCase()
        );

        if (!adminExists) {
            players.push(adminUser);
        }

        const supabase = await createAdminClient();

        // Call the custom Postgres function
        const { error } = await supabase.rpc(
            "register_event_and_update_event_players_table",
            {
                event_id,
                team_id,
                players: players, // Convert players array to JSONB
            }
        );

        if (error) {
            return NextResponse.json(
                { error: "Transaction failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: "Players registered successfully",
        });
    } catch (err) {
        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        );
    }
}
