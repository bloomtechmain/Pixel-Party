import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    num: '01',
    title: 'Music Videos',
    sub: 'Concept · Production · Post',
    desc: 'Pixel Party is ready to produce music videos. From mood-board to final cut, we translate sound into stunning visuals — crafting cinematic narratives that amplify your music and captivate audiences across every platform.',
  },
  {
    num: '02',
    title: 'Films',
    sub: 'Direction · Cinematography · Editing',
    desc: 'Pixel Party is ready to make films. Whether it\'s a short film, documentary, or full-length feature, our team brings the full creative and technical expertise needed to tell stories that leave a lasting impression.',
  },
  {
    num: '03',
    title: 'Event Coverage',
    sub: 'Live · Highlight · Documentary',
    desc: 'Pixel Party is ready to cover your event. From intimate gatherings to large-scale productions, we capture every significant moment with precision — delivering polished highlight reels and full event documentaries.',
  },
  {
    num: '04',
    title: 'Brand & Product Marketing',
    sub: 'Strategy · Visuals · Campaign',
    desc: 'Pixel Party is ready to market your brand and product. We craft compelling visual campaigns — product showcases, commercials, and social content — that communicate your value and convert audiences into loyal customers.',
  },
  {
    num: '05',
    title: 'Clothing Partner',
    sub: 'Fashion · Editorial · Lookbook',
    desc: 'Pixel Party is ready to be the clothing partner of your creative project. We collaborate with fashion brands and designers to produce editorial shoots, lookbooks, and campaign visuals that define your aesthetic and elevate your collection.',
  },
];

const stats = [
  { value: 2,  suffix: '+', label: 'Years of Excellence' },
  { value: 20, suffix: '+', label: 'Projects Delivered'  },
  { value: 20, suffix: '+', label: 'Happy Clients'       },
  { value: 5,  suffix: '★', label: 'Client Rating'       },
];

export function AboutSection() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const sectionRef   = useRef<HTMLElement>(null);
  const ringRef      = useRef<HTMLDivElement>(null);
  const counterRef   = useRef<HTMLDivElement>(null);
  const headWe       = useRef<HTMLDivElement>(null);
  const headPixel    = useRef<HTMLDivElement>(null);
  const headParty    = useRef<HTMLDivElement>(null);
  const headStudio   = useRef<HTMLDivElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const quoteRef     = useRef<HTMLDivElement>(null);
  const para1Ref     = useRef<HTMLDivElement>(null);
  const para2Ref     = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const statEls      = useRef<(HTMLSpanElement | null)[]>([]);
  const videoRef     = useRef<HTMLDivElement>(null);
  const readyRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Slow ring rotation ── */
      gsap.to(ringRef.current, {
        rotation: -360,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });

      /* ── Headline stagger ── */
      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      });

      headTl
        .fromTo(counterRef.current,
          { opacity: 0, x: -28 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(headWe.current,
          { opacity: 0, y: 50, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .fromTo(headPixel.current,
          { opacity: 0, y: 80, skewY: 5 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: 'power3.out' }, '-=0.55')
        .fromTo(headParty.current,
          { opacity: 0, y: 80, skewY: 5 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.0, ease: 'power3.out' }, '-=0.7')
        .fromTo(headStudio.current,
          { opacity: 0, y: 40, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.7, ease: 'power3.out' }, '-=0.65')
        .fromTo(dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }, '-=0.4');

      /* ── Content stagger ── */
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      contentTl
        .fromTo(quoteRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' })
        .fromTo(para1Ref.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.45')
        .fromTo(para2Ref.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.45')
        .fromTo(ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.35');

      /* ── Expertise list items ── */
      gsap.fromTo(
        expertiseRef.current!.querySelectorAll('.expertise-item'),
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          stagger: 0.14,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* ── Stat counters count-up ── */
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
              stats.forEach((s, i) => {
                const el = statEls.current[i];
                if (!el) return;
                const proxy = { val: 0 };
                gsap.to(proxy, {
                  val: s.value,
                  duration: 2,
                  ease: 'power2.out',
                  onUpdate: () => {
                    el.textContent = Math.round(proxy.val) + s.suffix;
                  },
                });
              });
            },
          },
        }
      );

      /* ── Ready For cards ── */
      gsap.fromTo(
        readyRef.current!.querySelectorAll('.ready-card'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: readyRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* ── Background video fade-in ── */
      gsap.fromTo(
        videoRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ paddingTop: '10vh', paddingBottom: '14vh', scrollMarginTop: '72px' }}
    >
      {/* ── Background video ── */}
      <div ref={videoRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0, overflow: 'hidden' }}>
        <iframe
          src="https://www.youtube-nocookie.com/embed/RKsunIQlwgg?autoplay=1&mute=1&loop=1&playlist=RKsunIQlwgg&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
          allow="autoplay; encrypted-media"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.78vh',
            transform: 'translate(-50%, -50%) scale(1.25)',
            border: 'none',
            pointerEvents: 'none',
          }}
        />
        {/* Dark overlay so content stays readable */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.80) 100%)' }}
        />
      </div>

      {/* ── Fine grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Ghost watermark "05" ── */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-4 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none"
          style={{ fontSize: 'clamp(14rem, 32vw, 30rem)', opacity: 0.014, color: '#fff' }}
        >
          05
        </span>
      </div>

      {/* ── Slow rotating ring ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%', left: '50%',
          width: 'min(80vw, 860px)', height: 'min(80vw, 860px)',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          ref={ringRef}
          className="w-full h-full rounded-full"
          style={{ border: '1px dashed rgba(183,203,69,0.055)' }}
        >
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <div
                key={deg}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'rgba(183,203,69,0.35)',
                  boxShadow: '0 0 5px rgba(183,203,69,0.4)',
                  top:  `calc(${50 - Math.cos(rad) * 50}% - 3px)`,
                  left: `calc(${50 + Math.sin(rad) * 50}% - 3px)`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ── Ambient top glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(183,203,69,0.06) 0%, transparent 68%)',
        }}
      />

      {/* ── Horizontal lime accent ── */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '38%',
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.1), transparent)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* ── Section counter ── */}
        <div
          ref={counterRef}
          className="flex items-center gap-4 mb-16"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-xs text-[#B7CB45]/35 tracking-widest">005</span>
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.4), transparent)' }} />
          <span className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#B7CB45]/60">About Us</span>
        </div>

        {/* ── Top area: headline + expertise list ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">

          {/* LEFT — headline typography */}
          <div className="lg:w-[58%]">
            <div className="overflow-hidden mb-1">
              <div ref={headWe} style={{ opacity: 0 }}>
                <p
                  className="font-black leading-none select-none"
                  style={{
                    fontSize: 'clamp(1.6rem, 4vw, 3.8rem)',
                    WebkitTextStroke: '1px rgba(255,255,255,0.22)',
                    color: 'transparent',
                    letterSpacing: '0.05em',
                  }}
                >
                  WE ARE
                </p>
              </div>
            </div>

            <div className="overflow-hidden">
              <div ref={headPixel} style={{ opacity: 0 }}>
                <p
                  className="font-black leading-none select-none"
                  style={{
                    fontSize: 'clamp(4.5rem, 13vw, 12rem)',
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 40%, #B7CB45 68%, #8fa832 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 55px rgba(183,203,69,0.45))',
                  }}
                >
                  PIXEL
                </p>
              </div>
            </div>

            <div className="overflow-hidden">
              <div ref={headParty} style={{ opacity: 0 }}>
                <p
                  className="font-black leading-none select-none"
                  style={{
                    fontSize: 'clamp(4.5rem, 13vw, 12rem)',
                    letterSpacing: '-0.04em',
                    WebkitTextStroke: '2px rgba(255,255,255,0.18)',
                    color: 'transparent',
                  }}
                >
                  PARTY
                </p>
              </div>
            </div>

            <div className="overflow-hidden pl-2 lg:pl-4 mt-1">
              <div ref={headStudio} style={{ opacity: 0 }}>
                <p
                  className="font-black leading-none text-white"
                  style={{
                    fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)',
                    letterSpacing: '0.08em',
                    textShadow: '0 0 40px rgba(255,255,255,0.08)',
                  }}
                >
                  STUDIO
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              ref={dividerRef}
              className="mt-10 lg:mt-12 h-px w-full max-w-sm"
              style={{
                background: 'linear-gradient(to right, #B7CB45, rgba(183,203,69,0.2), transparent)',
                transformOrigin: 'left',
                opacity: 0,
              }}
            />
          </div>

          {/* RIGHT — expertise list */}
          <div
            ref={expertiseRef}
            className="lg:w-[42%] flex flex-col justify-end pb-2 lg:pl-16"
          >
            <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/50 mb-8">
              What We Do
            </p>
            <div className="space-y-0">
              {expertise.map((item) => {
                const isOpen = activeItem === item.num;
                return (
                  <div
                    key={item.num}
                    className="expertise-item"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)', opacity: 0 }}
                  >
                    {/* Clickable row */}
                    <button
                      onClick={() => setActiveItem(isOpen ? null : item.num)}
                      className="group w-full flex items-start gap-5 py-5 cursor-pointer text-left"
                    >
                      <span
                        className="font-mono text-[10px] tracking-widest mt-1 shrink-0 transition-colors duration-300"
                        style={{
                          minWidth: '2rem',
                          color: isOpen ? '#B7CB45' : 'rgba(183,203,69,0.4)',
                        }}
                      >
                        {item.num}
                      </span>
                      <div className="flex-1">
                        <p
                          className="font-bold text-base lg:text-lg leading-tight mb-1 transition-colors duration-300"
                          style={{
                            letterSpacing: '-0.01em',
                            color: isOpen ? '#B7CB45' : '#fff',
                          }}
                        >
                          {item.title}
                        </p>
                        <p className="text-[11px] text-white/35 tracking-[0.12em] uppercase font-medium">
                          {item.sub}
                        </p>
                      </div>
                      {/* Plus / minus toggle icon */}
                      <div
                        className="shrink-0 mt-1 flex items-center justify-center transition-all duration-300"
                        style={{ color: isOpen ? '#B7CB45' : 'rgba(255,255,255,0.4)' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                          stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 2v10M2 7h10" style={{
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                            transformOrigin: 'center',
                            transition: 'transform 0.3s ease',
                          }} />
                        </svg>
                      </div>
                    </button>

                    {/* Description panel */}
                    <div
                      style={{
                        maxHeight: isOpen ? '120px' : '0px',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <p
                        className="text-white/55 text-sm leading-relaxed pb-5"
                        style={{ paddingLeft: '3rem' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
            </div>
          </div>
        </div>

        {/* ── Mission statement + paragraphs ── */}
        <div className="mt-20 lg:mt-24 flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Pull quote */}
          <div className="lg:w-[48%]">
            <div ref={quoteRef} style={{ opacity: 0 }}>
              {/* Lime quote mark */}
              <div
                className="font-black leading-none text-[#B7CB45] mb-4 select-none"
                style={{ fontSize: '5rem', lineHeight: 0.7, opacity: 0.25 }}
                aria-hidden
              >
                "
              </div>
              <p
                className="text-white font-semibold leading-snug"
                style={{
                  fontSize: 'clamp(1.25rem, 2.6vw, 2rem)',
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 40px rgba(255,255,255,0.06)',
                }}
              >
                Crafting visual stories that define brands and move audiences — one pixel at a time.
              </p>
            </div>
          </div>

          {/* Body paragraphs + CTA */}
          <div className="lg:w-[52%] flex flex-col justify-center gap-6">
            <div ref={para1Ref} style={{ opacity: 0 }}>
              <p className="text-white/55 text-base lg:text-[17px] leading-relaxed">
                Born from a deep passion for visual storytelling, Pixel Party Studio stands at the
                intersection of artistic vision and technical mastery. Every project we take on is
                a new canvas — an opportunity to push boundaries and craft something genuinely
                remarkable.
              </p>
            </div>
            <div ref={para2Ref} style={{ opacity: 0 }}>
              <p className="text-white/40 text-base lg:text-[17px] leading-relaxed">
                From the first concept sketch to the final render, our team of dedicated creatives
                ensures every frame exceeds expectations. We don't just produce content — we
                architect experiences that linger long after the screen goes dark.
              </p>
            </div>
            <div ref={ctaRef} style={{ opacity: 0 }}>
              <a
                href="#"
                className="group inline-flex items-center gap-4 text-sm font-bold tracking-[0.18em] uppercase text-white transition-all duration-300 hover:text-[#B7CB45] mt-2"
              >
                <span>Our Full Story</span>
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-full border border-white/15 transition-all duration-300 group-hover:border-[#B7CB45]/60"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Ready For ── */}
        <div ref={readyRef} className="mt-20 lg:mt-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.5))' }} />
            <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/55">
              Pixel Party Is Ready For
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.2), transparent)' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                  </svg>
                ),
                title: 'Music Videos',
                desc: 'Cinematic visuals that amplify your sound',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                    <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" />
                    <line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" />
                    <line x1="17" y1="7" x2="22" y2="7" />
                  </svg>
                ),
                title: 'Films',
                desc: 'Full-scale narrative and documentary filmmaking',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                ),
                title: 'Event Coverage',
                desc: 'Every moment captured, nothing missed',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                ),
                title: 'Brand & Product Marketing',
                desc: 'Visuals that convert audiences into customers',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z" />
                  </svg>
                ),
                title: 'Clothing Partner',
                desc: 'Creative visuals for fashion & apparel projects',
              },
            ].map(item => (
              <div
                key={item.title}
                className="ready-card group rounded-2xl p-5 transition-all duration-300 cursor-default"
                style={{
                  opacity: 0,
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(183,203,69,0.06)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(183,203,69,0.25)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(183,203,69,0.08)', border: '1px solid rgba(183,203,69,0.18)' }}
                >
                  {item.icon}
                </div>
                <p className="text-white font-bold text-sm mb-1.5 leading-tight" style={{ letterSpacing: '-0.01em' }}>
                  {item.title}
                </p>
                <p className="text-white/35 text-[12px] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div
          ref={statsRef}
          className="mt-20 lg:mt-28"
          style={{ opacity: 0 }}
        >
          {/* Top border with lime accent */}
          <div className="flex items-center gap-4 mb-12">
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.5), rgba(255,255,255,0.06))' }}
            />
            <span className="text-[8px] font-mono text-[#B7CB45]/40 tracking-[0.3em] uppercase shrink-0">
              By The Numbers
            </span>
            <div
              className="h-px flex-1"
              style={{ background: 'linear-gradient(to left, rgba(183,203,69,0.5), rgba(255,255,255,0.06))' }}
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center py-10 px-6 text-center bg-black group hover:bg-[rgba(183,203,69,0.03)] transition-colors duration-500"
              >
                {/* Corner accent on hover */}
                <div className="relative mb-3">
                  <span
                    ref={(el) => { statEls.current[i] = el; }}
                    className="font-black text-white"
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                      letterSpacing: '-0.03em',
                      textShadow: '0 0 40px rgba(183,203,69,0.2)',
                    }}
                  >
                    0{s.suffix}
                  </span>
                  {/* Lime underline that grows on hover */}
                  <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{ background: '#B7CB45' }}
                  />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
