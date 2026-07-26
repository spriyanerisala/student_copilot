export interface ResumeAnalysisResult {
  id: string;
  fileName: string;
  fileSize: string;
  analyzedAt: string;
  atsScore: number; // 0 - 100
  subScores: {
    keywordMatch: number;
    formatting: number;
    impactMetrics: number;
    technicalDepth: number;
  };
  missingSkills: string[];
  improvementSuggestions: string[];
  recommendedProjects: { title: string; description: string; techStack: string[] }[];
  recommendedLearningPath: { courseId: string; title: string; reason: string }[];
}

export const resumeService = {
  async analyzeResume(file: File): Promise<ResumeAnalysisResult> {
    // Simulate AI ATS analysis processing pipeline
    await new Promise((res) => setTimeout(res, 2000));

    const fileName = file.name || 'Ahnaf_Habib_FullStack_Resume.pdf';
    const fileSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    return {
      id: `res-${Date.now()}`,
      fileName,
      fileSize,
      analyzedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      atsScore: 85,
      subScores: {
        keywordMatch: 82,
        formatting: 95,
        impactMetrics: 78,
        technicalDepth: 88,
      },
      missingSkills: ['Apache Kafka', 'Redis Caching', 'System Design Rate Limiting', 'Docker & Kubernetes', 'BCNF Normalization'],
      improvementSuggestions: [
        'Add quantifiable metrics to experience bullets (e.g. "Reduced API latency by 35% using Redis caching").',
        'Include System Design & Microservices keywords under your Technical Skills section.',
        'Add links to deployed GitHub projects or live web app URLs.',
      ],
      recommendedProjects: [
        {
          title: 'Distributed API Rate Limiter',
          description: 'Implement Token Bucket rate limiting in Redis with Lua scripts handling 10k req/sec.',
          techStack: ['Node.js', 'Redis', 'Lua', 'TypeScript'],
        },
        {
          title: 'Full-Stack LMS Platform',
          description: 'Build a production SaaS application with React, Supabase Auth, PostgreSQL, and Stripe.',
          techStack: ['React', 'Supabase', 'Tailwind', 'Stripe'],
        },
      ],
      recommendedLearningPath: [
        {
          courseId: 'sys-201',
          title: 'High-Scale System Design & Architecture',
          reason: 'Master Redis, Kafka & Microservices missing skills identified in your resume.',
        },
        {
          courseId: 'dbms-101',
          title: 'Database Management Systems (DBMS) Mastery',
          reason: 'Strengthen database normalization and transaction indexing skills for SDE roles.',
        },
      ],
    };
  },

  getSavedAnalyses(): ResumeAnalysisResult[] {
    return [
      {
        id: 'res-1',
        fileName: 'Ahnaf_Habib_FullStack_Resume.pdf',
        fileSize: '1.2 MB',
        analyzedAt: 'Jul 22, 2026',
        atsScore: 85,
        subScores: { keywordMatch: 82, formatting: 95, impactMetrics: 78, technicalDepth: 88 },
        missingSkills: ['Apache Kafka', 'Redis Caching', 'System Design'],
        improvementSuggestions: ['Add quantifiable metrics to bullets'],
        recommendedProjects: [],
        recommendedLearningPath: [],
      },
    ];
  },
};
