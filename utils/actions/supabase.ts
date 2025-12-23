"use server";

import { Database } from "@/constants/supabase";
import {
    createServerClient,
    createServiceRoleClient,
} from "@/lib/supabase-server";
import { slugifyMemberName } from "@/lib/utils";

type TableNames = keyof Database["public"]["Tables"];
type TableRow<T extends TableNames> = Database["public"]["Tables"][T]["Row"];

interface FetchTableOptions {
    select?: string;
    eq?: { column: string; value: string };
    ilike?: { column: string; value: string };
}

export async function fetchFromTable<T extends TableNames>(
    table: T,
    options?: FetchTableOptions
): Promise<TableRow<T>[]> {
    const supabase = await createServerClient();
    let query = supabase.from(table).select(options?.select ?? "*");

    if (options?.eq) {
        query = query.eq(options.eq.column, options.eq.value);
    }

    if (options?.ilike) {
        query = query.ilike(options.ilike.column, options.ilike.value);
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

export async function fetchMemberDetailBySlug(memberSlug: string) {
    const normalizedSlug = slugifyMemberName(memberSlug);

    if (!normalizedSlug) throw new Error("Member slug is required");

    const members = await fetchMembers();

    const matchedMember =
        members.find((member) =>
            member.name
                ? slugifyMemberName(member.name) === normalizedSlug
                : false
        ) ?? null;

    if (matchedMember) {
        return matchedMember;
    }

    return fetchSingleFromTable("members", "member_id", memberSlug);
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

interface RosterPlayerUpdate {
    player_id: string;
    first_name: string;
    last_name: string;
    user_email: string;
    jersey_number: string;
}

interface RosterPlayerDelete {
    player_id: string;
    first_name: string;
    last_name: string;
}

export async function updateRoster(
    registrationId: string,
    playersToUpdate: RosterPlayerUpdate[],
    playersToInsert: RosterPlayerUpdate[],
    playersToDelete: RosterPlayerDelete[]
): Promise<void> {
    // Use service role client to bypass RLS for roster management
    const supabase = createServiceRoleClient();

    // Check if any actual changes are being made
    const hasChanges =
        playersToUpdate.length > 0 ||
        playersToInsert.length > 0 ||
        playersToDelete.length > 0;

    if (!hasChanges) {
        return; // No changes to save
    }

    // Update existing players by player_id
    for (const player of playersToUpdate) {
        const { error: updateError } = await supabase
            .from("event_players")
            .update({
                first_name: player.first_name,
                last_name: player.last_name,
                user_email: player.user_email,
                jersey_number: player.jersey_number
                    ? parseInt(player.jersey_number)
                    : null,
                updated_at: new Date().toISOString(),
            })
            .eq("player_id", player.player_id);

        if (updateError) {
            throw new Error(
                `Failed to update ${player.first_name} ${player.last_name}: ${updateError.message}`
            );
        }
    }

    // Insert new players
    if (playersToInsert.length > 0) {
        const playersData: Database["public"]["Tables"]["event_players"]["Insert"][] =
            playersToInsert.map((player) => ({
                registration_id: registrationId,
                first_name: player.first_name,
                last_name: player.last_name,
                user_email: player.user_email,
                jersey_number: player.jersey_number
                    ? parseInt(player.jersey_number)
                    : null,
                waiver_signed: false,
                updated_at: new Date().toISOString(),
            }));

        const { error: insertError } = await supabase
            .from("event_players")
            .insert(playersData);

        if (insertError) {
            throw new Error(
                `Failed to insert new players: ${insertError.message}`
            );
        }
    }

    // Delete players by player_id
    for (const player of playersToDelete) {
        const { error: deleteError } = await supabase
            .from("event_players")
            .delete()
            .eq("player_id", player.player_id);

        if (deleteError) {
            throw new Error(
                `Failed to delete ${player.first_name} ${player.last_name}: ${deleteError.message}`
            );
        }
    }
}
