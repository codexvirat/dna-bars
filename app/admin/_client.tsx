'use client';

import Link from 'next/link';

const METRICS = [
  { label: 'Total Revenue', value: '₹2,84,320', change: '+18.2%', positive: true, icon: '💰' },
  { label: 'Total Orders', value: '947', change: '+12.5%', positive: true, icon: '📦' },
  { label: 'Active Subscribers', value: '312', change: '+8.1%', positive: true, icon: '🔄' },
  { label: 'Churn Rate', value: '3.2%', change: '-0.5%', positive: true, icon: '📉' },
  { label: 'Avg Order Value', value: '₹612', change: '+4.3%', positive: true, icon: '📊' },
  { label: 'Conversion Rate', value: '5.8%', change: '+1.2%', positive: true, icon: '🎯' },
  { label: 'Cart Abandonment', value: '68.4%', change: '-2.1%', positive: true, icon: '🛒' },
  { label: 'New Customers', value: '184', change: '+22.7%', positive: true, icon: '👤' },
];

const RECENT_ORDERS = [
  { id: '#DNA-1101', customer: 'Priya Sharma', product: 'Collagen Glow Bar × 2', amount: '₹658', status: 'Processing', date: 'Today 14:32' },
  { id: '#DNA-1100', customer: 'Rahul Mehta', product: 'Anabolic Bar × 3', amount: '₹747', status: 'Shipped', date: 'Today 11:18' },
  { id: '#DNA-1099', customer: 'Ananya Patel', product: 'Anabolic Bar × 1', amount: '₹299', status: 'Delivered', date: 'Yesterday' },
  { id: '#DNA-1098', customer: 'Vikram Singh', product: 'Collagen Glow Bar × 1', amount: '₹329', status: 'Delivered', date: 'Yesterday' },
  { id: '#DNA-1097', customer: 'Meera Nair', product: 'Anabolic Bar × 2', amount: '₹598', status: 'Delivered', date: 'May 28' },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: '#22c55e',
  Processing: '#f59e0b',
  Shipped: '#818cf8',
  Cancelled: '#ef4444',
};

const ADMIN_LINKS = [
  { href: '/admin/products', label: 'Products', icon: '🧪' },
  { href: '/admin/orders', label: 'Orders', icon: '📦' },
  { href: '/admin/subscriptions', label: 'Subscriptions', icon: '🔄' },
  { href: '/admin/customers', label: 'Customers', icon: '👥' },
];

export default function AdminDashboardClient() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Admin Header */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '4.5rem',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{
            padding: '0.2rem 0.75rem',
            background: 'rgba(201,162,39,0.15)',
            border: '1px solid rgba(201,162,39,0.3)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.65rem',
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: 'var(--gold-400)',
            textTransform: 'uppercase',
          }}>Admin Panel</span>
          <nav style={{ display: 'flex', gap: '0.5rem' }} className="admin-nav">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="admin-nav-link"
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Link href="/" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          ← View Store
        </Link>
      </div>

      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
            Dashboard <span className="text-gradient-gold">Overview</span>
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            All time metrics · Last updated: {new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
          </p>
        </div>

        {/* Metric Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }} className="admin-metrics-grid">
          {METRICS.map((m) => (
            <div key={m.label} className="metric-card" style={{
              padding: '1.25rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {m.label}
                </p>
                <span style={{ fontSize: '1.1rem' }}>{m.icon}</span>
              </div>
              <p style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '0.3rem' }}>
                {m.value}
              </p>
              <p style={{ fontSize: '0.72rem', fontWeight: 600, color: m.positive ? '#22c55e' : '#ef4444' }}>
                {m.change} vs last month
              </p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '2rem' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Recent Orders</h2>
            <Link href="/admin/orders" style={{ fontSize: '0.75rem', color: 'var(--gold-400)', fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--bg-elevated)' }}>
                  {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'].map((h) => (
                    <th key={h} style={{
                      padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: 800,
                      letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)',
                      borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((order, idx) => (
                  <tr
                    key={order.id}
                    className="order-row"
                    style={{ borderBottom: idx < RECENT_ORDERS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}
                  >
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--indigo-400)', whiteSpace: 'nowrap' }}>{order.id}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8rem', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{order.customer}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{order.product}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold-400)', whiteSpace: 'nowrap' }}>{order.amount}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)',
                        fontSize: '0.65rem', fontWeight: 700,
                        background: `${STATUS_COLORS[order.status]}15`,
                        color: STATUS_COLORS[order.status],
                        border: `1px solid ${STATUS_COLORS[order.status]}30`,
                        whiteSpace: 'nowrap',
                      }}>{order.status}</span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="admin-actions-grid">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="admin-action-card"
              style={{
                padding: '1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '1.75rem' }}>{link.icon}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{link.label}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Manage →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .admin-metrics-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .admin-actions-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        .admin-nav-link { border: 1px solid transparent; transition: all var(--transition-fast); }
        .admin-nav-link:hover { background: var(--glass-bg) !important; border-color: var(--border-default) !important; }
        .metric-card:hover { border-color: var(--border-default) !important; }
        .order-row:hover { background: var(--bg-elevated) !important; }
        .admin-action-card { transition: all var(--transition-base); }
        .admin-action-card:hover { border-color: var(--gold-600) !important; transform: translateY(-2px); }
      `}</style>
    </div>
  );
}
