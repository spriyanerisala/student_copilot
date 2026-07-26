import React from 'react';
import { Target } from 'lucide-react';
import { placementService } from '@/services/placementService';
import { ReadinessScorecard } from '@/components/placement/ReadinessScorecard';
import { CompanyMatchIndex } from '@/components/placement/CompanyMatchIndex';
import { PlacementActionChecklist } from '@/components/placement/PlacementActionChecklist';

export const PlacementPage: React.FC = () => {
  const metrics = placementService.getReadinessMetrics();

  return (
    <div className="space-y-8 select-none">
      {/* Header Bar */}
      <div className="space-y-1">
        <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20 inline-flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-purple-400" /> Career & Placement Readiness Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Placement Readiness & Company Matching
        </h1>
        <p className="text-xs text-slate-400">
          AI evaluation matrix calculating hiring readiness for Senior Software Engineer & Full-Stack SDE roles.
        </p>
      </div>

      {/* Readiness Scorecard */}
      <ReadinessScorecard metrics={metrics} />

      {/* Company Match Index */}
      <CompanyMatchIndex companyMatches={metrics.companyMatches} />

      {/* Action Plan Checklist */}
      <PlacementActionChecklist items={metrics.actionChecklist} />
    </div>
  );
};
