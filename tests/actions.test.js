import { describe, it, expect, vi, beforeEach } from 'vitest';

// Server actions import next/cache and next/headers indirectly; stub them so
// the tests run in plain Node without a Next.js request context.
vi.mock('next/cache', () => ({ revalidatePath: () => {} }));
vi.mock('next/headers', () => ({
  cookies: () => ({ getAll: () => [], set: () => {} }),
}));

import { submitInquiry } from '../app/actions';
import { adminEmails } from '../lib/supabase-server';

function form(fields) {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

const good = {
  name: 'Test User',
  phone: '7488578184',
  email: 'test@example.com',
  message: 'Please help with my form application.',
};

describe('submitInquiry validation (runs before any database call)', () => {
  it('rejects a too-short name', async () => {
    const r = await submitInquiry(null, form({ ...good, name: 'A' }));
    expect(r.ok).toBe(false);
  });
  it('rejects an over-long name', async () => {
    const r = await submitInquiry(null, form({ ...good, name: 'x'.repeat(101) }));
    expect(r.ok).toBe(false);
  });
  it('rejects an invalid phone number', async () => {
    const r = await submitInquiry(null, form({ ...good, phone: 'abc' }));
    expect(r.ok).toBe(false);
  });
  it('rejects an invalid email', async () => {
    const r = await submitInquiry(null, form({ ...good, email: 'not-an-email' }));
    expect(r.ok).toBe(false);
  });
  it('rejects a too-short or over-long message', async () => {
    expect((await submitInquiry(null, form({ ...good, message: 'hi' }))).ok).toBe(false);
    expect((await submitInquiry(null, form({ ...good, message: 'x'.repeat(2001) }))).ok).toBe(false);
  });
  it('passes validation and then reports the database as not connected (no env in tests)', async () => {
    const r = await submitInquiry(null, form(good));
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/not connected|WhatsApp/);
  });
});

describe('adminEmails', () => {
  beforeEach(() => { delete process.env.ADMIN_EMAILS; });
  it('lowercases, trims and splits the list', () => {
    process.env.ADMIN_EMAILS = '  Amlesh@Example.com , other@test.com ';
    expect(adminEmails()).toEqual(['amlesh@example.com', 'other@test.com']);
  });
  it('is empty when the variable is unset', () => {
    expect(adminEmails()).toEqual([]);
  });
});
