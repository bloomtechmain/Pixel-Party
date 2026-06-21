import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../assets/video_latest.mp4';

gsap.registerPlugin(ScrollTrigger);

function Orb({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{ boxShadow: '0 0 12px #B7CB45', background: '#B7CB45', ...style }}
    />
  );
}

export function VideoRevealSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const bgVideoRef  = useRef<HTMLDivElement>(null);
  const tilesRef    = useRef<HTMLDivElement>(null);
  const centerRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Background video fade in */
      gsap.fromTo(bgVideoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } });

      /* Center content */
      gsap.fromTo(centerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', toggleActions: 'play none none reverse' } });

      /* Text tiles staggered entrance */
      gsap.fromTo(
        tilesRef.current!.querySelectorAll('.text-tile'),
        { opacity: 0, y: 24, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', toggleActions: 'play none none reverse' } });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100vh', paddingTop: '8vh', paddingBottom: '12vh' }}
    >
      {/* ── Background video ── */}
      <div ref={bgVideoRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full"
          style={{ objectFit: 'cover', display: 'block' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.82) 100%)',
          }}
        />
      </div>

      {/* Fine lime grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(183,203,69,0.022) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(183,203,69,0.022) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particle orbs */}
      <Orb style={{ top: '18%', left: '8%',  width: 4, height: 4, opacity: 0.18, animation: 'floatY 4.2s ease-in-out 0s infinite' }} />
      <Orb style={{ top: '72%', left: '6%',  width: 3, height: 3, opacity: 0.12, animation: 'floatY 5.5s ease-in-out 1s infinite' }} />
      <Orb style={{ top: '14%', right: '9%', width: 5, height: 5, opacity: 0.15, animation: 'floatY 3.8s ease-in-out 0.5s infinite' }} />
      <Orb style={{ top: '78%', right: '7%', width: 3, height: 3, opacity: 0.10, animation: 'floatY 6s ease-in-out 2s infinite' }} />
      <Orb style={{ top: '45%', left: '4%',  width: 2, height: 2, opacity: 0.14, animation: 'floatY 4.8s ease-in-out 1.5s infinite' }} />
      <Orb style={{ top: '32%', right: '5%', width: 3, height: 3, opacity: 0.12, animation: 'floatY 5s ease-in-out 0.8s infinite' }} />

      {/* Section label — top */}
      <div
        className="relative z-10 flex items-center gap-4 max-w-[1200px] mx-auto px-8 mb-8"
        style={{ animation: 'fadeIn 1s ease 0.3s both' }}
      >
        <span className="font-mono text-xs text-[#B7CB45]/35 tracking-widest">002</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.25), transparent)' }} />
        <span className="text-[#B7CB45] text-[9px] font-semibold tracking-[0.28em] uppercase">Behind The Lens</span>
      </div>

      {/* ── Text tiles scattered around ── */}
      <div ref={tilesRef} className="absolute inset-0 pointer-events-none z-20 hidden lg:block">

        {/* Tile 1 — Top-left: Visual Storytelling */}
        <div className="text-tile absolute" style={{ top: '16%', left: '3%', opacity: 0 }}>
          <div style={{
            transform: 'rotate(-4deg)', animation: 'tileFloat 4.6s ease-in-out 0s infinite',
            width: 158, background: 'rgb(6,6,6)', borderLeft: '3px solid #B7CB45',
            boxShadow: '0 8px 32px rgba(0,0,0,0.7), -4px 0 20px rgba(183,203,69,0.08)', padding: '14px 16px',
          }}>
            <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#B7CB45', opacity: 0.7, marginBottom: 6 }}>Vision</p>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.25, letterSpacing: '-0.01em' }}>Visual<br/>Storytelling</p>
            <div style={{ width: 24, height: 1, background: 'rgba(183,203,69,0.4)', margin: '8px 0' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, lineHeight: 1.5 }}>
              Where imagination meets the lens to craft moments that linger.
            </p>
          </div>
        </div>

        {/* Tile 2 — Top-right: Cinematic Vision */}
        <div className="text-tile absolute" style={{ top: '12%', right: '3%', opacity: 0 }}>
          <div style={{
            transform: 'rotate(3deg)', animation: 'tileFloat 5.2s ease-in-out 0.7s infinite',
            width: 154, background: 'rgb(12,14,5)', border: '1px solid rgba(183,203,69,0.45)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.75), 0 0 24px rgba(183,203,69,0.06)', padding: '14px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B7CB45', boxShadow: '0 0 8px #B7CB45', flexShrink: 0 }} />
              <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#B7CB45', opacity: 0.75 }}>Craft</p>
            </div>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.25, letterSpacing: '-0.01em' }}>Cinematic<br/>Vision</p>
            <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 10, lineHeight: 1.5, marginTop: 8 }}>
              Every frame is a canvas painted with light and pure intention.
            </p>
          </div>
        </div>

        {/* Tile 3 — Left-center: vertical decorative */}
        <div className="text-tile absolute" style={{ top: '36%', left: '0.8%', opacity: 0 }}>
          <div style={{ animation: 'tileFloat 3.9s ease-in-out 0.3s infinite', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, #B7CB45)' }} />
            <p style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 9, fontWeight: 800, letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>Cinematic</p>
            <p style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 8, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(183,203,69,0.5)' }}>Excellence</p>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(to top, transparent, #B7CB45)' }} />
          </div>
        </div>

        {/* Tile 4 — Right-center: Creative Direction */}
        <div className="text-tile absolute" style={{ top: '44%', right: '2.5%', opacity: 0 }}>
          <div style={{
            transform: 'rotate(-2deg)', animation: 'tileFloat 4.9s ease-in-out 1.3s infinite',
            width: 150, background: 'rgb(8,8,8)', borderTop: '2px solid #B7CB45',
            boxShadow: '0 8px 32px rgba(0,0,0,0.8), 0 -4px 20px rgba(183,203,69,0.07)', padding: '14px 15px',
          }}>
            <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#B7CB45', opacity: 0.7, marginBottom: 6 }}>Process</p>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.25, letterSpacing: '-0.01em' }}>Creative<br/>Direction</p>
            <div style={{ width: 24, height: 1, background: 'rgba(183,203,69,0.35)', margin: '8px 0' }} />
            <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 10, lineHeight: 1.5 }}>
              From raw concept to a polished, breathtaking masterpiece.
            </p>
          </div>
        </div>

        {/* Tile 5 — Bottom-left: Motion & VFX */}
        <div className="text-tile absolute" style={{ bottom: '18%', left: '3%', opacity: 0 }}>
          <div style={{
            transform: 'rotate(2.5deg)', animation: 'tileFloat 5s ease-in-out 0.4s infinite',
            width: 156, background: 'linear-gradient(135deg, rgb(10,12,3) 0%, rgb(6,6,6) 100%)',
            border: '1px solid rgba(183,203,69,0.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.75), inset 0 0 24px rgba(183,203,69,0.03)', padding: '14px 16px',
          }}>
            <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#B7CB45', opacity: 0.7, marginBottom: 6 }}>Motion</p>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.25, letterSpacing: '-0.01em' }}>Motion &<br/>VFX</p>
            <div style={{ width: 24, height: 1, background: 'rgba(183,203,69,0.4)', margin: '8px 0' }} />
            <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 10, lineHeight: 1.5 }}>
              Breathing life into every pixel, one frame at a time.
            </p>
          </div>
        </div>

        {/* Tile 6 — Bottom-right: Brand Identity */}
        <div className="text-tile absolute" style={{ bottom: '20%', right: '3%', opacity: 0 }}>
          <div style={{
            transform: 'rotate(-3deg)', animation: 'tileFloat 4.3s ease-in-out 1.8s infinite',
            width: 152, background: 'rgb(6,6,6)', borderRight: '3px solid #B7CB45',
            boxShadow: '0 8px 32px rgba(0,0,0,0.75), 4px 0 20px rgba(183,203,69,0.07)', padding: '14px 16px',
          }}>
            <p style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#B7CB45', opacity: 0.7, marginBottom: 6 }}>Identity</p>
            <p style={{ color: '#fff', fontWeight: 800, fontSize: 13, lineHeight: 1.25, letterSpacing: '-0.01em' }}>Brand<br/>Identity</p>
            <div style={{ width: 24, height: 1, background: 'rgba(183,203,69,0.4)', margin: '8px 0' }} />
            <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 10, lineHeight: 1.5 }}>
              Your unique story, visually and boldly told to the world.
            </p>
          </div>
        </div>

      </div>

      {/* ── Centered headline ── */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center"
        style={{ minHeight: '70vh' }}
      >
        <div ref={centerRef} style={{ opacity: 0 }}>
          <p
            className="font-mono text-[9px] tracking-[0.38em] uppercase text-[#B7CB45]/65 mb-6"
          >
            Pixel Party Studio
          </p>
          <h2
            className="font-black leading-none text-white select-none mb-4"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9.5rem)',
              letterSpacing: '-0.04em',
              textShadow: '0 0 80px rgba(0,0,0,0.8)',
            }}
          >
            BEHIND
          </h2>
          <h2
            className="font-black leading-none select-none mb-4"
            style={{
              fontSize: 'clamp(3.5rem, 10vw, 9.5rem)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 45%, #B7CB45 70%, #8fa832 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 60px rgba(183,203,69,0.5))',
            }}
          >
            THE LENS
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.5))' }} />
            <p className="text-white/45 text-sm font-medium tracking-wide" style={{ maxWidth: 380 }}>
              Where raw vision becomes cinematic reality — every shoot, every grade, every story.
            </p>
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(183,203,69,0.5))' }} />
          </div>
        </div>
      </div>

    </section>
  );
}
