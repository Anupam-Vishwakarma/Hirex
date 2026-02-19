'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// --- STARFIELD COMPONENT (Galaxy Movement) ---
function Starfield() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number; color: string }[]>([]);

  useEffect(() => {
    const colors = ['#ffffff', '#60a5fa', '#a78bfa', '#f472b6']; 
    const newStars = Array.from({ length: 250 }).map((_, i) => ({
      id: i,
      x: Math.random() * 200 - 100, 
      y: Math.random() * 200 - 100, 
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 2 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          initial={{ x: '50vw', y: '50vh', scale: 0, opacity: 0 }}
          animate={{ 
            x: `calc(50vw + ${star.x}vw)`, 
            y: `calc(50vh + ${star.y}vh)`, 
            scale: [0, star.size], 
            opacity: [0, 1, 0],
            backgroundColor: ['#ffffff', star.color, '#ffffff'] 
          }}
          transition={{ duration: star.duration, repeat: Infinity, ease: "easeIn", delay: Math.random() * 2 }}
          style={{ width: star.size, height: star.size }}
        />
      ))}
    </div>
  );
}

function FloatingTag({ tag, mouseX, mouseY, mode }: any) {
  const ref = useRef<HTMLSpanElement>(null);
  const springConfig = { damping: 12, stiffness: 450, mass: 0.4 };
  const dX = useSpring(0, springConfig);
  const dY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = mouseX.get() - centerX;
      const distanceY = mouseY.get() - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      if (distance < 300) {
        const force = (300 - distance) / 300;
        const multiplier = mode === 'gravity' ? 1.5 : -1.8;
        dX.set(distanceX * force * multiplier);
        dY.set(distanceY * force * multiplier);
      } else {
        dX.set(0); dY.set(0);
      }
    };
    const unsubX = mouseX.on("change", handleMouseMove);
    const unsubY = mouseY.on("change", handleMouseMove);
    return () => { unsubX(); unsubY(); };
  }, [mouseX, mouseY, dX, dY, mode]);

  return (
    <motion.span
      ref={ref}
      style={{ top: tag.top, left: tag.left, right: tag.right, x: dX, y: dY }}
      whileHover={{ scale: 1.5, zIndex: 100, backgroundColor: "rgba(59, 130, 246, 0.5)" }}
      className="absolute px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl 
                 text-[13px] font-bold text-white/90 shadow-2xl
                 pointer-events-auto cursor-pointer whitespace-nowrap transition-colors"
    >
      {tag.label}
    </motion.span>
  );
}

export default function Hero() {
  const [mode, setMode] = useState<'repel' | 'gravity'>('repel');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const allTags = [
    { label: 'Robotics', top: '15%', left: '8%' },
    { label: 'Artificial Intelligence', top: '8%', left: '22%' },
    { label: 'Next.js', top: '18%', right: '12%' },
    { label: 'Cyber Security', top: '10%', right: '28%' },
    { label: 'Web3', top: '45%', right: '5%' },
    { label: 'Rust', top: '55%', left: '5%' },
    { label: 'Fintech', top: '65%', left: '15%' },
    { label: 'UI/UX Design', top: '72%', right: '18%' },
    { label: 'E-commerce', top: '35%', left: '18%' },
    { label: 'Node.js', top: '48%', left: '12%' },
    { label: 'Blockchain', top: '75%', left: '4%' },
    { label: 'Aerospace', top: '5%', right: '5%' },
    { label: 'Seattle', top: '28%', right: '5%' },
    { label: 'Hardware', top: '40%', left: '2%' },
    { label: 'Machine Learning', top: '25%', left: '30%' },
    { label: 'Full Stack', top: '82%', right: '10%' },
  ];

  return (
    <section 
      onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
      className="relative w-full min-h-screen bg-[#030712] flex flex-col items-center overflow-hidden text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,58,138,0.2),_transparent_70%)] z-0" />
      <Starfield />

      {/* Mode Toggle - HIDDEN ON MOBILE (hidden sm:flex) */}
      <div className="absolute top-28 z-50 hidden md:flex bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md scale-90">
        {['repel', 'gravity'].map((m) => (
          <button key={m} onClick={() => setMode(m as any)}
            className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${mode === m ? 'bg-blue-600' : 'opacity-40'}`}>
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Floating Tags - HIDDEN ON MOBILE (hidden md:block) */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        {allTags.map((tag, i) => (
          <FloatingTag key={i} tag={tag} mouseX={mouseX} mouseY={mouseY} mode={mode} />
        ))}
      </div>

      {/* Center Content - Adjusted spacing for Mobile */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4 pt-10 md:pt-0">
        <motion.h1 
          className="font-sora flex flex-col md:flex-row items-center gap-2 md:gap-4 lg:gap-6 
                    text-[clamp(2.5rem,10vw,6rem)] font-extrabold tracking-tighter text-center"
            >
          <span className="text-blue-500 drop-shadow-[0_0_40px_rgba(37,99,235,0.8)]">H:</span>
          <span className="inline-flex items-center px-5 sm:px-8 md:px-12 border-[2px] border-dashed border-white/20 rounded-[30px] md:rounded-[70px] py-1 md:py-3 backdrop-blur-sm whitespace-nowrap">
            Find what's next
          </span>
</motion.h1>
      </div>

      {/* Footer Area */}
      <div className="relative z-20 w-full flex flex-col items-center pb-12 md:pb-24 px-6 bg-gradient-to-t from-[#030712] via-transparent to-transparent">
        <div className="w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mb-8 md:mb-12" />
        
        <p className="text-white/50 text-sm md:text-lg font-medium mb-8 md:mb-10 text-center max-w-[280px] md:max-w-none">
          Where startups and job seekers connect
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto">
          <button className="w-full sm:px-16 py-4 bg-blue-600 rounded-full font-bold text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-500/20 uppercase">
            Post a job
          </button>
          <button className="w-full sm:px-16 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-xs tracking-widest hover:bg-white/10 transition-all backdrop-blur-lg uppercase">
            Find jobs
          </button>
        </div>
      </div>
    </section>
  );
}