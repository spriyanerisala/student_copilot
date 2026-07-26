import React from 'react';
import { Printer, ShieldCheck } from 'lucide-react';
import { progressService } from '@/services/progressService';
import { Modal, Button } from '@/components/ui';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose }) => {
  const summary = progressService.getSummary();

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="StudyPilot AI - Official Progress Summary Report"
      description="Generated Verification Certificate & Analytics Breakdown"
      maxWidth="lg"
    >
      <div className="space-y-6 select-none print:bg-white print:text-black">
        {/* Verification Header Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950 to-indigo-950 border border-purple-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg font-mono">
              SP
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">StudyPilot AI Official Student Report</h4>
              <p className="text-[11px] text-purple-300 font-mono">Student ID: USR-984021 • Verification Hash: #a98f-2026</p>
            </div>
          </div>
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>

        {/* Core Key Metrics Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Courses Enrolled</span>
            <p className="text-lg font-bold text-white">{summary.purchasedCoursesCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Total Study Time</span>
            <p className="text-lg font-bold text-white">{summary.totalStudyHours}h</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Quiz Accuracy</span>
            <p className="text-lg font-bold text-emerald-400">{summary.quizAccuracyPercent}%</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase">Active Streak</span>
            <p className="text-lg font-bold text-orange-400">{summary.streakDays} Days</p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-2 text-xs text-slate-300">
          <h5 className="font-bold text-white uppercase text-[11px] tracking-wider">Active Course Progress</h5>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <p><strong className="text-purple-300">Active Course:</strong> Database Management Systems (DBMS) Mastery</p>
            <p><strong className="text-purple-300">Active Lesson:</strong> {summary.currentLessonTitle}</p>
            <p><strong className="text-purple-300">Course Completion:</strong> {summary.courseCompletionPercent}%</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10 print:hidden">
          <Button variant="outline" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
            Print / Save as PDF
          </Button>
          <Button variant="primary" onClick={onClose}>
            Close Report
          </Button>
        </div>
      </div>
    </Modal>
  );
};
