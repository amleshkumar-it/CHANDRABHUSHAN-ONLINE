'use client';
export default function AdminError({ reset }) {
  return (
    <>
      <h1>Admin Login</h1>
      <p className="alert">Admin page load hote waqt kuch gadbad hui hai. Ye aksar purani (stale) session cookie ki wajah se hota hai.</p>
      <p><button className="btn" onClick={() => reset()}>Dobara try karein</button></p>
      <p className="muted">Agar dobara bhi yahi aaye to: browser me is site (chandrabhushan-online.vercel.app) ki cookies clear karein, phir /admin dobara kholein aur login karein. Uske baad bhi na ho to Digest number ke saath batayein.</p>
    </>
  );
}
