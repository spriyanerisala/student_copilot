import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ArrowRight } from 'lucide-react';
import { progressService } from '@/services/progressService';
import { Card, Button, Badge } from '@/components/ui';

export const WeakTopicsDetector: React.FC = () => {
  const summary = progressService.getSummary();

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-400" /> Weak Topic Recommendations
          </h3>
          <p className="text-[11px] text-slate-400">Analyzed from your recent quiz attempts & wrong options</p>
        </div>
        <Badge variant="danger">{summary.weakTopics.length} Weak Areas</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summary.weakTopics.map((topic, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">Topic {idx + 1}</span>
              <h4 className="text-xs font-bold text-white leading-snug">{topic}</h4>
              <p className="text-[10px] text-slate-400">
                Score accuracy on this topic is under 70%. Practice targeted questions to boost placement readiness.
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <Link to="/quiz/quiz-mod-1" className="w-full">
                <Button size="sm" variant="glass" className="w-full text-[10px]" rightIcon={<ArrowRight className="w-3 h-3" />}>
                  Practice Quiz
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
