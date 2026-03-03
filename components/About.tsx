'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Award, Users, ThumbsUp, Sparkles } from 'lucide-react';
import { useSiteConfig } from '@/lib/use-site-config';

const iconMap: Record<string, any> = {
  Award,
  Users,
  ThumbsUp,
  Sparkles,
};

export default function About() {
  const { config } = useSiteConfig();

  return (
    <section id="about" className="section-padding bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
              <Image 
                src={config.about.image} 
                alt="Our Clinic" 
                width={800} 
                height={900}
                className="object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -top-10 -right-10 bg-primary text-white p-8 rounded-full shadow-2xl flex flex-col items-center justify-center w-40 h-40 border-4 border-white">
              <span className="text-4xl font-serif font-bold">12</span>
              <span className="text-xs font-bold uppercase tracking-widest text-center">Years of Excellence</span>
            </div>
          </motion.div>
          
          {/* Decorative Background */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
              {config.about.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
              {config.about.title}
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {config.about.content}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            {config.about.stats.map((stat, index) => {
              const Icon = index === 0 ? Award : index === 1 ? Users : index === 2 ? ThumbsUp : Sparkles;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-serif font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
          >
            Meet Our Team
          </motion.button>
        </div>
      </div>
    </section>
  );
}
