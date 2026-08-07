export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number | null;
  token_type: string;
  user: AuthUser | null;
}

export interface SessionData {
  access_token: string | null;
  refresh_token: string | null;
  expires_at: number | null;
  user: AuthUser | null;
}

export interface SupabaseAuthError {
  message: string;
  status: number;
}

export interface AuthState {
  session: SessionData | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: SupabaseAuthError | null;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload extends SignInPayload {
  fullName?: string;
}

export interface AuthContextValue extends AuthState {
  signIn: (payload: SignInPayload) => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  getCurrentUser: () => Promise<AuthUser | null>;
}

export interface DatabaseUser {
  id: string;
  email: string | null;
  created_at: string;
  updated_at: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    role?: string;
  } | null;
}
