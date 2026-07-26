import React from 'react';
import { Layers } from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';
import { Card, Badge, ProgressBar } from '@/components/ui';

export const SubjectMasteryMatrix: React.FC = () => {
  const masteryList = analyticsService.getSubjectMasteryData();

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" /> Subject Mastery Matrix
          </h3>
          <p className="text-[11px] text-slate-400">Mastery ratings evaluated across quizzes and lesson completions</p>
        </div>
        <Badge variant="ai">5 Core Domains</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {masteryList.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-purple-400 uppercase">{item.category}</span>
                <h4 className="text-xs font-bold text-white">{item.subject}</h4>
              </div>

              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border"
                style={{ backgroundColor: `${item.statusColor}20`, borderColor: `${item.statusColor}40`, color: item.statusColor }}
              >
                {item.level} ({item.masteryPercent}%)
              </span>
            </div>

            <ProgressBar value={item.masteryPercent} size="sm" variant="gradient" />
          </div>
        ))}
      </div>
    </Card>
  );
};
