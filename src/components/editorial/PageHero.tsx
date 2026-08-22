"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionEyebrow } from "@/components/editorial/SectionEyebrow";
import { EditorialHeading } from "@/components/editorial/EditorialHeading";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/editorial/Breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  eyebrowNumber?: string;
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  image?: string;
  imageAlt?: string;
  variant?: "dark" | "light" | "legal";
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  eyebrowNumber = "01",
  title,
  subtitle,
  breadcrumbs,
  backgroundImage,
  image,
  imageAlt,
  variant = "dark",
  className,
  children,
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const isLegal = variant === "legal";
  const isLight = variant === "light";

  return (
    <section
      className={cn(
        "relative overflow-hidden pt-28 sm:pt-32 pb-14 sm:pb-20",
        isLegal && "bg-[#f7f7f5] editorial-divider border-b",
        isLight && "bg-white editorial-divider border-b",
        !isLegal && !isLight && "bg-solar-dark text-white min-h-[52vh] flex items-end",
        className
      )}
    >
      {backgroundImage && !isLegal && (
        <>
          <Image src={backgroundImage} alt="" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-solar-dark via-solar-dark/88 to-solar-dark/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-solar-dark/80 via-transparent to-solar-dark/30" />
        </>
      )}

      <div className="editorial-section-inner relative z-10 w-full">
        {breadcrumbs && (
          <Breadcrumbs items={breadcrumbs} variant={isLight || isLegal ? "light" : "dark"} />
        )}

        <div className={cn("grid gap-10 lg:gap-16 items-end", image ? "lg:grid-cols-2" : "grid-cols-1")}>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn("max-w-3xl", isLegal && "max-w-2xl")}
          >
            <SectionEyebrow
              number={eyebrowNumber}
              label={eyebrow}
              variant={isLight || isLegal ? "light" : "dark"}
              className="mb-5 sm:mb-6"
            />
            <EditorialHeading
              as="h1"
              size={isLegal ? "statement" : "hero"}
              variant={isLight || isLegal ? "light" : "dark"}
              className="mb-4 sm:mb-5"
            >
              {title}
            </EditorialHeading>
            {subtitle && (
              <p
                className={cn(
                  "editorial-body max-w-2xl",
                  isLight || isLegal ? "text-muted-foreground" : "text-white/75"
                )}
              >
                {subtitle}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </motion.div>

          {image && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] lg:aspect-[5/6] rounded-2xl overflow-hidden bg-white/5"
            >
              <Image
                src={image}
                alt={imageAlt ?? title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
