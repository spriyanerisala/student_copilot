import React from 'react';
import { cn } from '@/utils/cn';

export interface ProgressBarProps {
  value: number; // 0 - 100
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'purple' | 'emerald' | 'amber' | 'gradient';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'gradient',
  className,
}) => {
  const percentage = Math.min(Math.max(0, Math.round((value / max) * 100)), 100);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variants = {
    purple: 'bg-purple-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    gradient: 'bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500',
  };

  return (
    <div className={cn('w-full space-y-1', className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
          <span>Progress</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
      )}
      <div className={cn('w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/40 p-0.5', heights[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out shadow-sm', variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
