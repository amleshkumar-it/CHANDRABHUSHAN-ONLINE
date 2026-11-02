export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { getAdminUser, getServerSupabase } from '../../../lib/supabase-server';
import { toggleInquiryRead } from '../actions';
export default async function AdminInquiries() {
  let user = null;
  try { user = await getAdminUser(); } catch { user = null; }
  if (!user) redirect('/admin');
  let sb = null;
  try { sb = getServerSupabase(); } catch { sb = null; }
  let list = [];
  if (sb) {
    try { const { data } = await sb.from('inquiries').select('id,name,phone,email,message,is_read, services(title)').order('created_at', { ascending: false }); list = data || []; } catch { list = []; }
  }
  return (
    <>
      <div className="page-head"><h1>Manage Inquiries</h1></div><p><a href="/admin/dashboard">← Dashboard</a></p>
      {list.length === 0 ? <p>No inquiries yet.</p> : (
        <div className="table-scroll"><table><thead><tr><th>Name</th><th>Phone / Email</th><th>Service</th><th>Message</th><th>Read?</th><th>Action</th></tr></thead><tbody>
          {list.map((q) => (
            <tr key={q.id}><td>{q.name}</td><td>{q.phone}<br />{q.email || ''}</td><td>{q.services?.title || '—'}</td><td>{q.message}</td><td>{q.is_read ? 'Yes' : 'No'}</td>
            <td><form action={toggleInquiryRead}><input type="hidden" name="id" value={q.id} /><input type="hidden" name="is_read" value={q.is_read ? 'false' : 'true'} /><button className="btn small" type="submit">{q.is_read ? 'Mark Unread' : 'Mark Read'}</button></form></td></tr>
          ))}
        </tbody></table></div>
      )}
    </>
  );
}
