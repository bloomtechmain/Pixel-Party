import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ALBUMS: Album[] = [
  {
    id: 1,
    title: 'Event Covering',
    subtitle: 'Capturing special moments',
    count: 128,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85',
    gradient: 'linear-gradient(145deg, #150a2e 0%, #3b1060 45%, #6d25a0 100%)',
    accent: '#c084fc',
    tag: 'Events',
    featured: true,
    link: 'https://www.facebook.com/share/p/1B96oRL4qu/?mibextid=wwXIfr',
  },
  {
    id: 2,
    title: 'Innovative Collaborations',
    subtitle: 'Creative partnerships',
    count: 84,
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=1200&q=85',
    gradient: 'linear-gradient(145deg, #071624 0%, #0e2d4d 50%, #1565a8 100%)',
    accent: '#60a5fa',
    tag: 'Corporate',
    featured: false,
    link: 'https://m.facebook.com/story.php?story_fbid=pfbid0BABsWq38G5YNiCR3WPMiwWhYv1y8n5wxfbXiKtgCuYxYnc8aSsmCiDig3XShTeq1l&id=61573536390420&mibextid=wwXIfr',
  },
  {
    id: 3,
    title: 'Traditional Events',
    subtitle: 'Cultural celebrations',
    count: 96,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    gradient: 'linear-gradient(145deg, #1a0c06 0%, #3d1a04 50%, #8b3e12 100%)',
    accent: '#fb923c',
    tag: 'Culture',
    featured: false,
    link: 'https://www.facebook.com/share/p/1H2FoZzUjE/?mibextid=wwXIfr',
  },
  {
    id: 4,
    title: 'Timeless Traditions',
    subtitle: 'Heritage & Legacy',
    count: 72,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
    gradient: 'linear-gradient(145deg, #031510 0%, #07302a 50%, #0d6b57 100%)',
    accent: '#34d399',
    tag: 'Heritage',
    featured: false,
    link: 'https://www.facebook.com/share/p/1KY1CDwYs4/?mibextid=wwXIfr',
  },
];

interface Album {
  id: number;
  title: string;
  subtitle: string;
  count: number;
  image: string;
  gradient: string;
  accent: string;
  tag: string;
  featured: boolean;
  link: string;
}

function AlbumCard({ album, featured }: { album: Album; featured?: boolean }) {
  return (
    <a
      href={album.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-full h-full overflow-hidden rounded-2xl group cursor-pointer block"
      style={{ background: '#0a0a0a' }}
    >
      {/* Photo – scales on hover */}
      <img
        src={album.image}
        alt={album.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Colour-tint overlay (ties photo to the album theme) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: album.gradient, opacity: 0.55 }}
      />

      {/* Dark gradient for text legibility */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)',
        }}
      />

      {/* Viewfinder corner brackets */}
      {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r', 'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map(
        (pos, i) => (
          <div
            key={i}
            className={`absolute w-6 h-6 z-20 pointer-events-none ${pos}`}
            style={{
              borderColor: `${album.accent}35`,
              borderWidth: 1.5,
            }}
          />
        ),
      )}

      {/* Top-left tag */}
      <div className="absolute top-5 left-5 z-30">
        <span
          className="text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
          style={{
            background: `${album.accent}16`,
            border: `1px solid ${album.accent}32`,
            color: album.accent,
          }}
        >
          {album.tag}
        </span>
      </div>

      {/* Ghost number watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none"
        style={{ opacity: featured ? 0.055 : 0.04 }}
      >
        <span
          className="font-black leading-none"
          style={{
            fontSize: featured ? '11rem' : '6.5rem',
            color: album.accent,
          }}
        >
          {String(album.id).padStart(2, '0')}
        </span>
      </div>

      {/* Bottom info panel */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 px-5 pb-5 pt-10"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)',
        }}
      >
        <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <p
            className="text-[9px] font-semibold tracking-[0.25em] uppercase mb-1.5"
            style={{ color: album.accent }}
          >
            {album.subtitle}
          </p>
          <h3
            className="text-white font-bold leading-tight mb-3"
            style={{
              fontSize: featured ? 'clamp(1.15rem, 2vw, 1.45rem)' : '1.05rem',
            }}
          >
            {album.title}
          </h3>

          {/* View button – fades in on hover via Tailwind group-hover */}
          <div className="opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <button
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wide px-4 py-2 rounded-full transition-all duration-200 hover:brightness-110 hover:scale-105"
              style={{ background: album.accent, color: '#000' }}
            >
              View Album
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Accent inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 rounded-2xl"
        style={{ boxShadow: `inset 0 0 60px ${album.accent}14` }}
      />
    </a>
  );
}

export function ExploreGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const baseST = {
        trigger: sectionRef.current,
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      };

      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: baseST },
      );

      const cards = gridRef.current?.querySelectorAll('.album-card-wrap');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 44, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.72,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: { ...baseST, start: 'top 68%' },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="albums"
      className="relative bg-black overflow-hidden py-24 lg:py-32"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Ambient lime glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at bottom, rgba(183,203,69,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div ref={headerRef} className="mb-14" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div
              className="h-px w-10"
              style={{
                background:
                  'linear-gradient(to right, transparent, rgba(183,203,69,0.5))',
              }}
            />
            <span className="font-mono text-[9px] text-[#B7CB45]/40 tracking-[0.32em] uppercase">
              006
            </span>
            <span className="text-[8px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/55">
              Photo Albums
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-black text-white leading-none"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Our{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #B7CB45 0%, #e0f06a 50%, #8fa832 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Portfolio
              </span>
            </h2>
            <p className="text-white/38 text-sm max-w-xs leading-relaxed">
              A curated selection of our finest work — explore albums by category
              and find your vision.
            </p>
          </div>
        </div>

        {/* ── Desktop 2x2 grid ── */}
        <div
          ref={gridRef}
          className="hidden lg:grid gap-5"
          style={{
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 340px)',
          }}
        >
          {ALBUMS.map((album) => (
            <div
              key={album.id}
              className="album-card-wrap"
            >
              <AlbumCard album={album} featured={true} />
            </div>
          ))}
        </div>

        {/* ── Mobile / tablet 2-column grid ── */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ALBUMS.map(album => (
            <div key={album.id} className="album-card-wrap h-[240px]">
              <AlbumCard album={album} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-14">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 text-sm font-semibold text-white/60 transition-all duration-300 hover:text-[#B7CB45] group"
          >
            <span>Want your own album?</span>
            <span className="text-[#B7CB45] font-bold group-hover:translate-x-1 transition-transform duration-200">
              Book a shoot →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
