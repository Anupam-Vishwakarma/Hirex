'use client';

import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   SVG ICONS — traced from 2nd reference image
   Pink/salmon circle bg, line-art icon inside
───────────────────────────────────────────── */
const IconConnect = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconInfo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const IconApply = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="12" y2="17"/>
  </svg>
);

const IconStar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const IconCommunity = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconRocket = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const IconATS = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const IconAI = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const seekerFeatures = [
  { Icon: IconConnect, title: 'Connect directly with founders at top startups', body: 'No third party recruiters allowed.' },
  { Icon: IconInfo,    title: 'Everything you need to know, all upfront.',      body: 'View salary, stock options, and more before applying.' },
  { Icon: IconApply,   title: 'Say goodbye to cover letters',                   body: 'Your profile is all you need. One click to apply and you\'re done.' },
  { Icon: IconStar,    title: 'Unique jobs at startups and tech companies',     body: 'You can\'t find them anywhere else.' },
];

const recruiterFeatures = [
  { Icon: IconCommunity, title: 'Tap into a community of 10M+ engaged,',            body: 'startup-ready candidates.' },
  { Icon: IconRocket,    title: 'Everything you need to kickstart your recruiting',  body: 'Set up job posts, company branding, and HR tools within 10 minutes, all for free.' },
  { Icon: IconATS,       title: 'A free applicant tracking system,',                body: 'or free integration with any ATS you may already use.' },
  { Icon: IconAI,        title: 'Let us handle the heavy-lifting with RecruiterCloud.', body: 'Our AI-Recruiter scans 500M+ candidates and schedules your favorites in days.' },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500&display=swap');

  .why-section {
    --bg:           #04091a;
    --card-bg:      #080f22;
    --accent:       #1a6dff;
    --accent-dim:   rgba(26,109,255,0.12);
    --border:       rgba(26,109,255,0.14);
    --text:         #ffffff;
    --body:         #5a7a9a;
    --icon-bg:      rgba(26,109,255,0.12);
    --icon-color:   #4a9aff;

    width: 100%;
    background: var(--bg);
    padding: 80px 40px;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    border-top: 1px solid var(--border);
  }

  /* ── OUTER WRAPPER: two panels side by side with a gap ── */
  .why-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    max-width: 1100px;
    margin: 0 auto;
    align-items: start;
  }

  /* ── PANEL CARD ── */
.why-panel {
  background: #080f22; /* default left panel bg */
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 48px 44px 44px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s;

  /* Reveal */
  opacity: 0;
  transform: translateY(28px);
  animation: panelReveal 0.75s cubic-bezier(0.22,1,0.36,1) var(--pd, 0s) forwards;
}

/* LEFT PANEL — keep base background */
.why-panel:first-child {
  background: #080f22;
}

/* RIGHT PANEL — slightly elevated theme shade */
.why-panel:last-child {
  background: linear-gradient(
    145deg,
    #0a1228 0%,
    #0d1a35 100%
  );
}

/* Optional subtle highlight for right panel */
.why-panel:last-child:hover {
  box-shadow: 0 16px 48px rgba(26,109,255,0.12);
}


  .why-panel:nth-child(1) { --pd: 0.1s; }
  .why-panel:nth-child(2) { --pd: 0.25s; }

  .why-panel:hover {
    border-color: rgba(26,109,255,0.30);
    box-shadow: 0 16px 48px rgba(26,109,255,0.10);
  }

  /* Top-edge shimmer */
  .why-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 12%; right: 12%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  }

  /* Subtle corner glow */
  .why-panel::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 55% 40% at 50% 0%, rgba(26,109,255,0.07) 0%, transparent 65%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: inherit;
  }
  .why-panel:hover::after { opacity: 1; }

  @keyframes panelReveal {
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── EYEBROW ── */
  .why-eyebrow {
    font-family: 'Sora', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--accent);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 12px;
    opacity: 0.85;
  }

  /* ── HEADING ── */
  .why-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0 0 36px;
  }

  /* ── FEATURE LIST ── */
  .why-features {
    display: flex;
    flex-direction: column;
    gap: 26px;
    margin-bottom: 40px;
  }

  .why-feature {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    /* Stagger reveal */
    opacity: 0;
    transform: translateX(-12px);
    animation: featureReveal 0.6s cubic-bezier(0.22,1,0.36,1) var(--fd, 0.2s) forwards;
  }

  @keyframes featureReveal {
    to { opacity: 1; transform: translateX(0); }
  }

  /* Icon circle */
  .why-icon-wrap {
    flex-shrink: 0;
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--icon-bg);
    border: 1px solid rgba(26,109,255,0.20);
    display: flex; align-items: center; justify-content: center;
    color: var(--icon-color);
    transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
  }
  .why-feature:hover .why-icon-wrap {
    background: rgba(26,109,255,0.22);
    border-color: rgba(26,109,255,0.45);
    box-shadow: 0 0 18px rgba(26,109,255,0.25);
  }

  .why-text { flex: 1; }

  .why-feature-title {
    font-family: 'Sora', sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
    margin-bottom: 4px;
    line-height: 1.35;
  }

  .why-feature-body {
    font-size: 0.84rem;
    font-weight: 400;
    color: var(--body);
    line-height: 1.6;
    letter-spacing: 0.01em;
  }

  /* ── CTA BUTTONS ── */
  .why-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .why-btn {
    font-family: 'Sora', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    padding: 11px 26px;
    border-radius: 100px;
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s, border-color 0.2s;
    position: relative; overflow: hidden;
  }

  /* Shimmer on hover */
  .why-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.4s;
    border-radius: inherit;
  }
  .why-btn:hover::after { transform: translateX(100%); }

  .why-btn-ghost {
    background: transparent;
    color: #c0d4ea;
    border: 1px solid rgba(255,255,255,0.16);
  }
  .why-btn-ghost:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(26,109,255,0.45);
    color: #fff;
    transform: translateY(-2px);
  }

  .why-btn-solid {
    background: #1a6dff;
    color: #fff;
    border: 1px solid rgba(26,109,255,0.5);
    box-shadow: 0 0 20px rgba(26,109,255,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  }
  .why-btn-solid:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 36px rgba(26,109,255,0.55), inset 0 1px 0 rgba(255,255,255,0.15);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .why-grid { grid-template-columns: 1fr; }
    .why-section { padding: 56px 20px; }
    .why-panel { padding: 36px 28px 32px; }
  }

@media (max-width: 480px) {

  /* Panel padding tighter but breathable */
  .why-panel {
    padding: 28px 20px 26px;
  }

  /* Section padding */
  .why-section {
    padding: 48px 16px;
  }

  /* Heading slightly smaller */
  .why-heading {
    font-size: 1.35rem;
    margin-bottom: 26px;
  }

  /* Feature spacing tighter */
  .why-features {
    gap: 20px;
    margin-bottom: 30px;
  }

  /* Icon slightly smaller */
  .why-icon-wrap {
    width: 38px;
    height: 38px;
  }

  /* Title better readability */
  .why-feature-title {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  /* Body text more readable */
  .why-feature-body {
    font-size: 0.82rem;
    line-height: 1.6;
  }

  /* Buttons slightly smaller */
  .why-btn {
    padding: 10px 20px;
    font-size: 0.82rem;
  }
}


`;

/* ─────────────────────────────────────────────
   PANEL COMPONENT
───────────────────────────────────────────── */
function Panel({
  eyebrow, heading, features, delay,
}: {
  eyebrow: string;
  heading: string;
  features: { Icon: React.FC; title: string; body: string }[];
  delay: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* Intersection observer to trigger animations on scroll */
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationPlayState = 'running';
          el.querySelectorAll<HTMLElement>('.why-feature').forEach(f => {
            f.style.animationPlayState = 'running';
          });
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="why-panel"
      ref={panelRef}
      style={{ '--pd': delay, animationPlayState: 'paused' } as React.CSSProperties}
    >
      <p className="why-eyebrow">{eyebrow}</p>
      <h2 className="why-heading">{heading}</h2>

      <div className="why-features">
        {features.map(({ Icon, title, body }, i) => (
          <div
            key={title}
            className="why-feature"
            style={{
              '--fd': `${0.15 + i * 0.1}s`,
              animationPlayState: 'paused',
            } as React.CSSProperties}
          >
            <div className="why-icon-wrap">
              <Icon />
            </div>
            <div className="why-text">
              <div className="why-feature-title">{title}</div>
              <div className="why-feature-body">{body}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="why-actions">
        <a className="why-btn why-btn-ghost" href="#">Learn more</a>
        <a className="why-btn why-btn-solid" href="#">Sign up</a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function WhyUs() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="why-section">
        <div className="why-grid">
          <Panel
            eyebrow="Got talent?"
            heading="Why job seekers love us"
            features={seekerFeatures}
            delay="0.1s"
          />
          <Panel
            eyebrow="Need talent?"
            heading="Why recruiters love us"
            features={recruiterFeatures}
            delay="0.25s"
          />
        </div>
      </section>
    </>
  );
}