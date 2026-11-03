'use client';
import { useEffect, useRef, useState } from 'react';

// Scroll-reveal wrapper using Animate.css: content stays hidden until it
// scrolls into view, then plays a gentle fadeInUp once. Users who prefer
// reduced motion see the content immediately with no animation (the global
// prefers-reduced-motion rule in globals.css also disables animations).
export default function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [state, setState] = useState('hidden'); // hidden | shown | animated
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('shown');
      return;
    }
    if (!('IntersectionObserver' in window)) {
      setState('animated');
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('animated');
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const className =
    state === 'hidden'
      ? 'reveal-hidden'
      : state === 'animated'
        ? 'animate__animated animate__fadeInUp'
        : '';
  return (
    <div ref={ref} className={className} style={delay ? { animationDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
