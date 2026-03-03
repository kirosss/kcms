'use client';

import { useState, useEffect } from 'react';
import { SiteConfig, defaultSiteConfig } from './site-data';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch('/api/site-config', {
          cache: 'no-store',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        }
      } catch (error) {
        console.error('Failed to fetch site config:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  const updateConfig = async (newConfig: SiteConfig) => {
    try {
      const response = await fetch('/api/site-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfig),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.isReadOnly) {
          alert('⚠️ PERSISTENCE ERROR: Vercel is a read-only environment.\n\nChanges cannot be saved to a file on Vercel. To enable saving in production, you must connect a database (e.g., Supabase or Vercel KV).\n\nYour changes have been applied locally for this session only.');
          setConfig(newConfig);
          return true;
        }
        throw new Error(errorData.error || 'Failed to update config');
      }

      setConfig(newConfig);
      return true;
    } catch (error) {
      console.error('Failed to update site config:', error);
      alert('Failed to save changes. Please check your connection or database settings.');
    }
    return false;
  };

  return { config, loading, updateConfig };
}
