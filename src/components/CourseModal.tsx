'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, BookOpen } from 'lucide-react';
import { Course } from '@/lib/types';
import * as Icons from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CourseModal({ course, isOpen, onClose }: CourseModalProps) {
  if (!course) return null;

  // Dynamic Lucide icon renderer
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-12 h-12 text-cyan-400" />;
    }
    return <BookOpen className="w-12 h-12 text-cyan-400" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                  {renderIcon(course.icon_name)}
                </div>
              </div>

              {/* Course Title */}
              <h2 className="text-2xl font-bold text-white text-center mb-4">
                {course.title}
              </h2>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Progress</span>
                  <span className="text-lg font-bold text-cyan-400">{course.progress}%</span>
                </div>
                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                    className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 shadow-lg"
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Lessons</div>
                  <div className="text-xl font-bold text-cyan-400">{Math.ceil(course.progress / 10) + 2}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <div className="text-xs text-zinc-400 mb-1">Duration</div>
                  <div className="text-xl font-bold text-violet-400">{course.progress + 10}h</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <Play className="w-4 h-4" />
                  Continue Learning
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full bg-white/10 text-white font-semibold py-3 rounded-xl border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Close
                </motion.button>
              </div>

              {/* Course Info */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-zinc-500 text-center">
                  Started {new Date(course.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
