'use client';
export default function AdminError({ reset }) {
  return (
    <>
      <h1>Admin Login</h1>
      <p className="alert">Something went wrong while loading the admin page. This is often caused by an old (stale) session cookie.</p>
      <p><button className="btn" onClick={() => reset()}>Try again</button></p>
      <p className="muted">If it happens again: clear this site's (chandrabhushan-online.vercel.app) cookies in your browser, then open /admin again and log in. If it still does not work, please share the Digest number.</p>
    </>
  );
}
