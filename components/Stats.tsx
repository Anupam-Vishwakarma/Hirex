'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const stats = [
  { target: 8,   suffix: 'M+', label: 'Matches Made',              duration: 2000 },
  { target: 150, suffix: 'K+', label: 'Tech Jobs',                 duration: 2200 },
  { target: 10,  suffix: 'M+', label: 'Startup Ready Candidates',  duration: 1800 },
];


/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=Inter:wght@400;500&display=swap');

  .stats-section {
    width: 100%;
    padding: 80px 20px;
    text-align: center;
    background: #04091a;
    font-family: 'Inter', sans-serif;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .stat-card {
    background: none;
    border: none;
    padding: 0;
    box-shadow: none;
  }

  .stat-num {
    font-family: 'Sora', sans-serif;
    font-size: clamp(3rem, 6vw, 4rem);
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.03em;
    margin-bottom: 14px;
  }

  .stat-label {
    font-size: 1rem;
    font-weight: 500;
    color: #6f8fb3;
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
`;


/* ─────────────────────────────────────────────
   COUNTER HOOK
───────────────────────────────────────────── */
function useCountUp(target: number, duration: number, started: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(eased * target);

      setValue(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, target, duration]);

  return value;
}


/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({
  target,
  suffix,
  label,
  duration,
}: {
  target: number;
  suffix: string;
  label: string;
  duration: number;
}) {
  const [started, setStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Start counter when visible
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const value = useCountUp(target, duration, started);

  return (
  <div className="stat-card" ref={cardRef}>
    <div className="stat-num">
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