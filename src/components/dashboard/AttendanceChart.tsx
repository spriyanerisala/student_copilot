import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Calendar, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui';

export const AttendanceChart: React.FC = () => {
  const data = [
    { month: 'Jan', rate: 40 },
    { month: 'Feb', rate: 55 },
    { month: 'Mar', rate: 60 },
    { month: 'Apr', rate: 70 },
    { month: 'May', rate: 65 },
    { month: 'Jun', rate: 100 }, // Highlighted Peak 100%
    { month: 'Jul', rate: 75 },
    { month: 'Aug', rate: 80 },
    { month: 'Sep', rate: 60 },
    { month: 'Oct', rate: 30 },
    { month: 'Nov', rate: 50 },
    { month: 'Dec', rate: 65 },
  ];

  return (
    <Card className="p-6 space-y-4 flex flex-col justify-between h-full">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" /> Attendance & Consistency
          </h3>
          <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Low</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> High</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-600" /> Average</span>
          </div>
        </div>

        <button className="flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-semibold text-slate-300">
          <span>2026</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} style={{ fontSize: '10px' }} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} style={{ fontSize: '10px' }} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#c084fc',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '11px',
              }}
              formatter={(val: any) => [`${val}% Attendance`, 'Consistency Rate']}
            />
            <Bar dataKey="rate" radius={[6, 6, 0, 0]} fill="#a855f7">
              {data.map((entry, index) => (
                <rect
                  key={`bar-${index}`}
                  fill={entry.rate === 100 ? '#c084fc' : entry.rate < 40 ? '#f59e0b' : '#334155'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
