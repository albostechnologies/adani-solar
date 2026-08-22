"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashTarget(): boolean {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return false;

  requestAnimationFrame(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  });
  return true;
}

export function RouteScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = () => {
      if (!scrollToHashTarget()) {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };

    handleRouteChange();
    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, [pathname]);

  return null;
}
