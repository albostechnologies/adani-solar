"use client";

import React, { useState } from "react";
import { useRouter, type RouteName } from "@/lib/router";
import { footerNavGroups, footerSingleLinks, footerLegalLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Linkedin, Youtube, Facebook, Twitter, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNavClick = (route: RouteName, section?: string) => {
    navigate(route, section);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate subscription success
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-solar-dark text-white">
      {/* Green top border */}
      <div className="h-1 bg-gradient-to-r from-solar-green via-solar-green-light to-solar-green" />

      {/* Newsletter Promo Banner */}
      <div className="bg-gradient-to-br from-solar-green/15 via-solar-dark to-solar-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-solar-green-light" />
                <span className="text-xs uppercase tracking-wider text-solar-green-light font-semibold">
                  Solar Insights Newsletter
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-bold mb-2">
                Get industry trends, product updates & technical briefings
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Product updates, manufacturing insights, and technical briefings from Adani Solar.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto lg:min-w-[420px]">
              <div className="flex flex-col gap-2">
                <div className="relative w-full">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    aria-label="Email address for newsletter"
                    aria-invalid={!!error}
                    className="h-11 w-full bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm rounded-lg focus:border-solar-green focus:ring-solar-green/30 input-glow"
                  />
                </div>
                <Button
                  type="submit"
                  className="btn-premium text-white rounded-lg h-11 px-6 text-sm font-semibold shadow-md transition-all w-full sm:w-auto"
                >
                  {subscribed ? "✓ Subscribed!" : "Subscribe"}
                  {!subscribed && <ArrowRight className="w-4 h-4 ml-1.5" />}
                </Button>
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-400" role="alert">{error}</p>
              )}
              {subscribed && (
                <p className="mt-2 text-xs text-solar-green-light flex items-center gap-1.5" role="status">
                  <span className="w-1.5 h-1.5 rounded-full bg-solar-green-light live-dot" />
                  Welcome aboard! Check your inbox to confirm.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* 4-column grid with equal widths */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-10">
          {footerNavGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-solar-green-light mb-4 uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => item.route && handleNavClick(item.route, item.section)}
                      className="text-sm text-white/80 hover:text-solar-green-light transition-colors duration-200 animated-underline"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mb-8">
          {/* Single links row */}
          <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
            {footerSingleLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => link.route && handleNavClick(link.route, link.section)}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
            {footerLegalLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => link.route && handleNavClick(link.route, link.section)}
                className="text-sm text-white/60 hover:text-solar-green-light transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Social + Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/70 hover:bg-solar-green hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/70 hover:bg-solar-green hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/70 hover:bg-solar-green hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/70 hover:bg-solar-green hover:text-white hover:scale-110 transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-white/50 text-center lg:text-right">
              © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
