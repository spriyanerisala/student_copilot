import type { QuizQuestion } from '@/types';
import { agenticQuizDatabase } from '@/data/agenticQuizDatabase';
import { agenticCodingDatabase } from '@/data/agenticCodingDatabase';

export interface CodingProblem {
  id: string;
  title: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  defaultCode: Record<string, string>;
}

export const agenticDataService = {
  getQuizQuestions(domain: string, topic: string): QuizQuestion[] {
    // Attempt to fetch from our extensive offline database
    const questions = agenticQuizDatabase[topic];
    if (questions && questions.length > 0) {
      return questions;
    }

    // Fallback if topic is missing (mock generation)
    const fallbackQuestions: QuizQuestion[] = [];
    for (let i = 1; i <= 5; i++) {
      fallbackQuestions.push({
        id: `q-${domain}-${topic}-${i}`,
        quizId: `quiz-${topic}`,
        questionText: `Sample question ${i} for ${topic} in ${domain}. Which of the following is correct?`,
        options: [
          `Option A for ${topic}`,
          `Option B for ${topic}`,
          `Option C for ${topic}`,
          `Option D for ${topic}`
        ],
        correctOption: Math.floor(Math.random() * 4),
        explanation: `Explanation for question ${i} about ${topic}. This clarifies why the chosen option is correct.`
      });
    }

    return fallbackQuestions;
  },

  getCodingProblemsByTopic(topic: string): CodingProblem[] {
    const problems = agenticCodingDatabase[topic];
    if (problems && problems.length > 0) {
      return problems;
    }
    return [];
  },

  getCodingProblem(topic: string, problemId: string): CodingProblem | null {
    const problems = agenticCodingDatabase[topic];
    if (problems) {
      return problems.find(p => p.id === problemId) || null;
    }
    return null;
  },

  getAllCodingDomains(): string[] {
    return Object.keys(agenticCodingDatabase);
  },

  getAllCodingProblems(): CodingProblem[] {
    const all: CodingProblem[] = [];
    Object.values(agenticCodingDatabase).forEach(problems => {
      all.push(...problems);
    });
    return all;
  },

  getUserPerformance() {
    // Simulated dynamic performance data
    return {
      radarData: [
        { subject: 'Aptitude', A: 85, fullMark: 100 },
        { subject: 'Reasoning', A: 65, fullMark: 100 },
        { subject: 'Core CS', A: 90, fullMark: 100 },
        { subject: 'Coding', A: 75, fullMark: 100 },
        { subject: 'System Design', A: 60, fullMark: 100 },
      ],
      codingProgress: {
        solved: 42,
        total: 330,
        easy: 25,
        medium: 12,
        hard: 5
      },
      strongTopics: ['Arrays', 'Computer Networks', 'Percentages'],
      weakTopics: ['Dynamic Programming', 'Blood Relations', 'Pipes and Cisterns'],
      overallAccuracy: 78
    };
  }
};
