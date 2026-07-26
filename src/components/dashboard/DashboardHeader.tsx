import React from 'react';
import { Video, Code } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const DashboardHeader: React.FC = () => {
  const { profile } = useAuth();
  const userName = profile?.fullName || 'Ahnaf Ibn Habib';

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
      {/* User Welcome Message */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Hi, {userName} <span className="text-2xl">👋</span>
        </h1>
        <p className="text-xs text-slate-400">
          Welcome Back to your dashboard • Keep up the great learning momentum!
        </p>
      </div>
    </div>
  );
};
