import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Contact = {
  id: number;
  name: string;
  email: string;
  project_type: string | null;
  budget: string | null;
  message: string;
  status: 'new' | 'reviewed' | 'closed';
  created_at: string;
};

type Filter = 'all' | 'new' | 'reviewed' | 'closed';

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-[#B7CB45]/15 text-[#B7CB45] border-[#B7CB45]/25',
  reviewed: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  closed: 'bg-white/8 text-white/35 border-white/10',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);

  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) { navigate('/admin/login'); return; }
    fetchContacts();
  }, []);

  async function fetchContacts() {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { navigate('/admin/login'); return; }
      const data = await res.json();
      if (data.success) setContacts(data.data);
      else setError('Failed to load contacts');
    } catch {
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: number, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`http://localhost:3001/api/admin/contacts/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: status as Contact['status'] } : c));
      }
    } finally {
      setUpdating(null);
    }
  }

  function logout() {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  }

  const filtered = filter === 'all' ? contacts : contacts.filter(c => c.status === filter);
  const counts = {
    all: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    reviewed: contacts.filter(c => c.status === 'reviewed').length,
    closed: contacts.filter(c => c.status === 'closed').length,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid bg */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* Top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-10 h-16"
        style={{
          background: 'rgba(0,0,0,0.85)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-0.5 select-none">
            <span className="text-base font-black tracking-tight text-white">PIXEL</span>
            <span className="text-base font-black tracking-tight text-[#B7CB45]">&nbsp;PARTY</span>
            <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-[#B7CB45]" />
          </a>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/30">Admin Dashboard</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors duration-200 px-3 py-1.5 rounded-lg border border-white/[0.07] hover:border-white/20"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </header>

      {/* Page content */}
      <main className="relative z-10 pt-24 pb-16 px-6 lg:px-10 max-w-[1400px] mx-auto">

        {/* Page title */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(183,203,69,0.5))' }} />
            <span className="font-mono text-[9px] text-[#B7CB45]/40 tracking-[0.32em] uppercase">Inbox</span>
          </div>
          <h1
            className="font-black text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Contact Requests
          </h1>
          <p className="text-white/35 text-sm mt-2">All enquiries submitted through the contact form</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {(['all', 'new', 'reviewed', 'closed'] as Filter[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-left rounded-2xl px-5 py-4 transition-all duration-200"
              style={{
                background: filter === f ? 'rgba(183,203,69,0.08)' : 'rgba(255,255,255,0.025)',
                border: filter === f ? '1px solid rgba(183,203,69,0.3)' : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p
                className="font-black mb-0.5"
                style={{
                  fontSize: '2rem',
                  color: filter === f ? '#B7CB45' : '#fff',
                  letterSpacing: '-0.04em',
                }}
              >
                {counts[f]}
              </p>
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/35">
                {f === 'all' ? 'Total' : f}
              </p>
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div
              className="w-10 h-10 rounded-full border-2 border-[#B7CB45]/20 border-t-[#B7CB45] animate-spin"
            />
          </div>
        ) : error ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center rounded-2xl"
            style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}
          >
            <p className="text-red-400 font-semibold mb-2">{error}</p>
            <button onClick={fetchContacts} className="text-sm text-white/40 hover:text-white transition-colors mt-2">
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: 'rgba(183,203,69,0.08)', border: '1px solid rgba(183,203,69,0.15)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B7CB45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <p className="text-white/40 font-semibold">No {filter === 'all' ? '' : filter} requests yet</p>
            <p className="text-white/20 text-sm mt-1">They'll appear here once customers submit the contact form</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map(contact => (
              <div
                key={contact.id}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: expanded === contact.id
                    ? '1px solid rgba(183,203,69,0.2)'
                    : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {/* Row */}
                <div
                  className="flex flex-col lg:flex-row lg:items-center gap-4 px-6 py-5 cursor-pointer"
                  onClick={() => setExpanded(expanded === contact.id ? null : contact.id)}
                >
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
                    style={{ background: 'rgba(183,203,69,0.1)', color: '#B7CB45', border: '1px solid rgba(183,203,69,0.2)' }}
                  >
                    {contact.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Name + email */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{contact.name}</p>
                    <p className="text-white/40 text-xs truncate">{contact.email}</p>
                  </div>

                  {/* Project type */}
                  <div className="hidden lg:block w-40 shrink-0">
                    <p className="text-white/55 text-xs truncate">{contact.project_type || '—'}</p>
                    <p className="text-white/25 text-[10px] mt-0.5">{contact.budget || '—'}</p>
                  </div>

                  {/* Date */}
                  <div className="hidden lg:block w-40 shrink-0">
                    <p className="text-white/35 text-xs">{formatDate(contact.created_at)}</p>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase border shrink-0 ${STATUS_STYLES[contact.status]}`}
                  >
                    {contact.status}
                  </span>

                  {/* Chevron */}
                  <svg
                    className="shrink-0 transition-transform duration-200 text-white/25"
                    style={{ transform: expanded === contact.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Expanded detail */}
                {expanded === contact.id && (
                  <div
                    className="px-6 pb-6 pt-0"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="pt-5 flex flex-col lg:flex-row gap-6">
                      {/* Message */}
                      <div className="flex-1">
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B7CB45]/50 mb-3">Message</p>
                        <p className="text-white/65 text-sm leading-relaxed whitespace-pre-wrap">{contact.message}</p>

                        {/* Mobile-only details */}
                        <div className="lg:hidden mt-4 flex flex-wrap gap-4">
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Project</p>
                            <p className="text-white/55 text-sm">{contact.project_type || '—'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Budget</p>
                            <p className="text-white/55 text-sm">{contact.budget || '—'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Date</p>
                            <p className="text-white/55 text-sm">{formatDate(contact.created_at)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="shrink-0 flex flex-col gap-2" style={{ minWidth: '160px' }}>
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B7CB45]/50 mb-1">Update Status</p>
                        {(['new', 'reviewed', 'closed'] as const).map(s => (
                          <button
                            key={s}
                            onClick={() => updateStatus(contact.id, s)}
                            disabled={contact.status === s || updating === contact.id}
                            className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all duration-150 capitalize disabled:cursor-not-allowed ${
                              contact.status === s
                                ? STATUS_STYLES[s] + ' opacity-100'
                                : 'text-white/40 border-white/[0.08] hover:border-white/20 hover:text-white/70'
                            }`}
                          >
                            {updating === contact.id ? '…' : s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
