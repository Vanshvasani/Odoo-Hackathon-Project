import { useCurrency } from '../contexts/CurrencyContext';
import { Card, Badge, SectionHeading, Btn } from '../components/ui';
import PageHeader from '../components/PageHeader';
import { Download, Plus } from 'lucide-react';

interface Props { onNavigate: (p: string) => void; }

const expenses = [
  { name: '✈️ Mumbai → Denpasar (return)', sub: 'IndiGo Air · 3 tickets', category: 'Flights', date: 'May 22', amount: 840, badgeVar: 'sky' as const },
  { name: '🏨 Alaya Resort Ubud', sub: '7 nights · 2 rooms', category: 'Hotel', date: 'May 22', amount: 1260, badgeVar: 'terra' as const },
  { name: '🍽 Swept Away — Dinner', sub: '3 people', category: 'Food', date: 'May 22', amount: 255, badgeVar: 'sage' as const },
  { name: '🏄 Surf Lesson — Kuta', sub: '3 people · 2hrs', category: 'Activity', date: 'May 23', amount: 105, badgeVar: 'muted' as const },
];

const segments = [
  { label: 'Flights', pct: 35, amount: 840, color: 'var(--terracotta)' },
  { label: 'Hotels', pct: 42, amount: 1008, color: 'var(--sky)' },
  { label: 'Food & Dining', pct: 16, amount: 384, color: 'var(--sage)' },
  { label: 'Activities', pct: 7, amount: 168, color: 'var(--gold)' },
];

export default function Budget({ onNavigate: _nav }: Props) {
  const { format } = useCurrency();
  const r = 46;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Trip Budget"
        subtitle="🌴 Bali, Indonesia · May 22 – Jun 1"
        actions={
          <>
            <Btn variant="secondary" size="sm"><Download size={13} /> Export</Btn>
            <Btn size="sm"><Plus size={13} /> Add Expense</Btn>
          </>
        }
      />
      <div className="p-9">
        {/* Alert */}
        <div className="rounded-lg px-4 py-3 mb-5 flex items-center gap-2.5 text-sm" style={{ background: 'var(--gold-pale)', border: '1px solid var(--gold)', color: '#6B4C0A' }}>
          ⚠️ <strong>Heads up!</strong> Your Food & Dining category is 15% over your allocated budget.
        </div>

        {/* Budget overview */}
        <Card className="p-6 flex items-center gap-8 mb-6 flex-wrap">
          {/* Donut */}
          <div className="relative flex-shrink-0" style={{ width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="60" cy="60" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="14" />
              {segments.map(seg => {
                const dash = (seg.pct / 100) * circ;
                const elem = (
                  <circle key={seg.label} cx="60" cy="60" r={r} fill="none" stroke={seg.color} strokeWidth="14"
                    strokeDasharray={`${dash} ${circ - dash}`}
                    strokeDashoffset={-offset}
                  />
                );
                offset += dash;
                return elem;
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="font-display text-lg font-bold leading-none" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>{format(2400)}</div>
              <div className="text-xs mt-0.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Budget</div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 min-w-[160px]">
            {segments.map(seg => (
              <div key={seg.label} className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{seg.label}</span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{seg.pct}%</span>
                </div>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{format(seg.amount)}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-4 min-w-[140px]">
            <div>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Total Budget</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{format(2400)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Spent</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--terracotta)' }}>{format(1680)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Remaining</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--sage)' }}>{format(720)}</div>
            </div>
          </div>
        </Card>

        {/* Expenses table */}
        <div className="flex items-center justify-between mb-4">
          <SectionHeading title="All Expenses" />
          <select className="px-3 py-1.5 rounded-lg border text-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <option>All Categories</option>
            {['Flights','Hotels','Food','Activities'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <Card className="overflow-hidden">
          {/* Table header */}
          <div className="grid gap-3 px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr auto', background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
            <span>Description</span><span>Category</span><span>Date</span><span>Amount</span><span>Action</span>
          </div>
          {expenses.map(e => (
            <div key={e.name} className="grid gap-3 px-5 py-3.5 items-center border-t text-sm transition-colors hover:bg-[var(--surface-2)]" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr auto', borderColor: 'var(--border)' }}>
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{e.name}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{e.sub}</div>
              </div>
              <div><Badge variant={e.badgeVar}>{e.category}</Badge></div>
              <div style={{ color: 'var(--text-muted)' }}>{e.date}</div>
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{format(e.amount)}</div>
              <button className="text-xs px-2 py-1 rounded" style={{ color: 'var(--text-muted)' }}>✎</button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
