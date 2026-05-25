'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp } from 'lucide-react';

export default function ActivityTile() {
  // Generate mock activity data: 24 columns, 7 rows (days of week)
  const cols = 26;
  const rows = 7;
  
  // Custom activity values (0 to 4) to color-code
  const getActivityLevel = (c: number, r: number) => {
    // Deterministic random-like patterns for visual interest
    const val = (c * 3 + r * 5) % 7;
    if (val === 0) return 0;
    if (val <= 2) return 1;
    if (val <= 4) return 2;
    if (val <= 5) return 3;
    return 4;
  };

  const getLevelClass = (level: number) => {
    switch (level) {
      case 0: return 'bg-zinc-900 border border-white/5';
      case 1: return 'bg-violet-950/40 border border-violet-900/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]';
      case 2: return 'bg-violet-800/40 border border-violet-700/30';
      case 3: return 'bg-violet-600/60 border border-violet-500/30 shadow-[0_0_8px_rgba(139,92,246,0.15)]';
      case 4: return 'bg-gradient-to-br from-cyan-400 to-violet-500 border border-cyan-400/20 shadow-[0_0_12px_rgba(6,182,212,0.3)]';
      default: return 'bg-zinc-900';
    }
  };

  const [hoveredSquare, setHoveredSquare] = useState<{ col: number; row: number; level: number } | null>(null);

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-panel card-mesh relative overflow-hidden rounded-3xl p-6 shadow-2xl col-span-1 md:col-span-2 lg:col-span-2 border border-white/5 flex flex-col justify-between"
    >
      <div className="grain-overlay" />
      <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-cyan-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/10">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Learning Consistency</h2>
            <p className="text-xs text-zinc-500">Activity index across key subjects</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span>+24% vs last month</span>
        </div>
      </div>

      {/* Graph Area */}
      <div className="relative flex-1 flex flex-col justify-center py-2 relative z-10">
        <div className="flex gap-1 bg-zinc-950/30 p-4 rounded-2xl border border-white/[0.03] overflow-x-auto select-none no-scrollbar">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <div key={cIdx} className="flex flex-col gap-1 shrink-0">
              {Array.from({ length: rows }).map((_, rIdx) => {
                const level = getActivityLevel(cIdx, rIdx);
                const isActive = hoveredSquare?.col === cIdx && hoveredSquare?.row === rIdx;
                
                return (
                  <motion.div
                    key={rIdx}
                    onHoverStart={() => setHoveredSquare({ col: cIdx, row: rIdx, level })}
                    onHoverEnd={() => setHoveredSquare(null)}
                    whileHover={{ scale: 1.25, zIndex: 30 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-[3px] cursor-pointer transition-colors duration-150 relative ${getLevelClass(level)}`}
                  >
                    {isActive && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 border border-white/10 rounded-md text-[10px] text-white font-medium whitespace-nowrap shadow-2xl pointer-events-none z-50">
                        {level === 0 ? 'No activity' : `${level * 45} mins learning`}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-[10px] text-zinc-500">
          <span>Mon • Wed • Fri</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-[2px] bg-zinc-900 border border-white/5" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-violet-950/40 border border-violet-900/20" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-violet-800/40 border border-violet-700/30" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-violet-600/60 border border-violet-500/30" />
            <div className="w-2.5 h-2.5 rounded-[2px] bg-gradient-to-br from-cyan-400 to-violet-500" />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/5 relative z-10">
        <div>
          <div className="text-[10px] text-zinc-500 font-medium">Weekly Target</div>
          <div className="text-sm font-bold text-white mt-0.5">18h / 20h</div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-500 font-medium">Active Days</div>
          <div className="text-sm font-bold text-cyan-400 mt-0.5">22 / 30</div>
        </div>
        <div>
          <div className="text-[10px] text-zinc-500 font-medium">Rank Percentile</div>
          <div className="text-sm font-bold text-violet-400 mt-0.5">Top 3.2%</div>
        </div>
      </div>
    </motion.article>
  );
}
