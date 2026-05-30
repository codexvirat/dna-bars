'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../_components/CartProvider';
import ProductCard, { Product } from '../../_components/ProductCard';
import { TESTIMONIALS } from '../../_data/products';

const NUTRITION_ANABOLIC = [
  ['Calories', '220 kcal'],
  ['Total Protein', '10g'],
  ['Total Carbohydrates', '22g'],
  ['  – of which Sugars', '8g'],
  ['Total Fat', '9g'],
  ['  – Saturated Fat', '3g'],
  ['Fiber', '4g'],
  ['Sodium', '120mg'],
  ['Creatine Monohydrate', '500mg'],
  ['L-Glutamine', '500mg'],
  ['KSM-66 Ashwagandha', '150mg'],
];

const NUTRITION_COLLAGEN = [
  ['Calories', '210 kcal'],
  ['Total Protein', '10g'],
  ['Total Carbohydrates', '20g'],
  ['  – of which Sugars', '7g'],
  ['Total Fat', '8g'],
  ['  – Saturated Fat', '2.5g'],
  ['Fiber', '5g'],
  ['Sodium', '100mg'],
  ['Marine Collagen Peptides', '500mg'],
  ['L-Glutamine', '500mg'],
  ['KSM-66 Ashwagandha', '150mg'],
];

const ANABOLIC_DETAILS = {
  longDesc: 'The DNA Anabolic Bar is engineered for athletes who demand more from their nutrition. Combining 10g of elite whey protein isolate with clinically-backed functional ingredients including Creatine Monohydrate for strength, L-Glutamine for recovery, and KSM-66 Ashwagandha for stress adaptation. Our Zero Bloat Formula ensures you can fuel pre or post workout without digestive discomfort.',
  flavors: ['Dark Chocolate', 'Chocolate Peanut Butter', 'Salted Caramel'],
  highlight: 'Performance • Muscle • Recovery',
};

const COLLAGEN_DETAILS = {
  longDesc: 'The Collagen Glow Bar is a premium functional nutrition bar for women who demand both performance and radiance. With 10g of protein and Marine Collagen Peptides that support skin elasticity, joint health, and connective tissue — alongside the performance-grade L-Glutamine and Ashwagandha blend. Beauty and performance, unified in one bar.',
  flavors: ['Strawberry Rose', 'Vanilla Cream', 'Raspberry Bliss'],
  highlight: 'Skin Health • Joint Support • Radiance',
};

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [activeTab, setActiveTab] = useState<'benefits' | 'nutrition' | 'reviews'>('benefits');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const isAnabolic = product.id === 'anabolic-bar';
  const details = isAnabolic ? ANABOLIC_DETAILS : COLLAGEN_DETAILS;
  const nutrition = isAnabolic ? NUTRITION_ANABOLIC : NUTRITION_COLLAGEN;
  const currentPrice = isSubscribe ? product.subscribePrice : product.price;

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: currentPrice,
      originalPrice: product.originalPrice,
      image: product.image,
      isSubscription: isSubscribe,
      frequency: isSubscribe ? 'monthly' : undefined,
      quantity,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  }

  function handleBuyNow() {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: currentPrice,
      originalPrice: product.originalPrice,
      image: product.image,
      isSubscription: isSubscribe,
      frequency: isSubscribe ? 'monthly' : undefined,
      quantity,
    });
    openCart();
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <li><Link href="/">Home</Link></li>
              <li style={{ color: 'var(--border-default)' }}>/</li>
              <li><Link href="/buy">Shop</Link></li>
              <li style={{ color: 'var(--border-default)' }}>/</li>
              <li style={{ color: 'var(--text-primary)' }}>{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="container section-sm">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          marginBottom: '4rem',
        }}
        className="product-grid"
        >
          {/* Image */}
          <div>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: `radial-gradient(ellipse at center, ${product.accentColor}20 0%, var(--bg-card) 70%)`,
              border: '1px solid var(--border-subtle)',
              aspectRatio: '4/3',
            }}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Feature pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {product.benefits.map((b) => (
                <span key={b} style={{
                  padding: '0.3rem 0.75rem',
                  background: `${product.accentColor}15`,
                  border: `1px solid ${product.accentColor}30`,
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: product.accentColor,
                }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: product.accentColor,
                display: 'block',
                marginBottom: '0.5rem',
              }}>
                {details.highlight}
              </span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>
                {product.tagline}
              </p>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.2rem' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(product.rating) ? 'var(--gold-400)' : 'var(--bg-elevated)'}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{product.rating}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {details.longDesc}
            </p>

            {/* Flavors */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Available Flavors
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {details.flavors.map((flavor, idx) => (
                  <span key={flavor} style={{
                    padding: '0.35rem 0.85rem',
                    background: idx === 0 ? `${product.accentColor}20` : 'var(--bg-elevated)',
                    border: `1px solid ${idx === 0 ? product.accentColor + '50' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: idx === 0 ? product.accentColor : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}>
                    {flavor}
                  </span>
                ))}
              </div>
            </div>

            {/* Subscribe toggle */}
            <div
              onClick={() => setIsSubscribe((p) => !p)}
              role="switch"
              aria-checked={isSubscribe}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                background: isSubscribe ? 'rgba(99,102,241,0.08)' : 'var(--bg-card)',
                border: `1px solid ${isSubscribe ? 'rgba(99,102,241,0.3)' : 'var(--border-default)'}`,
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                marginBottom: '1.25rem',
                transition: 'all var(--transition-base)',
              }}
            >
              <div style={{
                width: '2.5rem',
                height: '1.4rem',
                borderRadius: 'var(--radius-full)',
                background: isSubscribe ? 'var(--indigo-500)' : 'var(--bg-elevated)',
                border: `1px solid ${isSubscribe ? 'var(--indigo-500)' : 'var(--border-default)'}`,
                position: 'relative',
                transition: 'all var(--transition-base)',
                flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: isSubscribe ? 'calc(100% - 1.1rem + 2px)' : '2px',
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '50%',
                  background: 'white',
                  transition: 'left var(--transition-base)',
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: isSubscribe ? 'var(--indigo-400)' : 'var(--text-primary)' }}>
                    Subscribe & Save {Math.round(((product.price - product.subscribePrice) / product.price) * 100)}%
                  </p>
                  {isSubscribe && (
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em',
                      background: 'rgba(99,102,241,0.2)', color: 'var(--indigo-400)',
                      padding: '0.1rem 0.5rem', borderRadius: 'var(--radius-full)',
                    }}>ACTIVE</span>
                  )}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {isSubscribe
                    ? `Saving ₹${product.price - product.subscribePrice} per delivery · Free shipping · Cancel anytime`
                    : 'Unlock savings, priority shipping, and exclusive flavors'}
                </p>
              </div>
            </div>

            {/* Price + Qty */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span style={{ fontSize: '2.25rem', fontWeight: 900, color: product.accentColor }}>
                    ₹{currentPrice}
                  </span>
                  <span style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 600 }}>
                  Save ₹{product.originalPrice - currentPrice} ({Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)}% off)
                </p>
              </div>

              {/* Quantity control */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
              }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  style={{
                    width: '2.5rem', height: '2.5rem', background: 'none', border: 'none',
                    cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '1.2rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >−</button>
                <span style={{
                  padding: '0 1rem', fontWeight: 700, fontSize: '0.95rem',
                  color: 'var(--text-primary)', minWidth: '2rem', textAlign: 'center',
                }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  style={{
                    width: '2.5rem', height: '2.5rem', background: 'none', border: 'none',
                    cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '1.2rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >+</button>
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button
                id={`pdp-add-cart-${product.id}`}
                onClick={handleAddToCart}
                className="btn-outline"
                style={{
                  flex: 1,
                  minWidth: '140px',
                  background: addedFeedback ? 'rgba(34,197,94,0.1)' : undefined,
                  borderColor: addedFeedback ? 'rgba(34,197,94,0.4)' : undefined,
                  color: addedFeedback ? '#22c55e' : undefined,
                }}
              >
                {addedFeedback ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button
                id={`pdp-buy-now-${product.id}`}
                onClick={handleBuyNow}
                className="btn-gold"
                style={{ flex: 2, minWidth: '180px' }}
              >
                Buy Now · ₹{(currentPrice * quantity).toFixed(0)}
              </button>
            </div>

            {/* Assurances */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[
                { icon: '🚚', label: 'Free Shipping', sub: 'On ₹999+' },
                { icon: '🔄', label: 'Easy Returns', sub: '7-day policy' },
                { icon: '🔒', label: 'Secure Payment', sub: 'SSL encrypted' },
              ].map((a) => (
                <div key={a.label} style={{
                  padding: '0.75rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{a.icon}</div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{a.label}</p>
                  <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>{a.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs: Benefits / Nutrition / Reviews */}
        <div style={{ marginBottom: '4rem' }}>
          {/* Tab headers */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '2rem',
            gap: '0',
          }}>
            {(['benefits', 'nutrition', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                id={`tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.875rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab ? `2px solid ${product.accentColor}` : '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? product.accentColor : 'var(--text-muted)',
                  textTransform: 'capitalize',
                  transition: 'all var(--transition-fast)',
                  marginBottom: '-1px',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'benefits' && (
            <div className="grid-2">
              {product.benefits.map((b, i) => (
                <div key={b} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{
                    width: '1.75rem',
                    height: '1.75rem',
                    borderRadius: '50%',
                    background: `${product.accentColor}20`,
                    border: `1px solid ${product.accentColor}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: product.accentColor,
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{b}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Clinically-backed ingredient at effective dosage
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div style={{ maxWidth: '500px' }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '3px solid var(--border-strong)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
              }}>
                <h3 style={{ fontSize: '1.5rem', borderBottom: '8px solid var(--text-primary)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  Nutrition Facts
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Serving Size: 1 bar (60g)
                </p>
                <div style={{ borderTop: '4px solid var(--text-primary)', paddingTop: '0.5rem' }}>
                  <table className="nutrition-table">
                    <tbody>
                      {nutrition.map(([label, value]) => (
                        <tr key={label}>
                          <td style={{ color: label.startsWith('  ') ? 'var(--text-muted)' : 'var(--text-secondary)', paddingLeft: label.startsWith('  ') ? '1rem' : 0 }}>
                            {label.trim()}
                          </td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: product.accentColor, lineHeight: 1 }}>
                    {product.rating}
                  </div>
                  <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'center', margin: '0.4rem 0' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--gold-400)">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {product.reviewCount.toLocaleString()} reviews
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {TESTIMONIALS.slice(0, 4).map((t) => (
                  <div key={t.id} style={{
                    padding: '1.25rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '1.5rem' }}>{t.avatar}</div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{t.name}</p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.role}</p>
                      </div>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.15rem' }}>
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--gold-400)">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>You Might Also Like</h2>
              <Link href="/buy" style={{ fontSize: '0.8rem', color: 'var(--gold-400)', fontWeight: 600 }}>
                View All →
              </Link>
            </div>
            <div className="grid-2" style={{ maxWidth: '900px' }}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .product-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
