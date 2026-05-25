'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BentoGrid from './BentoGrid';
import { Course } from '@/lib/types';
import { Bell, Search } from 'lucide-react';

interface DashboardShellProps {
  courses: Course[];
  isFallback: boolean;
  error: string | null;
}

export default function DashboardShell({ courses, isFallback, error }: DashboardShellProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <BentoGrid courses={courses} isFallback={isFallback} error={error} />;
      case 'courses':
        return (
          <div className="glass-panel card-mesh rounded-3xl p-8 border border-white/5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Active Learning Tracks</h2>
              <p className="text-sm text-zinc-400">Manage and progress through your registered courses.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-40 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-lg">{course.title}</h3>
                    <span className="text-xs px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 font-semibold uppercase tracking-wider">
                      In Progress
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-zinc-400 mb-1.5 font-semibold">
                      <span>Completion</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="glass-panel card-mesh rounded-3xl p-8 border border-white/5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Performance Analytics</h2>
              <p className="text-sm text-zinc-400">Detailed metric index tracking focus levels, session times, and course progression rate.</p>
            </div>
            <div className="h-64 bg-zinc-950/50 border border-white/5 rounded-2xl flex items-center justify-center">
              <span className="text-sm text-zinc-500">Advanced Charts & Focus Logs loading...</span>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="glass-panel card-mesh rounded-3xl p-8 border border-white/5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Settings & Preferences</h2>
              <p className="text-sm text-zinc-400">Customize dashboard layout, theme accents, database variables, and account profile info.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-900/30 border border-white/5 rounded-xl">
                <div>
                  <div className="text-sm font-semibold text-white">Database Credentials</div>
                  <div className="text-xs text-zinc-400">Supabase tables connect configuration status</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${isFallback ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                  {isFallback ? 'FALLBACK ACTIVE' : 'LIVE SUPABASE'}
                </span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-white/5 px-6 lg:px-8 flex items-center justify-between sticky top-0 bg-zinc-950/60 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search learning modules, labs, documents..."
                className="w-full h-10 pl-10 pr-4 bg-white/5 border border-white/5 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors relative group">
              <Bell className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-1.5 pr-4 rounded-xl select-none">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs uppercase shadow-md shadow-violet-500/10">
                A
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-white leading-none">Alex Rivera</div>
                <div className="text-[10px] text-zinc-500 mt-0.5 leading-none">Intern Developer</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid Content Container */}
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
