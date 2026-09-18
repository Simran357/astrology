import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "";

const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

// Service role key is STRICTLY server-only. Never expose to client.
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  "";

export const isServerSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://your-project-id.supabase.co" &&
    supabaseAnonKey !== "your-anon-public-key-here"
  );
};

/**
 * Creates an admin Supabase client (service role) for privileged backend tasks
 * such as webhooks, scheduled cron jobs, and subscription updates.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Creates a client scoped to the authenticated user's JWT bearer token,
 * ensuring PostgreSQL Row Level Security (RLS) is automatically enforced.
 */
export function getSupabaseUserClient(authToken: string): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey || !authToken) return null;
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  });
}

export interface AuthContext {
  user: User | null;
  userId: string;
  token?: string;
}

/**
 * Securely extracts and cryptographically verifies the authenticated user from Request headers.
 * NEVER trusts client-provided userId or email in the request body or query params.
 *
 * Verification flow:
 * Request -> Extract Bearer token / Cookie -> Supabase Auth verify -> Verified User ID
 */
export async function getAuthenticatedUser(req: Request): Promise<AuthContext> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  let token: string | null = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  } else {
    // Check cookie if bearer token is not present in Authorization header
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/sb-[^;]+-auth-token=([^;]+)/);
    if (match) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        token = Array.isArray(parsed) ? parsed[0] : parsed?.access_token || null;
      } catch {}
    }
  }

  // Cryptographically verify token with Supabase Auth
  if (token && supabaseUrl) {
    // Use admin client if configured, otherwise verify with standard public client
    const admin = getSupabaseAdmin();
    if (admin) {
      const { data: { user }, error } = await admin.auth.getUser(token);
      if (!error && user) {
        return {
          user,
          userId: user.id,
          token,
        };
      }
    } else if (supabaseAnonKey) {
      const client = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { data: { user }, error } = await client.auth.getUser(token);
      if (!error && user) {
        return {
          user,
          userId: user.id,
          token,
        };
      }
    }
  }

  // Unauthenticated: do NOT return mock users or accept x-user-id spoofing
  return {
    user: null,
    userId: "",
    token: undefined,
  };
}
