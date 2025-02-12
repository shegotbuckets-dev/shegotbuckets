"use server";

import { Database } from "@/constants/supabase";
import { createServerClient } from "@/lib/supabase-server";

type TableNames = keyof Database["public"]["Tables"];
type TableRow<T extends TableNames> = Database["public"]["Tables"][T]["Row"];

export async function fetchFromTable<T extends TableNames>(
    table: T,
    options?: {
        select?: string;
        eq?: { column: string; value: string };
    }
): Promise<TableRow<T>[]> {
    const supabase = await createServerClient();
    let query = supabase.from(table).select(options?.select || "*");

    if (options?.eq) {
        query = query.eq(options.eq.column, options.eq.value);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(`Failed to fetch from ${table}: ${error.message}`);
    }

    return (data as unknown as TableRow<T>[]) ?? [];
}

// Simplified wrapper functions with type safety
export async function fetchLeagues() {
    return fetchFromTable("leagues") as Promise<TableRow<"leagues">[]>;
}

export async function fetchEvents() {
    return fetchFromTable("events") as Promise<TableRow<"events">[]>;
}

export async function fetchTeams() {
    return fetchFromTable("teams") as Promise<TableRow<"teams">[]>;
}

export async function fetchMembers() {
    return fetchFromTable("members") as Promise<TableRow<"members">[]>;
}

export async function fetchRegistrations() {
    return fetchFromTable("event_registrations") as Promise<
        TableRow<"event_registrations">[]
    >;
}

export async function fetchLeagueById(
    leagueId: string
): Promise<Database["public"]["Tables"]["leagues"]["Row"]> {
    if (!leagueId) {
        throw new Error("League ID is required");
    }

    const supabase = await createServerClient();
    const { data: league, error } = await supabase
        .from("leagues")
        .select("*")
        .eq("league_id", leagueId)
        .single();

    if (error) {
        throw new Error(`Failed to fetch events: ${error.message}`);
    }

    return league;
}

export async function fetchSingleFromTable<T extends TableNames>(
    table: T,
    column: string,
    value: string
): Promise<TableRow<T> | null> {
    const supabase = await createServerClient();
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq(column, value)
        .single();

    if (error) {
        if (error.code === "PGRST116") return null;
        throw new Error(`Failed to fetch from ${table}: ${error.message}`);
    }

    return data;
}

export async function fetchMemberDetailById(memberID: string) {
    if (!memberID) throw new Error("Member ID is required");
    return fetchSingleFromTable("members", "member_id", memberID);
}

// Keep the existing insertMultipleRowsToTable function
export async function insertMultipleRowsToTable<T extends TableNames>(
    table: T,
    rows: Database["public"]["Tables"][T]["Insert"][]
): Promise<TableRow<T>[]> {
    const supabase = await createServerClient();

    const { data: insertedRows, error } = await supabase
        .from(table)
        .insert(rows)
        .select("*");

    if (error) {
        throw new Error(
            `Failed to insert rows into ${table}: ${error.message}`
        );
    }

    return insertedRows || [];
}
