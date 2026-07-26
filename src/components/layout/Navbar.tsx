import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Sun, Moon, Sparkles, User, LogOut, BookOpen, Flame } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { APP_NAME } from '@/utils/constants';

import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  onMobileMenuToggle?: () => void;
  showSidebarToggle?: boolean;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { theme, toggleTheme } = useTheme();
  const { profile, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockUser = {
    name: profile?.fullName || user?.email?.split('@')[0] || 'Ahnaf Ibn Habib',
    email: profile?.email || user?.email || 'ahnaf@studypilot.ai',
    avatar: profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    streak: profile?.streakDays || 12,
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Search */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                {APP_NAME}
              </span>
              <span className="text-[10px] font-medium tracking-wider text-purple-400 uppercase -mt-1">
                AI LMS Platform
              </span>
            </div>
          </Link>

          {/* Search Input Bar */}
          <div className="hidden md:flex items-center relative w-64 lg:w-80">
            <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search courses, lessons, AI mentor..."
              className="w-full bg-slate-900/60 dark:bg-slate-900/80 border border-slate-700/50 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/50 transition-all"
            />
            <kbd className="hidden lg:inline-flex absolute right-3 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Actions, Streaks & Profile */}
        <div className="flex items-center gap-3">
          {/* Daily Streak Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
            <span>{mockUser.streak} Day Streak</span>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Notifications Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800 transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-slate-900" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-card p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <h4 className="text-xs font-semibold text-white">Notifications</h4>
                  <span className="text-[10px] text-purple-400 cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 text-xs p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-200 font-medium">AI Mentor Scheduled Revision</p>
                      <p className="text-[10px] text-slate-400">DBMS Normalization Quiz due today.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs p-2 rounded-xl hover:bg-white/5 transition-colors">
                    <BookOpen className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-200 font-medium">New Lesson Available</p>
                      <p className="text-[10px] text-slate-400">System Design: Rate Limiters unlocked.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/50 transition-all"
            >
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-purple-500/30"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-xs font-semibold text-white">{mockUser.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{mockUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left"
                >
                  <User className="w-4 h-4 text-purple-400" /> My Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Account Settings
                </button>
                <div className="my-1 border-t border-white/10" />
                <button
                  onClick={async () => {
                    await logout();
                    navigate('/login');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
