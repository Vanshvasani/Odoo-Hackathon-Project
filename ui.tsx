import { ReactNode, ButtonHTMLAttributes } from 'react';

// ===== BUTTON =====
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variantStyles = {
  primary: { background: 'var(--terracotta)', color: 'white', border: 'none' },
  secondary: { background: 'var(--surface)', color: 'var(--text-primary)', border: '1.5px solid var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--text-muted)', border: 'none' },
  success: { background: 'var(--sage)', color: 'white', border: 'none' },
  danger: { background: '#C0392B', color: 'white', border: 'none' },
};

const sizeStyles = {
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-4.5 py-2.5 text-sm gap-1.5',
  lg: 'px-7 py-3.5 text-base gap-2',
};

export function Btn({ variant = 'primary', size = 'md', children, className = '', style, ...rest }: BtnProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${sizeStyles[size]} ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

// ===== CARD =====
export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-xl border transition-colors duration-300 ${className}`}
      style={{ background: 'var(--surface)', borderColor: 'var(--border)', ...style }}
    >
      {children}
    </div>
  );
}

// ===== BADGE =====
type BadgeVariant = 'terra' | 'sage' | 'gold' | 'sky' | 'muted';

const badgeStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  terra: { bg: 'var(--terracotta-pale)', color: 'var(--terracotta)' },
  sage: { bg: 'var(--sage-pale)', color: 'var(--sage)' },
  gold: { bg: 'var(--gold-pale)', color: '#8B6914' },
  sky: { bg: 'var(--sky-pale)', color: 'var(--sky)' },
  muted: { bg: 'var(--surface-2)', color: 'var(--text-muted)' },
};

export function Badge({ variant = 'muted', children }: { variant?: BadgeVariant; children: ReactNode }) {
  const s = badgeStyles[variant];
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color }}
    >
      {children}
    </span>
  );
}

// ===== STAT CARD =====
export function StatCard({ label, value, sub, subColor }: { label: string; value: string; sub?: string; subColor?: string }) {
  return (
    <Card className="p-5">
      <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-3xl font-semibold leading-none" style={{ color: 'var(--text-primary)' }}>{value}</div>
      {sub && <div className="text-xs mt-1.5" style={{ color: subColor || 'var(--text-muted)' }}>{sub}</div>}
    </Card>
  );
}

// ===== SECTION HEADING =====
export function SectionHeading({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-display text-lg" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>{title}</h2>
      {action && (
        <button className="text-xs font-semibold" style={{ color: 'var(--terracotta)' }} onClick={onAction}>{action}</button>
      )}
    </div>
  );
}

// ===== PROGRESS BAR =====
export function ProgressBar({ pct, color }: { pct: number; color?: string }) {
  return (
    <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-2)' }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color || 'var(--terracotta)' }}
      />
    </div>
  );
}

// ===== TOGGLE =====
export function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative flex-shrink-0 transition-colors duration-200 rounded-full"
      style={{
        width: 42,
        height: 24,
        background: on ? 'var(--sage)' : 'var(--surface-2)',
      }}
    >
      <span
        className="absolute top-0.5 rounded-full bg-white shadow transition-transform duration-200"
        style={{
          width: 18,
          height: 18,
          left: on ? 20 : 3,
          transition: 'left 0.2s',
        }}
      />
    </button>
  );
}

// ===== FORM INPUT =====
export function Input({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <input
        className="w-full px-3.5 py-2.5 rounded-lg text-sm border transition-all duration-150 focus:outline-none"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--terracotta)')}
        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        {...rest}
      />
    </div>
  );
}

// ===== SELECT =====
export function Select({ label, children, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <select
        className="w-full px-3.5 py-2.5 rounded-lg text-sm border transition-all duration-150 focus:outline-none cursor-pointer"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--text-primary)',
        }}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}

