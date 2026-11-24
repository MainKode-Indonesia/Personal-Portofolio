import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface StoredSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  delivery: 'smtp' | 'direct';
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_EMAIL = process.env.CONTACT_EMAIL || 'mainkode4@gmail.com';
const PORT = Number(process.env.PORT) || 3000;
const recentSubmissions: StoredSubmission[] = [];

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildMailtoUrl(name: string, email: string, subject: string, message: string): string {
  const formattedBody = [
    `Halo Muhamad Naufal Burhanuddin Balit,`,
    '',
    message,
    '',
    '---',
    `Dikirim oleh: ${name}`,
    `Email pengirim: ${email}`,
  ].join('\n');

  const params = new URLSearchParams({
    subject: subject,
    body: formattedBody,
  });

  return `mailto:${TARGET_EMAIL}?${params.toString()}`;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/api/contact', async (req, res) => {
    const body = (req.body || {}) as ContactPayload;
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        ok: false,
        error: 'Nama harus diisi minimal 2 karakter.',
      });
    }

    if (!isValidEmail(email) || email.length > 160) {
      return res.status(400).json({
        ok: false,
        error: 'Masukkan alamat email yang valid.',
      });
    }

    if (subject.length < 3 || subject.length > 160) {
      return res.status(400).json({
        ok: false,
        error: 'Subjek pesan minimal 3 karakter.',
      });
    }

    if (message.length < 10 || message.length > 3000) {
      return res.status(400).json({
        ok: false,
        error: 'Pesan harus berisi minimal 10 karakter.',
      });
    }

    const mailtoUrl = buildMailtoUrl(name, email, subject, message);
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    let delivery: 'smtp' | 'direct' = 'direct';

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"${name.replace(/"/g, '')}" <${smtpUser}>`,
          to: TARGET_EMAIL,
          replyTo: email,
          subject: `[Portofolio Naufal Balit] ${subject}`,
          text: `Dari: ${name} (${email})\nSubjek: ${subject}\n\n${message}`,
        });

        delivery = 'smtp';
      } catch (err) {
        console.error('SMTP delivery fallback to direct mailto:', err);
        delivery = 'direct';
      }
    }

    const entry: StoredSubmission = {
      id: `msg_${Date.now()}`,
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      delivery,
    };

    recentSubmissions.unshift(entry);
    if (recentSubmissions.length > 50) {
      recentSubmissions.pop();
    }

    return res.status(200).json({
      ok: true,
      id: entry.id,
      delivery,
      targetEmail: TARGET_EMAIL,
      mailtoUrl,
    });
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    app.use(express.static(path.resolve(__dirname, 'public')));
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MainKode portfolio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
