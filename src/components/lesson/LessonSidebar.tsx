import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle, Play, BookOpen } from 'lucide-react';
import type { CourseModule } from '@/types';
import { ProgressBar } from '@/components/ui';

interface LessonSidebarProps {
  modules: CourseModule[];
  courseId: string;
  currentLessonId: string;
  completedLessonIds: string[];
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({
  modules,
  courseId,
  currentLessonId,
  completedLessonIds,
}) => {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessonIds.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <aside className="w-full lg:w-80 glass-panel border-r border-white/10 p-4 space-y-6 h-full flex flex-col justify-between">
      <div className="space-y-4">
        {/* Course Progress Bar */}
        <div className="space-y-2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" /> Course Progress
            </span>
            <span className="font-mono text-purple-300 font-bold">{progressPercent}%</span>
          </div>
          <ProgressBar value={progressPercent} size="sm" variant="gradient" />
          <p className="text-[10px] text-slate-400 text-right">
            {completedCount} of {totalLessons} Lessons Completed
          </p>
        </div>

        {/* Modules & Lessons List */}
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
          {modules.map((mod, idx) => (
            <div key={mod.id} className="space-y-2">
              <div className="flex items-center justify-between px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Module {idx + 1}: {mod.title}</span>
              </div>

              <div className="space-y-1">
                {mod.lessons.map((lesson) => {
                  const isActive = lesson.id === currentLessonId;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <NavLink
                      key={lesson.id}
                      to={`/course/${courseId}/lesson/${lesson.id}`}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white border border-purple-500/40 shadow-md font-semibold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Play className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0 ml-2">
                        {lesson.duration}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
