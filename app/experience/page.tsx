import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience DNA Bars',
  description: 'Discover the story, science, and community behind DNA Bars — premium functional nutrition bars crafted for performance athletes and wellness seekers.',
};

export default function ExperiencePage() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'var(--gradient-hero)',
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(201,162,39,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="section-label">Our Story</span>
          <h1 style={{ marginBottom: '1rem' }}>
            The DNA <span className="text-gradient-gold">Experience</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8, fontSize: '1.05rem' }}>
            We started because we were tired of settling. Tired of bars that promised performance but delivered mediocrity. DNA Bars was born from obsession — with science, with taste, and with results.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Brand Story */}
        <section className="section" aria-labelledby="story-heading">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="story-grid"
          >
            <div>
              <span className="section-label">The Origin</span>
              <h2 id="story-heading" style={{ marginBottom: '1rem' }}>
                Born in the <span className="text-gradient-gold">Lab</span>, Refined in the <span className="text-gradient-indigo">Gym</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
                DNA Bars was founded by a team of sports nutritionists, biochemists, and competitive athletes who were frustrated by the gap between what science knew and what the market offered. Every existing bar either compromised on ingredients or sacrificed taste.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
                We spent 18 months in R&D — studying clinical literature on creatine absorption, testing ashwagandha extracts for bioavailability, and working with food scientists to crack the Zero Bloat formula without sacrificing macros.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9 }}>
                The result? Two bars that athletes actually trust. Not because we tell them to — but because they feel the difference.
              </p>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
            }}>
              {/* Timeline */}
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--gold-400)' }}>Our Journey</h3>
              {[
                { year: '2022', label: 'Research begins', desc: 'Deep dive into functional nutrition science across 200+ clinical studies.' },
                { year: '2023 Q1', label: 'Formula Lock', desc: 'Finalized the zero-bloat protein matrix after 47 iterations.' },
                { year: '2023 Q3', label: 'First 500 batches', desc: 'Pilot production. Distributed to 50 athletes for feedback.' },
                { year: '2024', label: 'Official Launch', desc: 'DNA Anabolic Bar launches. 1,000 orders in the first week.' },
                { year: '2025', label: 'Collagen Glow', desc: 'Introducing our wellness line targeting skin, joints & vitality.' },
              ].map((item, idx, arr) => (
                <div key={item.year} style={{ display: 'flex', gap: '1rem', paddingBottom: idx < arr.length - 1 ? '1.5rem' : '0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: '0.75rem', height: '0.75rem', borderRadius: '50%',
                      background: 'var(--gradient-gold)', flexShrink: 0,
                    }} />
                    {idx < arr.length - 1 && (
                      <div style={{ width: '1px', flex: 1, background: 'var(--border-default)', marginTop: '4px' }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gold-500)', textTransform: 'uppercase' }}>
                      {item.year}
                    </span>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)', marginTop: '0.15rem' }}>{item.label}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Science */}
        <section className="section" id="science" aria-labelledby="science-heading" style={{
          background: 'var(--bg-surface)',
          margin: '0 -1.5rem',
          padding: '5rem 1.5rem',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Product Philosophy</span>
            <h2 id="science-heading">
              Science-First, <span className="text-gradient-indigo">Always</span>
            </h2>
            <p style={{ maxWidth: '520px', margin: '1rem auto 0', color: 'var(--text-muted)' }}>
              Every ingredient decision is backed by peer-reviewed research. No compromise, no greenwashing.
            </p>
          </div>

          <div className="grid-3">
            {[
              {
                icon: '🔬',
                title: 'Clinical Dosages',
                desc: 'We use ingredients at effective dosages studied in clinical trials — not the trace amounts found in most bars.',
              },
              {
                icon: '🌿',
                title: 'Clean Sourcing',
                desc: 'No artificial preservatives. Sweeteners chosen for gut compatibility. Ingredients we can trace to source.',
              },
              {
                icon: '🧪',
                title: 'Third-Party Testing',
                desc: 'Every batch is independently tested for purity, potency, and contaminant-free certification before release.',
              },
            ].map((item) => (
              <div key={item.title} style={{
                padding: '2rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Manufacturing */}
        <section className="section" id="manufacturing" aria-labelledby="manufacturing-heading">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Manufacturing</span>
            <h2 id="manufacturing-heading">
              Built on <span className="text-gradient-gold">Standards</span>
            </h2>
          </div>
          <div className="grid-2">
            {[
              { icon: '🏭', label: 'GMP Certified Facility', desc: 'Manufactured in FSSAI-licensed, WHO-GMP certified facilities.' },
              { icon: '🔍', label: 'In-Process QC', desc: 'Quality checkpoints at every stage of production, not just final.' },
              { icon: '📋', label: 'FSSAI Registered', desc: 'Fully compliant with Indian food safety regulations and standards.' },
              { icon: '♻️', label: 'Eco-Conscious Packaging', desc: 'Recyclable wrappers with reduced carbon footprint by design.' },
            ].map((item) => (
              <div key={item.label} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <div style={{ fontSize: '1.75rem', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{item.label}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="section" aria-labelledby="community-heading">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">Community</span>
            <h2 id="community-heading">
              Built With <span className="text-gradient-gold">Athletes</span>
            </h2>
            <p style={{ maxWidth: '500px', margin: '1rem auto 0', color: 'var(--text-muted)' }}>
              Our community shaped this product. And they continue to.
            </p>
          </div>

          <div className="grid-3">
            {[
              { emoji: '🏋️‍♂️', name: 'Rohan M.', role: 'Bodybuilder', quote: 'I was skeptical of bars after trying 15 mediocre ones. DNA Bars changed my view. The creatine kick is real.' },
              { emoji: '🧘‍♀️', name: 'Kavya N.', role: 'Yoga Instructor', quote: 'The Collagen Glow Bar is now my morning ritual. My clients ask what my secret is — it\'s this.' },
              { emoji: '🏃‍♂️', name: 'Arjun S.', role: 'Marathon Runner', quote: 'Zero bloat on long runs. Protein that actually helps recovery. This is what I was always looking for.' },
            ].map((story) => (
              <div key={story.name} style={{
                padding: '2rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{story.emoji}</div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '1rem' }}>
                  &ldquo;{story.quote}&rdquo;
                </p>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{story.name}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{story.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CTA */}
      <div style={{
        background: 'var(--gradient-hero)',
        padding: '5rem 0',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '1rem' }}>
            Ready to Start Your <span className="text-gradient-gold">Journey?</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Join the DNA Bars community. Performance nutrition that actually works.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/buy" className="btn-gold">Shop Now</a>
            <a href="/subscription" className="btn-outline">Subscribe & Save</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .story-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
