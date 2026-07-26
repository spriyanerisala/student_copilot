import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import type { Course } from '@/types';
import { Modal, Button } from '@/components/ui';
import { StripeCheckoutForm } from '@/components/payment/StripeCheckoutForm';
import { stripeService, type StripePaymentSession } from '@/services/stripeService';

interface PurchaseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ course, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [purchased, setPurchased] = useState(false);
  const [completedSession, setCompletedSession] = useState<StripePaymentSession | null>(null);

  if (!course) return null;

  const handlePaymentSuccess = async (session: StripePaymentSession) => {
    setCompletedSession(session);
    setPurchased(true);
    // Confirm payment and log record to Supabase
    await stripeService.confirmPayment(session.sessionId, course.id, session.discountPrice);
  };

  const handleStartCourse = () => {
    onClose();
    setPurchased(false);
    navigate(`/course/${course.id}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setPurchased(false);
        onClose();
      }}
      title={purchased ? 'Enrollment Confirmed! 🎉' : 'Stripe Secure Checkout'}
      description={purchased ? 'You now have full lifetime access' : 'Instant enrollment & AI Mentor access'}
      maxWidth="md"
    >
      {purchased ? (
        <div className="space-y-6 text-center py-4 select-none">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">Course Unlocked Successfully!</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Your transaction for <strong className="text-purple-300">{course.title}</strong> has been logged to Supabase.
            </p>
            {completedSession && (
              <p className="text-[11px] text-emerald-400 font-mono pt-1">
                Paid: ₹{completedSession.discountPrice} INR • ID: {completedSession.sessionId}
              </p>
            )}
          </div>
          <Button onClick={handleStartCourse} className="w-full">
            Go to Course Viewer Now
          </Button>
        </div>
      ) : (
        <StripeCheckoutForm course={course} onPaymentSuccess={handlePaymentSuccess} />
      )}
    </Modal>
  );
};
