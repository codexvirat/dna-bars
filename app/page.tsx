'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import ProductCard from './_components/ProductCard';
import { useCart } from './_components/CartProvider';
import { PRODUCTS, TESTIMONIALS, FAQS, SUBSCRIPTION_PLANS } from './_data/products';

/* ---- Science benefits data ---- */
const BENEFITS = [
  { icon: '🧬', label: '10g Elite Protein', desc: 'Complete amino acid profile from premium sources', color: 'var(--gold-500)' },
  { icon: '⚡', label: 'Creatine Support', desc: 'Enhances muscle power, strength & recovery speed', color: 'var(--indigo-400)' },
  { icon: '🛡️', label: 'Glutamine Recovery', desc: 'Protects muscle tissue and accelerates healing', color: '#22c55e' },
  { icon: '🌿', label: 'Ashwagandha Blend', desc: 'Adaptogen that reduces cortisol & stress markers', color: '#f59e0b' },
  { icon: '✨', label: 'Zero Bloat Formula', desc: 'Gentle on digestion — fuel without discomfort', color: 'var(--rose-400)' },
  { icon: '💎', label: 'Collagen Builders', desc: 'Supports joint health, skin elasticity & radiance', color: '#818cf8' },
];

const INGREDIENTS = [
  { name: 'Whey Protein Isolate', benefit: 'Fast absorption, complete BCAA profile', icon: '🥛' },
  { name: 'Creatine Monohydrate', benefit: 'ATP production, muscle cell hydration', icon: '⚡' },
  { name: 'L-Glutamine', benefit: 'Gut health, immune support, muscle preservation', icon: '🛡️' },
  { name: 'KSM-66 Ashwagandha', benefit: 'Clinically studied, stress reduction & vitality', icon: '🌿' },
  { name: 'Marine Collagen Peptides', benefit: 'Type I & III collagen for skin & joints', icon: '💎' },
  { name: 'Prebiotic Fiber Blend', benefit: 'Gut microbiome support & digestive wellness', icon: '🌱' },
];

/* ---- Stat counter ---- */
function StatCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ---- Accordion ---- */
function Accordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: '1px solid var(--border-subtle)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: '100%',
          padding: '1.25rem 0',
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          cursor: 'pointer',
          textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
          {question}
        </span>
        <span style={{
          width: '1.5rem',
          height: '1.5rem',
          borderRadius: '50%',
          border: '1px solid var(--border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--gold-400)',
          transition: 'transform var(--transition-base)',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          fontSize: '1.1rem',
          fontWeight: 300,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? '300px' : '0',
        opacity: open ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease, opacity 0.25s ease',
      }}>
        <p style={{ paddingBottom: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ---- Main Homepage ---- */
export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { addItem } = useCart();
  const [selectedPlan, setSelectedPlan] = useState('bimonthly');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);

  const subProduct = PRODUCTS.find((p) => p.id === selectedProduct) || PRODUCTS[0];
  const subPlan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan) || SUBSCRIPTION_PLANS[1];
  const subDiscountedPrice = Math.round(subProduct.price * (1 - subPlan.discount / 100));
  const subSavings = subProduct.price - subDiscountedPrice;

  function handleSubscribe() {
    addItem({
      id: subProduct.id,
      name: subProduct.name,
      slug: subProduct.slug,
      price: subDiscountedPrice,
      originalPrice: subProduct.price,
      image: subProduct.image,
      isSubscription: true,
      frequency: selectedPlan as 'monthly' | 'bimonthly' | 'quarterly',
    });
  }

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section
        aria-label="Hero section"
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 4.5rem)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'var(--bg-base)',
        }}
      >
        {/* Background 3D Video */}
        <video
          src="/Convert_into_3d_video_202605261125.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.28,
          }}
        />
        {/* Dark vignette overlay for readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(10,8,0,0.2) 0%, rgba(10,8,0,0.7) 100%)',
          zIndex: 0,
        }} />

        {/* Glow orbs */}
        <div className="glow-orb" style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          top: '-10%', left: '-15%',
        }} />
        <div className="glow-orb" style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)',
          bottom: '-5%', right: '-10%',
          animationDelay: '2s',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '4rem 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="hero-grid"
          >
            {/* Text side */}
            <div style={{ animation: 'fadeInLeft 0.8s ease both' }}>
              <span className="section-label" style={{ marginBottom: '1rem' }}>
                🧬 Precision Nutrition Science
              </span>
              <h1 style={{ marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
                Fuel Your{' '}
                <span className="text-gradient-gold">Genetic</span>
                {' '}Blueprint
              </h1>
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                maxWidth: '520px',
                lineHeight: 1.8,
                marginBottom: '2rem',
              }}>
                Premium protein bars engineered with elite ingredients — Creatine, Glutamine, Ashwagandha — for athletes who refuse to compromise on performance or taste.
              </p>

              {/* Stats row */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: '2.5rem',
                flexWrap: 'wrap',
              }}>
                {[
                  { val: 10, suf: 'g', label: 'Protein' },
                  { val: 2110, suf: '+', label: 'Reviews' },
                  { val: 100, suf: '%', label: 'Natural' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      fontFamily: 'var(--font-outfit, Outfit, sans-serif)',
                      background: 'var(--gradient-gold)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1,
                    }}>
                      <StatCounter target={s.val} suffix={s.suf} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', letterSpacing: '0.05em' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/buy" className="btn-gold" id="hero-shop-btn" style={{ fontSize: '0.9rem', padding: '0.875rem 2.25rem' }}>
                  Shop Now
                </Link>
                <Link href="/subscription" className="btn-outline" id="hero-subscribe-btn" style={{ fontSize: '0.9rem', padding: '0.875rem 2.25rem' }}>
                  Subscribe & Save
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                {['🚚 Free Shipping ₹999+', '🔄 Cancel Anytime', '⭐ 4.8/5 Rating'].map((badge) => (
                  <span key={badge} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Visual */}
            <div style={{
              position: 'relative',
              animation: 'fadeInRight 0.8s ease 0.2s both',
              display: 'flex',
              justifyContent: 'center',
            }}>
              <div className="animate-float" style={{ position: 'relative', maxWidth: '450px', width: '100%' }}>
                <div style={{
                  position: 'absolute',
                  inset: '-30px',
                  background: 'radial-gradient(ellipse, rgba(201,162,39,0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                  filter: 'blur(20px)',
                }} />
                <Image
                  src="/anabolic-bar.png"
                  alt="DNA Anabolic Bar – Premium Protein Bar"
                  width={500}
                  height={375}
                  priority
                  style={{ borderRadius: 'var(--radius-xl)', position: 'relative', zIndex: 1 }}
                />
                {/* Floating badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '-5%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '0.75rem 1rem',
                  boxShadow: 'var(--shadow-lg)',
                  animation: 'float 5s ease-in-out 1s infinite',
                  zIndex: 2,
                }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Post-Workout
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--gold-400)' }}>10g Protein ⚡</div>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '8%',
                  right: '-5%',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '0.75rem 1rem',
                  boxShadow: 'var(--shadow-indigo)',
                  animation: 'float 6s ease-in-out 0.5s infinite',
                  zIndex: 2,
                }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--indigo-400)', marginBottom: '0.2rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Reviews
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>★ 4.8 / 5</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          animation: 'float 2.5s ease-in-out infinite',
          opacity: 0.5,
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
            <rect x="1" y="1" width="14" height="22" rx="7" />
            <circle cx="8" cy="7" r="2" fill="var(--gold-500)" />
          </svg>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .hero-grid { grid-template-columns: 1.2fr 1fr !important; }
          }
        `}</style>
      </section>

      {/* ===== PRODUCT SHOWCASE ===== */}
      <section className="section" aria-labelledby="products-heading" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Our Products</span>
            <h2 id="products-heading" style={{ marginBottom: '1rem' }}>
              Choose Your{' '}
              <span className="text-gradient-gold">Formula</span>
            </h2>
            <p style={{ maxWidth: '520px', margin: '0 auto', color: 'var(--text-muted)' }}>
              Two precision-formulated bars for different goals — both built on the same foundation of science and quality.
            </p>
          </div>

          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SUBSCRIPTION BENEFITS ===== */}
      <section className="section" aria-labelledby="subscription-heading" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Never Run Out</span>
            <h2 id="subscription-heading">
              Subscribe &{' '}
              <span className="text-gradient-indigo">Save</span>
            </h2>
            <p style={{ maxWidth: '500px', margin: '1rem auto 0', color: 'var(--text-muted)' }}>
              Set up auto-deliveries at your pace. Save money, stay fueled, cancel anytime.
            </p>
          </div>

          {/* Interactive Subscription Builder */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '1000px', margin: '0 auto 3rem' }} className="home-sub-grid">
            {/* Left: Selector options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>1. Select Your Formula</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {PRODUCTS.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProduct(p.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        background: selectedProduct === p.id ? `${p.accentColor}0f` : 'var(--bg-card)',
                        border: `1px solid ${selectedProduct === p.id ? `${p.accentColor}50` : 'var(--border-subtle)'}`,
                        borderRadius: 'var(--radius-lg)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-base)',
                      }}
                    >
                      <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-subtle)', position: 'relative' }}>
                        <Image src={p.image} alt={p.name} width={56} height={56} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{p.name}</p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.tagline}</p>
                      </div>
                      <div style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        borderRadius: '50%',
                        border: `2px solid ${selectedProduct === p.id ? p.accentColor : 'var(--border-default)'}`,
                        background: selectedProduct === p.id ? p.accentColor : 'transparent',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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

              <div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>2. Choose Frequency</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                  {SUBSCRIPTION_PLANS.map((sp) => {
                    const isSelected = selectedPlan === sp.id;
                    return (
                      <div
                        key={sp.id}
                        onClick={() => setSelectedPlan(sp.id)}
                        style={{
                          background: isSelected ? 'rgba(99,102,241,0.08)' : 'var(--bg-card)',
                          border: `2px solid ${isSelected ? 'var(--indigo-500)' : 'var(--border-subtle)'}`,
                          borderRadius: 'var(--radius-lg)',
                          padding: '1.25rem 1rem',
                          cursor: 'pointer',
                          textAlign: 'center',
                          transition: 'all var(--transition-base)',
                          position: 'relative',
                        }}
                      >
                        {sp.badge && (
                          <span style={{
                            position: 'absolute',
                            top: '-8px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: sp.badge === 'Best Value' ? 'var(--gradient-gold)' : 'var(--gradient-indigo)',
                            color: sp.badge === 'Best Value' ? '#0a0800' : 'white',
                            padding: '0.1rem 0.5rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.55rem',
                            fontWeight: 800,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                          }}>
                            {sp.badge}
                          </span>
                        )}
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem', color: 'var(--text-primary)' }}>{sp.name}</h4>
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{sp.frequency}</p>
                        <div style={{
                          display: 'inline-block',
                          padding: '0.15rem 0.5rem',
                          background: '#22c55e20',
                          color: '#22c55e',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                        }}>
                          Save {sp.discount}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Summary & CTA */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Subscription Benefits</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {[
                    ['Selected Flavor', subProduct.name],
                    ['Delivery Pace', `${subPlan.name} (${subPlan.frequency})`],
                    ['Plan Discount', `${subPlan.discount}% off`],
                    ['Shipping Fee', 'Always Free'],
                    ['Cancellation', 'Flexible — pause/cancel anytime'],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', gap: '1rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600, textAlign: 'right' }}>{value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Price per delivery</span>
                    <div>
                      <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--indigo-400)' }}>₹{subDiscountedPrice}</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>₹{subProduct.price}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: 600, textAlign: 'right' }}>You save ₹{subSavings} ({subPlan.discount}% off)</p>
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubscribe}
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.875rem', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}
                >
                  Activate Subscription · ₹{subDiscountedPrice}
                </button>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <Link href="/subscription" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'underline' }}>
                    Learn more about subscription plans
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @media (min-width: 768px) {
              .home-sub-grid { grid-template-columns: 1.1fr 0.9fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ===== SCIENCE BENEFITS ===== */}
      <section className="section" aria-labelledby="benefits-heading">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">The Science</span>
            <h2 id="benefits-heading">
              Every Ingredient,{' '}
              <span className="text-gradient-indigo">Every Purpose</span>
            </h2>
            <p style={{ maxWidth: '500px', margin: '1rem auto 0', color: 'var(--text-muted)' }}>
              No fillers. No shortcuts. Just clinically-backed functional nutrition.
            </p>
          </div>

          <div className="grid-3">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.label}
                className="card"
                style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${benefit.color}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, right: 0, width: '80px', height: '80px',
                  background: `radial-gradient(circle, ${benefit.color}15 0%, transparent 70%)`,
                  borderRadius: '0 var(--radius-lg) 0 100%',
                }} />
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.75rem',
                  background: `${benefit.color}15`,
                  width: '3rem',
                  height: '3rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {benefit.label}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INGREDIENTS SPOTLIGHT ===== */}
      <section className="section" aria-labelledby="ingredients-heading" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="ingredients-grid"
          >
            {/* Left: Text */}
            <div>
              <span className="section-label">Ingredients</span>
              <h2 id="ingredients-heading" style={{ marginBottom: '1rem' }}>
                Transparent by{' '}
                <span className="text-gradient-gold">Design</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '460px' }}>
                We believe you deserve to know exactly what you&apos;re putting in your body. Every ingredient serves a purpose. No proprietary blend hiding the truth.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {INGREDIENTS.map((ing) => (
                  <div key={ing.name} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    padding: '0.875rem 1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all var(--transition-base)',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--gold-600)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)'; }}
                  >
                    <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{ing.icon}</span>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>
                        {ing.name}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ing.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
                <div style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'radial-gradient(ellipse, rgba(243,67,94,0.15) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
                <Image
                  src="/collagen-bar.png"
                  alt="Collagen Glow Bar ingredients"
                  width={400}
                  height={300}
                  style={{ borderRadius: 'var(--radius-xl)', position: 'relative', zIndex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 900px) {
            .ingredients-grid { grid-template-columns: 1.1fr 0.9fr !important; }
          }
        `}</style>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Real Results</span>
            <h2 id="testimonials-heading">
              What Athletes{' '}
              <span className="text-gradient-gold">Are Saying</span>
            </h2>
          </div>

          {/* Featured testimonial */}
          <div style={{ maxWidth: '700px', margin: '0 auto 2rem', position: 'relative' }}>
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              position: 'relative',
              textAlign: 'center',
              minHeight: '200px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--gold-400)" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-primary)',
                lineHeight: 1.8,
                fontStyle: 'italic',
                marginBottom: '1.5rem',
                transition: 'opacity 0.4s ease',
              }}>
                &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
              </p>

              <div>
                <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>
                  {TESTIMONIALS[activeTestimonial].avatar}
                </div>
                <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                  {TESTIMONIALS[activeTestimonial].name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  {TESTIMONIALS[activeTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`View testimonial ${i + 1}`}
                style={{
                  width: i === activeTestimonial ? '2rem' : '0.5rem',
                  height: '0.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: i === activeTestimonial ? 'var(--gold-500)' : 'var(--bg-elevated)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Scrolling testimonial strip */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{ display: 'flex', gap: '1rem', animation: 'marquee 25s linear infinite' }} className="no-scrollbar">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} style={{
                  flexShrink: 0,
                  width: '280px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                }}>
                  <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} width="12" height="12" viewBox="0 0 24 24" fill="var(--gold-400)" aria-hidden="true">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    &ldquo;{t.text.slice(0, 90)}...&rdquo;
                  </p>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section" aria-labelledby="faq-heading" id="faq">
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label">Got Questions?</span>
            <h2 id="faq-heading">
              Frequently Asked{' '}
              <span className="text-gradient-gold">Questions</span>
            </h2>
          </div>

          <div>
            {FAQS.map((faq) => (
              <Accordion key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section aria-labelledby="cta-heading" style={{
        padding: '5rem 0',
        background: `linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(201,162,39,0.1) 100%)`,
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="glow-orb" style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(201,162,39,0.2) 0%, transparent 70%)',
          top: '-30%', right: '-10%',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="section-label">Start Today</span>
          <h2 id="cta-heading" style={{ marginBottom: '1rem' }}>
            Ready to Unlock Your{' '}
            <span className="text-gradient-gold">Blueprint?</span>
          </h2>
          <p style={{ maxWidth: '480px', margin: '0 auto 2.5rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Join over 2,100+ athletes already fueling smarter with DNA Bars. First order ships within 24 hours.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/buy" className="btn-gold" id="cta-shop-btn" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Shop All Products
            </Link>
            <Link href="/experience" className="btn-outline" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
