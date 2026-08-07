"use client";

import { useEffect } from "react";

import { useIsMobile } from "@/hooks/use-media-query";
import { useSidebarStore } from "@/store/sidebar-store";

export const useSidebar = () => {
  const isMobile = useIsMobile();
  const { isOpen, isCollapsed, setMobile, setOpen } = useSidebarStore();

  useEffect(() => {
    setMobile(isMobile);
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile, setMobile, setOpen]);

  return {
    isOpen,
    isCollapsed,
    isMobile,
  };
};
