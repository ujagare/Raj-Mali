const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isSupabaseAdminConfigured = Boolean(
  supabaseUrl && supabaseServiceRoleKey,
);

function getRestUrl(table) {
  return `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${table}`;
}

export async function insertSupabaseRow(table, row) {
  if (!isSupabaseAdminConfigured) {
    return { error: null };
  }

  const response = await fetch(getRestUrl(table), {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (response.ok) {
    return { error: null };
  }

  const details = await response.text();

  return {
    error: new Error(
      `Supabase ${table} insert failed with ${response.status}: ${details}`,
    ),
  };
}

export async function upsertSupabaseRow(table, row, onConflict) {
  if (!isSupabaseAdminConfigured) {
    return { error: null };
  }

  const url = new URL(getRestUrl(table));

  if (onConflict) {
    url.searchParams.set("on_conflict", onConflict);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (response.ok) {
    return { error: null };
  }

  const details = await response.text();

  return {
    error: new Error(
      `Supabase ${table} upsert failed with ${response.status}: ${details}`,
    ),
  };
}
