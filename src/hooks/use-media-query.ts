"use client";

import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

export const useIsMobile = (): boolean => {
  return useMediaQuery("(max-width: 1023px)");
};

export const useIsTablet = (): boolean => {
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
};
