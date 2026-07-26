import React, { useState } from 'react';
import { Download, BarChart2 } from 'lucide-react';
import { ProgressSummaryCards } from '@/components/progress/ProgressSummaryCards';
import { StudyTimeChart } from '@/components/analytics/StudyTimeChart';
import { QuizPerformanceChart } from '@/components/analytics/QuizPerformanceChart';
import { SubjectMasteryMatrix } from '@/components/analytics/SubjectMasteryMatrix';
import { SpacedRepetitionWidget } from '@/components/progress/SpacedRepetitionWidget';
import { ExportReportModal } from '@/components/analytics/ExportReportModal';
import { Button } from '@/components/ui';

export const AnalyticsPage: React.FC = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <div className="space-y-8 select-none">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20 inline-flex items-center gap-1.5">
            <BarChart2 className="w-3.5 h-3.5 text-purple-400" /> Deep Learning Analytics
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Comprehensive Analytics & Subject Mastery
          </h1>
          <p className="text-xs text-slate-400">
            Real-time metric telemetry tracking study hours, quiz accuracy, subject mastery, and spaced repetition.
          </p>
        </div>

        <Button
          onClick={() => setIsExportModalOpen(true)}
          variant="glass"
          leftIcon={<Download className="w-4 h-4 text-purple-400" />}
        >
          Export PDF Progress Report
        </Button>
      </div>

      {/* 13 Metrics Overview Cards */}
      <ProgressSummaryCards />

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StudyTimeChart />
        <QuizPerformanceChart />
      </div>

      {/* Subject Mastery Matrix */}
      <SubjectMasteryMatrix />

      {/* Spaced Repetition Queue */}
      <SpacedRepetitionWidget />

      {/* Export Report Modal */}
      <ExportReportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  );
};
