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
    // Simulate processing time
    await new Promise((res) => setTimeout(res, 1500));

    const questions = this.getQuestionSet(type, role);
    let totalScore = 0;
    let strengths: string[] = [];
    let weaknesses: string[] = [];

    const questionReviews = questions.map((q) => {
      const ans = (answers[q.id] || '').trim();
      const lowerAns = ans.toLowerCase();
      
      let score = 0;
      let feedback = '';
      let matchedPoints = 0;
      
      const isClueless = !ans || lowerAns.includes("don't know") || lowerAns.includes("do not know") || lowerAns.includes("no idea") || lowerAns.includes("not sure") || ans.length < 10;
      
      if (isClueless) {
        score = Math.floor(Math.random() * 15) + 10; // 10-25
        feedback = 'You did not provide a substantial answer. In a real interview, if you do not know the exact answer, try to relate it to a similar concept you know or explain how you would find out.';
        weaknesses.push(`Struggled with the topic: ${q.category}`);
      } else {
        // Evaluate key points
        q.expectedKeyPoints.forEach(point => {
          const keywords = point.toLowerCase().split(' ').filter(w => w.length > 4);
          let matchCount = 0;
          keywords.forEach(kw => {
            if (lowerAns.includes(kw)) matchCount++;
          });
          if (matchCount > 0 || keywords.length === 0) matchedPoints++;
        });
        
        const coverage = q.expectedKeyPoints.length > 0 ? (matchedPoints / q.expectedKeyPoints.length) : 0.5;
        score = 40 + Math.floor(coverage * 50) + Math.min(10, Math.floor(ans.length / 50));
        score = Math.min(100, Math.max(0, score));
        
        if (score >= 80) {
          feedback = 'Excellent answer! You covered the core concepts well.';
          strengths.push(`Strong understanding of ${q.category}`);
        } else if (score >= 60) {
          feedback = 'Good attempt, but you missed some critical details. Try to incorporate the key points mentioned below.';
        } else {
          feedback = 'Your answer lacked depth. Focus on the core architectural concepts and trade-offs.';
          weaknesses.push(`Needs review on: ${q.category}`);
        }
      }

      totalScore += score;
      
      const improvedAnswer = `An effective real-time interview response: "Regarding this topic, I would highlight that ${q.expectedKeyPoints.join(', and ')}." Structuring your answer with clear definitions and examples will greatly improve your performance.`;

      return {
        questionText: q.questionText,
        userAnswer: ans || '(No answer provided)',
        modelAnswer: improvedAnswer,
        score,
        feedback,
      };
    });

    const overallScore = Math.round(totalScore / questions.length);
    
    // Deduplicate strengths and weaknesses
    strengths = Array.from(new Set(strengths));
    weaknesses = Array.from(new Set(weaknesses));
    
    if (strengths.length === 0) strengths.push('Willingness to practice and learn through mock interviews.');
    if (weaknesses.length === 0) weaknesses.push('Continue practicing to maintain perfect fluency.');

    return {
      id: `int-fb-${Date.now()}`,
      overallScore,
      technicalAccuracy: overallScore,
      confidenceRating: Math.min(100, overallScore + 5),
      strengths: strengths.slice(0, 3),
      weaknesses: weaknesses.slice(0, 3),
      questionReviews,
    };
  },
};
