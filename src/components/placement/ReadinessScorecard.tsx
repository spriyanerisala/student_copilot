import React from 'react';
import type { PlacementMetrics } from '@/services/placementService';
import { Card, Badge, ProgressBar } from '@/components/ui';

interface ReadinessScorecardProps {
  metrics: PlacementMetrics;
}

export const ReadinessScorecard: React.FC<ReadinessScorecardProps> = ({ metrics }) => {
  return (
    <Card className="p-6 sm:p-8 space-y-6 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-purple-600/20 text-purple-300 border-4 border-purple-500 flex flex-col items-center justify-center shadow-2xl shadow-purple-500/20 font-mono">
            <span className="text-4xl font-extrabold">{metrics.overallScore}%</span>
            <span className="text-[10px] text-slate-400 font-sans uppercase">READINESS</span>
          </div>

          <div className="space-y-1">
            <Badge variant="success" size="md">Placement Certified 🎉</Badge>
            <h2 className="text-2xl font-extrabold text-white">{metrics.status}</h2>
            <p className="text-xs text-slate-300">
              Evaluated against SDE-1, SDE-2, and Senior Full-Stack Engineering hiring bars.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Breakdown */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Core Placement Metric Radar
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Technical Knowledge</span>
              <span className="text-purple-300 font-mono">{metrics.technicalKnowledgeScore}%</span>
            </div>
            <ProgressBar value={metrics.technicalKnowledgeScore} size="sm" variant="gradient" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Problem Solving & DSA</span>
              <span className="text-emerald-300 font-mono">{metrics.problemSolvingScore}%</span>
            </div>
            <ProgressBar value={metrics.problemSolvingScore} size="sm" variant="emerald" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Resume ATS Strength</span>
              <span className="text-amber-300 font-mono">{metrics.resumeStrengthScore}%</span>
            </div>
            <ProgressBar value={metrics.resumeStrengthScore} size="sm" variant="amber" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Mock Interview Score</span>
              <span className="text-indigo-300 font-mono">{metrics.mockInterviewScore}%</span>
            </div>
            <ProgressBar value={metrics.mockInterviewScore} size="sm" variant="gradient" />
          </div>
        </div>
      </div>
    </Card>
  );
};
