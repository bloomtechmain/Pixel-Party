import type { CSSProperties } from 'react';
const contactVideo = 'https://pub-88f16f8528f244df978fe5773f5d5f59.r2.dev/Video%20Contact.mp4';

function appear(delay: number): CSSProperties {
  return {
    opacity: 0,
    animation: `fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
  };
}

function fade(delay: number): CSSProperties {
  return {
    opacity: 0,
    animation: `fadeIn 0.9s ease ${delay}s forwards`,
  };
}

function scaleUp(delay: number): CSSProperties {
  return {
    opacity: 0,
    animation: `scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s forwards`,
  };
}

function ContactCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="flex items-start gap-5 p-6 rounded-2xl transition-all duration-300 cursor-default"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(183,203,69,0.3)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(183,203,69,0.04)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      <div
        className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: 'rgba(183,203,69,0.1)', border: '1px solid rgba(183,203,69,0.2)' }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[#B7CB45]/60 mb-1">
          {label}
        </p>
        <p className="text-white font-semibold text-base leading-tight">{value}</p>
        <p className="text-white/40 text-sm mt-1">{sub}</p>
      </div>
    </div>
  );
}

export function ContactHero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">

      {/* ── Background video ── */}
      <div className="absolute inset-0 w-full h-full" style={fade(0.1)}>
        <video
          src={contactVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full"
          style={{ objectFit: 'cover', display: 'block' }}
        />
        {/* Heavier overlay on left for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 38%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.28) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.65) 100%)',
          }}
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

      {/* ── Ambient lime glow — top-left ── */}
      <div
        className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(183,203,69,0.07) 0%, transparent 65%)' }}
      />

      {/* ── Ghost "06" watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: 'clamp(14rem, 30vw, 28rem)', opacity: 0.018, color: '#fff' }}
        >
          06
        </span>
      </div>

      {/* ── Horizontal lime accent ── */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: '64%',
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.08), transparent)',
        }}
      />

      {/* ── Floating particle orbs ── */}
      <div className="absolute w-1 h-1 rounded-full pointer-events-none"
        style={{ top: '22%', left: '48%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.15, animation: 'floatY 4.2s ease-in-out 0s infinite' }} />
      <div className="absolute w-[5px] h-[5px] rounded-full pointer-events-none"
        style={{ top: '68%', right: '12%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.12, animation: 'floatY 5.5s ease-in-out 1s infinite' }} />
      <div className="absolute w-[3px] h-[3px] rounded-full pointer-events-none"
        style={{ top: '38%', right: '22%', background: '#B7CB45', boxShadow: '0 0 10px #B7CB45', opacity: 0.10, animation: 'floatY 3.8s ease-in-out 0.5s infinite' }} />

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* ════ LEFT — Typography ════ */}
          <div className="w-full lg:w-[55%]">

            {/* Section counter */}
            <div className="flex items-center gap-4 mb-14" style={fade(0.1)}>
              <span className="font-mono text-xs text-[#B7CB45]/35 tracking-widest">006</span>
              <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.4), transparent)' }} />
              <span className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#B7CB45]/60">
                Get In Touch
              </span>
            </div>

            {/* CONTACT — ghost outline */}
            <div style={appear(0.18)}>
              <p
                className="font-black leading-none select-none"
                style={{
                  fontSize: 'clamp(1.5rem, 3.8vw, 3.5rem)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.22)',
                  color: 'transparent',
                  letterSpacing: '0.06em',
                }}
              >
                CONTACT
              </p>
            </div>

            {/* TEAM — solid white */}
            <div style={appear(0.28)}>
              <p
                className="font-black leading-none text-white select-none"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  letterSpacing: '0.02em',
                  textShadow: '0 0 40px rgba(255,255,255,0.08)',
                }}
              >
                TEAM
              </p>
            </div>

            {/* PIXEL — lime gradient */}
            <div style={appear(0.38)}>
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

            {/* PARTY — outline */}
            <div style={appear(0.46)}>
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

            {/* Divider */}
            <div
              className="mt-8 h-px w-full max-w-sm"
              style={{
                ...fade(0.54),
                background: 'linear-gradient(to right, #B7CB45, rgba(183,203,69,0.2), transparent)',
              }}
            />

            {/* Subtext */}
            <div className="mt-8" style={appear(0.62)}>
              <p
                className="text-white/55 text-base lg:text-[17px] leading-relaxed"
                style={{ maxWidth: '28rem' }}
              >
                Have a project in mind? Let's create something extraordinary together. Our team is ready to bring your vision to life — one pixel at a time.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4" style={appear(0.72)}>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-3 text-sm font-bold tracking-wide px-7 py-3.5 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-100"
                style={{
                  background: '#B7CB45',
                  color: '#000',
                  boxShadow: '0 0 32px rgba(183,203,69,0.4)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Send a Message
              </a>
            </div>
          </div>

          {/* ════ RIGHT — Contact info cards ════ */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4 lg:pt-32">

            <div style={scaleUp(0.55)}>
              <ContactCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                }
                label="Email Us"
                value="Use the form below"
                sub="We reply within 24 hours"
              />
            </div>

            <div style={scaleUp(0.68)}>
              <ContactCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                }
                label="Call Us"
                value="011 20 98 178 / 076 658 4418"
                sub="Mon – Fri, 9am to 6pm"
              />
            </div>

            <div style={scaleUp(0.81)}>
              <ContactCard
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                }
                label="Visit Us"
                value="Colombo, Sri Lanka"
                sub="By appointment only"
              />
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 flex-wrap mt-2" style={fade(0.95)}>
              <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-white/30 shrink-0">
                Follow Us
              </p>
              {[
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/pixelpartylk?igsh=MmxyY29rZmtpamRz',
                  d: 'M9 12a3 3 0 106 0 3 3 0 00-6 0M17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z',
                },
                {
                  label: 'Facebook',
                  href: 'https://www.facebook.com/share/17cH2oZYGq/?mibextid=wwXIfr',
                  d: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
                },
              ].map(({ label, href, d }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white/50 transition-all duration-300 hover:text-[#B7CB45]"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(183,203,69,0.4)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={fade(1.1)}
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/25">Scroll</span>
        <div
          className="w-px h-10 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, #B7CB45)',
              animation: 'floatY 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

    </section>
  );
}
