import { fetchLeagues } from "@/utils/actions/supabase";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const leagues = await fetchLeagues();
        return NextResponse.json(leagues);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch leagues" },
            { status: 500 }
        );
    }
}
