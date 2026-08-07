"use client";

import { Bell, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { NotificationArea } from "@/components/layout/notification-area";
import { SidebarToggle } from "@/components/layout/sidebar";
import { UserMenu } from "@/components/layout/user-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

interface TopNavProps {
  className?: string;
}

export const TopNav = ({ className }: TopNavProps) => {
  const { theme, setTheme } = useTheme();
  const { toggle, isMobile } = useSidebarStore();

  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 lg:px-6",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Open navigation menu"
            aria-expanded={false}
          >
            <Menu className="size-5" />
          </Button>
        )}
        {!isMobile && <SidebarToggle />}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <NotificationArea>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-5" />
          </Button>
        </NotificationArea>

        <UserMenu />
      </div>
    </header>
  );
};
