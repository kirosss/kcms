'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { useSiteConfig } from '@/lib/use-site-config';

export default function Booking() {
  const { config, updateConfig } = useSiteConfig();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const appointment = {
      id: Date.now(),
      patient: formData.get('Full Name') as string,
      email: formData.get('Email Address') as string,
      phone: (formData.get('Phone Number') as string) || '',
      service: (formData.get('Service') as string) || config.services[0]?.title,
      date: new Date().toLocaleDateString(),
      time: 'Pending',
      status: 'Pending',
      image: `https://picsum.photos/seed/${formData.get('Full Name')}/40/40`
    };

    const success = await updateConfig({
      ...config,
      appointments: [appointment, ...(config.appointments || [])]
    });

    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  return (
    <section id="booking" className="section-padding bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Get in Touch</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                {config.booking.title}
              </h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                {config.booking.description}
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { icon: Phone, label: 'Call Us', value: config.header.phone },
                { icon: Mail, label: 'Email Us', value: config.booking.notificationEmail },
                { icon: MapPin, label: 'Visit Us', value: config.settings.address },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-xl font-serif font-bold text-slate-900">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-12 rounded-[40px] shadow-2xl border border-slate-100 relative overflow-hidden"
          >
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
            
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Calendar className="text-primary" />
              Book Appointment
            </h3>

            {isSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-slate-900">Request Sent!</h4>
                <p className="text-slate-600">Thank you for reaching out. Our team will contact you shortly to confirm your appointment.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-primary font-bold hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {config.booking.fields.filter(f => f.type !== 'textarea' && f.type !== 'select').slice(0, 2).map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{field.label}</label>
                      <input 
                        name={field.label}
                        type={field.type} 
                        required={field.required}
                        placeholder={field.label}
                        className="w-full px-6 py-4 rounded-2xl bg-secondary border border-slate-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>

                {config.booking.fields.filter(f => f.type === 'select').map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{field.label}</label>
                    <select 
                      name={field.label}
                      required={field.required}
                      className="w-full px-6 py-4 rounded-2xl bg-secondary border border-slate-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                    >
                      {config.services.map(s => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                ))}

                {config.booking.fields.filter(f => f.type === 'textarea').map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">{field.label}</label>
                    <textarea 
                      name={field.label}
                      rows={4}
                      required={field.required}
                      placeholder={`Tell us about your ${field.label.toLowerCase()}...`}
                      className="w-full px-6 py-4 rounded-2xl bg-secondary border border-slate-100 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    />
                  </div>
                ))}

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                  {!isSubmitting && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
