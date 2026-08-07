export const APP_NAME = "RheumaLens";

export const APP_DESCRIPTION =
  "AI-powered diagnostic co-pilot for rural rheumatology care";

export const APP_VERSION = "0.1.0";

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const SIDEBAR = {
  WIDTH: 256,
  COLLAPSED_WIDTH: 64,
  MOBILE_BREAKPOINT: BREAKPOINTS.lg,
} as const;

export const QUERY_KEYS = {
  patients: "patients",
  scans: "scans",
  uploads: "uploads",
  dashboard: "dashboard",
} as const;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/dicom",
] as const;

export const UPLOAD_BUCKET = "uploads";

export const MAX_UPLOAD_SIZE_MB = 50;
