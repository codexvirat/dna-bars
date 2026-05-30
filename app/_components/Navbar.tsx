'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';
import CartDrawer from './CartDrawer';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/buy', label: 'Buy Now' },
  { href: '/subscription', label: 'Subscribe' },
  { href: '/experience', label: 'Experience' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-nav)' as string,
          transition: 'all var(--transition-base)',
          background: scrolled
            ? 'rgba(8, 8, 15, 0.9)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} aria-label="DNA Bars Home">
            <div style={{
              width: '2rem',
              height: '2rem',
              background: 'var(--gradient-gold)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: '900',
              color: '#0a0800',
              flexShrink: 0,
            }}>
              D
            </div>
            <span style={{
              fontFamily: 'var(--font-outfit, Outfit, sans-serif)',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              background: 'var(--gradient-gold)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              DNA Bars
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: active ? 'var(--gold-300)' : 'var(--text-secondary)',
                    background: active ? 'rgba(201,162,39,0.1)' : 'transparent',
                    transition: 'all var(--transition-fast)',
                    border: active ? '1px solid rgba(201,162,39,0.2)' : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.target as HTMLAnchorElement).style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Cart Button */}
            <button
              id="cart-button"
              onClick={toggleCart}
              aria-label={`Open cart – ${itemCount} items`}
              style={{
                position: 'relative',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--gold-500)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold-300)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--glass-border)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {itemCount > 0 && (
                <span className="badge" style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  animation: 'scaleIn 0.2s ease',
                }}>
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Dashboard / Login */}
            <Link
              href="/dashboard"
              id="dashboard-link"
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                background: 'var(--gradient-gold)',
                color: '#0a0800',
                transition: 'all var(--transition-base)',
                boxShadow: '0 2px 12px rgba(201,162,39,0.25)',
                display: 'none',
              }}
              className="btn-cta"
            >
              Account
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((p) => !p)}
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                cursor: 'pointer',
              }}
              className="mobile-menu-btn"
            >
              <span style={{
                display: 'block',
                width: '16px',
                height: '1.5px',
                background: 'var(--text-primary)',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
              }} />
              <span style={{
                display: 'block',
                width: '16px',
                height: '1.5px',
                background: 'var(--text-primary)',
                transition: 'all 0.3s ease',
                opacity: mobileOpen ? 0 : 1,
              }} />
              <span style={{
                display: 'block',
                width: '16px',
                height: '1.5px',
                background: 'var(--text-primary)',
                transition: 'all 0.3s ease',
                transform: mobileOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
              }} />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div
            ref={mobileRef}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'rgba(8,8,15,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '1.5rem',
              animation: 'fadeInUp 0.2s ease',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: active ? 'var(--gold-300)' : 'var(--text-secondary)',
                      background: active ? 'rgba(201,162,39,0.08)' : 'transparent',
                      display: 'block',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <Link href="/dashboard" className="btn-gold" style={{ width: '100%' }}>
                  My Account
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .btn-cta { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
