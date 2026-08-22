"use client";

import React, { useEffect, useState } from "react";
import { useRouter as useNextRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ChatWidget } from "@/components/ChatWidget";
import { SiteTour } from "@/components/SiteTour";
import { RouteScrollToTop } from "@/components/layout/RouteScrollToTop";
import { LEGACY_HASH_PATH_MAP } from "@/lib/routes";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-40 right-4 sm:bottom-28 sm:right-6 z-40 w-10 h-10 rounded-full bg-solar-green hover:bg-solar-green-dark text-white shadow-lg shadow-solar-green/25 flex items-center justify-center transition-colors duration-300"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </motion.button>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const nextRouter = useNextRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && LEGACY_HASH_PATH_MAP[hash]) {
      nextRouter.replace(LEGACY_HASH_PATH_MAP[hash]);
      window.history.replaceState(null, "", LEGACY_HASH_PATH_MAP[hash]);
    }
  }, [nextRouter]);

  return (
    <>
      <RouteScrollToTop />
      <ScrollProgress />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-solar-green focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <Footer />
        <CookieConsent />
        <AnimatePresence>
          <BackToTop />
        </AnimatePresence>
        <ChatWidget />
        <SiteTour />
      </div>
    </>
  );
}
