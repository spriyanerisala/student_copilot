import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Card, Button } from '@/components/ui';

interface PracticeQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

interface PracticeQuestionsWidgetProps {
  questions: PracticeQuestion[];
}

export const PracticeQuestionsWidget: React.FC<PracticeQuestionsWidgetProps> = ({ questions }) => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!questions || questions.length === 0) return null;

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (submitted) return;
    setSelectedOptions((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleReset = () => {
    setSelectedOptions({});
    setSubmitted(false);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-purple-400" /> Lesson Practice Questions
        </h4>
        {submitted && (
          <Button size="sm" variant="ghost" onClick={handleReset} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
            Retry
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selected = selectedOptions[qIdx];
          const isCorrect = selected === q.answerIndex;

          return (
            <div key={qIdx} className="space-y-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <p className="text-xs font-bold text-white">
                {qIdx + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isOptionSelected = selected === oIdx;
                  const showCorrect = submitted && oIdx === q.answerIndex;
                  const showWrong = submitted && isOptionSelected && !isCorrect;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      className={`w-full p-3 rounded-xl text-xs text-left flex items-center justify-between transition-all ${
                        showCorrect
                          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-semibold'
                          : showWrong
                          ? 'bg-rose-500/20 border border-rose-500/40 text-rose-200 font-semibold'
                          : isOptionSelected
                          ? 'bg-purple-600/30 border border-purple-500/50 text-white font-semibold'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      {showCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {showWrong && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted && (
        <Button onClick={() => setSubmitted(true)} className="w-full">
          Submit & Check Answers
        </Button>
      )}
    </Card>
  );
};
