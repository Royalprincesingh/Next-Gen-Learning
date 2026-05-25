import React from 'react';

export default function SkeletonTile() {
  return (
    <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 min-h-[170px] flex flex-col justify-between select-none animate-pulse">
      {/* Icon Placeholder */}
      <div className="w-10 h-10 rounded-xl bg-zinc-800/80" />

      {/* Title Placeholder */}
      <div className="mt-5 space-y-2">
        <div className="h-4 bg-zinc-800/80 rounded-md w-3/4" />
        <div className="h-4 bg-zinc-800/80 rounded-md w-1/2" />
      </div>

      {/* Progress Bar Placeholder */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <div className="h-3 bg-zinc-800/60 rounded-md w-12" />
          <div className="h-3 bg-zinc-800/60 rounded-md w-8" />
        </div>
        <div className="h-2 bg-zinc-800/80 rounded-full w-full" />
      </div>
    </div>
  );
}
