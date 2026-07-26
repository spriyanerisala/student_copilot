import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Card } from '@/components/ui';

export const ScheduleCalendar: React.FC = () => {
  const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  // Calendar dates grid (1 to 30)
  const activeDates = [6, 8, 20, 22, 24]; // Dates with active revisions/classes

  return (
    <Card className="p-6 space-y-4 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-purple-400" /> Class Schedule
          </h3>
          <p className="text-[11px] text-slate-400">August 2026</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400">
          {daysOfWeek.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => {
            const isActive = activeDates.includes(date);
            return (
              <div
                key={date}
                className={`py-1.5 rounded-xl flex flex-col items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{date < 10 ? `0${date}` : date}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-purple-400 mt-0.5" />}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
