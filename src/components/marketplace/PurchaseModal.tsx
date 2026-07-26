import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import type { Course } from '@/types';
import { Modal, Button } from '@/components/ui';

interface PurchaseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ course, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchased, setPurchased] = useState(false);

  if (!course) return null;

  const finalPrice = course.discountPrice ?? course.price;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate Stripe Checkout API transaction
    setTimeout(() => {
      setIsProcessing(false);
      setPurchased(true);
    }, 1500);
  };

  const handleStartCourse = () => {
    onClose();
    setPurchased(false);
    navigate(`/course/${course.id}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={purchased ? 'Enrollment Confirmed! 🎉' : 'Complete Course Checkout'}
      description={purchased ? 'You now have full lifetime access' : 'Instant access to all modules & AI Mentor'}
      maxWidth="md"
    >
      {purchased ? (
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">Course Unlocked Successfully!</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              Your transaction for <strong className="text-purple-300">{course.title}</strong> has been saved.
            </p>
          </div>
          <Button onClick={handleStartCourse} className="w-full">
            Go to Course Viewer Now
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Course Summary Card */}
          <div className="flex gap-4 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <img src={course.coverImage} alt={course.title} className="w-20 h-20 rounded-xl object-cover" />
            <div className="space-y-1 flex-1">
              <h4 className="text-xs font-bold text-white line-clamp-2">{course.title}</h4>
              <p className="text-[11px] text-slate-400">By {course.instructorName}</p>
              <div className="flex items-center justify-between text-xs pt-1 font-bold text-purple-300">
                <span>{course.totalDuration} • {course.modules.length || 4} Modules</span>
                <span className="text-emerald-400 font-mono">${finalPrice}</span>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Course Original Price</span>
              <span className="line-through text-slate-500">${course.price}</span>
            </div>
            {course.discountPrice && (
              <div className="flex justify-between text-emerald-400">
                <span>Special AI Learner Discount</span>
                <span>-${(course.price - course.discountPrice).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-white/10 font-bold text-white text-sm">
              <span>Total Payable</span>
              <span className="text-purple-300 font-mono">${finalPrice}</span>
            </div>
          </div>

          {/* Features Included */}
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full lifetime access to all future module updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>24/7 AI Mentor assistance during all lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400" />
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>

          {/* Stripe Trigger Button */}
          <Button
            onClick={handleCheckout}
            isLoading={isProcessing}
            className="w-full"
            leftIcon={<Lock className="w-4 h-4" />}
          >
            Pay ${finalPrice} & Unlock Course
          </Button>
        </div>
      )}
    </Modal>
  );
};
