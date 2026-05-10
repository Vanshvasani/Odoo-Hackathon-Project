import { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { Badge, Btn, ProgressBar } from '../components/ui';
import PageHeader from '../components/PageHeader';
import { Search } from 'lucide-react';

interface Props { onNavigate: (p: string) => void; }

const trips = [
  { dest: 'Bali, Indonesia', emoji: '🌴', dates: 'May 22 – Jun 1', travelers: 3, budget: 2400, pct: 68, status: 'upcoming' as const, bg: 'linear-gradient(135deg,#2D6A4F,#52B788)' },
  { dest: 'Paris, France', emoji: '🗼', dates: 'Jul 14 – Jul 21', travelers: 2, budget: 3800, pct: 24, status: 'upcoming' as const, bg: 'linear-gradient(135deg,#4A1942,#8B2252)' },
  { dest: 'Kyoto, Japan', emoji: '🏯', dates: 'Nov 5 – Nov 14', travelers: 2, budget: 4200, pct: 100, status: 'past' as const, bg: 'linear-gradient(135deg,#1A3A5C,#2E6DA4)', rating: '4.9' },
  { dest: 'Morocco', emoji: '🕌', dates: 'Dates TBD', travelers: 1, budget: 0, pct: 5, status: 'draft' as const, bg: 'linear-gradient(135deg,#7B3F00,#C56C12)' },
];

const filters = ['All Trips (14)', 'Upcoming (3)', 'In Progress (1)', 'Past (10)', 'Drafts (2)', 'Shared (3)'];
const badgeMap = { upcoming: 'sky', past: 'muted', draft: 'terra', inprogress: 'gold' } as const;

export default function MyTrips({ onNavigate }: Props) {
  const { format } = useCurrency();
  const [active, setActive] = useState(0);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="My Trips"
        subtitle="All your adventures, past and future"
        actions={
          <>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input className="pl-8 pr-3 py-2 rounded-lg border text-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)', width: 220 }} placeholder="Search trips..." />
            </div>
            <button onClick={() => onNavigate('create-trip')} className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: 'var(--terracotta)' }}>
              + New Trip
            </button>
          </>
        }
      />
      <div className="p-9">
        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {filters.map((f, i) => (
            <button
              key={f}
              onClick={() => setActive(i)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
              style={{
                background: active === i ? 'var(--terracotta)' : 'var(--surface)',
                color: active === i ? 'white' : 'var(--text-muted)',
                borderColor: active === i ? 'var(--terracotta)' : 'var(--border)',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {trips.map(t => (
            <div
              key={t.dest}
              className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
              onClick={() => onNavigate('itinerary-view')}
            >
              <div className="h-40 flex items-end p-4 relative" style={{ background: t.bg }}>
                <span className="absolute top-3 right-3">
                  <Badge variant={badgeMap[t.status] || 'muted'}>{t.status.charAt(0).toUpperCase() + t.status.slice(1)}</Badge>
                </span>
                <span className="text-4xl">{t.emoji}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>{t.dest}</h3>
                <div className="flex gap-3 text-xs mb-3.5" style={{ color: 'var(--text-muted)' }}>
                  <span>📅 {t.dates}</span>
                  <span>👥 {t.travelers}</span>
                  {t.budget > 0 && <span>💰 {format(t.budget)}</span>}
                </div>
                {t.status === 'past' ? (
                  <div className="text-xs font-semibold flex items-center gap-2 mb-3.5" style={{ color: 'var(--sage)' }}>
                    ✓ Completed · <span style={{ color: 'var(--gold)' }}>★ {t.rating} rated</span>
                  </div>
                ) : (
                  <div className="mb-3.5">
                    <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Planning progress</div>
                    <ProgressBar pct={t.pct} />
                  </div>
                )}
                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                  {t.status !== 'past' ? (
                    <>
                      <Btn size="sm" onClick={() => onNavigate('itinerary-builder')}>Edit →</Btn>
                      <Btn size="sm" variant="secondary">Share</Btn>
                      <Btn size="sm" variant="ghost">⋯</Btn>
                    </>
                  ) : (
                    <>
                      <Btn size="sm" variant="secondary">View Journal</Btn>
                      <Btn size="sm" variant="ghost">Share</Btn>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
