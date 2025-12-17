import { createAdminClient } from "@/lib/supabase-admin";
import { fetchTeams } from "@/utils/actions/supabase";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const teams = await fetchTeams();
        return NextResponse.json(teams);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { name, league_id } = await req.json();

        // Validate required fields
        if (!name || !name.trim()) {
            return NextResponse.json(
                { error: "Team name is required" },
                { status: 400 }
            );
        }

        if (!league_id) {
            return NextResponse.json(
                { error: "League ID is required" },
                { status: 400 }
            );
        }

        // Validate team name length
        const trimmedName = name.trim();
        if (trimmedName.length > 100) {
            return NextResponse.json(
                { error: "Team name must be 100 characters or less" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Check for duplicate team name in the same league (case-insensitive)
        const { data: existingTeams, error: checkError } = await supabase
            .from("teams")
            .select("team_id, name")
            .eq("league_id", league_id)
            .ilike("name", trimmedName);

        if (checkError) {
            console.error("Error checking for duplicate team:", checkError);
            return NextResponse.json(
                { error: "Failed to validate team name" },
                { status: 500 }
            );
        }

        if (existingTeams && existingTeams.length > 0) {
            return NextResponse.json(
                {
                    error: "A team with this name already exists in this league",
                },
                { status: 409 }
            );
        }

        // Create the team
        const { data: newTeam, error: createError } = await supabase
            .from("teams")
            .insert({
                name: trimmedName,
                league_id: league_id,
            })
            .select()
            .single();

        if (createError) {
            console.error("Error creating team:", createError);
            return NextResponse.json(
                { error: "Failed to create team" },
                { status: 500 }
            );
        }

        return NextResponse.json(newTeam, { status: 201 });
    } catch (error) {
        console.error("Unexpected error creating team:", error);
        return NextResponse.json(
            { error: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}
