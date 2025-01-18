import { fetchMembers } from "@/utils/actions/supabase";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const leagues = await fetchMembers();
        return NextResponse.json(leagues);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch memebers" },
            { status: 500 }
        );
    }
}
