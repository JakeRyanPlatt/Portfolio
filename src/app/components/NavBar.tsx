import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? '#050505' : 'transparent',
        borderBottom: scrolled ? '1px solid #1c1c1c' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
          className="flex items-center gap-3"
          style={{ textDecoration: 'none' }}
        >
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              fontWeight: 500,
              color: '#2dd4bf',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            JRP
          </span>
          <span style={{ width: '1px', height: '14px', background: '#2a2a2a', display: 'block' }} />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              fontWeight: 500,
              color: '#555',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Full-Stack Dev
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: '#555',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#555')}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/JakeRyanPlatt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.72rem',
                fontWeight: 500,
                color: '#050505',
                background: '#2dd4bf',
                padding: '6px 14px',
                letterSpacing: '0.06em',
                textDecoration: 'none',
                transition: 'background 0.2s',
                display: 'block',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#fff')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#2dd4bf')}
            >
              GitHub ↗
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-px bg-white transition-transform duration-200"
            style={{ transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none' }}
          />
          <span
            className="block w-5 h-px bg-white transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-white transition-transform duration-200"
            style={{ transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none' }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '240px' : '0',
          borderTop: menuOpen ? '1px solid #1c1c1c' : 'none',
          background: '#050505',
        }}
      >
        <ul className="px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: '#888',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/JakeRyanPlatt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                color: '#2dd4bf',
                textDecoration: 'none',
              }}
            >
              GitHub ↗
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}