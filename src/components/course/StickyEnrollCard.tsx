import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, ShieldCheck, Sparkles, Smartphone, Award, Lock } from 'lucide-react';
import type { Course } from '@/types';
import { Card, Button } from '@/components/ui';

interface StickyEnrollCardProps {
  course: Course;
  onEnroll: () => void;
}

export const StickyEnrollCard: React.FC<StickyEnrollCardProps> = ({ course, onEnroll }) => {
  const navigate = useNavigate();
  const firstLessonId = course.modules[0]?.lessons[0]?.id || 'l-dbms-1';

  return (
    <Card className="p-6 space-y-6 sticky top-24 border border-purple-500/30 bg-slate-900/90 shadow-2xl">
      {/* Video / Cover Thumbnail */}
      <div className="relative h-44 w-full rounded-2xl overflow-hidden group cursor-pointer" onClick={() => navigate(`/course/${course.id}/lesson/${firstLessonId}`)}>
        <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Pricing Header */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white font-mono">{course.currency || '₹'}{course.discountPrice ?? course.price}</span>
          {course.discountPrice && (
            <>
              <span className="text-sm text-slate-400 line-through">{course.currency || '₹'}{course.price}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                {Math.round(((course.price - course.discountPrice) / course.price) * 100)}% OFF
              </span>
            </>
          )}
        </div>
        <p className="text-[11px] text-purple-300 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Includes 24/7 AI Mentor Tutor
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-2">
        <Button variant="primary" size="lg" className="w-full" onClick={onEnroll} leftIcon={<Lock className="w-4 h-4" />}>
          Enroll Now & Unlock
        </Button>
        <Link to={`/course/${course.id}/lesson/${firstLessonId}`} className="block">
          <Button variant="glass" size="md" className="w-full" leftIcon={<Play className="w-4 h-4 text-purple-400" />}>
            Start Free Lesson Preview
          </Button>
        </Link>
      </div>

      {/* Guarantee & Features list */}
      <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Full Lifetime Access to all updates</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Verified Certificate of Completion</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Smartphone className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Accessible on Mobile & Desktop</span>
        </div>
      </div>
    </Card>
  );
};
