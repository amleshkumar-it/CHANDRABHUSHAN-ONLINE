import { describe, it, expect } from 'vitest';
import { SITE, CATEGORIES, whatsappLink, serviceStatus, daysLeft, formatDate } from '../lib/site';

function iso(daysFromToday) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().slice(0, 10);
}

describe('SITE constants', () => {
  it('has the shop phone, email and hours used across the site', () => {
    expect(SITE.phone).toBe('7488578184');
    expect(SITE.email).toContain('@');
    expect(SITE.hours).toBe('9 AM – 7 PM');
  });
  it('lists all six service categories including Yojana', () => {
    expect(CATEGORIES).toEqual(['Job', 'Admit Card', 'Form', 'Result', 'Scholarship', 'Yojana']);
  });
});

describe('whatsappLink', () => {
  it('builds a wa.me link with the shop number and an encoded message', () => {
    const link = whatsappLink('Hello, I need help');
    expect(link.startsWith('https://wa.me/917488578184?text=')).toBe(true);
    expect(link).toContain('Hello%2C%20I%20need%20help');
  });
});

describe('serviceStatus', () => {
  it('is Upcoming when dates are missing', () => {
    expect(serviceStatus({})).toBe('Upcoming');
    expect(serviceStatus({ start_date: iso(-5) })).toBe('Upcoming');
  });
  it('is Upcoming before the start date', () => {
    expect(serviceStatus({ start_date: iso(2), end_date: iso(10) })).toBe('Upcoming');
  });
  it('is Expired after the end date', () => {
    expect(serviceStatus({ start_date: iso(-10), end_date: iso(-1) })).toBe('Expired');
  });
  it('is Active between start and end dates', () => {
    expect(serviceStatus({ start_date: iso(-2), end_date: iso(5) })).toBe('Active');
  });
});

describe('daysLeft', () => {
  it('is null without an end date', () => {
    expect(daysLeft({})).toBeNull();
  });
  it('is positive for a future end date and negative for a past one', () => {
    expect(daysLeft({ end_date: iso(30) })).toBeGreaterThan(0);
    expect(daysLeft({ end_date: iso(-5) })).toBeLessThan(0);
  });
});

describe('formatDate', () => {
  it('shows a dash for missing dates', () => {
    expect(formatDate(null)).toBe('—');
    expect(formatDate(undefined)).toBe('—');
  });
  it('formats a real date in en-IN style', () => {
    const out = formatDate('2026-11-06');
    expect(out).toMatch(/6/);
    expect(out).toMatch(/Nov/);
    expect(out).toMatch(/2026/);
  });
});
