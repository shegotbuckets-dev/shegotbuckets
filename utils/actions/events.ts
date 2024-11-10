"use server";

import { Database } from "@/constants/supabase";
import { createServerClient } from "@/lib/supabase-server";

export async function fetchEvents(): Promise<
    Database["public"]["Tables"]["events"]["Row"][]
> {
    const supabase = await createServerClient();
    const { data: events, error } = await supabase.from("events").select("*");

    if (error) {
        throw new Error(`Failed to fetch events: ${error.message}`);
    }

    return events;
}

export async function fetchEventById(
    eventId: string
): Promise<Database["public"]["Tables"]["events"]["Row"]> {
    if (!eventId) {
        throw new Error("Event ID is required");
    }

    const supabase = await createServerClient();
    const { data: event, error } = await supabase
        .from("events")
        .select("*")
        .eq("event_id", eventId)
        .single();

    if (error) {
        throw new Error(`Failed to fetch events: ${error.message}`);
    }

    return event;
}
