import type { Course } from '@/types';
import { dbService } from '@/services/dbService';

export interface StripePaymentSession {
  sessionId: string;
  courseId: string;
  courseTitle: string;
  originalPrice: number;
  discountPrice: number;
  discountApplied: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
}

export const stripeService = {
  // Validate publishable key
  getStripePublishableKey(): string {
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
  },

  async createCheckoutSession(course: Course, promoCode?: string): Promise<StripePaymentSession> {
    await new Promise((res) => setTimeout(res, 600));

    let discountPercentage = 0;
    if (promoCode?.toUpperCase() === 'STUDENT50') {
      discountPercentage = 0.5; // 50% off
    } else if (promoCode?.toUpperCase() === 'PILOT20') {
      discountPercentage = 0.2; // 20% off
    }

    const basePrice = course.discountPrice ?? course.price;
    const finalPrice = Math.round(basePrice * (1 - discountPercentage));
    const discountApplied = Math.round(basePrice - finalPrice);

    return {
      sessionId: `cs_test_${Math.random().toString(36).substring(2, 11)}`,
      courseId: course.id,
      courseTitle: course.title,
      originalPrice: course.price,
      discountPrice: finalPrice,
      discountApplied,
      currency: 'INR',
      status: 'pending',
    };
  },

  async confirmPayment(
    _sessionId: string,
    courseId: string,
    amount: number
  ): Promise<{ transactionId: string; timestamp: string }> {
    await new Promise((res) => setTimeout(res, 800));

    const transactionId = `txn_${Math.random().toString(36).substring(2, 11)}`;
    const timestamp = new Date().toISOString();

    // Get current user identity
    const currentEmail = localStorage.getItem('studypilot_current_user_email') || 'guest';
    const userId = `usr-${currentEmail.replace(/[^a-z0-9]/gi, '-')}`;

    // Persist payment record into Supabase `payments` table
    await dbService.recordPayment({
      user_id: userId,
      course_id: courseId,
      amount,
      currency: 'INR',
      stripe_payment_id: transactionId,
      status: 'succeeded',
    });

    // Record course enrollment into Supabase `enrolled_courses` table
    await dbService.recordEnrollment(userId, courseId, `Course Enrollment (${courseId})`, amount, 'INR');

    // Local state sync for instant unlocking — keyed per user
    const enrollKey = `studypilot_enrolled_${currentEmail}`;
    try {
      const savedEnrolled = JSON.parse(localStorage.getItem(enrollKey) || '[]');
      if (!savedEnrolled.includes(courseId)) {
        savedEnrolled.push(courseId);
        localStorage.setItem(enrollKey, JSON.stringify(savedEnrolled));
      }
    } catch {
      localStorage.setItem(enrollKey, JSON.stringify([courseId]));
    }

    return {
      transactionId,
      timestamp,
    };
  },
};
