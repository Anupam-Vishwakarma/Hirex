'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

  .badge-section {
    --bg:        #04091a;
    --card-bg:   #080f22;
    --accent:    #1a6dff;
    --border:    rgba(26,109,255,0.14);
    --text:      #ffffff;
    --body:      rgba(255,255,255,0.58);

    width: 100%;
    background: var(--bg);
    padding: 56px 40px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: center;
  }

  /* ── CARD ── */
  .badge-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 22px;
    padding: 44px 56px;
    display: flex;
    align-items: center;
    gap: 52px;
    width: 100%;
    max-width: 1100px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.28s, box-shadow 0.28s;
    /* Entrance */
    opacity: 0;
    transform: translateY(28px);
    animation: bcReveal 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
    animation-play-state: paused;
  }

  .badge-card.visible { animation-play-state: running; }

  .badge-card::before {
    content: '';
    position: absolute;
    top: 0; left: 8%; right: 8%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
  }
  .badge-card::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 55% 60% at 15% 50%, rgba(26,109,255,0.06) 0%, transparent 65%);
    pointer-events: none;
  }
  .badge-card:hover {
    border-color: rgba(26,109,255,0.30);
    box-shadow: 0 16px 48px rgba(26,109,255,0.10);
  }

  @keyframes bcReveal {
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── HEX BADGE ── */
  .badge-hex-wrap {
    position: relative;
    flex-shrink: 0;
    width: 180px; height: 200px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0;
    animation: bcPopIn 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.35s forwards;
    animation-play-state: paused;
    filter: drop-shadow(0 8px 24px rgba(26,109,255,0.20));
    transition: filter 0.3s, transform 0.3s;
  }
  .badge-hex-wrap.visible { animation-play-state: running; }
  .badge-hex-wrap:hover {
    filter: drop-shadow(0 12px 32px rgba(26,109,255,0.35));
    transform: scale(1.04) rotate(-1deg);
  }

  @keyframes bcPopIn {
    from { opacity: 0; transform: scale(0.7) rotate(-8deg); }
    to   { opacity: 1; transform: scale(1)   rotate(0deg); }
  }

  /* SVG fills */
  .hex-bg    { fill: #ffffff; }
  .hex-border-outer { fill: none; stroke: rgba(26,109,255,0.35); stroke-width: 3; }
  .hex-border-inner { fill: none; stroke: rgba(26,109,255,0.15); stroke-width: 1.5; }

  /* Badge text content */
  .badge-content {
    position: relative; z-index: 1;
    text-align: center; line-height: 1;
  }

  .badge-label {
    font-family: 'Sora', sans-serif;
    font-size: 11px; font-weight: 700;
    color: #1a1a2e; letter-spacing: 0.04em;
    margin-bottom: 6px;
    display: block;
  }
  .badge-label em {
    color: var(--accent);
    font-style: normal; font-weight: 800;
  }

  .badge-nums {
    display: flex; align-items: baseline;
    justify-content: center; gap: 3px;
    margin-bottom: 4px;
  }
  .badge-num-accent {
    font-family: 'Sora', sans-serif;
    font-size: 40px; font-weight: 900;
    color: #1a6dff; line-height: 1;
    letter-spacing: -0.03em;
  }
  .badge-of {
    font-family: 'Sora', sans-serif;
    font-size: 13px; font-weight: 700;
    color: #444; margin: 0 2px;
  }
  .badge-num-dark {
    font-family: 'Sora', sans-serif;
    font-size: 40px; font-weight: 900;
    color: #1a1a2e; line-height: 1;
    letter-spacing: -0.03em;
  }

  .badge-year-row {
    display: flex; align-items: baseline;
    justify-content: center; gap: 5px;
  }
  .badge-in {
    font-family: 'Sora', sans-serif;
    font-size: 13px; font-weight: 700; color: #444;
  }
  .badge-year {
    font-family: 'Sora', sans-serif;
    font-size: 30px; font-weight: 900; color: #1a1a2e;
    letter-spacing: -0.03em; line-height: 1;
  }

  /* ── RIGHT COPY ── */
  .badge-copy {
    flex: 1;
    opacity: 0;
    animation: bcSlideIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s forwards;
    animation-play-state: paused;
  }
  .badge-copy.visible { animation-play-state: running; }

  @keyframes bcSlideIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .badge-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.4rem, 2.2vw, 1.9rem);
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.035em;
    word-break: break-word;
    line-height: 1.15;
    margin: 0 0 14px;
    /* Word-by-word reveal handled via CSS */
    opacity: 0;
    animation: bcFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.52s forwards;
    animation-play-state: paused;
  }
  .badge-heading.visible { animation-play-state: running; }

  .badge-body {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: var(--body);
    line-height: 1.72;
    max-width: 520px;
    margin: 0 0 28px;
    opacity: 0;
    animation: bcFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.64s forwards;
    animation-play-state: paused;
  }
  .badge-body.visible { animation-play-state: running; }

  /* CTA button */
  .badge-cta {
    display: inline-flex; align-items: center;
    font-family: 'Sora', sans-serif;
    font-size: 0.88rem; font-weight: 700;
    color: #0d1535;
    background: #fff;
    border-radius: 100px;
    padding: 12px 28px;
    text-decoration: none;
    letter-spacing: 0.01em;
    border: none;
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    position: relative; overflow: hidden;
    opacity: 0;
    animation: bcFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.76s forwards;
    animation-play-state: paused;
  }
  .badge-cta.visible { animation-play-state: running; }
  .badge-cta::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.4s;
    border-radius: inherit;
  }
  .badge-cta:hover::after { transform: translateX(100%); }
  .badge-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.35);
    background: #f0f4ff;
  }
  .badge-cta:active { transform: translateY(0); }

  @keyframes bcFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Continuous slow rotate on badge */
  @keyframes hexFloat {
    0%   { transform: translateY(0px) rotate(0deg); }
    50%  { transform: translateY(-5px) rotate(1deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }
  .badge-hex-wrap.visible:not(:hover) {
    animation: bcPopIn 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.35s forwards,
               hexFloat 5s ease-in-out 1.1s infinite;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 760px) {
    .badge-card {
      flex-direction: column;
      text-align: center;
      padding: 36px 28px;
      gap: 32px;
    }
    .badge-body { max-width: 100%; }
    .badge-section { padding: 48px 20px; }
  }

@media (max-width: 480px) {
  .badge-hex-wrap {
    width: 150px;
    height: 170px;
  }

  .badge-num-accent,
  .badge-num-dark {
    font-size: 34px;
  }

  .badge-year {
    font-size: 26px;
  }
}


`;

/* ─────────────────────────────────────────────
   HEX BADGE SVG
───────────────────────────────────────────── */
function HexBadge({ visible }: { visible: boolean }) {
  return (
    <div className={`badge-hex-wrap${visible ? ' visible' : ''}`}>
      <svg
        viewBox="0 0 180 204"
        fill="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        {/* White fill */}
        <path
          d="M90 6L170 50V154L90 198L10 154V50L90 6Z"
          fill="white"
        />
        {/* Outer blue border */}
        <path
          d="M90 6L170 50V154L90 198L10 154V50L90 6Z"
          fill="none"
          stroke="rgba(26,109,255,0.40)"
          strokeWidth="3"
        />
        {/* Inner subtle border */}
        <path
          d="M90 14L163 54V150L90 190L17 150V54L90 14Z"
          fill="none"
          stroke="rgba(26,109,255,0.15)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Content */}
      <div className="badge-content">
        <span className="badge-label">
          HireX<em>:</em>
        </span>
        <div className="badge-nums">
          <span className="badge-num-accent">10</span>
          <span className="badge-of">OF</span>
          <span className="badge-num-dark">10</span>
        </div>
        <div className="badge-year-row">
          <span className="badge-in">IN</span>
          <span className="badge-year">2025</span>
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
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="badge-section" ref={sectionRef}>
        <div className={`badge-card${visible ? ' visible' : ''}`}>

          {/* Hex badge */}
          <HexBadge visible={visible} />

          {/* Right copy */}
          <div className={`badge-copy${visible ? ' visible' : ''}`}>
            <h2 className={`badge-heading${visible ? ' visible' : ''}`}>
              Our top picks for 2025 are here!
            </h2>
            <p className={`badge-body${visible ? ' visible' : ''}`}>
              HireX has selected 10 startups across 10 trending industries that
              should be on your radar in 2025. See what teams our community is
              most excited about in the year ahead!
            </p>
            <a className={`badge-cta${visible ? ' visible' : ''}`} href="#">
              Explore our 10 of 10
            </a>
          </div>

        </div>
      </section>
    </>
  );
}