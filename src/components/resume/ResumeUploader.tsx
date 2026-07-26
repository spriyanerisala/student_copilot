import React, { useState } from 'react';
import { FileSearch, Sparkles, AlertCircle } from 'lucide-react';
import { Button, Card, ProgressBar } from '@/components/ui';

interface ResumeUploaderProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onAnalyze, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
      setError('Please upload a valid PDF or Word document (.pdf, .docx)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds maximum limit of 10MB');
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <Card className="p-8 space-y-6 text-center border-2 border-dashed border-purple-500/30 relative">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`p-8 rounded-2xl transition-all cursor-pointer ${
          dragActive ? 'bg-purple-600/20 border-purple-400 scale-[1.01]' : 'bg-slate-900/60 hover:bg-slate-900'
        }`}
      >
        <input
          type="file"
          id="resume-upload-input"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="hidden"
        />

        <label htmlFor="resume-upload-input" className="cursor-pointer space-y-3 block">
          <div className="w-16 h-16 rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto shadow-lg">
            <FileSearch className="w-8 h-8 animate-pulse" />
          </div>

          <div>
            <p className="text-base font-bold text-white">
              Drag & Drop your Resume (PDF or Word)
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Supports .pdf, .doc, and .docx files up to 10MB
            </p>
          </div>

          <span className="inline-block px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-colors">
            Select Resume File
          </span>
        </label>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {selectedFile && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <FileSearch className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white truncate max-w-xs">{selectedFile.name}</h4>
              <p className="text-[10px] text-slate-400 font-mono">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>

          <Button onClick={handleSubmit} isLoading={isAnalyzing} rightIcon={<Sparkles className="w-4 h-4" />}>
            Calculate ATS Score
          </Button>
        </div>
      )}

      {isAnalyzing && (
        <div className="space-y-2 text-left p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30">
          <div className="flex justify-between text-xs text-purple-300 font-semibold">
            <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-purple-400 animate-spin" /> AI Resume ATS Analysis Pipeline</span>
            <span className="font-mono">Analyzing...</span>
          </div>
          <ProgressBar value={80} size="sm" variant="gradient" />
        </div>
      )}
    </Card>
  );
};
