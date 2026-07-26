import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Play, FileText, HelpCircle } from 'lucide-react';
import type { CourseModule } from '@/types';
import { Card, Badge } from '@/components/ui';

interface CourseSyllabusAccordionProps {
  modules: CourseModule[];
  courseId: string;
}

export const CourseSyllabusAccordion: React.FC<CourseSyllabusAccordionProps> = ({ modules, courseId }) => {
  const [openModuleId, setOpenModuleId] = useState<string | null>(modules[0]?.id || null);

  const toggleModule = (id: string) => {
    setOpenModuleId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-400" /> Course Syllabus & Modules
        </h3>
        <span className="text-xs text-slate-400 font-mono">
          {modules.length} Modules • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons
        </span>
      </div>

      <div className="space-y-3">
        {modules.map((mod, idx) => {
          const isOpen = openModuleId === mod.id;
          return (
            <Card key={mod.id} className="p-0 overflow-hidden border border-white/10">
              {/* Accordion Module Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-900/80 hover:bg-slate-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-300 font-bold text-xs flex items-center justify-center font-mono">
                    M{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{mod.title}</h4>
                    <p className="text-[11px] text-slate-400">{mod.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    {mod.lessons.length} Lessons
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Lessons List View */}
              {isOpen && (
                <div className="p-4 pt-2 border-t border-white/5 space-y-2 bg-slate-950/40">
                  {mod.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/30 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Play className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="text-slate-200 font-medium">{lesson.title}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 font-mono">{lesson.duration}</span>
                        <Link to={`/course/${courseId}/lesson/${lesson.id}`}>
                          <Badge variant="ai" size="sm" className="cursor-pointer hover:opacity-90">
                            Preview
                          </Badge>
                        </Link>
                      </div>
                    </div>
                  ))}

                  {/* Module Quiz Card */}
                  <div className="p-3 rounded-xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-between text-xs mt-3">
                    <div className="flex items-center gap-2 text-purple-300 font-semibold">
                      <HelpCircle className="w-4 h-4 text-purple-400" />
                      <span>Module Assessment Quiz</span>
                    </div>
                    <Link to={`/quiz/quiz-${mod.id}`}>
                      <span className="text-[11px] font-bold text-purple-300 hover:underline">
                        Take Quiz →
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
