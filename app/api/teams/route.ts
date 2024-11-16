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
