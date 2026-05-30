import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'My Orders' };

const ORDERS = [
  { id: '#DNA-1089', product: 'DNA Anabolic Bar × 2', date: 'May 28, 2026', status: 'Delivered', amount: 598, tracking: 'IND123456789' },
  { id: '#DNA-1052', product: 'Collagen Glow Bar × 1', date: 'May 15, 2026', status: 'Delivered', amount: 329, tracking: 'IND987654321' },
  { id: '#DNA-1031', product: 'DNA Anabolic Bar × 3', date: 'Apr 30, 2026', status: 'Delivered', amount: 897, tracking: 'IND456789123' },
  { id: '#DNA-0998', product: 'Collagen Glow Bar × 2', date: 'Apr 12, 2026', status: 'Delivered', amount: 658, tracking: 'IND789123456' },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: '#22c55e',
  Processing: '#f59e0b',
  Shipped: 'var(--indigo-400)',
  Cancelled: '#ef4444',
};

export default function OrdersPage() {
  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Order History</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.875rem' }}>
        {ORDERS.length} orders total
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {ORDERS.map((order) => (
          <div key={order.id} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <p style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{order.id}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{order.product}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Ordered {order.date}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.65rem', fontWeight: 700,
                  background: `${STATUS_COLORS[order.status]}15`,
                  color: STATUS_COLORS[order.status],
                  border: `1px solid ${STATUS_COLORS[order.status]}30`,
                  marginBottom: '0.4rem',
                }}>
                  {order.status}
                </span>
                <p style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gold-400)' }}>₹{order.amount}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap' }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Tracking: <span style={{ color: 'var(--indigo-400)', fontWeight: 600 }}>{order.tracking}</span>
              </p>
              <button className="btn-ghost" style={{ fontSize: '0.72rem', padding: '0.3rem 0.75rem' }}>
                View Details
              </button>
              <button className="btn-ghost" style={{ fontSize: '0.72rem', padding: '0.3rem 0.75rem' }}>
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
