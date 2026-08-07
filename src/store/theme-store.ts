import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "system",
      setMode: (mode) => set({ mode }),
      toggleMode: () => {
        const nextMode = get().mode === "dark" ? "light" : "dark";
        set({ mode: nextMode });
      },
    }),
    {
      name: "rheuma-theme",
    },
  ),
);
