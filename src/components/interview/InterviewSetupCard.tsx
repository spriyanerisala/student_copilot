import React, { useState } from 'react';
import { Bot, Code, Server, Layout, MessageSquare, Play } from 'lucide-react';
import type { InterviewType, TargetRole } from '@/services/interviewService';
import { Card, Button, Badge } from '@/components/ui';

interface InterviewSetupCardProps {
  onStartInterview: (type: InterviewType, role: TargetRole) => void;
}

export const InterviewSetupCard: React.FC<InterviewSetupCardProps> = ({ onStartInterview }) => {
  const [selectedType, setSelectedType] = useState<InterviewType>('technical');
  const [selectedRole, setSelectedRole] = useState<TargetRole>('fullstack');

  const types = [
    { id: 'technical' as InterviewType, title: 'Technical SDE Round', desc: 'Data structures, algorithms, DBs & APIs', icon: Code },
    { id: 'system_design' as InterviewType, title: 'System Design Round', desc: 'High-scale architecture & distributed systems', icon: Server },
    { id: 'hr' as InterviewType, title: 'HR & Behavioral Round', desc: 'Leadership principles, STAR method & communication', icon: MessageSquare },
  ];

  const roles = [
    { id: 'fullstack' as TargetRole, title: 'Full-Stack SaaS Developer', icon: Layout },
    { id: 'backend' as TargetRole, title: 'Backend Systems Engineer', icon: Server },
    { id: 'frontend' as TargetRole, title: 'Frontend React Engineer', icon: Code },
  ];

  return (
    <Card className="p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-purple-600/30 text-purple-400 border border-purple-500/40 flex items-center justify-center shrink-0">
          <Bot className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white">Configure AI Mock Interview</h2>
          <p className="text-xs text-slate-400">Select your target interview round and engineering role</p>
        </div>
      </div>

      {/* Step 1: Select Interview Type */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          1. Select Interview Round Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {types.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`p-4 rounded-2xl text-left transition-all space-y-2 border select-none ${
                  isSelected
                    ? 'bg-purple-600/30 border-2 border-purple-400 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-purple-300' : 'text-slate-500'}`} />
                  {isSelected && <Badge variant="primary" size="sm">Selected</Badge>}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Select Target Role */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          2. Select Target Engineering Role
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`p-3.5 rounded-2xl text-left transition-all flex items-center gap-3 border select-none ${
                  isSelected
                    ? 'bg-purple-600/30 border-2 border-purple-400 text-white font-bold'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-purple-300' : 'text-slate-500'}`} />
                <span className="text-xs">{r.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Start Button */}
      <Button
        size="lg"
        onClick={() => onStartInterview(selectedType, selectedRole)}
        className="w-full text-sm"
        leftIcon={<Play className="w-4 h-4 fill-white" />}
      >
        Start Interactive AI Mock Interview Session
      </Button>
    </Card>
  );
};
