"use client";

import { AuthProvider as AuthProviderRoot } from "@/features/auth/provider";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProviderRoot>{children}</AuthProviderRoot>;
};
