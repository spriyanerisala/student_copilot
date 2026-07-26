import React from 'react';
import { Monitor, Mic, MoreVertical, Clock } from 'lucide-react';
import { Card, Avatar } from '@/components/ui';

export const UpcomingCoursesList: React.FC = () => {
  const upcoming = [
    {
      id: 'uc-1',
      title: 'Design Factors & Systems',
      date: '10 Sep 2026',
      time: '9:00 - 11:00 AM',
      icon: Monitor,
      iconBg: 'bg-amber-500/20 text-amber-400',
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      ],
    },
    {
      id: 'uc-2',
      title: 'Voice Artist & Audio Engineering',
      date: '15 Oct 2026',
      time: '03:00 - 04:00 PM',
      icon: Mic,
      iconBg: 'bg-purple-500/20 text-purple-400',
      avatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      ],
    },
  ];

  return (
    <Card className="p-6 space-y-4 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" /> Upcoming Courses
        </h3>
        <button className="p-1 rounded-lg text-slate-400 hover:text-white">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {upcoming.map((u) => {
          const Icon = u.icon;
          return (
            <div
              key={u.id}
              className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${u.iconBg} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{u.title}</h4>
                    <p className="text-[10px] text-slate-400">{u.date}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-white/5">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-purple-400" /> {u.time}
                </span>
                <div className="flex -space-x-1.5 overflow-hidden">
                  {u.avatars.map((av, idx) => (
                    <Avatar key={idx} src={av} size="sm" className="w-5 h-5 ring-1 ring-slate-900" />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
