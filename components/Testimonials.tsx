'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useSiteConfig } from '@/lib/use-site-config';

export default function Testimonials() {
  const { config } = useSiteConfig();
  const approvedTestimonials = config.testimonials.filter(t => t.status === 'Approved');

  return (
    <section id="testimonials" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
          >
            Patient Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6"
          >
            What Our <span className="text-primary italic">Patients Say</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {approvedTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary p-10 rounded-[40px] border border-slate-100 flex flex-col items-center text-center relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white p-4 rounded-full shadow-xl">
                <Quote size={24} />
              </div>
              
              <div className="flex gap-1 mb-6 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-700 text-lg italic mb-8 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="mt-auto">
                <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-4 bg-slate-200 flex items-center justify-center text-slate-400 font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <h4 className="text-xl font-serif font-bold text-slate-900">{testimonial.name}</h4>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
