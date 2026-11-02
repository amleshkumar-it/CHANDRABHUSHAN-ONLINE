export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getAdminUser, getServerSupabase } from '../../../lib/supabase-server';
import { logoutAdmin } from '../actions';
export default async function Dashboard() {
  // Auth failure must mean "not logged in" (redirect), never a server
  // exception. redirect() stays outside the try/catch on purpose.
  let user = null;
  try { user = await getAdminUser(); } catch { user = null; }
  if (!user) redirect('/admin');
  let sb = null;
  try { sb = getServerSupabase(); } catch { sb = null; }
  let services = 0, products = 0, inquiries = 0, unread = 0, recent = [];
  if (sb) {
    try {
      const s = await sb.from('services').select('id', { count: 'exact', head: true });
      const p = await sb.from('products').select('id', { count: 'exact', head: true });
      const i = await sb.from('inquiries').select('id', { count: 'exact', head: true });
      const u = await sb.from('inquiries').select('id', { count: 'exact', head: true }).eq('is_read', false);
      const r = await sb.from('inquiries').select('*').order('created_at', { ascending: false }).limit(10);
      services = s.count || 0; products = p.count || 0; inquiries = i.count || 0; unread = u.count || 0; recent = r.data || [];
    } catch {
      // Database blip: show the dashboard with zeros, do not crash it.
      services = 0; products = 0; inquiries = 0; unread = 0; recent = [];
    }
  }
  return (
    <>
      <h1>Admin Dashboard</h1><p>Logged in as: {user.email}</p>
      <form action={logoutAdmin}><button className="btn outline small" type="submit">Logout</button></form>
      <p><a className="btn" href="/admin/services">Manage Services</a> <a className="btn" href="/admin/products">Manage Products</a> <a className="btn" href="/admin/inquiries">Manage Inquiries</a></p>
      <div className="cards">
        <div className="card"><h3>Services</h3><p style={{ fontSize: '2rem' }}>{services}</p></div>
        <div className="card"><h3>Products</h3><p style={{ fontSize: '2rem' }}>{products}</p></div>
        <div className="card"><h3>Inquiries</h3><p style={{ fontSize: '2rem' }}>{inquiries}</p></div>
        <div className="card"><h3>Unread Inquiries</h3><p style={{ fontSize: '2rem' }}>{unread}</p></div>
      </div>
      <h2>Recent Inquiries</h2>
      {recent.length === 0 ? <p>No inquiries yet.</p> : (
        <div className="table-scroll"><table><thead><tr><th>Name</th><th>Phone</th><th>Message</th><th>Read?</th></tr></thead><tbody>
          {recent.map((q) => <tr key={q.id}><td>{q.name}</td><td>{q.phone}</td><td>{q.message}</td><td>{q.is_read ? 'Yes' : 'No'}</td></tr>)}
        </tbody></table></div>
      )}
    </>
  );
}
