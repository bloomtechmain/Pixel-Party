import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const superMomentsVideo = 'https://pub-88f16f8528f244df978fe5773f5d5f59.r2.dev/super%20moments.mp4';

gsap.registerPlugin(ScrollTrigger);

function ViewfinderBrackets() {
  const base = 'absolute w-8 h-8 z-20';
  const color = 'border-[#B7CB45]/70';
  const t = 'border-[1.5px]';
  return (
    <>
      <div className={`${base} top-4 left-4 border-t ${t} border-l ${t} ${color}`} />
      <div className={`${base} top-4 right-4 border-t ${t} border-r ${t} ${color}`} />
      <div className={`${base} bottom-4 left-4 border-b ${t} border-l ${t} ${color}`} />
      <div className={`${base} bottom-4 right-4 border-b ${t} border-r ${t} ${color}`} />
    </>
  );
}

export function StartFilmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const letsRef    = useRef<HTMLDivElement>(null);
  const startRef   = useRef<HTMLDivElement>(null);
  const filmRef    = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const descRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        trigger: sectionRef.current,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      };

      /* Left video panel slides in from left */
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: st });

      /* Right text staggers */
      const tl = gsap.timeline({ scrollTrigger: st });
      tl.fromTo(counterRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(letsRef.current,
          { opacity: 0, y: 40, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: 'power3.out' }, '-=0.2')
        .fromTo(startRef.current,
          { opacity: 0, y: 55, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.85, ease: 'power3.out' }, '-=0.45')
        .fromTo(filmRef.current,
          { opacity: 0, y: 70, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.95, ease: 'power3.out' }, '-=0.55')
        .fromTo(dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .fromTo(descRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .fromTo(ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden flex flex-col lg:flex-row"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Fine grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Ambient lime halo – right ── */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(183,203,69,0.07) 0%, transparent 65%)' }}
      />
      <div
        className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(183,203,69,0.05) 0%, transparent 65%)' }}
      />

      {/* ── Ghost "08" watermark – right-aligned ── */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-6 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: 'clamp(14rem, 28vw, 28rem)', opacity: 0.025, color: '#fff' }}
        >
          08
        </span>
      </div>

      {/* ── Floating orbs – right side ── */}
      <div className="absolute w-1 h-1 rounded-full pointer-events-none"
        style={{ top: '20%', right: '6%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.18, animation: 'floatY 4.4s ease-in-out 0s infinite' }} />
      <div className="absolute w-[5px] h-[5px] rounded-full pointer-events-none"
        style={{ bottom: '25%', right: '4%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.12, animation: 'floatY 5.8s ease-in-out 1.2s infinite' }} />

      {/* ════ LEFT – Full-bleed video panel ════ */}
      <div
        ref={leftRef}
        className="relative w-full lg:w-[50%] overflow-hidden order-last lg:order-first"
        style={{ minHeight: 'min(56vw, 100vh)', opacity: 0 }}
      >
        {/* Video fills entire panel */}
        <video
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover' }}
          src={superMomentsVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Right edge blend into black (text side) */}
        <div
          className="absolute inset-y-0 right-0 w-[35%] z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #000000 0%, rgba(0,0,0,0.6) 55%, transparent 100%)' }}
        />

        {/* Top/bottom edge fade */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.45) 100%)' }}
        />

        {/* Film scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
          }}
        />

        {/* Top sheen line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#B7CB45]/30 via-[#B7CB45]/60 to-transparent z-20" />

        {/* Left edge lime line */}
        <div
          className="absolute top-0 left-0 bottom-0 w-px z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(183,203,69,0.35) 30%, rgba(183,203,69,0.35) 70%, transparent 100%)' }}
        />

        {/* ViewfinderBrackets */}
        <ViewfinderBrackets />

        {/* Camera HUD – top */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-3 z-20 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
            <span className="font-mono text-[10px] font-bold text-white/70 tracking-widest">REC</span>
          </div>
          <div className="flex items-center gap-2 mr-[30%]">
            <span className="text-[10px] font-mono text-[#B7CB45]/70 tracking-widest font-bold">4K</span>
            <span className="text-[10px] font-mono text-white/30">UHD</span>
          </div>
        </div>

        {/* Camera HUD – bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-3 pt-12 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20 pointer-events-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-white/40 tracking-wider">TC</span>
              <span className="font-mono text-[11px] text-white/60 tracking-widest">00:00:08:00</span>
            </div>
            <div className="flex items-center gap-3 mr-[30%]">
              <span className="font-mono text-[10px] text-white/30">ISO 800</span>
              <span className="w-px h-3 bg-white/10" />
              <span className="font-mono text-[10px] text-[#B7CB45]/50 tracking-wider">24fps</span>
            </div>
          </div>
        </div>

        {/* 4K badge – top left corner */}
        <div
          className="absolute top-6 left-6 w-14 h-14 rounded-2xl flex flex-col items-center justify-center z-30"
          style={{
            background: 'rgba(183,203,69,0.08)',
            border: '1px solid rgba(183,203,69,0.2)',
            backdropFilter: 'blur(12px)',
            animation: 'fadeIn 1s ease 0.8s both',
          }}
        >
          <span className="text-[#B7CB45] font-black text-base leading-none">4K</span>
          <span className="text-white/30 text-[8px] tracking-wider mt-0.5">ULTRA</span>
        </div>
      </div>

      {/* ════ RIGHT – Text content ════ */}
      <div className="relative z-10 w-full lg:w-[50%] flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 py-28 lg:py-24">

        {/* Section counter */}
        <div ref={counterRef} className="flex items-center gap-4 mb-10" style={{ opacity: 0 }}>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.5))' }} />
          <span className="font-mono text-[9px] text-[#B7CB45]/40 tracking-[0.32em] uppercase">008</span>
          <span className="text-[8px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/55">Start Your Film</span>
        </div>

        {/* LET'S */}
        <div className="overflow-hidden mb-1" style={{ opacity: 0 }} ref={letsRef}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2.8rem)',
              WebkitTextStroke: '1px rgba(255,255,255,0.2)',
              color: 'transparent',
              letterSpacing: '0.14em',
            }}
          >
            LET'S
          </p>
        </div>

        {/* START YOUR */}
        <div className="overflow-hidden mb-1" style={{ opacity: 0 }} ref={startRef}>
          <p
            className="font-black leading-none text-white select-none"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.8rem)',
              letterSpacing: '-0.01em',
              textShadow: '0 0 60px rgba(255,255,255,0.12)',
            }}
          >
            START YOUR
          </p>
        </div>

        {/* FILM */}
        <div className="overflow-hidden mb-10" style={{ opacity: 0 }} ref={filmRef}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(4rem, 11vw, 11rem)',
              letterSpacing: '-0.045em',
              background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 35%, #d4e850 55%, #B7CB45 72%, #8fa832 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 60px rgba(183,203,69,0.55))',
            }}
          >
            FILM!
          </p>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="flex items-center gap-4 w-full max-w-xs mb-8"
          style={{ opacity: 0, transformOrigin: 'left' }}
        >
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.45), transparent)' }} />
          <div className="w-2 h-2 rounded-full bg-[#B7CB45] shrink-0" style={{ boxShadow: '0 0 10px rgba(183,203,69,0.9)' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, rgba(183,203,69,0.45), transparent)' }} />
        </div>

        {/* Description */}
        <div ref={descRef} style={{ opacity: 0 }} className="mb-10">
          <p
            className="text-white/55 leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', maxWidth: '30rem', letterSpacing: '0.01em' }}
          >
            Every great film begins with a single frame. Let us turn your vision into a cinematic journey — from the first scene to the final cut, we make your story unforgettable.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-100"
            style={{ background: '#B7CB45', color: '#000', boxShadow: '0 0 36px rgba(183,203,69,0.42)' }}
          >
            Start Filming
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:text-[#B7CB45] px-6 py-4"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(183,203,69,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
          >
            View Filmography
          </a>
        </div>
      </div>
    </section>
  );
}
