import React from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, leftIcon, rightIcon, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-slate-300">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-slate-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'w-full bg-slate-900/80 border border-slate-700/60 rounded-xl py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/60 transition-all',
              leftIcon ? 'pl-9' : 'px-4',
              rightIcon ? 'pr-9' : 'px-4',
              error && 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/40',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-slate-400">
              {rightIcon}
            </span>
          )}
        </div>
        {error ? (
          <p className="text-[11px] text-rose-400">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
