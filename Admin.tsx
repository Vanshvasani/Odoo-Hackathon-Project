import { useCurrency } from '../contexts/CurrencyContext';
import { StatCard } from '../components/ui';
import { Btn } from '../components/ui';

interface Props { onNavigate: (p: string) => void; }

const chartBars = [60,72,65,80,88,76,92,84,96,88,100,94];
const months = ['Apr 1','Apr 8','Apr 15','Apr 22','Apr 29','May 6','','','','','','May 10'];

const destinations = [
  { name: '🌴 Bali', count: 2841, pct: 90, color: 'var(--terracotta)' },
  { name: '🗼 Paris', count: 2370, pct: 75, color: 'var(--sky)' },
  { name: '🏯 Tokyo', count: 2148, pct: 68, color: 'var(--sage)' },
  { name: '🗽 New York', count: 1738, pct: 55, color: 'var(--gold)' },
  { name: '🕌 Dubai', count: 1328, pct: 42, color: 'var(--terracotta)' },
  { name: '🏛 Rome', count: 1074, pct: 34, color: 'var(--sky)' },
];

const funnel = [
  { name: 'Visited app', pct: 100, count: '48,291', color: 'var(--sky)' },
  { name: 'Signed up', pct: 44, count: '21,248', color: 'var(--terracotta)' },
  { name: 'Created first trip', pct: 31, count: '14,970', color: 'var(--sage)' },
  { name: 'Returned (Day 7)', pct: 22, count: '10,624', color: 'var(--gold)' },
  { name: 'Upgraded to Pro', pct: 5.8, count: '2,801', color: 'var(--ink)' },
];

const users = [
  { init: 'MK', name: 'Maya Kapoor', email: 'maya@email.com', plan: 'Pro', trips: 7, joined: 'May 8, 2026', color: 'var(--terracotta)' },
  { init: 'RB', name: 'Ravi Bose', email: 'ravi.b@gmail.com', plan: 'Free', trips: 2, joined: 'May 9, 2026', color: 'var(--sky)' },
  { init: 'PS', name: 'Priya Singh', email: 'priya.s@work.in', plan: 'Pro', trips: 12, joined: 'Apr 30, 2026', color: 'var(--sage)' },
  { init: 'AM', name: 'Aisha Mohammed', email: 'aisha@travel.ae', plan: 'Free', trips: 1, joined: 'May 10, 2026', color: 'var(--terracotta)' },
];

export default function Admin({ onNavigate }: Props) {
  const { format } = useCurrency();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Admin header */}
      <div className="px-9 py-5 flex items-center justify-between" style={{ background: 'var(--ink)' }}>
        <div>
          <div className="font-display text-xl" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--sand)' }}>Wandr Admin</div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.4)' }}>Analytics & Operations Dashboard</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: 'var(--terracotta)' }}>Admin</span>
          <Btn onClick={() => onNavigate('dashboard')} style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--sand)' }} size="sm">← Back to App</Btn>
        </div>
      </div>

      <div className="p-9">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Users" value="48,291" sub="↑ 12.4% vs last month" subColor="var(--sage)" />
          <StatCard label="Monthly Active" value="18,744" sub="↑ 8.1% MAU growth" subColor="var(--sage)" />
          <StatCard label="Trips Created" value="3,182" sub="↑ 21% this month" subColor="var(--sage)" />
          <StatCard label="MRR" value={format(24800)} sub="↑ 16.2% revenue growth" subColor="var(--sage)" />
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          {/* User Growth Chart */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>User Growth</div>
              <div className="flex gap-1.5">
                {['7D','30D','90D'].map((t,i) => (
                  <button key={t} className="px-2.5 py-1 rounded text-xs font-semibold" style={{ background: i === 1 ? 'var(--terracotta)' : 'var(--surface-2)', color: i === 1 ? 'white' : 'var(--text-muted)' }}>{t}</button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-36">
              {chartBars.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm transition-opacity hover:opacity-100" style={{ height: `${h}%`, background: 'var(--terracotta)', opacity: 0.8, minWidth: 16 }} />
              ))}
            </div>
            <div className="flex mt-1.5">
              {months.map((m, i) => (
                <div key={i} className="flex-1 text-center text-xs" style={{ color: 'var(--text-muted)', fontSize: 9 }}>{m}</div>
              ))}
            </div>
          </div>

          {/* Funnel */}
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Conversion Funnel</div>
            <div className="space-y-3">
              {funnel.map(f => (
                <div key={f.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{f.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{f.pct}%</span>
                  </div>
                  <div className="h-7 rounded overflow-hidden" style={{ background: 'var(--surface-2)' }}>
                    <div className="h-full rounded flex items-center px-2.5 transition-all" style={{ width: `${f.pct}%`, background: f.color }}>
                      <span className="text-white text-xs font-bold">{f.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top destinations */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Top Destinations This Month</div>
            <div className="space-y-2.5">
              {destinations.map(d => (
                <div key={d.name} className="flex items-center gap-2.5">
                  <div className="text-sm font-semibold" style={{ width: 100, color: 'var(--text-primary)' }}>{d.name}</div>
                  <div className="flex-1 h-7 rounded" style={{ background: 'var(--surface-2)' }}>
                    <div className="h-full rounded flex items-center px-2.5 transition-all" style={{ width: `${d.pct}%`, background: d.color }}>
                      <span className="text-white text-xs font-bold">{d.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-sm font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Feature Engagement</div>
            <div className="flex items-end gap-2 h-32">
              {[['Itinerary',95,'var(--sky)'],['City Search',82,'var(--sky)'],['Budget',70,'var(--sage)'],['Packing',60,'var(--sage)'],['Journal',55,'var(--terracotta)'],['Collab',42,'var(--terracotta)'],['Shared',38,'var(--sky)']].map(([label, h, color]) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t-sm" style={{ height: `${h}%`, background: color as string, opacity: 0.85 }} />
                  <span className="text-xs text-center" style={{ color: 'var(--text-muted)', fontSize: 9 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Users table */}
        <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Recent Signups</div>
            <div className="flex gap-2">
              <input className="px-3 py-1.5 rounded-lg border text-sm" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)', width: 180 }} placeholder="Search users..." />
              <select className="px-3 py-1.5 rounded-lg border text-sm" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                <option>All Plans</option><option>Free</option><option>Pro</option>
              </select>
            </div>
          </div>
          <div className="grid gap-3 px-5 py-2.5 text-xs font-bold uppercase tracking-wider" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
            <span>User</span><span>Plan</span><span>Trips</span><span>Joined</span><span>Action</span>
          </div>
          {users.map(u => (
            <div key={u.name} className="grid gap-3 px-5 py-3.5 items-center border-t text-sm transition-colors hover:bg-[var(--surface-2)]" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 80px', borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: u.color }}>{u.init}</div>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{u.name}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{u.email}</div>
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{
                  background: u.plan === 'Pro' ? 'var(--gold-pale)' : 'var(--surface-2)',
                  color: u.plan === 'Pro' ? '#8B6914' : 'var(--text-muted)',
                }}>{u.plan}</span>
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>{u.trips} trips</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{u.joined}</div>
              <button className="text-xs px-2.5 py-1.5 rounded-lg" style={{ color: 'var(--text-muted)', background: 'var(--surface-2)' }}>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
