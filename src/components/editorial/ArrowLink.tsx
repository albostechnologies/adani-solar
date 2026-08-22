"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, type RouteName } from "@/lib/router";

interface ArrowLinkProps {
  children: React.ReactNode;
  route?: RouteName;
  section?: string;
  href?: string;
  variant?: "primary" | "secondary" | "inline";
  className?: string;
  onClick?: () => void;
}

export function ArrowLink({
  children,
  route,
  section,
  href,
  variant = "secondary",
  className,
  onClick,
}: ArrowLinkProps) {
  const { navigate } = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (route) navigate(route, section);
  };

  const classes = cn(
    "group inline-flex items-center gap-2 font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-solar-green focus-visible:ring-offset-2",
    variant === "primary" &&
      "editorial-btn-primary rounded-full px-6 py-3 text-sm sm:text-base",
    variant === "secondary" &&
      "text-sm sm:text-base hover:text-solar-green",
    variant === "inline" && "text-sm underline-offset-4 hover:underline",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          variant === "primary" && "h-[1.1em] w-[1.1em]"
        )}
        aria-hidden="true"
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={classes}>
      {content}
    </button>
  );
}
