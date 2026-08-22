"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageSkeletonProps {
  variant?: "home" | "page";
  /** Whether the skeleton is currently visible */
  visible?: boolean;
}

/**
 * Enhanced page loading skeleton with shimmer CSS classes.
 * Shows briefly during route transitions (200-300ms).
 * Uses the skeleton-* CSS classes from globals.css for shimmer animations.
 * `variant="home"` matches the home page layout: hero + stats + content cards.
 * `variant="page"` shows a slimmer article-style skeleton.
 */
export function PageSkeleton({ variant = "page", visible = true }: PageSkeletonProps) {
  if (!visible) return null;

  if (variant === "home") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {/* Hero skeleton */}
          <div className="relative bg-solar-dark min-h-[60vh] flex items-center justify-center py-20">
            <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
              <div className="skeleton-heading h-12 sm:h-16 w-3/4 mx-auto bg-white/15" />
              <div className="skeleton-line h-12 sm:h-16 w-1/2 mx-auto bg-white/15" />
              <div className="skeleton-line h-5 w-2/3 mx-auto bg-white/10" />
              <div className="skeleton-line h-5 w-1/2 mx-auto bg-white/10" />
              <div className="flex gap-4 justify-center pt-4">
                <div className="skeleton-card h-12 w-40 rounded-lg bg-white/15" style={{ height: 48 }} />
                <div className="skeleton-card h-12 w-40 rounded-lg bg-white/10" style={{ height: 48 }} />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="bg-solar-dark-secondary py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="skeleton-heading h-10 w-24 mx-auto bg-white/15" />
                  <div className="skeleton-line w-20 mx-auto bg-white/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Savings banner skeleton */}
          <div className="bg-solar-green/20 py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-3">
                <div className="skeleton-heading h-10 w-3/4 bg-white/20" />
                <div className="skeleton-line w-full bg-white/15" />
                <div className="skeleton-line w-2/3 bg-white/15" />
              </div>
              <div className="skeleton-card rounded-2xl bg-white/10" />
            </div>
          </div>

          {/* Image + text section */}
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-3">
                <div className="skeleton-heading h-8 w-3/4" />
                <div className="skeleton-line w-full" />
                <div className="skeleton-line w-full" />
                <div className="skeleton-line w-5/6" />
                <div className="skeleton-card h-12 w-40 rounded-lg" style={{ height: 48 }} />
              </div>
              <div className="skeleton-card aspect-[4/3] w-full rounded-2xl" />
            </div>
          </div>

          {/* Card grid */}
          <div className="py-16 bg-solar-green/5">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center space-y-3 mb-10">
                <div className="skeleton-heading h-8 w-1/2 mx-auto" />
                <div className="skeleton-line w-1/3 mx-auto" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton-card w-full" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="min-h-screen"
      >
        {/* Hero */}
        <div className="relative bg-solar-dark min-h-[40vh] flex items-center justify-center py-20">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
            <div className="skeleton-heading h-12 w-2/3 mx-auto bg-white/15" />
            <div className="skeleton-line w-3/4 mx-auto bg-white/10" />
            <div className="skeleton-line w-1/2 mx-auto bg-white/10" />
          </div>
        </div>

        {/* Article skeleton */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 space-y-4">
            <div className="skeleton-heading h-8 w-1/2" />
            <div className="skeleton-line w-full" />
            <div className="skeleton-line w-full" />
            <div className="skeleton-line w-5/6" />
            <div className="skeleton-line w-full" />
            <div className="skeleton-line w-2/3" />
            <div className="skeleton-line w-full" />
            <div className="skeleton-line w-4/5" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
