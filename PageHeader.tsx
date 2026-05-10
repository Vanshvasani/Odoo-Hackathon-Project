import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div
      className="h-16 px-9 flex items-center justify-between sticky top-0 z-40 border-b transition-colors duration-300"
      style={{
        background: 'var(--header-bg)',
        borderColor: 'var(--border)',
      }}
    >
      <div>
        <h1 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2.5">{actions}</div>}
    </div>
  );
}
