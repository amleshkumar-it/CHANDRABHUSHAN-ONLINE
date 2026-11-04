export const dynamic = 'force-dynamic';
import { redirect, notFound } from 'next/navigation';
import { getAdminUser } from '../../../../lib/supabase-server';
import { getShopService } from '../../../../lib/supabase';
import { saveShopService } from '../../actions';
import { SHOP_CATEGORIES } from '../../../../lib/site';
import PosterForm from '../../../../components/PosterForm';

export default async function EditShopService({ params }) {
  let user = null;
  try { user = await getAdminUser(); } catch { user = null; }
  if (!user) redirect('/admin');
  const s = await getShopService(params.id);
  if (!s) return notFound();
  return (
    <>
      <div className="page-head"><h1>Edit Shop Service</h1></div>
      <p><a href="/admin/shop-services">← Back to Shop Services</a></p>
      <p className="muted">Title, category ya description badlo. Nayi poster photo chuno to image badal jaayegi, warna purani photo hi rahegi. Save karne par /hamari-sevayein par card update ho jaayega.</p>
      <PosterForm
        action={saveShopService}
        categories={SHOP_CATEGORIES}
        initial={{ id: s.id, title: s.title, category: s.category, description: s.description || '', imageUrl: s.image_url || '' }}
      />
    </>
  );
}
