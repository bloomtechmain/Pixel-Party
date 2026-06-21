import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import peakyVideo from '../assets/Peaky blinders.mp4';

gsap.registerPlugin(ScrollTrigger);

export function LetsCreateSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const videoRef    = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLDivElement>(null);
  const letsRef     = useRef<HTMLDivElement>(null);
  const createRef   = useRef<HTMLDivElement>(null);
  const togetherRef = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const descRef     = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const tagsRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        trigger: sectionRef.current,
        start: 'top 68%',
        toggleActions: 'play none none reverse',
      };

      gsap.fromTo(videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8, ease: 'power2.out', scrollTrigger: st });

      const tl = gsap.timeline({ scrollTrigger: st });
      tl.fromTo(counterRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(letsRef.current,
          { opacity: 0, y: 50, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .fromTo(createRef.current,
          { opacity: 0, y: 80, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: 'power3.out' }, '-=0.55')
        .fromTo(togetherRef.current,
          { opacity: 0, y: 60, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power3.out' }, '-=0.65')
        .fromTo(dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }, '-=0.5')
        .fromTo(descRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .fromTo(tagsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35')
        .fromTo(ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tags = ['Music Videos', 'Films', 'Events', 'Brand Marketing', 'Fashion'];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden flex items-center justify-center"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Background video ── */}
      <div ref={videoRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
        <video
          src={peakyVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full"
          style={{ objectFit: 'cover', display: 'block' }}
        />
        {/* Deep centre radial — let the video glow through the middle */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.68) 50%, rgba(0,0,0,0.93) 100%)',
          }}
        />
        {/* Top / bottom edge fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.82) 100%)',
          }}
        />
      </div>

      {/* ── Fine grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Ambient lime halo ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(183,203,69,0.07) 0%, transparent 65%)' }}
      />

      {/* ── Ghost "09" watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: 'clamp(18rem, 38vw, 38rem)', opacity: 0.022, color: '#fff' }}
        >
          09
        </span>
      </div>

      {/* ── Floating particle orbs ── */}
      <div className="absolute w-1 h-1 rounded-full pointer-events-none"
        style={{ top: '15%', left: '10%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.18, animation: 'floatY 4.2s ease-in-out 0s infinite' }} />
      <div className="absolute w-[5px] h-[5px] rounded-full pointer-events-none"
        style={{ bottom: '18%', left: '8%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.12, animation: 'floatY 5.6s ease-in-out 1s infinite' }} />
      <div className="absolute w-[3px] h-[3px] rounded-full pointer-events-none"
        style={{ top: '22%', right: '9%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.15, animation: 'floatY 3.8s ease-in-out 0.5s infinite' }} />
      <div className="absolute w-1 h-1 rounded-full pointer-events-none"
        style={{ bottom: '28%', right: '12%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.10, animation: 'floatY 5.0s ease-in-out 1.8s infinite' }} />

      {/* ══════════ CONTENT ══════════ */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ paddingTop: '14vh', paddingBottom: '14vh' }}
      >
        {/* Section counter */}
        <div
          ref={counterRef}
          className="flex items-center gap-4 mb-12"
          style={{ opacity: 0 }}
        >
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.5))' }} />
          <span className="font-mono text-[9px] text-[#B7CB45]/40 tracking-[0.32em] uppercase">009</span>
          <span className="text-[8px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/55">Let's Create</span>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to left, transparent, rgba(183,203,69,0.5))' }} />
        </div>

        {/* LET'S — ghost outline */}
        <div className="overflow-hidden mb-0" style={{ opacity: 0 }} ref={letsRef}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)',
              WebkitTextStroke: '1px rgba(255,255,255,0.22)',
              color: 'transparent',
              letterSpacing: '0.16em',
            }}
          >
            LET'S
          </p>
        </div>

        {/* CREATE — lime gradient hero word */}
        <div className="overflow-hidden" style={{ opacity: 0 }} ref={createRef}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(5rem, 16vw, 16rem)',
              letterSpacing: '-0.045em',
              background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 35%, #d4e850 55%, #B7CB45 72%, #8fa832 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 80px rgba(183,203,69,0.6))',
            }}
          >
            CREATE
          </p>
        </div>

        {/* TOGETHER — white solid */}
        <div className="overflow-hidden mb-12" style={{ opacity: 0 }} ref={togetherRef}>
          <p
            className="font-black leading-none text-white select-none"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.8rem)',
              letterSpacing: '-0.01em',
              textShadow: '0 0 60px rgba(255,255,255,0.12)',
            }}
          >
            TOGETHER.
          </p>
        </div>

        {/* Divider with centre dot */}
        <div
          ref={dividerRef}
          className="flex items-center gap-4 w-full max-w-sm mb-10"
          style={{ opacity: 0, transformOrigin: 'center' }}
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.45))' }} />
          <div className="w-2 h-2 rounded-full bg-[#B7CB45] shrink-0" style={{ boxShadow: '0 0 10px rgba(183,203,69,0.9)' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(183,203,69,0.45))' }} />
        </div>

        {/* Description */}
        <div ref={descRef} style={{ opacity: 0 }} className="mb-8">
          <p
            className="text-white/55 leading-relaxed"
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
              maxWidth: '38rem',
              letterSpacing: '0.01em',
            }}
          >
            Your vision deserves a team as ambitious as you are. Whether it's a music video, a full-length film, an event, a brand campaign, or a fashion project — Pixel Party is ready to bring it to life.
          </p>
        </div>

        {/* Service tags */}
        <div
          ref={tagsRef}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
          style={{ opacity: 0 }}
        >
          {tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full"
              style={{
                background: 'rgba(183,203,69,0.08)',
                border: '1px solid rgba(183,203,69,0.2)',
                color: 'rgba(183,203,69,0.75)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ opacity: 0 }}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-wide px-10 py-4 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-100"
            style={{
              background: '#B7CB45',
              color: '#000',
              boxShadow: '0 0 48px rgba(183,203,69,0.45)',
            }}
          >
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:text-[#B7CB45] px-8 py-4"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(183,203,69,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
