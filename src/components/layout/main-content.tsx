import { cn } from "@/lib/utils";

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContent = ({ children, className }: MainContentProps) => {
  return (
    <main
      className={cn(
        "flex-1 overflow-y-auto overflow-x-hidden",
        className,
      )}
      id="main-content"
      tabIndex={-1}
    >
      {children}
    </main>
  );
};
