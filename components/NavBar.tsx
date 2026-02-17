'use client'
import { useState, useEffect } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500;600&display=swap');

/* ───────────────── NAV ───────────────── */

.nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 36px;
  height: 66px;
  background: rgba(4,9,26,0.88);
  border-bottom: 1px solid rgba(26,109,255,0.12);
  backdrop-filter: blur(18px);
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: 'Inter', sans-serif;
}

/* BRAND */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.nav-logo {
  width: 36px;
  height: 36px;
}

.nav-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.nav-brand-name {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
}

/* LINKS */
.nav-links {
  display: flex;
  gap: 6px;
  list-style: none;
}

.nav-link {
  font-size: 0.88rem;
  color: #5a7a9a;
  padding: 6px 14px;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.2s;
}
.nav-link:hover {
  color: #fff;
  background: rgba(26,109,255,0.10);
}

/* ACTIONS */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-login {
  font-size: 0.88rem;
  color: #5a7a9a;
  text-decoration: none;
  padding: 6px 12px;
}
.nav-login:hover {
  color: #fff;
}

.nav-cta {
  font-family: 'Sora', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: #1a6dff;
  padding: 9px 20px;
  border-radius: 100px;
  text-decoration: none;
}

/* HAMBURGER */
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.nav-hamburger span {
  width: 22px;
  height: 2px;
  background: #5a7a9a;
  border-radius: 2px;
}

/* ───────────── DRAWER ───────────── */

.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(3px);
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
  z-index: 98;
}
.nav-overlay.active {
  opacity: 1;
  pointer-events: all;
}

.nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 66%;
  max-width: 380px;
  background: #080f22;
  border-left: 1px solid rgba(26,109,255,0.2);
  padding: 80px 26px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
  z-index: 99;
}
.nav-drawer.active {
  transform: translateX(0);
}

.nav-drawer a {
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.drawer-close {
  position: absolute;
  top: 18px;
  right: 20px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
}

/* ───────────── RESPONSIVE ───────────── */

@media (max-width: 900px) {
  .nav {
    grid-template-columns: 1fr auto;
    padding: 0 20px;
  }
  .nav-links,
  .nav-login {
    display: none;
  }
  .nav-hamburger {
    display: flex;
  }
}

@media (max-width: 480px) {
  .nav {
    height: 58px;
    padding: 0 14px;
  }
  .nav-logo {
    width: 30px;
    height: 30px;
  }
  .nav-brand-name {
    font-size: 0.95rem;
  }
  .nav-cta {
    padding: 7px 14px;
    font-size: 0.75rem;
  }
}

@media (max-width: 360px) {
  .nav-brand-name {
    display: none;
  }
}

.nav-brand {
  justify-self: start;
}

.nav-links {
  justify-self: center;
}

.nav-actions {
  justify-self: end;   
}


`;

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <nav className="nav">
        <a className="nav-brand" href="#">
          <div className="nav-logo">
            <img src="/logo/hirex-logo.png" alt="HireX logo" />
          </div>
          <span className="nav-brand-name">HireX</span>
        </a>

        <ul className="nav-links">
          <li><a className="nav-link" href="#">Discover</a></li>
          <li><a className="nav-link" href="#">For Job seekers</a></li>
          <li><a className="nav-link" href="#">For Companies</a></li>
        </ul>

        <div className="nav-actions">
          <a className="nav-login" href="#">Log in</a>
          <a className="nav-cta" href="#">Sign up</a>
          <button className="nav-hamburger" onClick={() => setOpen(true)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-overlay ${open ? 'active' : ''}`} onClick={() => setOpen(false)} />

      <div className={`nav-drawer ${open ? 'active' : ''}`}>
        <button className="drawer-close" onClick={() => setOpen(false)}>✕</button>
        <a href="#">Discover</a>
        <a href="#">For Job seekers</a>
        <a href="#">For Companies</a>
        <a href="#">Log in</a>
        <a href="#">Sign up</a>
      </div>
    </>
  );
}
