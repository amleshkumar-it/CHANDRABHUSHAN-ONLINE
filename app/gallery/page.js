export const revalidate = 60;
export default async function Gallery() {
  return (
    <>
      <div className="page-head"><span className="eyebrow">Gallery</span><h1>Gallery</h1><p>Photos from CHANDRABHUSHAN ONLINE.</p></div>
      <div className="cards">
        <div className="card"><img src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE Shop" /><p>Our shop — CHANDRABHUSHAN ONLINE</p></div>
      </div>
    </>
  );
}
