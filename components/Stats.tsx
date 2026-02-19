'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────
    DATA
───────────────────────────────────────────── */
const stats = [
  { target: 8, suffix: 'M+', label: 'Matches Made' },
  { target: 150, suffix: 'K+', label: 'Tech Jobs' },
  { target: 10, suffix: 'M+', label: 'Startup Ready Candidates' },
];

/* ─────────────────────────────────────────────
    COUNTER COMPONENT
───────────────────────────────────────────── */
function Counter({ value }: { value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [inView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ─────────────────────────────────────────────
    MAIN COMPONENT
───────────────────────────────────────────── */
export default function Stats() {
  return (
    // Changed bg to transparent and removed top padding to match flow
    <section className="w-full bg-transparent pt-0 pb-12 px-6 relative overflow-hidden font-inter">
      
      {/* 1. The Downward Arrow (Centered logic to match your reference) */}
      <div className="flex justify-center mb-12">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30"
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* 2. Stats Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="flex flex-col items-center text-center group"
          >
            {/* Number Styling - Sora Font for impact */}
            <div className="text-white font-sora font-extrabold text-5xl md:text-6xl tracking-tighter mb-4 group-hover:text-blue-400 transition-colors duration-500">
              <Counter value={stat.target} />
              <span className="ml-1">{stat.suffix}</span>
            </div>

            {/* Label Styling */}
            <div className="text-[#6f8fb3] font-semibold text-xs md:text-sm uppercase tracking-[0.2em] max-w-[200px]">
              {stat.label}
            </div>

            {/* Subtle glow under stat */}
            <motion.div 
              className="h-[1px] w-0 bg-blue-500/50 mt-6 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-700"
            />
          </motion.div>
        ))}
      </div>

      {/* 3. Decorative Background Element - Matched to Global BG */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/[0.03] blur-[120px] rounded-full" />
      </div>
    </section>
  );
}