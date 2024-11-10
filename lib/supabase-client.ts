import { createBrowserClient } from "@supabase/ssr";

// Initialize Supabase client without setting auth initially
const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;
