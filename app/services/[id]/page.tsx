'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import Image from 'next/image';
import { 
  Activity, 
  Heart, 
  Zap, 
  UserCheck, 
  ShieldCheck, 
  Clock,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSiteConfig } from '@/lib/use-site-config';

const iconMap: Record<string, any> = {
  Activity,
  Heart,
  Zap,
  UserCheck,
  ShieldCheck,
  Clock,
};

export default function ServicePage() {
  const { id } = useParams();
  const { config, loading } = useSiteConfig();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const service = config.services.find(s => s.id.toString() === id);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Service Not Found</h1>
        <Link href="/" className="text-primary font-bold flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Activity;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/#services" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold mb-12 transition-colors">
            <ArrowLeft size={20} /> Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                <Icon size={20} />
                {service.title}
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                Expert {service.title} <br />
                <span className="text-primary">Tailored for You</span>
              </h1>
              <p className="text-slate-600 text-xl leading-relaxed mb-10">
                {service.fullDescription || service.description}
              </p>

              <div className="space-y-6 mb-12">
                {(service.features || [
                  'Personalized Treatment Plans',
                  'Expert Certified Specialists',
                  'State-of-the-art Equipment',
                  'Comprehensive Progress Tracking'
                ]).map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/#booking"
                className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                {service.ctaText || 'Book a Session'}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="rounded-[40px] overflow-hidden border-8 border-white shadow-2xl">
                <Image 
                  src={service.image || `https://picsum.photos/seed/${service.id}/800/1000`}
                  alt={service.title}
                  width={800}
                  height={1000}
                  className="object-cover aspect-[4/5]"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Clock size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Session Length</div>
                    <div className="text-sm text-slate-500 font-medium">45 - 60 Minutes</div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Every session includes a comprehensive assessment and personalized treatment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
