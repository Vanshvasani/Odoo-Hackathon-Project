import { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { Btn } from '../components/ui';
import PageHeader from '../components/PageHeader';
import { Search } from 'lucide-react';

interface Props { onNavigate: (p: string) => void; }

const activities = [
  { icon: '🏄', name: 'Surf Lesson at Kuta Beach', desc: 'Beginner-friendly surfing lessons with experienced local instructors on Bali\'s most famous beach. Board and rash guard included.', duration: '2 hours', group: 'Group (max 8)', level: 'Beginner', rating: '4.9', reviews: '342', price: 35 },
  { icon: '🏯', name: 'Tanah Lot Temple Sunset Tour', desc: 'Visit the iconic sea temple perched on a rocky outcrop. Tour includes sunset viewing and traditional Balinese ceremony.', duration: '4 hours', group: 'Private option', level: 'Sunset tour', rating: '4.8', reviews: '891', price: 28 },
  { icon: '🌋', name: 'Mount Batur Sunrise Trek', desc: 'Hike to the summit of an active volcano in time for sunrise. Breakfast cooked by volcanic steam at the top. Spectacular views.', duration: '6–7 hours', group: 'Small group', level: 'Moderate', rating: '4.9', reviews: '1.2k', price: 65 },
  { icon: '🧘', name: 'Traditional Balinese Spa & Massage', desc: 'Full body traditional Balinese massage using aromatic oils and ancient healing techniques. Includes flower bath ritual.', duration: '2 hours', group: 'Solo or couples', level: 'Wellness', rating: '4.6', reviews: '534', price: 40 },
];

const chips = ['All', '🏄 Adventure', '🏛 Culture', '🍜 Food', '🌿 Nature', '🧘 Wellness', '🛍 Shopping', '🌙 Nightlife'];

export default function ActivitySearch({ onNavigate: _nav }: Props) {
  const { format } = useCurrency();
  const [activeChip, setActiveChip] = useState(0);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Find Activities"
        subtitle="Things to do in Bali, Indonesia"
        actions={
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input className="pl-8 pr-3 py-2 rounded-lg border text-sm" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-primary)', width: 220 }} placeholder="Search activities..." />
          </div>
        }
      />
      <div className="p-9">
        {/* Filters */}
        <div className="rounded-xl border p-5 mb-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="flex gap-5 flex-wrap">
            {['All Categories', 'Any Duration', 'Any Budget'].map(s => (
              <select key={s} className="px-3.5 py-2 rounded-lg border text-sm" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)', minWidth: 130 }}>
                <option>{s}</option>
              </select>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap mt-3">
            {chips.map((c, i) => (
              <button
                key={c}
                onClick={() => setActiveChip(i)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all"
                style={{
                  background: activeChip === i ? 'var(--terracotta)' : 'var(--surface)',
                  color: activeChip === i ? 'white' : 'var(--text-secondary)',
                  borderColor: activeChip === i ? 'var(--terracotta)' : 'var(--border)',
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-3.5">
          {activities.map(a => (
            <div
              key={a.name}
              className="rounded-xl border p-5 flex gap-4 cursor-pointer transition-all hover:shadow-md"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="w-20 h-20 rounded-lg flex items-center justify-center text-4xl flex-shrink-0" style={{ background: 'var(--surface-2)' }}>{a.icon}</div>
              <div className="flex-1">
                <div className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{a.name}</div>
                <div className="text-sm mb-2.5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{a.desc}</div>
                <div className="flex gap-3.5 text-xs flex-wrap" style={{ color: 'var(--text-muted)' }}>
                  <span>⏱ {a.duration}</span>
                  <span>👥 {a.group}</span>
                  <span>· {a.level}</span>
                  <span className="text-yellow-500">{'★'.repeat(Math.floor(parseFloat(a.rating)))}</span>
                  <span>{a.rating} ({a.reviews})</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between flex-shrink-0">
                <div>
                  <div className="text-lg font-bold text-right" style={{ color: 'var(--text-primary)' }}>{format(a.price)}</div>
                  <div className="text-xs text-right" style={{ color: 'var(--text-muted)' }}>per person</div>
                </div>
                <Btn size="sm">+ Add to Trip</Btn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
