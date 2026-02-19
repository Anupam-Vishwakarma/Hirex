'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const trends = [
  'Job Collections',
  'Remote Jobs',
  'Jobs by Location',
  'Jobs by Role',
  'Jobs by Role & Location',
];

export default function Trending() {
  return (
    <section className="relative w-full border-t border-blue-500/10 bg-[#04091a] py-6 px-4">
      {/* Container with auto-wrapping pills */}
      <div className="mx-auto flex max-w-[1000px] flex-wrap justify-center gap-3">
        {trends.map((title, i) => (
          <motion.a
            key={title}
            href="#"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.08 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ 
              y: -2, 
              scale: 1.02,
              backgroundColor: 'rgba(26, 109, 255, 0.18)',
              borderColor: 'rgba(26, 109, 255, 0.55)',
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full border border-blue-500/20 bg-blue-500/5 px-5 py-2.5 backdrop-blur-md transition-shadow hover:shadow-[0_0_18px_rgba(26,109,255,0.22)] md:px-6"
          >
            {/* Shimmer Effect Sweep */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />

            <span className="font-sora text-[0.85rem] font-semibold tracking-wide text-white/70 group-hover:text-white transition-colors">
              {title}
            </span>

            <ChevronDown 
              size={14} 
              strokeWidth={2.5}
              className="text-white/40 transition-all group-hover:translate-y-0.5 group-hover:text-white" 
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
}