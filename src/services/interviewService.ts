export type InterviewType = 'hr' | 'technical' | 'system_design';
export type TargetRole = 'frontend' | 'backend' | 'fullstack';

export interface InterviewQuestionItem {
  id: string;
  questionText: string;
  category: string;
  expectedKeyPoints: string[];
}

export interface InterviewFeedbackResult {
  id: string;
  overallScore: number; // 0 - 100
  technicalAccuracy: number; // %
  confidenceRating: number; // %
  strengths: string[];
  weaknesses: string[];
  questionReviews: {
    questionText: string;
    userAnswer: string;
    modelAnswer: string;
    score: number;
    feedback: string;
  }[];
}

const QUESTION_SETS: { [key: string]: InterviewQuestionItem[] } = {
  'technical-fullstack': [
    {
      id: 'iq-1',
      questionText: 'Explain the difference between optimistic concurrency control and pessimistic locking in relational databases.',
      category: 'Database Architecture',
      expectedKeyPoints: ['Pessimistic locks row using SELECT FOR UPDATE', 'Optimistic checks version column at commit time', 'Optimistic is better for high read/low write workloads'],
    },
    {
      id: 'iq-2',
      questionText: 'How would you mitigate CORS errors and handle secure JWT token storage in a React + Node.js web application?',
      category: 'Full-Stack Security',
      expectedKeyPoints: ['Store JWT in HttpOnly SameSite cookies', 'Avoid localStorage due to XSS risks', 'Configure CORS origin whitelist'],
    },
    {
      id: 'iq-3',
      questionText: 'Describe how React 19 Server Components improve page load performance compared to Client Components.',
      category: 'Frontend Engineering',
      expectedKeyPoints: ['Zero bundle size for server components', 'Execute directly on server near DB', 'Streaming SSR with Suspense'],
    },
  ],
  'system_design-backend': [
    {
      id: 'sd-1',
      questionText: 'Design a distributed rate limiter that handles 100,000 requests per second across multiple API gateway nodes.',
      category: 'System Design',
      expectedKeyPoints: ['Token Bucket algorithm', 'Redis cluster with Lua scripts for atomic increments', 'Sliding Window Log'],
    },
  ],
  'hr-fullstack': [
    {
      id: 'hr-1',
      questionText: 'Tell me about a time you faced a critical production bug right before deployment. How did you handle it under pressure?',
      category: 'Behavioral',
      expectedKeyPoints: ['STAR method', 'Communication with team', 'Root cause post-mortem'],
    },
  ],
};

export const interviewService = {
  getQuestionSet(type: InterviewType, role: TargetRole): InterviewQuestionItem[] {
    const key = `${type}-${role}`;
    return QUESTION_SETS[key] || QUESTION_SETS['technical-fullstack'];
  },

  async evaluateInterview(
    type: InterviewType,
    role: TargetRole,
    answers: { [qId: string]: string }
  ): Promise<InterviewFeedbackResult> {
    // Simulate AI feedback evaluation processing
    await new Promise((res) => setTimeout(res, 2200));

    const questions = this.getQuestionSet(type, role);

    const questionReviews = questions.map((q) => {
      const ans = answers[q.id] || 'Candidate provided a general explanation without specific code metrics.';
      return {
        questionText: q.questionText,
        userAnswer: ans,
        modelAnswer: `Ideal Response: State core definition clearly, mention trade-offs, and cite real-world metrics. For example, ${q.expectedKeyPoints.join('; ')}.`,
        score: 88,
        feedback: 'Solid technical depth! To achieve a perfect score, mention quantitative performance benchmarks.',
      };
    });

    return {
      id: `int-fb-${Date.now()}`,
      overallScore: 86,
      technicalAccuracy: 88,
      confidenceRating: 84,
      strengths: [
        'Clear structure using industry terminology (ACID, B+ Trees, Token Bucket).',
        'Strong understanding of database transaction trade-offs.',
        'Good communication pacing.',
      ],
      weaknesses: [
        'Could include more specific latency numbers (e.g. < 5ms Redis lookups).',
        'Provide concrete project examples from personal experience.',
      ],
      questionReviews,
    };
  },
};
