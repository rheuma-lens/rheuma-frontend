"use client";

import { BreadcrumbArea } from "@/components/layout/breadcrumb-area";
import { MainContent } from "@/components/layout/main-content";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  useSidebar();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <MobileNav />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <BreadcrumbArea />
        <MainContent>
          <div className="p-4 lg:p-6">{children}</div>
        </MainContent>
      </div>
    </div>
  );
};

export const AppShellContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-7xl", className)}>{children}</div>
  );
};
