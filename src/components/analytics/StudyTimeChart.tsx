import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp } from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';
import { Card, Button } from '@/components/ui';

export const StudyTimeChart: React.FC = () => {
  const [range, setRange] = useState<'weekly' | 'monthly'>('weekly');
  const data = analyticsService.getStudyTimeData(range);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" /> Study Time Analytics
          </h3>
          <p className="text-[11px] text-slate-400">Track total hours spent across lessons and quizzes</p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-fit">
          <Button
            size="sm"
            variant={range === 'weekly' ? 'primary' : 'ghost'}
            onClick={() => setRange('weekly')}
            className="text-[10px] px-3 py-1"
          >
            Weekly
          </Button>
          <Button
            size="sm"
            variant={range === 'monthly' ? 'primary' : 'ghost'}
            onClick={() => setRange('monthly')}
            className="text-[10px] px-3 py-1"
          >
            Monthly
          </Button>
        </div>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="studyHoursGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
            <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="hours" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#studyHoursGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
          <TrendingUp className="w-3.5 h-3.5" /> +18.5% increase vs last period
        </span>
        <span className="font-mono">Daily Avg: 6.9 Hours</span>
      </div>
    </Card>
  );
};
