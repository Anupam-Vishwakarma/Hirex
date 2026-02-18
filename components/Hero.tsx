import React from 'react';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const floatTags = [
  // LEFT SIDE
  { label: 'Robotics',               cls: 'ft-robotics',   delay: '0.2s', dur: '1.6s' },
  { label: 'Artificial Intelligence',cls: 'ft-ai',         delay: '0.5s', dur: '1.4s' },
  { label: 'Databases',              cls: 'ft-databases',  delay: '0.8s', dur: '1.8s' },
  { label: 'E-commerce',             cls: 'ft-ecomm',      delay: '0.3s', dur: '1.5s' },
  { label: 'Node.js Developers',     cls: 'ft-node',       delay: '0.6s', dur: '1.6s' },
  { label: 'Hardware',               cls: 'ft-hardware',   delay: '0.4s', dur: '1.4s' },
  { label: 'Blockchain Developers',  cls: 'ft-blockchain', delay: '0.7s', dur: '1.7s' },
  { label: 'Front End Devs',         cls: 'ft-frontend',   delay: '0.9s', dur: '1.5s' },
  // RIGHT SIDE
  { label: 'Cyber Security',         cls: 'ft-cyber',      delay: '0.1s', dur: '1.6s' },
  { label: 'Aerospace',              cls: 'ft-aerospace',  delay: '0.4s', dur: '1.4s' },
  { label: 'Seattle',                cls: 'ft-seattle',    delay: '0.7s', dur: '1.5s' },
  { label: 'Austin',                 cls: 'ft-austin',     delay: '1.0s', dur: '1.4s' },
  { label: 'San Francisco',          cls: 'ft-sf',         delay: '0.5s', dur: '1.7s' },
  { label: 'SaaS',                   cls: 'ft-saas',       delay: '0.8s', dur: '1.5s' },
  { label: 'Web3',                   cls: 'ft-web3',       delay: '0.2s', dur: '1.8s' },
  { label: 'iOS Developers',         cls: 'ft-ios',        delay: '0.6s', dur: '1.6s' },
  { label: 'Boston',                 cls: 'ft-boston',     delay: '0.3s', dur: '1.4s' },
  { label: 'Vue.js Developers',      cls: 'ft-vuejs',      delay: '0.9s', dur: '1.7s' },
  { label: 'Los Angeles',            cls: 'ft-la',         delay: '0.5s', dur: '1.6s' },
];

const chips = [
  'Growth', 'Founding Engineer', 'Product', 'Design',
  'Data', 'Marketing', 'Remote', 'AI', 'Fintech', 'Web3',
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

  .hero-section {
    --bg:          #04091a;
    --accent:      #1a6dff;
    --accent-dim:  rgba(26,109,255,0.14);
    --accent-glow: rgba(26,109,255,0.38);
    --body:        rgba(255,255,255,0.60);
    --tag-bg:      rgba(26,109,255,0.09);
    --tag-border:  rgba(26,109,255,0.24);
    --tag-text:    #ffffff;
    --chip-bg:     rgba(255,255,255,0.04);
    --chip-border: rgba(255,255,255,0.10);
    --chip-text:   rgba(255,255,255,0.55);

    position: relative;
    width: 100%;
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    color: #fff;
  }

  /* ── ATMOSPHERIC GLOW ── */
  .hero-section::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 45% at 50% 30%, rgba(26,109,255,0.13) 0%, transparent 65%),
      radial-gradient(ellipse 28% 28% at 12% 60%, rgba(26,109,255,0.06) 0%, transparent 55%),
      radial-gradient(ellipse 28% 28% at 88% 55%, rgba(26,109,255,0.06) 0%, transparent 55%);
    pointer-events: none; z-index: 0;
    animation: atmospherePulse 8s ease-in-out infinite alternate;
  }
  @keyframes atmospherePulse {
    0%   { opacity: 0.7; }
    100% { opacity: 1;   }
  }

  /* ── SCANLINES ── */
  .hero-section::after {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 3px,
      rgba(255,255,255,0.007) 3px, rgba(255,255,255,0.007) 4px
    );
    pointer-events: none; z-index: 0;
  }

  /* ── GRID ── */
  .hero-grid {
    position: absolute; inset: 0; z-index: 1;
    background-image:
      linear-gradient(rgba(26,109,255,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(26,109,255,0.045) 1px, transparent 1px);
    background-size: 56px 56px;
    mask-image: radial-gradient(ellipse 80% 65% at 50% 36%, black 15%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse 80% 65% at 50% 36%, black 15%, transparent 70%);
    animation: gridBreath 7s ease-in-out infinite alternate;
  }
  @keyframes gridBreath {
    0%   { opacity: 0.3; }
    100% { opacity: 0.8; }
  }

  /* ── FLOATING TAGS ── */
  .float-tags {
    position: absolute; inset: 0;
    pointer-events: none; z-index: 2;
  }

  .float-tag {
    position: absolute;
    pointer-events: all;
    background: var(--tag-bg);
    border: 1px solid var(--tag-border);
    color: var(--tag-text);
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem; font-weight: 500;
    padding: 7px 16px; border-radius: 100px;
    white-space: nowrap;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    letter-spacing: 0.025em;
    opacity: 0;
    animation:
      tagReveal 0.8s cubic-bezier(0.22,1,0.36,1) calc(var(--d, 0s) + 0.5s) forwards,
      tagFloat  var(--dur, 1.6s) ease-in-out var(--d, 0s) infinite alternate;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    transform-origin: center;
  }
  .float-tag:hover {
    border-color: rgba(26,109,255,0.7);
    box-shadow: 0 0 22px rgba(26,109,255,0.35);
    color: #fff;
    transform: scale(1.18) !important;
    z-index: 10;
  }

  @keyframes tagReveal {
    from { opacity: 0; transform: translateY(14px) scale(0.93); }
    to   { opacity: 1; transform: translateY(0px)  scale(1);    }
  }

  /* Fast float — 24px travel, 1.4–1.8s cycle */
  @keyframes tagFloat {
    0%   { transform: translateY(0px); }
    100% { transform: translateY(-24px); }
  }

  /* ── TAG POSITIONS — more vertical spread ── */
  /* LEFT column */
  .ft-robotics   { top:  6%; left:  3%; }
  .ft-ai         { top:  3%; left: 18%; }
  .ft-databases  { top: 22%; left:  2%; }
  .ft-ecomm      { top: 22%; left: 16%; }
  .ft-node       { top: 38%; left:  2%; }
  .ft-hardware   { top: 38%; left: 18%; }
  .ft-blockchain { top: 55%; left:  5%; }
  .ft-frontend   { top: 22%; left: 33%; }

  /* RIGHT column */
  .ft-aerospace  { top:  3%; right:  4%; }
  .ft-cyber      { top:  9%; right: 16%; }
  .ft-seattle    { top: 16%; right:  4%; }
  .ft-austin     { top: 18%; right: 11%; }
  .ft-sf         { top: 24%; right: 16%; }
  .ft-saas       { top: 24%; right:  4%; }
  .ft-web3       { top: 25%; right:  1%; }
  .ft-ios        { top: 38%; right: 16%; }
  .ft-boston     { top: 38%; right: 31%; }
  .ft-vuejs      { top: 48%; right: 12%; }
  .ft-la         { top: 56%; right:  2%; }

  /* ── CONTENT WRAPPER ── */
  .hero-content {
    position: relative; z-index: 3;
    display: flex; flex-direction: column;
    align-items: center; justify-content: space-between;
    text-align: center;
    width: 100%; min-height: 100vh;
    padding: 130px 24px 52px;
    box-sizing: border-box;
  }

  .hero-headline-wrap {
    flex: 1;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── HEADLINE — slightly smaller ── */
  .hero-content h1 {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 4.4vw, 4.2rem);
    font-weight: 800;
    line-height: 1.08;
    color: #fff;
    letter-spacing: -0.04em;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.15em;
    flex-wrap: nowrap;
    animation: headlineReveal 1s cubic-bezier(0.22,1,0.36,1) 0.15s both;
  }

  .hero-content h1 .h-prefix {
    color: #1a6dff;
    font-weight: 800;
    text-shadow: 0 0 40px rgba(26,109,255,0.7);
    flex-shrink: 0;
  }

  /* Dashed border */
  .hero-content h1 .h-boxed {
    display: inline-flex;
    align-items: center;
    border: 2.5px dashed rgba(255,255,255,0.52);
    border-radius: 14px;
    padding: 0.05em 0.28em 0.1em;
    color: #fff;
    box-shadow: 0 0 28px rgba(26,109,255,0.12), inset 0 0 20px rgba(26,109,255,0.05);
    flex-shrink: 0;
  }

  @keyframes headlineReveal {
    from { opacity: 0; transform: translateY(36px) scale(0.96); filter: blur(6px); }
    to   { opacity: 1; transform: translateY(0) scale(1);       filter: blur(0);   }
  }

  /* ── BOTTOM BLOCK ── */
  .hero-bottom {
    display: flex; flex-direction: column;
    align-items: center; width: 100%;
  }

  .hero-divider {
    width: 100%; max-width: 640px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(26,109,255,0.35) 30%, rgba(26,109,255,0.35) 70%, transparent);
   margin-top: 150px;
    margin-bottom: 150px;
    animation: riseUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }

  .hero-subtitle {
    font-size: clamp(0.95rem, 1.8vw, 1.12rem);
    color: var(--body);
    margin-bottom: 28px;
    font-weight: 400;
    letter-spacing: 0.02em;
    animation: riseUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.42s both;
  }

  .hero-cta {
    display: flex; gap: 14px;
    margin-bottom: 36px;
    flex-wrap: wrap; justify-content: center;
    animation: riseUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.55s both;
  }

  @keyframes riseUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    font-family: 'Sora', sans-serif;
    font-size: 0.92rem; font-weight: 600;
    padding: 13px 32px; border-radius: 100px;
    text-decoration: none; cursor: pointer;
    letter-spacing: 0.015em;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s;
    position: relative; overflow: hidden;
  }
  .btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.13) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.42s ease;
    border-radius: inherit;
  }
  .btn:hover::after { transform: translateX(100%); }

  .btn-primary {
    background: #1a6dff; color: #fff;
    border: 1px solid rgba(26,109,255,0.6);
    box-shadow: 0 0 22px rgba(26,109,255,0.40), 0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18);
  }
  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 40px rgba(26,109,255,0.60), 0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18);
  }

  .btn-ghost {
    background: rgba(255,255,255,0.04); color: #fff;
    border: 1px solid rgba(255,255,255,0.18);
  }
  .btn-ghost:hover {
    background: rgba(26,109,255,0.10);
    border-color: rgba(26,109,255,0.5);
    color: #fff; transform: translateY(-3px);
    box-shadow: 0 0 18px rgba(26,109,255,0.22);
  }

  /* ── WORD-CLOUD CHIPS ── */
  .word-cloud {
    display: flex; flex-wrap: wrap; gap: 8px;
    justify-content: center; max-width: 580px;
    animation: riseUp 0.85s cubic-bezier(0.22,1,0.36,1) 0.68s both;
  }

  .chip {
    background: var(--chip-bg);
    border: 1px solid var(--chip-border);
    color: var(--chip-text);
    font-family: 'Inter', sans-serif;
    font-size: 0.74rem; font-weight: 500;
    padding: 5px 14px; border-radius: 100px;
    letter-spacing: 0.025em; cursor: default;
    transition: background 0.22s, color 0.22s, border-color 0.22s, box-shadow 0.22s;
  }
  .chip:hover {
    background: var(--accent-dim);
    color: #fff;
    border-color: rgba(26,109,255,0.4);
    box-shadow: 0 0 12px rgba(26,109,255,0.18);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1100px) {
    .ft-frontend, .ft-boston { display: none; }
  }
  @media (max-width: 860px) {
    .ft-ecomm, .ft-hardware, .ft-blockchain,
    .ft-sf, .ft-saas, .ft-ios, .ft-vuejs,
    .ft-la, .ft-austin, .ft-seattle { display: none; }
  }
  @media (max-width: 600px) {
    .float-tag { display: none; }
    .hero-content h1 {
    white-space: normal !important;
    flex-wrap: wrap !important;
    justify-content: center;
    text-align: center;
  }
  }

  @media (max-width: 480px) {
  .hero-content h1 {
    white-space: normal;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .hero-divider {
    margin-top: 60px;
    margin-bottom: 60px;
  }
}

@media (max-width: 480px) {
  .btn {
    padding: 12px 22px;
    font-size: 0.85rem;
  }

  .hero-cta {
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding-top: 90px;
  }
}

@media (max-width: 600px) {

  .hero-content h1 {
    font-size: 2.8rem !important;
    line-height: 1.05;
    flex-direction: column;
    gap: 8px;
  }

  .hero-content h1 .h-boxed {
    flex-direction: column;
    align-items: center;
    padding: 0.2em 0.4em;
  }

  .hero-content h1 .mobile-break {
    display: block;
  }

}


<h1>
  <span className="h-prefix">H:</span>
  <span className="h-boxed">
    Find what's <span className="mobile-break">next</span>
  </span>
</h1>

@media (max-width: 767px) {
  .hero-title {
    font-size: 48px;
    line-height: 1.1;
  }
}

.mobile-break {
  margin-left: 10px;
}

`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Hero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="hero-section">
        <div className="hero-grid" aria-hidden="true" />

        {/* Floating tags */}
        <div className="float-tags" aria-hidden="true">
          {floatTags.map(({ label, cls, delay, dur }) => (
            <span
              key={label}
              className={`float-tag ${cls}`}
              style={{
                ['--d'   as string]: delay,
                ['--dur' as string]: dur,
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="hero-content">

          <div className="hero-headline-wrap">
            <h1>
              <span className="h-prefix">H:</span>
              <span className="h-boxed">
                Find what's{" "}
              <span className="mobile-break">next</span>
            </span>
          </h1>      
          </div>

          <div className="hero-bottom">
            <div className="hero-divider" aria-hidden="true" />
            <p className="hero-subtitle">Where startups and job seekers connect</p>

            <div className="hero-cta">
              <a className="btn btn-primary" href="#">Post a job</a>
              <a className="btn btn-ghost"   href="#">Find your next job</a>
            </div>

            
          </div>

        </div>
      </section>
    </>
  );
}