import React from 'react';
import { cn } from '@/utils/cn';

// Avatar Component
export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  isOnline = false,
  className,
}) => {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="relative inline-block select-none">
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            'rounded-full object-cover ring-2 ring-purple-500/30 shadow-md',
            sizes[size],
            className
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 font-bold text-white flex items-center justify-center ring-2 ring-purple-500/30 shadow-md',
            sizes[size],
            className
          )}
        >
          {initials}
        </div>
      )}
      {isOnline && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
      )}
    </div>
  );
};

// Skeleton Component
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  ...props
}) => {
  const variants = {
    text: 'h-3 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-2xl',
  };

  return (
    <div
      className={cn(
        'bg-slate-800/80 animate-pulse border border-slate-700/30',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
