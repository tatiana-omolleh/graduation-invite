'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
  guestName: string;
  onOpen: () => void;
}

export default function Envelope({ guestName, onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    try {
      const audio = new Audio('/audio/ambient.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => console.log('Audio autoplay prevented'));
    } catch (e) {
      console.log('Audio not found');
    }

    // Extended timeout so the flap opens fully before transitioning pages
    setTimeout(() => {
      onOpen();
    }, 2400);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 md:p-6 overflow-hidden select-none bg-ivory">
      {/* Main Deep Forest Green Envelope Container */}
      <motion.div 
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg aspect-[4/3] bg-[#224335] rounded-lg shadow-envelope border border-forest/40 flex flex-col justify-end items-center p-6 overflow-hidden"
      >
        {/* Guest Addressed Text (Gold & Ivory against Dark Green) */}
        <AnimatePresence>
          {!isOpening && (
            <motion.div 
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6 }}
              className="absolute top-10 text-center z-10"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans mb-1.5">
                Personal Invitation To
              </p>
              <p className="font-serif text-3xl md:text-4xl text-ivory font-semibold italic tracking-wide">
                {guestName}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Sliding Cream Invitation Card */}
        <motion.div
          initial={{ y: 0 }}
          animate={isOpening ? { y: -230, scale: 1.05, zIndex: 30 } : { y: 0 }}
          transition={{ delay: 0.6, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-[88%] h-[82%] bg-ivory border-2 border-gold/30 rounded shadow-luxury p-6 flex flex-col items-center justify-center text-center absolute bottom-4 z-0"
        >
          <p className="font-serif text-[11px] uppercase tracking-[0.25em] text-gold mb-2 font-medium">
            Bachelor of Science
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-forest font-bold tracking-wide">
            Tatiana Omolleh
          </h3>
          <p className="font-sans text-xs tracking-widest text-sage mt-2 uppercase font-medium">
            Informatics and Computer Science
          </p>
        </motion.div>

        {/* Envelope Pocket Left/Right Folds (Darker Forest Green) */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none bg-[#1E3C2F] border-t border-white/5"
          style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }}
        />

        {/* Envelope Bottom Fold Overlay (Deepest Forest Green) */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#14281F] to-[#1E3C2F]"
          style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
        />

        {/* Envelope Top Flap */}
        <motion.div
          animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute top-0 inset-x-0 h-[60%] bg-[#264B3B] border-b border-white/10 rounded-t-lg shadow-md"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transformOrigin: 'top' }}
        />

        {/* Clickable Gold Wax Seal */}
        <AnimatePresence>
          {!isOpening && (
            <motion.button
              onClick={handleSealClick}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute z-30 top-[55%] -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4BC8E] via-[#C2A46D] to-[#8E7242] shadow-xl flex items-center justify-center border-2 border-[#E5D2AD] cursor-pointer group focus:outline-none"
              aria-label="Break wax seal to open invitation"
            >
              <div className="w-12 h-12 rounded-full border border-ivory/40 flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent">
                <span className="font-serif font-bold text-ivory text-2xl italic tracking-tighter group-hover:scale-105 transition-transform drop-shadow-sm">
                  T
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}