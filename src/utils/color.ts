import type { Severity } from "@/types";

export const severityColors: Record<Severity, string> = {
  none: "#94a3b8",
  mild: "#22c55e",
  moderate: "#f59e0b",
  severe: "#f97316",
  critical: "#ef4444",
};

export const getSeverityColor = (severity: Severity): string => {
  return severityColors[severity];
};

export const hexToRgba = (hex: string, alpha: number): string => {
  const sanitized = hex.replace("#", "");
  const r = parseInt(sanitized.substring(0, 2), 16);
  const g = parseInt(sanitized.substring(2, 4), 16);
  const b = parseInt(sanitized.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getContrastTextColor = (backgroundColor: string): string => {
  const sanitized = backgroundColor.replace("#", "");
  if (sanitized.length !== 6) return "#ffffff";

  const r = Number.parseInt(sanitized.slice(0, 2), 16);
  const g = Number.parseInt(sanitized.slice(2, 4), 16);
  const b = Number.parseInt(sanitized.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.6 ? "#111827" : "#ffffff";
};
