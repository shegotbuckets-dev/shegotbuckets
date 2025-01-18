import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
    const supabase = await createAdminClient();

    try {
        const body = await request.json();
        const { registration_id, user_email, status } = body; // Extract user_email from the request body

        if (!user_email) {
            return new Response(
                JSON.stringify({
                    error: "Missing user_email in database, contact SGB IT support",
                }),
                {
                    status: 400,
                }
            );
        }

        // Update the waiver_signed field
        const { data, error } = await supabase
            .from("registration_players") // Replace with your actual table name
            .update({ waiver_signed: status }) // Set waiver_signed to true
            .eq("registration_id", registration_id) // Match the row by registration_id
            .eq("user_email", user_email); // Match the row by user_email

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
            });
        }

        return new Response(JSON.stringify({ success: true, data }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Unknown error" }), {
            status: 500,
        });
    }
}
