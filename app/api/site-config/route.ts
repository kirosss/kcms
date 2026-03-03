import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { defaultSiteConfig } from '@/lib/site-data';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const CONFIG_PATH = path.join(process.cwd(), 'site-config.json');

async function getConfig() {
  // 1. Try Supabase first (Production/Vercel)
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('data')
        .eq('id', 1)
        .single();
      
      if (data && data.data) {
        console.log('Loaded config from Supabase');
        return mergeWithDefaults(data.data);
      }
      
      if (error && error.code === 'PGRST116') {
        // Row not found, try to initialize it if we have permissions
        console.log('Config not found in Supabase, initializing...');
        await supabase.from('site_config').upsert({ id: 1, data: defaultSiteConfig });
        return defaultSiteConfig;
      }
    } catch (supabaseError) {
      console.error('Supabase fetch error:', supabaseError);
    }
  }

  // 2. Fallback to local file (Development)
  try {
    try {
      await fs.access(CONFIG_PATH);
    } catch {
      console.log('Config file not found, creating with defaults');
      await fs.writeFile(CONFIG_PATH, JSON.stringify(defaultSiteConfig, null, 2));
      return defaultSiteConfig;
    }
    
    const data = await fs.readFile(CONFIG_PATH, 'utf8');
    const savedConfig = JSON.parse(data);
    return mergeWithDefaults(savedConfig);
  } catch (error) {
    console.error('Error in getConfig (file fallback):', error);
    return defaultSiteConfig;
  }
}

function mergeWithDefaults(savedConfig: any) {
  return {
    ...defaultSiteConfig,
    ...savedConfig,
    header: { ...defaultSiteConfig.header, ...savedConfig.header },
    hero: { ...defaultSiteConfig.hero, ...savedConfig.hero },
    expertise: { ...defaultSiteConfig.expertise, ...savedConfig.expertise },
    about: { ...defaultSiteConfig.about, ...savedConfig.about },
    booking: { ...defaultSiteConfig.booking, ...savedConfig.booking },
    settings: { ...defaultSiteConfig.settings, ...savedConfig.settings },
    footer: { ...defaultSiteConfig.footer, ...savedConfig.footer },
    appointments: savedConfig.appointments || defaultSiteConfig.appointments,
    services: savedConfig.services || defaultSiteConfig.services,
    testimonials: savedConfig.testimonials || defaultSiteConfig.testimonials,
  };
}

export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('GET /api/site-config error:', error);
    return NextResponse.json({ error: 'Failed to load config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const incomingConfig = await request.json();
    console.log('Updating config...');

    // Fetch existing config to merge
    const existingConfig = await getConfig();
    
    // Deep merge incoming with existing to prevent data loss
    const newConfig = {
      ...existingConfig,
      ...incomingConfig,
      // Ensure nested objects are merged correctly if they exist in incoming
      header: incomingConfig.header ? { ...existingConfig.header, ...incomingConfig.header } : existingConfig.header,
      hero: incomingConfig.hero ? { ...existingConfig.hero, ...incomingConfig.hero } : existingConfig.hero,
      expertise: incomingConfig.expertise ? { ...existingConfig.expertise, ...incomingConfig.expertise } : existingConfig.expertise,
      about: incomingConfig.about ? { ...existingConfig.about, ...incomingConfig.about } : existingConfig.about,
      booking: incomingConfig.booking ? { ...existingConfig.booking, ...incomingConfig.booking } : existingConfig.booking,
      settings: incomingConfig.settings ? { ...existingConfig.settings, ...incomingConfig.settings } : existingConfig.settings,
      footer: incomingConfig.footer ? { ...existingConfig.footer, ...incomingConfig.footer } : existingConfig.footer,
      // Preserve arrays if not provided
      services: incomingConfig.services || existingConfig.services,
      testimonials: incomingConfig.testimonials || existingConfig.testimonials,
      appointments: incomingConfig.appointments || existingConfig.appointments,
    };

    // 1. Try Supabase first (Production/Vercel)
    if (supabase) {
      try {
        const { error } = await supabase
          .from('site_config')
          .upsert({ id: 1, data: newConfig, updated_at: new Date().toISOString() });
        
        if (!error) {
          console.log('Saved config to Supabase');
          return NextResponse.json({ success: true, config: newConfig });
        }
        console.error('Supabase save error:', error);
      } catch (supabaseError) {
        console.error('Supabase save exception:', supabaseError);
      }
    }
    
    // 2. Fallback to local file (Development)
    try {
      await fs.writeFile(CONFIG_PATH, JSON.stringify(newConfig, null, 2));
      return NextResponse.json({ success: true, config: newConfig });
    } catch (fsError: any) {
      if (fsError.code === 'EROFS') {
        return NextResponse.json({ 
          error: 'Production Persistence Error', 
          message: 'Vercel is read-only. Please connect Supabase by adding NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your environment variables.',
          isReadOnly: true
        }, { status: 500 });
      }
      throw fsError;
    }
  } catch (error) {
    console.error('POST /api/site-config error:', error);
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}
