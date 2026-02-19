'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Briefcase, UserCircle, Headphones } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Jobs', href: '/jobs', icon: Briefcase },
  { label: 'Intern', href: '/internship', icon: UserCircle },
  { label: 'Support', href: '/support', icon: Headphones },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 
                    w-[92%] max-w-[440px] h-[68px] 
                    bg-slate-950/85 backdrop-blur-2xl 
                    border border-white/10 rounded-[32px] 
                    flex justify-between items-center z-[9999] 
                    shadow-[0_20px_50px_rgba(0,0,0,0.6)] 
                    md:hidden px-2">
      
      {NAV_ITEMS.map((item, index) => {
        const isActive = pathname === item.href;
        
        return (
          <React.Fragment key={item.label}>
            {/* WhatsApp placed exactly in the center slot */}
            {index === 2 && <WhatsAppButton />}
            
            <Link 
              href={item.href} 
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <motion.div 
                animate={{ scale: isActive ? 1.05 : 1 }}
                className={`transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-white/40'}`}
              >
                <item.icon size={19} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              
              <span className={`text-[9px] font-bold tracking-tight mt-1 uppercase transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-white/40'}`}>
                {item.label}
              </span>

              {isActive && (
                <motion.div 
                  layoutId="nav-dot"
                  className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.9)]"
                />
              )}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
}

function WhatsAppButton() {
  const phoneNumber = "918700236923";
  const message = encodeURIComponent(
    "Hello HireX Team! 👋\n\n" +
    "I'm interested in exploring new opportunities.\n\n" +
    "Name: \n" +
    "Current Role: \n" +
    "Portfolio/LinkedIn: "
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="relative flex flex-col items-center justify-center px-1">
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative -top-5 group flex flex-col items-center"
      >
        {/* Subtle Green Glow */}
        <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full scale-125 animate-pulse" />
        
        {/* Icon scaled down to 52px for better proportions */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-[52px] h-[52px] flex items-center justify-center"
        >
          <img 
            src="/logo/whatapp.png" 
            alt="WhatsApp" 
            className="w-full h-full object-contain drop-shadow-[0_5px_12px_rgba(37,211,102,0.4)]" 
          />
        </motion.div>
      </a>
    </div>
  );
}