'use client';

import { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const quotes = [
  {
    quote: "We filled critical roles faster with HireX. The quality of candidates was outstanding from day one.",
    author: "People Ops Lead",
    company: "Series B Startup",
  },
  {
    quote: "The candidate experience looks and feels premium. Our offer acceptance rate jumped significantly.",
    author: "Head of Talent",
    company: "Growth-stage Tech",
  },
  {
    quote: "I can't imagine sourcing without HireX now. Life would be a lot more difficult without this platform.",
    author: "Recruiting Manager",
    company: "Fintech Scale-up",
  },
  {
    quote: "Half of the offers I give are sourced from HireX. It's the best product for anyone looking for startup talent.",
    author: "Talent Acquisition Lead",
    company: "SaaS Company",
  },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500&display=swap');

  /* ── SECTION ── */
  .testi-section {
    --bg:          #04091a;
    --accent:      #1a6dff;
    --accent-glow: rgba(26,109,255,0.35);
    --border:      rgba(26,109,255,0.14);
    --card-bg:     #080f22;
    --text:        #ffffff;
    --body:        rgba(255,255,255,0.70);
    --muted:       rgba(255,255,255,0.38);

    width: 100%;
    background: var(--bg);
    padding: 88px 40px 80px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ── INNER MAX-WIDTH ── */
  .testi-inner {
    width: 100%;
    max-width: 1100px;
  }

  /* ── HEADER ROW ── */
  .testi-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 48px;
    opacity: 0;
    animation: tFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
  }

  .testi-eyebrow {
    font-family: 'Sora', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    margin-bottom: 10px;
    opacity: 0.85;
  }

  .testi-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin: 0;
  }

  /* ── NAV ARROWS ── */
  .testi-arrows {
    display: flex;
    gap: 10px;
  }

  .testi-arrow {
    width: 46px; height: 46px;
    border-radius: 12px;
    border: 1.5px solid rgba(26,109,255,0.25);
    background: rgba(26,109,255,0.07);
    color: rgba(255,255,255,0.7);
    font-size: 17px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .testi-arrow:hover {
    background: rgba(26,109,255,0.20);
    border-color: rgba(26,109,255,0.55);
    color: #fff;
    transform: scale(1.06);
  }
  .testi-arrow:active { transform: scale(0.96); }

  /* ── CARDS GRID ── */
  .testi-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 36px;
  }

  /* ── CARD ── */
  .testi-card {
    background: var(--card-bg);
    border: 1px solid rgba(26,109,255,0.14);
    border-radius: 20px;
    padding: 30px 28px 26px;
    display: flex;
    flex-direction: column;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
    position: relative;
    overflow: hidden;
    /* Staggered reveal */
    opacity: 0;
    animation: tFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) var(--cd, 0.2s) forwards;
  }

  /* Shimmer top highlight */
  .testi-card::before {
    content: '';
    position: absolute;
    top: 0; left: 12%; right: 12%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
  }

  /* Corner glow on hover */
  .testi-card::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 55% 40% at 50% 0%, rgba(26,109,255,0.08) 0%, transparent 65%);
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: inherit;
    pointer-events: none;
  }
  .testi-card:hover::after { opacity: 1; }

  .testi-card:hover {
    border-color: rgba(26,109,255,0.35);
    box-shadow: 0 12px 40px rgba(26,109,255,0.12), 0 2px 8px rgba(0,0,0,0.35);
    transform: translateY(-4px);
  }

  /* ── QUOTE ICON ── */
  .testi-quote-icon {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: rgba(26,109,255,0.12);
    border: 1px solid rgba(26,109,255,0.22);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
    flex-shrink: 0;
    transition: background 0.25s, border-color 0.25s;
  }
  .testi-card:hover .testi-quote-icon {
    background: rgba(26,109,255,0.22);
    border-color: rgba(26,109,255,0.45);
  }

  /* ── QUOTE TEXT ── */
  .testi-quote {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: var(--body);
    line-height: 1.7;
    flex: 1;
    margin: 0 0 22px;
    letter-spacing: 0.01em;
  }

  /* ── AUTHOR ── */
  .testi-author-name {
    font-family: 'Sora', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
    margin-bottom: 3px;
  }

  .testi-author-co {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    color: var(--muted);
    letter-spacing: 0.01em;
  }

  /* ── SEPARATOR ── */
  .testi-separator {
    width: 40px; height: 1px;
    background: rgba(26,109,255,0.3);
    margin-bottom: 16px;
  }

  /* ── DOT INDICATORS ── */
  .testi-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    opacity: 0;
    animation: tFadeUp 0.6s ease 0.6s forwards;
  }

  .testi-dot {
    height: 8px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: width 0.3s ease, background 0.3s ease;
  }
  .testi-dot-active {
    width: 28px;
    background: var(--accent);
    box-shadow: 0 0 10px rgba(26,109,255,0.5);
  }
  .testi-dot-inactive {
    width: 8px;
    background: rgba(255,255,255,0.18);
  }
  .testi-dot:hover { background: rgba(26,109,255,0.55) !important; }

  /* ── KEYFRAMES ── */
  @keyframes tFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  /* Card slide-in direction variants */
  @keyframes tSlideLeft {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes tSlideRight {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .card-enter-next  { animation: tSlideLeft  0.75s cubic-bezier(0.16,1,0.3,1) forwards !important; }
.card-enter-prev  { animation: tSlideRight 0.75s cubic-bezier(0.16,1,0.3,1) forwards !important; }


  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .testi-grid { grid-template-columns: 1fr; }
    .testi-section { padding: 56px 20px; }
  }
  @media (max-width: 640px) {
    .testi-header { flex-direction: column; align-items: flex-start; gap: 20px; }
  }

@media (max-width: 480px) {
  .testi-quote {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .testi-card {
    padding: 24px 20px;
  }
}


`;

/* ─────────────────────────────────────────────
   QUOTE ICON SVG
───────────────────────────────────────────── */
function QuoteIcon() {
  return (
    <div className="testi-quote-icon">
      <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
        <path
          d="M0 14V8.4C0 5.6.933 3.267 2.8 1.4 4.667-.467 7.067-.467 10 1.4L8.4 3.5C7.333 2.833 6.333 2.6 5.4 2.8c-.933.2-1.667.8-2.2 1.8C2.667 5.6 2.4 6.933 2.4 8.6H5.6V14H0ZM9.6 14V8.4c0-2.8.933-5.133 2.8-7C14.267-.467 16.667-.467 19.6 1.4L18 3.5c-1.067-.667-2.067-.9-3-.7-.933.2-1.667.8-2.2 1.8-.533 1-.8 2.333-.8 4H15.2V14H9.6Z"
          fill="#1a6dff"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CARD COMPONENT
───────────────────────────────────────────── */
function TestiCard({
  quote, author, company, delay, dir,
}: {
  quote: string; author: string; company: string;
  delay: string; dir: 'next' | 'prev' | 'init';
}) {
  const cls = dir === 'next'
    ? 'testi-card card-enter-next'
    : dir === 'prev'
    ? 'testi-card card-enter-prev'
    : 'testi-card';

  return (
    <div className={cls} style={{ '--cd': delay } as React.CSSProperties}>
      <QuoteIcon />
      <p className="testi-quote">{quote}</p>
      <div className="testi-separator" />
      <div className="testi-author-name">{author}</div>
      <div className="testi-author-co">{company}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<'next' | 'prev' | 'init'>('init');
  const [animKey, setAnimKey] = useState(0);
  const total = quotes.length;
  const sectionRef = useRef<HTMLElement>(null);

  const go = (d: 'next' | 'prev') => {
    setDir(d);
    setAnimKey(k => k + 1);
    setCurrent(c =>
      d === 'next' ? (c + 1) % total : (c - 1 + total) % total
    );
  };

  /* Auto-advance every 5s */
  useEffect(() => {
    const t = setTimeout(() => go('next'), 7000);
    return () => clearTimeout(t);
  }, [current]);

  const visible = [0, 1, 2].map(offset => quotes[(current + offset) % total]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="testi-section" ref={sectionRef}>
        <div className="testi-inner">

          {/* Header */}
          <div className="testi-header">
            <div>
              <p className="testi-eyebrow">Quotes</p>
              <h2 className="testi-heading">From our users</h2>
            </div>
            <div className="testi-arrows">
              <button className="testi-arrow" onClick={() => go('prev')} aria-label="Previous">←</button>
              <button className="testi-arrow" onClick={() => go('next')} aria-label="Next">→</button>
            </div>
          </div>

          {/* Cards */}
          <div className="testi-grid" key={animKey}>
            {visible.map((q, i) => (
              <TestiCard
                key={`${animKey}-${i}`}
                {...q}
                dir={i === 0 ? dir : 'init'}
                delay={`${0.05 + i * 0.1}s`}
              />
            ))}
          </div>

          {/* Dots */}
          <div className="testi-dots">
            {quotes.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === current ? 'testi-dot-active' : 'testi-dot-inactive'}`}
                onClick={() => { setDir(i > current ? 'next' : 'prev'); setAnimKey(k=>k+1); setCurrent(i); }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}