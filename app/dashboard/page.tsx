import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'My Dashboard' };

const MOCK_ORDERS = [
  { id: '#DNA-1089', product: 'DNA Anabolic Bar × 2', date: 'May 28, 2026', status: 'Delivered', amount: '₹598' },
  { id: '#DNA-1052', product: 'Collagen Glow Bar × 1', date: 'May 15, 2026', status: 'Delivered', amount: '₹329' },
  { id: '#DNA-1031', product: 'DNA Anabolic Bar × 3', date: 'Apr 30, 2026', status: 'Delivered', amount: '₹897' },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: '#22c55e',
  Processing: '#f59e0b',
  Shipped: 'var(--indigo-400)',
  Cancelled: '#ef4444',
};

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
        Welcome back, <span className="text-gradient-gold">Rahul</span> 👋
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.875rem' }}>
        Here&apos;s a summary of your account activity.
      </p>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        {[
          { label: 'Total Orders', value: '12', icon: '📦', color: 'var(--gold-500)' },
          { label: 'Total Spent', value: '₹4,820', icon: '💰', color: '#22c55e' },
          { label: 'Active Subs', value: '1', icon: '🔄', color: 'var(--indigo-400)' },
          { label: 'Reward Points', value: '482', icon: '⭐', color: 'var(--rose-400)' },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '1.25rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                {stat.label}
              </span>
              <span style={{ fontSize: '1.25rem' }}>{stat.icon}</span>
            </div>
            <p style={{ fontSize: '1.5rem', fontWeight: 900, color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>Recent Orders</h2>
          <Link href="/dashboard/orders" style={{ fontSize: '0.75rem', color: 'var(--gold-400)', fontWeight: 600 }}>
            View all →
          </Link>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          {MOCK_ORDERS.map((order, idx) => (
            <div key={order.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderBottom: idx < MOCK_ORDERS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{order.id}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.product}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{order.date}</span>
                <span style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  background: `${STATUS_COLORS[order.status]}15`,
                  color: STATUS_COLORS[order.status],
                  border: `1px solid ${STATUS_COLORS[order.status]}30`,
                }}>
                  {order.status}
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{order.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(201,162,39,0.08) 100%)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            🔄 Active Subscription
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            DNA Anabolic Bar · Monthly · Next delivery: Jun 15, 2026
          </p>
        </div>
        <Link href="/dashboard/subscriptions" className="btn-gold" style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}>
          Manage
        </Link>
      </div>
    </div>
  );
}
