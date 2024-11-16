"use server";

import { Database } from "@/constants/supabase";
import { createServerClient } from "@/lib/supabase-server";

export async function fetchLeagues(): Promise<
    Database["public"]["Tables"]["leagues"]["Row"][]
> {
    const supabase = await createServerClient();
    const { data: leagues, error } = await supabase.from("leagues").select("*");

    if (error) {
        throw new Error(`Failed to fetch leagues: ${error.message}`);
    }

    return leagues ?? [];
}

export async function fetchEvents(): Promise<
    Database["public"]["Tables"]["events"]["Row"][]
> {
    const supabase = await createServerClient();
    const { data: events, error } = await supabase.from("events").select("*");

    if (error) {
        throw new Error(`Failed to fetch events: ${error.message}`);
    }

    return events ?? [];
}

export async function fetchTeams(): Promise<
    Database["public"]["Tables"]["teams"]["Row"][]
> {
    const supabase = await createServerClient();
    const { data: teams, error } = await supabase.from("teams").select("*");

    if (error) {
        throw new Error(`Failed to fetch teams: ${error.message}`);
    }

    return teams ?? [];
}

export async function fetchRegistrations(): Promise<
    Database["public"]["Tables"]["registrations"]["Row"][]
> {
    const supabase = await createServerClient();
    const { data: registrations, error } = await supabase
        .from("registrations")
        .select("*");

    if (error) {
        throw new Error(`Failed to fetch teams: ${error.message}`);
    }

    return registrations ?? [];
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

type TableNames = keyof Database["public"]["Tables"];
type TableRow<T extends TableNames> = Database["public"]["Tables"][T]["Insert"];

export async function insertMultipleRowsToTable<T extends TableNames>(
    table: T,
    rows: TableRow<T>[]
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

// export async function fetchEventById(
//     eventId: string
// ): Promise<Database["public"]["Tables"]["events"]["Row"]> {
//     if (!eventId) {
//         throw new Error("Event ID is required");
//     }

//     const supabase = await createServerClient();
//     const { data: event, error } = await supabase
//         .from("events")
//         .select("*")
//         .eq("event_id", eventId)
//         .single();

//     if (error) {
//         throw new Error(`Failed to fetch events: ${error.message}`);
//     }

//     return event;
// }

// export async function fetchEventsByLeagueId(
//     leagueId: string
// ): Promise<Database["public"]["Tables"]["events"]["Row"][]> {
//     const supabase = await createServerClient();
//     const { data: events, error } = await supabase
//         .from("events")
//         .select("*")
//         .eq("league_id", leagueId); // Filter by the given league_id

//     if (error) {
//         throw new Error(
//             `Failed to fetch events for league ID ${leagueId}: ${error.message}`
//         );
//     }

//     return events ?? [];
// }

// type LeagueRow = Database["public"]["Tables"]["leagues"]["Row"];
// interface LeagueWithEvents extends LeagueRow {
//     events: Database["public"]["Tables"]["events"]["Row"][];
// }

// export async function fetchLeaguesWithEvents(): Promise<LeagueWithEvents[]> {
//     const supabase = await createServerClient();

//     // Fetch leagues with associated events
//     const { data: leagues, error } = await supabase.from("leagues").select(`
//             league_id,
//             name,
//             description,
//             date,
//             location,
//             image_url,
//             events (
//                 event_id,
//                 league_id,
//                 title,
//                 title_short,
//                 subtitle,
//                 image,
//                 description,
//                 date,
//                 location,
//                 price
//             )
//         `); // Assumes "events" is the foreign key relationship

//     if (error) {
//         throw new Error(
//             `Failed to fetch leagues with events: ${error.message}`
//         );
//     }

//     return leagues ?? [];
// }
