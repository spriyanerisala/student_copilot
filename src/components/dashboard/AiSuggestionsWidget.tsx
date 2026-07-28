import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, Button, ProgressBar } from '@/components/ui';

import { progressService } from '@/services/progressService';

export const AiSuggestionsWidget: React.FC = () => {
  const summary = progressService.getSummary();
  const queue = progressService.getSpacedRevisions().filter(r => !r.isCompleted);
  const weakTopic = summary.weakTopics[0] || 'Core Concepts';

  return (
    <Card className="p-6 space-y-4 flex flex-col justify-between h-full bg-gradient-to-br from-slate-900 via-slate-900/90 to-purple-950/40 border border-purple-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Mentor Study Plan</h3>
            <p className="text-[10px] text-purple-300">Contextualized placement suggestions</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold font-mono">
          Score: {summary.averageQuizScore}/100
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {/* Metric 1 */}
        <div className="space-y-1">
          <div className="flex justify-between text-slate-300">
            <span className="flex items-center gap-1.5"><RotateCw className="w-3.5 h-3.5 text-purple-400" /> Spaced Revision Queue</span>
            <span className="font-semibold text-purple-300">{queue.length} Due Today</span>
          </div>
          <ProgressBar value={summary.quizAccuracyPercent} size="sm" variant="gradient" />
        </div>

        {/* Suggestion item */}
        <div className="p-3 rounded-2xl bg-purple-900/20 border border-purple-500/20 text-slate-200 text-xs space-y-1.5">
          <p className="font-semibold text-purple-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recommended Action
          </p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            Practice more questions on <strong>{weakTopic}</strong> to improve your average quiz score above 90.
          </p>
        </div>
      </div>

      <div className="pt-2">
        <Link to="/ai-mentor">
          <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Open AI Mentor Chat
          </Button>
        </Link>
      </div>
    </Card>
  );
};
