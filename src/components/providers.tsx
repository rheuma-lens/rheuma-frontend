"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { AuthProvider } from "@/components/auth";
import { Toaster } from "@/components/ui/sonner";
import { useThemeStore, type ThemeMode } from "@/store/theme-store";

function ThemeSync({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const { mode, setMode } = useThemeStore();

  useEffect(() => {
    if (!theme) return;

    const resolvedTheme = theme === "dark" || theme === "light" ? theme : mode;
    if (resolvedTheme !== mode) {
      setMode(resolvedTheme as ThemeMode);
    }
  }, [mode, setMode, theme]);

  useEffect(() => {
    if (!theme || theme === mode) return;
    setTheme(mode);
  }, [mode, setTheme, theme]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: 1,
          },
        },
      }),
  );

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeSync>{children}</ThemeSync>
          <Toaster richColors closeButton />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
