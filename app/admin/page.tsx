'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', appointments: 12, revenue: 1200 },
  { name: 'Tue', appointments: 18, revenue: 1800 },
  { name: 'Wed', appointments: 15, revenue: 1500 },
  { name: 'Thu', appointments: 22, revenue: 2200 },
  { name: 'Fri', appointments: 30, revenue: 3000 },
  { name: 'Sat', appointments: 25, revenue: 2500 },
  { name: 'Sun', appointments: 10, revenue: 1000 },
];

const stats = [
  { label: 'Total Patients', value: '1,284', change: '+12.5%', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { label: 'Appointments', value: '156', change: '+8.2%', icon: Calendar, color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Revenue', value: '$12,450', change: '+15.3%', icon: DollarSign, color: 'bg-amber-50 text-amber-600' },
  { label: 'Growth', value: '24.8%', change: '-2.1%', icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600' },
];

const recentAppointments = [
  { id: 1, patient: 'Sarah Johnson', service: 'Physiotherapy', time: '10:30 AM', status: 'Confirmed', image: 'https://picsum.photos/seed/sarah/40/40' },
  { id: 2, patient: 'Michael Chen', service: 'Chiropractic', time: '11:45 AM', status: 'Pending', image: 'https://picsum.photos/seed/michael/40/40' },
  { id: 3, patient: 'Emily Davis', service: 'Massage Therapy', time: '02:15 PM', status: 'Confirmed', image: 'https://picsum.photos/seed/emily/40/40' },
  { id: 4, patient: 'Robert Wilson', service: 'Sports Rehab', time: '03:30 PM', status: 'Cancelled', image: 'https://picsum.photos/seed/robert/40/40' },
  { id: 5, patient: 'Jessica Lee', service: 'Physiotherapy', time: '04:45 PM', status: 'Confirmed', image: 'https://picsum.photos/seed/jessica/40/40' },
];

import { useSiteConfig } from '@/lib/use-site-config';

export default function AdminDashboard() {
  const { config, loading } = useSiteConfig();

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  const appointments = config.appointments || [];
  const services = config.services || [];
  const testimonials = config.testimonials || [];

  const stats = [
    { label: 'Total Patients', value: new Set(appointments.map(a => a.email)).size.toString(), change: '+0%', icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Appointments', value: appointments.length.toString(), change: '+0%', icon: Calendar, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Active Services', value: services.filter(s => s.status === 'Active').length.toString(), change: '+0%', icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Testimonials', value: testimonials.filter(t => t.status === 'Approved').length.toString(), change: '+0%', icon: CheckCircle2, color: 'bg-amber-50 text-amber-600' },
  ];

  const recentAppointments = appointments.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Welcome back, Admin!</h2>
          <p className="text-slate-500 font-medium">Here&apos;s what&apos;s happening with {config.settings.clinicName} today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
            + New Appointment
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-serif font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-serif font-bold text-slate-900">Revenue Overview</h3>
            <select className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-500 px-3 py-1.5 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D5A27" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2D5A27" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2D5A27" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-8">Appointments</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="appointments" 
                  fill="#2D5A27" 
                  radius={[4, 4, 0, 0]} 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-serif font-bold text-slate-900">Recent Appointments</h3>
          <button className="text-primary font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden">
                        <Image 
                          src={app.image} 
                          alt={app.patient} 
                          fill 
                          className="object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="font-bold text-slate-900">{app.patient}</div>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-slate-600 font-medium">{app.service}</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                      <Clock size={16} className="text-slate-400" />
                      {app.time}
                    </div>
                  </td>
                  <td className="px-8 py-4">
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
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
