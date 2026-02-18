'use client';

import React, { useEffect, useRef, useState } from 'react';


/* ─────────────────────────────────────────────
   REAL AVATAR DATA
───────────────────────────────────────────── */
const searchAvatars = [
  'https://i.pravatar.cc/40?img=1',
  'https://i.pravatar.cc/40?img=5',
  'https://i.pravatar.cc/40?img=9',
  'https://i.pravatar.cc/40?img=12',
  'https://i.pravatar.cc/40?img=15',
  'https://i.pravatar.cc/40?img=20',
  'https://i.pravatar.cc/40?img=25',
  'https://i.pravatar.cc/40?img=30',
  'https://i.pravatar.cc/40?img=33',
  'https://i.pravatar.cc/40?img=41',
];

const candidates = [
  { name: 'Joshua Moret', photo: 'https://i.pravatar.cc/40?img=11' },
  { name: 'Naomi Liu',    photo: 'https://i.pravatar.cc/40?img=47' },
  { name: 'Guy Leonardo', photo: 'https://i.pravatar.cc/40?img=32' },
];

const recruiterPhoto = 'https://i.pravatar.cc/44?img=23';

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');

  /* ── SECTION ── */
  .ap-section {
    width: 100%;
    background: #04091a;
    padding: 90px 40px;
    box-sizing: border-box;
    border-top: 1px solid rgba(26,109,255,0.10);
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: center;
  }

  /* ── OUTER CARD — rounded, dark, centered ── */
  .ap-card {
    width: 100%;
    max-width: 1120px;
    background: linear-gradient(145deg, #0b1228 0%, #0d1535 60%, #0e1840 100%);
    border: 1px solid rgba(26,109,255,0.16);
    border-radius: 28px;
    padding: 72px 64px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 48px 1.4fr;
    gap: 0;
    align-items: center;
    position: relative;
    overflow: hidden;
    /* Entrance */
    opacity: 0;
    transform: translateY(32px);
    animation: apCardIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
  }

  /* Dot-grid noise */
  .ap-card::before {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  /* Blue glow from top-right */
  .ap-card::after {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(26,109,255,0.12) 0%, transparent 65%);
    pointer-events: none;
  }

  @keyframes apCardIn {
    to { opacity: 1; transform: translateY(0); }
  }

  /* ─── LEFT COPY ─── */
  .ap-left {
    position: relative; z-index: 2;
    padding-right: 48px;
    opacity: 0; transform: translateX(-20px);
    animation: apSlideR 0.75s cubic-bezier(0.22,1,0.36,1) 0.35s forwards;
  }
  @keyframes apSlideR {
    to { opacity: 1; transform: translateX(0); }
  }

  .ap-heading {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 900;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin: 0 0 24px;
  }

  .ap-body {
    font-size: 0.97rem;
    color: rgba(255,255,255,0.55);
    line-height: 1.75;
    margin: 0 0 14px;
    max-width: 380px;
  }

  .ap-btn {
    display: inline-flex;
    align-items: center;
    margin-top: 28px;
    font-family: 'Sora', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #0d1535;
    background: #fff;
    border: none;
    border-radius: 100px;
    padding: 12px 28px;
    cursor: pointer;
    letter-spacing: 0.01em;
    text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
    position: relative; overflow: hidden;
  }
  .ap-btn::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.4s;
    border-radius: inherit;
  }
  .ap-btn:hover::after { transform: translateX(100%); }
  .ap-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.35);
  }

  /* ─── CENTER VERTICAL TIMELINE ─── */
  .ap-timeline {
    position: relative; z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    align-self: stretch;
    padding: 8px 0;
    gap: 0;
  }

  /* The dashed line itself */
  .ap-timeline-line {
    flex: 1;
    width: 0;
    border-left: 2px dashed rgba(255,255,255,0.18);
    position: relative;
    margin: 0;
  }

  /* Emoji nodes on the line */
  .ap-node {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    display: flex; align-items: center; justify-content: center;
    font-size: 17px;
    flex-shrink: 0;
    backdrop-filter: blur(6px);
    position: relative; z-index: 1;
    animation: nodePop 0.5s cubic-bezier(0.34,1.56,0.64,1) var(--nd) both;
  }
  @keyframes nodePop {
    from { opacity: 0; transform: scale(0.4); }
    to   { opacity: 1; transform: scale(1);   }
  }

  /* ─── RIGHT CHAT PANEL ─── */
  .ap-right {
    position: relative; z-index: 2;
    padding-left: 48px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 0; transform: translateX(20px);
    animation: apSlideL 0.75s cubic-bezier(0.22,1,0.36,1) 0.35s forwards;
  }
  @keyframes apSlideL {
    to { opacity: 1; transform: translateX(0); }
  }

  /* ── recruiter message row ── */
  .ap-msg-row {
    display: flex; align-items: flex-start; gap: 12px;
    opacity: 0; animation: apFadeUp 0.6s ease var(--mr) forwards;
  }
  @keyframes apFadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ap-avatar {
    width: 42px; height: 42px;
    border-radius: 50%; object-fit: cover;
    flex-shrink: 0;
    border: 2px solid rgba(255,100,180,0.45);
  }

  .ap-msg-meta {
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    margin-bottom: 5px;
    font-family: 'Inter', sans-serif;
  }

  .ap-bubble-white {
    background: #fff;
    color: #0d1535;
    border-radius: 5px 16px 16px 16px;
    padding: 14px 18px;
    font-size: 13.5px;
    line-height: 1.55;
    max-width: 380px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.28);
    font-family: 'Inter', sans-serif;
  }

  /* Inline tag chips inside bubble */
  .chip-fintech {
    background: #fff8e1; color: #b8860b;
    font-size: 10px; font-weight: 700;
    padding: 2px 8px; border-radius: 4px;
    letter-spacing: 0.04em;
    display: inline-block; vertical-align: middle;
  }
  .chip-python {
    background: #e3f2fd; color: #1565c0;
    font-size: 10px; font-weight: 700;
    padding: 2px 8px; border-radius: 4px;
    letter-spacing: 0.04em;
    display: inline-block; vertical-align: middle;
  }

  /* ── HireX:ai bubble ── */
  .ap-ai-row {
    display: flex; justify-content: flex-end;
    opacity: 0; animation: apFadeUp 0.6s ease 0.65s forwards;
  }

  .ap-ai-inner { text-align: right; }

  .ap-ai-label {
    font-size: 11px; margin-bottom: 5px;
    color: rgba(255,255,255,0.4);
    font-family: 'Inter', sans-serif;
  }
  .ap-ai-label strong { color: #fff; }
  .ap-ai-label em { color: #1a6dff; font-style: normal; font-weight: 700; }

  .ap-bubble-ai {
    background: linear-gradient(135deg, #1a6dff 0%, #0d4bd4 100%);
    color: #fff;
    border-radius: 16px 5px 16px 16px;
    padding: 14px 20px;
    font-size: 13.5px;
    font-style: italic;
    line-height: 1.55;
    max-width: 360px;
    box-shadow: 0 4px 24px rgba(26,109,255,0.40);
    font-family: 'Inter', sans-serif;
  }

  /* ── Searching avatars ── */
  .ap-searching {
    display: flex; align-items: center; gap: 4px;
    opacity: 0; animation: apFadeUp 0.6s ease 0.85s forwards;
  }

  .ap-search-avatar {
    width: 34px; height: 34px;
    border-radius: 50%; object-fit: cover;
    border: 2px solid rgba(13,21,53,0.8);
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  .ap-search-avatar:hover { transform: scale(1.15) translateY(-3px); z-index: 2; }

  .ap-searching-label {
    font-size: 12.5px;
    color: rgba(255,255,255,0.4);
    font-style: italic;
    margin-left: 10px;
    font-family: 'Inter', sans-serif;
    animation: pulse 1.8s ease-in-out infinite;
  }
  @keyframes pulse {
    0%,100% { opacity: 0.4; } 50% { opacity: 0.9; }
  }

  /* ── Candidate list card ── */
  .ap-candidate-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 16px;
    padding: 18px;
    backdrop-filter: blur(12px);
    opacity: 0; animation: apFadeUp 0.7s ease 1.05s forwards;
  }

  .ap-candidate-title {
    font-size: 13px; font-weight: 700;
    color: rgba(255,255,255,0.8);
    font-style: italic;
    margin-bottom: 14px;
    font-family: 'Inter', sans-serif;
  }

  /* Individual candidate row */
  .ap-cand-row {
    background: rgba(255,255,255,0.055);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 10px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 11px;
    margin-bottom: 8px;
    transition: background 0.2s, border-color 0.2s;
    opacity: 0;
    animation: apFadeUp 0.55s ease var(--cd) forwards;
  }
  .ap-cand-row:last-child { margin-bottom: 0; }
  .ap-cand-row:hover {
    background: rgba(26,109,255,0.10);
    border-color: rgba(26,109,255,0.28);
  }

  .ap-cand-photo {
    width: 34px; height: 34px;
    border-radius: 50%; object-fit: cover;
    flex-shrink: 0;
  }

  .ap-cand-info { flex: 1; min-width: 0; }

  .ap-cand-name-row {
    display: flex; align-items: center; gap: 7px; margin-bottom: 3px;
  }

  .ap-cand-name {
    font-size: 13px; font-weight: 700; color: #fff;
    font-family: 'Inter', sans-serif;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .ap-badge-interested {
    background: rgba(100,221,170,0.15);
    color: #5de8a0;
    font-size: 9px; font-weight: 700;
    padding: 2px 7px; border-radius: 4px;
    letter-spacing: 0.05em; white-space: nowrap;
    border: 1px solid rgba(93,232,160,0.25);
  }

  .ap-cand-sub {
    display: flex; align-items: center; gap: 6px;
    font-size: 11.5px; color: rgba(255,255,255,0.42);
    font-family: 'Inter', sans-serif;
  }

  .ap-badge-python {
    background: rgba(74,154,255,0.15);
    color: #74b9ff;
    font-size: 9px; font-weight: 700;
    padding: 2px 7px; border-radius: 4px;
    letter-spacing: 0.05em;
    border: 1px solid rgba(116,185,255,0.25);
  }

  .ap-cand-btns {
    display: flex; gap: 7px; flex-shrink: 0;
  }

  .ap-cand-btn {
    width: 27px; height: 27px; border-radius: 50%;
    background: transparent; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    transition: background 0.18s, transform 0.18s;
  }
  .ap-cand-btn-yes {
    border: 1.5px solid rgba(93,232,160,0.55);
    color: #5de8a0;
  }
  .ap-cand-btn-yes:hover {
    background: rgba(93,232,160,0.15);
    transform: scale(1.1);
  }
  .ap-cand-btn-no {
    border: 1.5px solid rgba(255,107,107,0.55);
    color: #ff6b6b;
  }
  .ap-cand-btn-no:hover {
    background: rgba(255,107,107,0.15);
    transform: scale(1.1);
  }

  /* ── Recruiter badge ── */
  .ap-recruiter-badge {
    display: flex; justify-content: left; margin-top: 4px;
    opacity: 0; animation: apFadeUp 0.6s ease 1.4s forwards;
  }
  .ap-recruiter-badge-inner {
    background: #fff;
    border-radius: 100px;
    padding: 8px 20px;
    font-size: 13px; font-weight: 700;
    color: #0d1535;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    display: flex; align-items: center; gap: 6px;
  }
  .ap-recruiter-badge-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #1a6dff;
    box-shadow: 0 0 8px rgba(26,109,255,0.7);
    animation: livePulse 2s ease-in-out infinite;
  }
  @keyframes livePulse {
    0%,100% { transform: scale(1); opacity:1; }
    50%      { transform: scale(1.5); opacity:0.6; }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .ap-card {
      grid-template-columns: 1fr;
      padding: 40px 28px;
    }
    .ap-timeline { display: none; }
    .ap-left  { padding-right: 0; margin-bottom: 40px; }
    .ap-right { padding-left: 0; }
    .ap-section { padding: 56px 20px; }
  }

@media (max-width: 480px) {

  /* Allow bubbles to shrink properly */
  .ap-bubble-white,
  .ap-bubble-ai {
    max-width: 100%;
    word-break: break-word;
    overflow-wrap: break-word;
  }

  /* Remove fixed width body */
  .ap-body {
    max-width: 100%;
  }

  /* Let candidate row adapt */
  .ap-cand-row {
    flex-wrap: wrap;
  }

  /* Allow name to wrap on small screens */
  .ap-cand-name {
    white-space: normal;
  }

  /* Push buttons below if needed */
  .ap-cand-btns {
    width: 100%;
    justify-content: flex-end;
    margin-top: 6px;
  }

  /* Searching avatars wrap instead of overflowing */
  .ap-searching {
    flex-wrap: wrap;
  }

  .ap-searching-label {
    width: 100%;
    margin-left: 0;
    margin-top: 6px;
  }

}

.ap-searching {
  display: flex;
  align-items: center;
  gap: 0;
  position: relative;
}

/* Base avatar */
.ap-search-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(13,21,53,0.8);
  flex-shrink: 0;
  transition: transform 0.25s ease;
  position: relative;
}

/* Zig-zag effect */
.ap-search-avatar:nth-child(odd) {
  transform: translateY(-6px);
}

.ap-search-avatar:nth-child(even) {
  transform: translateY(6px);
}

/* Keep hover effect */
.ap-search-avatar:hover {
  transform: scale(1.15) translateY(-3px) !important;
  z-index: 10;
}


`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function AutopilotSection() {
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section className="ap-section" ref={sectionRef}>
        <div className="ap-card">

          {/* ═══ LEFT ═══ */}
          <div className="ap-left">
            <h2 className="ap-heading">
              Meet Autopilot:<br />
              HireX's AI<br />
              recruiter
            </h2>
            <p className="ap-body">
              Just tell us what you need. Our expert recruiters backed by AI
              deliver qualified candidates to your calendar.
            </p>
            <p className="ap-body">All at a fraction of the cost of an agency.</p>
            <a className="ap-btn" href="#">Learn more</a>
          </div>

          {/* ═══ CENTER TIMELINE ═══ */}
          <div className="ap-timeline">
            {/* Top node — person emoji */}
            <div className="ap-node" style={{ '--nd': '0.5s' } as React.CSSProperties}>
              👤
            </div>

            {/* Top line segment */}
            <div className="ap-timeline-line" style={{ flex: '1' }} />

            {/* Middle node — thumbs up */}
            <div className="ap-node" style={{ '--nd': '0.7s' } as React.CSSProperties}>
              👍
            </div>

            {/* Bottom line segment */}
            <div className="ap-timeline-line" style={{ flex: '1' }} />
          </div>

          {/* ═══ RIGHT ═══ */}
          <div className="ap-right">

            {/* Recruiter message */}
            <div className="ap-msg-row" style={{ '--mr': '0.5s' } as React.CSSProperties}>
              <img className="ap-avatar" src={recruiterPhoto} alt="Recruiter"
                onError={e => { (e.currentTarget as HTMLImageElement).style.background = 'linear-gradient(135deg,#fd79a8,#e84393)'; }} />
              <div>
                <div className="ap-msg-meta">Recruiter</div>
                <div className="ap-bubble-white">
                  Send me candidates interested in{' '}
                  <span className="chip-fintech">FINTECH</span>
                  {' '}with experience in{' '}
                  <span className="chip-python">PYTHON</span>
                </div>
              </div>
            </div>

            {/* HireX:ai reply */}
            <div className="ap-ai-row">
              <div className="ap-ai-inner">
                <div className="ap-ai-label">
                  <strong>HireX</strong><em>:ai</em>
                </div>
                <div className="ap-bubble-ai">
                  Absolutely! Sending you a list of relevant candidates now.
                </div>
              </div>
            </div>

            {/* Searching row — real avatars, overlapping */}
            <div className="ap-searching">
              {searchAvatars.map((src, i) => (
                <img
                  key={i}
                  className="ap-search-avatar"
                  src={src}
                  alt={`candidate-${i}`}
                  style={{ marginLeft: i > 0 ? '0px' : 0, zIndex: searchAvatars.length - i}}
                  onError={e => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.background = ['#a29bfe','#74b9ff','#55efc4','#ffeaa7','#fd79a8','#fdcb6e','#e17055','#00cec9','#6c5ce7','#badc58'][i % 10];
                  }}
                />
              ))}
              <span className="ap-searching-label">searching…</span>
            </div>

            {/* Recruiter badge */}
            <div className="ap-recruiter-badge">
              <div className="ap-recruiter-badge-inner">
                <div className="ap-recruiter-badge-dot" />
                Recruiter
              </div>
            </div>

            {/* Candidate review card */}
            <div className="ap-candidate-card">
              <div className="ap-candidate-title">Your qualified candidate review list</div>

              {candidates.map(({ name, photo }, i) => (
                <div
                  key={name}
                  className="ap-cand-row"
                  style={{ '--cd': `${1.15 + i * 0.12}s` } as React.CSSProperties}
                >
                  <img className="ap-cand-photo" src={photo} alt={name}
                    onError={e => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a6dff&color=fff&size=34`;
                    }} />
                  <div className="ap-cand-info">
                    <div className="ap-cand-name-row">
                      <span className="ap-cand-name">{name}</span>
                      <span className="ap-badge-interested">INTERESTED</span>
                    </div>
                    <div className="ap-cand-sub">
                      Experience in <span className="ap-badge-python">PYTHON</span>
                    </div>
                  </div>
                  <div className="ap-cand-btns">
                    <button className="ap-cand-btn ap-cand-btn-yes" aria-label="Accept">✓</button>
                    <button className="ap-cand-btn ap-cand-btn-no"  aria-label="Reject">✕</button>
                  </div>
                </div>
              ))}
            </div>

            

          </div>{/* end ap-right */}
        </div>{/* end ap-card */}
      </section>
    </>
  );
}