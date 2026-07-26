import React, { useState } from 'react';
import type { PdfSummaryOutput } from '@/services/pdfService';
import { InteractiveFlashcards } from '@/components/lesson/InteractiveFlashcards';
import { PracticeQuestionsWidget } from '@/components/lesson/PracticeQuestionsWidget';
import { FileText, CheckCircle2, BookOpen, Sparkles, HelpCircle } from 'lucide-react';
import { Card, Tabs } from '@/components/ui';

interface PdfOutputViewerProps {
  output: PdfSummaryOutput;
}

export const PdfOutputViewer: React.FC<PdfOutputViewerProps> = ({ output }) => {
  const [activeTab, setActiveTab] = useState('summary');

  const tabs = [
    { id: 'summary', label: 'Executive Summary', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'notes', label: 'Key Points & Notes', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Sparkles className="w-3.5 h-3.5" />, badge: output.flashcards.length },
    { id: 'mcqs', label: 'Practice MCQs', icon: <HelpCircle className="w-3.5 h-3.5" />, badge: output.mcqs.length },
  ];

  return (
    <div className="space-y-6">
      {/* File Metadata Header */}
      <div className="p-4 rounded-2xl glass-card bg-slate-900/90 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{output.fileName}</h3>
            <p className="text-[11px] text-slate-400 font-mono">Size: {output.fileSize} • Uploaded: {output.uploadDate}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold w-fit">
          AI Summarized ✓
        </span>
      </div>

      {/* Tabs Bar */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab 1: Executive Summary */}
      {activeTab === 'summary' && (
        <Card className="p-6 space-y-4 leading-relaxed">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> Executive AI Summary
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            {output.summary}
          </p>
        </Card>
      )}

      {/* Tab 2: Key Points & Notes */}
      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Bullet Takeaways
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {output.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" /> Detailed Revision Notes
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {output.notes.map((note, idx) => (
                <li key={idx} className="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-200">
                  {note}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {/* Tab 3: Flashcards */}
      {activeTab === 'flashcards' && (
        <InteractiveFlashcards flashcards={output.flashcards} />
      )}

      {/* Tab 4: Practice MCQs */}
      {activeTab === 'mcqs' && (
        <PracticeQuestionsWidget questions={output.mcqs.map((m) => ({ question: m.questionText, options: m.options, answerIndex: m.correctOption }))} />
      )}
    </div>
  );
};
