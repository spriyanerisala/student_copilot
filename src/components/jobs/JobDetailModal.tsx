import React from 'react';
import { Building2, ExternalLink, MapPin, Banknote, Clock, Star } from 'lucide-react';
import type { JobListing } from '@/services/jobService';
import { Badge, Button, Modal } from '@/components/ui';

interface JobDetailModalProps {
  job: JobListing | null;
  open: boolean;
  onClose: () => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({ job, open, onClose }) => {
  if (!job) return null;

  const applyUrl = job.applyUrl || job.externalApplyLink || job.url;

  const handleApply = () => {
    if (!applyUrl) return;
    window.open(applyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal isOpen={open} onClose={onClose} title={job.title} maxWidth="xl">
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="space-y-1 min-w-0">
            <p className="text-sm font-semibold text-white">{job.company}</p>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {job.location}
              </span>
              {job.salary && (
                <span className="inline-flex items-center gap-1 text-emerald-300">
                  <Banknote className="w-3 h-3" /> {job.salary}
                </span>
              )}
              {job.postedDate && (
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {job.postedDate}
                </span>
              )}
              {typeof job.rating === 'number' && (
                <span className="inline-flex items-center gap-1 text-amber-300">
                  <Star className="w-3 h-3" /> {job.rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="success" size="sm">
            Live from Indeed
          </Badge>
          {job.externalApplyLink && (
            <Badge variant="primary" size="sm">
              Direct company apply
            </Badge>
          )}
          {(job.jobType || []).map((type) => (
            <Badge key={type} variant="secondary" size="sm">
              {type}
            </Badge>
          ))}
        </div>

        <div className="max-h-[40vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
            {job.description || 'No description available for this listing.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {applyUrl && (
            <Button rightIcon={<ExternalLink className="w-3.5 h-3.5" />} onClick={handleApply}>
              Apply Now
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
