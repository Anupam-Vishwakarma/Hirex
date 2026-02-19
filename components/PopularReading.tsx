'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, CheckCircle2, Loader2, Users } from 'lucide-react';

const blogItems = [
  { 
    tag: 'Blog Post', 
    title: '30 Questions to Ask Before Joining a Startup', 
    desc: "You're trying to evaluate the company while still impressing your interviewers, and that balance can be tricky..." 
  },
  { 
    tag: 'Job Collection', 
    title: '18 Innovative Space Startups Hiring Now', 
    desc: "Few tech sectors are capturing the public's collective imagination as much as space. Privatized spaceflight is attracting..." 
  },
  { 
    tag: 'Job Collection', 
    title: '19 Hot Crypto Startups Hiring Remotely in 2026', 
    desc: "Either Crypto has a great PR team, or the internet-based medium of exchange is truly taking the world by storm..." 
  },
  { 
    tag: 'Blog Post', 
    title: 'The Truth About Finding Your First Engineering Job', 
    desc: "Even for senior engineers, job searches can be confusing, frustrating affairs. When you're a junior engineer looking..." 
  },
  { 
    tag: 'Job Collection', 
    title: '20 Women-Led Startups Expanding Their Remote Teams', 
    desc: "It is no surprise by now that women make great leaders. In the US alone, women-led businesses generated billions..." 
  },
  { 
    tag: 'Blog Post', 
    title: 'Why Naval Ravikant Thinks Remote Work Is The Future', 
    desc: "It feels like the rise of remote works has been a top conversation in tech for years, but despite the enthusiasm..." 
  },
];

export default function PopularReading() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="w-full bg-[#04091a] pt-12 pb-12 px-4 md:px-6 border-t border-white/5 overflow-hidden font-inter">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white font-sora font-bold text-xl md:text-2xl tracking-tight">From the blog</h2>
          <button className="px-4 py-1.5 rounded-lg border border-white/10 text-white/60 text-[11px] font-bold hover:bg-white/5 transition-all uppercase tracking-wider">
            More posts
          </button>
        </div>

        {/* Blog List */}
        <div className="flex flex-col mb-16">
          {blogItems.map((item, i) => (
            <motion.a
              key={i}
              href="#"
              className="group relative flex flex-col md:grid md:grid-cols-[140px_1fr_320px_80px] items-start md:items-center py-5 md:py-6 border-b border-white/5 transition-all duration-300"
            >
              {/* Reading Progress Bar (Top of each card) */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
                <motion.div 
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                />
              </div>

              {/* Tag Component */}
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] mb-2 md:mb-0">
                {item.tag}
              </span>

              {/* Title */}
              <div className="md:pr-10">
                <h3 className="text-white text-[17px] md:text-[19px] font-bold font-sora leading-[1.3] group-hover:text-blue-400 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-white/40 text-[13px] leading-[1.5] pr-4 line-clamp-2 mt-2 md:mt-0">
                {item.desc}
              </p>

              {/* Action Button - Mobile: Rightmost Bottom | Desktop: Right Aligned */}
              <div className="w-full md:w-auto flex justify-end mt-4 md:mt-0">
                <div className="w-9 h-9 rounded-full bg-[#ef4444] flex items-center justify-center transition-all duration-500 group-hover:scale-[1.25] group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  <ArrowRight size={16} className="text-white transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ───────────────── NEWSLETTER SECTION ───────────────── */}
        <motion.div 
          className="relative rounded-[32px] bg-gradient-to-br from-blue-600/10 via-transparent to-transparent border border-white/10 p-6 md:p-12 overflow-hidden"
        >
          {/* Social Proof Counter */}
          <div className="absolute top-6 right-8 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Users size={12} className="text-blue-400" />
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Join 5,000+ readers</span>
          </div>

          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-sora font-extrabold text-white mb-3 tracking-tight">
              Get the best of HireX <span className="text-blue-500">delivered.</span>
            </h3>
            <p className="text-white/40 text-[14px] md:text-base font-medium mb-8">
              Weekly startup insights and salary data. No fluff.
            </p>

            {status === 'success' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-green-400 font-bold text-sm">
                <CheckCircle2 size={20} /> You're on the list!
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input 
                  required
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
                />
                <button 
                  disabled={status === 'loading'}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 uppercase tracking-widest"
                >
                  {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <>Subscribe <Send size={14} /></>}
                </button>
              </form>
            )}
            
            <div className="mt-5 md:hidden flex items-center gap-2 text-white/20 text-[10px] font-bold uppercase tracking-widest">
              <Users size={12} /> 5,000+ subscribers
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}