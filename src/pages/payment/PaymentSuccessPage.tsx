import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { stripeService } from '@/services/stripeService';
import { Card, Button, Badge } from '@/components/ui';

export const PaymentSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId') || 'dbms-101';
  const amountStr = searchParams.get('amount') || '49.00';

  const [transactionInfo, setTransactionInfo] = useState<{ transactionId: string; timestamp: string } | null>(null);

  useEffect(() => {
    stripeService.confirmPayment('cs_demo_session', courseId, parseFloat(amountStr)).then((res) => {
      setTransactionInfo(res);
    });
  }, [courseId, amountStr]);

  return (
    <div className="space-y-8 select-none max-w-xl mx-auto py-8">
      <Card className="p-8 text-center space-y-6 border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 shadow-2xl shadow-emerald-500/10">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-4 border-emerald-500 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <Badge variant="success" size="md">Payment Successful 🎉</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Course Unlocked!</h1>
          <p className="text-xs text-slate-300">
            Thank you for your purchase. You now have full lifetime access to all lessons and AI Mentor features.
          </p>
        </div>

        {/* Transaction Invoice Summary */}
        {transactionInfo && (
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Transaction ID:</span>
              <span className="text-purple-300 font-bold">{transactionInfo.transactionId}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Amount Paid:</span>
              <span className="text-emerald-400 font-bold">${amountStr} USD</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Status:</span>
              <span className="text-emerald-400 font-bold">COMPLETED (Logged in Supabase)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Timestamp:</span>
              <span className="text-slate-300">{transactionInfo.timestamp}</span>
            </div>
          </div>
        )}

        <div className="pt-2">
          <Link to={`/course/${courseId}`}>
            <Button size="lg" className="w-full text-sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Learning Now
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
