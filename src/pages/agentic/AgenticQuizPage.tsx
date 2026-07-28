import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { agenticDataService } from '@/services/agenticDataService';
import { QuizTimer } from '@/components/quiz/QuizTimer';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { QuizResultsSummary } from '@/components/quiz/QuizResultsSummary';
import { Button } from '@/components/ui';
import type { QuizQuestion } from '@/types';

export const AgenticQuizPage: React.FC = () => {
  const { domain, topic } = useParams<{ domain: string; topic: string }>();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (domain && topic) {
      setQuestions(agenticDataService.getQuizQuestions(domain, topic));
    }
  }, [domain, topic]);

  if (questions.length === 0) {
    return <div className="p-8 text-center text-slate-400">Loading quiz...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
  };

  const calculateScore = () => {
    let count = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOption) count++;
    });
    return count;
  };

  const score = calculateScore();
  const passed = Math.round((score / questions.length) * 100) >= 70; // 70% passing mark

  return (
    <div className="space-y-8 select-none max-w-5xl mx-auto py-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">{domain} Assessment</span>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-purple-400" /> {topic}
          </h1>
        </div>

        {!isSubmitted && (
          <QuizTimer initialMinutes={15} onTimeExpired={handleSubmitQuiz} isPaused={isSubmitted} />
        )}
      </div>

      {isSubmitted ? (
        <QuizResultsSummary
          questions={questions}
          userAnswers={userAnswers}
          score={score}
          totalQuestions={questions.length}
          passed={passed}
          onRetry={handleRetry}
          onContinue={() => navigate('/agentic-ai')}
        />
      ) : (
        <div className="space-y-6">
          {/* Question Navigation Number Bar */}
          <div className="flex items-center gap-2 p-3 rounded-2xl glass-card overflow-x-auto custom-scrollbar">
            <span className="text-xs font-semibold text-slate-400 mr-2 shrink-0">Progress:</span>
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold font-mono transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow-md'
                      : isAnswered
                      ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Active Question Card */}
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedOption={userAnswers[currentQuestion.id] ?? null}
            onSelectOption={handleSelectOption}
          />

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button variant="primary" onClick={handleSubmitQuiz}>
                Submit Assessment
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Next Question
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
