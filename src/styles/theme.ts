import { colors, colorPalette } from "./colors";
import { shadows, shadowClasses } from "./shadows";
import { layoutSpacing, spacing } from "./spacing";
import { typography, typographyClasses } from "./typography";

export const theme = {
  colors,
  colorPalette,
  typography,
  typographyClasses,
  spacing,
  layoutSpacing,
  shadows,
  shadowClasses,
  borderRadius: {
    sm: "calc(var(--radius) - 4px)",
    md: "calc(var(--radius) - 2px)",
    lg: "var(--radius)",
    xl: "calc(var(--radius) + 4px)",
    "2xl": "calc(var(--radius) + 8px)",
    full: "9999px",
  },
} as const;

export type Theme = typeof theme;
