'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Course } from '@/lib/types';

interface CourseTileProps {
  course: Course;
}

export default function CourseTile({ course }: CourseTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic Lucide icon renderer
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-cyan-400" />;
    }
    // Fallback icon
    return <Icons.BookOpen className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <motion.article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-panel card-mesh relative overflow-hidden rounded-3xl p-6 shadow-lg border border-white/5 flex flex-col justify-between min-h-[170px] select-none cursor-pointer"
    >
      {/* Dynamic gradient background glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-transparent to-cyan-500/10 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Border glow ring */}
      <motion.div
        className="absolute inset-0 border border-violet-500/20 rounded-3xl pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="grain-overlay" />

      {/* Card Content Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          {renderIcon(course.icon_name)}
        </div>
        <span className="text-[10px] font-bold text-zinc-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
          ACTIVE
        </span>
      </div>

      {/* Course Title */}
      <div className="relative z-10 mt-5">
        <h3 className="text-sm md:text-base font-bold text-white tracking-tight leading-snug line-clamp-2">
          {course.title}
        </h3>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 mt-5">
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-medium">
          <span>Progress</span>
          <span className="text-white font-semibold">{course.progress}%</span>
        </div>
        
        {/* Progress Bar Track */}
        <div className="h-2 w-full bg-zinc-900 border border-white/[0.03] rounded-full overflow-hidden">
          {/* Animated fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ 
              type: 'spring', 
              stiffness: 80, 
              damping: 15,
              delay: 0.3 // Stagger after grid entrance
            }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 shadow-[0_0_8px_rgba(139,92,246,0.3)]"
          />
        </div>
      </div>
    </motion.article>
  );
}
