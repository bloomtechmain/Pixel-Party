import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoGreen from '../assets/Logo Green.png';

const NAV_LINKS: { label: string; to: string }[] = [
  { label: 'Home',       to: '/'         },
  { label: 'About',      to: '/#about'   },
  { label: 'Explore',    to: '/explore'  },
  { label: 'Contact Us', to: '/contact'  },
];

const NAVBAR_H = 72;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_H;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate      = useNavigate();
  const { pathname }  = useLocation();

  /* Handles any link that starts with /# (hash-scroll links) */
  const handleHashLink = (to: string, closeMenu?: boolean) => {
    if (closeMenu) setOpen(false);
    const id = to.replace('/#', '');
    if (pathname === '/') {
      /* Already on the target page — always scroll directly */
      scrollToId(id);
    } else {
      /* Navigate to the page first; ScrollToHash in main.tsx handles the rest */
      navigate(to);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="/" className="flex items-center select-none">
          <img
            src={logoGreen}
            alt="Pixel Party"
            style={{ height: '36px', width: 'auto', mixBlendMode: 'screen', display: 'block' }}
          />
        </a>

        {/* ── Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, to }) => {
            const isHash = to.startsWith('/#');
            const cls = 'relative py-1 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 group';
            const underline = (
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] rounded-full bg-lime transition-all duration-300 group-hover:w-full" />
            );
            return (
              <li key={label}>
                {isHash ? (
                  <a
                    href={to}
                    className={cls}
                    onClick={e => { e.preventDefault(); handleHashLink(to); }}
                  >
                    {label}
                    {underline}
                  </a>
                ) : (
                  <Link to={to} className={cls}>
                    {label}
                    {underline}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* ── CTA + hamburger ── */}
        <div className="flex items-center gap-4">
          <Link
            to="/events"
            className="hidden md:inline-flex items-center text-white text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full
                       transition-all duration-300 border border-white/20 hover:border-[#B7CB45] hover:text-[#B7CB45]"
          >
            Explore Events
          </Link>

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center bg-lime text-black text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full
                       hover:brightness-110 hover:scale-105 active:scale-100
                       transition-all duration-300
                       shadow-[0_0_24px_rgba(183,203,69,0.35)]"
          >
            Talk to Us
          </Link>

          {/* Hamburger – mobile only */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(v => !v)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
          >
            <span className={`block w-6 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-black/95 border-t border-white/[0.06] px-6 py-5 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, to }) => {
            const isHash = to.startsWith('/#');
            const cls = 'text-gray-400 hover:text-white text-sm font-medium transition-colors';
            return isHash ? (
              <a
                key={label}
                href={to}
                className={cls}
                onClick={e => { e.preventDefault(); handleHashLink(to, true); }}
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                className={cls}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
          <Link
            to="/events"
            className="mt-4 inline-flex justify-center text-white border border-white/20 text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-full"
            onClick={() => setOpen(false)}
          >
            Explore Events
          </Link>
          <Link
            to="/contact"
            className="mt-1 inline-flex justify-center bg-lime text-black text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-full"
            onClick={() => setOpen(false)}
          >
            Talk to Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
