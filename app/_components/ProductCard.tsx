'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartProvider';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  slug: string;
  price: number;
  originalPrice: number;
  subscribePrice: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  accentColor: string;
  benefits: string[];
  rating: number;
  reviewCount: number;
}

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [added, setAdded] = useState(false);

  const currentPrice = isSubscribe ? product.subscribePrice : product.price;
  const savings = product.price - product.subscribePrice;

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
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
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
    });
    openCart();
  }

  const isFeatured = variant === 'featured';

  return (
    <article
      style={{
        background: 'var(--bg-card)',
        border: `1px solid var(--border-subtle)`,
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        transition: 'all var(--transition-base)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${product.accentColor}40`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${product.accentColor}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          zIndex: 2,
          padding: '0.25rem 0.75rem',
          background: product.badgeColor || 'var(--gradient-gold)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#0a0800',
        }}>
          {product.badge}
        </div>
      )}

      {/* Subscription save badge */}
      {isSubscribe && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 2,
          padding: '0.25rem 0.75rem',
          background: 'rgba(99,102,241,0.2)',
          border: '1px solid rgba(99,102,241,0.4)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--indigo-400)',
        }}>
          Save ₹{savings}
        </div>
      )}

      {/* Image */}
      <Link href={`/products/${product.slug}`} style={{ display: 'block' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '75%',
          background: `radial-gradient(ellipse at center, ${product.accentColor}15 0%, var(--bg-card) 70%)`,
          overflow: 'hidden',
        }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onMouseEnter={(e) => { (e.currentTarget).style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { (e.currentTarget).style.transform = 'scale(1)'; }}
          />
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill={i < Math.floor(product.rating) ? 'var(--gold-400)' : 'var(--bg-elevated)'}
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Name & Tagline */}
        <Link href={`/products/${product.slug}`}>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '0.2rem',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.color = product.accentColor; }}
          onMouseLeave={(e) => { (e.currentTarget).style.color = 'var(--text-primary)'; }}
          >
            {product.name}
          </h3>
        </Link>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          {product.tagline}
        </p>

        {/* Benefits */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
          {product.benefits.slice(0, 3).map((b) => (
            <span key={b} className="tag" style={{ fontSize: '0.65rem' }}>
              {b}
            </span>
          ))}
        </div>

        {/* Subscribe toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 0.75rem',
          background: isSubscribe ? 'rgba(99,102,241,0.08)' : 'var(--bg-elevated)',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${isSubscribe ? 'rgba(99,102,241,0.25)' : 'var(--border-subtle)'}`,
          cursor: 'pointer',
          marginBottom: '1rem',
          transition: 'all var(--transition-base)',
          userSelect: 'none',
        }}
        onClick={() => setIsSubscribe((p) => !p)}
        role="switch"
        aria-checked={isSubscribe}
        aria-label="Toggle subscription mode"
        >
          {/* Toggle pill */}
          <div style={{
            width: '2rem',
            height: '1.1rem',
            borderRadius: 'var(--radius-full)',
            background: isSubscribe ? 'var(--indigo-500)' : 'var(--bg-card)',
            border: `1px solid ${isSubscribe ? 'var(--indigo-500)' : 'var(--border-default)'}`,
            position: 'relative',
            transition: 'all var(--transition-base)',
            flexShrink: 0,
          }}>
            <div style={{
              position: 'absolute',
              top: '1px',
              left: isSubscribe ? 'calc(100% - 1.1rem + 1px)' : '1px',
              width: '0.9rem',
              height: '0.9rem',
              borderRadius: '50%',
              background: 'white',
              transition: 'left var(--transition-base)',
            }} />
          </div>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: isSubscribe ? 'var(--indigo-400)' : 'var(--text-secondary)', lineHeight: 1.2 }}>
              {isSubscribe ? 'Subscribe & Save' : 'Subscribe & Save'}
            </p>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', lineHeight: 1.2 }}>
              {isSubscribe ? `₹${savings} off per order` : `Save ₹${savings} per order`}
            </p>
          </div>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: product.accentColor }}>
            ₹{currentPrice}
          </span>
          {currentPrice < product.originalPrice && (
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
              ₹{product.originalPrice}
            </span>
          )}
          {currentPrice < product.originalPrice && (
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#22c55e' }}>
              {Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)}% off
            </span>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            style={{
              flex: 1,
              padding: '0.65rem',
              borderRadius: 'var(--radius-md)',
              background: added ? 'rgba(34,197,94,0.15)' : 'var(--bg-elevated)',
              border: `1px solid ${added ? 'rgba(34,197,94,0.4)' : 'var(--border-default)'}`,
              color: added ? '#22c55e' : 'var(--text-primary)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
            }}
          >
            {added ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add
              </>
            )}
          </button>
          <button
            id={`buy-now-${product.id}`}
            onClick={handleBuyNow}
            className="btn-gold"
            style={{ flex: 2, padding: '0.65rem', fontSize: '0.8rem' }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
