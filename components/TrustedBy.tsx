'use client';

const logos = [
  {
    alt: 'DoorDash',
    content: (
      <svg viewBox="0 0 140 32" className="h-[45px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.6 15.3c0-5.8-4.7-10.4-10.4-10.4H32.5v20.8h20.8c5.7-.1 10.3-4.7 10.3-10.4zM43 19.5v-8.4h10c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2H43z" />
        <text x="70" y="23" className="font-[Inter] font-extrabold text-[22px] tracking-[-0.5px]">DOORDASH</text>
      </svg>
    ),
  },
  {
    alt: 'Roblox',
    content: (
      <svg viewBox="0 0 140 32" className="h-[45px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="22" height="22" transform="rotate(-10 12 15)" />
        <rect x="8" y="11" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-10 12 15)" />
        <text x="35" y="24" className="font-[Inter] font-black text-[24px]">ROBLOX</text>
      </svg>
    ),
  },
  {
    alt: 'Honey',
    content: (
      <svg viewBox="0 0 100 32" className="h-[45px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="24" className="font-['Dancing_Script'] italic font-bold text-[28px]">honey</text>
      </svg>
    ),
  },
  {
    alt: 'Peloton',
    content: (
      <svg viewBox="0 0 140 32" className="h-[45px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M15 10v12M11 16h8" stroke="currentColor" strokeWidth="2"/>
        <text x="35" y="23" className="font-[Inter] font-extrabold text-[18px] tracking-[1.5px]">PELOTON</text>
      </svg>
    ),
  },
  {
    alt: 'IFTTT',
    content: (
      <svg viewBox="0 0 80 32" className="h-[45px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <text x="0" y="24" className="font-[Inter] font-black text-[28px] tracking-[-1px]">IFTTT</text>
      </svg>
    ),
  },
  {
    alt: 'NerdWallet',
    content: (
      <svg viewBox="0 0 160 32" className="h-[45px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 4h-8v24h4V12.8L18.4 28h5.1V4h-4v15.2L7.6 4h4.9z" />
        <text x="28" y="24" className="font-[Inter] font-extrabold text-[18px] tracking-[-0.5px]">NerdWallet</text>
      </svg>
    ),
  }
];

const doubled = [...logos, ...logos, ...logos];

export default function TrustedBy() {
  return (
    <section className="w-full bg-transparent pb-12 overflow-hidden">
      {/* Applied [mask-image] here. 
         This creates the fade effect by making the actual pixels transparent 
         rather than covering them with a color. This removes the "strip" effect.
      */}
      <div className="relative mx-auto max-w-[1000px] overflow-hidden bg-transparent 
                      [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        
        {/* Marquee Track */}
        <div className="flex w-max animate-[marquee_40s_linear_infinite] items-center gap-[120px] py-6">
          {doubled.map((logo, i) => (
            <div 
              key={`${logo.alt}-${i}`} 
              className="flex shrink-0 items-center text-white/70 transition-all duration-500 
                         hover:scale-110 hover:text-white/100 
                         [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.2))] 
                         hover:[filter:drop-shadow(0_0_18px_rgba(255,255,255,0.5))]"
            >
              {logo.content}
            </div>
          ))}
        </div>
      </div>
      
      <p className="mt-14 text-center text-[10px] font-bold uppercase tracking-[0.5em] text-white/50">
        Startups who used our platform
      </p>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}} />
    </section>
  );
}