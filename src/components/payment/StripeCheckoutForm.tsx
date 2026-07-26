import React, { useState } from 'react';
import { Lock, Tag, CheckCircle2 } from 'lucide-react';
import type { Course } from '@/types';
import { stripeService, type StripePaymentSession } from '@/services/stripeService';
import { Card, Button, Input } from '@/components/ui';

interface StripeCheckoutFormProps {
  course: Course;
  onPaymentSuccess: (session: StripePaymentSession) => void;
}

export const StripeCheckoutForm: React.FC<StripeCheckoutFormProps> = ({ course, onPaymentSuccess }) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [session, setSession] = useState<StripePaymentSession | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Fields
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('•••');
  const [cardHolder, setCardHolder] = useState('Ahnaf Habib');

  const basePrice = course.discountPrice ?? course.price;
  const currentPrice = session ? session.discountPrice : basePrice;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    const newSession = await stripeService.createCheckoutSession(course, promoCode);
    setSession(newSession);
    setPromoApplied(true);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const activeSession = session || (await stripeService.createCheckoutSession(course));

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(activeSession);
    }, 1500);
  };

  return (
    <Card className="p-6 sm:p-8 space-y-6 max-w-xl mx-auto border border-purple-500/30 bg-slate-900/90 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Stripe 256-Bit Encrypted Checkout</h3>
            <p className="text-[11px] text-slate-400">Instant unlock & full lifetime access</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono font-bold">
          SSL SECURE
        </span>
      </div>

      {/* Order Summary */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-300">
          <span className="font-semibold">{course.title}</span>
          <span className="font-mono text-white font-bold">${course.price}</span>
        </div>

        {course.discountPrice && (
          <div className="flex items-center justify-between text-emerald-400">
            <span>Special Learner Discount</span>
            <span>-${(course.price - course.discountPrice).toFixed(2)}</span>
          </div>
        )}

        {promoApplied && session && session.discountApplied > 0 && (
          <div className="flex items-center justify-between text-purple-300 font-semibold">
            <span>Promo Coupon ({promoCode.toUpperCase()})</span>
            <span>-${session.discountApplied}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-sm font-bold text-white">
          <span>Total Due</span>
          <span className="text-purple-300 font-mono text-base">${currentPrice}</span>
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="flex gap-2">
        <Input
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter Promo Code (Try STUDENT50)"
          className="text-xs"
        />
        <Button size="sm" variant="outline" onClick={handleApplyPromo} leftIcon={<Tag className="w-3.5 h-3.5" />}>
          Apply
        </Button>
      </div>

      {promoApplied && (
        <p className="text-[11px] text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Coupon code applied successfully!
        </p>
      )}

      {/* Credit Card Inputs Form */}
      <form onSubmit={handlePay} className="space-y-4 pt-2">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Cardholder Name</label>
          <Input value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} className="text-xs" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Card Number</label>
          <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="text-xs font-mono" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Expiration Date</label>
            <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} className="text-xs font-mono" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">CVC Code</label>
            <Input value={cvc} onChange={(e) => setCvc(e.target.value)} className="text-xs font-mono" />
          </div>
        </div>

        <Button
          type="submit"
          isLoading={isProcessing}
          className="w-full text-sm py-3"
          leftIcon={<Lock className="w-4 h-4" />}
        >
          Pay ${currentPrice} USD & Unlock Course
        </Button>
      </form>
    </Card>
  );
};
