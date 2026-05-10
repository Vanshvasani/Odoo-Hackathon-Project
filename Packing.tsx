import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Btn } from '../components/ui';
import { Plus, FileText } from 'lucide-react';

type Item = { label: string; checked: boolean; tag?: string };
type Category = { icon: string; name: string; items: Item[] };

const initialCategories: Category[] = [
  { icon: '👕', name: 'Clothing', items: [
    { label: 'Light t-shirts (7)', checked: true, tag: 'Essential' },
    { label: 'Swimwear (2 sets)', checked: true },
    { label: 'Light linen pants', checked: true },
    { label: 'Temple sarong (required for entry)', checked: false, tag: 'Essential' },
    { label: 'Rain jacket (May can have showers)', checked: false },
  ]},
  { icon: '📄', name: 'Documents', items: [
    { label: 'Passport (valid 6+ months)', checked: true, tag: 'Critical' },
    { label: 'Travel insurance documents', checked: true },
    { label: 'Hotel confirmation printouts', checked: true },
    { label: 'Flight tickets', checked: true },
    { label: 'Emergency contact card', checked: true },
  ]},
  { icon: '🧴', name: 'Toiletries', items: [
    { label: 'Sunscreen SPF 50+', checked: true, tag: 'Essential' },
    { label: 'Insect repellent', checked: true },
    { label: 'Hand sanitizer', checked: true },
    { label: 'After-sun lotion', checked: false },
    { label: 'Prescription medications', checked: false, tag: 'Critical' },
  ]},
];

export default function Packing() {
  const [cats, setCats] = useState(initialCategories);

  const toggle = (ci: number, ii: number) => {
    setCats(prev => prev.map((c, i) => i !== ci ? c : {
      ...c,
      items: c.items.map((item, j) => j !== ii ? item : { ...item, checked: !item.checked }),
    }));
  };

  const total = cats.reduce((sum, c) => sum + c.items.length, 0);
  const packed = cats.reduce((sum, c) => sum + c.items.filter(i => i.checked).length, 0);
  const pct = Math.round((packed / total) * 100);
  const r = 34;
  const circ = 2 * Math.PI * r;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Packing Checklist"
        subtitle="🌴 Bali, Indonesia · Packing for 10 days"
        actions={
          <>
            <Btn variant="secondary" size="sm"><FileText size={13} /> Load Template</Btn>
            <Btn size="sm"><Plus size={13} /> Add Item</Btn>
          </>
        }
      />
      <div className="p-9">
        <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 280px' }}>
          <div>
            {cats.map((cat, ci) => {
              const catPacked = cat.items.filter(i => i.checked).length;
              const catPct = (catPacked / cat.items.length) * 100;
              const catColor = catPct === 100 ? 'var(--sage)' : catPct >= 50 ? 'var(--gold)' : 'var(--terracotta)';
              return (
                <div key={cat.name} className="rounded-xl border mb-3.5 overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between px-5 py-3.5" style={{ background: 'var(--surface-2)' }}>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{cat.name}</div>
                        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{catPacked} of {cat.items.length} packed</div>
                      </div>
                    </div>
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--surface)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${catPct}%`, background: catColor }} />
                    </div>
                  </div>
                  <div className="px-5 py-1">
                    {cat.items.map((item, ii) => (
                      <div key={item.label} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                        <button
                          onClick={() => toggle(ci, ii)}
                          className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border-2 transition-all text-xs font-bold"
                          style={{
                            background: item.checked ? 'var(--sage)' : 'transparent',
                            borderColor: item.checked ? 'var(--sage)' : 'var(--border-strong)',
                            color: 'white',
                          }}
                        >
                          {item.checked ? '✓' : ''}
                        </button>
                        <span className="flex-1 text-sm" style={{ color: 'var(--text-secondary)', textDecoration: item.checked ? 'line-through' : 'none', opacity: item.checked ? 0.5 : 1 }}>
                          {item.label}
                        </span>
                        {item.tag && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>{item.tag}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-3.5">
            <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Overall Progress</div>
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="40" cy="40" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="10" />
                    <circle cx="40" cy="40" r={r} fill="none" stroke="var(--sage)" strokeWidth="10"
                      strokeDasharray={`${(pct / 100) * circ} ${circ}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{pct}%</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>packed</span>
                  </div>
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{packed} of {total} items packed</div>
                <div className="text-xs font-semibold mt-1" style={{ color: 'var(--terracotta)' }}>{total - packed} items remaining</div>
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Bali Tips 🌴</div>
              <div className="space-y-2.5">
                {[
                  '🛕 Bring a sarong — required to enter all temples',
                  '☀️ UV index is high — pack strong sunscreen',
                  '💊 Malaria tablets recommended for rural areas',
                  '🔌 Power adapters: Type C/F sockets',
                ].map(tip => (
                  <div key={tip} className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{tip}</div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Share Checklist</div>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Let your travel companions see and update the list too.</p>
              <Btn variant="secondary" size="sm" className="w-full">🔗 Share Link</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
