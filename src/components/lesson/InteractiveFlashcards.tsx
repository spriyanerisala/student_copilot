import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Card, Button } from '@/components/ui';

interface Flashcard {
  front: string;
  back: string;
}

interface InteractiveFlashcardsProps {
  flashcards: Flashcard[];
}

export const InteractiveFlashcards: React.FC<InteractiveFlashcardsProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!flashcards || flashcards.length === 0) return null;

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" /> Revision Flashcards
        </h4>
        <span className="text-xs text-purple-300 font-mono">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="h-52 w-full glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer border border-purple-500/30 hover:border-purple-400/60 transition-all select-none relative group"
      >
        <span className="absolute top-3 left-3 text-[10px] uppercase font-bold text-purple-400 tracking-wider">
          {isFlipped ? 'Answer (Back)' : 'Question (Front)'}
        </span>
        <button className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-400 group-hover:text-white transition-colors">
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        <motion.div
          key={isFlipped ? 'back' : 'front'}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="space-y-2"
        >
          <p className="text-sm sm:text-base font-bold text-white max-w-md">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
          <p className="text-[11px] text-slate-400">Click anywhere on card to flip</p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button size="sm" variant="outline" onClick={handlePrev} leftIcon={<ChevronLeft className="w-4 h-4" />}>
          Previous
        </Button>
        <Button size="sm" variant="glass" onClick={() => setIsFlipped(!isFlipped)} leftIcon={<RotateCw className="w-3.5 h-3.5" />}>
          Flip Card
        </Button>
        <Button size="sm" variant="outline" onClick={handleNext} rightIcon={<ChevronRight className="w-4 h-4" />}>
          Next
        </Button>
      </div>
    </Card>
  );
};
