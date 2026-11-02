import { createClient } from '@supabase/supabase-js';

// Public (anon) client. Returns null when Supabase is not configured, so
// public pages can fall back to an honest empty state instead of crashing.
export function getPublicSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('your-project') || key.includes('your-anon-key')) return null;
  return createClient(url, key);
}
export function isSupabaseConfigured() {
  return getPublicSupabase() !== null;
}
export async function getServices() {
  const sb = getPublicSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from('services').select('*').order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}
export async function getService(id) {
  const sb = getPublicSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from('services').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}
export async function getProducts() {
  const sb = getPublicSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from('products').select('*').order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}
export async function getProduct(id) {
  const sb = getPublicSupabase();
  if (!sb) return null;
  const { data, error } = await sb.from('products').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}
