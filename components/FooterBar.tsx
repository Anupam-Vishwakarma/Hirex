'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   DATA
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

const socials = [
  { label: 'Facebook', src: '/logo/facebook.png' },
  { label: 'Twitter',  src: '/logo/twitter.png' },
  { label: 'Instagram', src: '/logo/instagram.png' },
  { label: 'LinkedIn', src: '/logo/linkedin.png' },
  { label: 'YouTube',  src: '/logo/youtube.png' },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500&display=swap');

  @keyframes glowPulse {
    0%   { opacity: 0.55; }
    50%  { opacity: 1; }
    100% { opacity: 0.55; }
  }

  @keyframes ftReveal {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0%   { background-position: -400% center; }
    100% { background-position:  400% center; }
  }

  /* ── ROOT VARS ── */
  .footer {
    --bg:       #04091a;
    --accent:   #1a6dff;
    --border:   rgba(26,109,255,0.12);
    --text:     #ffffff;
    --muted:    rgba(255,255,255,0.38);
    --link:     rgba(255,255,255,0.50);

    width: 100%;
    background: var(--bg);
    font-family: 'Inter', sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* ── AMBIENT GLOW ── */
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

  /* ── GLOWING TOP BORDER ── */
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
    grid-template-columns: 1.9fr 1fr 1fr 1fr;
    gap: 0 40px;
    align-items: start;
    opacity: 0;
    animation: ftReveal 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
    animation-play-state: paused;
  }
  .footer-body.visible { animation-play-state: running; }

  /* ── BRAND ── */
  .footer-brand { grid-column: 1 / 2; }

  .footer-logo-img {
    height: 52px;
    width: auto;
    max-width: 200px;
    object-fit: contain;
    display: block;
  }

  .footer-logo-text {
    display: none;
    font-family: 'Sora', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .footer-logo-text .hl { color: var(--text); }
  .footer-logo-text .ai {
    color: var(--accent);
    text-shadow: 0 0 18px rgba(26,109,255,0.7);
  }

  /* ── NAV COLUMNS ── */
  .footer-col-heading {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text);
    letter-spacing: 0.01em;
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
    padding: 20px 56px 28px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    gap: 24px;
    opacity: 0;
    animation: ftReveal 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s forwards;
    animation-play-state: paused;
  }
  .footer-bottom.visible { animation-play-state: running; }

  /* LEFT — Social Icons */
  .footer-left {
    flex: 0 0 auto;
  }

  .footer-socials {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  /* ── ROUNDED SOCIAL ICONS ── */
  .social-img-btn {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.85;
    transition: opacity 0.22s ease, filter 0.22s ease;
    cursor: pointer;
    text-decoration: none;
    overflow: hidden;
  }
  .social-img-btn img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
  }
  .social-img-btn:hover {
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(26,109,255,0.55));
  }
  .social-img-btn:hover img { transform: scale(1.18); }
  .social-img-btn:active img { transform: scale(0.90); }

  /* CENTER — Copyright */
  .footer-center {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* copyright — slightly smaller, dimmer */
  .footer-copy {
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.42);
    margin: 0;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0;
    letter-spacing: 0.01em;
  }

  /* cookie — brighter + distinct underline to visually separate */
  .footer-cookie {
    margin-left: 16px;
    font-size: 0.80rem;
    font-weight: 500;
    color: rgba(255,255,255,0.65);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgba(255,255,255,0.28);
    white-space: nowrap;
    cursor: pointer;
    transition: color 0.15s, text-decoration-color 0.15s;
  }
  .footer-cookie:hover {
    color: rgba(255,255,255,0.92);
    text-decoration-color: rgba(255,255,255,0.55);
  }

  /* RIGHT — Browse */
  .footer-right {
    flex: 0 0 auto;
  }

  .footer-browse {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 3px;
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem;
    white-space: nowrap;
  }

  /* "Browse by:" label — dim + uppercase for visual contrast */
  .footer-browse-label {
    color: rgba(255,255,255,0.32);
    margin-right: 5px;
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-weight: 600;
  }

  /* browse links — brighter than label */
  .footer-browse-link {
    color: rgba(255,255,255,0.58);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-color: rgba(255,255,255,0.18);
    transition: color 0.15s, text-decoration-color 0.15s;
    cursor: pointer;
    font-weight: 400;
  }
  .footer-browse-link:hover {
    color: var(--text);
    text-decoration-color: rgba(255,255,255,0.50);
  }

  .footer-browse-sep {
    color: rgba(255,255,255,0.18);
  }

  /* ── RESPONSIVE: Tablet ── */
  @media (max-width: 960px) {
    .footer-body {
      grid-template-columns: 1fr 1fr;
      padding: 48px 32px 40px;
      gap: 36px 32px;
    }
    .footer-brand { grid-column: 1 / -1; }

    .footer-bottom {
      padding: 20px 32px 24px;
      gap: 16px;
    }

    .footer-browse {
      flex-wrap: wrap;
    }
  }

  /* ── RESPONSIVE: Mobile ── */
  @media (max-width: 640px) {
    .footer::before,
    .footer::after { display: none; }

    .footer-body {
      grid-template-columns: 1fr;
      padding: 40px 20px 32px;
      gap: 28px;
    }

    /* Stack bottom bar into 3 rows */
    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
      padding: 20px 20px 24px;
      gap: 16px;
      flex-wrap: wrap;
    }

    .footer-center {
      justify-content: flex-start;
    }

    .footer-copy {
      flex-wrap: wrap;
      white-space: normal;
      gap: 4px;
    }

    .footer-cookie {
      margin-left: 0;
    }

    .footer-browse {
      flex-wrap: wrap;
      white-space: normal;
    }
  }
`;

/* ─────────────────────────────────────────────
   SOCIAL BUTTON
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
  const footerRef = useRef<HTMLElement>(null);
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

        <div className="footer-glow-border" />

        <div className="footer-inner">

          {/* ── MAIN BODY ── */}
          <div className={`footer-body${v}`}>

            {/* Brand */}
            <div className="footer-brand">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {!imgError ? (
                  <img
                    src="/logo/hirex-logo.png"
                    alt="HireX logo"
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

            {/* Nav columns */}
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

          {/* Divider */}
          <div className="footer-divider" />

          {/* ── BOTTOM BAR ── */}
          <div className={`footer-bottom${v}`}>

            {/* LEFT — Socials */}
            <div className="footer-left">
              <div className="footer-socials">
                {socials.map(s => (
                  <SocialImgBtn key={s.label} label={s.label} src={s.src} />
                ))}
              </div>
            </div>

            {/* CENTER — Copyright + Cookie */}
            <div className="footer-center">
              <p className="footer-copy">
                Copyright © 2026 HireX. All rights reserved.
                <a href="#" className="footer-cookie">Cookie Preferences</a>
              </p>
            </div>

            {/* RIGHT — Browse by */}
            <div className="footer-right">
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