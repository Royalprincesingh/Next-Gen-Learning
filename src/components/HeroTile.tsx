'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Flame } from 'lucide-react';

export default function HeroTile() {
  const days = [
    { name: 'M', active: true },
    { name: 'T', active: true },
    { name: 'W', active: true },
    { name: 'T', active: true },
    { name: 'F', active: true },
    { name: 'S', active: false },
    { name: 'S', active: false },
  ];

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-panel card-mesh relative overflow-hidden rounded-3xl p-6 lg:p-8 flex flex-col justify-between min-h-[220px] shadow-2xl col-span-1 md:col-span-2 lg:col-span-3 border border-white/5"
    >
      {/* Decorative background grid and light */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-violet-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="grain-overlay" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        {/* User Greeting */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-400 mb-4">
            <Sparkles size={13} />
            <span>Beta Access • Next-Gen Learning</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400">Alex</span>
          </h1>
          <p className="mt-2.5 text-zinc-400 text-sm md:text-base max-w-md">
            You are on track to master Web3 & advanced Frontend concepts. Keep pushing your limits!
          </p>
        </div>

        {/* Learning Streak Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col justify-between shrink-0 md:w-72 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-500/15 text-orange-400">
                <Flame className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-xs text-zinc-400 font-medium">Daily Streak</div>
                <div className="text-xl font-bold text-white tracking-tight">12 Days</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                +150 XP
              </span>
            </div>
          </div>

          {/* Days Indicator row */}
          <div className="grid grid-cols-7 gap-2 mt-4">
            {days.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] text-zinc-500 font-medium">{day.name}</span>
                <motion.div
                  initial={day.active ? { scale: 0.8 } : {}}
                  animate={day.active ? { scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold transition-all duration-300
                    ${day.active 
                      ? 'bg-gradient-to-br from-orange-500 to-amber-400 text-black shadow-lg shadow-orange-500/20' 
                      : 'bg-zinc-800/80 border border-white/5 text-zinc-600'}`}
                >
                  {day.active ? '✓' : ''}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer message / Quick Stats */}
      <div className="mt-6 md:mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500 relative z-10">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-zinc-400" />
          <span>Next scheduled lesson: Tomorrow at 9:00 AM</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Weekly completion: <strong className="text-white font-semibold">85%</strong></span>
          <span>Rank: <strong className="text-cyan-400 font-semibold">Top 5%</strong></span>
        </div>
      </div>
    </motion.article>
  );
}
