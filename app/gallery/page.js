import Image from 'next/image';
export const revalidate = 60;
export default async function Gallery() {
  return (
    <>
      <div className="page-head"><span className="eyebrow">Gallery</span><h1>Gallery</h1><p>Photos from CHANDRABHUSHAN ONLINE.</p></div>
      <div className="cards">
        <div className="card"><div style={{ position: 'relative', height: 200, overflow: 'hidden', borderRadius: 8, marginBottom: '.75rem' }}><Image src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE Shop" fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 100vw, 50vw" /></div><p>Our shop — CHANDRABHUSHAN ONLINE</p></div>
      </div>
    </>
  );
}
