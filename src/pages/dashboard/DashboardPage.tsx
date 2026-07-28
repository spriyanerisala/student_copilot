import React from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { TimeSpendingChart } from '@/components/dashboard/TimeSpendingChart';
import { ProgressRingChart } from '@/components/dashboard/ProgressRingChart';
import { MentorsList } from '@/components/dashboard/MentorsList';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { UpcomingCoursesList } from '@/components/dashboard/UpcomingCoursesList';
import { ScheduleCalendar } from '@/components/dashboard/ScheduleCalendar';
import { AiSuggestionsWidget } from '@/components/dashboard/AiSuggestionsWidget';

import { SubmittedProblemsWidget } from '@/components/dashboard/SubmittedProblemsWidget';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 select-none">
      {/* Top Header & Active Course Pills */}
      <DashboardHeader />

      {/* Row 1: Time Spending Chart | Your Progress Donut | Your Mentors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TimeSpendingChart />
        </div>
        <div className="lg:col-span-1">
          <ProgressRingChart />
        </div>
        <div className="lg:col-span-1">
          <MentorsList />
        </div>
      </div>

      {/* Row 2: Attendance Chart | Upcoming Courses | Class Schedule Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 lg:col-span-1">
          <AttendanceChart />
        </div>
        <div className="lg:col-span-1">
          <UpcomingCoursesList />
        </div>
        <div className="lg:col-span-1">
          <ScheduleCalendar />
        </div>
      </div>

      {/* Row 3: AI Recommendations & Submitted Problems */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <AiSuggestionsWidget />
        </div>
        <div className="lg:col-span-1">
          <SubmittedProblemsWidget />
        </div>
      </div>
    </div>
  );
};
