'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    setError('');
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
        position: 'absolute', bottom: '10%', left: '5%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      <div style={{
        width: '100%', maxWidth: '480px',
        background: 'var(--bg-card)', border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)', padding: '2.5rem',
        boxShadow: 'var(--shadow-lg)', position: 'relative', zIndex: 1,
        animation: 'fadeInUp 0.4s ease',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '3rem', height: '3rem', borderRadius: '50%',
            background: 'var(--gradient-gold)', margin: '0 auto 0.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem', fontWeight: 900, color: '#0a0800',
          }}>D</div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Create Account</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Join thousands of athletes fueling smarter
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { id: 'signup-name', key: 'name', label: 'Full Name', type: 'text', placeholder: 'Rahul Sharma' },
            { id: 'signup-email', key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com' },
            { id: 'signup-password', key: 'password', label: 'Password', type: 'password', placeholder: 'Min 8 characters' },
            { id: 'signup-confirm', key: 'confirm', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
          ].map((field) => (
            <div key={field.key} style={{ marginBottom: '1rem' }}>
              <label htmlFor={field.id} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                required
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="input"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {error && (
            <p style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '1rem', padding: '0.5rem 0.75rem', background: 'rgba(239,68,68,0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </p>
          )}

          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            By creating an account, you agree to our{' '}
            <Link href="#" style={{ color: 'var(--gold-400)' }}>Terms of Service</Link> and{' '}
            <Link href="#" style={{ color: 'var(--gold-400)' }}>Privacy Policy</Link>.
          </p>

          <button
            type="submit"
            id="signup-submit-btn"
            className="btn-gold"
            disabled={loading}
            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--gold-400)', fontWeight: 700 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
