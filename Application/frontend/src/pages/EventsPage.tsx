import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useEffect } from 'react';

export function EventsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 relative flex items-center justify-center pt-24 pb-16 overflow-hidden min-h-[80vh]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-black/75 backdrop-blur-sm" />
        
        {/* Glow */}
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
            <span style={{ 
              background: 'linear-gradient(135deg, #B7CB45 0%, #e0f06a 50%, #8fa832 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
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

      <Footer />
    </div>
  );
}
