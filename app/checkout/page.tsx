'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../_components/CartProvider';

type Step = 'address' | 'payment' | 'review' | 'confirmed';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', icon: '📱', desc: 'Pay via any UPI app' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦', desc: 'All major Indian banks' },
  { id: 'wallet', label: 'Wallets', icon: '👛', desc: 'Paytm, PhonePe, Amazon Pay' },
];

const SHIPPING_OPTIONS = [
  { id: 'standard', label: 'Standard Shipping', time: '3-5 business days', price: 99 },
  { id: 'express', label: 'Express Shipping', time: '1-2 business days', price: 199 },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>('address');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [shipping, setShipping] = useState('standard');
  const [address, setAddress] = useState({
    name: '', email: '', phone: '', addressLine1: '', city: '', state: '', pincode: '',
  });

  const shippingCost = subtotal >= 999 ? 0 : (shipping === 'express' ? 199 : 99);
  const total = subtotal + shippingCost;

  const STEPS: { key: Step; label: string }[] = [
    { key: 'address', label: 'Address' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ];

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep('payment');
  }

  function handlePaymentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep('review');
  }

  function handlePlaceOrder() {
    clearCart();
    setStep('confirmed');
  }

  if (step === 'confirmed') {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '2rem' }}>
          <div style={{
            width: '6rem', height: '6rem', borderRadius: '50%',
            background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem', margin: '0 auto 2rem',
            animation: 'scaleIn 0.4s ease',
          }}>
            ✓
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
            Order <span style={{ color: '#22c55e' }}>Confirmed!</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '0.5rem' }}>
            Thank you! Your order has been placed and will ship within 24 hours.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            Order confirmation sent to <strong style={{ color: 'var(--text-primary)' }}>{address.email || 'your email'}</strong>
          </p>

          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginBottom: '2rem',
            textAlign: 'left',
          }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Order Total
            </p>
            <p style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--gold-400)' }}>₹{total.toFixed(0)}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/dashboard/orders" className="btn-gold" id="track-order-btn">
              Track Your Order
            </Link>
            <Link href="/buy" className="btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)', padding: '2rem 0' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1.5rem' }}>
            <span className="text-gradient-gold">Checkout</span>
          </h1>

          {/* Step progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
            {STEPS.map((s, idx) => (
              <React.Fragment key={s.key}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '1.75rem', height: '1.75rem', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 800,
                    background: idx <= stepIndex ? 'var(--gradient-gold)' : 'var(--bg-elevated)',
                    color: idx <= stepIndex ? '#0a0800' : 'var(--text-muted)',
                    border: `1px solid ${idx <= stepIndex ? 'transparent' : 'var(--border-default)'}`,
                    transition: 'all var(--transition-base)',
                  }}>
                    {idx < stepIndex ? '✓' : idx + 1}
                  </div>
                  <span style={{
                    fontSize: '0.8rem', fontWeight: idx === stepIndex ? 700 : 400,
                    color: idx === stepIndex ? 'var(--text-primary)' : 'var(--text-muted)',
                  }}>
                    {s.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div style={{
                    flex: 1, height: '1px', margin: '0 0.75rem',
                    background: idx < stepIndex ? 'var(--gold-500)' : 'var(--border-subtle)',
                    transition: 'background var(--transition-base)',
                    maxWidth: '60px',
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="container section-sm">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
        }}
        className="checkout-grid"
        >
          {/* Main Form */}
          <div>
            {/* Address Step */}
            {step === 'address' && (
              <form onSubmit={handleAddressSubmit}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Delivery Address</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="name" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Full Name *</label>
                    <input id="name" type="text" required className="input" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} placeholder="Rahul Sharma" />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Email *</label>
                    <input id="email" type="email" required className="input" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} placeholder="you@email.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Phone *</label>
                    <input id="phone" type="tel" required className="input" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="+91 9876543210" />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="address" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Address *</label>
                    <input id="address" type="text" required className="input" value={address.addressLine1} onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })} placeholder="Flat/House No., Street, Area" />
                  </div>
                  <div>
                    <label htmlFor="city" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>City *</label>
                    <input id="city" type="text" required className="input" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="Mumbai" />
                  </div>
                  <div>
                    <label htmlFor="state" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>State *</label>
                    <input id="state" type="text" required className="input" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="Maharashtra" />
                  </div>
                  <div>
                    <label htmlFor="pincode" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>Pincode *</label>
                    <input id="pincode" type="text" required pattern="[0-9]{6}" className="input" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} placeholder="400001" />
                  </div>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', marginTop: '1.5rem', color: 'var(--text-primary)' }}>
                  Shipping Method
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {SHIPPING_OPTIONS.map((opt) => (
                    <label key={opt.id} htmlFor={`shipping-${opt.id}`} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1rem', cursor: 'pointer',
                      background: shipping === opt.id ? 'rgba(201,162,39,0.08)' : 'var(--bg-card)',
                      border: `1px solid ${shipping === opt.id ? 'var(--gold-500)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-lg)',
                      transition: 'all var(--transition-base)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <input
                          type="radio"
                          id={`shipping-${opt.id}`}
                          name="shipping"
                          value={opt.id}
                          checked={shipping === opt.id}
                          onChange={() => setShipping(opt.id)}
                          style={{ accentColor: 'var(--gold-500)' }}
                        />
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{opt.label}</p>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{opt.time}</p>
                        </div>
                      </div>
                      <span style={{ fontWeight: 700, color: subtotal >= 999 ? '#22c55e' : 'var(--text-primary)', fontSize: '0.9rem' }}>
                        {subtotal >= 999 ? 'Free' : `₹${opt.price}`}
                      </span>
                    </label>
                  ))}
                </div>

                <button type="submit" id="address-next-btn" className="btn-gold" style={{ width: '100%' }}>
                  Continue to Payment →
                </button>
              </form>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Payment Method</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {PAYMENT_METHODS.map((method) => (
                    <div key={method.id}>
                      <label htmlFor={`payment-${method.id}`} style={{
                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                        cursor: 'pointer',
                        background: paymentMethod === method.id ? 'rgba(201,162,39,0.08)' : 'var(--bg-card)',
                        border: `1px solid ${paymentMethod === method.id ? 'var(--gold-500)' : 'var(--border-subtle)'}`,
                        borderRadius: 'var(--radius-lg)',
                        transition: 'all var(--transition-base)',
                      }}>
                        <input
                          type="radio"
                          id={`payment-${method.id}`}
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          style={{ accentColor: 'var(--gold-500)' }}
                        />
                        <span style={{ fontSize: '1.25rem' }}>{method.icon}</span>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{method.label}</p>
                          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{method.desc}</p>
                        </div>
                      </label>
                      {paymentMethod === 'upi' && method.id === 'upi' && (
                        <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-elevated)', borderRadius: '0 0 var(--radius-lg) var(--radius-lg)', border: '1px solid var(--border-subtle)', borderTop: 'none' }}>
                          <input
                            type="text"
                            id="upi-id"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="yourname@upi"
                            className="input"
                            style={{ fontSize: '0.875rem' }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setStep('address')} className="btn-outline" style={{ flex: 1 }}>
                    ← Back
                  </button>
                  <button type="submit" id="payment-next-btn" className="btn-gold" style={{ flex: 2 }}>
                    Review Order →
                  </button>
                </div>
              </form>
            )}

            {/* Review Step */}
            {step === 'review' && (
              <div>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Review Your Order</h2>

                {/* Items summary */}
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '1.5rem',
                }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Items
                  </div>
                  {items.map((item) => (
                    <div key={`${item.id}-${item.isSubscription}`} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '0.875rem 1rem', borderBottom: '1px solid var(--border-subtle)',
                    }}>
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name} × {item.quantity}</p>
                        {item.isSubscription && <p style={{ fontSize: '0.7rem', color: 'var(--indigo-400)' }}>Subscribe</p>}
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery address */}
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)', padding: '1rem', marginBottom: '1.5rem',
                }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Delivering to
                  </p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{address.name}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{address.addressLine1}, {address.city}, {address.state} – {address.pincode}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{address.phone} · {address.email}</p>
                </div>

                {/* Payment */}
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)', padding: '1rem', marginBottom: '2rem',
                }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    Payment via
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setStep('payment')} className="btn-outline" style={{ flex: 1 }}>
                    ← Back
                  </button>
                  <button
                    id="place-order-btn"
                    onClick={handlePlaceOrder}
                    className="btn-gold"
                    style={{ flex: 2 }}
                  >
                    Place Order · ₹{total.toFixed(0)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order sidebar */}
          <div>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)', padding: '1.5rem',
              position: 'sticky', top: '6rem',
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Order Summary</h3>
              {items.map((item) => (
                <div key={`${item.id}-${item.isSubscription}`} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)',
                  fontSize: '0.825rem',
                }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.name} × {item.quantity}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>₹{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                  <span style={{ color: shippingCost === 0 ? '#22c55e' : 'var(--text-primary)' }}>
                    {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Total</span>
                  <span style={{ fontWeight: 900, fontSize: '1.25rem', color: 'var(--gold-400)' }}>₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .checkout-grid { grid-template-columns: 1.6fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
