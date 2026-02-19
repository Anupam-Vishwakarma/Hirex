'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Discover', href: '/discover' },
  { name: 'For Job seekers', href: '/jobs' },
  { name: 'For Companies', href: '/companies' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const pathname = usePathname();

  // Smooth Progress Bar
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Desktop Transforms
  const navWidth = useTransform(scrollY, [0, 50], ['94%', '100%']);
  const navTop = useTransform(scrollY, [0, 50], ['16px', '0px']);
  const navRadius = useTransform(scrollY, [0, 50], ['40px', '0px']);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <>
      <motion.nav
        style={{ width: navWidth, top: navTop, borderRadius: navRadius }}
        className="fixed left-1/2 -translate-x-1/2 h-[60px] z-[100]
                   bg-[#04091a]/85 backdrop-blur-xl border-b border-white/5
                   flex items-center justify-between shadow-2xl
                   max-md:!w-full max-md:!top-0 max-md:!rounded-none max-md:px-4 max-md:pb-1"
      >
        <motion.div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500 origin-left z-[101]" style={{ scaleX }} />

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 z-10">
          <img src="/logo/hirex-logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          <span className="font-sora font-bold text-white text-base tracking-tight">HireX</span>
        </Link>

        {/* Desktop Links with Hover Glow */}
        <ul className="hidden md:flex items-center gap-1 relative px-2 py-1 bg-white/5 rounded-2xl border border-white/5">
          {NAV_LINKS.map((link, i) => (
            <li 
              key={link.name} 
              onMouseEnter={() => setHoveredIndex(i)} 
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <Link 
                href={link.href} 
                className={`relative z-10 text-[12px] font-semibold px-4 py-2 transition-colors duration-300 ${pathname === link.href ? 'text-white' : 'text-white/50 hover:text-white'}`}
              >
                {link.name}
              </Link>
              {hoveredIndex === i && (
                <motion.div
                  layoutId="hover-glow"
                  className="absolute inset-0 bg-blue-500/10 border border-blue-500/20 rounded-xl z-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden lg:block text-[12px] font-semibold text-white/50 hover:text-white mr-2">Log in</Link>
          <button className="bg-blue-600 text-white text-[11px] font-bold px-4 py-2 rounded-full shadow-lg shadow-blue-600/20 uppercase">Sign Up</button>
          <button onClick={() => setIsOpen(true)} className="md:hidden p-1.5 text-white/70 bg-white/5 rounded-lg"><Menu size={20} /></button>
        </div>
      </motion.nav>

      {/* ───────────────── MOBILE SIDEBAR ───────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101]" />
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-2 right-2 bottom-32 left-28 md:hidden bg-slate-900/95 border border-white/10 rounded-[24px] z-[102] p-6 flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" /></div>
                <button onClick={() => setIsOpen(false)} className="p-2 text-white/30 hover:text-white"><X size={18} /></button>
              </div>

              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center justify-between text-[13px] font-bold text-white/70 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-all"
                  >
                    {link.name}
                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-blue-500" />
                  </Link>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/5">
                <Link href="/login" className="text-center py-3 text-[12px] font-bold text-white/50 border border-white/10 rounded-xl">LOGIN</Link>
                <button className="py-3 text-[12px] font-bold bg-blue-600 text-white rounded-xl shadow-[0_10px_20px_rgba(59,130,246,0.3)]">SIGN UP</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}