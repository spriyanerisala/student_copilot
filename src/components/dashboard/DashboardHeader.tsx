import React from 'react';
import { Video, Code } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const DashboardHeader: React.FC = () => {
  const { profile } = useAuth();
  const userName = profile?.fullName || 'Ahnaf Ibn Habib';

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
      {/* User Welcome Message */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Hi, {userName} <span className="text-2xl">👋</span>
        </h1>
        <p className="text-xs text-slate-400">
          Welcome Back to your dashboard • You have 2 revisions scheduled today.
        </p>
      </div>

      {/* Active Course Progress Pills (Matching Reference Image Layout) */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Course Pill 1 */}
        <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl glass-card border border-purple-500/20 bg-slate-900/90 shadow-lg min-w-[200px]">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Computer Science</span>
            <h4 className="text-xs font-bold text-white">DBMS Mastery</h4>
            <p className="text-[10px] text-slate-400">12/22 Lessons Watched</p>
          </div>
          <div className="ml-auto flex items-center justify-center w-10 h-10 rounded-full border-2 border-purple-500 text-[11px] font-bold text-purple-300 font-mono">
            60%
          </div>
        </div>

        {/* Course Pill 2 */}
        <div className="flex items-center gap-3 p-2.5 px-4 rounded-2xl glass-card border border-amber-500/20 bg-slate-900/90 shadow-lg min-w-[200px]">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">System Design</span>
            <h4 className="text-xs font-bold text-white">3D Architecture</h4>
            <p className="text-[10px] text-slate-400">15/22 Lessons Watched</p>
          </div>
          <div className="ml-auto flex items-center justify-center w-10 h-10 rounded-full border-2 border-amber-400 text-[11px] font-bold text-amber-300 font-mono">
            70%
          </div>
        </div>
      </div>
    </div>
  );
};
