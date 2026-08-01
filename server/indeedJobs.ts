import { ApifyClient } from 'apify-client';

export const INDEED_ACTOR_ID = 'misceres/indeed-scraper';

export interface JobSearchParams {
  position: string;
  location: string;
  country?: string;
  maxItems?: number;
}

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

export interface JobSearchResult {
  jobs: JobListing[];
  source: 'indeed' | 'demo';
  actorRunId?: string;
  message?: string;
}

type RawIndeedItem = {
  id?: string;
  positionName?: string;
  company?: string;
  location?: string;
  salary?: string | null;
  url?: string;
  description?: string;
  postedAt?: string | null;
  jobType?: string[] | null;
  companyLogo?: string | null;
  rating?: number | null;
  reviewsCount?: number | null;
  scrapedAt?: string | null;
  externalApplyLink?: string | null;
  error?: string;
  errorDescription?: string;
};

function getApifyToken(): string | undefined {
  return process.env.APIFY_TOKEN || process.env.APIFY_API_TOKEN;
}

export function mapIndeedItem(item: RawIndeedItem): JobListing | null {
  if (item.error || !item.positionName) return null;

  return {
    id: String(item.id || `${item.company}-${item.positionName}`.replace(/\s+/g, '-').toLowerCase()),
    title: item.positionName,
    company: item.company || 'Unknown company',
    location: item.location || 'Not specified',
    salary: item.salary ?? null,
    url: item.url || '',
    description: item.description || '',
    postedDate: item.postedAt ?? null,
    jobType: item.jobType ?? null,
    companyLogo: item.companyLogo ?? null,
    rating: item.rating ?? null,
    reviewsCount: item.reviewsCount ?? null,
    scrapedAt: item.scrapedAt ?? null,
    externalApplyLink: item.externalApplyLink ?? null,
    source: 'indeed',
  };
}

export function getDemoJobs(params: JobSearchParams): JobListing[] {
  const query = params.position.trim() || 'Software Engineer';
  const location = params.location.trim() || 'Remote';
  const now = new Date().toISOString();

  const templates: Array<Omit<JobListing, 'id' | 'title' | 'location' | 'scrapedAt' | 'source'>> = [
    {
      company: 'Stripe',
      salary: '$140,000 - $185,000 a year',
      url: 'https://www.indeed.com/q-Software-Engineer-jobs.html',
      description:
        'Build reliable payment systems and developer tools. Strong TypeScript/React experience preferred. Collaborate with product and design on full-stack features.',
      postedDate: 'Today',
      jobType: ['Full-time'],
      companyLogo: null,
      rating: 4.3,
      reviewsCount: 820,
      externalApplyLink: null,
    },
    {
      company: 'Microsoft',
      salary: '$120,000 - $160,000 a year',
      url: 'https://www.indeed.com/q-Software-Engineer-jobs.html',
      description:
        'Join a product engineering team shipping cloud services at scale. Experience with distributed systems, APIs, and modern frontend frameworks is a plus.',
      postedDate: '1 day ago',
      jobType: ['Full-time'],
      companyLogo: null,
      rating: 4.1,
      reviewsCount: 21000,
      externalApplyLink: null,
    },
    {
      company: 'Amazon',
      salary: '$130,000 - $175,000 a year',
      url: 'https://www.indeed.com/q-Software-Engineer-jobs.html',
      description:
        'Design and implement customer-facing services. Ownership of operational excellence, code quality, and mentorship for junior engineers.',
      postedDate: '2 days ago',
      jobType: ['Full-time'],
      companyLogo: null,
      rating: 3.6,
      reviewsCount: 98000,
      externalApplyLink: null,
    },
    {
      company: 'Google',
      salary: '$145,000 - $200,000 a year',
      url: 'https://www.indeed.com/q-Software-Engineer-jobs.html',
      description:
        'Work on large-scale infrastructure and product surfaces. Strong algorithms/data structures background and production coding experience required.',
      postedDate: '3 days ago',
      jobType: ['Full-time'],
      companyLogo: null,
      rating: 4.3,
      reviewsCount: 45000,
      externalApplyLink: null,
    },
    {
      company: 'Notion',
      salary: '$125,000 - $170,000 a year',
      url: 'https://www.indeed.com/q-Software-Engineer-jobs.html',
      description:
        'Ship collaborative productivity features end-to-end. Prefer experience with React, TypeScript, and thoughtful product engineering.',
      postedDate: '4 days ago',
      jobType: ['Full-time', 'Remote'],
      companyLogo: null,
      rating: 4.0,
      reviewsCount: 210,
      externalApplyLink: null,
    },
    {
      company: 'Vercel',
      salary: '$135,000 - $180,000 a year',
      url: 'https://www.indeed.com/q-Software-Engineer-jobs.html',
      description:
        'Build developer platform experiences around Next.js and the edge network. Strong frontend systems and DX focus.',
      postedDate: '5 days ago',
      jobType: ['Full-time', 'Remote'],
      companyLogo: null,
      rating: 4.4,
      reviewsCount: 95,
      externalApplyLink: null,
    },
  ];

  const max = Math.min(params.maxItems ?? 12, templates.length);

  return templates.slice(0, max).map((job, index) => ({
    ...job,
    id: `demo-${index + 1}`,
    title: index % 2 === 0 ? query : `Senior ${query}`,
    location,
    scrapedAt: now,
    source: 'demo' as const,
  }));
}

export async function searchIndeedJobs(params: JobSearchParams): Promise<JobSearchResult> {
  const position = params.position.trim();
  const location = params.location.trim();

  if (!position) {
    throw new Error('Job title / keywords are required.');
  }

  const maxItems = Math.min(Math.max(params.maxItems ?? 20, 1), 50);
  const country = (params.country || 'US').toUpperCase();
  const token = getApifyToken();

  if (!token) {
    return {
      jobs: getDemoJobs({ position, location: location || 'Remote', maxItems, country }),
      source: 'demo',
      message:
        'APIFY_TOKEN is not configured. Showing demo listings. Add APIFY_TOKEN on the server to fetch live Indeed jobs via Apify.',
    };
  }

  const client = new ApifyClient({ token });

  const run = await client.actor(INDEED_ACTOR_ID).call(
    {
      position,
      location: location || undefined,
      country,
      maxItemsPerSearch: maxItems,
      parseCompanyDetails: false,
      saveOnlyUniqueItems: true,
      followApplyRedirects: false,
    },
    { waitSecs: 180 }
  );

  if (run.status !== 'SUCCEEDED') {
    throw new Error(`Indeed scraper failed with status: ${run.status}`);
  }

  if (!run.defaultDatasetId) {
    throw new Error('Indeed scraper finished without a dataset.');
  }

  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  const jobs = (items as RawIndeedItem[])
    .map(mapIndeedItem)
    .filter((job): job is JobListing => job !== null);

  if (jobs.length === 0) {
    return {
      jobs: [],
      source: 'indeed',
      actorRunId: run.id,
      message: 'No Indeed jobs matched this search. Try different keywords or location.',
    };
  }

  return {
    jobs,
    source: 'indeed',
    actorRunId: run.id,
  };
}
