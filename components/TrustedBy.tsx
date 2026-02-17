'use client';

import { useRef } from 'react';

const logos = [
  {
    alt: 'NerdWallet',
    content: (
      <svg viewBox="0 0 160 32" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="NerdWallet">
        <path d="M0 28V4h4l12 16V4h4v24h-4L4 12v16H0z"/>
        <text x="25" y="24" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize="15" letterSpacing="-0.3">erdWallet</text>
      </svg>
    ),
  },
  {
    alt: 'Airtable',
    content: (
      <svg viewBox="0 0 120 32" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Airtable">
        <rect x="0" y="3" width="10" height="10" rx="2"/>
        <rect x="12" y="0" width="10" height="10" rx="2"/>
        <rect x="12" y="12" width="10" height="10" rx="2" opacity="0.55"/>
        <text x="26" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="15">Airtable</text>
      </svg>
    ),
  },
  {
    alt: 'Plaid',
    content: (
      <svg viewBox="0 0 70 32" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Plaid">
        <rect x="0" y="0" width="6" height="6"/>
        <rect x="8" y="0" width="6" height="6" opacity="0.6"/>
        <rect x="0" y="8" width="6" height="6" opacity="0.6"/>
        <rect x="8" y="8" width="6" height="6"/>
        <rect x="0" y="16" width="6" height="6" opacity="0.3"/>
        <rect x="8" y="16" width="6" height="6" opacity="0.6"/>
        <text x="20" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="16">Plaid</text>
      </svg>
    ),
  },
  {
    alt: 'Peloton',
    content: (
      <svg viewBox="0 0 120 32" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Peloton">
        <circle cx="13" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="13" cy="16" r="5"/>
        <line x1="13" y1="5" x2="13" y2="0" stroke="currentColor" strokeWidth="2"/>
        <text x="30" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="15" letterSpacing="0.5">PELOTON</text>
      </svg>
    ),
  },
  {
    alt: 'Roblox',
    content: (
      <svg viewBox="0 0 115 32" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Roblox">
        <rect x="2" y="4" width="22" height="22" rx="3" transform="rotate(-12 13 15)"/>
        <rect x="6" y="8" width="14" height="14" rx="2" fill="#04091a" transform="rotate(-12 13 15)"/>
        <text x="30" y="23" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize="15">ROBLOX</text>
      </svg>
    ),
  },
  {
    alt: 'DoorDash',
    content: (
      <svg viewBox="0 0 130 32" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="DoorDash">
        <path d="M4 4h10c6.6 0 12 5.4 12 12s-5.4 12-12 12H4V4z"/>
        <path d="M9 10h5c3.3 0 6 2.7 6 6s-2.7 6-6 6H9V10z" fill="#04091a"/>
        <text x="32" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="15">DoorDash</text>
      </svg>
    ),
  },
  {
    alt: 'Cruise',
    content: (
      <svg viewBox="0 0 100 32" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Cruise">
        <path d="M20 4A12 12 0 1 0 20 28L20 24A8 8 0 1 1 20 8Z"/>
        <text x="26" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="15">Cruise</text>
      </svg>
    ),
  },
  {
    alt: 'ConsenSys',
    content: (
      <svg viewBox="0 0 145 32" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="ConsenSys">
        <polygon points="13,2 22,7 22,18 13,23 4,18 4,7"/>
        <polygon points="13,7 18,10 18,16 13,19 8,16 8,10" fill="#04091a"/>
        <text x="28" y="22" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="14">ConsenSys</text>
      </svg>
    ),
  },
  {
    alt: 'Adonis',
    content: (
      <svg viewBox="0 0 100 32" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Adonis">
        <polygon points="13,2 24,28 2,28" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <text x="30" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="15">Adonis</text>
      </svg>
    ),
  },
  {
    alt: 'IFTTT',
    content: (
      <svg viewBox="0 0 85 32" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="IFTTT">
        <rect x="0" y="0" width="22" height="22" rx="3"/>
        <rect x="3" y="3" width="16" height="7" rx="1" fill="#04091a"/>
        <rect x="3" y="12" width="16" height="7" rx="1" fill="#04091a"/>
        <text x="28" y="19" fontFamily="'Arial Black',Arial,sans-serif" fontWeight="900" fontSize="16" letterSpacing="1">IFTTT</text>
      </svg>
    ),
  },
];

const doubled = [...logos, ...logos];

export default function TrustedBy() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&display=swap');

        /* ── KEYFRAMES ─────────────────────────── */

        /* Border shimmer — sweeps left to right endlessly */
        @keyframes borderShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        /* Ambient core glow breathe */
        @keyframes breathe {
          0%, 100% { opacity: 0.5; transform: scale(1);   }
          50%       { opacity: 1;   transform: scale(1.08); }
        }

        /* Logo soft pulse — resting glow */
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(26,109,255,0.45)) drop-shadow(0 0 10px rgba(26,109,255,0.18)); }
          50%       { filter: drop-shadow(0 0 8px rgba(26,109,255,0.75)) drop-shadow(0 0 18px rgba(26,109,255,0.30)); }
        }

        /* Marquee scroll */
        @keyframes trustedMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── SECTION ───────────────────────────── */
        .trusted-section {
          position: relative;
          width: 100%;
          /* Glassy: frosted inner layer on deep navy — same theme, just depth added */
          background:
            linear-gradient(
              180deg,
              rgba(14,24,48,0.92) 0%,
              rgba(6,12,30,0.96)  50%,
              rgba(14,24,48,0.92) 100%
            );
          backdrop-filter: blur(18px) saturate(1.4);
          -webkit-backdrop-filter: blur(18px) saturate(1.4);
          padding: 52px 0 58px;
          overflow: hidden;
          isolation: isolate;
        }

        /* ── GLASSY INNER SHEEN ── */
        .trusted-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 90% at 50% 50%,  rgba(26,109,255,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 30% 60% at 20% 50%,  rgba(26,109,255,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 30% 60% at 80% 50%,  rgba(26,109,255,0.06) 0%, transparent 60%);
          animation: breathe 5s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        /* Glassy reflection highlight — top inner sheen stripe */
        .trusted-section::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.06) 30%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.06) 70%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* ── TOP BORDER GLOW ── */
        .trusted-border-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent     0%,
            rgba(26,109,255,0.3)  10%,
            rgba(80,160,255,0.9)  30%,
            rgba(140,200,255,1)   50%,
            rgba(80,160,255,0.9)  70%,
            rgba(26,109,255,0.3)  90%,
            transparent     100%
          );
          background-size: 200% 100%;
          animation: borderShimmer 3.5s linear infinite;
          z-index: 4;
        }

        /* Bloom beneath top border */
        .trusted-border-top::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 40px;
          background: linear-gradient(
            180deg,
            rgba(26,109,255,0.18) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* ── BOTTOM BORDER GLOW ── */
        .trusted-border-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent     0%,
            rgba(26,109,255,0.2)  15%,
            rgba(80,160,255,0.7)  40%,
            rgba(80,160,255,0.7)  60%,
            rgba(26,109,255,0.2)  85%,
            transparent     100%
          );
          background-size: 200% 100%;
          animation: borderShimmer 3.5s linear 1.75s infinite;
          z-index: 4;
        }

        /* Bloom above bottom border */
        .trusted-border-bottom::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 36px;
          background: linear-gradient(
            0deg,
            rgba(26,109,255,0.12) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* ── EDGE FADE MASKS ── */
        .trusted-fade {
          position: absolute;
          inset: 0; z-index: 3;
          pointer-events: none;
          background: linear-gradient(
            to right,
            rgba(6,12,30,1)   0%,
            transparent       12%,
            transparent       88%,
            rgba(6,12,30,1)   100%
          );
        }

        /* ── HEADING ── */
        .trusted-heading {
          position: relative;
          z-index: 5;
          text-align: center;
          /* slightly brighter than before so it reads against glass */
          color: rgba(100,160,220,0.70);
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          margin: 0 0 38px;
          /* subtle text glow */
          text-shadow: 0 0 20px rgba(26,109,255,0.35);
        }

        /* ── SCROLL CONTAINER ── */
        .trusted-overflow {
          position: relative;
          overflow: hidden;
          z-index: 5;
        }

        /* ── MARQUEE TRACK ── */
        .trusted-track {
          display: flex;
          align-items: center;
          gap: 72px;
          padding: 10px 36px;
          width: max-content;
          animation: trustedMarquee 36s linear infinite;
        }
        .trusted-track:hover { animation-play-state: paused; }

        /* ── LOGO SLOT — glowing at rest ── */
        .logo-slot {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;   /* increased from 36px */
            transform: scale(1.15); /* slightly bigger */
            color: rgba(180,210,255,0.85);
            filter:
              drop-shadow(0 0 5px  rgba(26,109,255,0.50))
              drop-shadow(0 0 14px rgba(26,109,255,0.20));
            animation: logoPulse 3.5s ease-in-out infinite;
            transition:
              color     0.24s ease,
              filter    0.24s ease,
              transform 0.24s ease;
          }


        /* Stagger pulse phase per nth-child so not all logos breathe together */
        .logo-slot:nth-child(2n)   { animation-delay: -0.7s; }
        .logo-slot:nth-child(3n)   { animation-delay: -1.4s; }
        .logo-slot:nth-child(4n)   { animation-delay: -2.1s; }
        .logo-slot:nth-child(5n)   { animation-delay: -2.8s; }

        /* Hover — fully lit, bright white + intense glow */
        .logo-slot:hover {
          color: #fff;
          filter:
            drop-shadow(0 0 8px  rgba(80,160,255,0.95))
            drop-shadow(0 0 22px rgba(26,109,255,0.65))
            drop-shadow(0 0 40px rgba(26,109,255,0.30));
          transform: scale(1.12) translateY(-3px);
          animation-play-state: paused;
        }
      `}</style>

      <section aria-label="trusted-by" className="trusted-section">

        {/* Animated border lines */}
        <div className="trusted-border-top"    aria-hidden="true" />
        <div className="trusted-border-bottom" aria-hidden="true" />

        {/* Edge fade */}
        <div className="trusted-fade" aria-hidden="true" />

        <div className="trusted-overflow">
          <div className="trusted-track" ref={trackRef}>
            {doubled.map((logo, i) => (
              <div key={`${logo.alt}-${i}`} className="logo-slot" title={logo.alt}>
                {logo.content}
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}