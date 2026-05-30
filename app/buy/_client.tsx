'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProductCard from '../_components/ProductCard';
import { PRODUCTS } from '../_data/products';

const FILTERS = ['All', 'Performance', 'Wellness', 'Recovery'];

export default function BuyPageClient() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const filtered = PRODUCTS.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Performance') return p.id === 'anabolic-bar';
    if (activeFilter === 'Wellness') return p.id === 'collagen-glow-bar';
    if (activeFilter === 'Recovery') return true;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div style={{ minHeight: '80vh' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-card) 100%)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '4rem 0 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '-30%', right: '-10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">Shop</span>
          <h1 style={{ marginBottom: '0.75rem' }}>
            All <span className="text-gradient-gold">Products</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', lineHeight: 1.7 }}>
            Precision-formulated protein bars for every goal. Subscribe to save up to 22%.
          </p>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginTop: '1.5rem' }}>
            <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <li><Link href="/" style={{ color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}>Home</Link></li>
              <li style={{ color: 'var(--border-default)' }}>/</li>
              <li style={{ color: 'var(--text-primary)' }}>Shop</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container section-sm">
        {/* Filters + Sort bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2.5rem',
          padding: '1rem 1.25rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
        }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                id={`filter-${f.toLowerCase()}`}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all var(--transition-fast)',
                  background: activeFilter === f ? 'var(--gradient-gold)' : 'var(--bg-elevated)',
                  color: activeFilter === f ? '#0a0800' : 'var(--text-secondary)',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort products"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="featured">Featured</option>
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Product count */}
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Showing {sorted.length} product{sorted.length !== 1 ? 's' : ''}
        </p>

        {/* Products Grid */}
        {sorted.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem' }}>No products match this filter.</p>
          </div>
        ) : (
          <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Subscription CTA */}
        <div style={{
          marginTop: '4rem',
          padding: '2.5rem',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(201,162,39,0.08) 100%)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          textAlign: 'center',
        }}>
          <h3 style={{ marginBottom: '0.5rem' }}>
            Save up to{' '}
            <span className="text-gradient-gold">22%</span>
            {' '}with a Subscription
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Auto-deliveries at your pace. Pause or cancel anytime.
          </p>
          <Link href="/subscription" className="btn-gold" id="buy-subscribe-cta">
            View Subscription Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
