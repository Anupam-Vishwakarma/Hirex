'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <>
      <style>{`
        .mb-nav {
          position: fixed;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 520px;
          height: 72px;
          background: linear-gradient(
            145deg,
            rgba(8,15,34,0.95),
            rgba(13,21,53,0.95)
          );
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(26,109,255,0.18);
          border-radius: 36px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          z-index: 9999;
          box-shadow:
            0 10px 40px rgba(0,0,0,0.45),
            0 0 40px rgba(26,109,255,0.08);
        }

        .mb-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          gap: 4px;
          transition: color 0.2s, transform 0.2s;
        }

        .mb-item.active {
          color: #1a6dff;
        }

        .mb-item:hover {
          transform: translateY(-2px);
        }

        .mb-icon {
          width: 22px;
          height: 22px;
        }

        /* CENTER WHATSAPP */
        .mb-center-wrap {
          position: relative;
          width: 56px;
          height: 72px;
          display: flex;
          justify-content: center;
        }

        .mb-center-btn {
          position: absolute;
          top: -18px;
          width: 66px;
          height: 66px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow:
            0 12px 28px rgba(0,0,0,0.45),
            0 0 25px rgba(37,211,102,0.5);
          transition: transform 0.2s;
        }

        .mb-center-btn:hover {
          transform: scale(1.08);
        }

        .mb-center-btn svg {
          width: 26px;
          height: 26px;
          color: white;
        }

        .mb-label-center {
          margin-top: 26px;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
        }

        /* Hide on desktop */
        @media (min-width: 768px) {
          .mb-nav {
            display: none;
          }
        }
      `}</style>

      <nav className="mb-nav">

        {/* HOME */}
        <Link href="/" className={`mb-item ${pathname === '/' ? 'active' : ''}`}>
          <svg className="mb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9L12 2L21 9V20H3V9Z" />
          </svg>
          Home
        </Link>

        {/* JOBS */}
        <Link href="/jobs" className={`mb-item ${pathname === '/jobs' ? 'active' : ''}`}>
          <svg className="mb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 3H8V7H16V3Z" />
          </svg>
          Jobs
        </Link>

        
        {/* CENTER WHATSAPP */}
            <div className="mb-center-wrap">
            <a href="https://wa.me/919999999999" target="_blank" className="mb-center-btn">
                <img src="/logo/whatapp.png" alt="WhatsApp" width={66} height={66} />
            </a>
            <div className="mb-label-center"></div>
            </div>

        {/* INTERNSHIP */}
        <Link href="/internship" className={`mb-item ${pathname === '/internship' ? 'active' : ''}`}>
          <svg className="mb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="7" r="4"/>
            <path d="M5.5 21C6.5 17 9 15 12 15C15 15 17.5 17 18.5 21"/>
          </svg>
          Internship
        </Link>

        {/* SUPPORT */}
        <Link href="/support" className={`mb-item ${pathname === '/support' ? 'active' : ''}`}>
          <svg className="mb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8V15H4V8A8 8 0 0 1 20 8V15H18V8Z"/>
          </svg>
          Support
        </Link>

      </nav>
    </>
  );
}
