import { useCurrency } from '../contexts/CurrencyContext';
import { SectionHeading } from '../components/ui';
import { Search } from 'lucide-react';

const cities = [
  { name: 'Bali', country: 'Indonesia 🇮🇩', emoji: '🌴', bg: 'linear-gradient(135deg,#1B4332,#52B788)', temp: '28°C', budget: 'Budget-friendly', rating: '4.8' },
  { name: 'Paris', country: 'France 🇫🇷', emoji: '🗼', bg: 'linear-gradient(135deg,#4A1942,#C056A8)', temp: '22°C', budget: 'Mid-range', rating: '4.9' },
  { name: 'Kyoto', country: 'Japan 🇯🇵', emoji: '🏯', bg: 'linear-gradient(135deg,#1A3A5C,#1E88E5)', temp: '19°C', budget: 'Mid-range', rating: '4.9' },
  { name: 'Marrakech', country: 'Morocco 🇲🇦', emoji: '🕌', bg: 'linear-gradient(135deg,#7B3F00,#D4770A)', temp: '32°C', budget: 'Budget-friendly', rating: '4.6' },
];

const costItems = [
  { label: 'Meal at local warung', usd: 3 },
  { label: 'Mid-range restaurant', usd: 15 },
  { label: 'Budget hotel / night', usd: 40 },
  { label: 'Scooter rental / day', usd: 6.5 },
];

export default function CitySearch() {
  const { format } = useCurrency();

  return (
    <div className="animate-fade-in">
      <div className="p-9">
        {/* Hero search */}
        <div className="rounded-2xl p-9 text-center mb-7 relative overflow-hidden" style={{ background: 'var(--ink)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,98,63,0.2), transparent 70%)' }} />
          <h1 className="font-display text-3xl mb-2 relative" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--sand)' }}>Discover Your Next Adventure</h1>
          <p className="text-sm mb-6 relative" style={{ color: 'rgba(245,240,232,0.55)' }}>Explore 10,000+ destinations around the world</p>
          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--ink-muted)' }} />
            <input
              className="w-full pl-12 pr-5 py-3.5 rounded-full text-sm shadow-2xl"
              style={{ background: 'rgba(255,255,255,0.95)', color: 'var(--ink)' }}
              placeholder="Search cities, countries, regions..."
            />
          </div>
          <div className="flex items-center justify-center gap-2.5 mt-4 relative flex-wrap">
            {['🏝 Islands','🏔 Mountains','🏛 History','🌆 Cities','🌿 Nature'].map(tag => (
              <button key={tag} className="px-3.5 py-2 rounded-full text-sm cursor-pointer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <SectionHeading title="Trending Destinations" action="See all →" />
        <div className="grid gap-4 mb-7" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {cities.map(c => (
            <div
              key={c.name}
              className="rounded-xl border overflow-hidden cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="h-40 flex items-center justify-center text-6xl" style={{ background: c.bg }}>{c.emoji}</div>
              <div className="p-4">
                <div className="font-display text-base mb-1" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>{c.name}</div>
                <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{c.country}</div>
                <div className="flex gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span>⛅ {c.temp}</span>
                  <span>💵 {c.budget}</span>
                  <span>★ {c.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Current Weather · Bali</div>
            <div className="flex items-center gap-4">
              <div className="text-4xl">⛅</div>
              <div>
                <div className="font-display text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>28°C</div>
                <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Partly cloudy · Dry season</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Cost of Living · Bali</div>
            <div className="space-y-2">
              {costItems.map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span className="font-semibold" style={{ color: 'var(--sage)' }}>{format(item.usd)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
