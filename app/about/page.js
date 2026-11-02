import { SITE } from '../../lib/site';
export default function About() {
  return (
    <>
      <h1>About Us / Hamare Baare Me</h1>
      <img src="/shop.jpeg" alt="CHANDRABHUSHAN ONLINE shop" style={{ width: '100%', maxHeight: 380, objectFit: 'cover', borderRadius: 14 }} />
      <p>CHANDRABHUSHAN ONLINE ek local online service centre hai. Logon ko government aur digital kaam online karne me aksar dikkat hoti hai — form kaise bharna hai, kaunse documents chahiye, last date kab hai. Hum isi kaam me madad karte hain.</p>
      <h2>Why choose us?</h2>
      <ul><li>Sahi jaankari aur sahi documents ke saath kaam</li><li>Simple Hindi-English me samjhana, taaki koi step chhoote nahi</li><li>Phone, email aur WhatsApp par support — {SITE.hours}</li></ul>
      <p><a className="btn" href="/contact">Contact Us</a></p>
    </>
  );
}
