'use client';

import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 240;
const PAD = 3;

function pad(n: number) {
  return String(n).padStart(PAD, '0');
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasMaskRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const betweenRef = useRef<HTMLSpanElement>(null);
  const realityRef = useRef<HTMLSpanElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const dreamRef = useRef<HTMLSpanElement>(null);
  const fullbleedRef = useRef<HTMLDivElement>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  // Load frames
  useEffect(() => {
    const loaded: HTMLImageElement[] = [];
    let count = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';
      img.src = bp + '/scrollinganimation/ezgif-frame-' + pad(i) + '.jpg';
      img.onload = img.onerror = () => {
        count++;
        if (count === TOTAL_FRAMES) {
          framesRef.current = loaded;
          setReady(true);
        }
      };
      loaded.push(img);
    }
  }, []);

  // Canvas sizing
  useEffect(() => {
    if (!ready) return;

    function sizeCanvas() {
      const c = canvasRef.current;
      if (!c) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + 'px';
      c.style.height = h + 'px';
    }

    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);
    return () => window.removeEventListener('resize', sizeCanvas);
  }, [ready]);

  // Draw function
  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const idx = Math.min(Math.max(0, Math.round(index)), TOTAL_FRAMES - 1);
    const img = framesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }

  // GSAP ScrollTrigger — exact port from index.html
  useLayoutEffect(() => {
    if (!ready) return;
    if (
      !sectionRef.current ||
      !canvasMaskRef.current ||
      !fullbleedRef.current ||
      !betweenRef.current ||
      !realityRef.current ||
      !ampersandRef.current ||
      !dreamRef.current
    )
      return;

    const clipState = { radius: 35 };
    let heroLastFrame = -1;

    // Set initial clip path
    gsap.set(canvasMaskRef.current, { clipPath: 'circle(35vh at 50% 50%)' });

    // Center "between" word via GSAP xPercent (like translateX(-50%))
    gsap.set(betweenRef.current, { xPercent: -50 });

    // Draw first frame
    drawFrame(0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: '+=350vh',
        scrub: 1,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        const progress = tl.progress();
        const frame = Math.round(progress * (TOTAL_FRAMES - 1));
        if (frame !== heroLastFrame) {
          heroLastFrame = frame;
          drawFrame(frame);
        }
      },
    });

    // Clip-path expansion
    tl.to(
      clipState,
      {
        radius: 200,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (canvasMaskRef.current) {
            canvasMaskRef.current.style.clipPath =
              'circle(' + clipState.radius + 'vh at 50% 50%)';
          }
        },
        duration: 0.35,
      },
      0
    );

    // Words disperse
    tl.to(betweenRef.current, { x: -120, y: -80, opacity: 0, ease: 'power2.in', duration: 0.22 }, 0);
    tl.to(realityRef.current, { x: -200, y: -60, opacity: 0, ease: 'power2.in', duration: 0.22 }, 0);
    tl.to(ampersandRef.current, { x: 80, y: 80, opacity: 0, ease: 'power2.in', duration: 0.22 }, 0);
    tl.to(dreamRef.current, { x: 200, y: 100, opacity: 0, ease: 'power2.in', duration: 0.22 }, 0);

    // Fullbleed text fades in
    tl.to(fullbleedRef.current, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.25 }, 0.25);

    // Refresh on resize
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      tl.kill();
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  return (
    <>
      {/* Fixed Canvas (behind everything, z-index: 0) */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none bg-black">
        <div ref={canvasMaskRef} className="w-full h-full" style={{ willChange: 'clip-path' }}>
          <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
      </div>

      {/* Hero Section — pinned by GSAP ScrollTrigger */}
      <section
        ref={sectionRef}
        className="relative w-full h-screen pointer-events-none"
        style={{ zIndex: 2 }}
      >
        {/* between */}
        <span
          ref={betweenRef}
          className="absolute font-serif text-[#f0e8dc] z-[3]"
          style={{
            top: '15%',
            left: '50%',
            fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textShadow: '0 0 40px rgba(0,0,0,0.9)',
            lineHeight: 1,
          }}
        >
          between
        </span>

        {/* Reality */}
        <span
          ref={realityRef}
          className="absolute font-serif text-[#f0e8dc] z-[3]"
          style={{
            top: '34%',
            left: '8%',
            fontSize: 'clamp(2.5rem, 7vw, 7rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textShadow: '0 0 40px rgba(0,0,0,0.9)',
            lineHeight: 1,
          }}
        >
          Reality
        </span>

        {/* &amp; */}
        <span
          ref={ampersandRef}
          className="absolute font-serif italic text-[#f0e8dc] z-[3]"
          style={{
            top: '55%',
            left: '52%',
            fontSize: 'clamp(1rem, 2.2vw, 2rem)',
            fontWeight: 400,
            letterSpacing: '0.08em',
            textShadow: '0 0 40px rgba(0,0,0,0.9)',
            lineHeight: 1,
          }}
        >
          &amp;
        </span>

        {/* Dream */}
        <span
          ref={dreamRef}
          className="absolute font-serif text-[#f0e8dc] z-[3]"
          style={{
            top: '62%',
            left: '58%',
            fontSize: 'clamp(2.5rem, 7vw, 7rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textShadow: '0 0 40px rgba(0,0,0,0.9)',
            lineHeight: 1,
          }}
        >
          Dream
        </span>

        {/* Push the Envelope */}
        <div
          ref={fullbleedRef}
          className="absolute font-serif text-[#f0e8dc] z-[3]"
          style={{
            left: '5%',
            bottom: '22%',
            lineHeight: 1.1,
            textShadow: '0 4px 60px rgba(0,0,0,0.85)',
            opacity: 0,
          }}
        >
          <div
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 700,
            }}
          >
            Push the<br />Envelope
          </div>
          <span
            className="block italic opacity-60"
            style={{
              fontSize: '0.4em',
              fontWeight: 400,
              letterSpacing: '0.06em',
              marginTop: '0.5rem',
            }}
          >
            — frame by frame —
          </span>
        </div>
      </section>
    </>
  );
}
