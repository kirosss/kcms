'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useSiteConfig } from '@/lib/use-site-config';

export default function Hero() {
  const { config } = useSiteConfig();

  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-secondary">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right -z-10" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Expert Care for Your Body
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-6">
            {config.hero.title}
          </h1>
          
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            {config.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group">
              {config.hero.ctaText}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-3 text-slate-800 font-bold text-lg hover:text-primary transition-colors group">
              <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover:bg-primary/5 transition-all">
                <Play size={20} className="fill-primary text-primary ml-1" />
              </div>
              Watch Video
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['Certified Specialists', 'Modern Equipment', 'Personalized Plans', 'Insurance Accepted'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 size={18} className="text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <Image 
              src={config.hero.image} 
              alt="Physiotherapy session" 
              width={800} 
              height={1000}
              className="object-cover aspect-[4/5]"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Floating Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-[200px]"
          >
            <div className="text-3xl font-serif font-bold text-primary mb-1">15k+</div>
            <div className="text-sm text-slate-500 font-medium leading-tight">Happy patients recovered with our expert care</div>
          </motion.div>

          {/* Decorative Circle */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/20 rounded-full blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
