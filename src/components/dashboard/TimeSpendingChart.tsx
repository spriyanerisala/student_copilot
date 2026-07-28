import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Clock, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui';

import { analyticsService } from '@/services/analyticsService';

export const TimeSpendingChart: React.FC = () => {
  const [range, setRange] = React.useState<'weekly' | 'monthly'>('weekly');
  const data = analyticsService.getStudyTimeData(range);

  return (
    <Card className="p-6 space-y-4 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" /> Time Spending
          </h3>
          <p className="text-[11px] text-slate-400">Weekly & monthly study hours</p>
        </div>
        <button 
          onClick={() => setRange(r => r === 'weekly' ? 'monthly' : 'weekly')}
          className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-slate-300 hover:text-white capitalize"
        >
          <span>{range}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Recharts Area Line Chart */}
      <div className="h-44 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} style={{ fontSize: '10px' }} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} style={{ fontSize: '10px' }} unit="H" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#8b5cf6',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '11px',
              }}
              formatter={(val: any) => [`${val} Hours`, 'Study Duration']}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="#a855f7"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorHours)"
              dot={{ r: 4, fill: '#c084fc', strokeWidth: 2, stroke: '#1e1b4b' }}
              activeDot={{ r: 6, fill: '#ec4899' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/10">
        <span>Peak activity: <strong className="text-purple-300 font-mono">50H 20M</strong> (Apr)</span>
        <span className="text-emerald-400 font-semibold">+18% vs last month</span>
      </div>
    </Card>
  );
};
