'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Star, 
  MoreHorizontal,
  MessageSquare,
  Clock,
  Check,
  X,
  Save,
  User
} from 'lucide-react';
import { useSiteConfig } from '@/lib/use-site-config';

export default function AdminTestimonials() {
  const { config, updateConfig, loading } = useSiteConfig();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  if (loading) return <div>Loading...</div>;

  const testimonials = config.testimonials;

  const handleStatusChange = async (id: number, newStatus: string) => {
    const newTestimonials = testimonials.map(t => t.id === id ? { ...t, status: newStatus } : t);
    await updateConfig({ ...config, testimonials: newTestimonials });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      const newTestimonials = testimonials.filter(t => t.id !== id);
      await updateConfig({ ...config, testimonials: newTestimonials });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const testimonialData = {
      id: editingTestimonial?.id || Date.now(),
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      content: formData.get('content') as string,
      rating: parseInt(formData.get('rating') as string),
      status: formData.get('status') as string,
      date: editingTestimonial?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    let newTestimonials;
    if (editingTestimonial) {
      newTestimonials = testimonials.map(t => t.id === editingTestimonial.id ? testimonialData : t);
    } else {
      newTestimonials = [...testimonials, testimonialData];
    }

    const success = await updateConfig({ ...config, testimonials: newTestimonials });
    if (success) {
      setIsModalOpen(false);
      setEditingTestimonial(null);
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Patient Testimonials</h2>
          <p className="text-slate-500 font-medium">Review and manage feedback from your patients.</p>
        </div>
        <button 
          onClick={() => {
            setEditingTestimonial(null);
            setIsModalOpen(true);
          }}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <MessageSquare size={20} />
          Add Testimonial
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search testimonials..."
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
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Feedback</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTestimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{testimonial.name}</div>
                        <div className="text-xs text-slate-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm text-slate-600 line-clamp-2 max-w-md italic">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      testimonial.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 
                      testimonial.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {testimonial.status === 'Approved' ? <CheckCircle2 size={14} /> : 
                       testimonial.status === 'Pending' ? <Clock size={14} /> : <XCircle size={14} />}
                      {testimonial.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      {testimonial.status === 'Pending' && (
                        <button 
                          onClick={() => handleStatusChange(testimonial.id, 'Approved')}
                          className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-all"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          setEditingTestimonial(testimonial);
                          setIsModalOpen(true);
                        }}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-all"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(testimonial.id)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold text-slate-900">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Name</label>
                  <input name="name" defaultValue={editingTestimonial?.name} required className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Role</label>
                  <input name="role" defaultValue={editingTestimonial?.role} required className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Rating (1-5)</label>
                  <input type="number" min="1" max="5" name="rating" defaultValue={editingTestimonial?.rating || 5} required className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                  <select name="status" defaultValue={editingTestimonial?.status || 'Pending'} className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium">
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Content</label>
                <textarea name="content" defaultValue={editingTestimonial?.content} rows={4} required className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium resize-none" />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                  <Save size={20} />
                  Save Testimonial
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
