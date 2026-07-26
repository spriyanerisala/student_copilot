import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { UserProfile, Enrollment, RevisionTopic } from '@/types';

// Mock Seed Data for Fallback/Offline Mode
const MOCK_PROFILE: UserProfile = {
  id: 'usr-101',
  email: 'ahnaf@studypilot.ai',
  fullName: 'Ahnaf Ibn Habib',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  bio: 'Computer Science Enthusiast & Full Stack Learner',
  streakDays: 12,
  lastStudyDate: new Date().toISOString(),
  totalStudyHours: 48.5,
  placementScore: 84,
  atsScore: 88,
  createdAt: '2026-01-15T00:00:00Z',
};

export const dbService = {
  // --- USER PROFILES ---
  async getProfile(userId: string): Promise<UserProfile> {
    if (!isSupabaseConfigured) return MOCK_PROFILE;
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error || !data) return MOCK_PROFILE;
    return {
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      avatarUrl: data.avatar_url,
      role: data.role,
      bio: data.bio,
      streakDays: data.streak_days,
      lastStudyDate: data.last_study_date,
      totalStudyHours: data.total_study_hours,
      placementScore: data.placement_score,
      atsScore: data.ats_score,
      createdAt: data.created_at,
    };
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
    if (!isSupabaseConfigured) return true;
    const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
    return !error;
  },

  // --- COURSES & ENROLLMENTS ---
  async getEnrollments(userId: string): Promise<Enrollment[]> {
    if (!isSupabaseConfigured) {
      return [
        {
          id: 'enr-1',
          userId,
          courseId: 'dbms-101',
          enrolledAt: '2026-06-01T00:00:00Z',
          progressPercent: 65,
          completedLessonIds: ['m1-l1', 'm1-l2', 'm1-l3'],
          completedModuleIds: ['mod-1'],
          isCompleted: false,
        },
      ];
    }
    const { data, error } = await supabase.from('enrollments').select('*').eq('user_id', userId);
    if (error || !data) return [];
    return data.map((d) => ({
      id: d.id,
      userId: d.user_id,
      courseId: d.course_id,
      enrolledAt: d.enrolled_at,
      progressPercent: d.progress_percent,
      completedLessonIds: [],
      completedModuleIds: [],
      isCompleted: d.is_completed,
    }));
  },

  // --- REVISION SCHEDULE & REPETITION ---
  async getRevisionTopics(userId: string): Promise<RevisionTopic[]> {
    if (!isSupabaseConfigured) {
      return [
        {
          id: 'rev-1',
          userId,
          topicTitle: 'DBMS ER Diagrams & Cardinality',
          courseId: 'dbms-101',
          lessonId: 'm2-l1',
          scheduledDate: new Date().toISOString(),
          repetitionStage: 3,
          isCompleted: false,
        },
        {
          id: 'rev-2',
          userId,
          topicTitle: 'System Design: Rate Limiting & Token Bucket',
          courseId: 'sys-201',
          lessonId: 'm1-l4',
          scheduledDate: new Date().toISOString(),
          repetitionStage: 7,
          isCompleted: false,
        },
      ];
    }
    const { data } = await supabase.from('revision_schedule').select('*').eq('user_id', userId);
    if (!data) return [];
    return data.map((d) => ({
      id: d.id,
      userId: d.user_id,
      topicTitle: d.topic_title,
      courseId: d.course_id,
      lessonId: d.lesson_id,
      scheduledDate: d.scheduled_date,
      repetitionStage: d.repetition_stage,
      isCompleted: d.is_completed,
    }));
  },

  async recordPayment(payment: {
    user_id: string;
    course_id: string;
    amount: number;
    currency: string;
    stripe_payment_id: string;
    status: string;
  }): Promise<boolean> {
    if (!isSupabaseConfigured) return true;
    const { error } = await supabase.from('payments').insert([payment]);
    return !error;
  },

  // Only called on LOGIN — NOT on signup
  async recordLoginUser(email: string, fullName: string, provider: string = 'email'): Promise<boolean> {
    if (!isSupabaseConfigured) return true;
    const { error } = await supabase.from('login_users').upsert(
      [
        {
          email,
          full_name: fullName,
          login_provider: provider,
          last_login: new Date().toISOString(),
        },
      ],
      { onConflict: 'email' }
    );
    return !error;
  },

  async recordEnrollment(
    userId: string,
    courseId: string,
    courseTitle: string,
    amountPaid: number,
    currency: string = 'INR'
  ): Promise<boolean> {
    if (!isSupabaseConfigured) return true;
    const { error } = await supabase.from('enrolled_courses').upsert(
      [
        {
          user_id: userId,
          course_id: courseId,
          course_title: courseTitle,
          amount_paid: amountPaid,
          currency,
          progress_percent: 0,
          is_completed: false,
        },
      ],
      { onConflict: 'user_id,course_id' }
    );
    return !error;
  },

  async recordUserProgress(
    userId: string,
    courseId: string,
    moduleId: string,
    lessonId: string
  ): Promise<boolean> {
    if (!isSupabaseConfigured) return true;
    const { error } = await supabase.from('user_progress').upsert(
      [
        {
          user_id: userId,
          course_id: courseId,
          module_id: moduleId,
          lesson_id: lessonId,
          is_completed: true,
          completed_at: new Date().toISOString(),
        },
      ],
      { onConflict: 'user_id,lesson_id' }
    );
    return !error;
  },

  // Called ONLY when student completes ALL modules of an enrolled course
  async updateCourseCompletion(userId: string, courseId: string, progressPercent: number): Promise<boolean> {
    if (!isSupabaseConfigured) return true;
    const isFullyCompleted = progressPercent >= 100;
    const { error } = await supabase
      .from('enrolled_courses')
      .update({
        progress_percent: progressPercent,
        is_completed: isFullyCompleted,
        completed_at: isFullyCompleted ? new Date().toISOString() : null,
      })
      .eq('user_id', userId)
      .eq('course_id', courseId);
    return !error;
  },

  // Get enrolled courses for a specific user from Supabase
  async getUserEnrolledCourses(userId: string): Promise<string[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from('enrolled_courses')
      .select('course_id')
      .eq('user_id', userId);
    if (error || !data) return [];
    return data.map((d) => d.course_id);
  },

  // Save user profile to user_profile table
  async saveUserProfile(profile: {
    id: string;
    email: string;
    full_name: string;
    role: string;
  }): Promise<boolean> {
    if (!isSupabaseConfigured) return true;
    const { error } = await supabase.from('user_profile').upsert(
      [profile],
      { onConflict: 'email' }
    );
    return !error;
  },
};
