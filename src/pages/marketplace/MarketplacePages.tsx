import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MOCK_COURSES } from '@/data/mockCourses';
import type { Course } from '@/types';
import { MarketplaceHeader } from '@/components/marketplace/MarketplaceHeader';
import { CourseCard } from '@/components/marketplace/CourseCard';
import { PurchaseModal } from '@/components/marketplace/PurchaseModal';
import { CourseHeaderBanner } from '@/components/course/CourseHeaderBanner';
import { CourseSyllabusAccordion } from '@/components/course/CourseSyllabusAccordion';
import { InstructorCard } from '@/components/course/InstructorCard';
import { StickyEnrollCard } from '@/components/course/StickyEnrollCard';
import { BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui';

// --- MARKETPLACE PAGE ---
export const MarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCourseForPurchase, setSelectedCourseForPurchase] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === 'All Difficulties' || course.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  }).sort((a, b) => {
    if (sortBy === 'popular') return b.enrolledCount - a.enrolledCount;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price_asc') return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price);
    if (sortBy === 'price_desc') return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price);
    return 0;
  });

  const handleEnrollClick = (course: Course) => {
    setSelectedCourseForPurchase(course);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 select-none">
      <MarketplaceHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onEnroll={handleEnrollClick} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 glass-card rounded-3xl">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No courses match your query</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or clearing category & difficulty filters.
          </p>
        </div>
      )}

      <PurchaseModal
        course={selectedCourseForPurchase}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

// --- COURSE DETAILS PAGE ---
export const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const course = MOCK_COURSES.find((c) => c.id === courseId) || MOCK_COURSES[0];

  if (!course) {
    return <Navigate to="/marketplace" replace />;
  }

  // Check if enrolled
  let enrolledList: string[] = ['dbms-101'];
  try {
    enrolledList = JSON.parse(localStorage.getItem('studypilot_enrolled_courses') || '["dbms-101"]');
  } catch {
    enrolledList = ['dbms-101'];
  }
  const isEnrolled = enrolledList.includes(course.id);

  const outcomes = [
    `Master core concepts and principles of ${course.title}.`,
    `Build production-ready projects and architectural diagrams.`,
    `Understand real-world industry implementations, best practices, and performance tuning.`,
    `Crack technical interview questions with 3D revision flashcards and practice assessments.`,
    `Interact with 24/7 AI Mentors during every lesson module for instant clarification.`,
    `Earn a verified Certificate of Completion with cryptographic QR code validation.`,
  ];

  return (
    <div className="space-y-8 select-none">
      {/* Header Banner */}
      <CourseHeaderBanner course={course} />

      {/* Enrolled Success Callout Banner */}
      {isEnrolled && (
        <Card className="p-6 border-2 border-emerald-500/50 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h3 className="text-base font-bold text-white">You are Enrolled in this Course! 🎉</h3>
              <p className="text-xs text-slate-300">All 10 modules, 3D flashcards, quizzes, and 24/7 AI Mentor tutor are fully unlocked.</p>
            </div>
          </div>
          <a href={`/course/${course.id}/lesson/l-${course.id}-m1`}>
            <button className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all">
              Go to Module 1 →
            </button>
          </a>
        </Card>
      )}

      {/* Main Grid: Content vs Sticky Checkout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Syllabus, Outcomes, Instructor */}
        <div className="lg:col-span-2 space-y-8">
          {/* What You Will Learn Card */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> What You Will Learn
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {outcomes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Syllabus Accordion */}
          <CourseSyllabusAccordion modules={course.modules} courseId={course.id} />

          {/* Instructor Card */}
          <InstructorCard course={course} />
        </div>

        {/* Right Column: Sticky Enrollment Sidebar Card */}
        <div className="lg:col-span-1">
          <StickyEnrollCard course={course} onEnroll={() => setIsPurchaseModalOpen(true)} />
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        course={course}
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </div>
  );
};
