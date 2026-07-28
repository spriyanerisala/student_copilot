import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Code2, Award } from 'lucide-react';
import { agenticDataService, type CodingProblem } from '@/services/agenticDataService';
import { agenticProgressService } from '@/services/agenticProgressService';
import { useAuth } from '@/context/AuthContext';
import { Badge, Button } from '@/components/ui';

export const AgenticSolvedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchSolved = async () => {
      const ids = await agenticProgressService.getSolvedProblems(user?.id || profile?.id);
      setSolvedIds(ids);
    };
    fetchSolved();
  }, [user?.id, profile?.id]);

  // Compute metrics
  const { domains, domainStats, solvedProblems } = useMemo(() => {
    const allDomains = agenticDataService.getAllCodingDomains();
    const allProblems = agenticDataService.getAllCodingProblems();
    
    // Compute domain stats
    const stats: Record<string, { total: number; solved: number }> = {};
    allDomains.forEach(d => {
      stats[d] = { total: 0, solved: 0 };
    });

    const solvedList: CodingProblem[] = [];
    
    allProblems.forEach(p => {
      if (stats[p.topic]) {
        stats[p.topic].total += 1;
      }
      if (solvedIds.includes(p.id)) {
        if (stats[p.topic]) stats[p.topic].solved += 1;
        solvedList.push(p);
      }
    });

    return {
      domains: allDomains,
      domainStats: stats,
      solvedProblems: solvedList
    };
  }, [solvedIds]);

  return (
    <div className="space-y-8 select-none py-4">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <button onClick={() => navigate('/agentic-ai')} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Award className="w-8 h-8 text-emerald-400" />
            Solved Problems
          </h1>
          <p className="text-sm text-slate-400">
            Track your mastery and review the code for challenges you've successfully cleared.
          </p>
        </div>
      </div>

      {/* Domain Breakdown Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map(domain => {
          const stat = domainStats[domain];
          if (stat.total === 0) return null; // Hide empty domains
          const percent = Math.round((stat.solved / stat.total) * 100) || 0;
          
          return (
            <div key={domain} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{domain}</span>
                <span className="text-xs text-slate-400 font-mono">{stat.solved} / {stat.total}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-2 transition-all duration-500" 
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Solved Problems Table */}
      <div className="glass-panel overflow-hidden border border-white/10 rounded-2xl">
        <div className="p-4 bg-slate-900/80 border-b border-white/10 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold text-white">Your Accepted Solutions ({solvedProblems.length})</h2>
        </div>
        
        {solvedProblems.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <Code2 className="w-12 h-12 text-slate-700 mx-auto" />
            <p className="text-slate-400">You haven't solved any problems yet. Time to get coding!</p>
            <Button variant="primary" onClick={() => navigate('/agentic-ai')}>Go to Hub</Button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-white/10">
                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Title</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Topic</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-300 w-32">Difficulty</th>
                <th className="py-4 px-6 text-sm font-semibold text-slate-300 w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {solvedProblems.map((problem) => (
                <tr key={problem.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="py-4 px-6 font-medium text-slate-200 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <Link to={`/agentic-ai/coding/${problem.topic}/${problem.id}`}>
                      {problem.title}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-400">{problem.topic}</td>
                  <td className="py-4 px-6">
                    <Badge variant={
                      problem.difficulty === 'Easy' ? 'success' : 
                      problem.difficulty === 'Medium' ? 'warning' : 'danger'
                    }>
                      {problem.difficulty}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate(`/agentic-ai/coding/${encodeURIComponent(problem.topic)}/${problem.id}`)}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
