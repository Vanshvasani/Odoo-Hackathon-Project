import { useCurrency } from '../contexts/CurrencyContext';
import { Badge, Btn } from '../components/ui';

interface Props { onNavigate: (p: string) => void; }

export default function Shared({ onNavigate }: Props) {
  const { format } = useCurrency();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Public header */}
      <div className="px-9 py-4 flex items-center justify-between border-b" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="font-display text-xl" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>Wandr ✦</div>
        <div className="flex gap-2.5">
          <Btn variant="secondary" size="sm" onClick={() => onNavigate('dashboard')}>Log in</Btn>
          <Btn size="sm" onClick={() => onNavigate('dashboard')}>Sign up free</Btn>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-9 py-8">
        {/* Clone banner */}
        <div className="rounded-xl p-5 flex items-center justify-between mb-6" style={{ background: 'var(--terracotta)' }}>
          <div className="text-white">
            <div className="font-semibold text-base mb-1">Love this itinerary? Clone it to your Wandr account</div>
            <div className="text-sm opacity-80">You'll get a full copy to customize for your own trip — free to edit, yours to keep.</div>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="ml-4 px-4 py-2 rounded-lg text-sm font-bold flex-shrink-0"
            style={{ background: 'white', color: 'var(--terracotta)' }}
          >
            Clone This Trip ✦
          </button>
        </div>

        {/* Hero */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)', border: '1px solid var(--border)' }}>
          <div className="p-8 relative" style={{ background: 'var(--ink)' }}>
            <div className="flex gap-2 mb-3">
              <Badge variant="sage">Public Itinerary</Badge>
              <Badge variant="gold">Featured</Badge>
            </div>
            <h1 className="font-display text-3xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--sand)' }}>
              10 Days in Bali: The Complete Guide
            </h1>
            <p className="text-sm" style={{ color: 'rgba(245,240,232,0.6)' }}>
              Temples, rice terraces, volcano treks, beach clubs, and the best local warungs — a perfect 10-day itinerary planned by a local.
            </p>
            <div className="flex items-center gap-2.5 mt-5">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--terracotta)' }}>AS</div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--sand)' }}>Arjun Sharma</div>
                <div className="text-xs" style={{ color: 'rgba(245,240,232,0.5)' }}>Wandr Pro · 28 countries visited</div>
              </div>
            </div>
            <div className="absolute right-8 top-5 text-7xl opacity-20 select-none">🗼</div>
          </div>
          <div className="flex gap-7 px-8 py-4" style={{ background: 'var(--surface-2)' }}>
            {[['10','Days'],['32','Activities'],[format(2400),'Budget'],['1.2k','Views'],['87','Clones']].map(([v,l]) => (
              <div key={l} className="text-center">
                <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{v}</div>
                <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Day 1 */}
        <div className="rounded-xl border mb-5 overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between px-5 py-3.5" style={{ background: 'var(--surface-2)' }}>
            <div className="font-bold text-sm uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>Day 1 — Arrival & Sunset</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>May 22</div>
          </div>
          <div className="px-5">
            {[
              { time: '09:00', title: 'Arrive at Ngurah Rai Airport', desc: '✈️ Pick up at arrivals, arrange transfer to Ubud (~1.5hrs)', cost: 0 },
              { time: '18:00', title: 'Sunset at Tanah Lot Temple', desc: "📍 Worth the drive — don't miss this", cost: 5 },
            ].map((a, i) => (
              <div key={a.title} className={`flex gap-4 py-3.5 ${i === 0 ? 'border-b' : ''}`} style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs font-semibold min-w-[52px] pt-0.5" style={{ color: 'var(--terracotta)' }}>{a.time}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{a.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{a.desc}</div>
                </div>
                <div className="text-sm font-semibold" style={{ color: a.cost > 0 ? 'var(--sage)' : 'var(--text-muted)' }}>
                  {a.cost > 0 ? format(a.cost) : '—'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>Comments (12)</div>
          {[
            { init: 'MK', name: 'Maya K.', text: "Just got back from following this itinerary — it was absolutely perfect! The Mount Batur sunrise trek is worth every early morning wake-up.", time: '2 days ago · 14 likes', color: 'var(--sky)' },
            { init: 'RB', name: 'Ravi B.', text: "The cooking class at Casa Luna is fully booked 3 weeks in advance — book early! Replaced it with one in Seminyak which was also great.", time: '5 days ago · 8 likes', color: 'var(--sage)' },
          ].map(c => (
            <div key={c.name} className="flex gap-3 py-3.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: c.color }}>{c.init}</div>
              <div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{c.name}</div>
                <div className="text-sm mt-0.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{c.text}</div>
                <div className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>{c.time}</div>
              </div>
            </div>
          ))}
          <div className="flex gap-2.5 mt-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>?</div>
            <input className="flex-1 px-3.5 py-2 rounded-lg border text-sm" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} placeholder="Add a comment..." />
            <Btn size="sm">Post</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
