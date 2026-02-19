'use client';

import React, { useEffect, useRef, useState } from 'react';

const searchAvatars = [
  'https://i.pravatar.cc/40?img=1', 'https://i.pravatar.cc/40?img=5',
  'https://i.pravatar.cc/40?img=9', 'https://i.pravatar.cc/40?img=12',
  'https://i.pravatar.cc/40?img=15', 'https://i.pravatar.cc/40?img=20',
  'https://i.pravatar.cc/40?img=25', 'https://i.pravatar.cc/40?img=30',
  'https://i.pravatar.cc/40?img=33', 'https://i.pravatar.cc/40?img=41',
];

const candidates = [
  { name: 'Joshua Moret', photo: 'https://i.pravatar.cc/40?img=11' },
  { name: 'Naomi Liu',    photo: 'https://i.pravatar.cc/40?img=47' },
  { name: 'Guy Leonardo', photo: 'https://i.pravatar.cc/40?img=32' },
];

const recruiterPhoto = 'https://i.pravatar.cc/44?img=23';

export default function AutopilotSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section 
      className="w-full bg-[#04091a] py-12 md:py-24 px-4 sm:px-6 md:px-10 flex justify-center border-t border-blue-500/10 font-sans overflow-hidden" 
      ref={sectionRef}
    >
      {/* OUTER CARD */}
      <div className={`
        relative w-full max-w-[1120px] rounded-[28px] p-6 sm:p-8 md:p-16 lg:p-[72px_64px]
        bg-gradient-to-br from-[#0b1228] via-[#0d1535] to-[#0e1840]
        border border-blue-500/15 overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_48px_1.4fr] items-center gap-12 md:gap-0
        transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>
        
        {/* Dot-grid noise & Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-25 [background-image:radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -top-20 -right-20 w-[200px] md:w-[360px] h-[200px] md:h-[360px] bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

        {/* LEFT COPY */}
        <div className={`relative z-10 transition-all duration-750 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
          <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white leading-[1.1] tracking-tight mb-6">
            Meet Autopilot:<br /> HireX's AI<br /> recruiter
          </h2>
          <p className="text-[0.97rem] text-white/55 leading-relaxed max-w-full md:max-w-[380px] mb-4">
            Just tell us what you need. Our expert recruiters backed by AI deliver qualified candidates to your calendar.
          </p>
          <p className="text-[0.97rem] text-white/55 leading-relaxed mb-8">All at a fraction of the cost of an agency.</p>
          <a href="#" className="group relative inline-flex items-center bg-white text-[#0d1535] font-sora font-bold px-7 py-3 rounded-full overflow-hidden shadow-xl transition-transform hover:-translate-y-0.5 active:scale-95">
            <span className="relative z-10">Learn more</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_0.6s_infinite]" />
          </a>
        </div>

        {/* CENTER TIMELINE (Hidden on Mobile) */}
        <div className="hidden md:flex flex-col items-center self-stretch py-2 z-10">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center backdrop-blur-md text-lg">👤</div>
          <div className="flex-1 border-l-2 border-dashed border-white/20 my-2" />
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center backdrop-blur-md text-lg">👍</div>
          <div className="flex-1 border-l-2 border-dashed border-white/20 my-2" />
        </div>

        {/* RIGHT CHAT PANEL */}
        <div className={`relative z-10 flex flex-col gap-4 w-full transition-all duration-750 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
          
          {/* Recruiter message */}
          <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-600">
            <img className="w-10 h-10 rounded-full border-2 border-pink-500/40 shrink-0" src={recruiterPhoto} alt="Recruiter" />
            <div className="max-w-[85%] sm:max-w-sm">
              <div className="text-[11px] text-white/40 mb-1">Recruiter</div>
              <div className="bg-white text-[#0d1535] rounded-[5px_16px_16px_16px] p-4 text-[13.5px] leading-relaxed shadow-2xl">
                Send me candidates interested in <span className="inline-block bg-[#fff8e1] text-[#b8860b] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">FINTECH</span> with experience in <span className="inline-block bg-[#e3f2fd] text-[#1565c0] text-[10px] font-bold px-2 py-0.5 rounded tracking-wider">PYTHON</span>
              </div>
            </div>
          </div>

          {/* AI Reply */}
          <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-600 delay-300">
            <div className="text-right max-w-[85%] sm:max-w-sm">
              <div className="text-[11px] text-white/40 mb-1"><strong>HireX</strong><span className="text-blue-500 font-bold ml-0.5">:ai</span></div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-[16px_5px_16px_16px] p-4 text-[13.5px] italic leading-relaxed shadow-[0_4px_24px_rgba(26,109,255,0.4)]">
                Absolutely! Sending you a list of relevant candidates now.
              </div>
            </div>
          </div>

          {/* Searching Avatars */}
          <div className="flex items-center flex-wrap gap-y-4 gap-x-1 sm:gap-3 px-2 py-2">
            <div className="flex -space-x-2 overflow-hidden">
                {searchAvatars.slice(0, 6).map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt="candidate"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0d1535] transition-transform hover:scale-125"
                    style={{ zIndex: 10 - i }}
                />
                ))}
            </div>
            <span className="text-[12px] text-white/40 italic animate-pulse">searching…</span>
          </div>

          {/* Recruiter Badge */}
          <div className="flex">
            <div className="bg-white rounded-full px-5 py-2 text-[13px] font-bold text-[#0d1535] shadow-xl flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(26,109,255,0.7)] animate-pulse" />
              Recruiter
            </div>
          </div>

          {/* Candidate Card - FIXED FOR 100% WIDTH AND WRAPPING */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-xl w-full">
            <div className="text-[13px] font-bold text-white/80 italic mb-4">Your qualified candidate review list</div>
            <div className="space-y-2">
                {candidates.map(({ name, photo }) => (
                <div key={name} className="bg-white/[0.06] border border-white/[0.09] rounded-xl p-3 flex flex-row items-center justify-between gap-3 hover:bg-blue-500/10 transition-colors w-full overflow-hidden">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <img className="w-8 h-8 rounded-full shrink-0" src={photo} alt={name} />
                        <div className="min-w-0 overflow-hidden">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="text-[13px] font-bold text-white truncate">{name}</span>
                                <span className="bg-emerald-500/15 text-[#5de8a0] text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/25 whitespace-nowrap">INTERESTED</span>
                            </div>
                            <div className="text-[11px] text-white/40 truncate">Exp. <span className="text-blue-300 uppercase">Python</span></div>
                        </div>
                    </div>
                    <div className="flex gap-1.5 sm:gap-2 shrink-0">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full border border-emerald-500/50 text-[#5de8a0] text-xs hover:bg-emerald-500/20">✓</button>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full border border-red-500/50 text-red-400 text-xs hover:bg-red-500/20">✕</button>
                    </div>
                </div>
                ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}