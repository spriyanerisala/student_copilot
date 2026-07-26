import React from 'react';
import type { ResumeAnalysisResult } from '@/services/resumeService';
import { Card, Badge, ProgressBar } from '@/components/ui';

interface AtsScorecardProps {
  result: ResumeAnalysisResult;
}

export const AtsScorecard: React.FC<AtsScorecardProps> = ({ result }) => {
  const isStrong = result.atsScore >= 80;

  return (
    <Card className="p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
        {/* Score Gauge */}
        <div className="flex items-center gap-6">
          <div
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 shadow-2xl ${
              isStrong
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-emerald-500/10'
                : 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-amber-500/10'
            }`}
          >
            <span className="text-3xl font-extrabold font-mono">{result.atsScore}</span>
            <span className="text-[10px] text-slate-400 font-sans uppercase">ATS SCORE</span>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <Badge variant={isStrong ? 'success' : 'warning'} size="md">
              {isStrong ? 'Strong ATS Match 🎉' : 'Needs Optimization ⚡'}
            </Badge>
            <h3 className="text-lg font-bold text-white">{result.fileName}</h3>
            <p className="text-xs text-slate-400">
              Analyzed against Senior Software Engineer & Full-Stack ATS parsers
            </p>
          </div>
        </div>
      </div>

      {/* Category Sub-Scores Grid */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          ATS Category Breakdown
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Keyword Density</span>
              <span className="text-purple-300 font-mono">{result.subScores.keywordMatch}%</span>
            </div>
            <ProgressBar value={result.subScores.keywordMatch} size="sm" variant="gradient" />
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">ATS Formatting & Parsability</span>
              <span className="text-emerald-300 font-mono">{result.subScores.formatting}%</span>
            </div>
            <ProgressBar value={result.subScores.formatting} size="sm" variant="emerald" />
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Technical Depth & Stack</span>
              <span className="text-indigo-300 font-mono">{result.subScores.technicalDepth}%</span>
            </div>
            <ProgressBar value={result.subScores.technicalDepth} size="sm" variant="gradient" />
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Quantifiable Impact Metrics</span>
              <span className="text-amber-300 font-mono">{result.subScores.impactMetrics}%</span>
            </div>
            <ProgressBar value={result.subScores.impactMetrics} size="sm" variant="amber" />
          </div>
        </div>
      </div>
    </Card>
  );
};
