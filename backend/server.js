import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const app = express();
const PORT = Number(process.env.PORT || 3000);

// Achter een proxy (Cloudflare Tunnel) staat: gebruik het echte client-IP.
app.set('trust proxy', 1);

app.use(express.json({ limit: '10kb' }));

// Alleen de frontend-domeinen mogen posten (komma-gescheiden in CORS_ORIGIN).
const allowedOrigins = (process.env.CORS_ORIGIN || 'https://hornyhousewives.eu')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['POST'],
    allowedHeaders: ['Content-Type'],
  }),
);

// Basis-spambescherming: max 5 verzoeken per 15 min per IP.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Te veel verzoeken. Probeer het over enkele minuten opnieuw.' },
});

// SMTP-transporter. Standaard: lokale Postfix op 127.0.0.1:25.
// Vul SMTP_USER/SMTP_PASS in als je een smarthost/relay met inlog gebruikt.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || '127.0.0.1',
  port: Number(process.env.SMTP_PORT || 25),
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS || '' }
    : undefined,
  connectionTimeout: 10000,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hulp: trim + lengte-limiet om afwijkende input te beperken.
function clean(value, max = 200) {
  return String(value ?? '').trim().slice(0, max);
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const body = req.body ?? {};
    const email = clean(body.email, 254);
    const naam = clean(body.naam, 200);
    const bericht = clean(body.bericht, 2000);

    if (!email || !EMAIL_RE.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: 'Vul een geldig e-mailadres in.' });
    }

    if (bericht.length < 10) {
      return res
        .status(400)
        .json({ success: false, error: 'Vul een bericht in (minimaal 10 tekens).' });
    }

    const domain = process.env.DOMAIN || 'hornyhousewives.eu';
    const from = process.env.FROM_ADDRESS || `no-reply@${domain}`;
    const to = process.env.RECIPIENT || `lisa@${domain}`;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Nieuw contactformulier${naam ? ` — ${naam}` : ''}`,
      text: [
        'Nieuw bericht via het Horny Housewives contactformulier.',
        '',
        `Naam: ${naam || '(niet ingevuld)'}`,
        `E-mail: ${email}`,
        '',
        bericht,
        '',
        `Verzonden op: ${new Date().toLocaleString('nl-NL')}`,
      ].join('\n'),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Fout bij het versturen van de e-mail:', err);
    return res.status(500).json({
      success: false,
      error: 'Er ging iets mis bij het versturen. Probeer het later opnieuw.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact-backend draait op poort ${PORT}`);
});
