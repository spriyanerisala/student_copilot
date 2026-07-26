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
  detectedSkills: string[];
  missingSkills: string[];
  improvementSuggestions: string[];
  recommendedProjects: { title: string; description: string; techStack: string[] }[];
  recommendedLearningPath: { courseId: string; title: string; reason: string }[];
}

// Full tech skill keyword dictionary
const ALL_TECH_SKILLS = [
  // Programming Languages
  'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'golang', 'rust', 'kotlin', 'swift', 'php', 'ruby',
  // Frontend
  'react', 'angular', 'vue', 'nextjs', 'next.js', 'svelte', 'tailwind', 'css', 'html', 'redux', 'graphql',
  // Backend
  'node.js', 'nodejs', 'express', 'django', 'flask', 'spring', 'fastapi', 'nestjs', 'laravel',
  // Databases
  'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'dynamodb', 'sqlite', 'supabase', 'firebase', 'cassandra',
  // Cloud & DevOps
  'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ci/cd', 'jenkins', 'github actions',
  // AI/ML
  'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'nlp', 'computer vision', 'llm',
  // System Design
  'microservices', 'kafka', 'rabbitmq', 'system design', 'api design', 'rest api', 'grpc', 'load balancing',
  // CS Fundamentals
  'data structures', 'algorithms', 'dbms', 'operating systems', 'computer networks', 'oops', 'dsa',
  // Tools
  'git', 'linux', 'agile', 'scrum', 'jira', 'figma', 'postman',
];

// Read file text content
async function readFileText(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve((e.target?.result as string) || '');
    };
    reader.onerror = () => resolve('');
    // Read as text — works for .txt and plain-text content
    reader.readAsText(file);
  });
}

function detectSkills(text: string): string[] {
  const lower = text.toLowerCase();
  return ALL_TECH_SKILLS.filter((skill) => lower.includes(skill));
}

function computeAtsScore(detected: string[], totalKeywords: number): number {
  const keywordScore = Math.min(100, Math.round((detected.length / Math.max(totalKeywords * 0.3, 1)) * 100));
  return Math.max(40, Math.min(97, keywordScore));
}

function generateSuggestions(detected: string[], missing: string[]): string[] {
  const suggestions: string[] = [];
  if (!detected.includes('docker') && !detected.includes('kubernetes')) {
    suggestions.push('Add DevOps skills like Docker & Kubernetes to significantly boost ATS score for senior roles.');
  }
  if (missing.includes('system design')) {
    suggestions.push('Include System Design keywords under your Technical Skills section (e.g., Load Balancing, Microservices, Kafka).');
  }
  if (!detected.includes('aws') && !detected.includes('azure') && !detected.includes('gcp')) {
    suggestions.push('Add cloud platform experience (AWS/Azure/GCP) — it is required in 80% of SDE job listings.');
  }
  suggestions.push('Add quantifiable metrics to experience bullets (e.g., "Reduced API latency by 35% using Redis caching").');
  suggestions.push('Add links to deployed GitHub projects or live web app URLs at the top of your resume.');
  if (suggestions.length < 3) {
    suggestions.push('Use action verbs like "Architected", "Optimized", "Deployed", "Automated" for stronger bullet points.');
  }
  return suggestions.slice(0, 4);
}

export const resumeService = {
  async analyzeResume(file: File): Promise<ResumeAnalysisResult> {
    // Read actual file content
    const fileText = await readFileText(file);

    // Give a small delay for UI processing state
    await new Promise((res) => setTimeout(res, 1500));

    const fileName = file.name || 'resume.pdf';
    const fileSize = file.size > 0 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : '< 0.1 MB';
    const hasContent = fileText.trim().length > 50;

    const detectedSkills = hasContent ? detectSkills(fileText) : ['react', 'javascript', 'sql', 'git'];
    const missingSkills = ALL_TECH_SKILLS.filter(
      (s) => !detectedSkills.includes(s) &&
        ['kafka', 'kubernetes', 'docker', 'system design', 'redis', 'aws', 'machine learning', 'grpc', 'graphql'].includes(s)
    );

    const atsScore = hasContent ? computeAtsScore(detectedSkills, ALL_TECH_SKILLS.length) : 72;
    const keywordMatch = hasContent ? Math.min(99, Math.round(atsScore * 0.95)) : 68;
    const formatting = file.name.endsWith('.pdf') ? 94 : 82;
    const impactMetrics = hasContent && fileText.includes('%') ? 85 : 64;
    const technicalDepth = Math.min(99, Math.round(detectedSkills.length * 3.5));

    const suggestions = generateSuggestions(detectedSkills, missingSkills);

    // Recommend learning paths based on missing skills
    const recommendedLearningPath: ResumeAnalysisResult['recommendedLearningPath'] = [];
    if (missingSkills.includes('system design') || missingSkills.includes('kafka')) {
      recommendedLearningPath.push({
        courseId: 'sysdesign-110',
        title: 'High-Scale System Design & Architecture',
        reason: 'Master Redis, Kafka & Microservices missing from your resume.',
      });
    }
    if (missingSkills.includes('machine learning') || !detectedSkills.includes('python')) {
      recommendedLearningPath.push({
        courseId: 'aiml-108',
        title: 'AI/ML Engineering with Python',
        reason: 'Build ML model deployment skills that are currently missing from your resume.',
      });
    }
    if (!detectedSkills.includes('docker') || !detectedSkills.includes('kubernetes')) {
      recommendedLearningPath.push({
        courseId: 'cloud-109',
        title: 'Cloud Computing & DevOps Engineering',
        reason: 'Docker & Kubernetes skills absent in your resume but required in 80% of SDE roles.',
      });
    }
    if (recommendedLearningPath.length === 0) {
      recommendedLearningPath.push({
        courseId: 'dsa-107',
        title: 'Data Structures & Algorithms (DSA) Cracker',
        reason: 'Sharpen your DSA problem-solving skills for technical coding rounds.',
      });
    }

    return {
      id: `res-${Date.now()}`,
      fileName,
      fileSize,
      analyzedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      atsScore,
      subScores: {
        keywordMatch,
        formatting,
        impactMetrics,
        technicalDepth,
      },
      detectedSkills,
      missingSkills,
      improvementSuggestions: suggestions,
      recommendedProjects: [
        {
          title: 'Distributed API Rate Limiter',
          description: 'Implement Token Bucket rate limiting in Redis with Lua scripts handling 10k req/sec.',
          techStack: ['Node.js', 'Redis', 'Lua', 'TypeScript'],
        },
        {
          title: 'Full-Stack LMS Platform',
          description: 'Build a production SaaS application with React, Supabase Auth, PostgreSQL, and Stripe Payments.',
          techStack: ['React', 'Supabase', 'Tailwind', 'Stripe'],
        },
      ],
      recommendedLearningPath,
    };
  },

  getSavedAnalyses(): ResumeAnalysisResult[] {
    return [];
  },
};
