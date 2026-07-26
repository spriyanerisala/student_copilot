import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '@/utils/constants';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient background glow elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-xl shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">{APP_NAME}</span>
          </Link>
          <p className="text-xs text-slate-400">{APP_TAGLINE}</p>
        </div>

        {/* Glassmorphic Auth Card Wrapper */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};
