'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { submitRsvp } from '@/app/actions/rsvp';
import { Check, Loader2, Sparkles } from 'lucide-react';

interface RSVPProps {
  guestSlug: string;
  guestName: string;
  initialStatus: string;
}

export default function RSVP({ guestSlug, guestName, initialStatus }: RSVPProps) {
  const [status, setStatus] = useState<'yes' | 'no' | null>(
    initialStatus === 'yes' || initialStatus === 'no' ? (initialStatus as 'yes' | 'no') : null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(initialStatus !== 'pending');
  const [error, setError] = useState('');

  const triggerConfetti = () => {
    // Custom luxury palette: Forest Green, Champagne Gold, and Sage
    const colors = ['#264B3B', '#C2A46D', '#6E8B74', '#F8F5F0'];
    
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!status) return;

    setIsSubmitting(true);
    setError('');

    const result = await submitRsvp(guestSlug, status);

    setIsSubmitting(false);

    if (result.success) {
      setIsConfirmed(true);
      if (status === 'yes') {
        triggerConfetti();
      }
    } else {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="max-w-xl mx-auto border border-borderSubtle p-8 md:p-14 rounded-lg shadow-luxury bg-white/60 backdrop-blur-sm text-center space-y-8"
    >
      <AnimatePresence mode="wait">
        {!isConfirmed ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="space-y-2">
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold font-medium">
                Attendance
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium">
                Will you attend?
              </h2>
              <p className="font-sans text-xs text-muted pt-1">
                Please let me know by August 6th so we can finalize arrangements.
              </p>
            </div>

            {/* Radio Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-2">
              <button
                type="button"
                onClick={() => setStatus('yes')}
                className={`p-5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                  status === 'yes'
                    ? 'border-forest bg-forest/5 text-forest shadow-sm'
                    : 'border-borderSubtle bg-ivory/50 text-charcoal hover:border-sage'
                }`}
              >
                <span className="font-serif text-lg font-medium">Yes, I will attend</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  status === 'yes' ? 'border-forest bg-forest text-ivory' : 'border-borderSubtle'
                }`}>
                  {status === 'yes' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setStatus('no')}
                className={`p-5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                  status === 'no'
                    ? 'border-forest bg-forest/5 text-forest shadow-sm'
                    : 'border-borderSubtle bg-ivory/50 text-charcoal hover:border-sage'
                }`}
              >
                <span className="font-serif text-lg font-medium">Unfortunately not</span>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  status === 'no' ? 'border-forest bg-forest text-ivory' : 'border-borderSubtle'
                }`}>
                  {status === 'no' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            </div>

            {error && (
              <p className="font-sans text-xs text-red-700 bg-red-50 p-3 rounded border border-red-200">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!status || isSubmitting}
                className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-forest text-ivory font-sans text-xs uppercase tracking-[0.2em] hover:bg-forest/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 flex items-center justify-center mx-auto space-x-2 cursor-pointer"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Confirm RSVP</span>
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="py-6 space-y-6"
          >
            <div className="w-12 h-12 rounded-full bg-forest/10 text-forest flex items-center justify-center mx-auto mb-4 border border-forest/20">
              <Sparkles className="w-6 h-6 text-gold" />
            </div>
            
            <div className="space-y-2">
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold">RSVP Saved</p>
              <h3 className="font-serif text-3xl md:text-4xl text-forest font-medium">
                Thank you, {guestName}!
              </h3>
            </div>

            <p className="font-serif text-lg italic text-charcoal max-w-sm mx-auto leading-relaxed">
              {status === 'yes' 
                ? "I can't wait to celebrate with you. Your spot has been reserved!"
                : "I will miss celebrating with you in person, but I truly appreciate you letting me know."}
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => setIsConfirmed(false)}
                className="font-sans text-xs uppercase tracking-[0.2em] text-muted underline hover:text-forest transition-colors cursor-pointer"
              >
                Change Response
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}