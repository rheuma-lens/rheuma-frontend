import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { DatabaseUser, SessionData, SupabaseAuthError } from "@/types/auth";

let cachedClient: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return cachedClient;
};

export const getSupabaseClientOrThrow = (): SupabaseClient => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error("Missing Supabase environment variables");
  }
  return client;
};

export const mapSupabaseUser = (user: DatabaseUser | null): SessionData["user"] => {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? "",
    full_name: user.user_metadata?.full_name ?? user.email ?? "",
    avatar_url: user.user_metadata?.avatar_url ?? null,
    role: user.user_metadata?.role ?? "member",
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};

export const getSupabaseAuthError = (error: unknown): SupabaseAuthError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
    };
  }

  return {
    message: "An unexpected authentication error occurred",
    status: 500,
  };
};
