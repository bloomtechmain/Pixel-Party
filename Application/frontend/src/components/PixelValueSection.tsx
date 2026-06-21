import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import video3 from '../assets/video3.mp4';

gsap.registerPlugin(ScrollTrigger);

export function PixelValueSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLDivElement>(null);
  const line2Ref    = useRef<HTMLDivElement>(null);
  const line3Ref    = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLDivElement>(null);
  const reticleRef  = useRef<HTMLDivElement>(null);
  const hlineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Entry: curtain clip-path expands from top+bottom ── */
      gsap.fromTo(
        sectionRef.current,
        { clipPath: 'inset(8% 0% 8% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            end: 'top 5%',
            scrub: 2,
          },
        }
      );

      /* ── Video: parallax zoom-out as section rises ── */
      gsap.fromTo(
        videoRef.current,
        { scale: 1.14 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            end: 'bottom top',
            scrub: 2.5,
          },
        }
      );

      /* ── Overlay: darkens in sync with clip reveal ── */
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            end: 'top 20%',
            scrub: 1.5,
          },
        }
      );

      /* ── Horizontal accent line sweeps in ── */
      gsap.fromTo(
        hlineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* ── Content stagger reveal ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 90, skewY: 5 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: 'power3.out' },
        '-=0.2'
      );

      tl.fromTo(
        line2Ref.current,
        { opacity: 0, y: 70, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );

      tl.fromTo(
        line3Ref.current,
        { opacity: 0, y: 120, skewY: 6 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.15, ease: 'power3.out' },
        '-=0.65'
      );

      tl.fromTo(
        reticleRef.current,
        { opacity: 0, scale: 1.18 },
        { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' },
        '-=1.0'
      );

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.35'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', clipPath: 'inset(8% 0% 8% 0%)' }}
    >
      {/* ── BACKGROUND VIDEO ── */}
      <video
        ref={videoRef}
        src={video3}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transformOrigin: 'center center' }}
      />

      {/* Dark overlay — GSAP drives opacity, kept light so video stays vivid */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.28)', opacity: 0 }}
      />

      {/* Vignette — only very gently darkens the outermost edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 45%, rgba(0,0,0,0.42) 100%)',
        }}
      />

      {/* Fine grid — matches other sections */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Top bleed into Our Philosophy section */}
      <div
        className="absolute top-0 left-0 right-0 h-44 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, #000000 0%, transparent 100%)' }}
      />

      {/* Bottom bleed */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, #000000 0%, transparent 100%)' }}
      />

      {/* Lime horizontal accent — GSAP sweeps in */}
      <div
        ref={hlineRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '50%',
          height: 1,
          background:
            'linear-gradient(to right, transparent, rgba(183,203,69,0.18), transparent)',
          transformOrigin: 'center',
          opacity: 0,
        }}
      />

      {/* ── CONTENT ── */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* Section label */}
        <div ref={labelRef} className="flex items-center gap-4 mb-14" style={{ opacity: 0 }}>
          <div
            className="w-12 h-px"
            style={{ background: 'linear-gradient(to left, rgba(183,203,69,0.55), transparent)' }}
          />
          <span className="font-mono text-[9px] text-[#B7CB45]/60 tracking-[0.32em] uppercase">
            004 · Pixel Party Studio
          </span>
          <div
            className="w-12 h-px"
            style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.55), transparent)' }}
          />
        </div>

        {/* ── Typography + reticle wrapper ── */}
        <div className="relative">

          {/* Camera / viewfinder reticle behind the text */}
          <div
            ref={reticleRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div
              className="relative rounded-full"
              style={{
                width:  'clamp(260px, 52vw, 700px)',
                height: 'clamp(260px, 52vw, 700px)',
                border: '1px solid rgba(183,203,69,0.14)',
              }}
            >
              {/* Crosshair horizontal */}
              <div
                className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(183,203,69,0.22), transparent)',
                }}
              />
              {/* Crosshair vertical */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent, rgba(183,203,69,0.22), transparent)',
                }}
              />
              {/* Corner brackets */}
              {(
                [
                  'top-3 left-3 border-t border-l',
                  'top-3 right-3 border-t border-r',
                  'bottom-3 left-3 border-b border-l',
                  'bottom-3 right-3 border-b border-r',
                ] as const
              ).map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-7 h-7 ${cls}`}
                  style={{ borderColor: 'rgba(183,203,69,0.55)', borderWidth: '1.5px' }}
                />
              ))}
              {/* Four small marker dots on ring */}
              {[0, 90, 180, 270].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <div
                    key={deg}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{
                      background: 'rgba(183,203,69,0.6)',
                      boxShadow: '0 0 5px rgba(183,203,69,0.5)',
                      top:  `calc(${50 - Math.cos(rad) * 50}% - 3px)`,
                      left: `calc(${50 + Math.sin(rad) * 50}% - 3px)`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Line 1 — ghost outlined */}
          <div ref={line1Ref} style={{ opacity: 0 }}>
            <p
              className="font-black leading-none select-none"
              style={{
                fontSize: 'clamp(2.6rem, 8vw, 7.5rem)',
                WebkitTextStroke: '1.5px rgba(255,255,255,0.55)',
                color: 'transparent',
                letterSpacing: '-0.03em',
                filter: 'drop-shadow(0 2px 16px rgba(0,0,0,0.7))',
              }}
            >
              SET VALUE FOR
            </p>
          </div>

          {/* Line 2 — solid white */}
          <div ref={line2Ref} className="mt-1 lg:mt-2" style={{ opacity: 0 }}>
            <p
              className="font-black leading-none text-white"
              style={{
                fontSize: 'clamp(3rem, 9.5vw, 9rem)',
                letterSpacing: '-0.03em',
                textShadow: '0 2px 24px rgba(0,0,0,0.8), 0 0 80px rgba(255,255,255,0.14)',
              }}
            >
              YOUR EVERY
            </p>
          </div>

          {/* Line 3 — lime PIXEL */}
          <div ref={line3Ref} className="mt-1 lg:mt-2" style={{ opacity: 0 }}>
            <p
              className="font-black leading-none"
              style={{
                fontSize: 'clamp(5rem, 17vw, 17rem)',
                letterSpacing: '-0.045em',
                background:
                  'linear-gradient(135deg, #B7CB45 0%, #e0f06a 38%, #B7CB45 65%, #8fa832 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter:
                  'drop-shadow(0 0 80px rgba(183,203,69,0.65)) drop-shadow(0 0 160px rgba(183,203,69,0.28))',
              }}
            >
              PIXEL
            </p>
          </div>
        </div>

        {/* Tagline */}
        <div
          ref={taglineRef}
          className="mt-10 flex flex-col items-center gap-4"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-[1.5px] bg-[#B7CB45]" />
            <div className="w-3 h-[1.5px]" style={{ background: 'rgba(183,203,69,0.4)' }} />
          </div>
          <p className="text-white/40 text-sm lg:text-[15px] font-light tracking-[0.22em] uppercase">
            Every frame. Every detail. Perfectly crafted.
          </p>
        </div>
      </div>

      {/* Floating orbs — match VideoRevealSection style */}
      {(
        [
          { top: '18%', left: '7%',   w: 4, o: 0.16, d: '4.2s', delay: '0s'   },
          { top: '74%', left: '5%',   w: 3, o: 0.12, d: '5.5s', delay: '1s'   },
          { top: '12%', right: '8%',  w: 5, o: 0.14, d: '3.8s', delay: '0.5s' },
          { top: '78%', right: '6%',  w: 3, o: 0.10, d: '6s',   delay: '2s'   },
          { top: '44%', left: '3%',   w: 2, o: 0.13, d: '4.8s', delay: '1.5s' },
          { top: '30%', right: '4%',  w: 3, o: 0.11, d: '5s',   delay: '0.8s' },
        ] as const
      ).map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none z-10"
          style={{
            top: p.top,
            ...(('left' in p) ? { left: p.left } : { right: (p as { right: string }).right }),
            width:  p.w,
            height: p.w,
            opacity: p.o,
            background: '#B7CB45',
            boxShadow: '0 0 10px #B7CB45',
            animation: `floatY ${p.d} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </section>
  );
}
