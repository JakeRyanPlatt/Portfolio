interface MarqueeTickerProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  accent?: boolean;
}

export function MarqueeTicker({
  items,
  direction = 'left',
  speed = 32,
  accent = false,
}: MarqueeTickerProps) {
  // Repeat items enough to fill seamlessly
  const repeated = [...items, ...items, ...items, ...items];

  const duration = `${speed}s`;
  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      style={{
        borderTop: '1px solid #1c1c1c',
        borderBottom: '1px solid #1c1c1c',
        background: accent ? '#2dd4bf' : '#080808',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        padding: '10px 0',
        userSelect: 'none',
      }}
    >
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track {
          display: inline-flex;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div
        className="marquee-track"
        style={{
          animation: `${animName} ${duration} linear infinite`,
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: accent ? '#050505' : '#2a2a2a',
              padding: '0 28px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '28px',
            }}
          >
            {item}
            <span
              style={{
                display: 'inline-block',
                width: '4px',
                height: '4px',
                background: accent ? '#050505' : '#2dd4bf',
                borderRadius: '50%',
                opacity: accent ? 0.4 : 1,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}