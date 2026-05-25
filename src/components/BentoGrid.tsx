'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { DatabaseBackup } from 'lucide-react';
import { Course } from '@/lib/types';
import HeroTile from './HeroTile';
import ActivityTile from './ActivityTile';
import CourseTile from './CourseTile';
import CourseModal from './CourseModal';

interface BentoGridProps {
  courses: Course[];
  isFallback: boolean;
  error: string | null;
}

// Framer Motion staggered transition variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

export default function BentoGrid({ courses, isFallback, error }: BentoGridProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="space-y-6">
      {/* Dynamic Warning Banner for Fallback/Missing Environment variables */}
      {isFallback && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative overflow-hidden bg-amber-500/10 border border-amber-500/20 text-amber-300 px-5 py-4 rounded-2xl flex items-start md:items-center gap-3.5 shadow-lg shadow-amber-500/5 select-none"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-xl pointer-events-none" />
          <DatabaseBackup className="w-5 h-5 shrink-0 text-amber-400 mt-0.5 md:mt-0" />
          <div className="flex-1 text-xs md:text-sm">
            <span className="font-bold text-white mr-1.5">Offline Demo Mode:</span>
            {error || 'Database connection is showing seed courses.'}
            <span className="block md:inline md:ml-1 text-amber-400/80 font-medium">
              (Dashboard interactive. Enter Supabase env vars to connect to live DB).
            </span>
          </div>
        </motion.div>
      )}

      {/* Bento Grid */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Row 1: Hero greeting + streak (Spans 3 cols on desktop, 2 on tablet, 1 on mobile) */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3">
          <HeroTile />
        </motion.div>

        {/* Row 2, Left: Activity Graph (Spans 2 cols on desktop/tablet, 1 on mobile) */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2">
          <ActivityTile />
        </motion.div>

        {/* Remaining slots filled by dynamic course cards */}
        {courses.map((course) => (
          <motion.div 
            key={course.id} 
            variants={itemVariants}
            className="col-span-1"
            onClick={() => setSelectedCourse(course)}
          >
            <CourseTile course={course} />
          </motion.div>
        ))}
      </motion.main>

      {/* Course Detail Modal */}
      <CourseModal 
        course={selectedCourse} 
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}
