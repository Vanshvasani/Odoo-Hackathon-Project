import { useCurrency } from '../contexts/CurrencyContext';
import { StatCard, SectionHeading, ProgressBar, Card } from '../components/ui';
import { Bell } from 'lucide-react';

interface Props { onNavigate: (page: string) => void; }

export default function Dashboard({ onNavigate }: Props) {
  const { format } = useCurrency();

  const trips = [
    { dest: 'Bali, Indonesia', emoji: '🌴', dates: 'May 22 – Jun 1, 2026 · 10 nights', pct: 68, avatars: ['A','P','R'], colors: ['var(--terracotta)','var(--sky)','var(--sage)'], bg: 'linear-gradient(135deg,#2D6A4F,#52B788)' },
    { dest: 'Paris, France', emoji: '🗼', dates: 'Jul 14 – Jul 21, 2026 · 7 nights', pct: 24, avatars: ['A','S'], colors: ['var(--terracotta)','var(--gold)'], bg: 'linear-gradient(135deg,#4A1942,#8B2252)' },
  ];

  const quickActions = [
    { icon: '🔍', label: 'Explore Cities', sub: 'Find destinations', page: 'city-search', bg: 'var(--terracotta-pale)' },
    { icon: '💰', label: 'Track Budget', sub: 'Manage expenses', page: 'budget', bg: 'var(--sage-pale)' },
    { icon: '🎭', label: 'Find Activities', sub: 'Things to do', page: 'activity-search', bg: 'var(--sky-pale)' },
    { icon: '📓', label: 'Write Journal', sub: 'Capture memories', page: 'journal', bg: 'var(--gold-pale)' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="h-16 px-9 flex items-center justify-between sticky top-0 z-40 border-b transition-colors" style={{ background: 'var(--header-bg)', borderColor: 'var(--border)' }}>
        <div>
          <h1 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Good evening, Arjun 👋</h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Sunday, May 10, 2026</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="relative p-2 rounded-lg border" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            <Bell size={15} />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full border-2" style={{ background: 'var(--terracotta)', borderColor: 'var(--surface)' }} />
          </button>
          <button onClick={() => onNavigate('create-trip')} className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: 'var(--terracotta)' }}>
            + New Trip
          </button>
        </div>
      </div>

      <div className="p-9">
        {/* Welcome Banner */}
        <div className="rounded-2xl p-8 flex items-center justify-between mb-7 overflow-hidden relative" style={{ background: 'var(--ink)' }}>
          <div className="absolute" style={{ right: -40, top: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,98,63,0.2) 0%, transparent 70%)' }} />
          <div>
            <h2 className="font-display text-2xl mb-1.5" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--sand)' }}>Bali is 12 days away 🌴</h2>
            <p className="text-sm" style={{ color: 'rgba(245,240,232,0.6)' }}>You have 3 activities left to plan. Your itinerary is 68% complete.</p>
            <div className="flex gap-2.5 mt-4">
              <button onClick={() => onNavigate('itinerary-builder')} className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all" style={{ background: 'var(--terracotta)' }}>Continue Planning →</button>
              <button onClick={() => onNavigate('packing')} className="px-4 py-2 rounded-lg text-sm font-medium transition-all" style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--sand)' }}>View Packing List</button>
            </div>
          </div>
          <div className="rounded-xl p-4 min-w-[140px] relative z-10" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Next Trip</div>
            <div className="text-base font-semibold mb-2" style={{ color: 'var(--sand)' }}>🌴 Bali, Indonesia</div>
            <div className="font-display text-4xl leading-none" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--terracotta)' }}>12</div>
            <div className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>days to go</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          <StatCard label="Total Trips" value="14" sub="↑ +3 this year" subColor="var(--sage)" />
          <StatCard label="Countries Visited" value="28" sub="↑ +2 this year" subColor="var(--sage)" />
          <StatCard label="Total Spent" value={format(18400)} sub="across all trips" />
          <StatCard label="Upcoming" value="3" sub="trips planned" />
        </div>

        {/* Upcoming Trips */}
        <SectionHeading title="Upcoming Trips" action="View all →" onAction={() => onNavigate('my-trips')} />
        <div className="grid grid-cols-3 gap-4 mb-7">
          {trips.map(t => (
            <button
              key={t.dest}
              onClick={() => onNavigate('itinerary-view')}
              className="rounded-xl border overflow-hidden text-left transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="h-36 flex items-center justify-center text-5xl" style={{ background: t.bg }}>{t.emoji}</div>
              <div className="p-4">
                <div className="font-display text-base mb-1" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>{t.dest}</div>
                <div className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{t.dates}</div>
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-3">
                    <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{t.pct}% planned</div>
                    <ProgressBar pct={t.pct} />
                  </div>
                  <div className="flex">
                    {t.avatars.map((a, i) => (
                      <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 -ml-1.5 first:ml-0" style={{ background: t.colors[i], borderColor: 'var(--surface)' }}>{a}</div>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
          <button
            onClick={() => onNavigate('create-trip')}
            className="rounded-xl border overflow-hidden text-left transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="h-36 flex items-center justify-center text-2xl" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>＋ Plan a Trip</div>
            <div className="p-4">
              <div className="text-base font-display" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-muted)' }}>Add New Destination</div>
              <div className="text-xs font-semibold mt-1" style={{ color: 'var(--terracotta)' }}>Start planning →</div>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <SectionHeading title="Quick Actions" />
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map(qa => (
            <button
              key={qa.label}
              onClick={() => onNavigate(qa.page)}
              className="flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all hover:scale-[1.01]"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: qa.bg }}>{qa.icon}</div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{qa.label}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{qa.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
