'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

/**
 * Error boundary component for graceful error handling.
 * Catches errors during data fetching and renders a user-friendly recovery interface.
 * Uses Framer Motion spring physics for smooth, natural animations.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error tracking service
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-zinc-950 relative overflow-hidden">
      {/* Animated background layers */}
      <div className="fixed inset-0 z-0">
        <div className="mesh-bg" />
        <div className="grid-overlay" />
      </div>

      {/* Error Card with Framer Motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="glass-panel card-mesh relative z-10 rounded-3xl p-8 lg:p-12 max-w-md w-full border border-white/5 shadow-2xl"
      >
        <div className="grain-overlay" />

        {/* Animated Error Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/15 to-red-500/5 border border-red-500/30 flex items-center justify-center shadow-lg shadow-red-500/10"
          >
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </motion.div>
        </motion.div>

        {/* Error Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center space-y-4 relative z-10"
        >
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Oops! Something went wrong
          </h1>

          <p className="text-sm text-zinc-400 leading-relaxed">
            We encountered an error while loading your dashboard. This might be a temporary issue with the database connection, server, or invalid environment variables.
          </p>

          {/* Error Details */}
          {error.message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 text-left overflow-hidden"
            >
              <p className="text-xs font-mono text-red-400/80 break-words">
                Error: {error.message}
              </p>
            </motion.div>
          )}

          {/* Troubleshooting Tips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-xs text-zinc-500 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-left space-y-1"
          >
            <p className="font-semibold text-zinc-400">Quick fixes:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>Check your Supabase URL in <code className="text-cyan-400">.env.local</code></li>
              <li>Verify your anon key is correct</li>
              <li>Ensure the courses table was created via SQL</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-3 pt-4"
          >
            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => reset()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-500/20 transition-shadow cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </motion.button>

            {/* Home Button */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/"
              className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Back to Dashboard
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
