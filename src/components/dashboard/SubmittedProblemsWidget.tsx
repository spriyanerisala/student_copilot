import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Code2, ArrowRight } from 'lucide-react';
import { agenticDataService } from '@/services/agenticDataService';
import { agenticProgressService } from '@/services/agenticProgressService';
import { useAuth } from '@/context/AuthContext';
import { Card, Badge, Button } from '@/components/ui';

export const SubmittedProblemsWidget: React.FC = () => {
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

  const solvedProblems = useMemo(() => {
    const allProblems = agenticDataService.getAllCodingProblems();
    return allProblems.filter(p => solvedIds.includes(p.id));
  }, [solvedIds]);

  return (
    <Card className="p-0 overflow-hidden border-slate-800 bg-slate-900/50 flex flex-col h-full">
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Submitted Coding Problems
        </h3>
        <Badge variant="success">{solvedProblems.length} Solved</Badge>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[300px]">
        {solvedProblems.length === 0 ? (
          <div className="p-8 text-center space-y-3">
            <Code2 className="w-8 h-8 text-slate-700 mx-auto" />
            <p className="text-sm text-slate-400">You haven't submitted any problems yet.</p>
            <Button variant="primary" size="sm" onClick={() => navigate('/agentic-ai')}>
              Start Coding
            </Button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-900/80 border-b border-white/5 sticky top-0 z-10">
                <th className="py-3 px-5 font-semibold text-slate-400">Title</th>
                <th className="py-3 px-5 font-semibold text-slate-400 w-24 hidden sm:table-cell">Topic</th>
                <th className="py-3 px-5 font-semibold text-slate-400 w-24">Difficulty</th>
                <th className="py-3 px-5 font-semibold text-slate-400 w-16 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {solvedProblems.map((problem) => (
                <tr key={problem.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="py-3 px-5 font-medium text-slate-200">
                    <Link to={`/agentic-ai/coding/${problem.topic}/${problem.id}`} className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                      <span className="truncate max-w-[200px] sm:max-w-[300px]">{problem.title}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-5 text-slate-400 hidden sm:table-cell truncate max-w-[100px]">{problem.topic}</td>
                  <td className="py-3 px-5">
                    <Badge variant={
                      problem.difficulty === 'Easy' ? 'success' : 
                      problem.difficulty === 'Medium' ? 'warning' : 'danger'
                    }>
                      {problem.difficulty}
                    </Badge>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <button 
                      onClick={() => navigate(`/agentic-ai/coding/${encodeURIComponent(problem.topic)}/${problem.id}`)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors inline-flex"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
};
