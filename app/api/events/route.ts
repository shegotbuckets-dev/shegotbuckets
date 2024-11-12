import { fetchEvents } from "@/utils/actions/supabase";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const events = await fetchEvents();
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}
