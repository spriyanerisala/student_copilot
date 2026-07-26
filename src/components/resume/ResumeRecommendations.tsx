import React from 'react';
import { Link } from 'react-router-dom';
import { Target, AlertTriangle, Code, ArrowRight, BookOpen } from 'lucide-react';
import type { ResumeAnalysisResult } from '@/services/resumeService';
import { Card, Button, Badge } from '@/components/ui';

interface ResumeRecommendationsProps {
  result: ResumeAnalysisResult;
}

export const ResumeRecommendations: React.FC<ResumeRecommendationsProps> = ({ result }) => {
  return (
    <div className="space-y-6">
      {/* n8n Final Recommendation */}
      {result.n8nFinalRecommendation && (
        <Card className="p-6 bg-emerald-950/20 border-emerald-500/30">
          <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-3">
            <Target className="w-4 h-4" /> Final Verdict & Recommendation
          </h4>
          <p className="text-sm text-emerald-100/80 leading-relaxed">
            {result.n8nFinalRecommendation}
          </p>
        </Card>
      )}

      {/* Missing Skills Grid */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-rose-400" /> Missing Industry Keywords & Skills
          </h4>
          <Badge variant="danger">{(result.n8nMissingSkills || result.missingSkills).length} Skills Missing</Badge>
        </div>

        <p className="text-xs text-slate-400">
          Adding these high-demand keywords will improve your ATS resume match rate for SDE roles:
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {(result.n8nMissingSkills || result.missingSkills).map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs font-medium font-mono"
            >
              + {skill}
            </span>
          ))}
        </div>
      </Card>

      {/* Keyword Suggestions */}
      {result.n8nKeywordSuggestions && (
        <Card className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-400" /> Suggested Keywords to Add
          </h4>
          <div className="space-y-2 text-xs text-slate-300">
            {result.n8nKeywordSuggestions.map((tip, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-purple-900/10 border border-purple-500/20 flex items-start gap-2.5">
                <span className="text-purple-400 font-bold shrink-0 mt-0.5">•</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Actionable Improvement Tips */}
      <Card className="p-6 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" /> {result.n8nResumeImprovements ? 'Actionable Resume Improvements' : 'Actionable Improvement Tips'}
        </h4>

        <div className="space-y-2 text-xs text-slate-300">
          {(result.n8nResumeImprovements || result.improvementSuggestions).map((tip, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-mono flex items-center justify-center font-bold shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* n8n Interview Readiness */}
      {result.n8nInterviewReadiness && (
        <Card className="p-6 bg-indigo-950/20 border-indigo-500/30">
          <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4" /> Interview Readiness Evaluation
          </h4>
          <p className="text-sm text-indigo-100/80 leading-relaxed">
            {result.n8nInterviewReadiness}
          </p>
        </Card>
      )}

      {/* Recommended Portfolio Projects (Fallback if n8n doesn't supply them) */}
      {!result.n8nInterviewReadiness && (
        <Card className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-400" /> Recommended Portfolio Projects to Build
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.recommendedProjects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-white">{proj.title}</h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-[10px] font-mono text-purple-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Recommended Learning Path (Fallback) */}
      {!result.n8nInterviewReadiness && (
        <Card className="p-6 space-y-4 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" /> Recommended Study Path to Fix Missing Skills
          </h4>

          <div className="space-y-3">
            {result.recommendedLearningPath.map((path) => (
              <div key={path.courseId} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-white">{path.title}</h5>
                  <p className="text-[11px] text-purple-300">{path.reason}</p>
                </div>
                <Link to={`/course/${path.courseId}`}>
                  <Button size="sm" variant="primary" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Enroll Course
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
