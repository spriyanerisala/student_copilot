import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui';
import { agenticDataService } from '@/services/agenticDataService';

export const AgenticPerformanceDashboard: React.FC = () => {
  const perf = agenticDataService.getUserPerformance();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 select-none">
      
      {/* Topics Progress */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Strong & Weak Topics */}
        <div className="space-y-6">
          <Card className="p-5 border-emerald-500/20 bg-emerald-950/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Strongest Concepts
            </h3>
            <div className="flex flex-wrap gap-2">
              {perf.strongTopics.map((topic, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </Card>

          <Card className="p-5 border-rose-500/20 bg-rose-950/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" /> Recommended Review
            </h3>
            <div className="flex flex-wrap gap-2">
              {perf.weakTopics.map((topic, i) => (
                <span key={i} className="px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
