'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   DATA — matching reference image text exactly
───────────────────────────────────────────── */
const trends = [
  'Job Collections',
  'Remote Jobs',
  'Jobs by Location',
  'Jobs by Role',
  'Jobs by Role & Location',
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500&display=swap');

  .trending-section {
    --bg:      #04091a;
    --accent:  #1a6dff;
    --border:  rgba(26,109,255,0.22);
    --pill-bg: rgba(26,109,255,0.07);
    --text:    rgba(255,255,255,0.72);

    width: 100%;
    background: var(--bg);
    padding: 40px 40px 44px;
    box-sizing: border-box;
    border-top: 1px solid rgba(26,109,255,0.10);
    display: flex;
    justify-content: center;
  }

  /* ── PILL ROW ── */
  .trending-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    max-width: 1000px;
    width: 100%;
  }

  /* ── PILL ── */
  .trending-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 10px 20px;
    border: 1px solid var(--border);
    border-radius: 100px;
    background: var(--pill-bg);
    color: var(--text);
    font-family: 'Sora', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    text-decoration: none;
    white-space: normal;
    text-align: center;
    letter-spacing: 0.01em;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    /* Staggered reveal */
    opacity: 0;
    transform: translateY(12px) scale(0.96);
    animation: pillIn 0.55s cubic-bezier(0.22,1,0.36,1) var(--pd, 0.1s) forwards;
    animation-play-state: paused;
    transition:
      background    0.22s ease,
      border-color  0.22s ease,
      color         0.22s ease,
      box-shadow    0.22s ease,
      transform     0.22s ease;
  }

  .trending-pill.visible { animation-play-state: running; }

  /* Shimmer sweep on hover */
  .trending-pill::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.38s ease;
    border-radius: inherit;
  }
  .trending-pill:hover::after { transform: translateX(100%); }

  .trending-pill:hover {
    background: rgba(26,109,255,0.18);
    border-color: rgba(26,109,255,0.55);
    color: #ffffff;
    box-shadow: 0 0 18px rgba(26,109,255,0.22);
    transform: translateY(-2px) scale(1.02);
  }

  .trending-pill:active {
    transform: translateY(0) scale(0.98);
  }

  /* Chevron icon */
  .trending-chevron {
    flex-shrink: 0;
    opacity: 0.55;
    transition: opacity 0.2s, transform 0.2s;
  }
  .trending-pill:hover .trending-chevron {
    opacity: 1;
    transform: translateY(1px);
  }

  @keyframes pillIn {
    from { opacity: 0; transform: translateY(12px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  @media (max-width: 600px) {
    .trending-section { padding: 32px 20px 36px; }
    .trending-pill { font-size: 0.78rem; padding: 9px 16px; }
  }

@media (max-width: 480px) {
  .trending-row {
    justify-content: stretch;
  }

  .trending-pill {
    width: 100%;
    justify-content: center;
  }
}



`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Trending() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="trending-section" ref={ref}>
        <div className="trending-row">
          {trends.map((title, i) => (
            <a
              key={title}
              href="#"
              className={`trending-pill${visible ? ' visible' : ''}`}
              style={{ '--pd': `${0.08 + i * 0.09}s` } as React.CSSProperties}
            >
              {title}
              {/* Chevron down */}
              <svg
                className="trending-chevron"
                width="13" height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  d="M2.5 4.5L6.5 8.5L10.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}