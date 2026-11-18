'use client';

import { useRef, useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const departments = [
  'Software Engineering',
  'UI/UX Design',
  'Mobile Development',
  'Product Management',
  'Marketing & Strategy',
  'General Application / Other',
];

const culture = [
  {
    title: 'Real products, in production.',
    body: 'ERP systems, web platforms and automation tools that clients use every day, plus two products of our own. Your work ships, and people use it.',
  },
  {
    title: 'Design is part of the job.',
    body: 'Engineers here care how things look and feel, and designers understand how things get built. If the details bother you, you’ll fit in.',
  },
  {
    title: 'Trust and ownership.',
    body: 'Remote-friendly, with clear priorities instead of micromanagement. You own your work from the first commit to the release.',
  },
];

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ['.pdf', '.doc', '.docx'];

export function CareersPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
    resumeBase64: '',
    resumeFilename: '',
    resumeMimeType: '',
  });
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = (key: 'name' | 'email' | 'phone' | 'department' | 'message') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setFormData((f) => ({ ...f, [key]: e.target.value }));

  const clearFile = () => {
    setFileName('');
    setFormData((prev) => ({ ...prev, resumeBase64: '', resumeFilename: '', resumeMimeType: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_BYTES) {
      setFileError('That file is over 5 MB. Please upload a smaller one.');
      clearFile();
      return;
    }
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!ALLOWED.includes(ext)) {
      setFileError('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      clearFile();
      return;
    }

    setFileError('');
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        resumeBase64: reader.result as string,
        resumeFilename: file.name,
        resumeMimeType: file.type,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resumeBase64) {
      setFileError('Please attach your CV.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong on our side. Please try again.');
      }
    } catch {
      setError('Your application didn’t go through. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main>
        <section style={{ paddingTop: 'clamp(4.5rem, 10vw, 8rem)', paddingBottom: '4rem' }}>
          <div className="wrap">
            <p className="label" style={{ marginBottom: '2rem' }}>
              Careers
            </p>
            <h1 className="display" style={{ maxWidth: '12em' }}>
              Build software people <em>actually use.</em>
            </h1>
            <p className="lede" style={{ marginTop: '2rem' }}>
              We hire designers and engineers who care about the details and like seeing their work go live. We
              don&apos;t list fixed openings. Send us your CV and tell us what you&apos;d like to work on.
            </p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '2rem' }}>
          <div className="wrap">
            <div className="principles">
              {culture.map((c, i) => (
                <div key={c.title} className="principle">
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="h3" style={{ fontSize: '1.55rem', margin: '0.9rem 0 0.75rem' }}>
                    {c.title}
                  </h2>
                  <p className="body">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="apply" className="section" style={{ background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: '3rem' }}>
              <p className="label">Apply</p>
              <div>
                <h2 className="h2">Send us your application.</h2>
                <p className="lede" style={{ marginTop: '1rem' }}>
                  A real person reads every application. Tell us about the work you&apos;re proudest of.
                </p>
              </div>
            </div>

            <div className="careers-form">
              {submitted ? (
                <div className="notice notice-success" role="status" style={{ padding: '2rem' }}>
                  <p className="h3" style={{ fontSize: '1.6rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                    Thanks, {formData.name.split(' ')[0]}.
                  </p>
                  <p style={{ color: 'var(--ink-2)' }}>
                    Your application is with us. We&apos;ll be in touch at {formData.email}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form-grid">
                  <div className="field">
                    <label className="field-label" htmlFor="k-name">Name</label>
                    <input id="k-name" className="input" required autoComplete="name" value={formData.name} onChange={update('name')} />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="k-email">Email</label>
                    <input id="k-email" type="email" className="input" required autoComplete="email" value={formData.email} onChange={update('email')} />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="k-phone">Phone</label>
                    <input id="k-phone" type="tel" className="input" required autoComplete="tel" placeholder="+91" value={formData.phone} onChange={update('phone')} />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="k-dept">Area</label>
                    <select id="k-dept" className="input" required value={formData.department} onChange={update('department')}>
                      <option value="" disabled>
                        Choose one
                      </option>
                      {departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field full">
                    <span className="field-label" id="k-cv-label">CV</span>
                    <input
                      ref={fileInputRef}
                      id="k-cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
                      aria-labelledby="k-cv-label"
                    />
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        padding: '1rem',
                        background: '#fbf9f4',
                        border: `1px dashed ${fileError ? '#d4766c' : 'var(--line)'}`,
                        borderRadius: 6,
                      }}
                    >
                      <span style={{ color: fileName ? 'var(--ink)' : 'var(--ink-3)', fontSize: '0.95rem', wordBreak: 'break-all' }}>
                        {fileName || 'PDF or Word, up to 5 MB'}
                      </span>
                      <button type="button" className="btn btn-ghost" onClick={() => fileInputRef.current?.click()} style={{ padding: '0.6rem 1rem', fontSize: '0.9rem' }}>
                        {fileName ? 'Replace file' : 'Choose file'}
                      </button>
                    </div>
                    {fileError && (
                      <span role="alert" style={{ color: '#8a1c13', fontSize: '0.9rem' }}>
                        {fileError}
                      </span>
                    )}
                  </div>

                  <div className="field full">
                    <label className="field-label" htmlFor="k-message">About you</label>
                    <textarea
                      id="k-message"
                      className="input"
                      required
                      rows={6}
                      placeholder="What have you built, and what would you like to work on here?"
                      value={formData.message}
                      onChange={update('message')}
                    />
                  </div>

                  {error && (
                    <div className="notice notice-error full" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="full">
                    <button type="submit" className="btn" disabled={loading}>
                      {loading ? 'Sending…' : 'Send application'}
                      {!loading && <span className="arrow" aria-hidden="true">→</span>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .careers-form { max-width: 760px; margin-left: calc(280px + 2rem); }
        @media (max-width: 960px) { .careers-form { margin-left: 0; } }
      `}</style>
    </>
  );
}
