import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Zap } from 'lucide-react';
import { Card, Button } from '@/components/ui';

export const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'Free Starter',
      badge: 'Basic Access',
      priceMonthly: 0,
      priceAnnual: 0,
      description: 'Ideal for trying out course previews and core LMS features.',
      features: [
        'Access to Module 1 of all courses',
        'Basic AI Mentor queries (10/day)',
        'Community discussion access',
        'Standard learning dashboard',
      ],
      ctaText: 'Start Free Trial',
      variant: 'glass' as const,
    },
    {
      name: 'Pro Learner',
      badge: 'Most Popular',
      priceMonthly: 29,
      priceAnnual: 22,
      description: 'Complete access to all course paths, AI Mentor, and PDF summarizer.',
      features: [
        'Full access to all 50+ courses & modules',
        'Unlimited AI Mentor & 24/7 Tutor queries',
        'Unlimited PDF Summarizer & Note Extractor',
        'Spaced Repetition Auto-Revision Schedule',
        'Module Quizzes & Verified Certificates',
      ],
      ctaText: 'Unlock Pro Access',
      variant: 'primary' as const,
      highlighted: true,
    },
    {
      name: 'Placement Accelerator',
      badge: 'Career Guarantee',
      priceMonthly: 79,
      priceAnnual: 59,
      description: 'Designed for students aiming for SDE-1 / SDE-2 career placement.',
      features: [
        'Everything in Pro Learner plan',
        'Unlimited Resume ATS Skill Gap Analyzer',
        'Unlimited AI HR & Technical Mock Interviews',
        'Personal Placement Readiness Scorecard',
        '1-on-1 Portfolio & Project Review Guidance',
      ],
      ctaText: 'Join Placement Tier',
      variant: 'glass' as const,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 lg:px-8 relative select-none">
      <div className="max-w-7xl mx-auto space-y-12 text-center">
        {/* Header */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300 inline-flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" /> Flexible Pricing
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Invest in Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Software Career</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Transparent pricing with zero hidden fees. Cancel anytime with a 14-day money-back guarantee.
          </p>
        </div>

        {/* Annual / Monthly Toggle Switch */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-8 rounded-full bg-slate-800 p-1 relative border border-slate-700 transition-colors"
          >
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
              Save 25%
            </span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          {tiers.map((tier) => {
            const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
            return (
              <Card
                key={tier.name}
                className={`p-8 flex flex-col justify-between relative ${
                  tier.highlighted
                    ? 'border-2 border-purple-500 shadow-2xl shadow-purple-500/20 bg-slate-900/90'
                    : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <p className="text-xs text-slate-300">{tier.description}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">${price}</span>
                    <span className="text-xs text-slate-400">/ month</span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">What's included:</p>
                    {tier.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <Link to="/register" className="w-full">
                    <Button variant={tier.variant} className="w-full">
                      {tier.ctaText}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
