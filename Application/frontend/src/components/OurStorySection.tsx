import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import nextVideo from '../assets/nextvideo.mp4';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Pre-Production',
    desc: 'Story concepts, mood boards, shot lists, and meticulous planning so every frame has a reason to exist.',
  },
  {
    num: '02',
    title: 'Direction & Shoot',
    desc: 'On-set direction, cinematography, and lighting design — capturing raw footage with intention and precision.',
  },
  {
    num: '03',
    title: 'Post & Grade',
    desc: 'Colour grading, sound design, VFX compositing, and polished delivery that exceeds every expectation.',
  },
];

const teamHighlights = [
  { label: 'Speciality', value: 'Narrative & Commercial' },
  { label: 'Workflow',   value: 'Concept to Delivery'   },
  { label: 'Approach',  value: 'Emotion-Driven Craft'  },
];

export function OurStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const stripRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Background video fade in */
      gsap.fromTo(videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } });

      /* Counter */
      gsap.fromTo(counterRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' } });

      /* Headline */
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 52 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } });

      /* Left + right columns */
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });

      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });

      /* Step stagger */
      gsap.fromTo(
        leftRef.current!.querySelectorAll('.step-item'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.55, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } });

      /* Highlight stagger */
      gsap.fromTo(
        rightRef.current!.querySelectorAll('.highlight-item'),
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.55, stagger: 0.13, ease: 'power2.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } });

      /* Strip */
      gsap.fromTo(stripRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: stripRef.current, start: 'top 90%', toggleActions: 'play none none reverse' } });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '10vh', paddingBottom: '13vh' }}
    >
      {/* ── Background video ── */}
      <div ref={videoRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
        <video
          src={nextVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full"
          style={{ objectFit: 'cover', display: 'block' }}
        />
        {/* Dark gradient overlay — heavier on edges, lighter in center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.82) 100%)',
          }}
        />
      </div>

      {/* Fine grid on top of video */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Ghost watermark */}
      <div
        className="absolute inset-0 flex items-center justify-start pl-4 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none"
          style={{ fontSize: 'clamp(14rem, 32vw, 30rem)', opacity: 0.018, color: '#fff' }}
        >
          06
        </span>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Counter */}
        <div
          ref={counterRef}
          className="flex items-center gap-4 mb-16"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-xs text-[#B7CB45]/35 tracking-widest">006</span>
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.4), transparent)' }} />
          <span className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#B7CB45]/60">Our Story</span>
        </div>

        {/* Headline */}
        <div ref={headRef} className="mb-16 lg:mb-20" style={{ opacity: 0 }}>
          <div className="overflow-hidden mb-1">
            <p
              className="font-black leading-none select-none"
              style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 3.2rem)',
                WebkitTextStroke: '1px rgba(255,255,255,0.22)',
                color: 'transparent',
                letterSpacing: '0.06em',
              }}
            >
              EVERY
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              className="font-black leading-none select-none"
              style={{
                fontSize: 'clamp(4rem, 11vw, 10rem)',
                letterSpacing: '-0.04em',
                background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 40%, #B7CB45 68%, #8fa832 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 55px rgba(183,203,69,0.5))',
              }}
            >
              FRAME
            </p>
          </div>
          <div className="overflow-hidden pl-2 lg:pl-4">
            <p
              className="font-black leading-none text-white"
              style={{
                fontSize: 'clamp(1.6rem, 4vw, 3.8rem)',
                letterSpacing: '0.04em',
                textShadow: '0 0 40px rgba(255,255,255,0.1)',
              }}
            >
              A STORY
            </p>
          </div>
        </div>

        {/* Two-column content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* LEFT — Our Process */}
          <div ref={leftRef} className="lg:w-[48%]" style={{ opacity: 0 }}>
            <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/60 mb-8">
              Our Process
            </p>
            <div>
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="step-item py-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)', opacity: 0 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] text-[#B7CB45]/50 tracking-widest shrink-0">
                      {s.num}
                    </span>
                    <p className="text-white font-bold text-sm leading-tight" style={{ letterSpacing: '-0.01em' }}>
                      {s.title}
                    </p>
                  </div>
                  <p className="text-white/45 text-[12px] leading-relaxed" style={{ paddingLeft: '1.6rem' }}>
                    {s.desc}
                  </p>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
            </div>
          </div>

          {/* RIGHT — The Team */}
          <div ref={rightRef} className="lg:w-[48%] flex flex-col justify-center" style={{ opacity: 0 }}>
            <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/60 mb-8">
              The Team
            </p>

            {/* Pull quote */}
            <div className="mb-10">
              <div
                className="font-black leading-none text-[#B7CB45] select-none mb-3"
                style={{ fontSize: '4rem', lineHeight: 0.7, opacity: 0.25 }}
                aria-hidden
              >
                "
              </div>
              <p
                className="text-white/80 font-semibold leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', letterSpacing: '-0.01em' }}
              >
                We don't just point a camera — we architect emotion, one deliberate pixel at a time.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-5 mb-10">
              {teamHighlights.map((item) => (
                <div
                  key={item.label}
                  className="highlight-item flex items-start gap-3"
                  style={{ opacity: 0 }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#B7CB45] mt-1.5 shrink-0"
                    style={{ boxShadow: '0 0 6px rgba(183,203,69,0.7)' }}
                  />
                  <div>
                    <p className="text-[9px] text-white/35 tracking-[0.18em] uppercase font-medium mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-white/75 text-sm font-semibold">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Closing line */}
            <div
              className="pt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-white/35 text-[11px] leading-relaxed tracking-wide">
                Every project begins with listening — understanding the vision before a single lens is lifted.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom strip */}
        <div
          ref={stripRef}
          className="mt-16 lg:mt-20 flex items-center gap-5"
          style={{ opacity: 0 }}
        >
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.45), rgba(255,255,255,0.04))' }} />
          <span className="text-[9px] font-mono tracking-[0.32em] uppercase text-white/25 shrink-0">
            Direction · Cinematography · Grade · Deliver
          </span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(183,203,69,0.45), rgba(255,255,255,0.04))' }} />
        </div>

      </div>
    </section>
  );
}
