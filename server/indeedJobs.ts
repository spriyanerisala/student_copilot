import { ApifyClient } from 'apify-client';

export const INDEED_ACTOR_ID = 'misceres/indeed-scraper';

/** Static key embedded in the Indeed iOS app (same approach as JobSpy / Apify Indeed scrapers). */
const INDEED_MOBILE_API_KEY =
  '161092c2017b5bbab13edb12461a62d5a833871e7cad6d9d475304573de67ac8';

const INDEED_GRAPHQL_URL = 'https://apis.indeed.com/graphql';

const COUNTRY_CONFIG: Record<string, { domain: string; co: string; locale: string }> = {
  US: { domain: 'www.indeed.com', co: 'US', locale: 'en-US' },
  IN: { domain: 'in.indeed.com', co: 'IN', locale: 'en-IN' },
  GB: { domain: 'uk.indeed.com', co: 'GB', locale: 'en-GB' },
  CA: { domain: 'ca.indeed.com', co: 'CA', locale: 'en-CA' },
  DE: { domain: 'de.indeed.com', co: 'DE', locale: 'de-DE' },
  AU: { domain: 'au.indeed.com', co: 'AU', locale: 'en-AU' },
};

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
  source: 'indeed';
}

export interface JobSearchResult {
  jobs: JobListing[];
  source: 'indeed';
  actorRunId?: string;
  message?: string;
  provider: 'apify' | 'indeed-api';
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
};

function getApifyToken(): string | undefined {
  return process.env.APIFY_TOKEN || process.env.APIFY_API_TOKEN;
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

function formatPostedDate(datePublishedMs?: number | null): string | null {
  if (!datePublishedMs) return null;
  const posted = new Date(datePublishedMs);
  if (Number.isNaN(posted.getTime())) return null;

  const diffMs = Date.now() - posted.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;
  return posted.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatSalary(compensation: any, detailedSalary?: string | null): string | null {
  if (detailedSalary) {
    // Normalize "Rs." / "INR" style strings Indeed sometimes returns
    return detailedSalary
      .replace(/\bRs\.?\s*/gi, '₹')
      .replace(/\bINR\s*/gi, '₹');
  }

  const base = compensation?.baseSalary || compensation?.estimated?.baseSalary;
  if (!base?.range) return null;

  const currency = compensation?.currencyCode || compensation?.estimated?.currencyCode || 'USD';
  const unit = String(base.unitOfWork || 'YEAR').toLowerCase();
  const min = base.range.min;
  const max = base.range.max;
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(n);

  const periodLabel =
    unit === 'year' ? 'year' : unit === 'month' ? 'month' : unit === 'hour' ? 'hour' : unit;

  if (min != null && max != null) return `${fmt(min)} - ${fmt(max)} a ${periodLabel}`;
  if (min != null) return `From ${fmt(min)} a ${periodLabel}`;
  if (max != null) return `Up to ${fmt(max)} a ${periodLabel}`;
  return null;
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

async function searchIndeedViaGraphQL(params: JobSearchParams): Promise<JobSearchResult> {
  const maxItems = Math.min(Math.max(params.maxItems ?? 20, 1), 50);
  const countryKey = (params.country || 'IN').toUpperCase();
  const country = COUNTRY_CONFIG[countryKey] || COUNTRY_CONFIG.IN;
  const position = params.position.replace(/"/g, '\\"');
  const location = params.location.trim().replace(/"/g, '\\"');

  const locationClause = location
    ? `location: {where: "${location}", radius: 50, radiusUnit: MILES}`
    : '';

  const query = `
    query GetJobData {
      jobSearch(
        what: "${position}"
        ${locationClause}
        limit: ${maxItems}
        sort: RELEVANCE
      ) {
        results {
          job {
            key
            title
            datePublished
            description { html }
            location {
              city
              admin1Code
              countryCode
              formatted { short long }
            }
            compensation {
              estimated {
                currencyCode
                baseSalary {
                  unitOfWork
                  range { ... on Range { min max } }
                }
              }
              baseSalary {
                unitOfWork
                range { ... on Range { min max } }
              }
              currencyCode
            }
            attributes { key label }
            employer {
              name
              dossier {
                images { squareLogoUrl }
              }
            }
            recruit {
              viewJobUrl
              detailedSalary
            }
          }
        }
      }
    }
  `;

  const response = await fetch(INDEED_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Host: 'apis.indeed.com',
      'content-type': 'application/json',
      'indeed-api-key': INDEED_MOBILE_API_KEY,
      accept: 'application/json',
      'indeed-locale': country.locale,
      'accept-language': `${country.locale},en;q=0.9`,
      'user-agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Indeed App 193.1',
      'indeed-app-info': 'appv=193.1; appid=com.indeed.jobsearch; osv=16.6.1; os=ios; dtype=phone',
      'indeed-co': country.co,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Indeed API failed (${response.status}): ${body.slice(0, 200)}`);
  }

  const payload = (await response.json()) as any;
  if (payload.errors?.length) {
    throw new Error(payload.errors[0]?.message || 'Indeed GraphQL returned errors');
  }

  const results: any[] = payload?.data?.jobSearch?.results || [];
  const scrapedAt = new Date().toISOString();

  const jobs: JobListing[] = [];

  for (const row of results) {
    const job = row?.job;
    if (!job?.key || !job?.title) continue;

    const loc =
      job.location?.formatted?.long ||
      job.location?.formatted?.short ||
      [job.location?.city, job.location?.admin1Code].filter(Boolean).join(', ') ||
      'Not specified';

    const rawLabels: string[] = Array.isArray(job.attributes)
      ? job.attributes
          .map((a: { label?: string }) => a?.label)
          .filter((label: unknown): label is string => typeof label === 'string' && label.length > 0)
      : [];

    const jobTypes = [
      ...new Set(
        rawLabels.filter((label) =>
          /full-?time|part-?time|contract|internship|temporary|remote/i.test(label)
        )
      ),
    ];

    jobs.push({
      id: String(job.key),
      title: job.title,
      company: job.employer?.name || 'Unknown company',
      location: loc,
      salary: formatSalary(job.compensation, job.recruit?.detailedSalary),
      url: `https://${country.domain}/viewjob?jk=${job.key}`,
      description: stripHtml(job.description?.html || ''),
      postedDate: formatPostedDate(job.datePublished),
      jobType: jobTypes.length > 0 ? jobTypes : null,
      companyLogo: job.employer?.dossier?.images?.squareLogoUrl || null,
      rating: null,
      reviewsCount: null,
      scrapedAt,
      externalApplyLink: job.recruit?.viewJobUrl || null,
      source: 'indeed',
    });
  }

  return {
    jobs,
    source: 'indeed',
    provider: 'indeed-api',
    message:
      jobs.length === 0
        ? 'No Indeed jobs matched this search. Try different keywords or location.'
        : undefined,
  };
}

async function searchIndeedViaApify(params: JobSearchParams, token: string): Promise<JobSearchResult> {
  const maxItems = Math.min(Math.max(params.maxItems ?? 20, 1), 50);
  const country = (params.country || 'IN').toUpperCase();
  const client = new ApifyClient({ token });

  const run = await client.actor(INDEED_ACTOR_ID).call(
    {
      position: params.position,
      location: params.location || undefined,
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

  return {
    jobs,
    source: 'indeed',
    actorRunId: run.id,
    provider: 'apify',
    message:
      jobs.length === 0
        ? 'No Indeed jobs matched this search. Try different keywords or location.'
        : undefined,
  };
}

export async function searchIndeedJobs(params: JobSearchParams): Promise<JobSearchResult> {
  const position = params.position.trim();
  const location = params.location.trim();

  if (!position) {
    throw new Error('Job title / keywords are required.');
  }

  const searchParams: JobSearchParams = {
    position,
    location,
    country: params.country || 'IN',
    maxItems: params.maxItems,
  };

  const token = getApifyToken();
  if (token) {
    try {
      return await searchIndeedViaApify(searchParams, token);
    } catch (error) {
      console.warn('[indeedJobs] Apify failed, falling back to Indeed API:', error);
    }
  }

  return searchIndeedViaGraphQL(searchParams);
}
