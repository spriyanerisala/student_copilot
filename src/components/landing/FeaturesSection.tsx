import React from 'react';
import { motion } from 'framer-motion';
import { Bot, FileText, FileSearch, MessageSquare, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'Context-Aware AI Mentor',
      badge: 'Interactive Tutor',
      description:
        'Ask questions anytime during lessons. The AI understands your current module, quiz scores, and weak topics to generate simplified explanations, real-world examples, and instant MCQs.',
      color: 'from-purple-500 to-indigo-500',
      bullets: ['24/7 Real-Time Concept Explanations', 'Instant MCQ & Coding Question Generator', 'Spaced Repetition Flashcards'],
      link: '/ai-mentor',
    },
    {
      icon: FileText,
      title: 'PDF Summarizer & Note Generator',
      badge: 'Document Intelligence',
      description:
        'Upload textbooks, lecture slides, or PDF notes. Our AI instantly distills complex documents into concise executive summaries, key bullet points, and auto-generated revision decks.',
      color: 'from-blue-500 to-cyan-500',
      bullets: ['Extract Key Takeaways in Seconds', 'Automatic Flashcard Conversion', 'Supabase Secure Cloud Storage'],
      link: '/pdf-summarizer',
    },
    {
      icon: FileSearch,
      title: 'Resume ATS Skill Gap Analyzer',
      badge: 'Career Optimization',
      description:
        'Upload your resume to receive an industry-grade ATS score. Detect missing skills, get recommended project upgrades, and receive a customized learning roadmap.',
      color: 'from-pink-500 to-rose-500',
      bullets: ['Automated ATS Score Calculation', 'Missing Skill & Keyword Detection', 'Custom Course Recommendations'],
      link: '/resume-analyzer',
    },
    {
      icon: MessageSquare,
      title: 'AI Mock Interview Simulator',
      badge: 'Placement Preparation',
      description:
        'Practice HR and Technical interviews in a realistic simulated environment. Get instant AI feedback on technical depth, communication clarity, and overall interview readiness.',
      color: 'from-emerald-500 to-teal-500',
      bullets: ['HR & Technical Interview Support', 'Granular Communication & Coding Scores', 'Actionable Answer Feedback'],
      link: '/mock-interview',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 lg:px-8 relative select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300 inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" /> Powered by Advanced AI
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Supercharge Learning with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Integrated AI Tools</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            StudyPilot AI bridges the gap between passive course watching and career placement with real-time AI assistance.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 shadow-lg`}>
                        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-300">
                        {feature.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="space-y-2 pt-2">
                      {feature.bullets.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10">
                    <Link
                      to={feature.link}
                      className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Try {feature.title} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
