import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Rohan Sharma',
      role: 'SDE-1 at Amazon',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: 'The DBMS and System Design modules on StudyPilot AI were phenomenal! The AI Mentor clarified query optimization concepts instantly, and the Mock Interview scoring helped me clear Amazon SDE-1 rounds.',
      rating: 5,
    },
    {
      name: 'Priya Mukherjee',
      role: 'Full Stack Engineer at Stripe',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      text: 'The ATS Resume Analyzer flagged critical missing keywords in my CV and suggested key backend projects. My ATS score jumped from 58 to 91, getting me interview callbacks within a week!',
      rating: 5,
    },
    {
      name: 'Tanvir Ahmed',
      role: 'Frontend Architect at Scaler',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      text: 'The PDF Summarizer saves me hours of manual note taking. Uploading 200-page DBMS textbooks gives me instant flashcards and spaced-repetition revision schedules that actually stick.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 lg:px-8 relative select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300 inline-flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400" /> Proven Outcomes
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Loved by <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">50,000+ Engineers</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            See how StudyPilot AI students accelerated their careers into top tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-purple-500/40" />
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/40" />
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[10px] text-purple-400 font-medium">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
