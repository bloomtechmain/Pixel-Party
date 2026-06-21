import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPES = [
  'Video Production',
  'Motion & VFX',
  'Brand Identity',
  'Photography',
  'Creative Direction',
  'Other',
];

const BUDGETS = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000+',
];

const STEPS = [
  {
    num: '01',
    title: 'Fill the form',
    desc: 'Tell us your vision — as much or as little as you like.',
  },
  {
    num: '02',
    title: 'We review your brief',
    desc: 'Our creative team studies every detail within 24 hours.',
  },
  {
    num: '03',
    title: 'Discovery call',
    desc: 'A focused session to align on goals, style, and timeline.',
  },
  {
    num: '04',
    title: 'Start creating',
    desc: 'We dive in with full creative energy and purpose.',
  },
];

type FormData = {
  name: string;
  email: string;
  type: string;
  budget: string;
  message: string;
};

const inputBase = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '14px 18px',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
  WebkitAppearance: 'none' as const,
  appearance: 'none' as const,
};

function focusIn(e: React.FocusEvent) {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = 'rgba(183,203,69,0.55)';
  el.style.background = 'rgba(255,255,255,0.065)';
  el.style.boxShadow = '0 0 0 3px rgba(183,203,69,0.09)';
}

function focusOut(e: React.FocusEvent) {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = 'rgba(255,255,255,0.1)';
  el.style.background = 'rgba(255,255,255,0.04)';
  el.style.boxShadow = 'none';
}

const LABEL = 'block text-[10px] font-semibold tracking-[0.22em] uppercase text-[#B7CB45]/65 mb-2';
const FIELD = 'placeholder:text-white/25 outline-none transition-all duration-200';

export function ContactFormSection() {
  const [form, setForm] = useState<FormData>({
    name: '', email: '', type: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(counterRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none reverse' } });

      gsap.fromTo(leftRef.current,
        { opacity: 0, x: -36 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } });

      gsap.fromTo(
        leftRef.current!.querySelectorAll('.step-item'),
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.52, stagger: 0.13, ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });

      gsap.fromTo(formRef.current,
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 82%', toggleActions: 'play none none reverse' } });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const update = (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          project_type: form.type,
          budget: form.budget,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Unable to send message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="relative overflow-hidden bg-black"
      style={{ paddingTop: '10vh', paddingBottom: '14vh' }}
    >
      {/* ── Fine grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Ambient glows ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(183,203,69,0.05) 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(183,203,69,0.035) 0%, transparent 65%)' }}
      />

      {/* ── Ghost watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-end pr-6 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-black leading-none tracking-tighter"
          style={{ fontSize: 'clamp(14rem, 28vw, 26rem)', opacity: 0.015, color: '#fff' }}
        >
          07
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16">

        {/* Section counter */}
        <div
          ref={counterRef}
          className="flex items-center gap-4 mb-16"
          style={{ opacity: 0 }}
        >
          <span className="font-mono text-xs text-[#B7CB45]/35 tracking-widest">002</span>
          <div className="w-16 h-px" style={{ background: 'linear-gradient(to right, rgba(183,203,69,0.4), transparent)' }} />
          <span className="text-[9px] font-semibold tracking-[0.28em] uppercase text-[#B7CB45]/60">Start a Project</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

          {/* ════ LEFT — Headline + process ════ */}
          <div ref={leftRef} className="lg:w-[38%]" style={{ opacity: 0 }}>

            {/* Stacked headline */}
            <div className="mb-12">
              <div className="overflow-hidden mb-0.5">
                <p
                  className="font-black leading-none select-none"
                  style={{
                    fontSize: 'clamp(1.4rem, 3.5vw, 3rem)',
                    WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                    color: 'transparent',
                    letterSpacing: '0.06em',
                  }}
                >
                  LET'S
                </p>
              </div>
              <div className="overflow-hidden">
                <p
                  className="font-black leading-none select-none"
                  style={{
                    fontSize: 'clamp(4rem, 10vw, 9rem)',
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 40%, #B7CB45 68%, #8fa832 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 50px rgba(183,203,69,0.4))',
                  }}
                >
                  WORK
                </p>
              </div>
              <div className="overflow-hidden">
                <p
                  className="font-black leading-none select-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5.2rem)',
                    letterSpacing: '-0.02em',
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.22)',
                    color: 'transparent',
                  }}
                >
                  TOGETHER
                </p>
              </div>

              <div
                className="mt-8 h-px w-32"
                style={{ background: 'linear-gradient(to right, #B7CB45, rgba(183,203,69,0.2), transparent)' }}
              />

              <p className="text-white/48 text-[15px] leading-relaxed mt-6" style={{ maxWidth: '26rem' }}>
                Fill in the details and we'll be in touch within 24 hours to explore how we can bring your vision to life.
              </p>
            </div>

            {/* Process timeline */}
            <div>
              <p className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#B7CB45]/50 mb-7">
                What Happens Next
              </p>
              <div>
                {STEPS.map((step, i) => (
                  <div
                    key={step.num}
                    className="step-item relative flex gap-5 pb-7"
                    style={{ opacity: 0 }}
                  >
                    {/* Connector line */}
                    {i < STEPS.length - 1 && (
                      <div
                        className="absolute left-[9px] top-7 bottom-0 w-px pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, rgba(183,203,69,0.3), transparent)' }}
                      />
                    )}

                    {/* Dot */}
                    <div
                      className="shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: 'rgba(183,203,69,0.12)',
                        border: '1px solid rgba(183,203,69,0.4)',
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-[#B7CB45]"
                        style={{ boxShadow: '0 0 6px rgba(183,203,69,0.8)' }}
                      />
                    </div>

                    {/* Text */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[9px] text-[#B7CB45]/45 tracking-widest">
                          {step.num}
                        </span>
                        <p className="text-white text-sm font-semibold">{step.title}</p>
                      </div>
                      <p className="text-white/40 text-[12px] leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT — Form ════ */}
          <div ref={formRef} className="lg:w-[62%]" style={{ opacity: 0 }}>

            {submitted ? (
              /* ── Success state ── */
              <div
                className="flex flex-col items-center justify-center text-center py-24 rounded-3xl"
                style={{
                  background: 'rgba(183,203,69,0.03)',
                  border: '1px solid rgba(183,203,69,0.15)',
                  animation: 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
                  style={{
                    background: 'rgba(183,203,69,0.1)',
                    border: '1px solid rgba(183,203,69,0.35)',
                    boxShadow: '0 0 50px rgba(183,203,69,0.15)',
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="text-white font-black mb-3"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}
                >
                  Message Sent!
                </h3>
                <p className="text-white/50 text-base mb-8" style={{ maxWidth: '30rem' }}>
                  Thank you for reaching out to Team Pixel Party. We'll review your brief and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', type: '', budget: '', message: '' });
                  }}
                  className="text-sm font-semibold text-[#B7CB45]/70 hover:text-[#B7CB45] transition-colors duration-200 flex items-center gap-2"
                >
                  Send another message
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6h8M6 2l4 4-4 4" />
                  </svg>
                </button>
              </div>

            ) : (
              /* ── Form card ── */
              <form onSubmit={handleSubmit} noValidate>
                <div
                  className="rounded-3xl"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 80px rgba(183,203,69,0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
                    padding: 'clamp(24px, 4vw, 44px)',
                  }}
                >
                  {/* Top lime accent bar */}
                  <div
                    className="h-px w-full mb-9"
                    style={{ background: 'linear-gradient(to right, #B7CB45, rgba(183,203,69,0.35), transparent)' }}
                  />

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={LABEL}>
                        Full Name <span className="text-[#B7CB45]">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={update('name')}
                        onFocus={focusIn}
                        onBlur={focusOut}
                        className={FIELD}
                        style={inputBase}
                      />
                    </div>
                    <div>
                      <label className={LABEL}>
                        Email Address <span className="text-[#B7CB45]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={update('email')}
                        onFocus={focusIn}
                        onBlur={focusOut}
                        className={FIELD}
                        style={inputBase}
                      />
                    </div>
                  </div>

                  {/* Project Type + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={LABEL}>Project Type</label>
                      <div className="relative">
                        <select
                          value={form.type}
                          onChange={update('type')}
                          onFocus={focusIn}
                          onBlur={focusOut}
                          className={FIELD}
                          style={{ ...inputBase, paddingRight: '40px' }}
                        >
                          <option value="" style={{ background: '#0a0a0a', color: '#fff' }}>
                            Select type
                          </option>
                          {PROJECT_TYPES.map(t => (
                            <option key={t} value={t} style={{ background: '#0a0a0a', color: '#fff' }}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="rgba(183,203,69,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 4l4 4 4-4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className={LABEL}>Budget Range</label>
                      <div className="relative">
                        <select
                          value={form.budget}
                          onChange={update('budget')}
                          onFocus={focusIn}
                          onBlur={focusOut}
                          className={FIELD}
                          style={{ ...inputBase, paddingRight: '40px' }}
                        >
                          <option value="" style={{ background: '#0a0a0a', color: '#fff' }}>
                            Select range
                          </option>
                          {BUDGETS.map(b => (
                            <option key={b} value={b} style={{ background: '#0a0a0a', color: '#fff' }}>
                              {b}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="rgba(183,203,69,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 4l4 4 4-4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-8">
                    <label className={LABEL}>
                      Your Message <span className="text-[#B7CB45]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your project, goals, timeline, and anything else that matters to you..."
                      value={form.message}
                      onChange={update('message')}
                      onFocus={focusIn}
                      onBlur={focusOut}
                      className={FIELD}
                      style={{ ...inputBase, resize: 'none', lineHeight: '1.65' }}
                    />
                  </div>

                  {/* Submit row */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <p className="text-white/25 text-[11px] leading-relaxed" style={{ maxWidth: '22rem' }}>
                      By submitting you agree to our{' '}
                      <a href="#" className="text-[#B7CB45]/45 hover:text-[#B7CB45] transition-colors">
                        Privacy Policy
                      </a>
                      . We never share your details.
                    </p>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {submitError && (
                        <p className="text-red-400 text-xs max-w-[220px] text-right">{submitError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-3 text-sm font-bold tracking-wide px-8 py-4 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                          background: '#B7CB45',
                          color: '#000',
                          boxShadow: '0 0 36px rgba(183,203,69,0.38)',
                        }}
                      >
                        {submitting ? 'Sending…' : 'Send Message'}
                        {!submitting && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bottom separator */}
                  <div
                    className="h-px w-full mt-9"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }}
                  />
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
