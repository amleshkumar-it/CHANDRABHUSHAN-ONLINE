export const dynamic = 'force-dynamic';
import { getServices, isSupabaseConfigured } from '../../lib/supabase';
import { CATEGORIES, serviceStatus, daysLeft, formatDate } from '../../lib/site';

export default async function ServicesPage({ searchParams }) {
  const category = searchParams?.category || '';
  const all = await getServices();
  const services = category ? all.filter((s) => s.category === category) : all;
  return (
    <>
      <h1>Services &amp; Latest Updates</h1>
      <p>Choose a category: <a href="/services">All</a>{' '}
        {CATEGORIES.map((c) => <span key={c}> · <a href={`/services?category=${encodeURIComponent(c)}`}>{c}</a></span>)}
      </p>
      {!isSupabaseConfigured() && <p className="alert">The database is not connected yet, so no services are shown here. Services will appear here once Supabase is set up.</p>}
      {services.length === 0 ? <p>No services yet. Check back soon!</p> : (
        <div className="cards">
          {services.map((s) => {
            const status = serviceStatus(s); const left = daysLeft(s);
            return (
              <div className="card" key={s.id}>
                <span className="badge">{s.category}</span> <span className={`badge ${status}`}>{status}</span>
                {status === 'Active' && left !== null && left <= 7 && <span className="badge deadline">⏰ {left} day{left === 1 ? '' : 's'} left</span>}
                <h3>{s.title}</h3><p className="muted">{s.short_description}</p>
                <p><small>Start: {formatDate(s.start_date)} · Last date: {formatDate(s.end_date)}</small></p>
                <a className="btn small" href={`/services/${s.id}`}>View Details</a>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
