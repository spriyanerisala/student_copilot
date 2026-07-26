import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, ChevronRight, ShieldCheck } from 'lucide-react';
import type { Course } from '@/types';
import { Badge, Avatar } from '@/components/ui';

interface CourseHeaderBannerProps {
  course: Course;
}

export const CourseHeaderBanner: React.FC<CourseHeaderBannerProps> = ({ course }) => {
  return (
    <div className="space-y-4 pb-6 border-b border-white/10">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/marketplace" className="hover:text-purple-400 transition-colors">Marketplace</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-300 font-medium">{course.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-purple-300 truncate">{course.title}</span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="space-y-2 max-w-4xl">
        <div className="flex items-center gap-2">
          <Badge variant={course.difficulty === 'Advanced' ? 'danger' : course.difficulty === 'Intermediate' ? 'warning' : 'success'}>
            {course.difficulty}
          </Badge>
          <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-300 text-[10px] font-semibold uppercase border border-purple-500/20">
            {course.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {course.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {course.subtitle}
        </p>
      </div>

      {/* Ratings & Metadata Strip */}
      <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
        {/* Rating */}
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <Star className="w-4 h-4 fill-amber-400" />
          <span>{course.rating}</span>
          <span className="text-slate-400 font-normal">({course.reviewCount.toLocaleString()} ratings)</span>
        </div>

        {/* Enrolled Students */}
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-indigo-400" />
          <span>{(course.enrolledCount).toLocaleString()} Students Enrolled</span>
        </div>

        {/* Total Hours */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-purple-400" />
          <span>{course.totalDuration} Total Duration</span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Verified AI-Assisted Certificate</span>
        </div>
      </div>

      {/* Instructor Info */}
      <div className="flex items-center gap-3 pt-3">
        <Avatar src={course.instructorAvatar} name={course.instructorName} size="md" />
        <div>
          <p className="text-xs text-slate-400">Created by <strong className="text-white">{course.instructorName}</strong></p>
          <p className="text-[11px] text-purple-300 font-medium">{course.instructorTitle}</p>
        </div>
      </div>
    </div>
  );
};
