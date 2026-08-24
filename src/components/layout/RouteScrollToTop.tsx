"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashTarget(): boolean {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return false;

  const tryScroll = () => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return true;
    }
    return false;
  };

  requestAnimationFrame(() => {
    if (!tryScroll()) {
      // Content may mount after client navigation
      setTimeout(tryScroll, 120);
      setTimeout(tryScroll, 400);
    }
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
