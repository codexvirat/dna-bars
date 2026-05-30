'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../_components/CartProvider';
import { PRODUCTS, SUBSCRIPTION_PLANS, FAQS } from '../_data/products';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: '100%', padding: '1.25rem 0', background: 'none', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', cursor: 'pointer', textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
          {question}
        </span>
        <span style={{
          transition: 'transform var(--transition-base)',
          transform: open ? 'rotate(45deg)' : 'none',
          color: 'var(--gold-400)', fontSize: '1.2rem', flexShrink: 0,
        }}>+</span>
      </button>
      <div style={{ maxHeight: open ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease', opacity: open ? 1 : 0 }}>
        <p style={{ paddingBottom: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function SubscriptionClient() {
  const { addItem } = useCart();
  const [selectedPlan, setSelectedPlan] = useState('bimonthly');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);

  const product = PRODUCTS.find((p) => p.id === selectedProduct) || PRODUCTS[0];
  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan) || SUBSCRIPTION_PLANS[1];
  const discountedPrice = Math.round(product.price * (1 - plan.discount / 100));
  const savings = product.price - discountedPrice;

  function handleSubscribe() {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: discountedPrice,
      originalPrice: product.price,
      image: product.image,
      isSubscription: true,
      frequency: selectedPlan as 'monthly' | 'bimonthly' | 'quarterly',
    });
  }

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, rgba(99,102,241,0.08) 100%)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '4rem 0 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-5%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="section-label">Auto-Delivery</span>
          <h1 style={{ marginBottom: '1rem' }}>
            Subscribe &amp;{' '}
            <span className="text-gradient-indigo">Never Run Out</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
            Set your rhythm. We&apos;ll handle the rest. Save up to 22%, get free shipping on every order, and pause or cancel anytime.
          </p>
        </div>
      </div>

      <div className="container section">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Choose Your <span className="text-gradient-gold">Plan</span></h2>
          <p style={{ color: 'var(--text-muted)' }}>All plans include free shipping and full flexibility to modify.</p>
        </div>

        <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto 4rem' }}>
          {SUBSCRIPTION_PLANS.map((sp) => {
            const isSelected = selectedPlan === sp.id;
            const planPrice = Math.round(product.price * (1 - sp.discount / 100));
            return (
              <div
                key={sp.id}
                id={`plan-${sp.id}`}
                onClick={() => setSelectedPlan(sp.id)}
                style={{
                  background: isSelected ? 'rgba(99,102,241,0.08)' : 'var(--bg-card)',
                  border: `2px solid ${isSelected ? 'var(--indigo-500)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-xl)',
                  padding: '2rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                {sp.badge && (
                  <div style={{
                    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
                    background: sp.badge === 'Best Value' ? 'var(--gradient-gold)' : 'var(--gradient-indigo)',
                    color: sp.badge === 'Best Value' ? '#0a0800' : 'white',
                    padding: '0.25rem 1rem', borderRadius: 'var(--radius-full)',
                    fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em',
                    textTransform: 'uppercase', whiteSpace: 'nowrap',
                  }}>
                    {sp.badge}
                  </div>
                )}
                <div style={{
                  width: '3rem', height: '3rem', borderRadius: '50%',
                  border: `2px solid ${isSelected ? 'var(--indigo-500)' : 'var(--border-default)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem',
                  background: isSelected ? 'var(--indigo-500)' : 'transparent',
                  transition: 'all var(--transition-base)',
                }}>
                  {isSelected && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{sp.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{sp.frequency}</p>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', justifyContent: 'center' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 900, color: isSelected ? 'var(--indigo-400)' : 'var(--text-primary)' }}>₹{planPrice}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{product.price}</span>
                  </div>
                  <div style={{
                    display: 'inline-block', padding: '0.2rem 0.75rem',
                    background: '#22c55e20', color: '#22c55e',
                    borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.4rem',
                  }}>
                    Save {sp.discount}%
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{sp.description}</p>
              </div>
            );
          })}
        </div>

        {/* Product + Summary Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '900px', margin: '0 auto 4rem' }} className="sub-grid">
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Select Your Bar</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {PRODUCTS.map((p) => (
                <div
                  key={p.id}
                  id={`product-select-${p.id}`}
                  onClick={() => setSelectedProduct(p.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                    background: selectedProduct === p.id ? `${p.accentColor}0f` : 'var(--bg-card)',
                    border: `1px solid ${selectedProduct === p.id ? `${p.accentColor}50` : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all var(--transition-base)',
                  }}
                >
                  <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-subtle)' }}>
                    <Image src={p.image} alt={p.name} width={56} height={56} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{p.name}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.tagline}</p>
                  </div>
                  <div style={{
                    width: '1.25rem', height: '1.25rem', borderRadius: '50%',
                    border: `2px solid ${selectedProduct === p.id ? p.accentColor : 'var(--border-default)'}`,
                    background: selectedProduct === p.id ? p.accentColor : 'transparent',
                    flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all var(--transition-base)',
                  }}>
                    {selectedProduct === p.id && (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Subscription Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                ['Product', product.name],
                ['Plan', `${plan.name} (${plan.frequency})`],
                ['Discount', `${plan.discount}% off`],
                ['Shipping', 'Free on every delivery'],
                ['Commitment', 'None — cancel anytime'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', gap: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600, textAlign: 'right' }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Price per delivery</span>
                <div>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--indigo-400)' }}>₹{discountedPrice}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>₹{product.price}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600, textAlign: 'right' }}>You save ₹{savings} ({plan.discount}% off)</p>
            </div>
            <button id="subscribe-cta-btn" onClick={handleSubscribe} className="btn-gold" style={{ width: '100%', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              Subscribe Now · ₹{discountedPrice}/delivery
            </button>
            <Link href="/buy" className="btn-ghost" style={{ width: '100%', textAlign: 'center', fontSize: '0.8rem' }}>
              One-time purchase instead →
            </Link>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Free shipping always', 'Pause or skip anytime', 'Early access to new flavors', 'Priority customer support'].map((perk) => (
                <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>How It <span className="text-gradient-gold">Works</span></h2>
        </div>
        <div className="grid-3" style={{ maxWidth: '900px', margin: '0 auto 4rem', textAlign: 'center' }}>
          {[
            { step: '01', icon: '🎯', title: 'Choose Your Plan', desc: 'Pick your product and delivery frequency. No commitment required.' },
            { step: '02', icon: '📦', title: 'Auto-Delivery', desc: 'We process and ship before your next due date. Always on time.' },
            { step: '03', icon: '⚡', title: 'Manage Anytime', desc: 'Pause, skip, swap flavors, or cancel from your dashboard — instantly.' },
          ].map((item) => (
            <div key={item.step} style={{ padding: '2rem 1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', color: 'var(--gold-500)', marginBottom: '0.75rem' }}>STEP {item.step}</div>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Subscription <span className="text-gradient-indigo">FAQs</span>
          </h2>
          {FAQS.slice(3).map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .sub-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
