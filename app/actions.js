'use server';
import { revalidatePath } from 'next/cache';
import { getPublicSupabase } from '../lib/supabase';

function clean(v) { return String(v || '').trim(); }

// Shared server validation for inquiry/contact forms.
export async function submitInquiry(prev, formData) {
  const name = clean(formData.get('name'));
  const phone = clean(formData.get('phone'));
  const email = clean(formData.get('email'));
  const message = clean(formData.get('message'));
  const service_id = clean(formData.get('service_id'));
  if (name.length < 2) return { ok: false, error: 'Please enter your full name.' };
  if (!/^[0-9+() -]{10,15}$/.test(phone)) return { ok: false, error: 'Please enter a valid phone number (10 digits).' };
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: 'Please enter a valid email, or leave it blank.' };
  if (message.length < 5) return { ok: false, error: 'Please write your message (at least 5 characters).' };
  const sb = getPublicSupabase();
  if (!sb) return { ok: false, error: 'Database is not connected yet. Please contact us on WhatsApp instead — your message was NOT saved.' };
  const { error } = await sb.from('inquiries').insert({
    name, phone, email: email || null, message,
    service_id: service_id && !isNaN(Number(service_id)) ? Number(service_id) : null,
  });
  if (error) return { ok: false, error: 'Could not save your inquiry. Please try WhatsApp instead.' };
  revalidatePath('/admin/inquiries');
  return { ok: true, message: 'Thank you! Your inquiry has been received. We will contact you soon.' };
}
