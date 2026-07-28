'use client';

import { motion } from 'framer-motion';
import { eventDetails } from '@/data/event';
import { MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

export default function EventDetails() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="max-w-xl mx-auto border-y border-borderSubtle py-16 px-6 text-center space-y-12"
    >
      <div className="space-y-2">
        <p className="font-serif text-xs uppercase tracking-[0.3em] text-gold">The Details</p>
        <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium">When & Where</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-md mx-auto">
        {/* Date & Time */}
        <div className="space-y-3 border-l-2 border-sage/40 pl-4">
          <div className="flex items-center space-x-2 text-forest">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="font-serif text-lg font-medium">Date & Time</span>
          </div>
          <p className="font-sans text-sm text-charcoal">{eventDetails.date}</p>
          <p className="font-mono text-xs text-muted uppercase">{eventDetails.time}</p>
        </div>

        {/* Venue */}
        <div className="space-y-3 border-l-2 border-sage/40 pl-4">
          <div className="flex items-center space-x-2 text-forest">
            <MapPin className="w-4 h-4 text-gold" />
            <span className="font-serif text-lg font-medium">Venue</span>
          </div>
          <p className="font-sans text-sm text-charcoal font-medium">{eventDetails.venueName}</p>
          <p className="font-sans text-xs text-muted leading-relaxed">{eventDetails.venueAddress}</p>
        </div>
      </div>

      {/* Dress Code Box */}
      <div className="bg-forest/5 border border-forest/15 rounded-lg p-6 space-y-2 max-w-md mx-auto">
        <div className="flex items-center justify-center space-x-2 text-forest">
          <Sparkles className="w-4 h-4 text-gold" />
          <p className="font-serif text-base font-medium">Dress Code</p>
        </div>
        <p className="font-sans text-xs text-muted tracking-wide">{eventDetails.dressCode}</p>
      </div>

      {/* Google Maps Button */}
      <div className="pt-4">
        <a
          href={eventDetails.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-forest text-ivory font-sans text-xs uppercase tracking-[0.2em] hover:bg-forest/90 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          View Map & Directions
        </a>
      </div>
    </motion.section>
  );
}