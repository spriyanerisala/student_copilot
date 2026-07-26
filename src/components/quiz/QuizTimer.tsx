import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface QuizTimerProps {
  initialMinutes: number;
  onTimeExpired: () => void;
  isPaused?: boolean;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ initialMinutes, onTimeExpired, isPaused = false }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (isPaused || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isPaused, onTimeExpired]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isWarning = secondsLeft < 120; // Under 2 minutes

  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
        isWarning
          ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-pulse'
          : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
      }`}
    >
      <Clock className="w-4 h-4 text-purple-400 shrink-0" />
      <span>
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
};
