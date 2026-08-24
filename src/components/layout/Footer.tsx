"use client";

import React from "react";
import { useRouter, type RouteName } from "@/lib/router";
import { footerNavGroups, footerLegalLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Linkedin, Youtube, Facebook, Twitter } from "lucide-react";
import { ArrowLink } from "@/components/editorial/ArrowLink";

export function Footer() {
  const { navigate } = useRouter();

  const handleNavClick = (route: RouteName, section?: string) => {
    navigate(route, section);
  };

  return (
    <footer className="bg-solar-dark text-white">
      <div className="border-b border-white/10 py-12 sm:py-14">
        <div className="editorial-section-inner">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-3">
                Get in touch
              </p>
              <p className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl font-semibold text-white max-w-md leading-snug">
                Let&apos;s build a cleaner energy future.
              </p>
            </div>
            <div className="lg:shrink-0">
              <ArrowLink route="contact" variant="primary" className="on-dark">
                Contact Us
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>

      <div className="editorial-section-inner py-12 sm:py-16">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-2">Adani Solar</p>
          <p className="text-sm text-white/60 max-w-md">{siteConfig.company.tagline}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">
          {footerNavGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs uppercase tracking-[0.16em] text-white/45 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => item.route && handleNavClick(item.route, item.section)}
                      className="text-sm text-white/75 hover:text-white transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="editorial-divider border-t border-white/10 pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {footerLegalLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => link.route && handleNavClick(link.route)}
                className="text-sm text-white/55 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-white/45">
          © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
