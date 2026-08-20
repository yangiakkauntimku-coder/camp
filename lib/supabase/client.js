import { createBrowserClient } from "@supabase/ssr";

// Brauzer tomonida ishlaydigan Supabase client (Client Componentlar uchun)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
