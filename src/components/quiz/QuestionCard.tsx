import React from 'react';
import type { QuizQuestion } from '@/types';
import { Card } from '@/components/ui';

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <Card className="p-6 sm:p-8 space-y-6">
      {/* Header Badge */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="font-semibold text-purple-300">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="font-mono text-slate-500">Single Choice</span>
      </div>

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
        {question.questionText}
      </h3>

      {/* Options List */}
      <div className="space-y-3 pt-2">
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <button
              key={idx}
              onClick={() => onSelectOption(idx)}
              className={`w-full p-4 rounded-2xl text-xs sm:text-sm text-left flex items-center justify-between transition-all select-none ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border-2 border-purple-400 text-white font-semibold shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs font-mono shrink-0 ${
                    isSelected ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {letter}
                </span>
                <span>{opt}</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  isSelected ? 'border-purple-400 bg-purple-500' : 'border-slate-700'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
