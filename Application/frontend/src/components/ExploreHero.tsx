import { useState, useRef, type CSSProperties } from 'react';
import promoVideo from '../assets/promo4.mp4';

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

function PhoneMockup({
  videoRef,
  muted,
  onToggleSound,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  muted: boolean;
  onToggleSound: () => void;
}) {
  return (
    <div
      className="relative mx-auto select-none"
      style={{
        width: 260,
        height: 530,
        filter:
          'drop-shadow(0 50px 120px rgba(0,0,0,0.85)) drop-shadow(0 0 60px rgba(183,203,69,0.14))',
        animation: 'floatY 5s ease-in-out infinite',
      }}
    >
      {/* Outer ambient glow ring */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -40,
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(183,203,69,0.16) 0%, transparent 65%)',
          filter: 'blur(24px)',
        }}
      />

      {/* Phone body */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: 44,
          background:
            'linear-gradient(150deg, #2c2c2c 0%, #111 35%, #161616 65%, #222 100%)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.10),
            inset 0 -1px 0 rgba(0,0,0,0.5),
            inset 1px 0 0 rgba(255,255,255,0.04),
            inset -1px 0 0 rgba(0,0,0,0.25),
            0 0 0 1.5px rgba(255,255,255,0.06),
            0 0 0 3px rgba(0,0,0,0.6)
          `,
        }}
      />

      {/* Screen area */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: 11,
          left: 11,
          right: 11,
          bottom: 11,
          borderRadius: 36,
          background: '#050505',
        }}
      >
        {/* Video */}
        <video
          ref={videoRef}
          src={promoVideo}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover' }}
          autoPlay
          loop
          muted={muted}
          playsInline
        />

        {/* Screen gloss */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, transparent 45%)',
          }}
        />

        {/* Top status gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)',
          }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
          }}
        />

        {/* Film scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.018) 3px, rgba(0,0,0,0.018) 4px)',
          }}
        />

        {/* Home indicator */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 rounded-full"
          style={{
            width: 100,
            height: 4,
            background: 'rgba(255,255,255,0.25)',
          }}
        />
      </div>

      {/* Dynamic island */}
      <div
        className="absolute z-30 flex items-center justify-end pr-3"
        style={{
          top: 19,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 106,
          height: 30,
          background: '#000',
          borderRadius: 20,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
      >
        {/* Front camera dot */}
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: '#0d1011',
            boxShadow:
              'inset 0 0 0 2px rgba(255,255,255,0.05), 0 0 6px rgba(0,0,0,0.6)',
          }}
        />
      </div>

      {/* Left – silent switch */}
      <div
        className="absolute z-20"
        style={{
          left: -4,
          top: 98,
          width: 4,
          height: 26,
          borderRadius: 2,
          background: 'linear-gradient(to right, #0a0a0a, #242424)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      />
      {/* Left – volume up */}
      <div
        className="absolute z-20"
        style={{
          left: -4,
          top: 138,
          width: 4,
          height: 46,
          borderRadius: 2,
          background: 'linear-gradient(to right, #0a0a0a, #242424)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      />
      {/* Left – volume down */}
      <div
        className="absolute z-20"
        style={{
          left: -4,
          top: 194,
          width: 4,
          height: 46,
          borderRadius: 2,
          background: 'linear-gradient(to right, #0a0a0a, #242424)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      />
      {/* Right – power */}
      <div
        className="absolute z-20"
        style={{
          right: -4,
          top: 154,
          width: 4,
          height: 62,
          borderRadius: 2,
          background: 'linear-gradient(to left, #0a0a0a, #242424)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      />

      {/* Top metallic gleam */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          top: 0,
          left: 24,
          right: 24,
          height: 1,
          borderRadius: 999,
          background:
            'linear-gradient(to right, transparent, rgba(255,255,255,0.14), transparent)',
        }}
      />

      {/* Sound toggle button – centred below the phone */}
      <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={onToggleSound}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: muted ? 'rgba(255,255,255,0.07)' : 'rgba(183,203,69,0.15)',
            border: muted ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(183,203,69,0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {muted ? (
            /* Muted – speaker with X */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            /* Unmuted – speaker with waves */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 010 7.07"/>
              <path d="M19.07 4.93a10 10 0 010 14.14"/>
            </svg>
          )}
          <span
            className="text-[11px] font-semibold tracking-wide"
            style={{ color: muted ? 'rgba(255,255,255,0.45)' : '#B7CB45' }}
          >
            {muted ? 'Tap for Sound' : 'Sound On'}
          </span>
        </button>
      </div>
    </div>
  );
}

export function ExploreHero() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null) as React.RefObject<HTMLVideoElement>;

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next) video.play().catch(() => {});
  };

  return (
    <section className="relative min-h-screen bg-black flex flex-col lg:flex-row overflow-hidden">

      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Ambient lime – top left */}
      <div
        className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(183,203,69,0.07) 0%, transparent 65%)',
        }}
      />
      {/* Ambient lime – bottom right */}
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(183,203,69,0.05) 0%, transparent 65%)',
        }}
      />

      {/* Ghost watermark */}
      <div
        className="absolute inset-0 flex items-center justify-start pl-4 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none tracking-tighter"
          style={{
            fontSize: 'clamp(12rem, 28vw, 28rem)',
            opacity: 0.022,
            color: '#fff',
          }}
        >
          EX
        </span>
      </div>

      {/* Floating orbs */}
      <div
        className="absolute w-[3px] h-[3px] rounded-full pointer-events-none"
        style={{
          top: '18%',
          left: '5%',
          background: '#B7CB45',
          boxShadow: '0 0 10px #B7CB45',
          opacity: 0.22,
          animation: 'floatY 4.4s ease-in-out 0s infinite',
        }}
      />
      <div
        className="absolute w-[5px] h-[5px] rounded-full pointer-events-none"
        style={{
          bottom: '22%',
          left: '3%',
          background: '#B7CB45',
          boxShadow: '0 0 10px #B7CB45',
          opacity: 0.14,
          animation: 'floatY 5.8s ease-in-out 1.4s infinite',
        }}
      />

      {/* ════ LEFT – Text content ════ */}
      <div className="relative z-10 w-full lg:w-[50%] flex flex-col justify-center px-8 sm:px-12 lg:px-14 xl:px-20 py-32 lg:py-24">

        {/* Eyebrow badge */}
        <div className="flex items-center gap-4 mb-10" style={appear(0.1)}>
          <div
            className="h-px w-10"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(183,203,69,0.5))',
            }}
          />
          <span className="font-mono text-[9px] text-[#B7CB45]/40 tracking-[0.32em] uppercase">
            005
          </span>
          <span className="text-[8px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/55">
            Visual Journey
          </span>
        </div>

        {/* EXPLORE */}
        <div className="overflow-hidden mb-1" style={appear(0.2)}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2.8rem)',
              WebkitTextStroke: '1px rgba(255,255,255,0.18)',
              color: 'transparent',
              letterSpacing: '0.16em',
            }}
          >
            EXPLORE
          </p>
        </div>

        {/* PIXEL */}
        <div className="overflow-hidden mb-1" style={appear(0.32)}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 8.5rem)',
              letterSpacing: '-0.045em',
              background:
                'linear-gradient(135deg, #B7CB45 0%, #e0f06a 35%, #d4e850 55%, #B7CB45 72%, #8fa832 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 50px rgba(183,203,69,0.5))',
            }}
          >
            PIXEL
          </p>
        </div>

        {/* PARTY */}
        <div className="overflow-hidden mb-10" style={appear(0.44)}>
          <p
            className="font-black leading-none select-none"
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 8.5rem)',
              letterSpacing: '-0.045em',
              WebkitTextStroke: '2px rgba(255,255,255,0.2)',
              color: 'transparent',
            }}
          >
            PARTY
          </p>
        </div>

        {/* Divider */}
        <div
          className="flex items-center gap-4 w-full max-w-xs mb-8"
          style={{ ...appear(0.56), transformOrigin: 'left' }}
        >
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to right, rgba(183,203,69,0.45), transparent)',
            }}
          />
          <div
            className="w-2 h-2 rounded-full bg-[#B7CB45] shrink-0"
            style={{ boxShadow: '0 0 10px rgba(183,203,69,0.9)' }}
          />
          <div
            className="flex-1 h-px"
            style={{
              background:
                'linear-gradient(to left, rgba(183,203,69,0.45), transparent)',
            }}
          />
        </div>

        {/* Description */}
        <div style={appear(0.64)} className="mb-10">
          <p
            className="text-white/55 leading-relaxed"
            style={{
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              maxWidth: '30rem',
              letterSpacing: '0.01em',
            }}
          >
            Step inside our visual world. From intimate portraits to cinematic
            productions — browse our photo albums and discover the stories we've
            told, one frame at a time.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4" style={appear(0.74)}>
          <a
            href="#albums"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-100"
            style={{
              background: '#B7CB45',
              color: '#000',
              boxShadow: '0 0 36px rgba(183,203,69,0.42)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Browse Albums
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 text-sm font-semibold text-white rounded-full transition-all duration-300 hover:text-[#B7CB45] px-6 py-4"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                'rgba(183,203,69,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                'rgba(255,255,255,0.12)';
            }}
          >
            Book a Session
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>

      {/* ════ RIGHT – Phone mockup panel ════ */}
      <div
        className="relative w-full lg:w-[50%] flex items-center justify-center min-h-[640px] lg:min-h-screen overflow-hidden"
        style={fade(0.2)}
      >
        {/* Panel radial background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(183,203,69,0.07) 0%, transparent 58%)',
          }}
        />

        {/* Decorative concentric rings */}
        {[380, 520, 660].map((size, i) => (
          <div
            key={size}
            className="absolute pointer-events-none"
            style={{
              width: size,
              height: size,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              border: `1px solid rgba(183,203,69,${0.07 - i * 0.02})`,
            }}
          />
        ))}

        {/* Phone with 3D tilt */}
        <div
          className="relative z-10 transition-transform duration-700 pb-16"
          style={{
            transform: 'perspective(1100px) rotateY(-9deg) rotateX(3deg)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform =
              'perspective(1100px) rotateY(-2deg) rotateX(1deg) scale(1.03)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform =
              'perspective(1100px) rotateY(-9deg) rotateX(3deg)';
          }}
        >
          <PhoneMockup videoRef={videoRef} muted={muted} onToggleSound={toggleSound} />
        </div>

        {/* Floating badge – LIVE (top right) */}
        <div
          className="absolute z-20 top-[14%] right-[8%]"
          style={scaleUp(0.9)}
        >
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl"
            style={{
              background: 'rgba(0,0,0,0.72)',
              border: '1px solid rgba(183,203,69,0.28)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 20px rgba(183,203,69,0.1)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-[#B7CB45]"
              style={{
                boxShadow: '0 0 8px rgba(183,203,69,0.9)',
                animation: 'glowBreath 1.8s ease-in-out infinite',
              }}
            />
            <span className="text-[11px] font-black text-white/85 tracking-widest">
              LIVE
            </span>
          </div>
        </div>

        {/* Floating badge – shots count (bottom left) */}
        <div
          className="absolute z-20 bottom-[18%] left-[6%]"
          style={scaleUp(1.05)}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: 'rgba(0,0,0,0.75)',
              border: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(14px)',
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(183,203,69,0.12)',
                border: '1px solid rgba(183,203,69,0.22)',
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B7CB45"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-bold text-white leading-none">
                256 Shots
              </p>
              <p className="text-[9px] text-white/38 mt-0.5 tracking-wide">
                Photo Albums
              </p>
            </div>
          </div>
        </div>

        {/* Floating spec chip (top left) */}
        <div
          className="absolute z-20 top-[22%] left-[5%]"
          style={fade(1.15)}
        >
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
            style={{
              background: 'rgba(183,203,69,0.08)',
              border: '1px solid rgba(183,203,69,0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="text-[#B7CB45] text-[10px] font-black tracking-wider">
              4K
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-white/40 text-[9px] font-mono">60fps</span>
          </div>
        </div>

        {/* Left edge accent line */}
        <div
          className="absolute top-0 left-0 bottom-0 w-px z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(183,203,69,0.28) 30%, rgba(183,203,69,0.28) 70%, transparent 100%)',
          }}
        />
      </div>
    </section>
  );
}
