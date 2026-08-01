export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  url: string;
  description: string;
  postedDate: string | null;
  jobType: string[] | null;
  companyLogo: string | null;
  rating: number | null;
  reviewsCount: number | null;
  scrapedAt: string | null;
  externalApplyLink: string | null;
  source: 'indeed' | 'demo';
}

export interface JobSearchParams {
  position: string;
  location: string;
  country?: string;
  maxItems?: number;
}

export interface JobSearchResult {
  jobs: JobListing[];
  source: 'indeed' | 'demo';
  actorRunId?: string;
  message?: string;
}

export const jobService = {
  async searchJobs(params: JobSearchParams): Promise<JobSearchResult> {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        position: params.position,
        location: params.location,
        country: params.country || 'US',
        maxItems: params.maxItems ?? 20,
      }),
    });

    const text = await res.text();
    let data: JobSearchResult & { error?: string };

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(res.ok ? 'Invalid job search response' : `Job search failed (${res.status})`);
    }

    if (!res.ok) {
      throw new Error(data.error || `Job search failed (${res.status})`);
    }

    return {
      jobs: Array.isArray(data.jobs) ? data.jobs : [],
      source: data.source === 'indeed' ? 'indeed' : 'demo',
      actorRunId: data.actorRunId,
      message: data.message,
    };
  },
};
