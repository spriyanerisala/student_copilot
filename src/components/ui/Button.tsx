import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl';

    const variants = {
      primary:
        'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 border border-purple-400/20 active:scale-[0.98]',
      secondary:
        'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60 active:scale-[0.98]',
      outline:
        'bg-transparent hover:bg-slate-800/40 text-slate-200 border border-slate-700 hover:border-slate-500 active:scale-[0.98]',
      ghost:
        'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white',
      glass:
        'glass-panel hover:border-purple-500/40 text-slate-100 shadow-lg hover:shadow-purple-500/10 active:scale-[0.98]',
      danger:
        'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-500/25 active:scale-[0.98]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2.5 text-xs font-semibold gap-2',
      lg: 'px-6 py-3.5 text-sm font-semibold gap-2.5 rounded-2xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
