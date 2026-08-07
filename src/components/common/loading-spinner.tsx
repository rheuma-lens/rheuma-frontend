import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  label?: string;
}

export const LoadingSpinner = ({ className, label = "Loading" }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-2 text-sm text-muted-foreground", className)} role="status" aria-live="polite">
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
};
