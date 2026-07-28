'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Loading from '@/components/Loading';
import Envelope from '@/components/Envelope';
import EventDetails from '@/components/EventDetails';

interface ClientExperienceProps {
  guestName: string;
}

export default function ClientExperience({ guestName }: ClientExperienceProps) {
  const [state, setState] = useState<'loading' | 'envelope' | 'opened'>('loading');

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans selection:bg-sage/20 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {state === 'loading' && (
          <Loading 
            key="loading" 
            guestName={guestName} 
            onComplete={() => setState('envelope')} 
          />
        )}

        {state === 'envelope' && (
          <motion.div 
            key="envelope" 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <Envelope 
              guestName={guestName} 
              onOpen={() => setState('opened')} 
            />
          </motion.div>
        )}

        {state === 'opened' && (
          <motion.div
            key="opened"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto px-6 py-16 md:py-24 space-y-24 md:space-y-32"
          >
            {/* Initial Landing Header */}
            <header className="text-center space-y-6 border border-borderSubtle p-8 md:p-14 rounded-lg shadow-luxury bg-white/50 backdrop-blur-sm">
              <p className="font-serif text-3xl md:text-6xl text-forest font-medium tracking-tight">
                Dear {guestName},
              </p>
              <div className="space-y-2">
                <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold font-medium">
                  Graduation Celebration
                </p>
                <h4 className="font-serif text-4xl md:text-6xl text-forest font-medium tracking-tight">
                  Tatiana Omolleh
                </h4>
                <p className="font-sans text-xs md:text-sm text-muted tracking-widest uppercase pt-1">
                  Bachelor of Science in Informatics and Computer Science
                </p>
              </div>
              <div className="pt-6 border-t border-borderSubtle/60 max-w-xs mx-auto">
                <p className="font-serif text-lg md:text-xl italic text-charcoal leading-relaxed">
                  &ldquo;I would love for you to join me as I celebrate the culmination of my university journey.&rdquo;
                </p>
              </div>
            </header>

            {/* Event Details (Date, Time, Venue, Map) */}
            <EventDetails />

            {/* Future components (Timeline, Gallery, RSVP) will slot in below this line */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}