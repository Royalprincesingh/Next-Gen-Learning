'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', name: 'My Courses', icon: BookOpen },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <motion.aside
        animate={{ 
          width: isCollapsed ? 80 : undefined 
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`hidden md:flex flex-col h-screen sticky top-0 bg-zinc-950/80 border-r border-white/5 backdrop-blur-xl z-20 text-zinc-400 select-none
          ${isCollapsed ? 'w-20' : 'w-20 lg:w-64'} transition-[width] duration-300`}
      >
        {/* Logo / Brand Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/5 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20">
              <GraduationCap size={22} className="shrink-0" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="font-bold text-white tracking-wide text-lg shrink-0 hidden lg:block"
                >
                  NeuraLrn
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center w-full h-12 rounded-xl transition-colors duration-200 focus:outline-none group px-3.5
                  ${isActive ? 'text-white font-medium' : 'hover:text-zinc-200'}`}
              >
                {/* Active Highlight Pill using layoutId */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_10px_rgba(139,92,246,0.1)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Left Active border line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabBorder"
                    className="absolute left-0 w-1 h-6 bg-gradient-to-y from-violet-500 to-cyan-400 rounded-r-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Icon Wrapper */}
                <div className={`relative z-10 flex items-center justify-center shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}>
                  <Icon size={20} className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-zinc-400 group-hover:text-zinc-200'}`} />
                </div>

                {/* Text Label */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 font-medium text-sm text-left truncate shrink-0 hidden lg:block relative z-10"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Tooltip for collapsed states */}
                {(isCollapsed || isActive) && (
                  <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-zinc-900 border border-white/10 text-xs font-semibold text-white rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-30 shadow-xl hidden md:block lg:hidden">
                    {item.name}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle Footer */}
        <div className="p-4 border-t border-white/5 hidden lg:block">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center w-full h-10 rounded-lg hover:bg-white/5 hover:text-white transition-colors duration-200"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-zinc-950/90 border-t border-white/5 backdrop-blur-lg flex items-center justify-around px-4 z-40">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-colors duration-200 focus:outline-none
                ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPillMobile"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              
              <div className="relative z-10">
                <Icon size={20} className={isActive ? 'text-cyan-400' : 'text-zinc-400'} />
              </div>
              <span className="text-[10px] mt-1 font-medium relative z-10">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
