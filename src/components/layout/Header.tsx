"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, Phone, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter, type RouteName } from "@/lib/router";
import { headerNavItems, type NavChild } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./MobileNav";
import { SearchModal } from "@/components/SearchModal";
import { ThemeToggle } from "@/components/ThemeToggle";

const OPEN_DELAY = 120;
const CLOSE_DELAY = 200;

export function Header() {
  const { currentRoute, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (openTimer.current) clearTimeout(openTimer.current);
      if (blurTimer.current) clearTimeout(blurTimer.current);
    };
  }, []);

  const handleNavClick = (route: RouteName, section?: string) => {
    navigate(route, section);
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  const handleItemEnter = (label: string, hasChildren: boolean) => {
    if (!hasChildren) return;
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setOpenDropdown(label), OPEN_DELAY);
  };

  const handleItemLeave = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), CLOSE_DELAY);
  };

  const handleTriggerClick = (label: string, route?: RouteName, section?: string) => {
    if (route) {
      handleNavClick(route, section);
    } else {
      setOpenDropdown(openDropdown === label ? null : label);
    }
  };

  const handleChildKeydown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    child: NavChild
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (child.route) handleNavClick(child.route, child.section);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border/50"
          : "bg-solar-dark/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 sm:gap-3 group"
            aria-label="Adani Solar - Go to homepage"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-solar-green flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="5" />
                <g stroke="currentColor" strokeWidth="2" fill="none">
                  <line x1="12" y1="1" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="23" />
                  <line x1="1" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                </g>
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-[family-name:var(--font-poppins)] text-lg sm:text-xl font-bold leading-tight transition-colors duration-300 ${
                  isScrolled ? "text-solar-dark" : "text-white"
                }`}
              >
                {siteConfig.company.name}
              </span>
              <span
                className={`text-[10px] sm:text-xs leading-tight transition-colors duration-300 hidden sm:block ${
                  isScrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                {siteConfig.company.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation with mega-menus */}
          <nav
            data-tour-id="tour-header-nav"
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {headerNavItems.map((item) => {
              const isOpen = openDropdown === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    handleItemEnter(item.label, !!item.children)
                  }
                  onMouseLeave={handleItemLeave}
                  onFocus={() =>
                    item.children && setOpenDropdown(item.label)
                  }
                >
                  <button
                    onClick={() =>
                      handleTriggerClick(item.label, item.route)
                    }
                    aria-expanded={item.children ? isOpen : undefined}
                    aria-haspopup={item.children ? "true" : undefined}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isScrolled
                        ? currentRoute === item.route
                          ? "text-solar-green bg-solar-green/10"
                          : "text-foreground hover:text-solar-green hover:bg-solar-green/5"
                        : currentRoute === item.route
                          ? "text-solar-green-light bg-white/10"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mega-menu Dropdown */}
                  <AnimatePresence>
                    {item.children && isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[560px] max-w-[calc(100vw-2rem)] rounded-xl shadow-xl border border-border bg-white overflow-hidden"
                        onMouseEnter={() => {
                          if (closeTimer.current) {
                            clearTimeout(closeTimer.current);
                            closeTimer.current = null;
                          }
                        }}
                        onMouseLeave={handleItemLeave}
                      >
                        <div className="grid grid-cols-[1fr_180px]">
                          {/* Items column */}
                          <div className="p-2">
                            {item.children.map((child) => {
                              const Icon = child.icon;
                              return (
                                <button
                                  key={child.label}
                                  onClick={() =>
                                    child.route &&
                                    handleNavClick(child.route, child.section)
                                  }
                                  onKeyDown={(e) =>
                                    handleChildKeydown(e, child)
                                  }
                                  className="w-full flex items-start gap-3 p-3 rounded-lg text-left hover:bg-solar-green/5 transition-colors duration-150 group"
                                >
                                  {Icon && (
                                    <div className="w-9 h-9 rounded-lg bg-solar-green/10 flex items-center justify-center shrink-0 group-hover:bg-solar-green/20 transition-colors">
                                      <Icon className="w-4 h-4 text-solar-green" />
                                    </div>
                                  )}
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground group-hover:text-solar-green transition-colors">
                                      {child.label}
                                    </p>
                                    {child.description && (
                                      <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Banner column */}
                          {item.banner && (
                            <div className="bg-gradient-to-br from-solar-dark to-solar-dark-secondary p-4 flex flex-col justify-between text-white">
                              <div
                                className="absolute inset-0 opacity-10 pointer-events-none bg-cover bg-center"
                                style={{
                                  backgroundImage:
                                    "url(/assets/home/hero-solar-facility.webp)",
                                }}
                                aria-hidden="true"
                              />
                              <div className="relative z-10">
                                <p className="text-xs uppercase tracking-wider text-solar-green-light mb-2">
                                  Featured
                                </p>
                                <p className="font-[family-name:var(--font-poppins)] text-sm font-semibold leading-tight mb-2">
                                  {item.banner.title}
                                </p>
                                <p className="text-xs text-white/70 leading-snug mb-4">
                                  {item.banner.subtitle}
                                </p>
                              </div>
                              {item.banner.route && (
                                <button
                                  onClick={() =>
                                    handleNavClick(item.banner!.route!)
                                  }
                                  className="relative z-10 text-xs font-semibold text-solar-green-light hover:text-white transition-colors w-fit"
                                >
                                  Learn more →
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right side: Search + CTAs + Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`hidden md:flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200 ${
                isScrolled
                  ? "text-muted-foreground hover:bg-solar-green/10 hover:text-solar-green"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Theme toggle */}
            <div className={`hidden md:flex ${isScrolled ? "" : "[&_button]:text-white/80 [&_button]:hover:bg-white/10"}`}>
              <ThemeToggle />
            </div>

            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="hidden xl:flex items-center gap-1.5 text-xs transition-colors duration-200"
              aria-label={`Call us at ${siteConfig.contact.phone}`}
            >
              <Phone className="w-3 h-3" />
              <span
                className={
                  isScrolled ? "text-muted-foreground" : "text-white/70"
                }
              >
                {siteConfig.contact.phone}
              </span>
            </a>

            {/* Secondary CTA - Download Brochure */}
            <Button
              variant="outline"
              className={`hidden md:flex rounded-lg px-3 sm:px-4 h-9 text-xs sm:text-sm font-medium transition-all duration-300 ${
                isScrolled
                  ? "border-solar-green/30 text-solar-green hover:bg-solar-green/5"
                  : "border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Brochure
            </Button>

            <Button
              onClick={() => handleNavClick("contact")}
              className="hidden sm:flex bg-solar-green hover:bg-solar-green-dark text-white rounded-lg px-4 sm:px-5 h-9 sm:h-10 text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Contact Us
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`lg:hidden transition-colors duration-200 ${
                    isScrolled ? "text-foreground" : "text-white"
                  }`}
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
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right duration-300">
                <SheetHeader className="p-4 border-b bg-solar-dark">
                  <SheetTitle className="text-white font-[family-name:var(--font-poppins)]">
                    {siteConfig.company.name}
                  </SheetTitle>
                </SheetHeader>
                <MobileNav
                  currentRoute={currentRoute}
                  onNavigate={handleNavClick}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
