import { Link } from 'react-router-dom';
import logoGreen from '../assets/Logo Green.png';

const SERVICES = [
  { label: 'Video Production',    desc: 'Cinematic quality films' },
  { label: 'Film Production',     desc: 'Full-scale productions' },
  { label: 'Motion & VFX',        desc: 'Visual effects & animation' },
  { label: 'Brand Identity',      desc: 'Visual storytelling strategy' },
  { label: 'Photography',         desc: 'Stills that speak volumes' },
  { label: 'Creative Direction',  desc: 'Concept to final frame' },
  { label: 'Editing & Color',     desc: 'Post-production excellence' },
  { label: 'Content Strategy',    desc: 'Purpose-driven content plans' },
];

const NAV = [
  { label: 'Home',       href: '/'        },
  { label: 'About Us',   href: '/#about'  },
  { label: 'Contact',    href: '/contact' },
];

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/reel/DR91vhjiLDq/?igsh=YmIyc3dsYWg3Z3Mz',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@pixel.party.lk?_r=1&_t=ZS-96HL2cYtnZi',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.78 1.52V7.08a4.85 4.85 0 01-1.01-.39z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/chasindu-theekshana-2170071a5?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/PixelPartyLK',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-black relative overflow-hidden">

      {/* ── Fine grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Ambient glow ── */}
      <div
        className="absolute bottom-0 left-1/4 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(183,203,69,0.055) 0%, transparent 65%)' }}
      />
      <div
        className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(183,203,69,0.03) 0%, transparent 65%)' }}
      />

      {/* ── Ghost PP watermark ── */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none tracking-tighter block"
          style={{ fontSize: 'clamp(10rem, 22vw, 22rem)', opacity: 0.018, color: '#fff', lineHeight: 0.85 }}
        >
          PP
        </span>
      </div>

      {/* ══════════ CTA BANNER ══════════ */}
      <div
        className="relative z-10 border-t border-white/[0.06]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8">

          <div>
            <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/50 mb-3">
              Ready to create?
            </p>
            <h2
              className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '-0.03em' }}
            >
              Let's Tell Your{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 50%, #8fa832 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Story.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-sm font-bold tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-100"
              style={{ background: '#B7CB45', color: '#000', boxShadow: '0 0 40px rgba(183,203,69,0.35)' }}
            >
              Start a Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════ MAIN GRID ══════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ── Brand col (4 cols) ── */}
          <div className="lg:col-span-4">
            <a href="/" className="flex items-center select-none mb-5">
              <img
                src={logoGreen}
                alt="Pixel Party"
                style={{ height: '52px', width: 'auto', mixBlendMode: 'screen', display: 'block' }}
              />
            </a>

            <p className="text-white/38 text-sm leading-relaxed mb-8" style={{ maxWidth: '22rem' }}>
              A creative studio built for brands that dare to be different. From concept to final frame — we craft visuals that move people.
            </p>

            {/* Contact snippet */}
            <div className="flex flex-col gap-3 mb-8">
              <a
                href="/contact"
                className="flex items-center gap-3 text-sm text-white/40 hover:text-[#B7CB45] transition-colors duration-200 group"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200"
                  style={{ background: 'rgba(183,203,69,0.08)', border: '1px solid rgba(183,203,69,0.15)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                Email Us
              </a>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(183,203,69,0.08)', border: '1px solid rgba(183,203,69,0.15)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                Colombo, Sri Lanka
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/35 transition-all duration-200 hover:text-[#B7CB45] hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(183,203,69,0.3)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(183,203,69,0.07)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Services col (5 cols) ── */}
          <div className="lg:col-span-5">
            <h4 className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/55 mb-7">
              Our Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {SERVICES.map(s => (
                <div
                  key={s.label}
                  className="group flex items-start gap-3 py-3 transition-all duration-200"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <div
                    className="mt-[5px] w-1.5 h-1.5 rounded-full bg-[#B7CB45] shrink-0 transition-all duration-200 group-hover:shadow-[0_0_8px_rgba(183,203,69,0.9)]"
                    style={{ boxShadow: '0 0 4px rgba(183,203,69,0.4)' }}
                  />
                  <div>
                    <p className="text-white/75 text-sm font-medium group-hover:text-white transition-colors duration-200 leading-tight">
                      {s.label}
                    </p>
                    <p className="text-white/25 text-[11px] mt-0.5 group-hover:text-white/40 transition-colors duration-200">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Navigate col (3 cols) ── */}
          <div className="lg:col-span-3">
            <h4 className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/55 mb-7">
              Navigate
            </h4>
            <ul className="flex flex-col gap-3 mb-10">
              {NAV.map(n => (
                <li key={n.label}>
                  <Link
                    to={n.href}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="w-4 h-px bg-white/15 group-hover:w-6 group-hover:bg-[#B7CB45]/60 transition-all duration-300" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Tagline block */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(183,203,69,0.04)',
                border: '1px solid rgba(183,203,69,0.12)',
              }}
            >
              <p
                className="font-black leading-tight mb-2"
                style={{
                  fontSize: '1.1rem',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 60%, #8fa832 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Every pixel<br />tells a story.
              </p>
              <p className="text-white/25 text-[11px] leading-relaxed">
                Setting real value to your creative vision.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ══════════ BOTTOM BAR ══════════ */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-4">
            <p className="text-white/20 text-xs">
              &copy; {new Date().getFullYear()} Pixel Party. All rights reserved.
            </p>
            <span className="hidden sm:block w-px h-3 bg-white/10" />
            <a 
              href="https://bloomtech.lk/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden sm:block text-white/15 text-xs hover:text-[#B7CB45] transition-colors duration-200"
            >
              Powered by Bloomtech LK
            </a>
          </div>

          <div className="flex items-center gap-5 text-xs text-white/25">
            <a href="#" className="hover:text-white/60 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors duration-200">Terms</a>
            <span className="w-px h-3 bg-white/[0.08]" />
            <Link
              to="/admin/login"
              className="flex items-center gap-1.5 text-white/12 hover:text-white/35 transition-colors duration-300"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Admin
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
