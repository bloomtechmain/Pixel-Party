import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import careerBg from '../assets/career.png';

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    title: 'Professional Portfolio',
    desc: 'Walk away with cinematic-quality footage and stills purpose-built for your personal reel and social presence.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
  {
    title: 'Brand Exposure',
    desc: 'Get featured across our platforms and reach a fast-growing audience of brands, agencies, and creative scouts.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    title: 'Career Mentorship',
    desc: 'Learn on-set from our directors, DPs, and creative directors — real guidance that accelerates your growth.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    title: 'Commercial Projects',
    desc: 'Collaborate on real brand campaigns, music videos, and commercial productions that pad your professional credits.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
      </svg>
    ),
  },
  {
    title: 'Industry Network',
    desc: 'Get introduced to casting directors, talent agencies, and brand partners actively looking for fresh faces.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Creative Freedom',
    desc: 'Bring your own ideas to the table — every shoot is a two-way creative partnership, not just a job.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

function BenefitCard({ title, desc, icon }: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => {
      el.style.borderColor = 'rgba(183,203,69,0.3)';
      el.style.background   = 'rgba(183,203,69,0.05)';
    };
    const onLeave = () => {
      el.style.borderColor = 'rgba(255,255,255,0.07)';
      el.style.background   = 'rgba(255,255,255,0.03)';
    };
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="benefit-card p-5 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0"
        style={{
          background: 'rgba(183,203,69,0.1)',
          border: '1px solid rgba(183,203,69,0.2)',
        }}
      >
        {icon}
      </div>
      <h4 className="text-white font-bold text-sm mb-2">{title}</h4>
      <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

export function ArtistManagementSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLDivElement>(null);
  const line2Ref    = useRef<HTMLDivElement>(null);
  const line3Ref    = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const descRef     = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        trigger: sectionRef.current,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      };

      gsap.fromTo(rightRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: st });

      const cards = rightRef.current?.querySelectorAll('.benefit-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 28, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power2.out', stagger: 0.08,
            scrollTrigger: { ...st, start: 'top 60%' } });
      }

      const tl = gsap.timeline({ scrollTrigger: st });
      tl.fromTo(counterRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(line1Ref.current,
          { opacity: 0, y: 40, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: 'power3.out' }, '-=0.2')
        .fromTo(line2Ref.current,
          { opacity: 0, y: 55, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.85, ease: 'power3.out' }, '-=0.45')
        .fromTo(line3Ref.current,
          { opacity: 0, y: 60, skewY: 4 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.85, ease: 'power3.out' }, '-=0.55')
        .fromTo(dividerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .fromTo(descRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.35')
        .fromTo(ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex flex-col lg:flex-row"
      style={{ minHeight: '100vh' }}
    >
      {/* Background photo */}
      <img
        src={careerBg}
        alt="Pixel Party creative studio team working on cinematic video production"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Dark overlay so content stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.82)' }}
      />

      {/* Fine grid on top of overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(183,203,69,0.07) 0%, transparent 65%)' }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(183,203,69,0.05) 0%, transparent 65%)' }}
      />

      {/* Ghost watermark */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-6 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: 'clamp(12rem, 26vw, 26rem)', opacity: 0.022, color: '#fff' }}
        >
          AM
        </span>
      </div>

      {/* Floating orbs */}
      <div className="absolute w-[3px] h-[3px] rounded-full pointer-events-none"
        style={{ top: '20%', right: '5%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.18, animation: 'floatY 4.8s ease-in-out 0.5s infinite' }} />
      <div className="absolute w-[5px] h-[5px] rounded-full pointer-events-none"
        style={{ bottom: '28%', right: '3%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.12, animation: 'floatY 6s ease-in-out 1.8s infinite' }} />

      {/* ════ LEFT – Text content ════ */}
      <div className="relative z-10 w-full lg:w-[48%] flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 py-28 lg:py-24">

        {/* Section counter */}
        <div ref={counterRef} className="flex items-center gap-4 mb-10" style={{ opacity: 0 }}>
          <div className="h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.5))' }} />
          <span className="font-mono text-[9px] text-[#B7CB45]/40 tracking-[0.32em] uppercase">006</span>
          <span className="text-[8px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/55">Artist Management</span>
        </div>

        {/* BUILD YOUR */}
        <div className="overflow-hidden mb-1" style={{ opacity: 0 }} ref={line1Ref}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2.8rem)',
              WebkitTextStroke: '1px rgba(255,255,255,0.2)',
              color: 'transparent',
              letterSpacing: '0.12em',
            }}
          >
            BUILD YOUR
          </p>
        </div>

        {/* CAREER */}
        <div className="overflow-hidden mb-1" style={{ opacity: 0 }} ref={line2Ref}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              letterSpacing: '-0.045em',
              background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 35%, #d4e850 55%, #B7CB45 72%, #8fa832 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 50px rgba(183,203,69,0.5))',
            }}
          >
            CAREER
          </p>
        </div>

        {/* WITH US. */}
        <div className="overflow-hidden mb-10" style={{ opacity: 0 }} ref={line3Ref}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              letterSpacing: '-0.045em',
              WebkitTextStroke: '2px rgba(255,255,255,0.22)',
              color: 'transparent',
            }}
          >
            WITH US.
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
            Through Artist Management, Pixel Party LK Pvt Ltd focuses on building the next
            generation of Sri Lankan talent through strategic branding, content development,
            media exposure, event opportunities, and commercial partnerships. Our strategy is
            to create long-term artist value by combining entertainment, digital media,
            advertising, and strong industry networking under one creative platform.
            We are specifically focused on the PR development and brand positioning of artists
            associated with Pixel Party.
          </p>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-100"
            style={{ background: '#B7CB45', color: '#000', boxShadow: '0 0 36px rgba(183,203,69,0.42)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Apply as an Artist
          </a>
          <a
            href="#artist-benefits"
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:text-[#B7CB45] px-6 py-4"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(183,203,69,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
          >
            See What We Offer
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M6 2l4 4-4 4"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ════ RIGHT – Benefits grid ════ */}
      <div
        id="artist-benefits"
        ref={rightRef}
        className="relative z-10 w-full lg:w-[52%] flex items-center py-16 lg:py-24 px-8 sm:px-12 lg:px-10 xl:px-14"
        style={{ opacity: 0 }}
      >
        {/* Top sheen line (desktop left edge) */}
        <div
          className="hidden lg:block absolute top-0 left-0 bottom-0 w-px pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(183,203,69,0.2) 30%, rgba(183,203,69,0.2) 70%, transparent 100%)' }}
        />

        <div className="w-full">
          {/* Sub-header */}
          <div className="mb-8">
            <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/55 mb-2">
              What You Get
            </p>
            <h3
              className="font-black text-white leading-tight"
              style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)', letterSpacing: '-0.02em' }}
            >
              Everything you need to{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 60%, #8fa832 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                stand out.
              </span>
            </h3>
          </div>

          {/* 3 × 2 benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b) => (
              <BenefitCard key={b.title} {...b} />
            ))}
          </div>

          {/* Bottom note */}
          <div className="mt-8 flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(183,203,69,0.1)', border: '1px solid rgba(183,203,69,0.2)' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <p className="text-white/35 text-xs leading-relaxed">
              Interested? Reach us at{' '}
              <a
                href="mailto:pixelpartysrilanka@gmail.com"
                className="text-[#B7CB45]/70 hover:text-[#B7CB45] transition-colors duration-200"
              >
                pixelpartysrilanka@gmail.com
              </a>{' '}
              or call <span className="text-white/50">011 20 98 178</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
