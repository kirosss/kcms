'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  Activity, 
  Heart, 
  Zap, 
  UserCheck, 
  ShieldCheck, 
  Clock,
  MoreVertical,
  X,
  Save
} from 'lucide-react';
import { useSiteConfig } from '@/lib/use-site-config';

const iconMap: Record<string, any> = {
  Activity,
  Heart,
  Zap,
  UserCheck,
  ShieldCheck,
  Clock,
};

export default function AdminServices() {
  const { config, updateConfig, loading } = useSiteConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div>Loading...</div>;

  const services = config.services;

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const newServices = services.filter(s => s.id !== id);
      await updateConfig({ ...config, services: newServices });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const serviceData = {
      id: editingService?.id || Date.now(),
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      status: formData.get('status') as string,
      icon: formData.get('icon') as string,
      description: formData.get('description') as string,
      fullDescription: formData.get('fullDescription') as string,
      image: formData.get('image') as string,
      features: (formData.get('features') as string).split(',').map(f => f.trim()).filter(f => f),
      ctaText: formData.get('ctaText') as string,
    };

    let newServices;
    if (editingService) {
      newServices = services.map(s => s.id === editingService.id ? serviceData : s);
    } else {
      newServices = [...services, serviceData];
    }

    const success = await updateConfig({ ...config, services: newServices });
    if (success) {
      setIsModalOpen(false);
      setEditingService(null);
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Manage Services</h2>
          <p className="text-slate-500 font-medium">Add, edit, or remove services offered by your clinic.</p>
        </div>
        <button 
          onClick={() => {
            setEditingService(null);
            setIsModalOpen(true);
          }}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          Add New Service
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search services..."
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
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service Name</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.map((service) => {
                const Icon = iconMap[service.icon] || Activity;
                return (
                  <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Icon size={20} />
                        </div>
                        <div className="font-bold text-slate-900">{service.title}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-slate-900">{service.price}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        service.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${service.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {service.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setEditingService(service);
                            setIsModalOpen(true);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(service.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-600 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Title</label>
                  <input name="title" defaultValue={editingService?.title} required className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                  <input name="category" defaultValue={editingService?.category} required className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Price</label>
                  <input name="price" defaultValue={editingService?.price} required className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Icon</label>
                  <select name="icon" defaultValue={editingService?.icon || 'Activity'} className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium">
                    {Object.keys(iconMap).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                  <select name="status" defaultValue={editingService?.status || 'Active'} className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">CTA Button Text</label>
                  <input name="ctaText" defaultValue={editingService?.ctaText || 'Book Now'} className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Image URL</label>
                <input name="image" defaultValue={editingService?.image} placeholder="https://..." className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Short Description (Card)</label>
                <textarea name="description" defaultValue={editingService?.description} rows={2} className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Description (Single Page)</label>
                <textarea name="fullDescription" defaultValue={editingService?.fullDescription} rows={4} className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Features (Comma separated)</label>
                <input name="features" defaultValue={editingService?.features?.join(', ')} placeholder="Feature 1, Feature 2, Feature 3" className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-medium" />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                  <Save size={20} />
                  Save Service
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
