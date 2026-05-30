'use client';

import React, { useState } from 'react';
import type { Metadata } from 'next';

const SUBSCRIPTION = {
  id: 'SUB-001',
  product: 'DNA Anabolic Bar',
  flavor: 'Dark Chocolate',
  plan: 'Monthly',
  price: 249,
  nextDelivery: 'June 15, 2026',
  status: 'Active',
  deliveriesCompleted: 3,
  startDate: 'March 15, 2026',
};

export default function SubscriptionsPage() {
  const [status, setStatus] = useState(SUBSCRIPTION.status);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  function handleAction(action: string) {
    if (action === 'pause') setStatus('Paused');
    if (action === 'resume') setStatus('Active');
    if (action === 'cancel') setStatus('Cancelled');
    setShowConfirm(null);
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Subscriptions</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Manage your recurring deliveries
      </p>

      {/* Active Subscription */}
      <div style={{
        background: 'var(--bg-card)',
        border: `1px solid ${status === 'Active' ? 'rgba(34,197,94,0.3)' : status === 'Paused' ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'}`,
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        marginBottom: '2rem',
      }}>
        {/* Header */}
        <div style={{
          background: status === 'Active' ? 'rgba(34,197,94,0.08)' : status === 'Paused' ? 'rgba(245,158,11,0.08)' : 'rgba(239,68,68,0.08)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              {SUBSCRIPTION.id}
            </p>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {SUBSCRIPTION.product}
            </h2>
          </div>
          <span style={{
            padding: '0.3rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem', fontWeight: 800,
            background: status === 'Active' ? 'rgba(34,197,94,0.2)' : status === 'Paused' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
            color: status === 'Active' ? '#22c55e' : status === 'Paused' ? '#f59e0b' : '#ef4444',
          }}>
            {status}
          </span>
        </div>

        {/* Details */}
        <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="sub-details-grid">
          {[
            ['Flavor', SUBSCRIPTION.flavor],
            ['Plan', SUBSCRIPTION.plan],
            ['Price per delivery', `₹${SUBSCRIPTION.price}`],
            ['Next Delivery', SUBSCRIPTION.nextDelivery],
            ['Deliveries Completed', `${SUBSCRIPTION.deliveriesCompleted} orders`],
            ['Member Since', SUBSCRIPTION.startDate],
          ].map(([label, value]) => (
            <div key={label}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                {label}
              </p>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        {status !== 'Cancelled' && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {status === 'Active' ? (
              <button
                id="pause-subscription-btn"
                onClick={() => setShowConfirm('pause')}
                className="btn-outline"
                style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
              >
                ⏸ Pause
              </button>
            ) : (
              <button
                id="resume-subscription-btn"
                onClick={() => setShowConfirm('resume')}
                className="btn-gold"
                style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
              >
                ▶ Resume
              </button>
            )}
            <button
              id="skip-delivery-btn"
              className="btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
            >
              ⏭ Skip Next
            </button>
            <button
              id="change-date-btn"
              className="btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
            >
              📅 Change Date
            </button>
            <button
              id="cancel-subscription-btn"
              onClick={() => setShowConfirm('cancel')}
              style={{
                fontSize: '0.8rem', padding: '0.5rem 1.25rem',
                background: 'none', border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444', borderRadius: 'var(--radius-full)',
                cursor: 'pointer', transition: 'all var(--transition-fast)',
              }}
            >
              Cancel Subscription
            </button>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="overlay" onClick={() => setShowConfirm(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              maxWidth: '400px',
              width: '90%',
              zIndex: 'var(--z-modal)' as string,
              animation: 'scaleIn 0.2s ease',
            }}
          >
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
              {showConfirm === 'cancel' ? 'Cancel Subscription?' : showConfirm === 'pause' ? 'Pause Subscription?' : 'Resume Subscription?'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              {showConfirm === 'cancel'
                ? 'Your subscription will be cancelled and no further deliveries will be made. You can re-subscribe anytime.'
                : showConfirm === 'pause'
                ? 'Your subscription will be paused. No deliveries will be made until you resume.'
                : 'Your subscription will resume and the next delivery will be scheduled.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowConfirm(null)} className="btn-outline" style={{ flex: 1, fontSize: '0.85rem' }}>
                Keep it
              </button>
              <button
                onClick={() => handleAction(showConfirm)}
                style={{
                  flex: 1, fontSize: '0.85rem',
                  background: showConfirm === 'cancel' ? '#ef4444' : 'var(--gradient-gold)',
                  color: showConfirm === 'cancel' ? 'white' : '#0a0800',
                  border: 'none', borderRadius: 'var(--radius-full)',
                  padding: '0.6rem 1rem', cursor: 'pointer', fontWeight: 700,
                }}
              >
                {showConfirm === 'cancel' ? 'Cancel' : showConfirm === 'pause' ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state for more subscriptions */}
      <div style={{
        border: '2px dashed var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>+</div>
        <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>Add another subscription</p>
        <a href="/subscription" className="btn-outline" style={{ fontSize: '0.8rem', display: 'inline-flex' }}>
          Browse Plans
        </a>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .sub-details-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
