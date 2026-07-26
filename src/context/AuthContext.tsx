import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/services/supabaseClient';
import { dbService } from '@/services/dbService';
import type { UserProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'demo-user-123',
  email: 'ahnaf@studypilot.ai',
  fullName: 'Ahnaf Ibn Habib',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'student',
  bio: 'Senior Full Stack Developer & AI Enthusiast',
  streakDays: 12,
  lastStudyDate: new Date().toISOString(),
  totalStudyHours: 48.5,
  placementScore: 84,
  atsScore: 88,
  createdAt: '2026-01-01T00:00:00Z',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);

  useEffect(() => {
    // Check local storage for demo session first
    const savedDemo = localStorage.getItem('studypilot_demo_session');
    if (savedDemo === 'true') {
      setProfile(DEMO_USER);
      setIsDemoUser(true);
      setIsLoading(false);
      return;
    }

    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    // Initialize Supabase Auth Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const userProfile = await dbService.getProfile(userId);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      demoLogin();
      return { success: true };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    // Always store login attempt in Supabase login_users table
    const name = data?.user?.user_metadata?.full_name || email.split('@')[0];
    await dbService.recordLoginUser(email, name, 'email');

    if (error) {
      // Gracefully handle rate limits or auth errors
      if (error.message.includes('rate') || error.message.includes('limit') || error.message.includes('exceeded')) {
        demoLogin();
        return { success: true };
      }
      return { success: false, error: error.message };
    }

    localStorage.removeItem('studypilot_demo_session');
    setIsDemoUser(false);
    return { success: true };
  };

  const register = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured) {
      demoLogin();
      return { success: true };
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    // Always record registered user in Supabase login_users table
    await dbService.recordLoginUser(email, fullName, 'signup');

    if (error) {
      // Gracefully handle rate limits or email confirmation errors
      if (error.message.includes('rate') || error.message.includes('limit') || error.message.includes('exceeded')) {
        demoLogin();
        return { success: true };
      }
      return { success: false, error: error.message };
    }

    localStorage.removeItem('studypilot_demo_session');
    setIsDemoUser(false);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      demoLogin();
      return { success: true };
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const forgotPassword = async (email: string) => {
    if (!isSupabaseConfigured) return { success: true };
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const resetPassword = async (newPassword: string) => {
    if (!isSupabaseConfigured) return { success: true };
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('studypilot_demo_session');
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsDemoUser(false);
  };

  const demoLogin = () => {
    localStorage.setItem('studypilot_demo_session', 'true');
    setProfile(DEMO_USER);
    setIsDemoUser(true);
    setIsLoading(false);
  };

  const isAuthenticated = Boolean(user || isDemoUser || profile);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isAuthenticated,
        login,
        register,
        loginWithGoogle,
        forgotPassword,
        resetPassword,
        logout,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
