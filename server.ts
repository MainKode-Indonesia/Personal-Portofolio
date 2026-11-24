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
const GITHUB_USERNAME = 'MainKode-Indonesia';
const GITHUB_CACHE_TTL_MS = 15 * 60 * 1000;
const PORT = Number(process.env.PORT) || 3000;
const recentSubmissions: StoredSubmission[] = [];

interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubRepoSummary {
  name: string;
  url: string;
  description: string;
  language: string | null;
  stars: number;
  forks: number;
  pushedAt: string;
}

interface GitHubContributionsPayload {
  username: string;
  profileUrl: string;
  avatarUrl: string;
  name: string;
  company: string | null;
  location: string | null;
  publicRepos: number;
  totalContributions: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  peakDay: { date: string; count: number } | null;
  days: GitHubContributionDay[];
  recentRepos: GitHubRepoSummary[];
  fetchedAt: string;
}

let githubCache: { data: GitHubContributionsPayload; expiresAt: number } | null = null;

function computeStreaks(days: GitHubContributionDay[]): {
  currentStreak: number;
  longestStreak: number;
} {
  let longestStreak = 0;
  let running = 0;

  for (const day of days) {
    if (day.count > 0) {
      running += 1;
      if (running > longestStreak) {
        longestStreak = running;
      }
    } else {
      running = 0;
    }
  }

  let currentStreak = 0;
  if (days.length > 0) {
    // Allow trailing zero only on the very last day if today hasn't ended yet,
    // otherwise count backwards consecutively from the latest active day.
    let idx = days.length - 1;
    if (days[idx].count === 0 && idx > 0 && days[idx - 1].count > 0) {
      idx -= 1;
    }
    while (idx >= 0 && days[idx].count > 0) {
      currentStreak += 1;
      idx -= 1;
    }
  }

  return { currentStreak, longestStreak };
}

function parseGitHubContributionsHtml(html: string): {
  totalFromHeader: number | null;
  days: GitHubContributionDay[];
} {
  const totalMatch = html.match(
    /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contribution/i
  );
  const totalFromHeader = totalMatch
    ? Number(totalMatch[1].replace(/,/g, ''))
    : null;

  const tooltipCounts = new Map<string, number>();
  for (const match of html.matchAll(
    /<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g
  )) {
    const targetId = match[1];
    const text = match[2].trim();
    const numMatch = text.match(/^(\d+)\s+contribution/);
    tooltipCounts.set(targetId, numMatch ? Number(numMatch[1]) : 0);
  }

  const days: GitHubContributionDay[] = [];
  for (const match of html.matchAll(/<td\b([^>]*)>/g)) {
    const attrs = match[1];
    const dateMatch = attrs.match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/);
    const levelMatch = attrs.match(/\bdata-level="([0-4])"/);
    if (!dateMatch || !levelMatch) continue;

    const idMatch = attrs.match(/\bid="([^"]+)"/);
    const id = idMatch ? idMatch[1] : '';
    const count = tooltipCounts.get(id) ?? 0;
    const level = Number(levelMatch[1]) as 0 | 1 | 2 | 3 | 4;

    days.push({
      date: dateMatch[1],
      count,
      level,
    });
  }

  days.sort((a, b) => a.date.localeCompare(b.date));
  return { totalFromHeader, days };
}

async function fetchGitHubContributions(): Promise<GitHubContributionsPayload> {
  const now = Date.now();
  if (githubCache && now < githubCache.expiresAt) {
    return githubCache.data;
  }

  const headers = {
    'User-Agent': 'MainKode-Portfolio-Server',
    Accept: 'application/vnd.github+json',
  };

  try {
    const [contribRes, userRes, reposRes] = await Promise.all([
      fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`, {
        headers: { 'User-Agent': 'MainKode-Portfolio-Server' },
        signal: AbortSignal.timeout(8000),
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        signal: AbortSignal.timeout(8000),
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`, {
        headers,
        signal: AbortSignal.timeout(8000),
      }),
    ]);

    if (!contribRes.ok) {
      throw new Error(`GitHub contributions HTTP ${contribRes.status}`);
    }

    const contribHtml = await contribRes.text();
    const { totalFromHeader, days } = parseGitHubContributionsHtml(contribHtml);

    const userJson = userRes.ok
      ? ((await userRes.json()) as {
          login?: string;
          name?: string;
          avatar_url?: string;
          html_url?: string;
          company?: string | null;
          location?: string | null;
          public_repos?: number;
        })
      : {};

    const reposJson = reposRes.ok
      ? ((await reposRes.json()) as Array<{
          name?: string;
          html_url?: string;
          description?: string | null;
          language?: string | null;
          stargazers_count?: number;
          forks_count?: number;
          pushed_at?: string;
          fork?: boolean;
        }>)
      : [];

    const summedTotal = days.reduce((sum, d) => sum + d.count, 0);
    const totalContributions = totalFromHeader ?? summedTotal;
    const activeDays = days.filter((d) => d.count > 0).length;
    const { currentStreak, longestStreak } = computeStreaks(days);

    let peakDay: { date: string; count: number } | null = null;
    for (const day of days) {
      if (day.count > 0 && (!peakDay || day.count > peakDay.count)) {
        peakDay = { date: day.date, count: day.count };
      }
    }

    const recentRepos: GitHubRepoSummary[] = Array.isArray(reposJson)
      ? reposJson
          .filter((repo) => !repo.fork && typeof repo.name === 'string' && typeof repo.html_url === 'string')
          .slice(0, 6)
          .map((repo) => ({
            name: repo.name!,
            url: repo.html_url!,
            description: repo.description || '',
            language: repo.language ?? null,
            stars: Number(repo.stargazers_count ?? 0),
            forks: Number(repo.forks_count ?? 0),
            pushedAt: repo.pushed_at || '',
          }))
      : [];

    const payload: GitHubContributionsPayload = {
      username: userJson.login || GITHUB_USERNAME,
      profileUrl: userJson.html_url || `https://github.com/${GITHUB_USERNAME}`,
      avatarUrl: userJson.avatar_url || '',
      name: userJson.name || 'MainKode',
      company: userJson.company ?? null,
      location: userJson.location ?? null,
      publicRepos: Number(userJson.public_repos ?? recentRepos.length),
      totalContributions,
      activeDays,
      currentStreak,
      longestStreak,
      peakDay,
      days,
      recentRepos,
      fetchedAt: new Date().toISOString(),
    };

    githubCache = {
      data: payload,
      expiresAt: now + GITHUB_CACHE_TTL_MS,
    };

    return payload;
  } catch (error) {
    if (githubCache) {
      return githubCache.data;
    }
    throw error;
  }
}

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

  app.get('/api/github-contributions', async (_req, res) => {
    try {
      const data = await fetchGitHubContributions();
      return res.status(200).json({ ok: true, data });
    } catch (error) {
      console.error('GitHub contributions fetch failed:', error);
      return res.status(502).json({
        ok: false,
        error: 'Unable to load GitHub contribution data right now.',
      });
    }
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
