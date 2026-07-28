import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Award, Compass, Code } from 'lucide-react';
import { Card } from '@/components/ui';

import { progressService } from '@/services/progressService';

export const ProgressRingChart: React.FC = () => {
  const summary = progressService.getSummary();

  const data = [
    { name: 'Completed', value: summary.courseCompletionPercent, color: '#c084fc' },
    { name: 'Remaining', value: 100 - summary.courseCompletionPercent, color: '#334155' },
  ];

  return (
    <Card className="p-6 space-y-4 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Your Progress
          </h3>
          <p className="text-[11px] text-slate-400">Your total course progress here</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-300">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-700" /> Remaining</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400" /> Completed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Recharts Donut Pie */}
        <div className="h-44 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#8b5cf6',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '11px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total</span>
            <span className="text-sm font-bold text-white">{summary.courseCompletionPercent}%</span>
          </div>
        </div>

        {/* Side Category Pills */}
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Course Progress</h4>
              <p className="text-[10px] text-slate-400 font-mono">{summary.courseCompletionPercent}% Completed</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Latest Module</h4>
              <p className="text-[10px] text-slate-400 font-mono">{summary.moduleCompletionPercent}% Completed</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
