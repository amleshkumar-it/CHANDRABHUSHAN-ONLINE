export const revalidate = 300;
import { ArrowRight } from 'lucide-react';
import { getServices, isSupabaseConfigured } from '../../lib/supabase';
import { CATEGORIES, serviceStatus, daysLeft, formatDate } from '../../lib/site';
import ServiceIcon from '../../components/ServiceIcon';

export default async function ServicesPage({ searchParams }) {
  const category = searchParams?.category || '';
  const q = (searchParams?.q || '').trim();
  const all = await getServices();
  let services = category ? all.filter((s) => s.category === category) : all;
  if (q) {
    const needle = q.toLowerCase();
    services = services.filter((s) =>
      (s.title || '').toLowerCase().includes(needle) ||
      (s.short_description || '').toLowerCase().includes(needle) ||
      (s.full_description || '').toLowerCase().includes(needle));
  }
  const catHref = (c) => c ? `/services?category=${encodeURIComponent(c)}${q ? `&q=${encodeURIComponent(q)}` : ''}` : `/services${q ? `?q=${encodeURIComponent(q)}` : ''}`;
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Services</span>
        <h1>Services &amp; Latest Updates</h1>
        <p>Latest updates in one place — jobs, admit cards, results, forms, scholarships and yojanas. Sarkari Jobs and Sarkari Yojana in the menu are shortcuts to parts of this same list; this page holds every Sarkari update. Use a category to narrow the list, then open a card for dates, documents and the official link. Always verify on the official website before applying.</p>
      </div>
      <form className="search-form" action="/services" method="get" role="search">
        {category && <input type="hidden" name="category" value={category} />}
        <label className="sr-only" htmlFor="services-search">Search services</label>
        <input id="services-search" type="search" name="q" defaultValue={q} placeholder="Search jobs, admit cards, results…" aria-label="Search services" />
        <button className="btn small" type="submit">Search</button>
        {q && <a className="btn small outline" href={catHref(category)}>Clear search</a>}
      </form>
      {q && <p className="search-results">Search results for “{q}” — {services.length} service{services.length === 1 ? '' : 's'} found.</p>}
      <nav className="filters" aria-label="Filter services by category">
        <a href={catHref('')} className={!category ? 'active' : ''}>All</a>
        {CATEGORIES.map((c) => <a key={c} href={catHref(c)} className={category === c ? 'active' : ''}>{c}</a>)}
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
