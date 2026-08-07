const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const DATETIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

export const formatDate = (date: string | Date): string => {
  const value = typeof date === "string" ? new Date(date) : date;
  return DATE_FORMATTER.format(value);
};

export const formatDateTime = (date: string | Date): string => {
  const value = typeof date === "string" ? new Date(date) : date;
  return DATETIME_FORMATTER.format(value);
};

export const formatTime = (date: string | Date): string => {
  const value = typeof date === "string" ? new Date(date) : date;
  return TIME_FORMATTER.format(value);
};

export const formatRelativeTime = (date: string | Date): string => {
  const value = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - value.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(value);
};

export const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && !Number.isNaN(date.getTime());
};
