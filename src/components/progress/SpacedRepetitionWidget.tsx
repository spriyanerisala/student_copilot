import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RotateCw, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { progressService } from '@/services/progressService';
import type { RevisionTopic } from '@/types';
import { Card, Button, Badge } from '@/components/ui';

export const SpacedRepetitionWidget: React.FC = () => {
  const [revisions, setRevisions] = useState<RevisionTopic[]>(progressService.getSpacedRevisions());

  const handleMarkDone = (id: string) => {
    const updated = progressService.markRevisionDone(id);
    setRevisions(updated);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-purple-400" /> Spaced Repetition Revision Queue
          </h3>
          <p className="text-[11px] text-slate-400">Automated schedule at Day 1, 3, 7, 15, and 30 intervals</p>
        </div>

        <Badge variant="ai">5 Topics Queued</Badge>
      </div>

      <div className="space-y-3">
        {revisions.map((rev) => {
          return (
            <div
              key={rev.id}
              className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                rev.isCompleted
                  ? 'bg-slate-900/40 border-slate-800 opacity-60'
                  : rev.repetitionStage === 1
                  ? 'bg-purple-950/40 border-purple-500/40'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-bold font-mono uppercase ${
                      rev.repetitionStage === 1
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Stage: Day {rev.repetitionStage}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-purple-400" /> {rev.scheduledDate}
                  </span>
                </div>
                <h4 className={`text-xs font-bold ${rev.isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                  {rev.topicTitle}
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {rev.isCompleted ? (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Revised
                  </span>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkDone(rev.id)}
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    >
                      Done
                    </Button>
                    <Link to={`/course/${rev.courseId}/lesson/${rev.lessonId}`}>
                      <Button size="sm" variant="primary" rightIcon={<Clock className="w-3.5 h-3.5" />}>
                        Revise Now
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
