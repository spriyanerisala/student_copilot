import React from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, Sparkles, BookOpen } from 'lucide-react';
import type { QuizQuestion } from '@/types';
import { Card, Button, Badge } from '@/components/ui';

interface QuizResultsSummaryProps {
  questions: QuizQuestion[];
  userAnswers: { [questionId: string]: number };
  score: number;
  totalQuestions: number;
  passed: boolean;
  onRetry: () => void;
  onContinue: () => void;
}

export const QuizResultsSummary: React.FC<QuizResultsSummaryProps> = ({
  questions,
  userAnswers,
  score,
  totalQuestions,
  passed,
  onRetry,
  onContinue,
}) => {
  const scorePercent = Math.round((score / totalQuestions) * 100);

  // Detect weak topics based on missed questions
  const missedQuestions = questions.filter((q) => userAnswers[q.id] !== q.correctOption);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Score Banner Header */}
      <Card
        className={`p-8 text-center space-y-4 border-2 ${
          passed
            ? 'border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 to-slate-900 shadow-2xl shadow-emerald-500/10'
            : 'border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-slate-900 shadow-2xl shadow-rose-500/10'
        }`}
      >
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-2xl font-bold font-mono border-4 shadow-xl ${
            passed
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
              : 'bg-rose-500/20 text-rose-300 border-rose-500'
          }`}
        >
          {scorePercent}%
        </div>

        <div className="space-y-1">
          <Badge variant={passed ? 'success' : 'danger'} size="md">
            {passed ? 'Assessment Passed 🎉' : 'Retake Recommended ⚡'}
          </Badge>
          <h2 className="text-2xl font-extrabold text-white">
            {passed ? 'Great Job! You Mastered This Module' : 'Keep Practicing to Earn Your Certificate'}
          </h2>
          <p className="text-xs text-slate-300">
            You scored <strong className="text-white font-mono">{score}</strong> out of{' '}
            <strong className="text-white font-mono">{totalQuestions}</strong> questions correctly (Passing threshold: 80%).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button variant="outline" onClick={onRetry} leftIcon={<RotateCcw className="w-4 h-4" />}>
            Retry Quiz
          </Button>
          <Button variant="primary" onClick={onContinue} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Continue Learning
          </Button>
        </div>
      </Card>

      {/* Weak Topics Recommendation Box */}
      {missedQuestions.length > 0 && (
        <Card className="p-6 space-y-3 bg-purple-950/30 border border-purple-500/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white">AI Weak Topic Detection & Recommendations</h3>
          </div>
          <p className="text-xs text-slate-300">
            Our AI Mentor identified topics you should review before moving to the next module:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {missedQuestions.map((q, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-medium flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-400" /> Topic {idx + 1}: {q.questionText.slice(0, 35)}...
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Detailed Question Review */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" /> Detailed Question Review
        </h3>

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice === q.correctOption;

            return (
              <Card key={q.id} className="p-6 space-y-4 border border-slate-800">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold font-mono flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{q.questionText}</h4>
                  </div>
                  {isCorrect ? (
                    <Badge variant="success">Correct</Badge>
                  ) : (
                    <Badge variant="danger">Incorrect</Badge>
                  )}
                </div>

                {/* Options List Review */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isUserPick = userChoice === oIdx;
                    const isCorrectPick = oIdx === q.correctOption;

                    return (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-xl text-xs flex items-center justify-between border ${
                          isCorrectPick
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200 font-semibold'
                            : isUserPick && !isCorrect
                            ? 'bg-rose-500/15 border-rose-500/40 text-rose-200 font-semibold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span>
                          {String.fromCharCode(65 + oIdx)}. {opt}
                        </span>
                        {isCorrectPick && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                        {isUserPick && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-purple-400">Explanation:</span>
                  <p>{q.explanation}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
