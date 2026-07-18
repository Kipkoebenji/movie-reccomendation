import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";


export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.");
}

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options as CookieOptions);
          });
        } catch {
          // Server Components cannot directly set cookies in all cases.
        }
      },
    },
  });
}
