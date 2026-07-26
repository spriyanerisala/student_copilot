import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, PlayCircle, Loader2, Library } from 'lucide-react';
import { dbService } from '@/services/dbService';
import { MOCK_COURSES } from '@/data/mockCourses';
import type { Course, Enrollment } from '@/types';
import { Button, Card } from '@/components/ui';

export const MyCoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [enrolledData, setEnrolledData] = useState<{ course: Course; enrollment: Enrollment }[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const currentEmail = localStorage.getItem('studypilot_current_user_email') || 'ahnaf@studypilot.ai';
        let enrolledIds: string[] = [];
        let guestEnrolledIds: string[] = [];
        
        try {
          enrolledIds = JSON.parse(localStorage.getItem(`studypilot_enrolled_${currentEmail}`) || '[]');
          guestEnrolledIds = JSON.parse(localStorage.getItem('studypilot_enrolled_guest') || '[]');
        } catch {
          enrolledIds = [];
        }
        
        enrolledIds = Array.from(new Set([...enrolledIds, ...guestEnrolledIds]));

        // Also get hardcoded offline mock if any
        const mockEnrollments = await dbService.getEnrollments('usr-101');
        
        // Merge them
        const allCourseIds = Array.from(new Set([...enrolledIds, ...mockEnrollments.map(e => e.courseId)]));
        
        const data = allCourseIds.map(courseId => {
          const course = MOCK_COURSES.find(c => c.id === courseId);
          if (!course) return null;
          
          // Try to get progress from local storage
          let progressPercent = 0;
          try {
            const savedProgress = JSON.parse(localStorage.getItem(`studypilot_progress_${currentEmail}`) || '{}');
            if (savedProgress[courseId] !== undefined) {
              progressPercent = savedProgress[courseId];
            } else {
              const mockEnr = mockEnrollments.find(e => e.courseId === courseId);
              if (mockEnr) progressPercent = mockEnr.progressPercent;
            }
          } catch {}

          const enrollment: Enrollment = {
            id: `enr-${courseId}`,
            userId: 'usr-101',
            courseId,
            enrolledAt: new Date().toISOString(),
            progressPercent,
            completedLessonIds: [],
            completedModuleIds: [],
            isCompleted: progressPercent >= 100
          };
          return { course, enrollment };
        }).filter(Boolean) as { course: Course; enrollment: Enrollment }[];
        
        setEnrolledData(data);
      } catch (err) {
        console.error('Failed to load my courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 select-none">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
          <Library className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">My Courses</h1>
          <p className="text-sm text-slate-400">Continue learning and track your progress</p>
        </div>
      </div>

      {enrolledData.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed border-white/10 bg-slate-900/30">
          <BookOpen className="w-12 h-12 text-slate-500 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">You haven't enrolled in any courses yet</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-sm">
            Explore our marketplace to find courses on System Design, Data Structures, AI, and more.
          </p>
          <Button onClick={() => navigate('/marketplace')} className="px-6">
            Explore Courses
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledData.map(({ course, enrollment }) => (
            <Card key={course.id} className="overflow-hidden flex flex-col group bg-slate-900/60 hover:bg-slate-800/80 transition-all border-white/10 hover:border-purple-500/30">
              {/* Cover Image */}
              <div className="h-40 w-full relative overflow-hidden">
                <img 
                  src={course.coverImage} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                  {course.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white leading-tight mb-2 line-clamp-2">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{course.totalDuration} Total</span>
                </div>

                <div className="mt-auto space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">Progress</span>
                      <span className="text-purple-400 font-bold">{enrollment.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${enrollment.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={() => {
                      // Navigate to the first module/lesson of the course by default
                      const firstModule = course.modules?.[0];
                      const firstLesson = firstModule?.lessons?.[0];
                      if (firstModule && firstLesson) {
                        navigate(`/course/${course.id}/lesson/${firstLesson.id}`);
                      } else {
                        navigate(`/course/${course.id}`);
                      }
                    }} 
                    className="w-full justify-center group-hover:bg-purple-600 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" /> 
                    {enrollment.progressPercent === 0 ? 'Start Learning' : 'Resume Course'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
