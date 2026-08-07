"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/auth-store";
import { getSupabaseClientOrThrow } from "@/lib/supabase";

export const AuthSessionListener = () => {
  const { setSession, setLoading } = useAuthStore();

  useEffect(() => {
    const supabaseClient = getSupabaseClientOrThrow();
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      setLoading(false);
      if (!session) {
        setSession(null);
        return;
      }

      setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: session.expires_at ?? null,
        user: session.user
          ? {
              id: session.user.id,
              email: session.user.email ?? "",
              full_name: session.user.user_metadata?.full_name ?? session.user.email ?? "",
              avatar_url: session.user.user_metadata?.avatar_url ?? null,
              role: session.user.user_metadata?.role ?? "member",
              created_at: session.user.created_at ?? new Date().toISOString(),
              updated_at: session.user.updated_at ?? new Date().toISOString(),
            }
          : null,
      });
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setLoading, setSession]);

  return null;
};
