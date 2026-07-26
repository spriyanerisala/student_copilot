import React from 'react';
import type { CertificateRecord } from '@/services/certificateService';
import { Award } from 'lucide-react';

interface CertificateCanvasProps {
  certificate: CertificateRecord;
}

export const CertificateCanvas: React.FC<CertificateCanvasProps> = ({ certificate }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-950 p-8 sm:p-12 rounded-3xl border-4 border-amber-500/40 shadow-2xl relative overflow-hidden text-center space-y-6 print:border-black print:p-4 select-none">
      {/* Decorative Background Accents */}
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header Seal & Brand */}
      <div className="flex flex-col items-center space-y-2 pt-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 font-mono font-extrabold text-2xl border-2 border-amber-200">
          SP
        </div>
        <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-widest pt-1">
          StudyPilot AI • Certificate of Excellence
        </span>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
          CERTIFICATE OF COMPLETION
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          This is to proudly certify that
        </p>
      </div>

      {/* Student Name */}
      <div className="py-2 border-b-2 border-amber-500/30 max-w-lg mx-auto">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-300 tracking-tight font-serif">
          {certificate.studentName}
        </h2>
      </div>

      {/* Course Completion Statement */}
      <div className="space-y-2 max-w-xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
        <p>
          has successfully completed all modules, practical assessments, and module quizzes for
        </p>
        <h3 className="text-lg sm:text-2xl font-bold text-white font-serif">
          {certificate.courseTitle}
        </h3>
        <p className="text-xs text-purple-300 font-mono font-semibold">
          Category: {certificate.category}
        </p>
      </div>

      {/* Footer Signatures & QR Code */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-8 border-t border-white/10 text-xs">
        {/* Date & Hash */}
        <div className="text-left space-y-1">
          <p className="text-[10px] text-slate-400 uppercase font-mono">Date Issued</p>
          <p className="font-bold text-white">{certificate.issueDate}</p>
          <p className="text-[9px] text-slate-500 font-mono">Verification: {certificate.verificationHash}</p>
        </div>

        {/* Official Gold Seal Badge */}
        <div className="flex flex-col items-center space-y-1">
          <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 border-2 border-amber-400 flex items-center justify-center shadow-lg">
            <Award className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold text-amber-300 font-mono">VERIFIED CERTIFIED</span>
        </div>

        {/* Signature & Title */}
        <div className="text-right space-y-1">
          <div className="font-serif italic text-amber-200 text-lg font-bold">
            {certificate.instructorName}
          </div>
          <p className="text-[10px] text-slate-400 font-mono">{certificate.instructorTitle}</p>
        </div>
      </div>
    </div>
  );
};
