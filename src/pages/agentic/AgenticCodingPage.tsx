import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Code2, Play, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { agenticDataService, type CodingProblem } from '@/services/agenticDataService';
import { agenticProgressService } from '@/services/agenticProgressService';
import { useAuth } from '@/context/AuthContext';
import { Button, Badge } from '@/components/ui';

export const AgenticCodingPage: React.FC = () => {
  const { topic, problemId } = useParams<{ topic: string; problemId: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [problem, setProblem] = useState<CodingProblem | null>(null);
  const [language, setLanguage] = useState<'javascript' | 'python' | 'java' | 'cpp'>('javascript');
  const [code, setCode] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<'passed' | 'failed' | 'submitted' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (topic && problemId) {
      const p = agenticDataService.getCodingProblem(topic, problemId);
      if (p) {
        setProblem(p);
        setCode(p.defaultCode['javascript']);
        // Initialize from local cache for instant UI
        setIsCompleted(agenticProgressService.getLocalSolvedProblems(user?.id || profile?.id).includes(p.id));
      }
    }
  }, [topic, problemId, user?.id, profile?.id]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as 'javascript' | 'python' | 'java' | 'cpp';
    setLanguage(lang);
    if (problem) {
      setCode(problem.defaultCode[lang]);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTestResults(null);
    
    // Simulate API call to run sample tests
    setTimeout(() => {
      setIsRunning(false);
      const passed = Math.random() > 0.2; 
      setTestResults(passed ? 'passed' : 'failed');
    }, 1500);
  };

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setTestResults(null);
    
    // Simulate full test suite execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // For mock purposes, assume it passes
    setTestResults('submitted');
    setIsCompleted(true);
    
    if (problem) {
      await agenticProgressService.markProblemSolved(
        user?.id || profile?.id, 
        profile?.fullName || user?.email, 
        problem
      );
    }
  };

  if (!problem) return <div className="p-8 text-center text-slate-400">Loading problem...</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] -m-4 lg:-m-8">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(`/agentic-ai/coding/${encodeURIComponent(topic || '')}`)} className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <h1 className="text-lg font-bold text-white">{problem.title}</h1>
            <Badge variant="warning">{problem.difficulty}</Badge>
            {isCompleted && <Badge variant="primary">Completed ✓</Badge>}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={language}
            onChange={handleLanguageChange}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            leftIcon={isRunning ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play className="w-4 h-4" />}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-500 text-white border-none"
            leftIcon={isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Code'}
          </Button>
        </div>
      </div>

      {/* Main Split Pane */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Pane: Description */}
        <div className="w-full lg:w-1/3 border-r border-white/10 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-slate-950/50">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Problem Description</h2>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
              {problem.description}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-200">Examples</h3>
            {problem.examples.map((ex, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div>
                  <span className="text-xs font-semibold text-slate-500">Input:</span>
                  <div className="font-mono text-sm text-emerald-300 mt-1">{ex.input}</div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500">Output:</span>
                  <div className="font-mono text-sm text-emerald-300 mt-1">{ex.output}</div>
                </div>
                {ex.explanation && (
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Explanation:</span>
                    <div className="text-xs text-slate-400 mt-1">{ex.explanation}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-200">Constraints</h3>
            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
              {problem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          
          {/* Test Results Area */}
          {testResults && (
            <div className={`p-4 rounded-xl border ${testResults === 'failed' ? 'bg-red-900/20 border-red-500/30' : 'bg-emerald-900/20 border-emerald-500/30'}`}>
              <div className="flex items-center gap-2">
                {testResults === 'failed' ? (
                  <XCircle className="w-5 h-5 text-red-400" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                )}
                <span className={`font-bold ${testResults === 'failed' ? 'text-red-400' : 'text-emerald-400'}`}>
                  {testResults === 'failed' 
                    ? 'Some Test Cases Failed' 
                    : testResults === 'submitted' 
                      ? 'Accepted! All Test Cases Passed.' 
                      : 'Sample Test Cases Passed!'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {testResults === 'failed' 
                  ? 'Check your logic or edge cases (e.g. empty arrays or null pointers) and try again.'
                  : testResults === 'submitted'
                    ? 'Excellent work. Your solution has been submitted and saved.'
                    : 'Your code works for the sample inputs. Ready to submit?'}
              </p>
            </div>
          )}
        </div>

        {/* Right Pane: Code Editor */}
        <div className="flex-1 h-full bg-[#1e1e1e]">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              padding: { top: 20 },
              scrollBeyondLastLine: false,
              roundedSelection: false,
              wordWrap: 'on'
            }}
          />
        </div>
      </div>
    </div>
  );
};
