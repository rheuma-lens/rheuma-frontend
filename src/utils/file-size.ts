const UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

export const formatFileSize = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return "0 B";
  if (bytes < 0) return "—";

  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const unit = UNITS[Math.min(i, UNITS.length - 1)];
  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(decimals)} ${unit}`;
};

export const parseFileSize = (sizeString: string): number | null => {
  const match = sizeString.trim().match(/^([\d.]+)\s*(B|KB|MB|GB|TB)$/i);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase() as (typeof UNITS)[number];
  const index = UNITS.indexOf(unit);

  if (index === -1 || Number.isNaN(value)) return null;
  return value * Math.pow(1024, index);
};
