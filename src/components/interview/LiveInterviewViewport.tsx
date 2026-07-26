import React, { useState } from 'react';
import { Bot, Mic, Send, Volume2 } from 'lucide-react';
import type { InterviewQuestionItem } from '@/services/interviewService';
import { Card, Button, Badge } from '@/components/ui';

interface LiveInterviewViewportProps {
  questions: InterviewQuestionItem[];
  onSubmitAllAnswers: (answers: { [qId: string]: string }) => void;
  isEvaluating: boolean;
}

export const LiveInterviewViewport: React.FC<LiveInterviewViewportProps> = ({
  questions,
  onSubmitAllAnswers,
  isEvaluating,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({});

  const currentQuestion = questions[currentIndex];

  const handleNextQuestion = () => {
    if (!currentAnswer.trim()) return;

    const updated = { ...userAnswers, [currentQuestion.id]: currentAnswer };
    setUserAnswers(updated);
    setCurrentAnswer('');

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onSubmitAllAnswers(updated);
    }
  };

  return (
    <Card className="p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Top Status Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Live AI Session In Progress
          </span>
        </div>
        <span className="text-xs text-purple-300 font-mono font-bold">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* AI Interviewer Avatar & Speech Prompt */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full bg-purple-600/30 border-2 border-purple-400 flex items-center justify-center text-purple-300 shadow-xl shadow-purple-500/20">
            <Bot className="w-10 h-10 animate-bounce" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center">
            <Volume2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Badge variant="ai">{currentQuestion.category}</Badge>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
            "{currentQuestion.questionText}"
          </h3>
        </div>
      </div>

      {/* Candidate Answer Input */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
          <span>Type or speak your technical response:</span>
          <span className="text-[10px] text-slate-500">Press Submit when finished answering</span>
        </label>

        <textarea
          rows={5}
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          placeholder="State your technical approach clearly. Mention trade-offs, time complexity, or database parameters..."
          className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-purple-500 leading-relaxed"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Mic className="w-4 h-4 text-purple-400" />
          <span>Speech Recognition Ready</span>
        </div>

        <Button
          onClick={handleNextQuestion}
          isLoading={isEvaluating}
          disabled={!currentAnswer.trim()}
          rightIcon={<Send className="w-4 h-4" />}
        >
          {currentIndex === questions.length - 1 ? 'Submit & Evaluate Interview' : 'Next Question'}
        </Button>
      </div>
    </Card>
  );
};
