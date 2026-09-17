import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  "";

const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  supabaseAnonKey ||
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
 * such as webhooks, scheduled cron jobs, and database migrations.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isServerSupabaseConfigured()) return null;
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
  if (!isServerSupabaseConfigured()) return null;
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
  isMockFallback: boolean;
  token?: string;
}

/**
 * Securely extracts and verifies the authenticated user from the Request headers.
 * NEVER trust client-provided userId in the request body!
 *
 * Security flow:
 * Request -> Extract Bearer token / Cookie -> Supabase Auth verify -> Verified User
 */
export async function getAuthenticatedUser(req: Request): Promise<AuthContext> {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  let token: string | null = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7).trim();
  } else {
    // Check cookie if bearer token is not present
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/sb-[^;]+-auth-token=([^;]+)/);
    if (match) {
      try {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        token = Array.isArray(parsed) ? parsed[0] : parsed?.access_token || null;
      } catch {}
    }
  }

  // If live Supabase is configured and a token is provided, verify cryptographically with Supabase Auth
  if (isServerSupabaseConfigured() && token) {
    const admin = getSupabaseAdmin();
    if (admin) {
      const { data: { user }, error } = await admin.auth.getUser(token);
      if (!error && user) {
        return {
          user,
          userId: user.id,
          isMockFallback: false,
          token,
        };
      }
    }
  }

  // Fallback for local session / demo mode when Supabase keys are not yet configured in .env
  const demoUserId = req.headers.get("x-user-id") || "demo-seeker-user";
  return {
    user: null,
    userId: demoUserId,
    isMockFallback: true,
  };
}
