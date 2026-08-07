"use client";

import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { useAuthStore } from "@/store/auth-store";
import { getSupabaseClientOrThrow, mapSupabaseUser, getSupabaseAuthError } from "@/lib/supabase";
import type { AuthContextValue, AuthUser, SignInPayload, SignUpPayload, SessionData } from "@/types/auth";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { session, user, isAuthenticated, isLoading, error, setSession, setUser, setLoading, setError } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        setLoading(true);
        const supabaseClient = getSupabaseClientOrThrow();
        const { data: { session: currentSession }, error: sessionError } = await supabaseClient.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }

        const nextSession: SessionData | null = currentSession
          ? {
              access_token: currentSession.access_token,
              refresh_token: currentSession.refresh_token,
              expires_at: currentSession.expires_at ?? null,
              user: mapSupabaseUser(currentSession.user as never),
            }
          : null;

        setSession(nextSession);
        setHydrated(true);
      } catch (caughtError) {
        setError(getSupabaseAuthError(caughtError));
      } finally {
        setLoading(false);
      }
    };

    void initializeSession();
  }, [setError, setLoading, setSession]);

  useEffect(() => {
    const supabaseClient = getSupabaseClientOrThrow();
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (_event, currentSession) => {
      const nextSession: SessionData | null = currentSession
        ? {
            access_token: currentSession.access_token,
            refresh_token: currentSession.refresh_token,
            expires_at: currentSession.expires_at ?? null,
            user: mapSupabaseUser(currentSession.user as never),
          }
        : null;

      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setLoading, setSession]);

  const signIn = async (payload: SignInPayload) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseClient = getSupabaseClientOrThrow();
      const { error } = await supabaseClient.auth.signInWithPassword(payload);
      if (error) {
        const authError = getSupabaseAuthError(error);
        setError(authError);
        throw new Error(authError.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (payload: SignUpPayload) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseClient = getSupabaseClientOrThrow();
      const { error } = await supabaseClient.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          data: {
            full_name: payload.fullName ?? "",
          },
        },
      });

      if (error) {
        setError(getSupabaseAuthError(error));
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    try {
      const supabaseClient = getSupabaseClientOrThrow();
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        setError(getSupabaseAuthError(error));
        return;
      }
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    setLoading(true);
    setError(null);

    try {
      const supabaseClient = getSupabaseClientOrThrow();
      const { data: { session: refreshedSession }, error } = await supabaseClient.auth.refreshSession();
      if (error) {
        setError(getSupabaseAuthError(error));
        return;
      }

      const nextSession: SessionData | null = refreshedSession
        ? {
            access_token: refreshedSession.access_token,
            refresh_token: refreshedSession.refresh_token,
            expires_at: refreshedSession.expires_at ?? null,
            user: mapSupabaseUser(refreshedSession.user as never),
          }
        : null;

      setSession(nextSession);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async (): Promise<AuthUser | null> => {
    try {
      const supabaseClient = getSupabaseClientOrThrow();
      const { data: { user: currentUser }, error } = await supabaseClient.auth.getUser();
      if (error) {
        setError(getSupabaseAuthError(error));
        return null;
      }

      const mappedUser = mapSupabaseUser(currentUser as never);
      setUser(mappedUser);
      return mappedUser;
    } catch (caughtError) {
      setError(getSupabaseAuthError(caughtError));
      return null;
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      isAuthenticated,
      isLoading: isLoading || !hydrated,
      error,
      signIn,
      signUp,
      signOut,
      refreshSession,
      getCurrentUser,
    }),
    [error, hydrated, isAuthenticated, isLoading, session, setError, setLoading, setSession, setUser, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
