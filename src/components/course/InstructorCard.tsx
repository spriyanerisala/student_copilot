import React from 'react';
import { Star, Users, Award } from 'lucide-react';
import type { Course } from '@/types';
import { Card, Avatar } from '@/components/ui';

interface InstructorCardProps {
  course: Course;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({ course }) => {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Award className="w-5 h-5 text-purple-400" /> About Your Instructor
      </h3>

      <div className="flex flex-col sm:flex-row items-start gap-4">
        <Avatar src={course.instructorAvatar} name={course.instructorName} size="xl" />
        <div className="space-y-2">
          <h4 className="text-base font-bold text-white">{course.instructorName}</h4>
          <p className="text-xs text-purple-300 font-medium">{course.instructorTitle}</p>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {course.rating} Rating</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-indigo-400" /> {(course.enrolledCount / 1000).toFixed(1)}k Students</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pt-2">
            Dedicated instructor specializing in computer systems, database design, and high-performance algorithms. Has mentored over 50,000 students into senior engineering positions.
          </p>
        </div>
      </div>
    </Card>
  );
};
