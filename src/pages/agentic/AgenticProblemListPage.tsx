import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Code2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { agenticDataService, type CodingProblem } from '@/services/agenticDataService';
import { agenticProgressService } from '@/services/agenticProgressService';
import { useAuth } from '@/context/AuthContext';
import { Badge, Button } from '@/components/ui';

export const AgenticProblemListPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [problems, setProblems] = useState<CodingProblem[]>([]);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const itemsPerPage = 10;

  useEffect(() => {
    if (topic) {
      setProblems(agenticDataService.getCodingProblemsByTopic(topic));
      setCurrentPage(1);
    }
    
    // Fetch solved IDs asynchronously
    const fetchSolved = async () => {
      const ids = await agenticProgressService.getSolvedProblems(user?.id || profile?.id);
      setSolvedIds(ids);
    };
    fetchSolved();
  }, [topic, user?.id, profile?.id]);

  if (!problems.length) {
    return <div className="p-8 text-center text-slate-400">Loading problems for {topic}...</div>;
  }

  // Pagination Logic
  const filteredProblems = problems.filter(p => difficultyFilter === 'All' || p.difficulty === difficultyFilter);
  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProblems = filteredProblems.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  return (
    <div className="space-y-8 select-none py-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/agentic-ai')} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Code2 className="w-8 h-8 text-emerald-400" />
            {topic} Problems
          </h1>
          <p className="text-sm text-slate-400">
            Master {topic} with these curated LeetCode style challenges.
          </p>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="flex gap-2 mb-4">
        {['All', 'Easy', 'Medium', 'Hard'].map(level => (
          <button
            key={level}
            onClick={() => { setDifficultyFilter(level as any); setCurrentPage(1); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              difficultyFilter === level 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-slate-800/50 text-slate-400 border border-white/5 hover:bg-slate-700/50'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Problem List Table */}
      <div className="glass-panel overflow-hidden border border-white/10 rounded-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50 border-b border-white/10">
              <th className="py-4 px-6 text-sm font-semibold text-slate-300 w-16">Status</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-300">Title</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-300 w-32">Difficulty</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-300 w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {currentProblems.map((problem) => {
              const isCompleted = solvedIds.includes(problem.id); 
              
              return (
                <tr key={problem.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="py-4 px-6 text-center">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-slate-600 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                    <Link to={`/agentic-ai/coding/${topic}/${problem.id}`}>
                      {problem.title}
                    </Link>
                  </td>
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
                      variant={isCompleted ? "outline" : "primary"}
                      size="sm" 
                      onClick={() => navigate(`/agentic-ai/coding/${encodeURIComponent(topic || '')}/${problem.id}`)}
                    >
                      {isCompleted ? "Review" : "Solve"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center text-sm text-slate-400 bg-slate-900/30">
          <span>Showing {filteredProblems.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + itemsPerPage, filteredProblems.length)} of {filteredProblems.length} entries</span>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={handlePrevPage}
              className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-emerald-600 text-white">
              {currentPage}
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              className="px-3 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
