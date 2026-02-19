'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Linkedin, Monitor, FileText, Star, 
  Users, Rocket, CheckSquare, Sparkles,
  ArrowRight
} from 'lucide-react';

const seekerFeatures = [
  { icon: Linkedin, title: 'Connect directly with founders', body: 'No third party recruiters allowed.' },
  { icon: Monitor, title: 'Everything upfront', body: 'View salary and stock options before applying.' },
  { icon: FileText, title: 'No more cover letters', body: 'Your profile is all you need. One click to apply.' },
  { icon: Star, title: 'Unique startup roles', body: "You won't find these jobs anywhere else." },
];

const recruiterFeatures = [
  { icon: Users, title: '10M+ Engaged Candidates', body: 'Tap into a massive community of startup-ready talent.' },
  { icon: Rocket, title: 'Kickstart in 10 minutes', body: 'Job posts and HR tools set up instantly, for free.' },
  { icon: CheckSquare, title: 'Free Integrated ATS', body: 'Use our tracking system or sync with your existing one.' },
  { icon: Sparkles, title: 'RecruiterCloud AI', body: 'Our AI scans 500M+ candidates and schedules interviews.' },
];

// Fixed TypeScript Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.12, 
      delayChildren: 0.4 // Wait for the card to finish its slide-in
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 }, // Elements come from bottom
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 260, damping: 25 } 
  }
};

function FeatureCard({ eyebrow, heading, features, side, isDark = false }: any) {
  return (
    <motion.div
      // Entry animation: left card from left (-100), right card from right (100)
      initial={{ opacity: 0, x: side === 'left' ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-[32px] border border-blue-500/10 p-8 md:p-12 ${
        isDark ? 'bg-gradient-to-br from-[#0a1228] to-[#0d1a35]' : 'bg-[#080f22]'
      }`}
    >
      <div className="absolute -right-16 -top-16 h-32 w-32 bg-blue-500/10 blur-[50px]" />
      
      <motion.span variants={itemVariants} className="inline-block font-sora text-xs font-bold uppercase tracking-widest text-blue-500">
        {eyebrow}
      </motion.span>
      
      <motion.h2 variants={itemVariants} className="mt-4 font-sora text-3xl font-extrabold tracking-tight text-white md:text-4xl">
        {heading}
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="my-10 space-y-8"
      >
        {features.map((item: any, i: number) => (
          <motion.div key={i} variants={itemVariants} className="group flex items-start gap-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-all group-hover:scale-110 group-hover:border-blue-500/50 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <item.icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h4 className="font-sora text-[15px] font-bold text-white transition-colors group-hover:text-blue-400">
                {item.title}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                {item.body}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
        <button className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-blue-600 px-7 py-3 font-sora text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-95">
          Sign up
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
        <button className="rounded-full border border-white/10 bg-white/5 px-7 py-3 font-sora text-sm font-bold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
          Learn more
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    // Reduced padding to py-6
    <section className="bg-[#04091a] py-6 px-4 sm:px-8 overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-2">
        <FeatureCard 
          side="left"
          eyebrow="Got talent?" 
          heading="Why job seekers love us" 
          features={seekerFeatures} 
        />
        <FeatureCard 
          side="right"
          eyebrow="Need talent?" 
          heading="Why recruiters love us" 
          features={recruiterFeatures} 
          isDark={true}
        />
      </div>
    </section>
  );
}