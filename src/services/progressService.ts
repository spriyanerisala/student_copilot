import type { RevisionTopic } from '@/types';

export interface ProgressSummary {
  purchasedCoursesCount: number;
  currentLessonTitle: string;
  currentModuleTitle: string;
  lessonCompletionPercent: number;
  moduleCompletionPercent: number;
  courseCompletionPercent: number;
  totalStudyHours: number;
  quizAttemptsCount: number;
  averageQuizScore: number;
  quizAccuracyPercent: number;
  streakDays: number;
  lastStudyDate: string;
  weakTopics: string[];
}

// Sample Spaced Repetition Queue (1, 3, 7, 15, 30 Days)
const MOCK_REVISION_QUEUE: RevisionTopic[] = [
  {
    id: 'rev-101',
    userId: 'usr-101',
    topicTitle: 'DBMS Normalization (3NF & BCNF)',
    courseId: 'dbms-101',
    lessonId: 'l-dbms-1',
    scheduledDate: 'Day 1 (Today)',
    repetitionStage: 1,
    isCompleted: false,
  },
  {
    id: 'rev-102',
    userId: 'usr-101',
    topicTitle: 'System Design Token Bucket Rate Limiting',
    courseId: 'sys-201',
    lessonId: 'l-sys-1',
    scheduledDate: 'Day 3',
    repetitionStage: 3,
    isCompleted: false,
  },
  {
    id: 'rev-103',
    userId: 'usr-101',
    topicTitle: 'B+ Tree Indexing & Search Time Complexity',
    courseId: 'dbms-101',
    lessonId: 'l-dbms-2',
    scheduledDate: 'Day 7',
    repetitionStage: 7,
    isCompleted: false,
  },
  {
    id: 'rev-104',
    userId: 'usr-101',
    topicTitle: 'ACID Transactions & Isolation Levels',
    courseId: 'dbms-101',
    lessonId: 'l-dbms-1',
    scheduledDate: 'Day 15',
    repetitionStage: 15,
    isCompleted: false,
  },
  {
    id: 'rev-105',
    userId: 'usr-101',
    topicTitle: 'Distributed Caching Strategies & Redis Eviction',
    courseId: 'sys-201',
    lessonId: 'l-sys-1',
    scheduledDate: 'Day 30',
    repetitionStage: 30,
    isCompleted: false,
  },
];

export const progressService = {
  getSummary(): ProgressSummary {
    return {
      purchasedCoursesCount: 4,
      currentLessonTitle: '1.1 What is DBMS & Key Advantages',
      currentModuleTitle: 'Module 1: Introduction to Database Systems',
      lessonCompletionPercent: 65,
      moduleCompletionPercent: 50,
      courseCompletionPercent: 62,
      totalStudyHours: 48.5,
      quizAttemptsCount: 14,
      averageQuizScore: 88,
      quizAccuracyPercent: 91,
      streakDays: 12,
      lastStudyDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      weakTopics: ['DBMS BCNF Normalization', 'System Design Distributed Locks', 'Redis Sentinel Architecture'],
    };
  },

  getSpacedRevisions(): RevisionTopic[] {
    return MOCK_REVISION_QUEUE;
  },

  markRevisionDone(id: string): RevisionTopic[] {
    const topic = MOCK_REVISION_QUEUE.find((t) => t.id === id);
    if (topic) topic.isCompleted = true;
    return [...MOCK_REVISION_QUEUE];
  },
};
