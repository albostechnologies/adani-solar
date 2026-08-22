"use client";

import Image from "next/image";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollReveal } from "@/components/ScrollReveal";

interface FacilityVideoSectionProps {
  title: string;
  subtitle: string;
  poster: string;
  youtubeUrl: string;
}

export function FacilityVideoSection({
  title,
  subtitle,
  poster,
  youtubeUrl,
}: FacilityVideoSectionProps) {
  return (
    <ScrollReveal>
      <section className="py-16 sm:py-20 lg:py-24 bg-solar-dark relative grain-overlay">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title={title} subtitle={subtitle} variant="dark" />

          <div className="mt-8 sm:mt-10 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-solar-dark-secondary">
            <Image
              src={poster}
              alt="Adani Solar Mundra manufacturing facility"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
            <div className="absolute inset-0 bg-solar-dark/35" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-green-light"
                aria-label="Watch facility videos on YouTube"
              >
                <Play className="h-7 w-7 sm:h-8 sm:w-8 fill-white ml-1" />
              </a>
              <p className="text-sm text-white/75 text-center max-w-md">
                Watch manufacturing highlights on the official Adani Group YouTube channel.
              </p>
              <Button
                asChild
                variant="outlineOnDark"
              >
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
