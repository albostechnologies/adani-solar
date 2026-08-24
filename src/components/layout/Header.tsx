"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter, type RouteName } from "@/lib/router";
import { headerNavItems, LIGHT_HEADER_ROUTES } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

export function Header() {
  const { currentRoute, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const useSolidHeader =
    isScrolled || LIGHT_HEADER_ROUTES.includes(currentRoute);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentRoute]);

  const handleNavClick = (route: RouteName, section?: string) => {
    navigate(route, section);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        useSolidHeader
          ? "bg-white/95 backdrop-blur-xl border-b border-border/40 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="editorial-section-inner !py-0">
        <div className="flex items-center justify-between h-16 sm:h-[4.75rem]">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center group shrink-0"
            aria-label="Adani Solar - Go to homepage"
          >
            <Image
              src={siteConfig.brand.logo}
              alt={siteConfig.brand.logoAlt}
              width={220}
              height={44}
              className="h-9 sm:h-10 w-auto"
              priority
            />
          </button>

          <nav className="hidden lg:flex items-center gap-2" aria-label="Main navigation">
            {headerNavItems.map((item) => {
              const isActive =
                !item.section && currentRoute === item.route;
              const variant = item.variant ?? "link";

              if (variant === "button") {
                return (
                  <Button
                    key={item.label}
                    onClick={() => handleNavClick(item.route, item.section)}
                    className={cn(
                      "rounded-full px-5 h-10 text-sm font-semibold transition-all duration-300",
                      useSolidHeader
                        ? "bg-solar-dark hover:bg-solar-dark-secondary text-white"
                        : "bg-white text-solar-dark hover:bg-white/90"
                    )}
                  >
                    {item.label}
                  </Button>
                );
              }

              if (variant === "button-secondary") {
                return (
                  <Button
                    key={item.label}
                    variant={useSolidHeader ? "outline" : "outlineOnDark"}
                    onClick={() => handleNavClick(item.route, item.section)}
                    className={cn(
                      "rounded-full px-5 h-10 text-sm font-semibold",
                      useSolidHeader && "border-border hover:bg-muted"
                    )}
                  >
                    {item.label}
                  </Button>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.route, item.section)}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200",
                    useSolidHeader
                      ? isActive
                        ? "text-solar-green"
                        : "text-foreground/80 hover:text-foreground"
                      : isActive
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "transition-colors duration-200",
                    useSolidHeader ? "text-foreground" : "text-white"
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mobileOpen ? "close" : "menu"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  </AnimatePresence>
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-white">
                <SheetHeader className="p-5 border-b">
                  <SheetTitle className="font-[family-name:var(--font-poppins)] text-foreground">
                    {siteConfig.company.name}
                  </SheetTitle>
                </SheetHeader>
                <MobileNav currentRoute={currentRoute} onNavigate={handleNavClick} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
