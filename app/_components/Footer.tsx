'use client';

import React from 'react';
import Link from 'next/link';

const FOOTER_LINKS = {
  Shop: [
    { href: '/buy', label: 'All Products' },
    { href: '/products/anabolic-bar', label: 'Anabolic Bar' },
    { href: '/products/collagen-glow-bar', label: 'Collagen Glow Bar' },
    { href: '/subscription', label: 'Subscriptions' },
  ],
  Company: [
    { href: '/experience', label: 'Our Story' },
    { href: '/experience#science', label: 'The Science' },
    { href: '/experience#manufacturing', label: 'Manufacturing' },
  ],
  Support: [
    { href: '/dashboard/orders', label: 'Track Order' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/dashboard', label: 'My Account' },
    { href: '/dashboard/subscriptions', label: 'Manage Subscription' },
  ],
};

const SOCIAL_LINKS = [
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter / X',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    href: 'https://youtube.com',
    label: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

const PAYMENT_ICONS = ['UPI', 'Visa', 'MC', 'RuPay', 'Wallet'];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      marginTop: 'auto',
    }}>
      {/* Main Footer */}
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
        }}
        className="footer-grid"
        >
          {/* Brand Column */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{
                width: '2rem',
                height: '2rem',
                background: 'var(--gradient-gold)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 900,
                color: '#0a0800',
              }}>D</div>
              <span style={{
                fontFamily: 'var(--font-outfit, Outfit, sans-serif)',
                fontWeight: 800,
                fontSize: '1.25rem',
                background: 'var(--gradient-gold)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>DNA Bars</span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '280px', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Scientifically formulated protein bars for performance, recovery, and wellness. Fuel your blueprint.
            </p>

            {/* Newsletter */}
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
              Get exclusive offers
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', gap: '0.5rem', maxWidth: '280px' }}
            >
              <input
                type="email"
                id="footer-email"
                placeholder="your@email.com"
                aria-label="Email for newsletter"
                className="input"
                style={{ flex: 1, fontSize: '0.8rem', padding: '0.6rem 0.8rem' }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{ padding: '0.6rem 1rem', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
              >
                Join
              </button>
            </form>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget).style.color = 'var(--gold-300)';
                    (e.currentTarget).style.borderColor = 'var(--gold-500)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget).style.color = 'var(--text-muted)';
                    (e.currentTarget).style.borderColor = 'var(--glass-border)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold-500)',
                marginBottom: '1rem',
              }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        transition: 'color var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget).style.color = 'var(--text-primary)'; }}
                      onMouseLeave={(e) => { (e.currentTarget).style.color = 'var(--text-muted)'; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '1.25rem 0',
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          alignItems: 'center',
        }}
        >
          {/* Payment Methods */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {PAYMENT_ICONS.map((method) => (
              <span key={method} style={{
                padding: '0.2rem 0.6rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
              }}>
                {method}
              </span>
            ))}
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            © {new Date().getFullYear()} DNA Bars. All rights reserved. Premium Nutrition, Scientifically Crafted.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((t) => (
              <Link
                key={t}
                href="#"
                style={{ fontSize: '0.72rem', color: 'var(--text-muted)', transition: 'color var(--transition-fast)' }}
                onMouseEnter={(e) => { (e.currentTarget).style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { (e.currentTarget).style.color = 'var(--text-muted)'; }}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 1.5fr repeat(3, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
