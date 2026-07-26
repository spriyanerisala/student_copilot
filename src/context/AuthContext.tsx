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
  avatarUrl: 'https://ui-avatars.com/api/?name=Ahnaf&background=8b5cf6&color=fff',
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
    // Restore user-specific profile from localStorage if session exists
    const savedDemo = localStorage.getItem('studypilot_demo_session');
    const currentEmail = localStorage.getItem('studypilot_current_user_email');
    if (savedDemo === 'true' && currentEmail) {
      try {
        const savedProfile = JSON.parse(localStorage.getItem(`studypilot_profile_${currentEmail}`) || 'null');
        if (savedProfile) {
          setProfile(savedProfile);
          setIsDemoUser(true);
          setIsLoading(false);
          return;
        }
      } catch {}
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
    let name = email.split('@')[0];
    let userId = `usr-${email.replace(/[^a-z0-9]/gi, '-')}`;

    // Check locally registered users list to get full name
    try {
      const registered = JSON.parse(localStorage.getItem('studypilot_registered_users') || '[]');
      const match = registered.find((u: { email: string }) => u.email.toLowerCase() === email.toLowerCase());
      if (match) name = match.fullName || name;
    } catch {}

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data?.user) {
        userId = data.user.id;
        name = data.user.user_metadata?.full_name || name;
      }
    }

    const userProfile: import('@/types').UserProfile = {
      id: userId,
      email,
      fullName: name.charAt(0).toUpperCase() + name.slice(1),
      role: 'student',
      streakDays: 12,
      totalStudyHours: 48.5,
      placementScore: 84,
      atsScore: 88,
      createdAt: new Date().toISOString(),
    };

    // Record login in Supabase login_users — ONLY on actual login
    await dbService.recordLoginUser(email, userProfile.fullName, 'email');
    // Save profile to user_profile table
    await dbService.saveUserProfile({
      id: userId,
      email,
      full_name: userProfile.fullName,
      role: 'student',
    });

    // Persist user profile in user-specific localStorage key
    localStorage.setItem(`studypilot_profile_${email}`, JSON.stringify(userProfile));
    localStorage.setItem('studypilot_current_user_email', email);
    localStorage.setItem('studypilot_demo_session', 'true');
    setProfile(userProfile);
    setIsDemoUser(true);
    setIsLoading(false);
    return { success: true };
  };

  const register = async (email: string, password: string, fullName: string) => {
    // Save to local registered users list so login always recognizes user
    try {
      const registered = JSON.parse(localStorage.getItem('studypilot_registered_users') || '[]');
      const exists = registered.some((u: { email: string }) => u.email.toLowerCase() === email.toLowerCase());
      if (!exists) {
        registered.push({ email, password, fullName });
        localStorage.setItem('studypilot_registered_users', JSON.stringify(registered));
      }
    } catch {}

    // Try Supabase auth signup — do NOT record in login_users here
    if (isSupabaseConfigured) {
      await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
    }

    // Do NOT set profile or login here — user must go to Login page
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
    const currentEmail = localStorage.getItem('studypilot_current_user_email');
    localStorage.removeItem('studypilot_demo_session');
    localStorage.removeItem('studypilot_current_user_email');
    if (currentEmail) {
      localStorage.removeItem(`studypilot_profile_${currentEmail}`);
    }
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsDemoUser(false);
  };

  const demoLogin = () => {
    localStorage.setItem('studypilot_demo_session', 'true');
    localStorage.setItem('studypilot_current_user_email', DEMO_USER.email);
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
