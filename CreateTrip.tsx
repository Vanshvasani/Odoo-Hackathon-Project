import { useState } from 'react';
import { Btn, Card } from '../components/ui';
import PageHeader from '../components/PageHeader';
import { X } from 'lucide-react';

interface Props { onNavigate: (p: string) => void; }

const tripTypes = [
  { icon: '🏖', label: 'Beach & Relax' }, { icon: '🏔', label: 'Adventure' }, { icon: '🍜', label: 'Food & Culture' },
  { icon: '🏛', label: 'History' }, { icon: '🛍', label: 'Shopping' }, { icon: '🧘', label: 'Wellness' },
];

export default function CreateTrip({ onNavigate }: Props) {
  const [selectedType, setSelectedType] = useState(0);
  const [travelers, setTravelers] = useState(3);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Create New Trip"
        subtitle="Plan your next adventure step by step"
        actions={<button onClick={() => onNavigate('dashboard')} className="p-2 rounded-lg" style={{ color: 'var(--text-muted)' }}><X size={16} /></button>}
      />
      <div className="p-9">
        <div className="max-w-2xl mx-auto">
          {/* Wizard steps */}
          <div className="flex items-center mb-9">
            {['Destination', 'Dates', 'Style', 'Budget'].map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      background: i === 0 ? 'var(--sage)' : i === 1 ? 'var(--terracotta)' : 'var(--surface-2)',
                      color: i <= 1 ? 'white' : 'var(--text-muted)',
                      boxShadow: i === 1 ? '0 0 0 4px rgba(201,98,63,0.2)' : 'none',
                    }}
                  >
                    {i === 0 ? '✓' : i + 1}
                  </div>
                  <span className="text-xs mt-1.5 uppercase tracking-wide font-semibold" style={{ color: 'var(--text-muted)', fontSize: 9 }}>{label}</span>
                </div>
                {i < 3 && <div className="flex-1 h-0.5 mx-2 mb-4" style={{ background: i === 0 ? 'var(--sage)' : 'var(--surface-2)' }} />}
              </div>
            ))}
          </div>

          <Card className="p-9">
            <h2 className="font-display text-2xl mb-1.5" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>When are you going?</h2>
            <p className="text-sm mb-7" style={{ color: 'var(--text-muted)' }}>Select your travel dates and we'll help you build the perfect itinerary.</p>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>Destination</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2">📍</span>
                <input className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border text-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} defaultValue="Bali, Indonesia 🇮🇩" readOnly />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>Departure Date</label>
                <input type="date" className="w-full px-3.5 py-2.5 rounded-lg border text-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} defaultValue="2026-05-22" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>Return Date</label>
                <input type="date" className="w-full px-3.5 py-2.5 rounded-lg border text-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} defaultValue="2026-06-01" />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>Number of Travelers</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-9 h-9 rounded-full border flex items-center justify-center text-lg font-bold transition-all" style={{ background: 'var(--surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>−</button>
                <span className="text-xl font-bold w-6 text-center" style={{ color: 'var(--text-primary)' }}>{travelers}</span>
                <button onClick={() => setTravelers(travelers + 1)} className="w-9 h-9 rounded-full border flex items-center justify-center text-lg font-bold transition-all" style={{ background: 'var(--surface)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>+</button>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>travelers</span>
              </div>
            </div>

            <div className="rounded-lg p-3.5 text-sm mb-7" style={{ background: 'var(--sage-pale)', border: '1px solid var(--sage-light)', color: 'var(--sage)' }}>
              🌴 <strong>Best time to visit Bali:</strong> May–September (dry season). You've picked a great time!
            </div>

            <div className="flex items-center justify-between">
              <Btn variant="secondary">← Back</Btn>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Step 2 of 4</span>
              <Btn onClick={() => onNavigate('my-trips')}>Continue →</Btn>
            </div>
          </Card>

          {/* Trip style */}
          <div className="mt-8">
            <h2 className="font-display text-xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>Trip Style</h2>
            <div className="grid grid-cols-3 gap-2.5">
              {tripTypes.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setSelectedType(i)}
                  className="rounded-xl p-4 text-center border-2 transition-all"
                  style={{
                    background: selectedType === i ? 'var(--terracotta-pale)' : 'var(--surface)',
                    borderColor: selectedType === i ? 'var(--terracotta)' : 'var(--border)',
                  }}
                >
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{t.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
