'use client';

import { useEffect, useRef, useState } from 'react';

const cols = [
  {
    heading: 'For Candidates',
    links: ['Overview', 'Startup Jobs', 'Web3 Jobs', 'Featured', 'Salary Calculator', 'Startup Hiring Data', 'Tech Startups', 'Remote'],
  },
  {
    heading: 'For Recruiters',
    links: ['Startup Jobs', 'Web3 Jobs', 'Featured', 'Salary Calculator', 'Startup Hiring Data', 'Tech Startups', 'Remote'],
  },
  {
    heading: 'For Recruiters',
    links: ['Overview', 'Recruit Pro', 'Curated', 'HireX:ai', 'Hire Developers', 'Pricing'],
  },
  {
    heading: 'Company',
    links: ['About', 'Help', 'Blog', 'Terms & Risks', 'Privacy & Cookies', 'Trust', 'Platform Status'],
  },
];

const browseLinks = ['Remote Jobs', 'Locations', 'Startups', 'Startups Hiring', 'Industries', 'Tech Hubs'];

const socials = [
  { label: 'Facebook', src: '/logo/facebook.png' },
  { label: 'Twitter',  src: '/logo/twitter.png' },
  { label: 'Instagram', src: '/logo/instagram.png' },
  { label: 'LinkedIn', src: '/logo/linkedin.png' },
  { label: 'YouTube',  src: '/logo/youtube.png' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-[#04091a] overflow-hidden font-sans pt-16"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* TOP SECTION */}
        <div className={`
          grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-16 transition-all duration-1000 ease-out
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3">
               <img src="/logo/hirex-logo.png" alt="Logo" className="h-9 w-9 object-contain" />
               <div className="font-sora text-2xl font-bold tracking-tight text-white flex items-center">
                  HireX<span className="text-[#1a6dff] drop-shadow-[0_0_12px_rgba(26,109,255,0.6)]">:ai</span>
               </div>
            </div>
          </div>

          {cols.map((col, ci) => (
            <div key={ci} className="col-span-1">
              <h4 className="text-[0.85rem] font-bold text-white mb-5 whitespace-nowrap">{col.heading}</h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a key={link} href="#" className="text-[0.8rem] text-white/35 hover:text-white transition-colors duration-200 whitespace-nowrap">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION: ALL IN ONE LINE */}
        <div className={`
          border-t border-white/5 py-8 flex flex-row items-center justify-between gap-4 transition-all duration-700 delay-500
          ${visible ? 'opacity-100' : 'opacity-0'}
        `}>
          
          {/* LEFT: SOCIALS & COPYRIGHT WRAPPER */}
          <div className="flex items-center gap-6 shrink-0">
            {/* Round Socials with Zoom/Hover effect */}
            <div className="flex gap-2 group/socials">
              {socials.map(s => (
                <a 
                  key={s.label} 
                  href="#" 
                  className="w-8 h-8 rounded-lg overflow-hidden transition-all duration-300 ease-out 
                             hover:scale-125 hover:z-20 hover:shadow-[0_0_15px_rgba(26,109,255,0.5)]
                             group-hover/socials:opacity-50 hover:!opacity-100"
                >
                  <img src={s.src} alt={s.label} className="w-full h-full object-cover" />
                </a>
              ))}
            </div>
            
            <div className="text-[0.75rem] text-white/25 flex items-center gap-4 whitespace-nowrap">
              <p>Copyright © 2026 HireX. All rights reserved.</p>
              <a href="#" className="text-white/40 hover:text-white underline underline-offset-4 decoration-white/10 transition-colors">
                Cookie Preferences
              </a>
            </div>
          </div>

          {/* RIGHT: BROWSE LINKS (STAYS ON SAME LINE) */}
          <div className="hidden sm:flex flex-wrap items-center justify-end gap-x-2 text-[0.75rem] text-white/40">
             <span className="text-white/20 uppercase text-[0.65rem] font-bold tracking-widest mr-1">Browse by:</span>
            {browseLinks.map((link, i) => (
              <span key={link} className="flex items-center">
                <a href="#" className="hover:text-white transition-colors">
                  {link}
                </a>
                {i < browseLinks.length - 1 && <span className="text-white/10 ml-2">,</span>}
              </span>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}