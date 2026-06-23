import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import vrGirl from '../assets/VR_girl.png';

gsap.registerPlugin(ScrollTrigger);

function VanishLine({ angle, opacity = 0.06 }: { angle: number; opacity?: number }) {
  return (
    <div
      className="absolute bottom-0 left-1/2 origin-bottom pointer-events-none"
      style={{
        width: 1,
        height: '90vh',
        background: `linear-gradient(to top, rgba(183,203,69,${opacity}), transparent)`,
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
}

export function CreativitySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);
  const line2Ref   = useRef<HTMLDivElement>(null);
  const line3Ref   = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const girlRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      enterTl.fromTo(counterRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' });

      enterTl.fromTo(line1Ref.current,
        { opacity: 0, y: 80, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3');

      enterTl.fromTo(line2Ref.current,
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power3.out' }, '-=0.55');

      enterTl.fromTo(line3Ref.current,
        { opacity: 0, y: 100, skewY: 5 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: 'power3.out' }, '-=0.55');

      enterTl.fromTo(taglineRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4');

      enterTl.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35');

      /* VR girl — slow reveal from right */
      enterTl.fromTo(girlRef.current,
        { opacity: 0, x: 60, scale: 1.04 },
        { opacity: 1, x: 0, scale: 1, duration: 1.4, ease: 'power2.out' }, '-=1.2');

      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 28,
        ease: 'none',
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Vanishing-point perspective lines */}
      <VanishLine angle={-60} opacity={0.07} />
      <VanishLine angle={-38} opacity={0.09} />
      <VanishLine angle={-18} opacity={0.06} />
      <VanishLine angle={0}   opacity={0.05} />
      <VanishLine angle={18}  opacity={0.06} />
      <VanishLine angle={38}  opacity={0.09} />
      <VanishLine angle={60}  opacity={0.07} />

      {/* Horizontal scan accent */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '48%',
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.12), transparent)',
        }}
      />

      {/* Ambient glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(183,203,69,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Rotating geometric ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 'min(90vw, 900px)', height: 'min(90vw, 900px)' }}
      >
        <div
          ref={ringRef}
          className="w-full h-full rounded-full"
          style={{ border: '1px dashed rgba(183,203,69,0.06)' }}
        >
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <div
                key={deg}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: 'rgba(183,203,69,0.38)',
                  boxShadow: '0 0 6px rgba(183,203,69,0.5)',
                  top:  `calc(${50 - Math.cos(rad) * 50}% - 4px)`,
                  left: `calc(${50 + Math.sin(rad) * 50}% - 4px)`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Ghost "02" watermark */}
      <div
        className="absolute inset-0 flex items-center justify-start pl-4 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: 'clamp(14rem, 30vw, 28rem)', opacity: 0.016, color: '#fff' }}
        >
          02
        </span>
      </div>

      {/* ── VR Girl background image ── */}
      <div
        ref={girlRef}
        className="absolute right-0 top-0 bottom-0 w-[55%] lg:w-[52%] pointer-events-none"
        style={{
          opacity: 0,
          /* Fade left edge into black so text stays readable */
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 22%, rgba(0,0,0,0.75) 42%, rgba(0,0,0,1) 65%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 22%, rgba(0,0,0,0.75) 42%, rgba(0,0,0,1) 65%)',
        }}
      >
        {/* Image */}
        <img
          src={vrGirl}
          alt="Creative digital content creator immersed in visual storytelling"
          className="absolute inset-0 w-full h-full object-cover object-right-top"
          style={{ filter: 'brightness(0.55) contrast(1.08)' }}
        />

        {/* Lime-green atmospheric tint overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(183,203,69,0.08) 0%, rgba(183,203,69,0.03) 50%, transparent 100%)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Bottom fade — blends into the section floor */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
          }}
        />

        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, #000000 0%, transparent 100%)',
          }}
        />

        {/* Subtle lime rim glow on the right edge */}
        <div
          className="absolute top-[15%] bottom-[15%] right-0 w-[3px]"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(183,203,69,0.5), transparent)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 lg:px-16 max-w-[1400px] mx-auto">

        {/* Section counter */}
        <div
          ref={counterRef}
          className="flex items-center gap-4 mb-12 lg:mb-16"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-xs text-[#B7CB45]/35 tracking-widest">003</span>
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.4), transparent)' }} />
          <span className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#B7CB45]/60">Our Philosophy</span>
        </div>

        {/* Typography stack */}
        <div className="space-y-2 lg:space-y-4 overflow-hidden">

          <div ref={line1Ref} style={{ opacity: 0 }}>
            <p
              className="font-black leading-none tracking-tight select-none"
              style={{
                fontSize: 'clamp(3.8rem, 11.5vw, 10.5rem)',
                WebkitTextStroke: '1.5px rgba(255,255,255,0.22)',
                color: 'transparent',
                letterSpacing: '-0.03em',
              }}
            >
              CREATIVITY
            </p>
          </div>

          <div ref={line2Ref} className="pl-2 lg:pl-6" style={{ opacity: 0 }}>
            <p
              className="font-black leading-none tracking-tight text-white"
              style={{
                fontSize: 'clamp(2.4rem, 7vw, 6.5rem)',
                letterSpacing: '-0.02em',
                textShadow: '0 0 60px rgba(255,255,255,0.08)',
              }}
            >
              AT ITS
            </p>
          </div>

          <div ref={line3Ref} style={{ opacity: 0 }}>
            <p
              className="font-black leading-none tracking-tight"
              style={{
                fontSize: 'clamp(5rem, 15vw, 14rem)',
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 40%, #B7CB45 70%, #8fa832 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 60px rgba(183,203,69,0.45))',
              }}
            >
              PEAK!
            </p>
          </div>
        </div>

        {/* Tagline + CTA */}
        <div className="mt-12 lg:mt-16 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">

          <div ref={taglineRef} style={{ opacity: 0, maxWidth: '28rem' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1.5px] bg-[#B7CB45]" />
              <div className="w-3 h-[1.5px]" style={{ background: 'rgba(183,203,69,0.4)' }} />
            </div>
            <p className="text-gray-400 text-base lg:text-[17px] leading-relaxed">
              Where imagination shatters limits and every frame is a masterpiece
              waiting to breathe.
            </p>
          </div>

          <div ref={ctaRef} style={{ opacity: 0 }}>
            <a
              href="#"
              className="group inline-flex items-center gap-4 text-sm font-bold tracking-[0.18em] uppercase text-white transition-all duration-300 hover:text-[#B7CB45]"
            >
              <span>View Our Work</span>
              <span
                className="flex items-center justify-center w-12 h-12 rounded-full border border-white/15 transition-all duration-300 group-hover:border-[#B7CB45]/60 group-hover:bg-[#B7CB45]/08"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
