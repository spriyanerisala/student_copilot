import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { CoursesPreviewSection } from '@/components/landing/CoursesPreviewSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FaqSection, CtaBanner } from '@/components/landing/FaqCtaComponents';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <HeroSection />
      <FeaturesSection />
      <CoursesPreviewSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
    </div>
  );
};
