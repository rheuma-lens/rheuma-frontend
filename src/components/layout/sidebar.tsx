"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNavItems, secondaryNavItems } from "@/components/navigation/nav-items";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();
  const { isCollapsed } = useSidebarStore();

  const renderNavItem = (item: (typeof mainNavItems)[number]) => {
    const isActive = pathname === item.href;
    const Icon = item.icon;

    const linkContent = (
      <Link
        href={item.disabled ? "#" : item.href}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={item.disabled}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          item.disabled && "pointer-events-none opacity-50",
          isCollapsed && "justify-center px-2",
        )}
        onClick={(e) => item.disabled && e.preventDefault()}
      >
        <Icon className="size-5 shrink-0" aria-hidden="true" />
        {!isCollapsed && <span>{item.title}</span>}
      </Link>
    );

    if (isCollapsed) {
      return (
        <Tooltip key={item.href}>
          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
          <TooltipContent side="right">{item.title}</TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.href}>{linkContent}</div>;
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-full flex-col border-r bg-card",
          isCollapsed ? "w-16" : "w-64",
          "transition-[width] duration-300 ease-in-out",
          className,
        )}
        aria-label="Main navigation"
      >
        <div
          className={cn(
            "flex h-16 items-center border-b px-4",
            isCollapsed && "justify-center px-2",
          )}
        >
          {!isCollapsed ? (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">RL</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                RheumaLens
              </span>
            </Link>
          ) : (
            <Link
              href="/"
              className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              aria-label="RheumaLens home"
            >
              <span className="text-sm font-bold">RL</span>
            </Link>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Primary">
          {mainNavItems.map(renderNavItem)}
        </nav>

        <div className="border-t p-3">
          <nav aria-label="Secondary">{secondaryNavItems.map(renderNavItem)}</nav>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export const SidebarToggle = () => {
  const { isCollapsed, toggleCollapsed } = useSidebarStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleCollapsed}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-expanded={!isCollapsed}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
    </Button>
  );
};
