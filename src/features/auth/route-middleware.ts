import { redirect } from "next/navigation";

import { getSupabaseServerClient } from "@/lib/supabase/server";

export const authRouteMiddleware = async <T>(
  callback: (userId: string | null) => Promise<T>,
  options?: { requireAuth?: boolean; redirectTo?: string },
): Promise<T> => {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthenticated = Boolean(user);
  const requireAuth = options?.requireAuth ?? true;

  if (requireAuth && !isAuthenticated) {
    redirect(options?.redirectTo ?? "/login");
  }

  return callback(user?.id ?? null);
};
