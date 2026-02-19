'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const quotes = [
  {
    quote: "We filled critical roles faster with HireX. The quality of candidates was outstanding from day one.",
    author: "People Ops Lead",
    company: "Series B Startup",
  },
  {
    quote: "The candidate experience looks and feels premium. Our offer acceptance rate jumped significantly.",
    author: "Head of Talent",
    company: "Growth-stage Tech",
  },
  {
    quote: "I can't imagine sourcing without HireX now. Life would be a lot more difficult without this platform.",
    author: "Recruiting Manager",
    company: "Fintech Scale-up",
  },
  {
    quote: "Half of the offers I give are sourced from HireX. It's the best product for anyone looking for startup talent.",
    author: "Talent Acquisition Lead",
    company: "SaaS Company",
  },
];

// Fixed TypeScript Variants
const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
    },
  }),
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = quotes.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleIndices = () => {
    return [
      (current - 1 + total) % total,
      current,
      (current + 1) % total,
    ];
  };

  return (
    // Reduced padding to py-6
    <section className="relative w-full overflow-hidden bg-transparent py-6 px-4 sm:px-8">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-sora text-xs font-bold uppercase tracking-[0.3em] text-blue-500"
            >
              Testimonials
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 font-sora text-3xl font-extrabold tracking-tighter text-white md:text-5xl"
            >
              Trusted by the best.
            </motion.h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevSlide}
              className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10 active:scale-90"
            >
              <ChevronLeft size={20} className="text-white/40 transition-colors group-hover:text-blue-400" />
            </button>
            <button
              onClick={nextSlide}
              className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-blue-500/10 active:scale-90"
            >
              <ChevronRight size={20} className="text-white/40 transition-colors group-hover:text-blue-400" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid Container */}
        <div className="relative min-h-[400px] w-full lg:min-h-[350px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid w-full grid-cols-1 gap-6 md:grid-cols-3"
            >
              {getVisibleIndices().map((index, i) => (
                <div
                  key={`${index}-${i}`}
                  className={`group relative flex flex-col justify-between rounded-[28px] border p-8 transition-all duration-500 ${
                    i === 1 
                      ? 'border-blue-500/30 bg-blue-500/[0.03] shadow-[0_0_40px_-12px_rgba(59,130,246,0.3)]' 
                      : 'border-white/10 bg-white/[0.02]'
                  } backdrop-blur-xl`}
                >
                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
                  
                  <div>
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                      <Quote size={20} fill="currentColor" className="opacity-50" />
                    </div>
                    <p className="font-inter text-base leading-relaxed text-white/80 md:text-lg">
                      "{quotes[index].quote}"
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mb-4" />
                    <h4 className="font-sora text-sm font-bold text-white">{quotes[index].author}</h4>
                    <p className="text-xs font-medium text-white/40">{quotes[index].company}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {quotes.map((_, i) => (
            <div
              key={i}
              className="relative h-1 overflow-hidden rounded-full bg-white/10"
              style={{ width: i === current ? '32px' : '8px', transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
            >
              {i === current && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="absolute inset-0 bg-blue-500"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}