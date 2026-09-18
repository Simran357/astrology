import { createClient, SupabaseClient, User as SupabaseUser, Session } from "@supabase/supabase-js";

/**
 * Universal environment variable resolver supporting Vite (import.meta.env)
 * and Next.js (process.env.NEXT_PUBLIC_*).
 */
const resolveClientEnv = (viteKey: string, nextKey?: string): string => {
  if (typeof process !== "undefined" && process.env) {
    if (nextKey && process.env[nextKey]) return process.env[nextKey]!;
    if (process.env[viteKey]) return process.env[viteKey]!;
  }
  try {
    const metaEnv = (import.meta as any)?.env;
    if (metaEnv) {
      if (nextKey && metaEnv[nextKey]) return metaEnv[nextKey];
      if (metaEnv[viteKey]) return metaEnv[viteKey];
    }
  } catch {}
  return "";
};

const supabaseUrl = resolveClientEnv("VITE_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL");
const supabaseAnonKey =
  resolveClientEnv("VITE_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
  resolveClientEnv("VITE_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");

const isValidUrl = (url: string) => {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
};

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "https://your-project-id.supabase.co" &&
    supabaseAnonKey !== "your-anon-public-key-here" &&
    isValidUrl(supabaseUrl)
  );
};

// Create the single shared browser Supabase client with native session persistence
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export interface AuthResult {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    provider?: string;
  } | null;
  session?: Session | null;
  emailConfirmationRequired?: boolean;
  message?: string;
  error?: string;
}

/**
 * Maps Supabase raw errors into clear, empathetic, user-facing copy.
 */
export function formatAuthError(error: any): string {
  if (!error) return "An unexpected error occurred.";
  const raw = (error.message || String(error)).toLowerCase();

  if (raw.includes("already registered") || raw.includes("already exists") || raw.includes("user already registered")) {
    return "An account with this email already exists. Please sign in instead.";
  }
  if (raw.includes("invalid login credentials") || raw.includes("invalid credentials")) {
    return "Email or password is incorrect.";
  }
  if (raw.includes("password should be at least") || raw.includes("weak password") || raw.includes("least 6 characters")) {
    return "Password must be at least 6 characters.";
  }
  if (raw.includes("unable to validate email") || raw.includes("invalid email")) {
    return "Please enter a valid email address.";
  }
  if (raw.includes("email not confirmed")) {
    return "Please verify your email address to sign in.";
  }
  if (raw.includes("rate limit") || raw.includes("too many requests") || raw.includes("over_email_send_rate_limit")) {
    return "Too many attempts. Please wait a few moments and try again.";
  }
  if (raw.includes("failed to fetch") || raw.includes("networkerror")) {
    return "Network connection issue. Please check your internet connection.";
  }

  return error.message || "Something went wrong. Please try again.";
}

/**
 * Sign up with Email and Password via real Supabase Auth.
 * Automatically transmits user's name via options.data so the
 * PostgreSQL database trigger (public.handle_new_user) initializes public.profiles.
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  name?: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: "Supabase connection is not configured. Please verify environment credentials.",
    };
  }

  const cleanEmail = email.trim();
  const cleanName = (name || "").trim() || cleanEmail.split("@")[0];

  try {
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          name: cleanName,
          full_name: cleanName,
        },
      },
    });

    if (error) {
      return { success: false, error: formatAuthError(error) };
    }

    const supaUser = data.user;
    if (!supaUser) {
      return { success: false, error: "Unable to create account. Please try again." };
    }

    // When email confirmation is enabled in Supabase, user exists but session is null
    const isEmailConfirmationRequired = !data.session;

    return {
      success: true,
      user: {
        id: supaUser.id,
        email: supaUser.email || cleanEmail,
        name: supaUser.user_metadata?.full_name || supaUser.user_metadata?.name || cleanName,
        avatar: supaUser.user_metadata?.avatar_url,
        provider: "email",
      },
      session: data.session,
      emailConfirmationRequired: isEmailConfirmationRequired,
      message: isEmailConfirmationRequired
        ? "Account created! Please check your email to confirm your account."
        : undefined,
    };
  } catch (err: any) {
    return { success: false, error: formatAuthError(err) };
  }
}

/**
 * Sign in with Email and Password via real Supabase Auth.
 */
export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: "Supabase connection is not configured. Please verify environment credentials.",
    };
  }

  const cleanEmail = email.trim();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      return { success: false, error: formatAuthError(error) };
    }

    const supaUser = data.user;
    return {
      success: true,
      user: supaUser
        ? {
            id: supaUser.id,
            email: supaUser.email || cleanEmail,
            name: supaUser.user_metadata?.full_name || supaUser.user_metadata?.name || cleanEmail.split("@")[0],
            avatar: supaUser.user_metadata?.avatar_url,
            provider: "email",
          }
        : null,
      session: data.session,
    };
  } catch (err: any) {
    return { success: false, error: formatAuthError(err) };
  }
}

/**
 * Continue with Google OAuth via Supabase Auth
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: "Supabase connection is not configured. Please verify environment credentials.",
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : undefined,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return { success: false, error: formatAuthError(error) };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: formatAuthError(err) };
  }
}

/**
 * Sign Out - destroys session across client and notifies listeners
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.warn("[Supabase Auth] Sign out notice:", error.message);
        return { success: false, error: error.message };
      }
    } catch (e: any) {
      console.warn("[Supabase Auth] Sign out exception:", e);
      return { success: false, error: e?.message };
    }
  }
  return { success: true };
}

/**
 * Get current active Supabase session
 */
export async function getCurrentSession(): Promise<Session | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.warn("[Supabase Auth] getSession error:", error.message);
      return null;
    }
    return data.session;
  } catch {
    return null;
  }
}

/**
 * Get current authenticated Supabase user
 */
export async function getCurrentUser(): Promise<SupabaseUser | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) return null;
    return data.user;
  } catch {
    return null;
  }
}

/**
 * Listen for real Supabase auth state changes
 */
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void
) {
  if (!supabase) return { unsubscribe: () => {} };
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return {
    unsubscribe: () => subscription.unsubscribe(),
  };
}
