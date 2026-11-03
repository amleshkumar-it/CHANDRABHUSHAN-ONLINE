import { describe, it, expect, beforeEach } from 'vitest';
import { getPublicSupabase, getServices, isSupabaseConfigured } from '../lib/supabase';

describe('public Supabase client without configuration', () => {
  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });
  it('reports not configured instead of crashing', () => {
    expect(getPublicSupabase()).toBeNull();
    expect(isSupabaseConfigured()).toBe(false);
  });
  it('returns an empty service list instead of crashing', async () => {
    await expect(getServices()).resolves.toEqual([]);
  });
});
