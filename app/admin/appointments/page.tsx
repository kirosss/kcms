'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { 
  Calendar, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Mail,
  Phone,
  User,
  ArrowRight,
  X,
  Save,
  Plus
} from 'lucide-react';
import { useSiteConfig } from '@/lib/use-site-config';

export default function AdminAppointments() {
  const { config, updateConfig, loading } = useSiteConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    email: '',
    phone: '',
    service: 'Physiotherapy',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    status: 'Pending'
  });

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  const appointments = config.appointments || [];

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    const appointment = {
      ...newAppointment,
      // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      image: `https://picsum.photos/seed/${newAppointment.patient}/40/40`
    };
    
    const success = await updateConfig({
      ...config,
      appointments: [appointment, ...appointments]
    });

    if (success) {
      setIsModalOpen(false);
      setNewAppointment({
        patient: '',
        email: '',
        phone: '',
        service: 'Physiotherapy',
        date: new Date().toISOString().split('T')[0],
        time: '10:00 AM',
        status: 'Pending'
      });
      
      // Mock email notification
      console.log(`Sending notification email to ${config.booking.notificationEmail} for new appointment from ${appointment.patient}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      const newAppointments = appointments.filter(a => a.id !== id);
      await updateConfig({ ...config, appointments: newAppointments });
    }
  };

  const filteredAppointments = appointments.filter(app => 
    app.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Appointments</h2>
          <p className="text-slate-500 font-medium">Manage and monitor all patient bookings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
            className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <Calendar size={18} />
            {view === 'list' ? 'Calendar View' : 'List View'}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={20} /> Add Appointment
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by patient name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none w-full"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Details</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                          <Image 
                            src={app.image} 
                            alt={app.patient} 
                            fill 
                            className="object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{app.patient}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail size={12} /> {app.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-slate-900 font-bold">{app.service}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-slate-900 font-bold">{app.date}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Clock size={12} /> {app.time}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                        app.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {app.status === 'Confirmed' ? <CheckCircle2 size={12} /> : 
                         app.status === 'Pending' ? <Clock size={12} /> : 
                         <AlertCircle size={12} />}
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDelete(app.id)}
                          className="p-2 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif font-bold text-slate-900">October 2023</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-100 text-slate-400">&larr;</button>
              <button className="p-2 hover:bg-slate-50 rounded-lg border border-slate-100 text-slate-400">&rarr;</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-slate-50 p-4 text-center text-xs font-bold text-slate-500 uppercase tracking-widest">{day}</div>
            ))}
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const hasAppointments = appointments.some(a => a.date.includes(day.toString()));
              return (
                <div key={i} className="bg-white p-4 min-h-[120px] relative hover:bg-slate-50 transition-all group">
                  <span className="text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">{day}</span>
                  {hasAppointments && (
                    <div className="mt-2 space-y-1">
                      {appointments.filter(a => a.date.includes(day.toString())).map(a => (
                        <div key={a.id} className="text-[10px] p-1 bg-primary/10 text-primary rounded font-bold truncate">
                          {a.time} - {a.patient}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-slate-900">Add New Appointment</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddAppointment} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Patient Name</label>
                <input 
                  required 
                  value={newAppointment.patient}
                  onChange={e => setNewAppointment({...newAppointment, patient: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    required 
                    value={newAppointment.email}
                    onChange={e => setNewAppointment({...newAppointment, email: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone</label>
                  <input 
                    type="tel" 
                    required 
                    value={newAppointment.phone}
                    onChange={e => setNewAppointment({...newAppointment, phone: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date</label>
                  <input 
                    type="date" 
                    required 
                    value={newAppointment.date}
                    onChange={e => setNewAppointment({...newAppointment, date: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Time</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 10:30 AM" 
                    required 
                    value={newAppointment.time}
                    onChange={e => setNewAppointment({...newAppointment, time: e.target.value})}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Service</label>
                <select 
                  value={newAppointment.service}
                  onChange={e => setNewAppointment({...newAppointment, service: e.target.value})}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium"
                >
                  {config.services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                  <Save size={20} />
                  Save Appointment
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Trash2({ size }: { size: number }) {
  return <X size={size} />;
}
