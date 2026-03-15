import { useState, FormEvent } from 'react';

type FormState = 'idle' | 'sending' | 'success';

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof values>>({});

  const validate = () => {
    const e: Partial<typeof values> = {};
    if (!values.name.trim()) e.name = 'Required';
    if (!values.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Invalid email';
    if (!values.message.trim()) e.message = 'Required';
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFormState('sending');
    await new Promise((r) => setTimeout(r, 1400));
    setFormState('success');
    setValues({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (field: keyof typeof values, val: string) => {
    setValues((v) => ({ ...v, [field]: val }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const fieldStyle = (hasError?: string): React.CSSProperties => ({
    width: '100%',
    background: '#0a0a0a',
    border: `1px solid ${hasError ? '#555' : '#1c1c1c'}`,
    color: '#ddd',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 400,
    padding: '11px 14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    borderRadius: 0,
  });

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.62rem',
            color: '#333',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px',
          }}
        >
          004 — Contact
        </span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#fff',
              lineHeight: 1.05,
            }}
          >
            Let's Work Together
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: '#555',
              maxWidth: '300px',
              lineHeight: 1.6,
            }}
          >
            Have a project or collaboration in mind? Reach out — I respond within 24 hours.
          </p>
        </div>

        {/* Rule */}
        <div style={{ height: '1px', background: '#1c1c1c', marginBottom: '40px' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            {formState === 'success' ? (
              <div className="flex flex-col gap-4 py-8">
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #2dd4bf',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l4 4 6-6" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Message received.
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#555' }}>
                  I'll get back to you shortly.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#555',
                    background: 'transparent',
                    border: '1px solid #1c1c1c',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    transition: 'color 0.2s, border-color 0.2s',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                    (e.currentTarget as HTMLElement).style.borderColor = '#555';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#555';
                    (e.currentTarget as HTMLElement).style.borderColor = '#1c1c1c';
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                {/* Name + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.6rem',
                        color: '#444',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Jake"
                      value={values.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      style={fieldStyle(errors.name)}
                      onFocus={(e) => ((e.target as HTMLElement).style.borderColor = '#444')}
                      onBlur={(e) => ((e.target as HTMLElement).style.borderColor = errors.name ? '#555' : '#1c1c1c')}
                    />
                    {errors.name && (
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#666', marginTop: '4px' }}>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '0.6rem',
                        color: '#444',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '6px',
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      style={fieldStyle(errors.email)}
                      onFocus={(e) => ((e.target as HTMLElement).style.borderColor = '#444')}
                      onBlur={(e) => ((e.target as HTMLElement).style.borderColor = errors.email ? '#555' : '#1c1c1c')}
                    />
                    {errors.email && (
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#666', marginTop: '4px' }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.6rem',
                      color: '#444',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project inquiry, collaboration..."
                    value={values.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    style={fieldStyle()}
                    onFocus={(e) => ((e.target as HTMLElement).style.borderColor = '#444')}
                    onBlur={(e) => ((e.target as HTMLElement).style.borderColor = '#1c1c1c')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.6rem',
                      color: '#444',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '6px',
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell me about your project..."
                    value={values.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    style={{ ...fieldStyle(errors.message), resize: 'vertical', minHeight: '120px' }}
                    onFocus={(e) => ((e.target as HTMLElement).style.borderColor = '#444')}
                    onBlur={(e) => ((e.target as HTMLElement).style.borderColor = errors.message ? '#555' : '#1c1c1c')}
                  />
                  {errors.message && (
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#666', marginTop: '4px' }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#050505',
                    background: formState === 'sending' ? '#aaa' : '#2dd4bf',
                    border: 'none',
                    padding: '13px 28px',
                    cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: 'fit-content',
                  }}
                  onMouseEnter={(e) => {
                    if (formState !== 'sending')
                      (e.currentTarget as HTMLElement).style.background = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    if (formState !== 'sending')
                      (e.currentTarget as HTMLElement).style.background = '#2dd4bf';
                  }}
                >
                  {formState === 'sending' ? (
                    <>
                      <svg className="animate-spin" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4.5" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
                        <path d="M6 1.5a4.5 4.5 0 014.5 4.5" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Sending
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right column — info */}
          <div className="flex flex-col gap-8">
            <div>
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  color: '#333',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Links
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'GitHub', href: 'https://github.com/JakeRyanPlatt' },
                  { label: 'GitHub Repos', href: 'https://github.com/JakeRyanPlatt?tab=repositories' },
                  { label: 'Email', href: 'mailto:hello@jakeryanplatt.dev' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      color: '#555',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #111',
                      paddingBottom: '10px',
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#555')}
                  >
                    {s.label}
                    <span style={{ color: '#333', fontSize: '0.75rem' }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  color: '#333',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Stack
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#444', lineHeight: 1.7 }}>
                Figma → React → Node.js + Express → SQLite
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}