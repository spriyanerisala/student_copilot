import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import type { Course } from '@/types';
import { Card, Badge, Button, Avatar } from '@/components/ui';

interface CourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden group">
      {/* Course Cover Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Featured Tag & Difficulty */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {course.isFeatured && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <Badge
            variant={
              course.difficulty === 'Advanced'
                ? 'danger'
                : course.difficulty === 'Intermediate'
                ? 'warning'
                : 'success'
            }
          >
            {course.difficulty}
          </Badge>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{course.rating}</span>
            <span className="text-slate-400 font-normal">({course.reviewCount.toLocaleString()} ratings)</span>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2">{course.subtitle}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono text-slate-400">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3 pt-3 border-t border-white/10">
          <Avatar src={course.instructorAvatar} name={course.instructorName} size="sm" />
          <div>
            <p className="text-xs font-semibold text-white">{course.instructorName}</p>
            <p className="text-[10px] text-slate-400">{course.instructorTitle}</p>
          </div>
        </div>

        {/* Duration, Students & Price */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" /> {course.totalDuration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-indigo-400" /> {(course.enrolledCount / 1000).toFixed(1)}k
            </span>
          </div>
          <div className="text-right">
            {course.discountPrice ? (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 line-through text-[11px]">{course.currency || '₹'}{course.price}</span>
                <span className="text-sm font-bold text-emerald-400">{course.currency || '₹'}{course.discountPrice}</span>
              </div>
            ) : (
              <span className="text-sm font-bold text-white">{course.currency || '₹'}{course.price}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Link to={`/course/${course.id}`}>
            <Button variant="outline" size="sm" className="w-full text-[11px]">
              Overview
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onEnroll(course)}
            className="w-full text-[11px]"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
