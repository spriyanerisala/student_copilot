import React from 'react';
import { Building2, MapPin, Banknote, Clock, Star, ExternalLink } from 'lucide-react';
import type { JobListing } from '@/services/jobService';
import { Badge, Button, Card } from '@/components/ui';

interface JobCardProps {
  job: JobListing;
  onOpen: (job: JobListing) => void;
}

function openApply(job: JobListing) {
  const applyUrl = job.applyUrl || job.externalApplyLink || job.url;
  if (!applyUrl) return;
  window.open(applyUrl, '_blank', 'noopener,noreferrer');
}

export const JobCard: React.FC<JobCardProps> = ({ job, onOpen }) => {
  return (
    <Card className="p-5 space-y-4 border border-white/10 bg-slate-950/50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center overflow-hidden shrink-0">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="text-sm font-bold text-white leading-snug truncate">{job.title}</h3>
            <p className="text-xs text-slate-300 truncate">{job.company}</p>
          </div>
        </div>
        <Badge variant="success" size="sm">
          Indeed
        </Badge>
      </div>

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
            {job.reviewsCount ? ` (${job.reviewsCount})` : ''}
          </span>
        )}
      </div>

      {job.jobType && job.jobType.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.jobType.map((type) => (
            <Badge key={type} variant="secondary" size="sm">
              {type}
            </Badge>
          ))}
        </div>
      )}

      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
        {job.description || 'No description available.'}
      </p>

      <div className="flex items-center gap-2 pt-1">
        <Button
          size="sm"
          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
          onClick={() => openApply(job)}
        >
          Apply Now
        </Button>
        <Button size="sm" variant="outline" onClick={() => onOpen(job)}>
          View details
        </Button>
      </div>
    </Card>
  );
};
