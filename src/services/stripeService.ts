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
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_studypilot_ai_mock_key_2026';
  },

  async createCheckoutSession(course: Course, promoCode?: string): Promise<StripePaymentSession> {
    await new Promise((res) => setTimeout(res, 800));

    let discountPercentage = 0;
    if (promoCode?.toUpperCase() === 'STUDENT50') {
      discountPercentage = 0.5; // 50% off
    } else if (promoCode?.toUpperCase() === 'PILOT20') {
      discountPercentage = 0.2; // 20% off
    }

    const basePrice = course.discountPrice ?? course.price;
    const finalPrice = Number((basePrice * (1 - discountPercentage)).toFixed(2));
    const discountApplied = Number((basePrice - finalPrice).toFixed(2));

    return {
      sessionId: `cs_test_${Math.random().toString(36).substring(2, 11)}`,
      courseId: course.id,
      courseTitle: course.title,
      originalPrice: course.price,
      discountPrice: finalPrice,
      discountApplied,
      currency: 'usd',
      status: 'pending',
    };
  },

  async confirmPayment(
    _sessionId: string,
    courseId: string,
    amount: number
  ): Promise<{ transactionId: string; timestamp: string }> {
    await new Promise((res) => setTimeout(res, 1200));

    const transactionId = `txn_${Math.random().toString(36).substring(2, 11)}`;
    const timestamp = new Date().toISOString();

    // Persist payment record into Supabase `payments` table
    await dbService.recordPayment({
      user_id: 'usr-demo-101',
      course_id: courseId,
      amount,
      currency: 'usd',
      stripe_payment_id: transactionId,
      status: 'completed',
    });

    return {
      transactionId,
      timestamp,
    };
  },
};
