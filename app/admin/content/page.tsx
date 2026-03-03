'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Save, 
  Image as ImageIcon, 
  Layout, 
  Type, 
  Phone, 
  Mail, 
  Plus, 
  Trash2,
  Globe,
  Monitor,
  Smartphone,
  Check,
  Activity
} from 'lucide-react';
import { useSiteConfig } from '@/lib/use-site-config';

export default function AdminContent() {
  const { config, loading, updateConfig } = useSiteConfig();
  const [localConfig, setLocalConfig] = useState(config);
  const [activeTab, setActiveTab] = useState('header');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync localConfig with config when it finishes loading
  useEffect(() => {
    if (!loading && config) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalConfig(config);
    }
  }, [loading, config]);

  const handleSave = async () => {
    if (!localConfig) return;
    setIsSaving(true);
    
    // Only send the sections we are managing on this page to be safe
    // The server will merge these with the existing config (preserving services/testimonials)
    const payload = {
      header: localConfig.header,
      hero: localConfig.hero,
      expertise: localConfig.expertise,
      about: localConfig.about,
      booking: localConfig.booking,
      footer: localConfig.footer,
    };

    const success = await updateConfig(payload as any);
    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  if (loading || !localConfig) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'header', name: 'Header & Navigation', icon: Layout },
    { id: 'hero', name: 'Hero Section', icon: Monitor },
    { id: 'expertise', name: 'Expertise Section', icon: Activity },
    { id: 'about', name: 'About Section', icon: Type },
    { id: 'booking', name: 'Booking Section', icon: Mail },
    { id: 'footer', name: 'Footer Section', icon: Layout },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Content Management</h2>
          <p className="text-slate-500 font-medium">Edit your website content in real-time.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${
            saveSuccess ? 'bg-emerald-500 text-white' : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          {isSaving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : saveSuccess ? (
            <Check size={20} />
          ) : (
            <Save size={20} />
          )}
          {saveSuccess ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }`}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            {activeTab === 'header' && (
              <div className="space-y-8">
                <h3 className="text-xl font-serif font-bold text-slate-900">Header Elements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Logo Text</label>
                    <input 
                      type="text" 
                      value={localConfig.header.logo}
                      onChange={(e) => setLocalConfig({...localConfig, header: {...localConfig.header, logo: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="text" 
                      value={localConfig.header.phone}
                      onChange={(e) => setLocalConfig({...localConfig, header: {...localConfig.header, phone: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">CTA Button Text</label>
                    <input 
                      type="text" 
                      value={localConfig.header.bookNowText}
                      onChange={(e) => setLocalConfig({...localConfig, header: {...localConfig.header, bookNowText: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Menu Items</h4>
                    <button 
                      onClick={() => {
                        const newMenuItems = [...localConfig.header.menuItems, { name: 'New Link', href: '#' }];
                        setLocalConfig({...localConfig, header: {...localConfig.header, menuItems: newMenuItems}});
                      }}
                      className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                      <Plus size={14} /> Add Item
                    </button>
                  </div>
                  <div className="space-y-3">
                    {localConfig.header.menuItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input 
                          type="text" 
                          value={item.name}
                          onChange={(e) => {
                            const newItems = [...localConfig.header.menuItems];
                            newItems[index].name = e.target.value;
                            setLocalConfig({...localConfig, header: {...localConfig.header, menuItems: newItems}});
                          }}
                          placeholder="Name"
                          className="flex-1 px-4 py-2 rounded-lg bg-slate-50 border-none text-sm font-medium"
                        />
                        <input 
                          type="text" 
                          value={item.href}
                          onChange={(e) => {
                            const newItems = [...localConfig.header.menuItems];
                            newItems[index].href = e.target.value;
                            setLocalConfig({...localConfig, header: {...localConfig.header, menuItems: newItems}});
                          }}
                          placeholder="Href"
                          className="flex-1 px-4 py-2 rounded-lg bg-slate-50 border-none text-sm font-medium"
                        />
                        <button 
                          onClick={() => {
                            const newItems = localConfig.header.menuItems.filter((_, i) => i !== index);
                            setLocalConfig({...localConfig, header: {...localConfig.header, menuItems: newItems}});
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-8">
                <h3 className="text-xl font-serif font-bold text-slate-900">Hero Section Content</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Main Title</label>
                    <textarea 
                      rows={2}
                      value={localConfig.hero.title}
                      onChange={(e) => setLocalConfig({...localConfig, hero: {...localConfig.hero, title: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subtitle</label>
                    <textarea 
                      rows={3}
                      value={localConfig.hero.subtitle}
                      onChange={(e) => setLocalConfig({...localConfig, hero: {...localConfig.hero, subtitle: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 resize-none"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">CTA Text</label>
                      <input 
                        type="text" 
                        value={localConfig.hero.ctaText}
                        onChange={(e) => setLocalConfig({...localConfig, hero: {...localConfig.hero, ctaText: e.target.value}})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hero Image URL</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={localConfig.hero.image}
                          onChange={(e) => setLocalConfig({...localConfig, hero: {...localConfig.hero, image: e.target.value}})}
                          className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                        />
                        <button className="p-3 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-all">
                          <ImageIcon size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'expertise' && (
              <div className="space-y-8">
                <h3 className="text-xl font-serif font-bold text-slate-900">Expertise Section Content</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Badge Text</label>
                    <input 
                      type="text" 
                      value={localConfig.expertise.badge}
                      onChange={(e) => setLocalConfig({...localConfig, expertise: {...localConfig.expertise, badge: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Section Title</label>
                    <input 
                      type="text" 
                      value={localConfig.expertise.title}
                      onChange={(e) => setLocalConfig({...localConfig, expertise: {...localConfig.expertise, title: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subtitle</label>
                    <textarea 
                      rows={3}
                      value={localConfig.expertise.subtitle}
                      onChange={(e) => setLocalConfig({...localConfig, expertise: {...localConfig.expertise, subtitle: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 resize-none"
                    />
                  </div>

                  <hr className="border-slate-100" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Expertise Items</h4>
                      <button 
                        onClick={() => {
                          const newItems = [...localConfig.expertise.items, { title: 'New Expertise', description: 'Description here', icon: 'Activity' }];
                          setLocalConfig({...localConfig, expertise: {...localConfig.expertise, items: newItems}});
                        }}
                        className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                      >
                        <Plus size={14} /> Add Item
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {localConfig.expertise.items.map((item, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-2xl space-y-3 relative group">
                          <button 
                            onClick={() => {
                              const newItems = localConfig.expertise.items.filter((_, i) => i !== index);
                              setLocalConfig({...localConfig, expertise: {...localConfig.expertise, items: newItems}});
                            }}
                            className="absolute top-2 right-2 p-1 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title</label>
                            <input 
                              type="text" 
                              value={item.title}
                              onChange={(e) => {
                                const newItems = [...localConfig.expertise.items];
                                newItems[index].title = e.target.value;
                                setLocalConfig({...localConfig, expertise: {...localConfig.expertise, items: newItems}});
                              }}
                              className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-700 outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Description</label>
                            <textarea 
                              rows={2}
                              value={item.description}
                              onChange={(e) => {
                                const newItems = [...localConfig.expertise.items];
                                newItems[index].description = e.target.value;
                                setLocalConfig({...localConfig, expertise: {...localConfig.expertise, items: newItems}});
                              }}
                              className="w-full bg-transparent border-none p-0 text-xs text-slate-500 outline-none resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-8">
                <h3 className="text-xl font-serif font-bold text-slate-900">About Section Content</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Badge Text (Small text above title)</label>
                    <input 
                      type="text" 
                      value={localConfig.about.badge}
                      onChange={(e) => setLocalConfig({...localConfig, about: {...localConfig.about, badge: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Section Title</label>
                    <input 
                      type="text" 
                      value={localConfig.about.title}
                      onChange={(e) => setLocalConfig({...localConfig, about: {...localConfig.about, title: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Main Content</label>
                    <textarea 
                      rows={6}
                      value={localConfig.about.content}
                      onChange={(e) => setLocalConfig({...localConfig, about: {...localConfig.about, content: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 resize-none"
                    />
                  </div>
                  
                  <hr className="border-slate-100" />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Clinic Stats</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {localConfig.about.stats.map((stat, index) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-2xl space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Label</label>
                            <input 
                              type="text" 
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...localConfig.about.stats];
                                newStats[index].label = e.target.value;
                                setLocalConfig({...localConfig, about: {...localConfig.about, stats: newStats}});
                              }}
                              className="w-full bg-transparent border-none p-0 text-xs font-bold text-slate-600 outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value</label>
                            <input 
                              type="text" 
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...localConfig.about.stats];
                                newStats[index].value = e.target.value;
                                setLocalConfig({...localConfig, about: {...localConfig.about, stats: newStats}});
                              }}
                              className="w-full bg-transparent border-none p-0 text-xl font-serif font-bold text-primary outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'booking' && (
              <div className="space-y-8">
                <h3 className="text-xl font-serif font-bold text-slate-900">Booking Section & Form</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Section Title</label>
                    <input 
                      type="text" 
                      value={localConfig.booking.title}
                      onChange={(e) => setLocalConfig({...localConfig, booking: {...localConfig.booking, title: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                    <textarea 
                      rows={3}
                      value={localConfig.booking.description}
                      onChange={(e) => setLocalConfig({...localConfig, booking: {...localConfig.booking, description: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Notification Email (Get Mails Here)</label>
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          value={localConfig.booking.notificationEmail}
                          onChange={(e) => setLocalConfig({...localConfig, booking: {...localConfig.booking, notificationEmail: e.target.value}})}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">All booking requests will be sent to this email address.</p>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Form Fields</h4>
                    </div>
                    <div className="space-y-3">
                      {localConfig.booking.fields.map((field, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Label</label>
                              <input 
                                type="text" 
                                value={field.label}
                                onChange={(e) => {
                                  const newFields = [...localConfig.booking.fields];
                                  newFields[index].label = e.target.value;
                                  setLocalConfig({...localConfig, booking: {...localConfig.booking, fields: newFields}});
                                }}
                                className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-700 outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</label>
                              <select 
                                value={field.type}
                                onChange={(e) => {
                                  const newFields = [...localConfig.booking.fields];
                                  newFields[index].type = e.target.value;
                                  setLocalConfig({...localConfig, booking: {...localConfig.booking, fields: newFields}});
                                }}
                                className="w-full bg-transparent border-none p-0 text-xs font-medium text-slate-500 outline-none cursor-pointer"
                              >
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="tel">Phone</option>
                                <option value="date">Date</option>
                                <option value="select">Select (Services)</option>
                                <option value="textarea">Textarea</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={field.required}
                                onChange={(e) => {
                                  const newFields = [...localConfig.booking.fields];
                                  newFields[index].required = e.target.checked;
                                  setLocalConfig({...localConfig, booking: {...localConfig.booking, fields: newFields}});
                                }}
                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                              />
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Required</span>
                            </div>
                            <button 
                              onClick={() => {
                                const newFields = localConfig.booking.fields.filter((_, i) => i !== index);
                                setLocalConfig({...localConfig, booking: {...localConfig.booking, fields: newFields}});
                              }}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button 
                        onClick={() => {
                          const newFields = [...localConfig.booking.fields, { name: 'new_field', label: 'New Field', type: 'text', required: false }];
                          setLocalConfig({...localConfig, booking: {...localConfig.booking, fields: newFields}});
                        }}
                        className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={18} /> Add Form Field
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-8">
                <h3 className="text-xl font-serif font-bold text-slate-900">Footer Management</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Footer Description</label>
                    <textarea 
                      rows={3}
                      value={localConfig.footer.description}
                      onChange={(e) => setLocalConfig({...localConfig, footer: {...localConfig.footer, description: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Copyright Text</label>
                    <input 
                      type="text" 
                      value={localConfig.footer.copyright}
                      onChange={(e) => setLocalConfig({...localConfig, footer: {...localConfig.footer, copyright: e.target.value}})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                    />
                  </div>

                  <hr className="border-slate-100" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Social Links</h4>
                      <button 
                        onClick={() => {
                          const newLinks = [...localConfig.footer.socialLinks, { platform: 'New', url: '#' }];
                          setLocalConfig({...localConfig, footer: {...localConfig.footer, socialLinks: newLinks}});
                        }}
                        className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                      >
                        <Plus size={14} /> Add Link
                      </button>
                    </div>
                    <div className="space-y-3">
                      {localConfig.footer.socialLinks.map((link, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <input 
                            type="text" 
                            value={link.platform}
                            onChange={(e) => {
                              const newLinks = [...localConfig.footer.socialLinks];
                              newLinks[index].platform = e.target.value;
                              setLocalConfig({...localConfig, footer: {...localConfig.footer, socialLinks: newLinks}});
                            }}
                            placeholder="Platform"
                            className="flex-1 px-4 py-2 rounded-lg bg-slate-50 border-none text-sm font-medium"
                          />
                          <input 
                            type="text" 
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...localConfig.footer.socialLinks];
                              newLinks[index].url = e.target.value;
                              setLocalConfig({...localConfig, footer: {...localConfig.footer, socialLinks: newLinks}});
                            }}
                            placeholder="URL"
                            className="flex-1 px-4 py-2 rounded-lg bg-slate-50 border-none text-sm font-medium"
                          />
                          <button 
                            onClick={() => {
                              const newLinks = localConfig.footer.socialLinks.filter((_, i) => i !== index);
                              setLocalConfig({...localConfig, footer: {...localConfig.footer, socialLinks: newLinks}});
                            }}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Quick Links</h4>
                        <button 
                          onClick={() => {
                            const newLinks = [...localConfig.footer.quickLinks, { name: 'New Link', href: '#' }];
                            setLocalConfig({...localConfig, footer: {...localConfig.footer, quickLinks: newLinks}});
                          }}
                          className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                        >
                          <Plus size={14} /> Add
                        </button>
                      </div>
                      <div className="space-y-3">
                        {localConfig.footer.quickLinks.map((link, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <input 
                              type="text" 
                              value={link.name}
                              onChange={(e) => {
                                const newLinks = [...localConfig.footer.quickLinks];
                                newLinks[index].name = e.target.value;
                                setLocalConfig({...localConfig, footer: {...localConfig.footer, quickLinks: newLinks}});
                              }}
                              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border-none text-xs font-medium"
                            />
                            <button 
                              onClick={() => {
                                const newLinks = localConfig.footer.quickLinks.filter((_, i) => i !== index);
                                setLocalConfig({...localConfig, footer: {...localConfig.footer, quickLinks: newLinks}});
                              }}
                              className="text-rose-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Services Links</h4>
                        <button 
                          onClick={() => {
                            const newLinks = [...localConfig.footer.servicesLinks, { name: 'New Service', href: '#' }];
                            setLocalConfig({...localConfig, footer: {...localConfig.footer, servicesLinks: newLinks}});
                          }}
                          className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                        >
                          <Plus size={14} /> Add
                        </button>
                      </div>
                      <div className="space-y-3">
                        {localConfig.footer.servicesLinks.map((link, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <input 
                              type="text" 
                              value={link.name}
                              onChange={(e) => {
                                const newLinks = [...localConfig.footer.servicesLinks];
                                newLinks[index].name = e.target.value;
                                setLocalConfig({...localConfig, footer: {...localConfig.footer, servicesLinks: newLinks}});
                              }}
                              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border-none text-xs font-medium"
                            />
                            <button 
                              onClick={() => {
                                const newLinks = localConfig.footer.servicesLinks.filter((_, i) => i !== index);
                                setLocalConfig({...localConfig, footer: {...localConfig.footer, servicesLinks: newLinks}});
                              }}
                              className="text-rose-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
