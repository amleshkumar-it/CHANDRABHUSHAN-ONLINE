'use client';
import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';

// Poster image with an on-site popup (lightbox). The tile is always ONE
// size (square, image fitted with cover) no matter what shape was uploaded,
// so cards in a row look equal. Clicking opens the FULL poster on this
// same site — fully visible with contain — with a fade + zoom-in animation.
// Closes with the X button, a click on the dark background, or Escape.
export default function PosterLightbox({ imageUrl, title, variant = 'tile' }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open ]);

  if (!imageUrl) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Click to view full poster"
        aria-label={`View full poster: ${title}`}
        style={{ display: 'block', width: '100%', padding: 0, border: 0, background: 'none', cursor: 'zoom-in', marginBottom: variant === 'tile' ? '.25rem' : '.5rem' }}
      >
        {variant === 'tile' ? (
          <span style={{ display: 'block', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: 8, background: '#eef2f7' }}>
            <img src={imageUrl} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </span>
        ) : (
          <img src={imageUrl} alt={title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 20 }} />
        )}
      </button>
      {open && (
        <div
          className="animate__animated animate__fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={close}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(10, 20, 40, 0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', cursor: 'zoom-out' }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close poster"
            style={{ position: 'absolute', top: '1rem', right: '1rem', width: 44, height: 44, borderRadius: '50%', border: 0, background: '#fff', color: '#101B35', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={22} aria-hidden="true" />
          </button>
          <figure
            className="animate__animated animate__zoomIn animate__faster"
            onClick={(e) => e.stopPropagation()}
            style={{ margin: 0, maxWidth: '92vw', maxHeight: '88vh', textAlign: 'center', cursor: 'default' }}
          >
            <img src={imageUrl} alt={title} style={{ maxWidth: '92vw', maxHeight: '80vh', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 12, background: '#fff' }} />
            <figcaption style={{ color: '#fff', marginTop: '.75rem', fontWeight: 600 }}>{title}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
