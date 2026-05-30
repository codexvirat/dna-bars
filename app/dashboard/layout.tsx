'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DASHBOARD_LINKS = [
  { href: '/dashboard', label: 'Overview', icon: '📊', exact: true },
  { href: '/dashboard/orders', label: 'Orders', icon: '📦' },
  { href: '/dashboard/subscriptions', label: 'Subscriptions', icon: '🔄' },
  { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ minHeight: 'calc(100vh - 4.5rem)', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        padding: '2rem 1rem',
        flexShrink: 0,
        display: 'none',
      }}
      className="dashboard-sidebar"
      >
        <div style={{ marginBottom: '2rem', padding: '0 0.5rem' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            Account
          </p>
          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Rahul Sharma</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>rahul@email.com</p>
        </div>

        <nav>
          {DASHBOARD_LINKS.map((link) => {
            const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '0.25rem',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--gold-300)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(201,162,39,0.1)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                  border: isActive ? '1px solid rgba(201,162,39,0.2)' : '1px solid transparent',
                }}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <Link
            href="/login"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem', color: 'var(--text-muted)',
              transition: 'color var(--transition-fast)',
            }}
          >
            <span>🚪</span> Sign Out
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {/* Mobile nav */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          padding: '1rem 1.5rem',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto',
        }}
        className="dashboard-mobile-nav no-scrollbar"
        >
          {DASHBOARD_LINKS.map((link) => {
            const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.4rem 0.9rem', borderRadius: 'var(--radius-full',
                  fontSize: '0.8rem', fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--gold-300)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(201,162,39,0.1)' : 'transparent',
                  whiteSpace: 'nowrap',
                  border: isActive ? '1px solid rgba(201,162,39,0.25)' : '1px solid transparent',
                  borderRadius: 'var(--radius-full)',
                }}
              >
                {link.icon} {link.label}
              </Link>
            );
          })}
        </div>

        <div style={{ padding: '2rem 1.5rem' }}>
          {children}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .dashboard-sidebar { display: flex !important; flex-direction: column; }
          .dashboard-mobile-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}
