'use client';

import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';
import Link from 'next/link';
import { useSiteConfig } from '@/lib/use-site-config';

const socialIconMap: Record<string, any> = {
  Facebook,
  Instagram,
  Twitter,
  LinkedIn: Linkedin,
};

export default function Footer() {
  const { config, loading } = useSiteConfig();
  const currentYear = new Date().getFullYear();

  if (loading) return null;

  const footer = config.footer;
  const settings = config.settings;

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-serif text-2xl font-bold">
                {config.header.logo[0]}
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight">{config.header.logo}</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-lg">
              {footer.description}
            </p>
            <div className="flex gap-4">
              {footer.socialLinks.map((link, i) => {
                const Icon = socialIconMap[link.platform] || Facebook;
                return (
                  <Link 
                    key={i} 
                    href={link.url} 
                    target="_blank"
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-serif font-bold mb-8 border-b border-white/10 pb-4 inline-block">Quick Links</h4>
            <ul className="space-y-4">
              {footer.quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-serif font-bold mb-8 border-b border-white/10 pb-4 inline-block">Our Services</h4>
            <ul className="space-y-4">
              {footer.servicesLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-serif font-bold mb-8 border-b border-white/10 pb-4 inline-block">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <span className="text-slate-400 leading-relaxed">{settings.address}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <span className="text-slate-400">{settings.phone}</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <span className="text-slate-400">{settings.clinicEmail}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">
            {footer.copyright.replace('{year}', currentYear.toString())}
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            Made with <Heart size={14} className="text-rose-500 fill-rose-500" /> for your wellness.
          </div>
          <div className="flex gap-8 text-slate-500 text-sm">
            <Link href="/admin" className="hover:text-white transition-colors font-bold text-primary">Admin Dashboard</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
