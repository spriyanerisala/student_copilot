export type UserRole = 'student' | 'instructor' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  bio?: string;
  streakDays: number;
  lastStudyDate?: string;
  totalStudyHours: number;
  placementScore: number;
  atsScore?: number;
  createdAt: string;
}

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  order: number;
  explanation: string;
  svgDiagram?: string;
  examples: string[];
  interviewQuestions: { question: string; answer: string }[];
  notes: string[];
  flashcards: { front: string; back: string }[];
  summary: string;
  practiceQuestions: { question: string; options: string[]; answerIndex: number }[];
  isCompleted?: boolean;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  questionText: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface ModuleQuiz {
  id: string;
  moduleId: string;
  title: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  quiz?: ModuleQuiz;
  isCompleted?: boolean;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  instructorName: string;
  instructorAvatar: string;
  instructorTitle: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  difficulty: DifficultyLevel;
  totalDuration: string;
  price: number;
  discountPrice?: number;
  enrolledCount: number;
  modules: CourseModule[];
  tags: string[];
  isFeatured?: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  currentModuleId?: string;
  currentLessonId?: string;
  completedLessonIds: string[];
  completedModuleIds: string[];
  isCompleted: boolean;
  certificateId?: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  attemptedAt: string;
  wrongTopicTags: string[];
}

export interface RevisionTopic {
  id: string;
  userId: string;
  topicTitle: string;
  courseId: string;
  lessonId: string;
  scheduledDate: string;
  repetitionStage: 1 | 3 | 7 | 15 | 30;
  isCompleted: boolean;
}

export interface PlacementReadinessMetric {
  atsScore: number;
  quizPerformance: number;
  courseCompletion: number;
  studyConsistency: number;
  mockInterviewScore: number;
  dsaProgress: number;
  overallScore: number;
}
