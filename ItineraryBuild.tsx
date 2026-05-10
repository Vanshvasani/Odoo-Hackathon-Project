import { useCurrency } from '../contexts/CurrencyContext';
import { Card, Btn } from '../components/ui';
import PageHeader from '../components/PageHeader';
import { Plus } from 'lucide-react';

interface Props { onNavigate: (p: string) => void; }

const days = [
  {
    day: 'Day 1', date: 'May 22',
    activities: [
      { time: '09:00 AM', title: 'Arrive at Ngurah Rai Airport', loc: '✈️ DPS International', cost: 0, color: 'var(--sky)' },
      { time: '01:00 PM', title: 'Check-in: Alaya Resort Ubud', loc: '📍 Ubud, Bali', cost: 180, color: 'var(--terracotta)' },
      { time: '06:00 PM', title: 'Sunset dinner at Swept Away', loc: '🍽 Seminyak', cost: 85, color: 'var(--sage)' },
    ],
  },
  {
    day: 'Day 2', date: 'May 23',
    activities: [
      { time: '08:00 AM', title: 'Tegallalang Rice Terrace', loc: '📍 Tegallalang, Ubud', cost: 5, color: 'var(--gold)' },
      { time: '11:00 AM', title: 'Bali cooking class', loc: '🍜 Casa Luna, Ubud', cost: 45, color: 'var(--sage)' },
      { time: '04:00 PM', title: 'Tirta Empul Temple', loc: '📍 Tampaksiring', cost: 3, color: 'var(--terracotta)' },
    ],
  },
  {
    day: 'Day 3', date: 'May 24',
    activities: [
      { time: '07:00 AM', title: 'Mount Batur Sunrise Trek', loc: '🏔 Kintamani', cost: 65, color: 'var(--sky)' },
      { time: '02:00 PM', title: 'Hot spring recovery', loc: '💆 Banjar Natural Hot Springs', cost: 8, color: 'var(--sage)' },
    ],
  },
];

const budgetItems = [
  { label: 'Flights', color: 'var(--terracotta)', amount: 840 },
  { label: 'Hotels', color: 'var(--sky)', amount: 1260 },
  { label: 'Food', color: 'var(--sage)', amount: 380 },
  { label: 'Remaining', color: 'var(--surface-2)', amount: 720 },
];

export default function ItineraryBuilder({ onNavigate }: Props) {
  const { format } = useCurrency();

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="🌴 Bali — Itinerary Builder"
        subtitle="May 22 – Jun 1, 2026 · 10 days · 3 travelers"
        actions={
          <>
            <Btn variant="secondary" size="sm" onClick={() => onNavigate('activity-search')}><Plus size={13} /> Add Activity</Btn>
            <Btn size="sm" onClick={() => onNavigate('itinerary-view')}>Preview →</Btn>
          </>
        }
      />
      <div className="p-9">
        <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 300px' }}>
          {/* Day columns */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-3.5" style={{ minWidth: 'max-content' }}>
              {days.map(d => (
                <div key={d.day} className="rounded-xl p-3.5" style={{ minWidth: 240, background: 'var(--surface-2)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>{d.day}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{d.date}</div>
                    </div>
                    <button className="w-6 h-6 flex items-center justify-center rounded" style={{ color: 'var(--text-muted)' }}><Plus size={14} /></button>
                  </div>
                  {d.activities.map(a => (
                    <div key={a.title} className="rounded-lg p-3 mb-2 border relative" style={{ background: 'var(--surface)', borderColor: 'var(--border)', borderLeftWidth: 3, borderLeftColor: a.color }}>
                      <div className="text-xs font-semibold tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>{a.time}</div>
                      <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>{a.title}</div>
                      <div className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>{a.loc}</div>
                      {a.cost > 0 && <div className="text-xs font-semibold mt-1.5" style={{ color: 'var(--sage)' }}>{format(a.cost)}/person</div>}
                    </div>
                  ))}
                  <button className="w-full py-2 rounded-lg border-dashed border text-xs flex items-center justify-center gap-1.5 transition-all" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-muted)', background: 'transparent' }}>
                    <Plus size={12} /> Add activity
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-3.5">
            {/* Budget ring */}
            <Card className="p-5">
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Trip Budget</div>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="48" cy="48" r="36" fill="none" stroke="var(--surface-2)" strokeWidth="10" />
                  <circle cx="48" cy="48" r="36" fill="none" stroke="var(--terracotta)" strokeWidth="10" strokeDasharray="160 226" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>68%</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>allocated</div>
                </div>
              </div>
              {budgetItems.map(b => (
                <div key={b.label} className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{b.label}</span>
                  </div>
                  <span className="text-xs font-semibold" style={{ color: b.label === 'Remaining' ? 'var(--sage)' : 'var(--text-primary)' }}>{format(b.amount)}</span>
                </div>
              ))}
            </Card>

            {/* Collaborators */}
            <Card className="p-5">
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Collaborators</div>
              <div className="space-y-2.5">
                {[
                  { init: 'A', name: 'Arjun (you)', role: 'Owner', color: 'var(--terracotta)' },
                  { init: 'P', name: 'Priya', role: 'Can edit', color: 'var(--sky)' },
                  { init: 'R', name: 'Rahul', role: 'Can view', color: 'var(--sage)' },
                ].map(c => (
                  <div key={c.name} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: c.color }}>{c.init}</div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{c.name}</div>
                      <div className="text-xs" style={{ color: c.role === 'Owner' ? 'var(--sage)' : 'var(--text-muted)' }}>{c.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Btn variant="secondary" size="sm" className="w-full mt-3"><Plus size={12} /> Invite</Btn>
            </Card>

            {/* Notes */}
            <Card className="p-5">
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Trip Notes</div>
              <textarea
                className="w-full rounded-lg border p-3 text-sm resize-none"
                style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)', minHeight: 80 }}
                defaultValue="Book airport transfer in advance! Check visa requirements for Indonesia 🇮🇩"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
