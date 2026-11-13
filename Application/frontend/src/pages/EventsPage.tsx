import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCallback, useEffect, useState } from 'react';

type EventItem = {
  id: string;
  src: string;
  caption: string;
  width: number | null;
  height: number | null;
  createdTime: string;
};

type State =
  | { status: 'loading' }
  | { status: 'ready'; items: EventItem[] }
  | { status: 'empty' };

const LIME_GRADIENT = 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 50%, #8fa832 100%)';

export function EventsPage() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;
    fetch('/api/events')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { items?: EventItem[] }) => {
        if (cancelled) return;
        const items = data.items ?? [];
        setState(items.length ? { status: 'ready', items } : { status: 'empty' });
      })
      .catch(() => !cancelled && setState({ status: 'empty' }));
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <Navbar />
      {state.status === 'empty' && <ComingSoon />}
      {state.status === 'loading' && <Gallery items={null} onOpen={() => {}} />}
      {state.status === 'ready' && <Gallery items={state.items} onOpen={setOpen} />}
      {state.status === 'ready' && open !== null && (
        <Lightbox items={state.items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />
      )}
      <Footer />
    </div>
  );
}

/* ─────────────────────────── Gallery ─────────────────────────── */

function Gallery({ items, onOpen }: { items: EventItem[] | null; onOpen: (i: number) => void }) {
  return (
    <main className="flex-1 relative pt-32 pb-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(183,203,69,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-14" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6"
            style={{ background: 'rgba(183,203,69,0.1)', border: '1px solid rgba(183,203,69,0.2)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#B7CB45] animate-pulse shadow-[0_0_8px_rgba(183,203,69,0.8)]" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B7CB45]">Events</span>
          </div>
          <h1
            className="font-black text-white leading-none"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', letterSpacing: '-0.03em' }}
          >
            Explore{' '}
            <span
              style={{
                background: LIME_GRADIENT,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Events.
            </span>
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mt-6">
            The latest from Pixel Party: upcoming events, highlights and moments worth sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-start">
          {items
            ? items.map((item, i) => <Card key={item.id} item={item} onClick={() => onOpen(i)} />)
            : Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="rounded-2xl animate-pulse"
                  style={{
                    aspectRatio: '1 / 1',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                />
              ))}
        </div>
      </div>
    </main>
  );
}

function Card({ item, onClick }: { item: EventItem; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const ratio = item.width && item.height ? `${item.width} / ${item.height}` : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B7CB45]"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      aria-label={item.caption ? `Open ${item.caption}` : 'Open image'}
    >
      <img
        src={`${item.src}?w=960`}
        srcSet={`${item.src}?w=480 480w, ${item.src}?w=960 960w, ${item.src}?w=1600 1600w`}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        alt={item.caption || 'Pixel Party event'}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="w-full h-auto block transition-all duration-700 group-hover:scale-[1.04]"
        style={{ aspectRatio: ratio, opacity: loaded ? 1 : 0, minHeight: ratio ? undefined : 200 }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(183,203,69,0.45)', borderRadius: 16 }}
      />
      {item.caption && (
        <div
          className="absolute inset-x-0 bottom-0 p-4 pt-12 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}
        >
          <p className="text-white text-sm font-semibold leading-snug line-clamp-2">{item.caption}</p>
        </div>
      )}
    </button>
  );
}

/* ─────────────────────────── Lightbox ─────────────────────────── */

function Lightbox({
  items, index, onChange, onClose,
}: { items: EventItem[]; index: number; onChange: (i: number) => void; onClose: () => void }) {
  const item = items[index];
  const prev = useCallback(() => onChange((index - 1 + items.length) % items.length), [index, items.length, onChange]);
  const next = useCallback(() => onChange((index + 1) % items.length), [index, items.length, onChange]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-10"
      style={{ background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <img
        key={item.id}
        src={`${item.src}?w=2400`}
        alt={item.caption || 'Pixel Party event'}
        className="max-w-full max-h-[80vh] object-contain rounded-xl"
        style={{ animation: 'fadeInUp 0.35s ease-out' }}
        onClick={e => e.stopPropagation()}
      />
      {item.caption && (
        <p className="text-white/80 text-sm sm:text-base mt-5 text-center max-w-2xl" onClick={e => e.stopPropagation()}>
          {item.caption}
        </p>
      )}
      <p className="text-white/30 text-xs mt-2 font-mono">{index + 1} / {items.length}</p>

      <LbButton label="Close" className="top-4 right-4" onClick={onClose}>
        <path d="M18 6 6 18M6 6l12 12" />
      </LbButton>
      {items.length > 1 && (
        <>
          <LbButton label="Previous" className="left-2 sm:left-6 top-1/2 -translate-y-1/2" onClick={prev}>
            <path d="M15 18l-6-6 6-6" />
          </LbButton>
          <LbButton label="Next" className="right-2 sm:right-6 top-1/2 -translate-y-1/2" onClick={next}>
            <path d="M9 18l6-6-6-6" />
          </LbButton>
        </>
      )}
    </div>
  );
}

function LbButton({
  label, className, onClick, children,
}: { label: string; className: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={e => { e.stopPropagation(); onClick(); }}
      className={`absolute ${className} w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-black hover:bg-[#B7CB45] transition-colors`}
      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </button>
  );
}

/* ─────────────────────────── Empty state ─────────────────────────── */

function ComingSoon() {
  return (
    <main className="flex-1 relative flex items-center justify-center pt-24 pb-16 overflow-hidden min-h-[80vh]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/75 backdrop-blur-sm" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-10"
        style={{ background: 'radial-gradient(circle, rgba(183,203,69,0.15) 0%, transparent 70%)' }}
      />

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(183,203,69,0.1)', border: '1px solid rgba(183,203,69,0.2)' }}>
          <span className="w-2 h-2 rounded-full bg-[#B7CB45] animate-pulse shadow-[0_0_8px_rgba(183,203,69,0.8)]" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B7CB45]">Stay Tuned</span>
        </div>

        <h1 className="font-black text-white leading-none mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}>
          New Events<br />
          <span style={{ background: LIME_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Coming Soon.
          </span>
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          We are currently crafting some unforgettable experiences. There are no active events at the moment, but check back soon to secure your spot.
        </p>

        <button
          className="px-8 py-4 rounded-full font-bold text-black transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          style={{ background: '#B7CB45', boxShadow: '0 0 30px rgba(183,203,69,0.3)' }}
          onClick={() => window.history.back()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Go Back
        </button>
      </div>
    </main>
  );
}
