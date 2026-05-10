import { useState } from 'react';
import { useCurrency, CURRENCIES } from '../contexts/CurrencyContext';
import { useTheme } from '../contexts/themeContext';
import { Toggle, Btn } from '../components/ui';
import PageHeader from '../components/PageHeader';
import { User, Target, Bell, Lock, CreditCard, Globe, LogOut } from 'lucide-react';

interface Props { onNavigate: (p: string) => void; }

const travelStyles = [
  { icon: '🏖', label: 'Beach' }, { icon: '🏔', label: 'Adventure' }, { icon: '🏛', label: 'Culture' },
  { icon: '🍜', label: 'Food' }, { icon: '🧘', label: 'Wellness' }, { icon: '🛍', label: 'Shopping' },
];

const navItems = [
  { icon: User, label: 'Personal Info' }, { icon: Target, label: 'Travel Preferences' },
  { icon: Bell, label: 'Notifications' }, { icon: Lock, label: 'Security' },
  { icon: CreditCard, label: 'Billing & Plan' }, { icon: Globe, label: 'Privacy' },
  { icon: LogOut, label: 'Sign Out', danger: true },
];

export default function Profile({ onNavigate: _nav }: Props) {
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState([0, 1, 4]);
  const [notifications, setNotifications] = useState([true, true, true, false]);

  const toggleStyle = (i: number) => setSelectedStyles(prev => prev.includes(i) ? prev.filter(s => s !== i) : [...prev, i]);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Profile & Settings" actions={<Btn size="sm">Save Changes</Btn>} />
      <div className="p-9">
        <div className="grid gap-6" style={{ gridTemplateColumns: '240px 1fr' }}>
          {/* Profile sidebar */}
          <div>
            <div className="rounded-2xl border p-6 text-center mb-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 border-4" style={{ background: 'var(--terracotta)', borderColor: 'var(--surface)' }}>AS</div>
              <div className="font-display text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>Arjun Sharma</div>
              <div className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>@arjun.travels · Mumbai, India</div>
              <Btn variant="secondary" size="sm" className="w-full">Change Photo</Btn>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {[{v:'14',l:'Trips'},{v:'28',l:'Countries'},{v:'87',l:'Activities'},{v:'1.2k',l:'Followers'}].map(s => (
                  <div key={s.l} className="rounded-lg p-3 text-center" style={{ background: 'var(--surface-2)' }}>
                    <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{s.v}</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              {navItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => !item.danger && setActiveNav(i)}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium transition-all text-left"
                    style={{
                      background: activeNav === i ? 'var(--terracotta-pale)' : 'transparent',
                      color: item.danger ? 'var(--danger)' : activeNav === i ? 'var(--terracotta)' : 'var(--text-secondary)',
                    }}
                  >
                    <Icon size={15} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings panels */}
          <div className="space-y-4">
            {/* Personal Info */}
            <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="font-semibold text-sm mb-5 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Personal Information</div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[['First Name','Arjun'],['Last Name','Sharma'],['Email','arjun@email.com'],['Phone','+91 98765 43210']].map(([label, val]) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>{label}</label>
                    <input className="w-full px-3.5 py-2.5 rounded-lg border text-sm" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} defaultValue={val} />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>Bio</label>
                <textarea className="w-full px-3.5 py-2.5 rounded-lg border text-sm resize-none" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)', minHeight: 80 }} defaultValue="Passionate traveler from Mumbai. Love street food, temples, and sunrise hikes. 28 countries down, 170+ to go! 🌍" />
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="font-semibold text-sm mb-5 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Travel Preferences</div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text-secondary)' }}>Travel Style</label>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {travelStyles.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => toggleStyle(i)}
                    className="rounded-lg p-3 text-center border-2 transition-all"
                    style={{
                      background: selectedStyles.includes(i) ? 'var(--terracotta-pale)' : 'var(--surface-2)',
                      borderColor: selectedStyles.includes(i) ? 'var(--terracotta)' : 'var(--border)',
                    }}
                  >
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-xs font-medium" style={{ color: selectedStyles.includes(i) ? 'var(--terracotta)' : 'var(--text-secondary)' }}>{s.label}</div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>Budget Style</label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg border text-sm" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                    <option>Mid-range ($100–200/day)</option>
                    <option>Budget (under $100/day)</option>
                    <option>Luxury ($200+/day)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>Display Currency</label>
                  <select
                    className="w-full px-3.5 py-2.5 rounded-lg border text-sm"
                    style={{ background: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    value={currency.code}
                    onChange={e => setCurrency(CURRENCIES.find(c => c.code === e.target.value)!)}
                  >
                    {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.symbol} {c.code} — {c.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="font-semibold text-sm mb-5 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Notifications</div>
              {[
                { h: 'Trip reminders', p: 'Notify me 7 days before a trip starts' },
                { h: 'Activity suggestions', p: 'Weekly destination inspiration emails' },
                { h: 'Budget alerts', p: 'Alert when spending exceeds category budget' },
                { h: 'Collaboration updates', p: 'When trip collaborators make changes' },
              ].map((row, i) => (
                <div key={row.h} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{row.h}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{row.p}</div>
                  </div>
                  <Toggle on={notifications[i]} onToggle={() => setNotifications(prev => prev.map((v, j) => j === i ? !v : v))} />
                </div>
              ))}
            </div>

            {/* Appearance */}
            <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="font-semibold text-sm mb-5 pb-3 border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border)' }}>Appearance</div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Dark Mode</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Switch between light and dark themes</div>
                </div>
                <Toggle on={theme === 'dark'} onToggle={toggleTheme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
