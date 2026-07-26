import React from 'react';
import { Lightbulb, HelpCircle, Code, MessageSquare, FileText, Sparkles } from 'lucide-react';
import type { AiMode } from '@/services/aiService';

interface AiModePresetsProps {
  activeMode: AiMode;
  onSelectMode: (mode: AiMode, defaultPrompt: string) => void;
}

export const AiModePresets: React.FC<AiModePresetsProps> = ({ activeMode, onSelectMode }) => {
  const presets = [
    {
      id: 'explain' as AiMode,
      label: 'Deep Explanation',
      icon: Sparkles,
      prompt: 'Explain the core principles of Database Normalization and ACID transactions.',
    },
    {
      id: 'explain_simply' as AiMode,
      label: 'Explain Simply (ELIF5)',
      icon: Lightbulb,
      prompt: 'Explain database indexing simply like I am a beginner.',
    },
    {
      id: 'mcq' as AiMode,
      label: 'Generate 3 MCQs',
      icon: HelpCircle,
      prompt: 'Generate 3 multiple choice questions on 3NF and BCNF normalization.',
    },
    {
      id: 'coding' as AiMode,
      label: 'Coding Question',
      icon: Code,
      prompt: 'Give me a hands-on SQL coding question with a aggregate GROUP BY query.',
    },
    {
      id: 'interview' as AiMode,
      label: 'Interview Questions',
      icon: MessageSquare,
      prompt: 'What are the top B+ Tree indexing technical interview questions asked at top tech companies?',
    },
    {
      id: 'notes' as AiMode,
      label: 'Create Revision Notes',
      icon: FileText,
      prompt: 'Create concise bullet point revision notes for DBMS transactions and locking.',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {presets.map((p) => {
        const Icon = p.icon;
        const isActive = activeMode === p.id;
        return (
          <button
            key={p.id}
            onClick={() => onSelectMode(p.id, p.prompt)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isActive
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 border border-purple-400'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Icon className="w-3.5 h-3.5 text-purple-400" />
            <span>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
};
