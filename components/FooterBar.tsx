'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   DATA — matched exactly to Image 2 (Wellfound layout)
───────────────────────────────────────────── */
const cols = [
  {
    heading: 'For Candidates',
    links: ['Overview', 'Startup Jobs', 'Web3 Jobs', 'Featured', 'Salary Calculator', 'Startup Hiring Data', 'Tech Startups', 'Remote'],
  },
  {
    heading: 'For Recruiters',
    links: ['Overview', 'Recruit Pro', 'Curated', 'HireX:ai', 'Hire Developers', 'Pricing'],
  },
  {
    heading: 'Company',
    links: ['About', 'Help', 'Blog', 'Terms & Risks', 'Privacy & Cookies', 'Trust', 'Platform Status'],
  },
];

const browseLinks = ['Jobs', 'Remote Jobs', 'Locations', 'Startups', 'Startups Hiring', 'Industries', 'Tech Hubs'];

/* ─────────────────────────────────────────────
   SOCIAL ICONS — placeholder paths, user will supply
───────────────────────────────────────────── */
const socials = [
  { label: 'Facebook / X', src: '/logo/facebook.png' },
  { label: 'Twitter',   src: '/logo/twitter.png' },
  { label: 'Instagram',   src: '/logo/instagram.png' },
  { label: 'LinkedIn', src: '/logo/linkedin.png' },
  { label: 'You Tube / X', src: '/logo/youtube.png' },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500&display=swap');

  /* ── GLOW KEYFRAMES ── */
  @keyframes glowPulse {
    0%   { opacity: 0.55; }
    50%  { opacity: 1; }
    100% { opacity: 0.55; }
  }

  @keyframes ftReveal {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes iconFloat {
    0%   { transform: translateY(0) scale(1); }
    50%  { transform: translateY(-4px) scale(1.07); }
    100% { transform: translateY(0) scale(1); }
  }

  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position:  400% center; }
  }

  /* ── ROOT VARS ── */
  .footer {
    --bg:        #04091a;
    --card-bg:   #080f22;
    --accent:    #1a6dff;
    --border:    rgba(26,109,255,0.12);
    --text:      #ffffff;
    --muted:     rgba(255,255,255,0.38);
    --link:      rgba(255,255,255,0.50);
    --glow-col:  rgba(26,109,255,0.18);

    width: 100%;
    background: var(--bg);
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;

    /* top border glow */
    border-top: 1px solid transparent;
    background-clip: padding-box;
  }

  /* ── AMBIENT GLOW LAYERS ── */
  .footer::before {
    content: '';
    position: absolute;
    top: -120px; left: 50%;
    transform: translateX(-50%);
    width: 820px; height: 320px;
    background: radial-gradient(ellipse at center, rgba(26,109,255,0.20) 0%, transparent 70%);
    pointer-events: none;
    animation: glowPulse 4s ease-in-out infinite;
    z-index: 0;
  }
  .footer::after {
    content: '';
    position: absolute;
    bottom: -60px; right: -80px;
    width: 500px; height: 300px;
    background: radial-gradient(ellipse at center, rgba(26,109,255,0.10) 0%, transparent 70%);
    pointer-events: none;
    animation: glowPulse 5s ease-in-out 1.5s infinite;
    z-index: 0;
  }

  /* glowing top border line */
  .footer-glow-border {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(26,109,255,0.6) 20%,
      rgba(80,160,255,1) 50%,
      rgba(26,109,255,0.6) 80%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmer 4s linear infinite;
    z-index: 1;
  }

  /* ── INNER WRAPPER ── */
  .footer-inner {
    position: relative;
    z-index: 2;
  }

  /* ── MAIN BODY ── */
  .footer-body {
    max-width: 1160px;
    margin: 0 auto;
    padding: 72px 56px 60px;
    display: grid;
    /* Big brand left, three nav cols right — mirrors Image 2 */
    grid-template-columns: 1.9fr 1fr 1fr 1fr;
    gap: 0 40px;
    align-items: start;
    opacity: 0;
    animation: ftReveal 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
    animation-play-state: paused;
  }
  .footer-body.visible { animation-play-state: running; }

  /* ── BRAND COL ── */
  .footer-brand { grid-column: 1 / 2; }

  .footer-logo-img {
    height: 52px;
    width: auto;
    max-width: 200px;
    object-fit: contain;
    display: block;
    margin-bottom: 0;
  }

  /* Fallback wordmark */
  .footer-logo-text {
    display: none;
    font-family: 'Sora', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    margin-bottom: 0;
    line-height: 1;
  }
  .footer-logo-text .hl { color: var(--text); }
  .footer-logo-text .ai {
    color: var(--accent);
    text-shadow: 0 0 18px rgba(26,109,255,0.7);
  }

  /* ── NAV COLUMN ── */
  .footer-col-heading {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    letter-spacing: 0.01em;
    text-transform: none;
    margin: 0 0 20px;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 13px;
  }

  .footer-link {
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--link);
    text-decoration: none;
    letter-spacing: 0em;
    transition: color 0.18s ease;
    display: inline-block;
    line-height: 1.2;
  }
  .footer-link:hover { color: var(--text); }

  /* ── DIVIDER ── */
  .footer-divider {
    max-width: 1160px;
    margin: 0 auto;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      var(--border) 20%,
      rgba(26,109,255,0.25) 50%,
      var(--border) 80%,
      transparent
    );
    position: relative;
  }
  .footer-divider::after {
    content: '';
    position: absolute;
    inset: 0;
    background: inherit;
    filter: blur(3px);
    opacity: 0.6;
  }

  /* ── BOTTOM BAR ── */
  .footer-bottom {
    max-width: 1160px;
    margin: 0 auto;
    padding: 24px 56px 28px;
    display: flex;
    align-items: center;
    gap: 24px;
    flex-wrap: wrap;
    opacity: 0;
    animation: ftReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s forwards;
    animation-play-state: paused;
  }
  .footer-bottom.visible { animation-play-state: running; }

  /* ── SOCIAL ICONS — placeholder images ── */
  .footer-socials {
    display: flex;
    gap: 14px;
    align-items: center;
  }

  .social-img-btn {
    width: 36px; height: 36px;
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0.82;
    transition: opacity 0.22s ease, transform 0.22s ease, filter 0.22s ease;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    overflow: hidden;  
  }
  .social-img-btn img {
  width: 100%; height: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
}
.social-img-btn:hover {
  opacity: 1;
  filter: drop-shadow(0 0 10px rgba(26,109,255,0.55));
}
.social-img-btn:hover img {
  transform: scale(1.22);
}
.social-img-btn:active img { transform: scale(0.92); }
  .social-img-btn:active { transform: scale(0.96); }

  /* ── COPYRIGHT ── */
  .footer-copy {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: var(--muted);
    margin: 0;
  }

  .footer-cookie {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: var(--muted);
    text-decoration: underline;
    transition: color 0.18s;
    cursor: pointer;
    text-underline-offset: 2px;
    margin-left: 12px;
  }
  .footer-cookie:hover { color: rgba(255,255,255,0.75); }

  /* ── BROWSE ROW — pushed to right ── */
  .footer-browse-wrap {
    margin-left: auto;
  }

  .footer-browse {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 3px;
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
  }

  .footer-browse-label {
    color: var(--muted);
    margin-right: 4px;
  }

  .footer-browse-link {
    color: rgba(255,255,255,0.45);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.15s;
    cursor: pointer;
  }
  .footer-browse-link:hover { color: var(--text); }

  .footer-browse-sep {
    color: rgba(255,255,255,0.22);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .footer-body {
      grid-template-columns: 1fr 1fr;
      padding: 48px 32px 40px;
      gap: 36px 32px;
    }
    .footer-brand { grid-column: 1 / -1; }
    .footer-bottom { padding: 20px 32px 24px; }
  }
  @media (max-width: 600px) {
    .footer-body { grid-template-columns: 1fr; }
    .footer-bottom { flex-direction: column; align-items: flex-start; gap: 14px; }
    .footer-browse-wrap { margin-left: 0; }
    .footer::before { width: 340px; height: 200px; }
  }

@media (max-width: 600px) {
  .footer-bottom {
    gap: 18px;
  }

  .footer-copy,
  .footer-cookie {
    font-size: 0.78rem;
  }
}

@media (max-width: 600px) {
  .footer-browse {
    line-height: 1.6;
  }
}

@media (max-width: 600px) {
  .footer::before,
  .footer::after {
    display: none;
  }
}



`;

/* ─────────────────────────────────────────────
   SOCIAL IMAGE BUTTON
───────────────────────────────────────────── */
function SocialImgBtn({ label, src }: { label: string; src: string }) {
  return (
    <a href="#" className="social-img-btn" aria-label={label}>
      <img src={src} alt={label} />
    </a>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const [visible, setVisible]   = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const v = visible ? ' visible' : '';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <footer className="footer" ref={footerRef}>

        {/* Animated glowing top border */}
        <div className="footer-glow-border" />

        <div className="footer-inner">

          {/* ── MAIN BODY ── */}
          <div className={`footer-body${v}`}>

            {/* Brand — large left section */}
              <div className="footer-brand">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {!imgError ? (
                    <img
                      src="/logo/hirex-logo.png" alt="HireX logo"
                      className="footer-logo-img"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="footer-logo-text" style={{ display: 'block' }}>
                      <span className="hl">HireX</span>
                      <span className="ai">:ai</span>
                    </div>
                  )}
                  <span style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#ffffff',
                    letterSpacing: '-0.025em',
                  }}>
                    HireX
                  </span>
                </div>
              </div>

            {/* Nav columns — staggered reveal */}
            {cols.map((col, ci) => (
              <div
                key={col.heading}
                style={{
                  opacity: 0,
                  animation: `ftReveal 0.65s cubic-bezier(0.22,1,0.36,1) ${0.18 + ci * 0.09}s forwards`,
                  animationPlayState: visible ? 'running' : 'paused',
                }}
              >
                <h4 className="footer-col-heading">{col.heading}</h4>
                <div className="footer-links">
                  {col.links.map((link, li) => (
                    <a
                      key={link}
                      href="#"
                      className="footer-link"
                      style={{
                        opacity: 0,
                        animation: `ftReveal 0.48s cubic-bezier(0.22,1,0.36,1) ${0.22 + ci * 0.09 + li * 0.035}s forwards`,
                        animationPlayState: visible ? 'running' : 'paused',
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Glowing divider */}
          <div className="footer-divider" />

          {/* ── BOTTOM BAR ── */}
          <div className={`footer-bottom${v}`}>

            {/* Social icons — left */}
            <div className="footer-socials">
              {socials.map(s => (
                <SocialImgBtn key={s.label} label={s.label} src={s.src} />
              ))}
            </div>

            {/* Copyright + cookie */}
            <p className="footer-copy">
              Copyright © 2026 HireX. All rights reserved.
            </p>
            <a href="#" className="footer-cookie">Cookie Preferences</a>

            {/* Browse — pushed right via margin-left:auto on wrapper */}
            <div className="footer-browse-wrap">
              <div className="footer-browse">
                <span className="footer-browse-label">Browse by:</span>
                {browseLinks.map((link, i) => (
                  <span key={link}>
                    <a href="#" className="footer-browse-link">{link}</a>
                    {i < browseLinks.length - 1 && (
                      <span className="footer-browse-sep">,&nbsp;</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}