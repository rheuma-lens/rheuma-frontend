import { LoadingSpinner } from "@/components/common/loading-spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <LoadingSpinner label="Loading workspace" className="text-muted-foreground" />
    </div>
  );
}
