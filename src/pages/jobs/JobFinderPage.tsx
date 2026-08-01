import React, { useEffect, useState } from 'react';
import { Briefcase, Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { jobService, type JobListing } from '@/services/jobService';
import { JobSearchForm, type JobSearchFormValues } from '@/components/jobs/JobSearchForm';
import { JobCard } from '@/components/jobs/JobCard';
import { JobDetailModal } from '@/components/jobs/JobDetailModal';
import { Badge, Button, Card } from '@/components/ui';

const DEFAULT_SEARCH: JobSearchFormValues = {
  position: 'Software Engineer',
  location: 'San Francisco',
  country: 'US',
};

export const JobFinderPage: React.FC = () => {
  const [values, setValues] = useState<JobSearchFormValues>(DEFAULT_SEARCH);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [source, setSource] = useState<'indeed' | 'demo' | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const runSearch = async (searchValues: JobSearchFormValues = values) => {
    if (!searchValues.position.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setMessage(null);
    setHasSearched(true);

    try {
      const result = await jobService.searchJobs({
        position: searchValues.position.trim(),
        location: searchValues.location.trim(),
        country: searchValues.country,
        maxItems: 20,
      });
      setJobs(result.jobs);
      setSource(result.source);
      setMessage(result.message || null);
    } catch (err) {
      console.error(err);
      setJobs([]);
      setSource(null);
      setError(err instanceof Error ? err.message : 'Failed to search jobs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void runSearch(DEFAULT_SEARCH);
    // initial load only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 select-none">
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20 inline-flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5" /> Job Finder · Indeed via Apify
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Find Real Engineering Roles
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Live Indeed listings scraped with Apify (`misceres/indeed-scraper`). Search by role,
              location, and country — then open the original posting to apply.
            </p>
          </div>
          {source && (
            <Badge variant={source === 'indeed' ? 'success' : 'warning'}>
              {source === 'indeed' ? 'Live Indeed data' : 'Demo mode'}
            </Badge>
          )}
        </div>
      </div>

      <Card className="p-5 space-y-4 border border-white/10">
        <JobSearchForm
          values={values}
          isLoading={isLoading}
          onChange={setValues}
          onSubmit={() => void runSearch()}
        />
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-purple-300">
            <Loader2 className="w-4 h-4 animate-spin" />
            Fetching Indeed jobs through Apify… this can take up to a couple of minutes.
          </div>
        )}
        {message && !error && (
          <div className="text-[11px] text-amber-200/90 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <span>{message}</span>
          </div>
        )}
        {error && (
          <div className="text-[11px] text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2 flex items-center justify-between gap-3">
            <span>{error}</span>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={() => void runSearch()}
            >
              Retry
            </Button>
          </div>
        )}
      </Card>

      {hasSearched && !isLoading && jobs.length === 0 && !error && (
        <Card className="p-8 text-center space-y-2 border border-white/10">
          <p className="text-sm font-semibold text-white">No jobs found</p>
          <p className="text-xs text-slate-400">
            Try a broader title, another city, or switch country.
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onOpen={setSelectedJob} />
        ))}
      </div>

      <JobDetailModal
        job={selectedJob}
        open={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
};
