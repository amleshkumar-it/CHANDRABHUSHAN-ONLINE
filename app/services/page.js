export const revalidate = 60;
import { ArrowRight } from 'lucide-react';
import { getServices, isSupabaseConfigured } from '../../lib/supabase';
import { CATEGORIES, serviceStatus, daysLeft, formatDate } from '../../lib/site';
import ServiceIcon from '../../components/ServiceIcon';

export default async function ServicesPage({ searchParams }) {
  const category = searchParams?.category || '';
  const all = await getServices();
  const services = category ? all.filter((s) => s.category === category) : all;
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Services</span>
        <h1>Services &amp; Latest Updates</h1>
        <p>Browse every available service. Use a category to narrow the list, then open a card for dates, documents and the apply link.</p>
      </div>
      <nav className="filters" aria-label="Filter services by category">
        <a href="/services" className={!category ? 'active' : ''}>All</a>
        {CATEGORIES.map((c) => <a key={c} href={`/services?category=${encodeURIComponent(c)}`} className={category === c ? 'active' : ''}>{c}</a>)}
      </nav>
      {!isSupabaseConfigured() && <p className="alert">The database is not connected yet, so no services are shown here. Services will appear here once Supabase is set up.</p>}
      {services.length === 0 ? <div className="empty"><strong>No services yet.</strong><span>Check back soon!</span></div> : (
        <div className="bento">
          {services.map((s) => {
            const status = serviceStatus(s); const left = daysLeft(s);
            return (
              <article className="bento-card" key={s.id}>
                <span className="bento-icon"><ServiceIcon category={s.category} size={24} /></span>
                <span className="bento-meta"><span className="badge">{s.category}</span> <span className={`badge ${status}`}>{status}</span>
                {status === 'Active' && left !== null && left <= 7 && <span className="badge deadline">{left} day{left === 1 ? '' : 's'} left</span>}</span>
                <h3>{s.title}</h3><p>{s.short_description}</p>
                <p><small>Start: {formatDate(s.start_date)} · Last date: {formatDate(s.end_date)}</small></p>
                <a className="btn small outline" href={`/services/${s.id}`}>View Details <ArrowRight size={16} aria-hidden="true" /></a>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
