import { useCurrency } from '../contexts/CurrencyContext';
import { Badge, Btn } from '../components/ui';
import PageHeader from '../components/PageHeader';
import { Share2, Download, Pencil, MapPin } from 'lucide-react';

interface Props { onNavigate: (p: string) => void; }

const days = [
  {
    title: 'Day 1 — Arrival & First Sunset', date: 'Friday, May 22',
    activities: [
      { time: '09:00', title: 'Arrive at Ngurah Rai International Airport', loc: '✈️ Denpasar (DPS)', cost: 0, tags: [{ v: 'sky' as const, t: 'Transit' }] },
      { time: '13:00', title: 'Check-in: Alaya Resort Ubud', loc: '📍 Ubud, Bali · 4-star boutique resort', cost: 180, tags: [{ v: 'terra' as const, t: 'Hotel' }, { v: 'gold' as const, t: '★ 4.8' }] },
      { time: '18:00', title: 'Sunset dinner at Swept Away', loc: '🍽 Seminyak Beach, Bali', cost: 85, tags: [{ v: 'sage' as const, t: 'Dining' }, { v: 'gold' as const, t: '★ 4.7' }] },
    ],
  },
  {
    title: 'Day 2 — Ubud & Culture', date: 'Saturday, May 23',
    activities: [
      { time: '08:00', title: 'Tegallalang Rice Terrace Visit', loc: '📍 Tegallalang, Ubud · UNESCO listed', cost: 5, tags: [{ v: 'sage' as const, t: 'Nature' }, { v: 'muted' as const, t: 'Outdoors' }] },
      { time: '11:00', title: 'Balinese Cooking Class', loc: '🍜 Casa Luna, Ubud · 3-hour class', cost: 45, tags: [{ v: 'terra' as const, t: 'Experience' }, { v: 'gold' as const, t: '★ 4.9' }] },
    ],
  },
];

export default function ItineraryView({ onNavigate }: Props) {
  const { format } = useCurrency();

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Itinerary View"
        subtitle="🌴 Bali, Indonesia — 10 Days"
        actions={
          <>
            <Btn variant="secondary" size="sm"><Share2 size={13} /> Share</Btn>
            <Btn variant="secondary" size="sm"><Download size={13} /> Export PDF</Btn>
            <Btn size="sm" onClick={() => onNavigate('itinerary-builder')}><Pencil size={13} /> Edit</Btn>
          </>
        }
      />
      <div className="p-9">
        {/* Hero */}
        <div className="rounded-2xl p-8 mb-7 flex items-center justify-between relative overflow-hidden" style={{ background: 'var(--ink)' }}>
          <div>
            <h1 className="font-display text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--sand)' }}>Bali, Indonesia</h1>
            <p className="text-sm" style={{ color: 'rgba(245,240,232,0.55)' }}>A perfect blend of temples, rice terraces, and tropical bliss</p>
            <div className="flex gap-5 mt-4">
              {['📅 May 22 – Jun 1, 2026', '🌙 10 nights', '👥 3 travelers', `💰 ${format(2400)}`].map(m => (
                <span key={m} className="text-sm flex items-center gap-1.5" style={{ color: 'rgba(245,240,232,0.7)' }}>{m}</span>
              ))}
            </div>
          </div>
          <div className="text-8xl opacity-15 select-none">🌺</div>
        </div>

        {/* Map placeholder */}
        <div className="rounded-xl flex flex-col items-center justify-center gap-2 mb-7 border" style={{ height: 200, background: 'var(--surface-2)', borderColor: 'var(--border)', borderStyle: 'dashed' }}>
          <MapPin size={28} style={{ color: 'var(--text-muted)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Interactive Map — Google Maps embed goes here</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Shows all activity locations with pins</span>
        </div>

        {/* Days */}
        {days.map(d => (
          <div key={d.title} className="rounded-xl border mb-4 overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between px-5 py-3.5" style={{ background: 'var(--surface-2)' }}>
              <div className="font-bold text-sm uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>{d.title}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{d.date}</div>
            </div>
            <div className="px-5">
              {d.activities.map((a, i) => (
                <div key={a.title} className={`flex gap-4 py-3.5 items-start ${i < d.activities.length - 1 ? 'border-b' : ''}`} style={{ borderColor: 'var(--border)' }}>
                  <div className="text-xs font-semibold pt-0.5 min-w-[52px]" style={{ color: 'var(--terracotta)' }}>{a.time}</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{a.title}</div>
                    <div className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>{a.loc}</div>
                    <div className="flex gap-1.5 mt-2">{a.tags.map(t => <Badge key={t.t} variant={t.v}>{t.t}</Badge>)}</div>
                  </div>
                  <div className="text-sm font-semibold" style={{ color: a.cost > 0 ? 'var(--sage)' : 'var(--text-muted)' }}>
                    {a.cost > 0 ? `${format(a.cost)}/person` : '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
