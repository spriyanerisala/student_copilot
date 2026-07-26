export interface ResumeAnalysisResult {
  id: string;
  fileName: string;
  fileSize: string;
  analyzedAt: string;
  atsScore: number;
  n8nSummary?: string;
  n8nMatchLevel?: string;
  n8nStrengths?: string[];
  n8nWeaknesses?: string[];
  n8nMissingSkills?: string[];
  n8nKeywordSuggestions?: string[];
  n8nResumeImprovements?: string[];
  n8nInterviewReadiness?: string;
  n8nFinalRecommendation?: string;
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



export const resumeService = {
  async analyzeResume(file: File): Promise<ResumeAnalysisResult> {
    const fileName = file.name || 'resume.pdf';
    const fileSize = file.size > 0 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : '< 0.1 MB';
    
    let n8nSummary: string | undefined = undefined;
    let n8nMatchLevel: string | undefined = undefined;
    let n8nAtsScore: number | undefined = undefined;
    let n8nStrengths: string[] | undefined = undefined;
    let n8nWeaknesses: string[] | undefined = undefined;
    let n8nMissingSkills: string[] | undefined = undefined;
    let n8nKeywordSuggestions: string[] | undefined = undefined;
    let n8nResumeImprovements: string[] | undefined = undefined;
    let n8nInterviewReadiness: string | undefined = undefined;
    let n8nFinalRecommendation: string | undefined = undefined;

    // Send the file to n8n Webhook for processing
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('https://n8n-x6q1.srv1854989.hstgr.cloud/webhook/resume-analyser', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const textData = await res.text();
        try {
          const parsedData = JSON.parse(textData);
          const data = Array.isArray(parsedData) ? parsedData[0] : parsedData;
          if (data) {
            if (data.summary) n8nSummary = data.summary;
            if (data.matchLevel) n8nMatchLevel = data.matchLevel;
            if (data.atsScore !== undefined) n8nAtsScore = Number(data.atsScore);
            if (data.strengths) n8nStrengths = data.strengths;
            if (data.weaknesses) n8nWeaknesses = data.weaknesses;
            if (data.missingSkills) n8nMissingSkills = data.missingSkills;
            if (data.keywordSuggestions) n8nKeywordSuggestions = data.keywordSuggestions;
            if (data.resumeImprovements) n8nResumeImprovements = data.resumeImprovements;
            if (data.interviewReadiness) n8nInterviewReadiness = data.interviewReadiness;
            if (data.finalRecommendation) n8nFinalRecommendation = data.finalRecommendation;
          }
        } catch (e) {
          console.warn("n8n response was not JSON:", textData);
        }
      } else {
        const errorText = await res.text();
        console.error("n8n responded with an error:", res.status, res.statusText, errorText);
        throw new Error(`n8n webhook failed with status: ${res.status}`);
      }
    } catch (err) {
      console.warn('n8n resume analyzer webhook failed:', err);
      throw new Error('Failed to connect to n8n workflow. Ensure the webhook is active.');
    }
    
    // Throw error if critical n8n data is missing
    if (n8nAtsScore === undefined && !n8nSummary) {
      throw new Error('n8n workflow did not return valid resume analysis data.');
    }

    return {
      id: `res-${Date.now()}`,
      fileName,
      fileSize,
      analyzedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      atsScore: n8nAtsScore || 0,
      n8nSummary,
      n8nMatchLevel,
      n8nStrengths,
      n8nWeaknesses,
      n8nMissingSkills,
      n8nKeywordSuggestions,
      n8nResumeImprovements,
      n8nInterviewReadiness,
      n8nFinalRecommendation,
      // Default empty values for old UI compatibility
      subScores: {
        keywordMatch: n8nAtsScore || 0,
        formatting: n8nAtsScore || 0,
        impactMetrics: n8nAtsScore || 0,
        technicalDepth: n8nAtsScore || 0,
      },
      detectedSkills: [],
      missingSkills: [],
      improvementSuggestions: [],
      recommendedProjects: [],
      recommendedLearningPath: [],
    };
  },

  getSavedAnalyses(): ResumeAnalysisResult[] {
    return [];
  },
};
