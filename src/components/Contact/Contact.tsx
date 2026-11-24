import { useState, type FormEvent } from 'react';
import './Contact.css';

// Productie-URL via Cloudflare Tunnel; lokaal te overschrijven met VITE_API_URL.
const API_URL =
  import.meta.env.VITE_API_URL || 'https://api.hornyhousewives.eu/api/contact';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [bericht, setBericht] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naam, email, bericht }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };
      if (res.ok && data.success) {
        setStatus('success');
        setNaam('');
        setEmail('');
        setBericht('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Er ging iets mis. Probeer het later opnieuw.');
      }
    } catch {
      setStatus('error');
      setMessage('Geen verbinding met de server. Probeer het later opnieuw.');
    }
  }

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Contact</h1>
        <p>
          Heb je een vraag, een verzoek of wil je gewoon even bellen? Vul hier
          je gegevens in en beschrijf kort je probleem — Lisa neemt contact met
          je op.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="naam">Naam</label>
            <input
              id="naam"
              name="naam"
              type="text"
              value={naam}
              onChange={(e) => setNaam(e.target.value)}
              placeholder="Je naam"
              autoComplete="name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">
              E-mail <span className="required">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jij@voorbeeld.eu"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="bericht">
              Bericht <span className="required">*</span>
            </label>
            <textarea
              id="bericht"
              name="bericht"
              rows={5}
              value={bericht}
              onChange={(e) => setBericht(e.target.value)}
              placeholder="Beschrijf kort je probleem of vraag…"
              required
              minLength={10}
              maxLength={2000}
            />
          </div>

          <button
            type="submit"
            className="contact-button"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Verzenden…' : 'Verstuur'}
          </button>

          {status === 'success' && (
            <p className="form-status success" role="status">
              Bedankt! Lisa neemt zo snel mogelijk contact met je op.
            </p>
          )}
          {status === 'error' && (
            <p className="form-status error" role="alert">
              {message}
            </p>
          )}
        </form>

        <p className="contact-fallback">
          Liever direct een e-mail sturen?{' '}
          <a href="mailto:lisa@hornyhousewives.eu">lisa@hornyhousewives.eu</a>
        </p>
      </div>
    </div>
  );
}

