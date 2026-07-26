import React from 'react';
import { BookOpen, Clock, Flame, Award, Calendar, CheckCircle2, Target } from 'lucide-react';
import { progressService } from '@/services/progressService';
import { Card, ProgressBar } from '@/components/ui';

export const ProgressSummaryCards: React.FC = () => {
  const summary = progressService.getSummary();

  return (
    <div className="space-y-6">
      {/* Active Lesson Overview Card */}
      <Card className="p-6 bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-900 border border-purple-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Current Active Path</span>
            <h3 className="text-lg font-bold text-white">{summary.currentLessonTitle}</h3>
            <p className="text-xs text-slate-400">{summary.currentModuleTitle}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-xs font-bold text-purple-300 font-mono">{summary.courseCompletionPercent}% Overall</span>
              <p className="text-[10px] text-slate-400">Course Completion</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <ProgressBar value={summary.courseCompletionPercent} size="md" variant="gradient" showLabel />
        </div>
      </Card>

      {/* Grid Stats (8 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Purchased Courses */}
        <div className="p-4 rounded-2xl glass-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold">Courses</span>
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <p className="text-xl font-bold text-white">{summary.purchasedCoursesCount}</p>
          <p className="text-[9px] text-slate-400">Enrolled</p>
        </div>

        {/* Study Hours */}
        <div className="p-4 rounded-2xl glass-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold">Hours</span>
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <p className="text-xl font-bold text-white">{summary.totalStudyHours}h</p>
          <p className="text-[9px] text-emerald-400">+12% this week</p>
        </div>

        {/* Quiz Accuracy */}
        <div className="p-4 rounded-2xl glass-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold">Accuracy</span>
            <Target className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-xl font-bold text-white">{summary.quizAccuracyPercent}%</p>
          <p className="text-[9px] text-slate-400">{summary.quizAttemptsCount} attempts</p>
        </div>

        {/* Streak */}
        <div className="p-4 rounded-2xl glass-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold">Streak</span>
            <Flame className="w-3.5 h-3.5 text-orange-400" />
          </div>
          <p className="text-xl font-bold text-white">{summary.streakDays} Days</p>
          <p className="text-[9px] text-orange-400">Active learning</p>
        </div>

        {/* Average Score */}
        <div className="p-4 rounded-2xl glass-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold">Avg Score</span>
            <Award className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-xl font-bold text-white">{summary.averageQuizScore}%</p>
          <p className="text-[9px] text-slate-400">Top 5% rank</p>
        </div>

        {/* Last Study Date */}
        <div className="p-4 rounded-2xl glass-card space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase font-bold">Last Study</span>
            <Calendar className="w-3.5 h-3.5 text-pink-400" />
          </div>
          <p className="text-xs font-bold text-white truncate">{summary.lastStudyDate}</p>
          <p className="text-[9px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Today
          </p>
        </div>
      </div>
    </div>
  );
};
