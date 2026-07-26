import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Flame, Star, ShieldCheck, Play, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 px-4 lg:px-8 overflow-hidden select-none">
      {/* Background ambient lighting glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-pink-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold shadow-lg shadow-purple-500/10"
        >
          <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Next-Gen AI LMS & Career Accelerator</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] max-w-5xl mx-auto"
        >
          Master High-Paying Tech Skills with Personal{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">
            AI Mentors
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Interactive course paths, 24/7 AI tutoring, spaced-repetition revision, ATS resume scoring, and AI mock interviews tailored for software engineering careers.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link to="/register">
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Get Started Free
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button size="lg" variant="glass" leftIcon={<BookOpen className="w-4 h-4 text-purple-400" />}>
              Explore Marketplace
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs pt-4"
        >
          <span className="flex items-center gap-1.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> No Credit Card Required
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 Rating (12,000+ Reviews)
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Award className="w-4 h-4 text-indigo-400" /> 94.8% Placement Success Rate
          </span>
        </motion.div>

        {/* Mockup Dashboard Preview Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-10 max-w-5xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-3 sm:p-5 border border-white/15 shadow-2xl relative overflow-hidden group">
            {/* Top Mock Window Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-[11px] text-slate-500 font-mono ml-2">studypilot.ai/dashboard</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-purple-400" /> AI Active
                </span>
              </div>
            </div>

            {/* Dashboard Inner Preview Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left p-2">
              {/* Left Widget: Current Active Course */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">In Progress</span>
                  <span className="text-xs text-slate-400 font-mono">65% Done</span>
                </div>
                <h4 className="text-sm font-bold text-white">Database Management Systems (DBMS)</h4>
                <p className="text-xs text-slate-400">Module 2: Relational Model & ER Cardinality</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-[65%]" />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">Next: Quiz 2.1</span>
                  <button className="text-xs text-purple-400 font-semibold flex items-center gap-1 hover:underline">
                    Continue <Play className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Middle Widget: AI Mentor Active Assistant */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/60 to-indigo-950/60 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-xs font-bold text-white">AI Mentor Suggestion</span>
                </div>
                <p className="text-xs text-purple-200 leading-relaxed">
                  "Based on your recent DBMS Quiz score (92%), you are ready for System Design: Database Sharding & Indexing!"
                </p>
                <div className="p-2 rounded-xl bg-slate-900/60 text-[11px] text-slate-300 font-mono">
                  💡 Tip: Practice 3 MCQs on 3NF Normalization
                </div>
              </div>

              {/* Right Widget: Streak & Placement Readiness */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Readiness Score</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                    88/100
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                    <Flame className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">12 Day Streak!</p>
                    <p className="text-[11px] text-slate-400">Top 3% active learning consistency</p>
                  </div>
                </div>
                <div className="pt-1 text-[11px] text-slate-400 flex justify-between">
                  <span>ATS Resume Score: 85%</span>
                  <span>Mock Interview: Passed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
