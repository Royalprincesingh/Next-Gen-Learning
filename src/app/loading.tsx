'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import SkeletonTile from '@/components/SkeletonTile';

/**
 * Loading skeleton component displayed during Supabase data fetching.
 * Uses Framer Motion for subtle pulsing animations without layout shifts.
 * 
 * Animation Strategy:
 * - Staggered entrance with spring physics
 * - Pulsing skeleton placeholders (opacity only, no transform)
 * - Loading message with animated dots
 * - Matches final layout dimensions to prevent CLS
 */
export default function Loading() {
  // Staggered animation for skeleton tiles
  const skeletonVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  // Pulsing animation (opacity only, no layout shift)
  const pulseVariants = {
    pulse: {
      opacity: [0.4, 0.6, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  };

  return (
    <div className="flex min-h-screen relative select-none">
      {/* Navigation Sidebar */}
      <Sidebar activeTab="dashboard" setActiveTab={() => {}} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-white/5 px-6 lg:px-8 flex items-center justify-between bg-zinc-950/60 sticky top-0 z-10">
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="w-full max-w-md h-10 bg-zinc-900/50 border border-white/5 rounded-xl"
          />
          <div className="flex items-center gap-4 ml-4">
            <motion.div
              variants={pulseVariants}
              animate="pulse"
              className="w-10 h-10 bg-zinc-900/50 border border-white/5 rounded-xl"
            />
            <motion.div
              variants={pulseVariants}
              animate="pulse"
              className="w-24 h-10 bg-zinc-900/50 border border-white/5 rounded-xl hidden sm:block"
            />
          </div>
        </header>

        {/* Dashboard Grid Content Container */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {/* Hero Tile Skeleton (spans full width) */}
            <motion.div 
              variants={skeletonVariants}
              className="col-span-1 md:col-span-2 lg:col-span-3"
            >
              <div className="glass-panel card-mesh relative overflow-hidden rounded-3xl p-6 lg:p-8 min-h-[220px] border border-white/5">
                <motion.div animate="pulse" variants={pulseVariants} className="space-y-4">
                  <div className="w-40 h-5 bg-zinc-800 rounded-full" />
                  <div className="w-80 h-10 bg-zinc-800 rounded-md" />
                  <div className="w-96 h-4 bg-zinc-800 rounded-md" />
                  <div className="pt-6 grid grid-cols-7 gap-2 max-w-sm">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="h-6 bg-zinc-800/50 rounded-md" />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Activity Tile Skeleton */}
            <motion.div 
              variants={skeletonVariants}
              className="col-span-1 md:col-span-2 lg:col-span-2"
            >
              <div className="glass-panel card-mesh relative overflow-hidden rounded-3xl p-6 min-h-[220px] border border-white/5">
                <motion.div animate="pulse" variants={pulseVariants} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-zinc-800 rounded-md" />
                      <div className="w-24 h-3 bg-zinc-800/60 rounded-md" />
                    </div>
                    <div className="w-20 h-6 bg-zinc-800 rounded-md" />
                  </div>
                  <div className="h-20 bg-zinc-900/50 rounded-2xl" />
                  <div className="flex justify-between">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="w-16 h-3 bg-zinc-800/60 rounded-md" />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Course Cards Skeletons Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-1"
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={i} variants={skeletonVariants}>
                  <SkeletonTile />
                </motion.div>
              ))}
            </motion.div>

            {/* Loading Status Message */}
            <motion.div
              variants={skeletonVariants}
              className="text-center mt-8 pt-8 border-t border-white/5"
            >
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block w-2 h-2 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full"
                />
                <span className="text-sm text-zinc-500 font-medium">
                  Fetching live data from Supabase...
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
