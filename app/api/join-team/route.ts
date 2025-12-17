import { JoinTeamData } from "@/app/dashboard/types";
import { createAdminClient } from "@/lib/supabase-admin";

import { NextResponse } from "next/server";

interface JoinTeamResponse {
    success: boolean;
    message?: string;
    error?: string;
    status?: number;
}

export async function POST(req: Request) {
    try {
        const body: JoinTeamData = await req.json();
        const {
            registration_id,
            event_id,
            user_email,
            user_id,
            first_name,
            last_name,
            jersey_number,
        } = body;

        // Basic validation
        if (
            !registration_id ||
            !event_id ||
            !user_email ||
            !first_name ||
            !last_name ||
            jersey_number === undefined
        ) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate jersey number is a valid integer
        if (
            typeof jersey_number !== "number" ||
            isNaN(jersey_number) ||
            jersey_number < 0
        ) {
            return NextResponse.json(
                { error: "Invalid jersey number" },
                { status: 400 }
            );
        }

        const supabase = await createAdminClient();

        // Call Postgres function
        const { data, error } = await supabase.rpc(
            "join_team_with_registration_id",
            {
                p_registration_id: registration_id,
                p_event_id: event_id,
                p_user_email: user_email,
                p_user_id: user_id || null,
                p_first_name: first_name,
                p_last_name: last_name,
                p_jersey_number: jersey_number,
            }
        );

        if (error) {
            console.error(
                "Error calling join_team_with_registration_id:",
                error
            );
            return NextResponse.json(
                { error: "Failed to join team" },
                { status: 500 }
            );
        }

        const response = data as JoinTeamResponse;

        // Check if the function returned an error
        if (!response.success) {
            return NextResponse.json(
                { error: response.error },
                { status: response.status || 400 }
            );
        }

        // Success
        return NextResponse.json({
            message: response.message,
        });
    } catch (err) {
        console.error("Unexpected error in join-team:", err);
        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        );
    }
}
