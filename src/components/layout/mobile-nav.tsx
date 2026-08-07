"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  mainNavItems,
  secondaryNavItems,
} from "@/components/navigation/nav-items";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";

export const MobileNav = () => {
  const pathname = usePathname();
  const { isOpen, setOpen, isMobile } = useSidebarStore();

  if (!isMobile) return null;

  const allItems = [...mainNavItems, ...secondaryNavItems];

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle>
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">RL</span>
              </div>
              <span className="text-lg font-semibold">RheumaLens</span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="space-y-1 p-4" aria-label="Mobile navigation">
          {allItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.disabled ? "#" : item.href}
                aria-current={isActive ? "page" : undefined}
                aria-disabled={item.disabled}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  item.disabled && "pointer-events-none opacity-50",
                )}
                onClick={(e) => {
                  if (item.disabled) {
                    e.preventDefault();
                    return;
                  }
                  setOpen(false);
                }}
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
