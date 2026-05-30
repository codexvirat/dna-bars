'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeCart]);

  const FREQUENCY_LABELS: Record<string, string> = {
    monthly: 'Monthly',
    bimonthly: 'Every 2 Months',
    quarterly: 'Quarterly',
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="overlay"
          onClick={closeCart}
          aria-hidden="true"
          style={{ animation: 'fadeIn 0.2s ease' }}
        />
      )}

      {/* Drawer Panel */}
      <aside
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '420px',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-subtle)',
          zIndex: 'var(--z-modal)' as string,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: isOpen ? '-20px 0 60px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="badge">{itemCount}</span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'all var(--transition-fast)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.5rem' }} className="no-scrollbar">
          {items.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '1rem',
              textAlign: 'center',
              padding: '2rem',
            }}>
              <div style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
              }}>
                🛒
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Your cart is empty
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Add DNA Bars to fuel your performance
              </p>
              <Link href="/buy" className="btn-gold" onClick={closeCart} style={{ fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
                Shop Now
              </Link>
            </div>
          ) : (
            <div style={{ paddingTop: '0.5rem' }}>
              {items.map((item) => (
                <div key={`${item.id}-${item.isSubscription}`} className="cart-item">
                  {/* Product Image */}
                  <div style={{
                    width: '4.5rem',
                    height: '4.5rem',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: 'var(--bg-card)',
                    flexShrink: 0,
                    border: '1px solid var(--border-subtle)',
                  }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={72}
                      height={72}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                          {item.name}
                        </p>
                        {item.isSubscription && (
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--indigo-400)',
                            background: 'rgba(99,102,241,0.1)',
                            padding: '0.1rem 0.5rem',
                            borderRadius: 'var(--radius-full)',
                            display: 'inline-block',
                          }}>
                            Subscribe · {item.frequency ? FREQUENCY_LABELS[item.frequency] : 'Monthly'}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.isSubscription)}
                        aria-label={`Remove ${item.name}`}
                        style={{
                          color: 'var(--text-muted)',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.2rem',
                          transition: 'color var(--transition-fast)',
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => { (e.currentTarget).style.color = '#ef4444'; }}
                        onMouseLeave={(e) => { (e.currentTarget).style.color = 'var(--text-muted)'; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                      </button>
                    </div>

                    {/* Qty + Price */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.6rem' }}>
                      {/* Qty Control */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        overflow: 'hidden',
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          style={{
                            width: '1.8rem',
                            height: '1.8rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all var(--transition-fast)',
                          }}
                        >−</button>
                        <span style={{
                          padding: '0 0.6rem',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          minWidth: '1.5rem',
                          textAlign: 'center',
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity + 1)}
                          aria-label="Increase quantity"
                          style={{
                            width: '1.8rem',
                            height: '1.8rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all var(--transition-fast)',
                          }}
                        >+</button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gold-400)' }}>
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </span>
                        {item.quantity > 1 && (
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            ₹{item.price}/each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)',
          }}>
            {/* Free shipping progress */}
            {subtotal < 999 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Add ₹{(999 - subtotal).toFixed(0)} for free shipping
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)' }}>
                    ₹999 min
                  </span>
                </div>
                <div style={{
                  height: '4px',
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min((subtotal / 999) * 100, 100)}%`,
                    background: 'var(--gradient-gold)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width var(--transition-slow)',
                  }} />
                </div>
              </div>
            )}
            {subtotal >= 999 && (
              <p style={{ fontSize: '0.75rem', color: '#22c55e', textAlign: 'center', marginBottom: '0.75rem', fontWeight: 600 }}>
                🎉 You qualify for free shipping!
              </p>
            )}

            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{subtotal.toFixed(0)}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <Link href="/checkout" className="btn-gold" onClick={closeCart} style={{ textAlign: 'center' }}>
                Checkout · ₹{subtotal.toFixed(0)}
              </Link>
              <Link href="/cart" className="btn-outline" onClick={closeCart} style={{ textAlign: 'center', fontSize: '0.8rem' }}>
                View Full Cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
