import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, Target } from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';
import { Card } from '@/components/ui';

export const QuizPerformanceChart: React.FC = () => {
  const data = analyticsService.getQuizPerformanceData();

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Subject Quiz Performance
          </h3>
          <p className="text-[11px] text-slate-400">Average quiz score % compared to target benchmarks (85%)</p>
        </div>
        <span className="text-xs font-mono text-purple-300 font-bold">Overall: 89%</span>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="subject" stroke="#94A3B8" fontSize={10} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
            />
            <Bar dataKey="averageScore" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
        <span className="flex items-center gap-1 text-purple-300 font-semibold">
          <Target className="w-3.5 h-3.5 text-purple-400" /> Target Passing Score: 85%
        </span>
        <span className="font-mono text-emerald-400 font-bold">4 of 5 Subjects Exceed Target</span>
      </div>
    </Card>
  );
};
