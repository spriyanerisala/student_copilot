import React from 'react';
import type { InterviewFeedbackResult } from '@/services/interviewService';
import { Award, CheckCircle2, AlertTriangle, RotateCcw, Sparkles } from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from '@/components/ui';

interface InterviewFeedbackReportProps {
  feedback: InterviewFeedbackResult;
  onRestart: () => void;
}

export const InterviewFeedbackReport: React.FC<InterviewFeedbackReportProps> = ({ feedback, onRestart }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Score Summary Card */}
      <Card className="p-8 space-y-6 border-2 border-purple-500/30 bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-900 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-purple-500/20 text-purple-300 border-4 border-purple-500 flex flex-col items-center justify-center shadow-xl font-mono">
              <span className="text-3xl font-extrabold">{feedback.overallScore}</span>
              <span className="text-[9px] text-slate-400 font-sans uppercase">OVERALL</span>
            </div>

            <div className="space-y-1">
              <Badge variant="success" size="md">Interview Evaluation Completed 🎉</Badge>
              <h2 className="text-2xl font-extrabold text-white">Strong Candidate Performance</h2>
              <p className="text-xs text-slate-300">
                AI Interviewer evaluation across Technical Accuracy, Pacing, and Problem Solving.
              </p>
            </div>
          </div>

          <Button variant="outline" onClick={onRestart} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Start New Interview
          </Button>
        </div>

        {/* Accuracy & Confidence Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Technical Accuracy</span>
              <span className="text-emerald-300 font-mono">{feedback.technicalAccuracy}%</span>
            </div>
            <ProgressBar value={feedback.technicalAccuracy} size="sm" variant="emerald" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-300">Communication & Confidence</span>
              <span className="text-purple-300 font-mono">{feedback.confidenceRating}%</span>
            </div>
            <ProgressBar value={feedback.confidenceRating} size="sm" variant="gradient" />
          </div>
        </div>
      </Card>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Strengths
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {feedback.strengths.map((str, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
                ✓ {str}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Key Areas for Improvement
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {feedback.weaknesses.map((w, idx) => (
              <li key={idx} className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                • {w}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Detailed Question Review & Model Answers */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" /> Question-by-Question AI Analysis
        </h3>

        <div className="space-y-4">
          {feedback.questionReviews.map((qr, idx) => (
            <Card key={idx} className="p-6 space-y-4 border border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-white">Q{idx + 1}: {qr.questionText}</h4>
                <Badge variant="primary">{qr.score}% Score</Badge>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="font-semibold text-purple-300">Your Answer:</span>
                  <p className="text-slate-300">{qr.userAnswer}</p>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-1 text-purple-200">
                  <span className="font-semibold text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> AI Model Ideal Response:
                  </span>
                  <p>{qr.modelAnswer}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
