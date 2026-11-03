'use client';
import { useRef, useState } from 'react';

// File input for admin image uploads. Phone photos are often several MB,
// and the whole file travels phone -> server -> Supabase Storage, which is
// the slowest part of saving a service. Images over 400 KB are shrunk in
// the browser (max 1280 px on the long side, JPEG/WebP quality 0.82) before
// the form is submitted, so the upload is usually a few hundred KB instead
// of a few MB. If shrinking fails, the original file is sent unchanged.
export default function CompressedImageInput() {
  const inputRef = useRef(null);
  const [note, setNote] = useState('');
  async function onChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file || file.size <= 400 * 1024) { setNote(''); return; }
    setNote('Compressing image…');
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; img.src = url; });
      const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const type = ['image/jpeg', 'image/webp', 'image/png'].includes(file.type) ? file.type : 'image/jpeg';
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, 0.82));
      if (blob && blob.size < file.size && inputRef.current) {
        const dt = new DataTransfer();
        dt.items.add(new File([blob], file.name, { type: blob.type }));
        inputRef.current.files = dt.files;
        setNote(`Image compressed: ${(file.size / 1048576).toFixed(1)} MB → ${(blob.size / 1024).toFixed(0)} KB, so the upload is much faster.`);
      } else {
        setNote('');
      }
    } catch {
      setNote('');
    }
  }
  return (
    <>
      <input ref={inputRef} name="image_file" type="file" accept="image/*" onChange={onChange} />
      {note && <p className="muted">{note}</p>}
    </>
  );
}
