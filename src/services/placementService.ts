export interface PlacementMetrics {
  overallScore: number; // 0 - 100
  status: string;
  technicalKnowledgeScore: number;
  problemSolvingScore: number;
  resumeStrengthScore: number;
  mockInterviewScore: number;
  companyMatches: {
    name: string;
    logoUrl?: string;
    matchPercent: number;
    alignedSkills: string[];
    missingSkills: string[];
  }[];
  actionChecklist: {
    id: string;
    title: string;
    category: string;
    isCompleted: boolean;
  }[];
}

export const placementService = {
  getReadinessMetrics(): PlacementMetrics {
    return {
      overallScore: 91,
      status: 'Ready for Senior SDE & Full-Stack Roles 🎉',
      technicalKnowledgeScore: 94,
      problemSolvingScore: 88,
      resumeStrengthScore: 85,
      mockInterviewScore: 86,
      companyMatches: [
        {
          name: 'Stripe',
          matchPercent: 94,
          alignedSkills: ['Full-Stack SaaS', 'PostgreSQL', 'API Design', 'System Design'],
          missingSkills: ['Redis Lua Scripting'],
        },
        {
          name: 'Google',
          matchPercent: 92,
          alignedSkills: ['B+ Trees', 'ACID Transactions', 'Data Structures', 'Algorithms'],
          missingSkills: ['Advanced Graph Algorithms'],
        },
        {
          name: 'Microsoft',
          matchPercent: 90,
          alignedSkills: ['System Design', 'TypeScript', 'SQL Optimization', 'REST APIs'],
          missingSkills: ['Azure Cloud Scaling'],
        },
        {
          name: 'Amazon',
          matchPercent: 88,
          alignedSkills: ['Microservices', 'Distributed Caching', 'Leadership Principles'],
          missingSkills: ['DynamoDB Partitioning'],
        },
      ],
      actionChecklist: [
        { id: 'act-1', title: 'Complete DBMS BCNF Normalization Module', category: 'Database', isCompleted: true },
        { id: 'act-2', title: 'Achieve ≥ 85% ATS Score on Resume Analyzer', category: 'Resume', isCompleted: true },
        { id: 'act-3', title: 'Complete 3 Technical SDE Mock Interview Rounds', category: 'Interview', isCompleted: true },
        { id: 'act-4', title: 'Revise Spaced Repetition Redis Caching Queue', category: 'Revision', isCompleted: false },
        { id: 'act-5', title: 'Build Full-Stack SaaS Portfolio Project with Stripe', category: 'Portfolio', isCompleted: false },
      ],
    };
  },
};
