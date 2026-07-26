import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the AI Mentor understand my course progress?',
      a: 'StudyPilot AI connects the AI Mentor directly to your active lesson content, quiz history, and weak topics. When you ask a question, the AI evaluates your context to give personalized explanations, examples, and practice questions.',
    },
    {
      q: 'What formats are supported for the PDF Summarizer?',
      a: 'The PDF Summarizer supports standard PDF documents, textbooks, lecture slides, and notes. Uploaded files are stored securely in Supabase Storage and parsed instantly.',
    },
    {
      q: 'How accurate is the Resume ATS Skill Gap Analyzer?',
      a: 'The ATS Analyzer scans your resume against current tech industry job descriptions (Software Engineer, Full Stack, AI Engineer) using NLP algorithms to check keyword density, section formatting, missing skills, and impact metrics.',
    },
    {
      q: 'Are certificates verified and downloadable as PDF?',
      a: 'Yes! Upon achieving ≥ 80% on the course Final Assessment, StudyPilot AI generates a verified certificate containing student name, completion date, unique certificate ID, and dynamic QR code.',
    },
    {
      q: 'Can I start for free without adding a credit card?',
      a: 'Absolutely. The Free Starter plan lets you access preview modules of all courses, test the AI Mentor, and explore the learning dashboard without entering any credit card details.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 lg:px-8 relative select-none">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300 inline-flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-400" /> Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-16 px-4 lg:px-8 relative select-none">
      <div className="max-w-6xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-purple-950/80 border border-purple-500/30 relative overflow-hidden shadow-2xl text-center space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <span className="px-4 py-1 rounded-full text-xs font-semibold bg-white/10 text-purple-200 inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-300" /> Start Learning Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Build Your Engineering Future?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Join 50,000+ students mastering Computer Science, System Design, Full-Stack Development, and AI Engineering.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
