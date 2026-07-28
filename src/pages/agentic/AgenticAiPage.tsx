import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Cpu, ChevronRight, BarChart2, BrainCircuit } from 'lucide-react';
import { Card } from '@/components/ui';
import { AgenticPerformanceDashboard } from '@/components/dashboard/AgenticPerformanceDashboard';

const APTITUDE_TOPICS = [
  'Percentages', 'Profit and Loss', 'Ages', 'Ratios', 'LCM and HCF',
  'Time and Work', 'Time, Speed, Distance', 'Mixtures and Allegations',
  'Permutations and Combinations', 'Probability', 'Pipes and Cisterns', 'Boats and Streams'
];

const REASONING_TOPICS = [
  'Blood Relations', 'Syllogism', 'Seating Arrangement', 
  'Coding and Decoding', 'Number Series', 'Directions'
];

const CORE_CS_TOPICS = [
  'Computer Networks', 'DBMS', 'Operating System', 'System Design', 'OOPS'
];

const CODING_TOPICS = [
  'Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues',
  'HashMaps', 'Graphs', 'Trees', 'Dynamic Programming', 'Recursion', 'Backtracking'
];

export const AgenticAiPage: React.FC = () => {
  return (
    <div className="space-y-8 select-none py-4">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-purple-400" />
          Agentic AI Assessment Hub
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
          Master your core skills with our AI-driven assessment engine. Choose a domain below to test your knowledge or solve LeetCode style problems.
        </p>
      </div>

      <AgenticPerformanceDashboard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Aptitude Section */}
        <Card className="p-6 space-y-4 border border-purple-500/20 bg-gradient-to-br from-slate-900 to-purple-950/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Aptitude & Reasoning</h2>
              <p className="text-xs text-purple-300">Quantitative & Logical tests</p>
            </div>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {APTITUDE_TOPICS.map(topic => (
              <Link 
                key={topic} 
                to={`/agentic-ai/quiz/aptitude/${encodeURIComponent(topic)}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-purple-900/40 border border-slate-700 hover:border-purple-500/50 transition-all group"
              >
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{topic}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </Link>
            ))}
            
            <div className="pt-2 pb-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Reasoning</span>
            </div>
            
            {REASONING_TOPICS.map(topic => (
              <Link 
                key={topic} 
                to={`/agentic-ai/quiz/reasoning/${encodeURIComponent(topic)}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-purple-900/40 border border-slate-700 hover:border-purple-500/50 transition-all group"
              >
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{topic}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </Link>
            ))}
          </div>
        </Card>

        {/* Core CS Section */}
        <Card className="p-6 space-y-4 border border-blue-500/20 bg-gradient-to-br from-slate-900 to-blue-950/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Core CS</h2>
              <p className="text-xs text-blue-300">Fundamentals & Architecture</p>
            </div>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {CORE_CS_TOPICS.map(topic => (
              <Link 
                key={topic} 
                to={`/agentic-ai/quiz/core-cs/${encodeURIComponent(topic)}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-blue-900/40 border border-slate-700 hover:border-blue-500/50 transition-all group"
              >
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{topic}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </Link>
            ))}
          </div>
        </Card>

        {/* Coding Section */}
        <Card className="p-6 space-y-4 border border-emerald-500/20 bg-gradient-to-br from-slate-900 to-emerald-950/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Coding Practice</h2>
              <p className="text-xs text-emerald-300">LeetCode style questions</p>
            </div>
          </div>
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {CODING_TOPICS.map(topic => (
              <Link 
                key={topic} 
                to={`/agentic-ai/coding/${encodeURIComponent(topic)}`}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-emerald-900/40 border border-slate-700 hover:border-emerald-500/50 transition-all group"
              >
                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{topic}</span>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </Link>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};
