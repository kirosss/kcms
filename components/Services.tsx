'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Activity, Heart, Zap, UserCheck, ShieldCheck, Clock } from 'lucide-react';
import { useSiteConfig } from '@/lib/use-site-config';

const iconMap: Record<string, any> = {
  Activity,
  Heart,
  Zap,
  UserCheck,
  ShieldCheck,
  Clock,
};

const colorMap: Record<string, string> = {
  Activity: 'bg-blue-50 text-blue-600',
  Heart: 'bg-rose-50 text-rose-600',
  Zap: 'bg-amber-50 text-amber-600',
  UserCheck: 'bg-emerald-50 text-emerald-600',
  ShieldCheck: 'bg-indigo-50 text-indigo-600',
  Clock: 'bg-violet-50 text-violet-600',
};

export default function Services() {
  const { config } = useSiteConfig();
  const services = config.services.filter(s => s.status === 'Active');

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
          >
            {config.expertise.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6"
          >
            {config.expertise.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            {config.expertise.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Activity;
            const colorClass = colorMap[service.icon] || 'bg-slate-50 text-slate-600';
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-secondary border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link 
                  href={`/services/${service.id}`}
                  className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Learn More
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
