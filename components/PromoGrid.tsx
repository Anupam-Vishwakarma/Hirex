'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   CARD COMPONENT
───────────────────────────────────────────── */
function PromoCard({
  eyebrow,
  heading,
  body,
  note,
  cta,
  delay,
  gradient = false
}: {
  eyebrow: string;
  heading: string;
  body: string;
  note?: string;
  cta: string;
  delay: number;
  gradient?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={`relative group flex flex-col p-8 md:p-10 min-h-[320px] rounded-[32px] border border-white/10 overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 ${
        gradient 
          ? 'bg-gradient-to-br from-[#0a132b] to-[#0d1b3d]' 
          : 'bg-[#080f22]'
      }`}
    >
      {/* Decorative radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(26,109,255,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Eyebrow */}
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
        className="text-blue-500 font-sora text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4"
      >
        {eyebrow}
      </motion.p>

      {/* Heading */}
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.3 }}
        className="text-white font-sora text-3xl md:text-4xl font-black leading-[1.1] tracking-tight whitespace-pre-line"
      >
        {heading}
      </motion.h2>

      {/* Divider */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.6 }}
        className="w-10 h-[2px] bg-gradient-to-r from-blue-600 to-transparent mt-6 mb-auto rounded-full origin-left"
      />

      {/* Bottom Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: delay + 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mt-8"
      >
        <div className="max-w-[340px]">
          <p className="text-white/60 text-sm md:text-[15px] leading-relaxed mb-1">
            {body}
          </p>
          {note && <p className="text-white/30 text-xs font-semibold">{note}</p>}
        </div>
        
        <a 
          href="#" 
          className="group/cta flex items-center gap-2 text-white text-sm font-bold border-b border-blue-500/40 pb-1 hover:text-blue-400 hover:border-blue-400 transition-all whitespace-nowrap"
        >
          {cta}
          <ArrowUpRight size={16} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function PromoGrid() {
  return (
    <section className="w-full bg-[#04091a] pb-0 py-12 md:py-20 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        
        <PromoCard
          eyebrow="Get Featured"
          heading={`Let us show\nyou off`}
          body="Apply to be featured and let opportunities come to you. We'll highlight your profile to top recruiters searching for your skills."
          note="Oh, it's also 100% free."
          cta="Learn more"
          delay={0.1}
        />

        <PromoCard
          eyebrow="Salary Calculator"
          heading={`Know your\nworth`}
          body="We have the data. Research by job title and industry to find your salary range and be prepared to nail your negotiations."
          cta="Calculate"
          delay={0.2}
          gradient
        />

      </div>
    </section>
  );
}