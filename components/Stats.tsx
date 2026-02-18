'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const stats = [
  { target: 8,   suffix: 'M+', label: 'Profiles',               duration: 2000 },
  { target: 150, suffix: 'K+', label: 'Startups',               duration: 2200 },
  { target: 10,  suffix: 'M+', label: 'Startup/Role Connections',duration: 1800 },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500&display=swap');

  .stats-section {
    --bg:         #04091a;
    --card-bg:    #080f22;
    --card-bg2:   #0b1530;
    --accent:     #1a6dff;
    --accent-glow:rgba(26,109,255,0.28);
    --border:     rgba(26,109,255,0.16);
    --text:       #ffffff;
    --body:       #5a7a9a;

    width: 100%;
    background: var(--bg);
    padding: 56px 32px 64px;
    
    position: relative;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
  }

  /* Subtle background glow */
  .stats-section::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(26,109,255,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── GRID ── */
  .stats-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
  }

  /* ── CARD ── */
  .stat-card {
    background: linear-gradient(145deg, var(--card-bg2) 0%, var(--card-bg) 100%);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 36px 28px 32px;
    text-align: center;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    /* Reveal animation */
    opacity: 0;
    transform: translateY(24px);
    animation: cardReveal 0.7s cubic-bezier(0.22,1,0.36,1) var(--card-delay, 0s) forwards;
  }

  @keyframes cardReveal {
    to { opacity: 1; transform: translateY(0); }
  }

  .stat-card:nth-child(1) { --card-delay: 0.1s; }
  .stat-card:nth-child(2) { --card-delay: 0.25s; }
  .stat-card:nth-child(3) { --card-delay: 0.4s; }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(26,109,255,0.20), 0 2px 8px rgba(0,0,0,0.4);
    border-color: rgba(26,109,255,0.38);
  }

  /* Shimmer top-edge highlight */
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  }

  /* Blue corner glow on hover */
  .stat-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(26,109,255,0.09) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: inherit;
  }
  .stat-card:hover::after { opacity: 1; }

  /* ── NUMBER ── */
  .stat-num {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2.2rem, 4vw, 3rem);
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
    line-height: 1;
    margin-bottom: 10px;
    /* Subtle pulse when value ticks up */
    transition: text-shadow 0.08s ease;
  }

  .stat-num.ticking {
    text-shadow: 0 0 30px rgba(26,109,255,0.55);
  }

  /* Animated digit characters */
  .digit-wrap {
    display: inline-block;
    position: relative;
  }

  /* ── LABEL ── */
  .stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--body);
    letter-spacing: 0.015em;
  }

  /* ── LIVE PULSE DOT ── */
  .stat-live {
    position: absolute;
    top: 14px; right: 16px;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #1a6dff;
    box-shadow: 0 0 8px rgba(26,109,255,0.7);
    animation: livePulse 2s ease-in-out infinite;
  }

  @keyframes livePulse {
    0%, 100% { transform: scale(1);   opacity: 1;   box-shadow: 0 0 6px rgba(26,109,255,0.7);  }
    50%       { transform: scale(1.5); opacity: 0.6; box-shadow: 0 0 14px rgba(26,109,255,0.4); }
  }

  /* ── RANDOM TICK FLASH ── */
  @keyframes tickFlash {
    0%   { color: #fff; }
    30%  { color: #5ba8ff; }
    100% { color: #fff; }
  }

  .stat-num.flash { animation: tickFlash 0.25s ease; }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .stats-grid { grid-template-columns: 1fr; gap: 14px; }
    .stats-section { padding: 40px 20px 48px; }
  }
`;

/* ─────────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────────── */
function useCountUp(target: number, duration: number, started: boolean) {
  const [value, setValue] = useState(0);
  const [ticking, setTicking] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(eased * target);
      setValue(next);
      setTicking(progress < 1);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration]);

  /* After count-up: random micro-ticks to simulate live data */
  useEffect(() => {
    if (ticking) return;
    if (!started) return;

    let timeout: ReturnType<typeof setTimeout>;
    const randomTick = () => {
      const delta = Math.random() < 0.5 ? 0 : 1;
      setValue(v => v + delta);
      timeout = setTimeout(randomTick, 1800 + Math.random() * 3200);
    };
    timeout = setTimeout(randomTick, 2000 + Math.random() * 2000);
    return () => clearTimeout(timeout);
  }, [ticking, started]);

  return { value, ticking };
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({
  target, suffix, label, duration,
}: { target: number; suffix: string; label: string; duration: number }) {
  const [started, setStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prevVal = useRef(0);
  const numRef = useRef<HTMLDivElement>(null);

  /* Start counter when card scrolls into view */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { value, ticking } = useCountUp(target, duration, started);

  /* Flash on each value change after count-up */
  useEffect(() => {
    if (value === prevVal.current) return;
    prevVal.current = value;
    const el = numRef.current;
    if (!el || ticking) return;
    el.classList.remove('flash');
    void el.offsetWidth; // reflow
    el.classList.add('flash');
  }, [value, ticking]);

  return (
    <div className="stat-card" ref={cardRef}>
      <div className="stat-live" aria-hidden="true" />
      <div
        ref={numRef}
        className={`stat-num${ticking ? ' ticking' : ''}`}
      >
        {value}{suffix}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Stats() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>
    </>
  );
}