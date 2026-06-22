const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseAdminConfigured = Boolean(
  supabaseUrl && supabaseServiceRoleKey,
);

let supabaseAdminPromise;

export async function getSupabaseAdmin() {
  if (!isSupabaseAdminConfigured) {
    return null;
  }

  supabaseAdminPromise ||= import("@supabase/supabase-js").then(({ createClient }) =>
    createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }),
  );

  return supabaseAdminPromise;
}
