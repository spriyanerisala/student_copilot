import React from 'react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Analytics & Performance</h1>
      <p className="text-xs text-slate-400">Track daily study hours, quiz scores, and weak topics.</p>
    </div>
  );
};

export const PlacementReadinessPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Placement Readiness Scorecard</h1>
      <p className="text-xs text-slate-400">Comprehensive score based on ATS, Quizzes, Consistency & DSA.</p>
    </div>
  );
};

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Account Settings</h1>
      <p className="text-xs text-slate-400">Manage profile details, theme preferences, and security.</p>
    </div>
  );
};

export const CertificatesPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-white">Course Certificates</h1>
      <p className="text-xs text-slate-400">View and download verified certificates for completed courses.</p>
    </div>
  );
};
