'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingProps {
  guestName: string;
  onComplete: () => void;
}

export default function Loading({ guestName, onComplete }: LoadingProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Slowed down timers for a deliberate, cinematic pace
    const timer1 = setTimeout(() => setStep(1), 1200);
    const timer2 = setTimeout(() => setStep(2), 2600);
    const timer3 = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-forest px-6 text-center select-none"
    >
      <div className="h-20 flex items-center justify-center">
        {step === 0 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-sm md:text-base tracking-[0.3em] text-sage uppercase"
          >
            Initializing invitation...
          </motion.p>
        )}
        {step === 1 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-sm md:text-base tracking-[0.3em] text-sage uppercase"
          >
            Loading guest profile...
          </motion.p>
        )}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-3"
          >
            <p className="font-serif text-xs uppercase tracking-[0.35em] text-gold font-medium">
              Welcome
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-ivory tracking-wide">
              {guestName}
            </h2>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}