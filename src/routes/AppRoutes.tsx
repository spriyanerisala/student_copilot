import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Guards
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Pages
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage } from '@/pages/auth/AuthPages';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { MarketplacePage, CourseDetailsPage } from '@/pages/marketplace/MarketplacePages';
import { LessonViewerPage, QuizPage } from '@/pages/learning/LearningPages';
import { AiMentorPage, PdfSummarizerPage, ResumeAnalyzerPage, MockInterviewPage } from '@/pages/ai/AiPages';
import { CertificatePage } from '@/pages/certificate/CertificatePage';
import { VerifyCertificatePage } from '@/pages/certificate/VerifyCertificatePage';
import { PaymentSuccessPage } from '@/pages/payment/PaymentSuccessPage';
import { AnalyticsPage } from '@/pages/analytics/AnalyticsPage';
import { PlacementPage } from '@/pages/placement/PlacementPage';
import { SettingsPage } from '@/pages/misc/MiscPages';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/course/:courseId" element={<CourseDetailsPage />} />
        <Route path="/verify-certificate/:certificateHash" element={<VerifyCertificatePage />} />
      </Route>

      {/* Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected Dashboard & App Pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/course/:courseId/lesson/:lessonId" element={<LessonViewerPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/ai-mentor" element={<AiMentorPage />} />
          <Route path="/pdf-summarizer" element={<PdfSummarizerPage />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
          <Route path="/mock-interview" element={<MockInterviewPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/placement-readiness" element={<PlacementPage />} />
          <Route path="/certificate/:certificateId" element={<CertificatePage />} />
          <Route path="/certificates" element={<CertificatePage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
