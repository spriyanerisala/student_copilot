import React, { useState } from 'react';
import { ChevronDown, Award } from 'lucide-react';
import { Card } from '@/components/ui';

interface InterviewQuestion {
  question: string;
  answer: string;
}

interface InterviewQuestionsSectionProps {
  questions: InterviewQuestion[];
}

export const InterviewQuestionsSection: React.FC<InterviewQuestionsSectionProps> = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!questions || questions.length === 0) return null;

  return (
    <Card className="p-6 space-y-4">
      <h4 className="text-sm font-bold text-white flex items-center gap-2">
        <Award className="w-4 h-4 text-amber-400" /> Technical Interview Questions
      </h4>

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs font-semibold text-white hover:text-purple-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-mono flex items-center justify-center font-bold">
                    Q{idx + 1}
                  </span>
                  <span>{q.question}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/5 mt-2 pt-3">
                  <p className="font-semibold text-purple-300 mb-1">Answer Summary:</p>
                  <p>{q.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
