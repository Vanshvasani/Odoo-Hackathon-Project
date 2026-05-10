import { useTheme } from '../contexts/themeContext';
import { useCurrency, CURRENCIES } from '../contexts/CurrencyContext';
import { Sun, Moon, Home, FolderOpen, PlaneTakeoff, Calendar, Eye, DollarSign, Backpack, BookOpen, Search, Compass, Globe, User, BarChart3, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Page = string;

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navSections = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'my-trips', label: 'My Trips', icon: FolderOpen },
      { id: 'create-trip', label: 'Create Trip', icon: PlaneTakeoff },
    ],
  },
  {
    label: 'Plan',
    items: [
      { id: 'itinerary-builder', label: 'Itinerary Builder', icon: Calendar },
      { id: 'itinerary-view', label: 'Itinerary View', icon: Eye },
      { id: 'budget', label: 'Budget', icon: DollarSign },
      { id: 'packing', label: 'Packing List', icon: Backpack },
      { id: 'journal', label: 'Journal', icon: BookOpen },
    ],
  },
  {
    label: 'Discover',
    items: [
      { id: 'city-search', label: 'City Search', icon: Search },
      { id: 'activity-search', label: 'Activities', icon: Compass },
      { id: 'shared', label: 'Shared Trips', icon: Globe },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'admin', label: 'Admin', icon: BarChart3 },
    ],
  },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-60 flex flex-col z-50 transition-colors duration-300"
      style={{ background: 'var(--sidebar-bg)' }}
    >
      {/* Logo */}
      <div className="px-6 py-7 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl" style={{ color: 'var(--sand)', fontFamily: "'Playfair Display', serif" }}>
            Wandr
          </span>
          <span className="text-xs font-bold tracking-widest px-1.5 py-0.5 rounded" style={{ background: 'var(--terracotta)', color: 'white', fontSize: '9px' }}>
            PRO
          </span>
        </div>
      </div>

      {/* Nav sections */}
      <div className="flex-1 overflow-y-auto py-2">
        {navSections.map(section => (
          <div key={section.label} className="py-3">
            <div className="px-6 pb-2 text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '9px' }}>
              {section.label}
            </div>
            {section.items.map(item => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center gap-3 px-6 py-2.5 text-sm font-normal transition-all duration-150 border-l-2 text-left"
                  style={{
                    color: active ? 'var(--sand)' : 'rgba(255,255,255,0.5)',
                    background: active ? 'rgba(201,98,63,0.15)' : 'transparent',
                    borderLeftColor: active ? 'var(--terracotta)' : 'transparent',
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  <Icon size={15} />
                  {item.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom controls */}
      <div className="px-4 py-4 border-t space-y-2" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        {/* Currency selector */}
        <div className="relative">
          <button
            onClick={() => setCurrencyOpen(o => !o)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}
          >
            <span>{currency.symbol} {currency.code}</span>
            <ChevronDown size={13} className={currencyOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {currencyOpen && (
            <div
              className="absolute bottom-full left-0 mb-1 w-full rounded-lg overflow-hidden z-50 shadow-xl max-h-48 overflow-y-auto"
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {CURRENCIES.map(c => (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                  className="w-full text-left px-3 py-2 text-xs transition-colors hover:bg-white/10"
                  style={{ color: currency.code === c.code ? 'var(--terracotta)' : 'rgba(255,255,255,0.6)', fontWeight: currency.code === c.code ? 600 : 400 }}
                >
                  {c.symbol} {c.code} — {c.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all"
          style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}
        >
          <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
          {theme === 'light' ? <Sun size={13} /> : <Moon size={13} />}
        </button>

        {/* User */}
        <button
          onClick={() => onNavigate('login')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <LogOut size={13} />
          <span className="text-xs">Sign Out</span>
        </button>
      </div>

      {/* User info */}
      <div className="px-4 pb-5 pt-1">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
            style={{ background: 'var(--terracotta)' }}
          >
            AS
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: 'var(--sand)' }}>Arjun Sharma</div>
            <div className="text-xs" style={{ color: 'var(--gold)' }}>✦ Pro Member</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
