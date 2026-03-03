'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Globe, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Save,
  Check,
  Settings
} from 'lucide-react';
import { useSiteConfig } from '@/lib/use-site-config';

export default function AdminSettings() {
  const { config, loading, updateConfig } = useSiteConfig();
  const [localSettings, setLocalSettings] = useState(config.settings);
  const [activeTab, setActiveTab] = useState('General');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!loading && config.settings) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalSettings(config.settings);
    }
  }, [loading, config.settings]);

  const handleSave = async () => {
    if (!localSettings) return;
    setIsSaving(true);
    const success = await updateConfig({ ...config, settings: localSettings });
    setIsSaving(false);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  if (loading || !localSettings) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-900">Settings</h2>
          <p className="text-slate-500 font-medium">Configure your clinic profile and application preferences.</p>
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
        {/* Settings Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { name: 'General', icon: Globe },
            { name: 'Profile', icon: User },
            { name: 'Notifications', icon: Bell },
            { name: 'Security', icon: Shield },
            { name: 'Billing', icon: CreditCard },
          ].map((item) => (
            <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === item.name ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
            {activeTab === 'General' && (
              <>
                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">Clinic Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Clinic Name</label>
                      <input 
                        type="text" 
                        value={localSettings.clinicName}
                        onChange={(e) => setLocalSettings({...localSettings, clinicName: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Clinic Email</label>
                      <input 
                        type="email" 
                        value={localSettings.clinicEmail}
                        onChange={(e) => setLocalSettings({...localSettings, clinicEmail: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="text" 
                        value={localSettings.phone}
                        onChange={(e) => setLocalSettings({...localSettings, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Website URL</label>
                      <input 
                        type="text" 
                        value={localSettings.websiteUrl}
                        onChange={(e) => setLocalSettings({...localSettings, websiteUrl: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">Location Details</h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Address</label>
                    <textarea 
                      rows={3}
                      value={localSettings.address}
                      onChange={(e) => setLocalSettings({...localSettings, address: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 outline-none font-medium text-slate-900 resize-none"
                    />
                  </div>
                </div>

                <hr className="border-slate-100" />

                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">Business Hours</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {localSettings.businessHours.map((item, index) => (
                      <div key={item.day} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{item.day}</div>
                        <input 
                          type="text"
                          value={item.hours}
                          onChange={(e) => {
                            const newHours = [...localSettings.businessHours];
                            newHours[index].hours = e.target.value;
                            newHours[index].closed = e.target.value.toLowerCase() === 'closed';
                            setLocalSettings({...localSettings, businessHours: newHours});
                          }}
                          className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-900 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {activeTab !== 'General' && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <Settings size={48} className="mb-4 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs">{activeTab} settings coming soon</p>
              </div>
            )}
          </div>

          <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 flex items-center justify-between">
            <div>
              <h4 className="text-rose-900 font-bold mb-1">Danger Zone</h4>
              <p className="text-rose-600 text-sm font-medium">Permanently delete your clinic data and all associated records.</p>
            </div>
            <button className="px-6 py-3 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
