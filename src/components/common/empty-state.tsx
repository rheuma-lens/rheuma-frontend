import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = Inbox,
  className,
}: EmptyStateProps) => {
  return (
    <Card className={cn("border-dashed", className)}>
      <CardContent className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Icon className="size-6" aria-hidden="true" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description ? (
          <CardDescription className="mt-2 max-w-sm">{description}</CardDescription>
        ) : null}
        {actionLabel && onAction ? (
          <Button className="mt-6" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};
