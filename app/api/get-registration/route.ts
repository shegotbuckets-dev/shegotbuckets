import { createAdminClient } from "@/lib/supabase-admin";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const registration_id = searchParams.get("registration_id");

        if (!registration_id) {
            return NextResponse.json(
                { error: "Registration ID is required" },
                { status: 400 }
            );
        }

        if (registration_id.length < 8) {
            return NextResponse.json(
                { error: "Registration ID must be at least 8 characters" },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();

        // Fetch registration details using shortened ID (first 8 chars of UUID)
        // Use RPC function to cast UUID to text for LIKE comparison
        const { data, error } = await supabase
            .rpc("get_registration_by_short_id", {
                short_id: registration_id,
            })
            .maybeSingle();

        if (error || !data) {
            return NextResponse.json(
                { error: "Invalid registration ID" },
                { status: 404 }
            );
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error("Error fetching registration:", err);
        return NextResponse.json(
            { error: "Unexpected server error" },
            { status: 500 }
        );
    }
}
