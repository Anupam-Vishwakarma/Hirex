'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const items = [
  { tag: 'Interview',    title: '30 Questions to Ask Before Joining a Startup' },
  { tag: 'Compensation', title: 'How to Negotiate Startup Offers' },
  { tag: 'Hiring',       title: 'VC-Funded Roles Hiring This Week' },
  { tag: 'Engineering',  title: 'The Truth About Finding Your First 10 Engineers' },
  { tag: 'Remote',       title: 'Why Distributed Teams Retain Better' },
  { tag: 'Recruiting',   title: 'How HireX Trends Inform Your Hiring in 2025' },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  .pr-section {
    --bg:       #04091a;
    --card-bg:  #080f22;
    --accent:   #1a6dff;
    --border:   rgba(26,109,255,0.14);
    --text:     #ffffff;
    --body:     rgba(255,255,255,0.55);
    --tag-border: rgba(26,109,255,0.30);
    --tag-text:   #5a8aaf;
    --divider:  rgba(26,109,255,0.10);
    --row-hover: rgba(26,109,255,0.07);

    width: 100%;
    background: var(--bg);
    padding: 80px 40px 88px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ── HEADER ── */
  .pr-header {
    text-align: center;
    margin-bottom: 44px;
    opacity: 0;
    animation: prFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
    animation-play-state: paused;
  }
  .pr-header.visible { animation-play-state: running; }

  .pr-eyebrow {
    font-family: 'Sora', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin: 0 0 14px;
    opacity: 0.85;
    display: block;
  }

  /* Blog-style big heading — editorial feel */
  .pr-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin: 0;
  }

  /* Underline accent under heading */
  .pr-heading-line {
    width: 48px; height: 3px;
    background: linear-gradient(90deg, var(--accent), rgba(26,109,255,0.3));
    border-radius: 2px;
    margin: 14px auto 0;
    opacity: 0;
    animation: prScaleIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.35s forwards;
    animation-play-state: paused;
  }
  .pr-heading-line.visible { animation-play-state: running; }

  @keyframes prScaleIn {
    from { opacity: 0; transform: scaleX(0); transform-origin: center; }
    to   { opacity: 1; transform: scaleX(1); }
  }

  /* ── CARD ── */
  .pr-card {
    width: 100%; max-width: 960px;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    /* Entrance */
    opacity: 0;
    transform: translateY(24px);
    animation: prFadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s forwards;
    animation-play-state: paused;
  }
  .pr-card.visible { animation-play-state: running; }

  /* Top shimmer */
  .pr-card::before {
    content: '';
    position: absolute;
    top: 0; left: 8%; right: 8%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
  }

  /* ── ROW ── */
  .pr-row {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 20px 28px;
    text-decoration: none;
    border-bottom: 1px solid var(--divider);
    transition: background 0.2s ease, padding-left 0.2s ease;
    position: relative;
    /* Stagger reveal */
    opacity: 0;
    animation: prSlideIn 0.55s cubic-bezier(0.22,1,0.36,1) var(--rd, 0.3s) forwards;
    animation-play-state: paused;
  }
  .pr-row.visible { animation-play-state: running; }
  .pr-row:last-child { border-bottom: none; }

  /* Left blue bar on hover */
  .pr-row::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--accent);
    transform: scaleY(0);
    transform-origin: center;
    transition: transform 0.22s ease;
    border-radius: 0 2px 2px 0;
  }
  .pr-row:hover::before { transform: scaleY(1); }

  .pr-row:hover {
    background: var(--row-hover);
    padding-left: 32px;
  }

  @keyframes prSlideIn {
    from { opacity: 0; transform: translateX(-16px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* ── TAG PILL ── */
  .pr-tag {
    flex-shrink: 0;
    padding: 5px 14px;
    border: 1px solid var(--tag-border);
    border-radius: 100px;
    font-family: 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--tag-text);
    min-width: 96px;
    text-align: center;
    white-space: nowrap;
    letter-spacing: 0.02em;
    background: rgba(26,109,255,0.06);
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }
  .pr-row:hover .pr-tag {
    background: rgba(26,109,255,0.14);
    border-color: rgba(26,109,255,0.50);
    color: #74b3ff;
  }

  /* ── TITLE ── */
  .pr-title {
    flex: 1;
    font-family: 'Sora', sans-serif;
    font-size: 0.97rem;
    font-weight: 700;
    word-break: break-word;
    color: var(--text);
    line-height: 1.4;
    letter-spacing: -0.01em;
    transition: color 0.2s;
  }
  .pr-row:hover .pr-title { color: #c8deff; }

  /* ── ARROW ── */
  .pr-arrow {
    flex-shrink: 0;
    width: 30px; height: 30px;
    border-radius: 50%;
    border: 1px solid rgba(26,109,255,0.22);
    background: rgba(26,109,255,0.07);
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }
  .pr-row:hover .pr-arrow {
    background: rgba(26,109,255,0.20);
    border-color: rgba(26,109,255,0.50);
    transform: translateX(3px);
  }

  @keyframes prFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .pr-section { padding: 56px 20px; }
    .pr-row { padding: 16px 20px; gap: 12px; }
    .pr-tag { min-width: 72px; font-size: 0.66rem; }
    .pr-title { font-size: 0.88rem; }
  }

@media (max-width: 480px) {

  .pr-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .pr-arrow {
    align-self: flex-end;
  }

}

@media (max-width: 640px) {
  .pr-row:hover {
    padding-left: 20px;
  }
}

@media (min-width: 1024px) {

  .pr-row {
    display: grid;
    grid-template-columns: 140px 1fr 60px;
    align-items: center;
  }

  .pr-tag {
    justify-self: start;
  }

  .pr-title {
    text-align: center;
  }

  .pr-arrow {
    justify-self: end;
  }

}


`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function PopularReading() {
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

  const v = visible ? ' visible' : '';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="pr-section" ref={sectionRef}>

        {/* Header */}
        <div className={`pr-header${v}`}>
          <span className="pr-eyebrow">Popular Reading</span>
          <h2 className="pr-heading">From the blog</h2>
          <div className={`pr-heading-line${v}`} />
        </div>

        {/* List card */}
        <div className={`pr-card${v}`}>
          {items.map((item, i) => (
            <a
              key={i}
              href="#"
              className={`pr-row${v}`}
              style={{
                '--rd': `${0.28 + i * 0.08}s`,
              } as React.CSSProperties}
            >
              <span className="pr-tag">{item.tag}</span>
              <span className="pr-title">{item.title}</span>
              <div className="pr-arrow">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M4.5 2.5L9.5 7L4.5 11.5"
                    stroke="rgba(26,109,255,0.7)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

      </section>
    </>
  );
}