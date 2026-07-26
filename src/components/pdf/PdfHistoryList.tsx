import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import type { PdfSummaryOutput } from '@/services/pdfService';
import { Card, Button } from '@/components/ui';

interface PdfHistoryListProps {
  documents: PdfSummaryOutput[];
  onSelect: (doc: PdfSummaryOutput) => void;
}

export const PdfHistoryList: React.FC<PdfHistoryListProps> = ({ documents, onSelect }) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" /> Saved PDF Document Library
        </h4>
        <span className="text-xs text-slate-400 font-mono">{documents.length} Files Saved</span>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-purple-500/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">{doc.fileName}</h5>
                <p className="text-[10px] text-slate-400 font-mono">{doc.fileSize} • Uploaded: {doc.uploadDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button size="sm" variant="glass" onClick={() => onSelect(doc)} rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View Summary
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
