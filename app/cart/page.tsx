'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../_components/CartProvider';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart, itemCount } = useCart();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  const VALID_COUPONS: Record<string, number> = {
    'DNA10': 10,
    'FIRST15': 15,
    'GLOW20': 20,
  };

  const discount = appliedCoupon ? VALID_COUPONS[appliedCoupon] : 0;
  const discountAmount = Math.round((subtotal * discount) / 100);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discountAmount + shipping;

  function handleApplyCoupon() {
    const code = coupon.toUpperCase().trim();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try DNA10, FIRST15, or GLOW20');
    }
  }

  const FREQUENCY_LABELS: Record<string, string> = {
    monthly: 'Monthly',
    bimonthly: 'Every 2 Months',
    quarterly: 'Quarterly',
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '2.5rem 0',
      }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
            Your <span className="text-gradient-gold">Cart</span>
            {itemCount > 0 && (
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.75rem' }}>
                ({itemCount} item{itemCount !== 1 ? 's' : ''})
              </span>
            )}
          </h1>
        </div>
      </div>

      <div className="container section-sm">
        {items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}>
            <div style={{
              width: '6rem', height: '6rem', borderRadius: '50%',
              background: 'var(--bg-card)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem',
            }}>🛒</div>
            <h2 style={{ fontSize: '1.5rem' }}>Your cart is empty</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '360px' }}>
              Start shopping to add DNA Bars to your cart and fuel your performance.
            </p>
            <Link href="/buy" className="btn-gold" id="cart-shop-btn">
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
          }}
          className="cart-grid"
          >
            {/* Cart Items */}
            <div>
              {/* Header row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '3fr 1fr 1fr 1fr auto',
                gap: '1rem',
                padding: '0.75rem 1rem',
                background: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
              className="cart-header"
              >
                <span>Product</span>
                <span style={{ textAlign: 'center' }}>Price</span>
                <span style={{ textAlign: 'center' }}>Qty</span>
                <span style={{ textAlign: 'right' }}>Total</span>
                <span></span>
              </div>

              {/* Items */}
              {items.map((item) => (
                <div key={`${item.id}-${item.isSubscription}`} style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 1fr 1fr 1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '1.25rem 1rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: '0.75rem',
                }}
                className="cart-item-row"
                >
                  {/* Product */}
                  <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', minWidth: 0 }}>
                    <div style={{
                      width: '3.5rem', height: '3.5rem',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: '1px solid var(--border-subtle)',
                      flexShrink: 0,
                    }}>
                      <Image src={item.image} alt={item.name} width={56} height={56} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </p>
                      {item.isSubscription && (
                        <span style={{
                          fontSize: '0.62rem', fontWeight: 700,
                          background: 'rgba(99,102,241,0.15)', color: 'var(--indigo-400)',
                          padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-full)',
                        }}>
                          Subscribe · {item.frequency ? FREQUENCY_LABELS[item.frequency] : 'Monthly'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    ₹{item.price}
                  </div>

                  {/* Quantity */}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      display: 'flex',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity - 1)}
                        aria-label="Decrease"
                        style={{ width: '1.75rem', height: '1.75rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >−</button>
                      <span style={{ padding: '0 0.4rem', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', minWidth: '1.25rem', justifyContent: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.isSubscription, item.quantity + 1)}
                        aria-label="Increase"
                        style={{ width: '1.75rem', height: '1.75rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >+</button>
                    </div>
                  </div>

                  {/* Total */}
                  <div style={{ textAlign: 'right', fontWeight: 700, color: 'var(--gold-400)', fontSize: '0.95rem' }}>
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id, item.isSubscription)}
                    aria-label={`Remove ${item.name}`}
                    style={{
                      color: 'var(--text-muted)', background: 'none', border: 'none',
                      cursor: 'pointer', padding: '0.25rem', transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget).style.color = '#ef4444'; }}
                    onMouseLeave={(e) => { (e.currentTarget).style.color = 'var(--text-muted)'; }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {/* Cart Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Link href="/buy" className="btn-ghost" style={{ fontSize: '0.8rem' }}>
                  ← Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="btn-ghost"
                  style={{ fontSize: '0.8rem', color: '#ef4444' }}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-xl)',
                padding: '2rem',
                position: 'sticky',
                top: '6rem',
              }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Order Summary</h2>

                {/* Coupon */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                    Coupon Code
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      id="coupon-input"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="e.g. DNA10"
                      className="input"
                      style={{ flex: 1, fontSize: '0.85rem' }}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    />
                    <button
                      id="apply-coupon-btn"
                      onClick={handleApplyCoupon}
                      className="btn-outline"
                      style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '0.3rem' }}>{couponError}</p>}
                  {appliedCoupon && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <p style={{ fontSize: '0.72rem', color: '#22c55e' }}>✓ {appliedCoupon} applied — {discount}% off</p>
                      <button
                        onClick={() => { setAppliedCoupon(null); setCoupon(''); }}
                        style={{ fontSize: '0.65rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Line items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                    <span style={{ color: 'var(--text-primary)' }}>₹{subtotal.toFixed(0)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Discount ({discount}%)</span>
                      <span style={{ color: '#22c55e' }}>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                    <span style={{ color: shipping === 0 ? '#22c55e' : 'var(--text-primary)' }}>
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', background: 'var(--bg-elevated)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                      Add ₹{(999 - subtotal).toFixed(0)} more for free shipping
                    </p>
                  )}
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Total</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--gold-400)' }}>₹{total.toFixed(0)}</span>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    Inclusive of all taxes
                  </p>
                </div>

                <Link href="/checkout" className="btn-gold" id="cart-checkout-btn" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  Proceed to Checkout
                </Link>

                {/* Secure */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .cart-grid { grid-template-columns: 1.6fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .cart-header { display: none !important; }
          .cart-item-row { grid-template-columns: 1fr auto !important; }
        }
      `}</style>
    </div>
  );
}
