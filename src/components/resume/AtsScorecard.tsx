import React from 'react';
import type { ResumeAnalysisResult } from '@/services/resumeService';
import { Card, Badge, ProgressBar } from '@/components/ui';

interface AtsScorecardProps {
  result: ResumeAnalysisResult;
}

export const AtsScorecard: React.FC<AtsScorecardProps> = ({ result }) => {
  const isStrong = result.atsScore >= 80;
  
  // Use n8n match level if provided, else fallback to local logic
  const badgeLabel = result.n8nMatchLevel 
    ? `${result.n8nMatchLevel} Match` 
    : (isStrong ? 'Strong ATS Match 🎉' : 'Needs Optimization ⚡');
    
  const badgeVariant = result.n8nMatchLevel 
    ? (result.n8nMatchLevel.toLowerCase() === 'high' ? 'success' : result.n8nMatchLevel.toLowerCase() === 'moderate' ? 'warning' : 'destructive')
    : (isStrong ? 'success' : 'warning');

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
            <Badge variant={badgeVariant as any} size="md">
              {badgeLabel}
            </Badge>
            <h3 className="text-lg font-bold text-white">{result.fileName}</h3>
            <p className="text-xs text-slate-400">
              Analyzed against Senior Software Engineer & Full-Stack ATS parsers
            </p>
          </div>
        </div>
      </div>
      
      {/* n8n AI Executive Summary */}
      {result.n8nSummary && (
        <div className="p-4 rounded-2xl bg-purple-900/20 border border-purple-500/30">
          <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-2">
             AI Executive Summary
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {result.n8nSummary}
          </p>
        </div>
      )}

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

      {/* Strengths / Detected Skills */}
      {(result.n8nStrengths || result.detectedSkills).length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            ✅ {result.n8nStrengths ? 'Key Strengths & Competencies' : 'Skills Detected in Your Resume'} ({result.n8nStrengths ? result.n8nStrengths.length : result.detectedSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {(result.n8nStrengths || result.detectedSkills).map((item, idx) => (
              <span key={idx} className={`px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold ${!result.n8nStrengths && 'capitalize'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Weaknesses / Missing Skills */}
      {(result.n8nWeaknesses || result.missingSkills).length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            ❌ {result.n8nWeaknesses ? 'Areas of Weakness' : 'Missing High-Priority Skills'} ({result.n8nWeaknesses ? result.n8nWeaknesses.length : result.missingSkills.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {(result.n8nWeaknesses || result.missingSkills).map((item, idx) => (
              <span key={idx} className={`px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[11px] font-semibold ${!result.n8nWeaknesses && 'capitalize'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
