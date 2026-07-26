import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, Share2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { certificateService } from '@/services/certificateService';
import { CertificateCanvas } from '@/components/certificate/CertificateCanvas';
import { Button } from '@/components/ui';

export const CertificatePage: React.FC = () => {
  const { certificateId } = useParams<{ certificateId: string }>();
  const certificate = certificateService.getCertificateData(certificateId);

  const handlePrint = () => {
    window.print();
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://studypilot.ai/verify-certificate/${certificate.verificationHash}`)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8 select-none max-w-5xl mx-auto py-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <Link to="/dashboard" className="text-xs text-slate-400 hover:text-purple-400 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" /> Digital Certificate of Completion
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={handleShareLinkedIn} leftIcon={<Share2 className="w-4 h-4 text-purple-400" />}>
            Share to LinkedIn
          </Button>
          <Button variant="primary" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
            Print / Download PDF
          </Button>
        </div>
      </div>

      {/* High Resolution Certificate SVG Canvas */}
      <CertificateCanvas certificate={certificate} />
    </div>
  );
};
