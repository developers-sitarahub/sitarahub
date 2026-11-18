'use client';

import { useState } from 'react';

const services = [
  'Web application',
  'ERP or CRM system',
  'Event or trade platform',
  'Marketing automation',
  'eCommerce or marketplace',
  'Mobile app',
  'Support & maintenance',
  'Not sure yet',
];

const contacts = [
  { label: 'Email', value: 'developers@sitarahub.com', href: 'mailto:developers@sitarahub.com' },
  { label: 'WhatsApp', value: '+91 91194 36661', href: 'https://wa.me/919119436661' },
  { label: 'Office', value: 'Mumbai, Maharashtra, India', href: null },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Something went wrong on our side. Please try again, or email us directly.');
    } catch {
      setError('Your message didn’t go through. Check your connection and try again, or email us directly.');
    }
    setStatus('idle');
  };

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="contact-layout">
          <div>
            <p className="label" style={{ marginBottom: '1.5rem' }}>
              Contact
            </p>
            <h2 className="h2">Tell us about your project.</h2>
            <p className="lede" style={{ marginTop: '1.25rem' }}>
              We read every message and reply within 24 hours, usually with a few questions and a time to talk. If
              it&apos;s a fit, you&apos;ll have a written proposal within three business days.
            </p>

            <dl style={{ marginTop: '2.5rem', display: 'grid', gap: '1.25rem' }}>
              {contacts.map((c) => (
                <div key={c.label}>
                  <dt className="label">{c.label}</dt>
                  <dd style={{ margin: '0.25rem 0 0', fontSize: '1.05rem' }}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="link"
                        {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {c.value}
                      </a>
                    ) : (
                      c.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            {status === 'sent' ? (
              <div className="notice notice-success" role="status" style={{ padding: '2rem' }}>
                <p className="h3" style={{ fontSize: '1.6rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                  Thanks, {form.name.split(' ')[0]}.
                </p>
                <p style={{ color: 'var(--ink-2)' }}>
                  Your message is with us. We&apos;ll reply to {form.email || 'you'} within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form-grid">
                <div className="field">
                  <label className="field-label" htmlFor="c-name">Name</label>
                  <input id="c-name" className="input" required autoComplete="name" value={form.name} onChange={update('name')} />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" className="input" required autoComplete="email" value={form.email} onChange={update('email')} />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="c-phone">Phone</label>
                  <input id="c-phone" type="tel" className="input" required autoComplete="tel" placeholder="+91" value={form.phone} onChange={update('phone')} />
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="c-company">
                    Company <span className="opt">(optional)</span>
                  </label>
                  <input id="c-company" className="input" autoComplete="organization" value={form.company} onChange={update('company')} />
                </div>
                <div className="field full">
                  <label className="field-label" htmlFor="c-service">What do you need?</label>
                  <select id="c-service" className="input" required value={form.service} onChange={update('service')}>
                    <option value="" disabled>
                      Choose one
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field full">
                  <label className="field-label" htmlFor="c-message">About the project</label>
                  <textarea
                    id="c-message"
                    className="input"
                    required
                    rows={6}
                    placeholder="What are you building, who is it for, and is there a deadline?"
                    value={form.message}
                    onChange={update('message')}
                  />
                </div>

                {error && (
                  <div className="notice notice-error full" role="alert">
                    {error}
                  </div>
                )}

                <div className="full" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                    {status !== 'sending' && <span className="arrow" aria-hidden="true">→</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 5rem;
          align-items: start;
        }
        @media (max-width: 960px) {
          .contact-layout { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>
    </section>
  );
}
