import React, { useState } from 'react';
import { MoreVertical, Users } from 'lucide-react';
import { Card, Button, Avatar } from '@/components/ui';

export const MentorsList: React.FC = () => {
  const [following, setFollowing] = useState<{ [key: string]: boolean }>({
    'm-1': true,
  });

  const mentors = [
    {
      id: 'm-1',
      name: 'Arian Adil',
      role: 'UI/UX Expert & Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'm-2',
      name: 'Bil Rhab',
      role: 'Motion Expert & SDE',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'm-3',
      name: 'Abd Fahad',
      role: 'Web Development Lead',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const toggleFollow = (id: string) => {
    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="p-6 space-y-4 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-400" /> Your Mentors
        </h3>
        <button className="p-1 rounded-lg text-slate-400 hover:text-white">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {mentors.map((m) => {
          const isFollowing = following[m.id];
          return (
            <div
              key={m.id}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar src={m.avatar} name={m.name} size="md" isOnline />
                <div>
                  <h4 className="text-xs font-bold text-white">{m.name}</h4>
                  <p className="text-[10px] text-slate-400">{m.role}</p>
                </div>
              </div>

              <Button
                size="sm"
                variant={isFollowing ? 'secondary' : 'outline'}
                onClick={() => toggleFollow(m.id)}
                className="text-[10px] px-3 py-1"
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="pt-2">
        <Button variant="ghost" className="w-full text-xs text-slate-400 hover:text-white">
          See All Mentors
        </Button>
      </div>
    </Card>
  );
};
