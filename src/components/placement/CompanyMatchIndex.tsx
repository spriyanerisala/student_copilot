import React from 'react';
import type { PlacementMetrics } from '@/services/placementService';
import { Building2 } from 'lucide-react';
import { Card, Badge, ProgressBar } from '@/components/ui';

interface CompanyMatchIndexProps {
  companyMatches: PlacementMetrics['companyMatches'];
}

export const CompanyMatchIndex: React.FC<CompanyMatchIndexProps> = ({ companyMatches }) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-400" /> Top Tech Company Match Index
          </h3>
          <p className="text-[11px] text-slate-400">Match score based on tech stack alignment and interview benchmarks</p>
        </div>
        <Badge variant="ai">Tier-1 Companies</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {companyMatches.map((comp, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">{comp.name}</h4>
                <span className="text-sm font-extrabold text-emerald-400 font-mono">
                  {comp.matchPercent}% Match
                </span>
              </div>

              <ProgressBar value={comp.matchPercent} size="sm" variant="emerald" />

              {/* Aligned Skills */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Matched Skill Alignment:</span>
                <div className="flex flex-wrap gap-1">
                  {comp.alignedSkills.map((sk) => (
                    <span key={sk} className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-300 font-mono">
                      ✓ {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills */}
              {comp.missingSkills.length > 0 && (
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Recommended Additions:</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.missingSkills.map((sk) => (
                      <span key={sk} className="px-2 py-0.5 rounded-md bg-rose-500/15 border border-rose-500/30 text-[10px] text-rose-300 font-mono">
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
