import { useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

function appear(delay: number): CSSProperties {
  return { opacity: 0, animation: `fadeInUp 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s forwards` };
}

const inputBase: CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  padding: '14px 18px',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
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

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Unable to connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(183,203,69,0.06) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-0.5 mb-10" style={appear(0)}>
          <a href="/" className="flex items-center gap-0.5 select-none">
            <span className="text-xl font-black tracking-tight text-white">PIXEL</span>
            <span className="text-xl font-black tracking-tight text-[#B7CB45]">&nbsp;PARTY</span>
            <span className="ml-1 mb-0.5 inline-block w-1.5 h-1.5 rounded-full bg-[#B7CB45]" />
          </a>
        </div>

        {/* Card */}
        <div
          style={{
            ...appear(0.1),
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '40px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 0 80px rgba(183,203,69,0.04)',
          }}
        >
          {/* Top lime accent */}
          <div
            className="h-px w-full mb-8"
            style={{ background: 'linear-gradient(to right, #B7CB45, rgba(183,203,69,0.35), transparent)' }}
          />

          <div className="mb-8" style={appear(0.15)}>
            <div className="flex items-center gap-2 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="font-mono text-[9px] text-[#B7CB45]/50 tracking-[0.28em] uppercase">Admin Panel</span>
            </div>
            <h1
              className="font-black text-white"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.02em' }}
            >
              Sign In
            </h1>
            <p className="text-white/35 text-sm mt-1">Access the Pixel Party dashboard</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-5" style={appear(0.2)}>
              <div>
                <label className="block text-[10px] font-semibold tracking-[0.22em] uppercase text-[#B7CB45]/65 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={focusIn}
                  onBlur={focusOut}
                  style={inputBase}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold tracking-[0.22em] uppercase text-[#B7CB45]/65 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onFocus={focusIn}
                  onBlur={focusOut}
                  style={inputBase}
                  required
                />
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-red-400 text-sm"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 text-sm font-bold tracking-wide py-4 rounded-full transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                style={{ background: '#B7CB45', color: '#000', boxShadow: '0 0 36px rgba(183,203,69,0.35)' }}
              >
                {loading ? 'Signing in…' : 'Sign In to Dashboard'}
                {!loading && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </form>

          <div
            className="h-px w-full mt-8"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }}
          />
        </div>

        <p className="text-center text-white/20 text-xs mt-6" style={appear(0.3)}>
          &copy; {new Date().getFullYear()} Pixel Party. Restricted access.
        </p>
      </div>
    </main>
  );
}
