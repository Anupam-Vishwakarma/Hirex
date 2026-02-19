'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   HEX BADGE SVG COMPONENT
───────────────────────────────────────────── */
function HexBadge({ visible }: { visible: boolean }) {
  return (
    <div className={`
      relative shrink-0 w-[180px] h-[200px] flex items-center justify-center
      transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
      filter drop-shadow-[0_8px_24px_rgba(26,109,255,0.20)]
      hover:drop-shadow-[0_12px_32px_rgba(26,109,255,0.35)] hover:scale-105 hover:-rotate-1
      ${visible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-6'}
      ${visible ? 'animate-[hexFloat_5s_ease-in-out_1.1s_infinite]' : ''}
    `}>
      <svg
        viewBox="0 0 180 204"
        fill="none"
        className="absolute inset-0 w-full h-full"
      >
        <path d="M90 6L170 50V154L90 198L10 154V50L90 6Z" fill="white" />
        <path d="M90 6L170 50V154L90 198L10 154V50L90 6Z" fill="none" stroke="rgba(26,109,255,0.40)" strokeWidth="3" />
        <path d="M90 14L163 54V150L90 190L17 150V54L90 14Z" fill="none" stroke="rgba(26,109,255,0.15)" strokeWidth="1.5" />
      </svg>

      <div className="relative z-10 text-center leading-none">
        <span className="font-sora text-[11px] font-bold text-[#1a1a2e] tracking-wider mb-1.5 block">
          HireX<em className="text-primary not-italic font-extrabold">:</em>
        </span>
        <div className="flex items-center justify-center gap-1.5 mb-1.5">
          <span className="font-sora text-4xl font-black text-primary tracking-tighter">10</span>
          <span className="relative font-sora text-[13px] font-extrabold text-[#444] tracking-widest px-1.5 flex items-center justify-center
            before:content-[''] before:absolute before:-top-1.5 before:w-5 before:h-[3px] before:bg-[#ff3b3b] before:rounded-sm
            after:content-[''] after:absolute after:-bottom-1.5 after:w-5 after:h-[3px] after:bg-[#ff3b3b] after:rounded-sm">
            OF
          </span>
          <span className="font-sora text-4xl font-black text-[#1a1a2e] tracking-tighter">10</span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <span className="relative font-sora text-[13px] font-extrabold text-[#444] tracking-widest px-1.5 flex items-center justify-center
            before:content-[''] before:absolute before:-top-1.5 before:w-5 before:h-[3px] before:bg-[#ff3b3b] before:rounded-sm
            after:content-[''] after:absolute after:-bottom-1.5 after:w-5 after:h-[3px] after:bg-[#ff3b3b] after:rounded-sm">
            IN
          </span>
          <span className="font-sora text-3xl font-black text-[#1a1a2e] tracking-tighter">2025</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function BadgeCardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-[#04091a] py-14 px-10 border-t border-white/10 flex justify-center font-sans"
    >
      <div className={`
        relative w-full max-w-[1100px] bg-[#080f22] border border-white/10 rounded-[22px] p-11 md:p-14
        flex flex-col md:flex-row items-center gap-12 overflow-hidden transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:border-primary/30 hover:shadow-[0_16px_48px_rgba(26,109,255,0.10)]
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'}
        
        /* Top line highlight */
        before:content-[''] before:absolute before:top-0 before:left-[8%] before:right-[8%] before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
        /* Subtle radial glow */
        after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_55%_60%_at_15%_50%,_rgba(26,109,255,0.06)_0%,_transparent_65%)] after:pointer-events-none
      `}>
        
        <HexBadge visible={visible} />

        <div className={`
          flex-1 transition-all duration-700 delay-300
          ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}
        `}>
          <h2 className="font-sora text-2xl md:text-3xl lg:text-[1.9rem] font-extrabold text-white tracking-tight leading-[1.15] mb-3.5">
            Our top picks for 2025 are here!
          </h2>
          <p className="font-sans text-[0.9rem] text-white/60 leading-relaxed max-w-[520px] mb-7">
            HireX has selected 10 startups across 10 trending industries that
            should be on your radar in 2025. See what teams our community is
            most excited about in the year ahead!
          </p>
          <a 
            href="#" 
            className="group relative inline-flex items-center bg-white text-[#0d1535] font-sora font-bold px-7 py-3 rounded-full shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#f0f4ff] hover:shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">Explore our 10 of 10</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_0.6s_infinite]" />
          </a>
        </div>
      </div>
    </section>
  );
}