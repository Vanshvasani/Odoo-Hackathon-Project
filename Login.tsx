interface LoginProps {
  onNavigate: (page: string) => void;
}

export default function Login({ onNavigate }: LoginProps) {
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--ink)' }}>
      {/* Art Panel */}
      <div
        className="flex-1 relative overflow-hidden hidden md:flex flex-col justify-end p-12"
        style={{ background: 'linear-gradient(160deg, #2C1810 0%, #4A2515 40%, #1A2820 100%)' }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute" style={{ top: -80, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,98,63,0.15) 0%, transparent 70%)' }} />
        <div className="absolute" style={{ bottom: 100, left: -120, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,124,89,0.2) 0%, transparent 70%)' }} />

        <div className="absolute top-12 left-12 flex flex-col gap-3 z-10">
          {['🗼 Paris, France · 2,342 trips', '🏯 Kyoto, Japan · 1,891 trips', '🏛 Rome, Italy · 1,654 trips'].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-3xl text-sm backdrop-blur-md"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.8)',
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i}s`,
                marginLeft: i === 1 ? 24 : 0,
              }}
            >
              {text}
            </div>
          ))}
        </div>

        <div className="relative z-10">
          <p className="font-display italic text-4xl leading-snug mb-4" style={{ color: 'var(--sand)', fontFamily: "'Playfair Display', serif" }}>
            "The world is a book, and those who do not travel read only one page."
          </p>
          <p className="text-xs tracking-widest" style={{ color: 'rgba(245,240,232,0.4)' }}>— SAINT AUGUSTINE</p>
        </div>
      </div>

      {/* Form Panel */}
      <div
        className="w-full md:w-[480px] flex flex-col justify-center px-12 md:px-14 py-16 min-h-screen"
        style={{ background: 'var(--sand)' }}
      >
        <div className="font-display text-3xl mb-1.5" style={{ color: 'var(--ink)', fontFamily: "'Playfair Display', serif" }}>Wandr ✦</div>
        <p className="text-sm mb-9" style={{ color: 'var(--ink-muted)' }}>Your journeys, beautifully planned.</p>

        {[['🌐', 'Continue with Google'], ['🍎', 'Continue with Apple']].map(([icon, label]) => (
          <button
            key={label}
            onClick={() => onNavigate('dashboard')}
            className="w-full flex items-center justify-center gap-2.5 py-3 mb-2.5 rounded-lg font-medium text-sm transition-all"
            style={{ background: '#fff', border: '1.5px solid rgba(26,24,20,0.25)', color: 'var(--ink)' }}
          >
            <span>{icon}</span> {label}
          </button>
        ))}

        <div className="flex items-center gap-3 my-5 text-xs" style={{ color: 'var(--ink-muted)' }}>
          <div className="flex-1 h-px" style={{ background: 'rgba(26,24,20,0.12)' }} />
          or sign in with email
          <div className="flex-1 h-px" style={{ background: 'rgba(26,24,20,0.12)' }} />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--ink-soft)' }}>Email address</label>
          <input className="w-full px-3.5 py-2.5 rounded-lg text-sm border" style={{ background: '#fff', borderColor: 'rgba(26,24,20,0.18)', color: 'var(--ink)' }} type="email" placeholder="you@example.com" />
        </div>
        <div className="mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--ink-soft)' }}>Password</label>
          <input className="w-full px-3.5 py-2.5 rounded-lg text-sm border" style={{ background: '#fff', borderColor: 'rgba(26,24,20,0.18)', color: 'var(--ink)' }} type="password" placeholder="••••••••" />
        </div>
        <div className="text-right mb-5">
          <button className="text-xs font-semibold" style={{ color: 'var(--terracotta)' }}>Forgot password?</button>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full py-3.5 rounded-xl text-base font-semibold text-white transition-all"
          style={{ background: 'var(--terracotta)' }}
        >
          Sign In →
        </button>

        <p className="text-center mt-7 text-sm" style={{ color: 'var(--ink-muted)' }}>
          Don't have an account?{' '}
          <button className="font-semibold" style={{ color: 'var(--terracotta)' }} onClick={() => onNavigate('dashboard')}>
            Create one free
          </button>
        </p>
        <p className="text-center mt-4 text-xs" style={{ color: 'var(--ink-muted)' }}>
          By signing in you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
