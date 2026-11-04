'use client';
import { useRef, useState } from 'react';
import { suggestShopCategory } from '../lib/site';
import SaveButton from './SaveButton';

// Poster -> shop-service card form for /admin/shop-services.
// Flow: admin chooses a poster image -> "Poster se Text Nikalo" runs OCR in
// the browser (Hindi + English, via Tesseract from a CDN, no server key) ->
// the extracted text is shown, a category is suggested from its keywords,
// and the description is pre-filled with that text -> the admin edits the
// title/category/description as needed and saves. The admin's confirmation
// is the safety net: OCR on Hindi posters is never 100% accurate, so the
// form never saves OCR output blindly. If OCR fails (no network, blocked
// CDN), the admin can still type everything manually and save.
export default function PosterForm({ action, categories, initial }) {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState('');
  const [ocrStatus, setOcrStatus] = useState('');
  const [extracted, setExtracted] = useState('');
  const [category, setCategory] = useState((initial && initial.category) || categories[0]);
  const [description, setDescription] = useState((initial && initial.description) || '');

  function onFile(e) {
    const file = e.target.files && e.target.files[0];
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : '');
    setOcrStatus(''); setExtracted('');
  }

  async function extractText() {
    const file = fileRef.current && fileRef.current.files && fileRef.current.files[0];
    if (!file) { setOcrStatus('Pehle poster image chuno.'); return; }
    setOcrStatus('Poster se text nikal raha hai… isme thoda time lag sakta hai (pehli baar).');
    try {
      // Tesseract's browser build is a UMD script, not an ES module: a
      // dynamic ESM import of it fails in the browser, which is why the
      // first version of this button never worked live. Load it as a
      // classic script tag and use the window.Tesseract global instead.
      if (!window.Tesseract) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
          s.onload = resolve; s.onerror = () => reject(new Error('OCR script load nahi hua'));
          document.head.appendChild(s);
        });
      }
      const worker = await window.Tesseract.createWorker(['hin', 'eng']);
      const { data } = await worker.recognize(file);
      await worker.terminate();
      const text = String(data && data.text ? data.text : '').replace(/\n{3,}/g, '\n\n').trim();
      if (!text) { setOcrStatus('Poster se koi text nahi nikal paya — description manually likh sakte ho.'); return; }
      setExtracted(text);
      setCategory(suggestShopCategory(text));
      setDescription(text);
      setOcrStatus('Text nikal gaya hai. Category ka sujhaav upar aa gaya hai — galat lage to badal kar, title likh kar Save karo.');
    } catch (e) {
      setOcrStatus(`Text nahi nikal paya (${e && e.message ? e.message : 'OCR load ki dikkat'}) — description manually likh kar bhi save kar sakte ho.`);
    }
  }

  return (
    <form action={action} className="card" encType="multipart/form-data">
      {initial && initial.id && <input type="hidden" name="id" value={initial.id} />}
      {/* Keeps the existing poster when editing without choosing a new file:
          imageUrlFromForm prefers a new upload, else falls back to this. */}
      {initial && initial.imageUrl && <input type="hidden" name="image_url" value={initial.imageUrl} />}
      <label>Poster Image {initial ? '' : '*'}</label>
      <input ref={fileRef} name="image_file" type="file" accept="image/*" required={!initial} onChange={onFile} />
      <p className="muted">{initial ? 'Nayi photo chuno to poster badal jaayega; khaali chhoda to purani photo hi rahegi.' : 'Poster ki photo chuno (max 5 MB). WhatsApp status ka screenshot bhi chalega, lekin poster jitna saaf hoga text utna sahi niklega.'}</p>
      {initial && initial.imageUrl && !preview && <p><img src={initial.imageUrl} alt="Current poster" style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} /><br /><span className="muted">Current poster</span></p>}
      {preview && <p><img src={preview} alt="Poster preview" style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }} /></p>}
      <p><button className="btn outline" type="button" onClick={extractText}>Poster se Text Nikalo (Hindi + English)</button></p>
      {ocrStatus && <p className="muted">{ocrStatus}</p>}
      {extracted && (<><label>Poster se nikla text (check kar lo — galat ho sakta hai)</label><textarea rows={6} value={extracted} onChange={(e) => setExtracted(e.target.value)} readOnly={false} /></>)}
      <label>Title *</label><input name="title" required defaultValue={(initial && initial.title) || ''} placeholder="Jaise: Bank of Baroda se Paisa Nikasi" />
      <label>Category *</label><select name="category" required value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select>
      <p className="muted">Category OCR ke sujhaav se bhari jaati hai, lekin final faisla tumhara hai — Banking ke poster Banking section me, Ayushman ke Ayushman section me.</p>
      <label>Description</label><textarea name="description" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Poster me jo seva likhi hai, wo yahan aayegi — OCR ke baad khud bhar jaayegi, ya manually likho." />
      <p><SaveButton label={initial ? 'Update Shop Service' : 'Save Shop Service'} /></p>
    </form>
  );
}
