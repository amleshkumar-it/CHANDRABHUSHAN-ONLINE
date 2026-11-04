export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getAdminUser, getServerSupabase } from '../../../lib/supabase-server';
import { saveShopService, deleteShopService } from '../actions';
import { SHOP_CATEGORIES } from '../../../lib/site';
import PosterForm from '../../../components/PosterForm';
export default async function AdminShopServices() {
  let user = null;
  try { user = await getAdminUser(); } catch { user = null; }
  if (!user) redirect('/admin');
  let items = [];
  try {
    const sb = getServerSupabase();
    if (sb) {
      const { data, error } = await sb.from('shop_services').select('id,title,category').order('created_at', { ascending: false });
      items = error ? [] : (data || []);
    }
  } catch { items = []; }
  return (
    <>
      <div className="page-head"><h1>Hamari Sevayein — Poster se Card</h1></div><p><a href="/admin/dashboard">← Dashboard</a></p>
      <p className="muted">Poster upload karo, uska text nikal kar category ka sujhaav milega, phir title/description theek karke Save karo. Card /hamari-sevayein par us category ke apne section me dikhega — Banking ka card Banking section me.</p>
      <h2>Poster se Nayi Seva Banayein</h2>
      <PosterForm action={saveShopService} categories={SHOP_CATEGORIES} />
      <h2>Existing Shop Services ({items.length})</h2>
      {items.map((s) => (
        <div className="card" key={s.id}>
          <strong>{s.title}</strong> — {s.category}
          <form action={deleteShopService}><input type="hidden" name="id" value={s.id} /><button className="btn danger small" type="submit">Delete</button></form>
        </div>
      ))}
    </>
  );
}
