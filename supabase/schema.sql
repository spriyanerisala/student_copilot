-- ========================================================
-- StudyPilot AI - PostgreSQL Database Schema & RLS Setup
-- Compatible with Supabase PostgreSQL
-- ========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
  bio TEXT,
  streak_days INT DEFAULT 0,
  last_study_date TIMESTAMP WITH TIME ZONE,
  total_study_hours NUMERIC(8, 2) DEFAULT 0.00,
  placement_score INT DEFAULT 50,
  ats_score INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. COURSE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.course_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  category_id UUID REFERENCES public.course_categories(id) ON DELETE SET NULL,
  instructor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cover_image TEXT NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 4.80,
  review_count INT DEFAULT 0,
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  total_duration TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  discount_price NUMERIC(10, 2),
  enrolled_count INT DEFAULT 0,
  tags TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. MODULES TABLE
CREATE TABLE IF NOT EXISTS public.modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  order_index INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. LESSON CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.lesson_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID UNIQUE REFERENCES public.lessons(id) ON DELETE CASCADE,
  explanation TEXT NOT NULL,
  svg_diagram TEXT,
  examples JSONB DEFAULT '[]'::jsonb,
  interview_questions JSONB DEFAULT '[]'::jsonb,
  notes JSONB DEFAULT '[]'::jsonb,
  flashcards JSONB DEFAULT '[]'::jsonb,
  summary TEXT NOT NULL,
  practice_questions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  progress_percent INT DEFAULT 0,
  current_module_id UUID REFERENCES public.modules(id),
  current_lesson_id UUID REFERENCES public.lessons(id),
  is_completed BOOLEAN DEFAULT FALSE,
  certificate_id UUID,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- 8. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  payment_status TEXT NOT NULL CHECK (payment_status IN ('succeeded', 'pending', 'failed')),
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. QUIZZES TABLE
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  time_limit_minutes INT DEFAULT 15,
  passing_score INT DEFAULT 80,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. QUIZ QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of strings
  correct_option INT NOT NULL,
  explanation TEXT NOT NULL
);

-- 11. QUIZ ATTEMPTS TABLE
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  passed BOOLEAN NOT NULL,
  wrong_topics JSONB DEFAULT '[]'::jsonb,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. LESSON PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- 13. MODULE PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- 14. COURSE PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.course_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  progress_percent INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- 15. STUDY SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  duration_minutes INT NOT NULL,
  session_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. FLASHCARDS TABLE
CREATE TABLE IF NOT EXISTS public.flashcards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  front_text TEXT NOT NULL,
  back_text TEXT NOT NULL,
  mastery_level INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. AI CHAT HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.ai_chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  chat_type TEXT DEFAULT 'mentor' CHECK (chat_type IN ('mentor', 'mcq', 'coding', 'summary', 'revision')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 18. RESUME ANALYSIS TABLE
CREATE TABLE IF NOT EXISTS public.resume_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  ats_score INT NOT NULL,
  missing_skills JSONB DEFAULT '[]'::jsonb,
  improvement_suggestions JSONB DEFAULT '[]'::jsonb,
  recommended_learning_path JSONB DEFAULT '[]'::jsonb,
  analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19. REVISION SCHEDULE TABLE (Spaced Repetition: 1, 3, 7, 15, 30 Days)
CREATE TABLE IF NOT EXISTS public.revision_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  topic_title TEXT NOT NULL,
  repetition_stage INT DEFAULT 1 CHECK (repetition_stage IN (1, 3, 7, 15, 30)),
  scheduled_date DATE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 20. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  final_score INT NOT NULL,
  issue_date DATE DEFAULT CURRENT_DATE,
  qr_code_data TEXT NOT NULL,
  pdf_storage_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 21. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'revision', 'quiz', 'course', 'system')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ========================================================
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category_id);
CREATE INDEX IF NOT EXISTS idx_modules_course ON public.modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_module ON public.lessons(module_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON public.lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_revision_user_date ON public.revision_schedule(user_id, scheduled_date);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revision_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_analysis ENABLE ROW LEVEL SECURITY;

-- Profiles Policy
CREATE POLICY "Public profiles read access" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users edit own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Courses Policy
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);

-- Enrollments Policy
CREATE POLICY "Users view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own enrollment" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payments Policy
CREATE POLICY "Users view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);

-- Quiz Attempts Policy
CREATE POLICY "Users view own quiz attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own quiz attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Lesson Progress Policy
CREATE POLICY "Users view own lesson progress" ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert/update own lesson progress" ON public.lesson_progress FOR ALL USING (auth.uid() = user_id);

-- Revision Schedule Policy
CREATE POLICY "Users view own revision schedule" ON public.revision_schedule FOR SELECT USING (auth.uid() = user_id);

-- Certificates Policy
CREATE POLICY "Anyone view valid certificates" ON public.certificates FOR SELECT USING (true);

-- AI Chat History & Resume Analysis Policies
CREATE POLICY "Users manage own AI chat" ON public.ai_chat_history FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own resume analysis" ON public.resume_analysis FOR ALL USING (auth.uid() = user_id);

-- AUTOMATIC PROFILE CREATION TRIGGER ON AUTH SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student'),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
