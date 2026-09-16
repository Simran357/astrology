import { createClient, SupabaseClient, User as SupabaseUser, Session } from "@supabase/supabase-js";

// Read Supabase credentials from environment
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const isValidUrl = (url: string) => {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
};

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    rawSupabaseUrl &&
    rawSupabaseAnonKey &&
    rawSupabaseUrl !== "https://your-project-id.supabase.co" &&
    rawSupabaseAnonKey !== "your-anon-public-key-here" &&
    isValidUrl(rawSupabaseUrl)
  );
};

// Create client if configured, otherwise create a mock-safe instance
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(rawSupabaseUrl, rawSupabaseAnonKey, {
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
  error?: string;
  isMockFallback?: boolean;
}

/**
 * Sign up with Email and Password
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  name?: string
): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    console.info(
      "[Supabase Auth] Keys not configured in .env. Running in local session mode. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable live cloud authentication."
    );
    const mockUser = {
      id: "local-user-" + Date.now(),
      email,
      name: name || email.split("@")[0],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format",
      provider: "email",
    };
    return { success: true, user: mockUser, isMockFallback: true };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || email.split("@")[0],
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const supaUser = data.user;
    return {
      success: true,
      user: supaUser
        ? {
            id: supaUser.id,
            email: supaUser.email || email,
            name: supaUser.user_metadata?.full_name || name || email.split("@")[0],
            avatar: supaUser.user_metadata?.avatar_url,
            provider: "email",
          }
        : null,
    };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred during signup." };
  }
}

/**
 * Sign in with Email and Password
 */
export async function signInWithEmail(email: string, password: string): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    console.info(
      "[Supabase Auth] Keys not configured in .env. Running in local session mode. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable live cloud authentication."
    );
    const mockUser = {
      id: "local-user-" + Date.now(),
      email,
      name: email.split("@")[0],
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format",
      provider: "email",
    };
    return { success: true, user: mockUser, isMockFallback: true };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const supaUser = data.user;
    return {
      success: true,
      user: supaUser
        ? {
            id: supaUser.id,
            email: supaUser.email || email,
            name: supaUser.user_metadata?.full_name || email.split("@")[0],
            avatar: supaUser.user_metadata?.avatar_url,
            provider: "email",
          }
        : null,
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to sign in." };
  }
}

/**
 * Continue with Google OAuth
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    console.info(
      "[Supabase Auth] Keys not configured in .env. Simulating Google OAuth login with demo profile."
    );
    const googleMockUser = {
      id: "google-user-" + Date.now(),
      email: "seeker.astral@gmail.com",
      name: "Astral Seeker",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop&auto=format",
      provider: "google",
    };
    return { success: true, user: googleMockUser, isMockFallback: true };
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Google authentication failed." };
  }
}

/**
 * Sign Out
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("[Supabase Auth] Sign out error:", e);
    }
  }
  return { success: true };
}

/**
 * Get current active session
 */
export async function getCurrentSession(): Promise<Session | null> {
  if (!supabase) return null;
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch {
    return null;
  }
}

/**
 * Listen for auth state changes
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
