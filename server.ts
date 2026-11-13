import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resolveResumePdfPath(): string | null {
  const candidates = [
    path.resolve(__dirname, 'public/assets/aistudio/Gokul_IT_admin_7a78b58b.pdf'),
    path.resolve(__dirname, 'dist/assets/aistudio/Gokul_IT_admin_7a78b58b.pdf'),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '64kb' }));

  const sendResumePdf = (req: express.Request, res: express.Response) => {
    const pdfPath = resolveResumePdfPath();
    if (!pdfPath) {
      res.status(404).json({ error: 'Resume PDF file not found on server.' });
      return;
    }

    const isInline = req.query.inline === '1';
    const disposition = isInline ? 'inline' : 'attachment';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `${disposition}; filename="Gokula_Kannan_R_Resume.pdf"`
    );
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.sendFile(pdfPath);
  };

  // Explicit binary PDF routes before Vite SPA fallback
  app.get('/api/resume', sendResumePdf);
  app.get('/assets/Gokula_Kannan_R_Resume.pdf', sendResumePdf);
  app.get('/assets/aistudio/Gokul_IT_admin_7a78b58b.pdf', sendResumePdf);

  app.post('/api/contact', async (req, res) => {
    const body = (req.body || {}) as ContactPayload;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !email || !subject || !message) {
      res.status(400).json({
        error: 'Please complete your name, email address, subject, and message.',
      });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({
        error: 'Please enter a valid email address.',
      });
      return;
    }

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'rgksrt10@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY?.trim();

    if (resendApiKey) {
      try {
        const fromEmail =
          process.env.CONTACT_FROM_EMAIL || 'Portfolio Inquiry <onboarding@resend.dev>';
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [recipient],
            reply_to: email,
            subject: `[Portfolio Contact] ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          }),
        });

        if (!response.ok) {
          const detail = await response.text();
          console.error('Resend API failure:', response.status, detail);
          res.status(502).json({
            error: 'Email relay failed to deliver your message. Please use direct email instead.',
          });
          return;
        }

        res.status(200).json({
          delivered: true,
          configured: true,
          recipient,
        });
        return;
      } catch (err) {
        console.error('Contact relay error:', err);
        res.status(502).json({
          error: 'Unable to reach the email relay service. Please email directly.',
        });
        return;
      }
    }

    // No email relay API key configured — return honest fallback metadata (never fake delivery)
    const mailtoSubject = encodeURIComponent(subject);
    const mailtoBody = encodeURIComponent(
      `Hello Gokula Kannan,\n\n${message}\n\nBest regards,\n${name}\n(${email})`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

    res.status(200).json({
      delivered: false,
      configured: false,
      recipient,
      mailtoUrl,
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
