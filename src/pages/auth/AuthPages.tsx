import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User as UserIcon, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button, Input } from '@/components/ui';

// Validation Schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

const resetSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;
type ForgotFormValues = z.infer<typeof forgotSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

// --- LOGIN PAGE ---
export const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, demoLogin } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setAuthError(null);
    const res = await login(data.email, data.password);
    setIsSubmitting(false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setAuthError(res.error || 'Failed to sign in');
    }
  };

  const handleGoogleSignIn = async () => {
    const res = await loginWithGoogle();
    if (res.success) navigate('/dashboard');
  };

  const handleDemoSignIn = () => {
    demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Welcome back</h2>
        <p className="text-xs text-slate-400">Sign in to your StudyPilot AI account</p>
      </div>

      {authError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      {/* Demo Account Banner */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-slate-200">Want quick access?</span>
        </div>
        <button
          onClick={handleDemoSignIn}
          className="text-xs font-semibold text-purple-300 hover:text-white underline cursor-pointer"
        >
          Try Demo Login →
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-[11px] text-purple-400 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
          Sign In
        </Button>
      </form>

      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-white/10 w-full" />
        <span className="bg-[#12141c] px-3 text-[10px] text-slate-500 uppercase font-semibold relative">OR</span>
      </div>

      {/* Google OAuth Button */}
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-2.5"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
          />
          <path
            fill="#34A853"
            d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="text-center text-xs text-slate-400">
        Don't have an account?{' '}
        <Link to="/register" className="text-purple-400 font-medium hover:underline">
          Create account
        </Link>
      </div>
    </div>
  );
};

// --- REGISTER PAGE ---
export const RegisterPage: React.FC = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setAuthError(null);
    const res = await registerAuth(data.email, data.password, data.fullName);
    setIsSubmitting(false);
    if (res.success) {
      navigate('/dashboard');
    } else {
      setAuthError(res.error || 'Failed to create account');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Create an account</h2>
        <p className="text-xs text-slate-400">Start your AI learning journey today</p>
      </div>

      {authError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{authError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          leftIcon={<UserIcon className="w-4 h-4" />}
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input
          label="Email address"
          type="email"
          placeholder="name@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" isLoading={isSubmitting} className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
          Create Account
        </Button>
      </form>

      <div className="text-center text-xs text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="text-purple-400 font-medium hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

// --- FORGOT PASSWORD PAGE ---
export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormValues) => {
    setIsSubmitting(true);
    await forgotPassword(data.email);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Reset Password</h2>
        <p className="text-xs text-slate-400">Enter your email to receive password reset instructions</p>
      </div>

      {submitted ? (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <p className="text-xs text-slate-200 font-medium">Reset instructions sent!</p>
          <p className="text-[11px] text-slate-400">Check your email inbox for the reset link.</p>
          <Link to="/login" className="inline-block pt-2 text-xs text-purple-400 font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="name@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Send Reset Link
          </Button>

          <div className="text-center text-xs">
            <Link to="/login" className="text-purple-400 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

// --- RESET PASSWORD PAGE ---
export const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormValues) => {
    setIsSubmitting(true);
    const res = await resetPassword(data.password);
    setIsSubmitting(false);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">Set New Password</h2>
        <p className="text-xs text-slate-400">Enter a secure new password for your account</p>
      </div>

      {success ? (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <p className="text-xs text-slate-200 font-medium">Password updated successfully!</p>
          <p className="text-[11px] text-slate-400">Redirecting to dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Update Password
          </Button>
        </form>
      )}
    </div>
  );
};
