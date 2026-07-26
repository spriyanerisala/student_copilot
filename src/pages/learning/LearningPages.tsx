import React, { useState } from 'react';
import { useParams, Navigate, useNavigate, Link } from 'react-router-dom';
import { MOCK_COURSES } from '@/data/mockCourses';
import { dbService } from '@/services/dbService';
import { LessonSidebar } from '@/components/lesson/LessonSidebar';
import { SvgDiagramViewer } from '@/components/lesson/SvgDiagramViewer';
import { InterviewQuestionsSection } from '@/components/lesson/InterviewQuestionsSection';
import { InteractiveFlashcards } from '@/components/lesson/InteractiveFlashcards';
import { PracticeQuestionsWidget } from '@/components/lesson/PracticeQuestionsWidget';
import { AskAiDrawer } from '@/components/lesson/AskAiDrawer';
import { QuizTimer } from '@/components/quiz/QuizTimer';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { QuizResultsSummary } from '@/components/quiz/QuizResultsSummary';
import { CheckCircle2, ChevronRight, BookOpen, ArrowLeft, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import type { QuizQuestion } from '@/types';

// Sample Module Quiz Questions
const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    quizId: 'quiz-mod-1',
    questionText: 'Which property of ACID guarantees that all transactions complete successfully or roll back completely?',
    options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
    correctOption: 0,
    explanation: 'Atomicity ensures "all or nothing" execution: either the transaction fully succeeds or all changes are aborted.',
  },
  {
    id: 'q-2',
    quizId: 'quiz-mod-1',
    questionText: 'In an Entity-Relationship (ER) diagram, what geometric shape is used to represent an attribute?',
    options: ['Rectangle', 'Oval', 'Diamond', 'Triangle'],
    correctOption: 1,
    explanation: 'Attributes are represented by Ovals, Entities by Rectangles, and Relationships by Diamonds.',
  },
  {
    id: 'q-3',
    quizId: 'quiz-mod-1',
    questionText: 'What Normal Form requires removing transitive functional dependencies?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correctOption: 2,
    explanation: '3NF (Third Normal Form) requires that no non-prime attribute is transitively dependent on the primary key.',
  },
  {
    id: 'q-4',
    quizId: 'quiz-mod-1',
    questionText: 'Which indexing data structure is most commonly used by B-Trees in relational databases for fast range queries?',
    options: ['Hash Index', 'B+ Tree Index', 'Inverted Index', 'Red-Black Tree'],
    correctOption: 1,
    explanation: 'B+ Trees store all data pointers in leaf nodes connected as a linked list, making range scans extremely efficient.',
  },
  {
    id: 'q-5',
    quizId: 'quiz-mod-1',
    questionText: 'What HTTP status code is returned when an API client exceeds the Rate Limiter threshold?',
    options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '429 Too Many Requests'],
    correctOption: 3,
    explanation: '429 Too Many Requests indicates that the rate limit threshold has been exceeded.',
  },
];

// --- LESSON VIEWER PAGE ---
export const LessonViewerPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['l-dbms-1']);

  const course = MOCK_COURSES.find((c) => c.id === courseId) || MOCK_COURSES[0];
  if (!course) return <Navigate to="/marketplace" replace />;

  // Check enrollment status (user-specific)
  const getEnrolledCourses = (): string[] => {
    try {
      const currentEmail = localStorage.getItem('studypilot_current_user_email') || '';
      return JSON.parse(localStorage.getItem(`studypilot_enrolled_${currentEmail}`) || '[]');
    } catch {
      return [];
    }
  };

  const enrolledList = getEnrolledCourses();
  const isEnrolled = enrolledList.includes(course.id);

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === lessonId) || allLessons[0];

  if (!currentLesson) return <Navigate to={`/course/${course.id}`} replace />;

  const isCompleted = completedLessonIds.includes(currentLesson.id);

  const toggleCompletion = async () => {
    let updated: string[];
    if (isCompleted) {
      updated = completedLessonIds.filter((id) => id !== currentLesson.id);
    } else {
      updated = [...completedLessonIds, currentLesson.id];

      // Get current user identity
      const currentEmail = localStorage.getItem('studypilot_current_user_email') || 'guest';
      const userId = `usr-${currentEmail.replace(/[^a-z0-9]/gi, '-')}`;

      // Record lesson progress in Supabase user_progress table
      await dbService.recordUserProgress(userId, course.id, currentLesson.moduleId, currentLesson.id);

      // Calculate new progress percentage
      const progressPercent = Math.round((updated.length / Math.max(allLessons.length, 1)) * 100);

      // Update course completion in Supabase when all lessons are done
      await dbService.updateCourseCompletion(userId, course.id, progressPercent);

      // Save updated progress percentage to user-specific localStorage
      const progressKey = `studypilot_progress_${currentEmail}`;
      try {
        const savedProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
        savedProgress[course.id] = progressPercent;
        localStorage.setItem(progressKey, JSON.stringify(savedProgress));
      } catch {
        localStorage.setItem(progressKey, JSON.stringify({ [course.id]: progressPercent }));
      }
    }
    setCompletedLessonIds(updated);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 -m-4 lg:-m-8 min-h-[calc(100vh-65px)] select-none">
      <LessonSidebar
        modules={course.modules}
        courseId={course.id}
        currentLessonId={currentLesson.id}
        completedLessonIds={completedLessonIds}
      />

      <main className="flex-1 p-4 lg:p-8 space-y-8 overflow-y-auto max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link to={`/course/${course.id}`} className="hover:text-purple-400 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Syllabus
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-purple-300 font-medium">{currentLesson.title}</span>
          </div>

          <div className="flex items-center gap-3">
            {isEnrolled ? (
              <Button
                size="sm"
                variant={isCompleted ? 'secondary' : 'primary'}
                onClick={toggleCompletion}
                leftIcon={<CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : ''}`} />}
              >
                {isCompleted ? 'Completed ✓' : 'Mark as Completed'}
              </Button>
            ) : (
              <Badge variant="warning">Preview Mode (Unenrolled)</Badge>
            )}
          </div>
        </div>

        {/* Lock Overlay Banner for Unenrolled Users */}
        {!isEnrolled && (
          <Card className="p-8 text-center space-y-4 border-2 border-purple-500/50 bg-gradient-to-b from-purple-950/60 via-slate-900 to-slate-900 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/30 text-purple-400 border border-purple-500/40 flex items-center justify-center mx-auto shadow-xl">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Full Course Modules Locked 🔒</h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Pay <strong>{course.currency || '₹'}{course.discountPrice ?? course.price} INR</strong> via Stripe to unlock all {course.modules.length || 4} modules, 3D revision flashcards, SVG architecture diagrams, practice MCQs, and 24/7 AI Mentor assistance.
              </p>
            </div>
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(`/marketplace`)}
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Pay {course.currency || '₹'}{course.discountPrice ?? course.price} via Stripe & Unlock Full Course
              </Button>
            </div>
          </Card>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="primary">{course.title}</Badge>
            <span className="text-xs font-mono text-slate-400">Duration: {currentLesson.duration}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {currentLesson.title}
          </h1>
        </div>

        {currentLesson.svgDiagram && (
          <SvgDiagramViewer svgDiagram={currentLesson.svgDiagram} />
        )}

        <Card className="p-6 sm:p-8 space-y-4 leading-relaxed">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> Lesson Explanation & Core Concepts
          </h3>

          <div className="text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>{currentLesson.explanation}</p>

            {currentLesson.examples && currentLesson.examples.length > 0 && (
              <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2">
                <h4 className="font-bold text-purple-300 flex items-center gap-1.5 text-xs">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Real-World Industry Examples:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs">
                  {currentLesson.examples.map((ex, idx) => (
                    <li key={idx}>{ex}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        {isEnrolled && currentLesson.interviewQuestions && (
          <InterviewQuestionsSection questions={currentLesson.interviewQuestions} />
        )}

        {isEnrolled && currentLesson.flashcards && (
          <InteractiveFlashcards flashcards={currentLesson.flashcards} />
        )}

        {isEnrolled && currentLesson.practiceQuestions && (
          <PracticeQuestionsWidget questions={currentLesson.practiceQuestions} />
        )}

        {isEnrolled && <AskAiDrawer lessonTitle={currentLesson.title} />}
      </main>
    </div>
  );
};

// --- QUIZ PAGE ---
export const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = SAMPLE_QUIZ_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (optionIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
  };

  const calculateScore = () => {
    let count = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOption) count++;
    });
    return count;
  };

  const score = calculateScore();
  const passed = Math.round((score / questions.length) * 100) >= 80;

  return (
    <div className="space-y-8 select-none max-w-5xl mx-auto py-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Module Quiz</span>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-purple-400" /> DBMS & Systems Assessment
          </h1>
        </div>

        {!isSubmitted && (
          <QuizTimer initialMinutes={15} onTimeExpired={handleSubmitQuiz} isPaused={isSubmitted} />
        )}
      </div>

      {isSubmitted ? (
        <QuizResultsSummary
          questions={questions}
          userAnswers={userAnswers}
          score={score}
          totalQuestions={questions.length}
          passed={passed}
          onRetry={handleRetry}
          onContinue={() => navigate('/dashboard')}
        />
      ) : (
        <div className="space-y-6">
          {/* Question Navigation Number Bar */}
          <div className="flex items-center gap-2 p-3 rounded-2xl glass-card overflow-x-auto">
            <span className="text-xs font-semibold text-slate-400 mr-2 shrink-0">Progress:</span>
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold font-mono transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-purple-600 text-white ring-2 ring-purple-400 shadow-md'
                      : isAnswered
                      ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Active Question Card */}
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedOption={userAnswers[currentQuestion.id] ?? null}
            onSelectOption={handleSelectOption}
          />

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            {currentQuestionIndex === questions.length - 1 ? (
              <Button variant="primary" onClick={handleSubmitQuiz}>
                Submit Quiz
              </Button>
            ) : (
              <Button variant="primary" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Next Question
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
