import { NetworkViz } from './NetworkViz';

export function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-end px-6 pb-16 pt-28">
      {/* Top-right metadata block */}
      <div
        className="absolute top-20 right-6 text-right hidden md:block"
        style={{ fontFamily: 'JetBrains Mono, monospace' }}
      >
        <p style={{ fontSize: '0.65rem', color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
          Based in
        </p>
        <p style={{ fontSize: '0.75rem', color: '#666' }}>
          United States
        </p>
        <p style={{ fontSize: '0.65rem', color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>
          Available
        </p>
        <div className="flex items-center justify-end gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#2dd4bf', display: 'inline-block' }}
          />
          <p style={{ fontSize: '0.75rem', color: '#666' }}>Open to work</p>
        </div>
      </div>

      {/* Index number */}
      <div className="mb-8">
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            color: '#333',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          001 — Portfolio
        </span>
      </div>

      {/* Network Viz — replaces editorial name heading */}
      <div
        className="mb-10 w-full"
        style={{ height: 'clamp(180px, 28vw, 320px)' }}
      >
        <NetworkViz />
      </div>

      {/* Horizontal rule */}
      <div style={{ width: '100%', height: '1px', background: '#1c1c1c', marginBottom: '28px' }} />

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        {/* Role + stack */}
        <div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              color: '#888',
              lineHeight: 1.7,
              maxWidth: '380px',
            }}
          >
            Current Network Engineer, desired Full-stack developer designing in{' '}
            <span style={{ color: '#ddd' }}>Figma</span>, building interfaces with{' '}
            <span style={{ color: '#ddd' }}>React</span>, powering backends via{' '}
            <span style={{ color: '#ddd' }}>Node.js + Express</span>, and persisting
            data in <span style={{ color: '#ddd' }}>SQLite</span>.
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => scrollTo('#projects')}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#050505',
              background: '#2dd4bf',
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#fff')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#2dd4bf')}
          >
            View Work →
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#555',
              background: 'transparent',
              border: '1px solid #1c1c1c',
              padding: '12px 24px',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#555';
              (e.currentTarget as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#1c1c1c';
              (e.currentTarget as HTMLElement).style.color = '#555';
            }}
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
}