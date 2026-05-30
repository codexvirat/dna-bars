'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    window.location.href = '/dashboard';
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 4.5rem)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--gradient-hero)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '350px', height: '350px',
        background: 'radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        zIndex: 1,
        animation: 'fadeInUp 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '3rem', height: '3rem', borderRadius: '50%',
            background: 'var(--gradient-gold)', margin: '0 auto 0.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem', fontWeight: 900, color: '#0a0800',
          }}>D</div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Welcome Back</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Sign in to your DNA Bars account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="login-email" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input"
              placeholder="you@email.com"
            />
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            <label htmlFor="login-password" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input"
              placeholder="••••••••"
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
            <Link href="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--gold-400)', fontWeight: 600 }}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            className="btn-gold"
            disabled={loading}
            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ margin: '1.5rem 0', position: 'relative', textAlign: 'center' }}>
          <div style={{ height: '1px', background: 'var(--border-subtle)', position: 'absolute', top: '50%', left: 0, right: 0 }} />
          <span style={{ background: 'var(--bg-card)', padding: '0 0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', position: 'relative' }}>or</span>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--gold-400)', fontWeight: 700 }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
