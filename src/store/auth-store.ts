import { create } from "zustand";

import type { AuthState, AuthUser, SessionData, SupabaseAuthError } from "@/types/auth";

interface AuthStoreState extends AuthState {
  setSession: (session: SessionData | null) => void;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: SupabaseAuthError | null) => void;
  reset: () => void;
}

const initialState: AuthState = {
  session: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  ...initialState,
  setSession: (session) =>
    set((state) => ({
      ...state,
      session,
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.user),
    })),
  setUser: (user) =>
    set((state) => ({
      ...state,
      user,
      isAuthenticated: Boolean(user),
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
