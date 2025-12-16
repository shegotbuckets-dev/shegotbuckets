import { RegisterTeamData } from "@/app/dashboard/types";
import { createAdminClient } from "@/lib/supabase-admin";

import { NextResponse } from "next/server";

interface RegisterTeamResponse {
    success: boolean;
    registration_id?: string;
    message?: string;
    error?: string;
    status?: number;
}

export async function POST(req: Request) {
    try {
        const body: RegisterTeamData = await req.json();
        const { event_id, team_id, user_email, first_name, last_name } = body;

        // Basic validation
        if (!event_id || !team_id || !user_email || !first_name || !last_name) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const supabase = await createAdminClient();

        // Call Postgres function
        const { data, error } = await supabase.rpc("register_team_for_event", {
            p_event_id: event_id,
            p_team_id: team_id,
            p_user_email: user_email,
            p_first_name: first_name,
            p_last_name: last_name,
        });

        if (error) {
            console.error("Error calling register_team_for_event:", error);
            return NextResponse.json(
                { error: "Failed to register team" },
                { status: 500 }
            );
        }

        const response = data as RegisterTeamResponse;

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
            registration_id: response.registration_id,
        });
    } catch (err) {
        console.error("Unexpected error in register-team:", err);
        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        );
    }
}
