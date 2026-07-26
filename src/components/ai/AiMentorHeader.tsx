import React from 'react';
import { Sparkles, BookOpen, Award, Layers } from 'lucide-react';
import type { AiContextData } from '@/services/aiService';

interface AiMentorHeaderProps {
  context: AiContextData;
}

export const AiMentorHeader: React.FC<AiMentorHeaderProps> = ({ context }) => {
  return (
    <div className="p-4 rounded-3xl glass-card bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            StudyPilot AI Tutor & Mentor
          </h2>
          <p className="text-xs text-purple-300">
            Contextualized 24/7 learning assistant powered by deep domain models.
          </p>
        </div>
      </div>

      {/* Active Context Pills */}
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-300">
        <span className="px-2.5 py-1 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-purple-400" /> {context.courseTitle}
        </span>
        <span className="px-2.5 py-1 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-indigo-400" /> {context.moduleTitle}
        </span>
        <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold flex items-center gap-1">
          <Award className="w-3.5 h-3.5" /> Quiz Score: {context.quizScorePercent}%
        </span>
      </div>
    </div>
  );
};
