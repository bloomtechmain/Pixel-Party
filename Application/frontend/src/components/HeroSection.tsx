import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
const heroVideo = 'https://pub-88f16f8528f244df978fe5773f5d5f59.r2.dev/0424.mp4';

const STATS = [
  { value: '20+', label: 'Projects' },
  { value: '20+', label: 'Clients'  },
  { value: '5★',  label: 'Rating'   },
] as const;

const MARQUEE_ITEMS = [
  'Pixel Party', 'Videography', 'Creative Studio',
  'Cinematic Production', 'Digital Agency', 'Visual Excellence',
];

function appear(delay: number): CSSProperties {
  return {
    opacity: 0,
    animation: `fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
  };
}

/* Camera-style viewfinder corner brackets */
function ViewfinderBrackets() {
  const base = 'absolute w-8 h-8 z-20';
  const color = 'border-[#B7CB45]/70';
  const thickness = 'border-[1.5px]';
  return (
    <>
      <div className={`${base} top-4 left-4 border-t ${thickness} border-l ${thickness} ${color}`} />
      <div className={`${base} top-4 right-4 border-t ${thickness} border-r ${thickness} ${color}`} />
      <div className={`${base} bottom-4 left-4 border-b ${thickness} border-l ${thickness} ${color}`} />
      <div className={`${base} bottom-4 right-4 border-b ${thickness} border-r ${thickness} ${color}`} />
    </>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black flex flex-col overflow-hidden">

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Ambient lime radial – top left ── */}
      <div
        className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(183,203,69,0.07) 0%, transparent 65%)' }}
      />
      {/* ── Ambient lime radial – bottom right ── */}
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(183,203,69,0.05) 0%, transparent 65%)' }}
      />

      {/* ── Ghost "01" chapter watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: 'clamp(14rem, 30vw, 28rem)', opacity: 0.018, color: '#fff' }}
        >
          01
        </span>
      </div>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10 xl:gap-14">

            {/* ════ LEFT – Video Monitor ════ */}
            <div
              className="w-full lg:w-[60%] relative"
              style={{ animation: 'scaleIn 1s cubic-bezier(0.16,1,0.3,1) 0.05s both' }}
            >
              {/* Pulsing glow blob */}
              <div
                className="absolute -inset-8 rounded-[3rem] bg-lime animate-glow-pulse pointer-events-none"
                style={{ filter: 'blur(64px)' }}
              />

              {/* Frame card */}
              <div
                className="relative rounded-2xl lg:rounded-3xl overflow-hidden"
                style={{
                  boxShadow:
                    '0 0 0 1px rgba(183,203,69,0.22), 0 32px 80px rgba(0,0,0,0.6), 0 0 80px rgba(183,203,69,0.06)',
                }}
              >
                {/* ── Top sheen line ── */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B7CB45]/70 to-transparent z-20" />

                {/* ── Camera viewfinder brackets ── */}
                <ViewfinderBrackets />

                {/* ── Video ── */}
                <video
                  className="w-full h-auto block"
                  style={{ transform: 'scaleX(1.18)', transformOrigin: 'center center' }}
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* ── Film scanlines overlay ── */}
                <div
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
                    opacity: 1,
                  }}
                />

                {/* ── Camera HUD – top bar ── */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-3 z-20 pointer-events-none">
                  {/* REC indicator */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                    <span className="font-mono text-[10px] font-bold text-white/70 tracking-widest">REC</span>
                  </div>
                  {/* Resolution badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#B7CB45]/70 tracking-widest font-bold">4K</span>
                    <span className="text-[10px] font-mono text-white/30">UHD</span>
                  </div>
                </div>

                {/* ── Camera HUD – bottom bar ── */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-12 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-20 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-white/40 tracking-wider">TC</span>
                      <span className="font-mono text-[11px] text-white/60 tracking-widest">00:00:24:12</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-white/30">ISO 800</span>
                      <span className="w-px h-3 bg-white/10" />
                      <span className="font-mono text-[10px] text-[#B7CB45]/50 tracking-wider">24fps</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Floating "Now Playing" glass card ── */}
              <div
                className="absolute -bottom-5 -left-2 lg:-left-6 bg-black/75 backdrop-blur-xl border border-white/[0.1] rounded-2xl px-4 py-3.5 shadow-2xl z-30"
                style={{ animation: 'fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(183,203,69,0.12)', border: '1px solid rgba(183,203,69,0.2)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-[11px] font-bold leading-tight">Now Playing</p>
                    <p className="text-gray-500 text-[10px] leading-tight mt-0.5">Pixel Party Reel '24</p>
                  </div>
                  {/* Animated sound wave */}
                  <div className="flex items-end gap-[2px] h-4 ml-1">
                    {[3, 5, 4, 6, 3].map((h, i) => (
                      <div
                        key={i}
                        className="w-[2.5px] bg-[#B7CB45] rounded-full"
                        style={{
                          height: `${h * 2}px`,
                          animation: `floatY ${0.6 + i * 0.1}s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Floating 4K badge – top right ── */}
              <div
                className="absolute -top-4 -right-4 lg:-right-6 w-16 h-16 rounded-2xl flex flex-col items-center justify-center z-30"
                style={{
                  background: 'rgba(183,203,69,0.08)',
                  border: '1px solid rgba(183,203,69,0.2)',
                  backdropFilter: 'blur(12px)',
                  animation: 'fadeIn 1s ease 0.9s both',
                }}
              >
                <span className="text-[#B7CB45] font-black text-lg leading-none">4K</span>
                <span className="text-white/30 text-[8px] tracking-wider mt-0.5">ULTRA</span>
              </div>

              {/* ── Dot grid ── */}
              <div
                className="absolute -bottom-8 -right-4 grid pointer-events-none select-none"
                style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '7px' }}
                aria-hidden
              >
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[3px] h-[3px] rounded-full"
                    style={{ background: '#B7CB45', opacity: 0.1 + (i % 7) * 0.04 }}
                  />
                ))}
              </div>
            </div>

            {/* ════ RIGHT – Content ════ */}
            <div className="w-full lg:w-[40%] flex flex-col gap-5 lg:gap-6">

              {/* Section counter row */}
              <div className="flex items-center gap-3" style={appear(0.12)}>
                <span className="font-mono text-xs text-[#B7CB45]/40 tracking-widest">001</span>
                <div
                  className="flex-1 h-px"
                  style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.3), transparent)' }}
                />
                <span className="text-[#B7CB45] text-[9px] font-semibold tracking-[0.28em] uppercase">
                  Creative Studio
                </span>
              </div>

              {/* Ghost + Main heading */}
              <div className="relative" style={appear(0.24)}>
                {/* Outlined ghost "PP" behind */}
                <div
                  className="absolute -top-4 -left-2 font-black leading-none pointer-events-none select-none"
                  aria-hidden
                  style={{
                    fontSize: 'clamp(5rem, 10vw, 9rem)',
                    WebkitTextStroke: '1px rgba(183,203,69,0.07)',
                    color: 'transparent',
                    letterSpacing: '-0.04em',
                  }}
                >
                  PP
                </div>

                <h1
                  className="relative font-black text-white leading-[0.88] tracking-tight"
                  style={{ fontSize: 'clamp(3.4rem, 7vw, 5.8rem)' }}
                >
                  Pixel
                  <br />
                  <span style={{ color: '#B7CB45', textShadow: '0 0 50px rgba(183,203,69,0.35)' }}>
                    Party
                  </span>
                  <span style={{ color: '#B7CB45' }}>.</span>
                </h1>
              </div>

              {/* Decorative divider segments */}
              <div className="flex items-center gap-2" style={appear(0.34)}>
                <div className="w-10 h-[1.5px] bg-[#B7CB45]" />
                <div className="w-4 h-[1.5px]" style={{ background: 'rgba(183,203,69,0.3)' }} />
                <div className="w-2 h-[1.5px]" style={{ background: 'rgba(183,203,69,0.12)' }} />
              </div>

              {/* Subheading */}
              <p
                className="text-gray-400 text-base sm:text-[17px] leading-relaxed"
                style={{ ...appear(0.43), maxWidth: '22rem' }}
              >
                Let's Create with Pixel Party!
              </p>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-3" style={appear(0.54)}>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-sm font-bold tracking-wide px-7 py-3.5 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-100"
                  style={{
                    background: '#B7CB45',
                    color: '#000',
                    boxShadow: '0 0 32px rgba(183,203,69,0.4)',
                  }}
                >
                  Get Started
                </Link>

              </div>

              {/* Stats */}
              <div
                className="flex items-stretch gap-0 pt-6 mt-1"
                style={{
                  ...appear(0.66),
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {STATS.map(({ value, label }, idx) => (
                  <div key={label} className="flex items-stretch gap-0 flex-1">
                    <div className="flex-1 pr-4">
                      <div
                        className="text-2xl lg:text-[2rem] font-black text-white leading-none"
                        style={{ textShadow: '0 0 24px rgba(183,203,69,0.25)' }}
                      >
                        {value}
                      </div>
                      <div className="text-gray-500 text-[9px] font-medium uppercase tracking-[0.2em] mt-1.5">
                        {label}
                      </div>
                      <div className="w-5 h-[2px] bg-[#B7CB45] rounded-full mt-2 opacity-60" />
                    </div>
                    {idx < STATS.length - 1 && (
                      <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.07)' }} />
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ════════ MARQUEE STRIP ════════ */}
      <div
        className="relative z-10 overflow-hidden"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Lime fade masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #000, transparent)' }} />

        <div
          className="flex whitespace-nowrap py-4"
          style={{ animation: 'marquee 28s linear infinite' }}
        >
          {/* Duplicated twice for seamless loop */}
          {[0, 1].map((pass) => (
            <span key={pass} className="inline-flex items-center shrink-0">
              {MARQUEE_ITEMS.map((item) => (
                <span key={item} className="inline-flex items-center gap-5 px-5">
                  <span
                    className="text-[11px] font-bold tracking-[0.22em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.22)' }}
                  >
                    {item}
                  </span>
                  <span
                    className="w-1 h-1 rounded-full shrink-0"
                    style={{ background: 'rgba(183,203,69,0.5)' }}
                  />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
