  'use client';

  import { useEffect, useRef, useState } from 'react';

  /* ─────────────────────────────────────────────
    STYLES
  ───────────────────────────────────────────── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');

    .promo-section {
      --bg:        #04091a;
      --card-bg:   #080f22;
      --accent:    #1a6dff;
      --border:    rgba(26,109,255,0.14);
      --text:      #ffffff;
      --body:      rgba(255,255,255,0.58);
      --muted:     rgba(255,255,255,0.35);

      width: 100%;
      background: var(--bg);
      padding: 72px 40px 80px;
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: center;
    }

    /* ── GRID ── */
    .promo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      width: 100%;
      max-width: 1100px;
    }

    /* ── CARD ── */
    .promo-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 38px 38px 34px;
      display: flex;
      flex-direction: column;
      min-height: 340px;
      position: relative;
      overflow: hidden;
      transition: border-color 0.28s, box-shadow 0.28s, transform 0.28s;
      /* Scroll reveal */
      opacity: 0;
      transform: translateY(28px);
      animation: pgReveal 0.75s cubic-bezier(0.22,1,0.36,1) var(--cd, 0.1s) forwards;
    }

    .promo-card:nth-child(1) { --cd: 0.1s; }
    .promo-card:nth-child(2) { --cd: 0.25s; }

    /* Top-edge shimmer */
    .promo-card::before {
      content: '';
      position: absolute;
      top: 0; left: 10%; right: 10%; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
    }

    /* Blue radial on hover */
    .promo-card::after {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse 60% 45% at 50% 0%, rgba(26,109,255,0.09) 0%, transparent 65%);
      opacity: 0;
      transition: opacity 0.3s;
      border-radius: inherit;
      pointer-events: none;
    }
    .promo-card:hover::after { opacity: 1; }

    .promo-card:hover {
      border-color: rgba(26,109,255,0.32);
      box-shadow: 0 16px 48px rgba(26,109,255,0.11), 0 2px 8px rgba(0,0,0,0.4);
      transform: translateY(-5px);
    }

    @keyframes pgReveal {
      to { opacity: 1; transform: translateY(0); }
    }

    /* ── EYEBROW ── */
    .promo-eyebrow {
      font-family: 'Sora', sans-serif;
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      margin: 0 0 14px;
      opacity: 0.85;
      /* Element-level reveal */
      opacity: 0;
      animation: pgFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) var(--ed, 0.25s) forwards;
    }

    /* ── HEADING ── */
    .promo-heading {
      font-family: 'Sora', sans-serif;
      font-size: clamp(1.9rem, 2.8vw, 2.6rem);
      font-weight: 900;
      color: var(--text);
      line-height: 1.08;
      white-space: pre-line;
      letter-spacing: -0.04em;
      margin: 0;
      /* Element-level reveal */
      opacity: 0;
      animation: pgFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) var(--hd, 0.35s) forwards;
    }

    /* Spacer pushes bottom content down */
    .promo-spacer { flex: 1; }

    /* ── BOTTOM ROW ── */
    .promo-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 20px;
      /* Element-level reveal */
      opacity: 0;
      animation: pgFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) var(--bd, 0.5s) forwards;
    }

    .promo-body-wrap { max-width: 360px; }

    .promo-body {
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      color: var(--body);
      line-height: 1.7;
      margin: 0 0 8px;
      letter-spacing: 0.01em;
    }

    .promo-body-note {
      font-family: 'Inter', sans-serif;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--muted);
      margin: 0;
      letter-spacing: 0.01em;
    }

    /* ── CTA LINK ── */
    .promo-cta {
      font-family: 'Sora', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      color: #fff;
      text-decoration: none;
      white-space: nowrap;
      flex-shrink: 0;
      position: relative;
      padding-bottom: 3px;
      letter-spacing: 0.01em;
      transition: color 0.2s;
    }
    /* Animated underline */
    .promo-cta::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 100%; height: 1.5px;
      background: rgba(26,109,255,0.55);
      transform-origin: right;
      transform: scaleX(1);
      transition: transform 0.25s ease, background 0.25s;
    }
    .promo-cta:hover { color: #74b3ff; }
    .promo-cta:hover::after {
      background: #1a6dff;
      transform-origin: left;
    }

    /* ── DECORATIVE ACCENT BLOB ── */
    .promo-blob {
      position: absolute;
      top: -40px; right: -40px;
      width: 180px; height: 180px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(26,109,255,0.10) 0%, transparent 70%);
      pointer-events: none;
      transition: opacity 0.3s;
    }
    .promo-card:hover .promo-blob { opacity: 1.4; }

    /* ── DIVIDER LINE ── */
    .promo-divider {
      width: 36px; height: 2px;
      background: linear-gradient(90deg, var(--accent), rgba(26,109,255,0.3));
      border-radius: 2px;
      margin-bottom: 0;
      /* Element-level reveal */
      opacity: 0;
      animation: pgScaleIn 0.5s cubic-bezier(0.22,1,0.36,1) var(--dd, 0.45s) forwards;
      margin-top: 24px;
      margin-bottom: 20px;
    }
    @keyframes pgScaleIn {
      from { opacity: 0; transform: scaleX(0); transform-origin: left; }
      to   { opacity: 1; transform: scaleX(1); transform-origin: left; }
    }

    @keyframes pgFadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 760px) {
      .promo-grid { grid-template-columns: 1fr; }
      .promo-section { padding: 48px 20px 56px; }
      .promo-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
    }

    @media (max-width: 480px) {
  .promo-body-wrap {
    max-width: 100%;
  }

  .promo-card {
    padding: 28px 22px 26px;
  }

  .promo-heading {
    font-size: clamp(1.6rem, 6vw, 2rem);
  }
}

  `;

  /* ─────────────────────────────────────────────
    CARD COMPONENT
  ───────────────────────────────────────────── */
  function PromoCard({
    eyebrow,
    heading,
    body,
    note,
    cta,
    cardDelay,
    eyebrowDelay,
    headingDelay,
    dividerDelay,
    bottomDelay,
  }: {
    eyebrow: string;
    heading: string;
    body: string;
    note?: string;
    cta: string;
    cardDelay: string;
    eyebrowDelay: string;
    headingDelay: string;
    dividerDelay: string;
    bottomDelay: string;
  }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
        { threshold: 0.18 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, []);

    return (
      <div
        ref={ref}
        className="promo-card"
        style={{
          '--cd': cardDelay,
          animationPlayState: visible ? 'running' : 'paused',
        } as React.CSSProperties}
      >
        {/* Decorative blob */}
        <div className="promo-blob" />

        {/* Eyebrow */}
        <p
          className="promo-eyebrow"
          style={{
            '--ed': eyebrowDelay,
            animationPlayState: visible ? 'running' : 'paused',
          } as React.CSSProperties}
        >
          {eyebrow}
        </p>

        {/* Heading */}
        <h2
          className="promo-heading"
          style={{
            '--hd': headingDelay,
            animationPlayState: visible ? 'running' : 'paused',
          } as React.CSSProperties}
        >
          {heading}
        </h2>

        {/* Blue divider */}
        <div
          className="promo-divider"
          style={{
            '--dd': dividerDelay,
            animationPlayState: visible ? 'running' : 'paused',
          } as React.CSSProperties}
        />

        <div className="promo-spacer" />

        {/* Bottom: body + CTA */}
        <div
          className="promo-bottom"
          style={{
            '--bd': bottomDelay,
            animationPlayState: visible ? 'running' : 'paused',
          } as React.CSSProperties}
        >
          <div className="promo-body-wrap">
            <p className="promo-body">{body}</p>
            {note && <p className="promo-body-note">{note}</p>}
          </div>
          <a className="promo-cta" href="#">{cta}</a>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
    MAIN COMPONENT
  ───────────────────────────────────────────── */
  export default function PromoGrid() {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <section className="promo-section">
          <div className="promo-grid">

            <PromoCard
              eyebrow="Get Featured"
              heading={`Let us show\nyou off`}
              body="Apply to be featured and let the opportunities come to you. We'll highlight your profile to top recruiters and companies searching for your skills."
              note="Oh, it's also 100% free."
              cta="Learn more"
              cardDelay="0.1s"
              eyebrowDelay="0.28s"
              headingDelay="0.38s"
              dividerDelay="0.50s"
              bottomDelay="0.60s"
            />

            <PromoCard
              eyebrow="Salary Calculator"
              heading={`Know your\nworth`}
              body="We have the data. Research by job title, industry, and company size to find your salary range and be prepared to nail your negotiations."
              cta="Calculate"
              cardDelay="0.25s"
              eyebrowDelay="0.42s"
              headingDelay="0.52s"
              dividerDelay="0.64s"
              bottomDelay="0.74s"
            />

          </div>
        </section>
      </>
    );
  }