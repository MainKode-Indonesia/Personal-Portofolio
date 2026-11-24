import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Globe,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { OWNER_PROFILE, SOCIAL_PROFILES, type Language } from '../data/projects';

interface ContactSectionProps {
  lang: Language;
}

interface SubmitSuccessState {
  id: string;
  delivery: 'smtp' | 'direct';
  targetEmail: string;
  mailtoUrl: string;
  senderName: string;
}

function getSocialIcon(id: string) {
  switch (id) {
    case 'linkedin':
      return Linkedin;
    case 'github':
      return Github;
    case 'nafeka':
      return Globe;
    default:
      return Mail;
  }
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successState, setSuccessState] = useState<SubmitSuccessState | null>(null);

  const buildClientMailto = () => {
    const cleanSubject =
      subject.trim() ||
      (lang === 'id'
        ? `Diskusi & Kolaborasi — ${OWNER_PROFILE.fullName}`
        : `Partnership & Product Inquiry — ${OWNER_PROFILE.fullName}`);

    const cleanBody = [
      lang === 'id' ? `Halo ${OWNER_PROFILE.fullName},` : `Hello ${OWNER_PROFILE.fullName},`,
      '',
      message.trim() ||
        (lang === 'id'
          ? 'Saya tertarik berdiskusi mengenai proyek, produk digital, atau kolaborasi bersama Nafeka.'
          : 'I would like to connect regarding a project, product, or partnership opportunity.'),
      '',
      '---',
      `${lang === 'id' ? 'Nama' : 'Name'}: ${name.trim() || '-'}`,
      `Email: ${email.trim() || '-'}`,
    ].join('\n');

    const params = new URLSearchParams({
      subject: cleanSubject,
      body: cleanBody,
    });
    return `mailto:${OWNER_PROFILE.email}?${params.toString()}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessState(null);

    if (name.trim().length < 2) {
      setErrorMessage(
        lang === 'id'
          ? 'Mohon isi nama lengkap minimal 2 karakter.'
          : 'Please enter your name (at least 2 characters).'
      );
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage(
        lang === 'id'
          ? 'Mohon masukkan alamat email yang valid.'
          : 'Please enter a valid email address.'
      );
      return;
    }
    if (subject.trim().length < 3) {
      setErrorMessage(
        lang === 'id'
          ? 'Subjek pesan minimal 3 karakter.'
          : 'Subject must be at least 3 characters long.'
      );
      return;
    }
    if (message.trim().length < 10) {
      setErrorMessage(
        lang === 'id'
          ? 'Tuliskan pesan Anda minimal 10 karakter agar mudah dipahami.'
          : 'Please write a message of at least 10 characters.'
      );
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setErrorMessage(
          data.error ||
            (lang === 'id'
              ? 'Terjadi kendala saat memproses pesan. Silakan coba lagi.'
              : 'Unable to send message right now. Please try again.')
        );
        return;
      }

      setSuccessState({
        id: data.id,
        delivery: data.delivery,
        targetEmail: data.targetEmail || OWNER_PROFILE.email,
        mailtoUrl: data.mailtoUrl || buildClientMailto(),
        senderName: name.trim(),
      });

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setErrorMessage(
        lang === 'id'
          ? 'Koneksi ke server terputus. Anda dapat langsung mengirim pesan melalui tautan email di bawah.'
          : 'Connection lost. You can still send your message directly using the email app button below.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct Info & Social Profiles */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {lang === 'id' ? '08. Kontak & Koneksi' : '08. Contact & Social'}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 text-balance dark:text-slate-50 sm:text-4xl">
              {lang === 'id'
                ? 'Mari terhubung untuk produk, teknologi & kemitraan.'
                : "Let's connect for products, technology & partnerships."}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {lang === 'id'
                ? 'Terbuka untuk diskusi seputar kemitraan produk, kolaborasi rekayasa perangkat lunak, serta koneksi profesional bersama saya dan ekosistem Nafeka.'
                : 'Open to product partnerships, software engineering collaborations, and executive or developer connections across the Nafeka ecosystem.'}
            </p>

            {/* Primary Email Direct Box */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#101521]">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {lang === 'id' ? 'Email Terhubung Langsung' : 'Direct Email Inbox'}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${OWNER_PROFILE.email}`}
                  className="font-mono text-sm font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-blue-600 dark:text-slate-100 dark:decoration-slate-700 dark:hover:text-blue-400 sm:text-base"
                >
                  {OWNER_PROFILE.email}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 whitespace-nowrap shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                      <span>{lang === 'id' ? 'Email Tersalin' : 'Email Copied'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{lang === 'id' ? 'Salin Email' : 'Copy Email'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Media & Ecosystem Links */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {lang === 'id' ? 'Koneksi Profesional & Media Sosial' : 'Professional & Social Links'}
              </h3>
              <ul className="mt-3 divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
                {SOCIAL_PROFILES.map((profile) => {
                  const Icon = getSocialIcon(profile.id);
                  return (
                    <li key={profile.id}>
                      <a
                        href={profile.href}
                        target={profile.external ? '_blank' : undefined}
                        rel={profile.external ? 'noopener noreferrer' : undefined}
                        className="group flex min-h-14 items-center justify-between gap-4 py-3.5 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:hover:text-blue-400"
                      >
                        <div className="flex min-w-0 items-center gap-3.5">
                          <Icon
                            className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400"
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
                              {profile.label[lang]}
                              <span className="ml-2 font-mono text-xs font-normal text-slate-500 dark:text-slate-400">
                                {profile.handle}
                              </span>
                            </p>
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                              {profile.description[lang]}
                            </p>
                          </div>
                        </div>

                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Right Column: Email-Integrated Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#101521] sm:p-8">
              <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {lang === 'id' ? 'Kirim Pesan Langsung' : 'Send a Direct Message'}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                {lang === 'id'
                  ? 'Pesan Anda terhubung langsung ke email '
                  : 'Your message routes directly to '}
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {OWNER_PROFILE.email}
                </span>
                .
              </p>

              {errorMessage && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2.5 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successState && (
                <div
                  role="status"
                  className="mt-5 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/35 dark:text-emerald-200"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">
                        {lang === 'id'
                          ? `Terima kasih, ${successState.senderName}. Pesan Anda berhasil diproses.`
                          : `Thank you, ${successState.senderName}. Your message has been processed.`}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed opacity-90">
                        {successState.delivery === 'smtp'
                          ? lang === 'id'
                            ? `Email telah dikirim langsung ke kotak masuk ${successState.targetEmail}.`
                            : `Your email has been delivered to ${successState.targetEmail}.`
                          : lang === 'id'
                            ? `Pesan tercatat dengan aman. Anda juga dapat langsung membukanya di aplikasi email untuk pengiriman instan ke ${successState.targetEmail}.`
                            : `Your inquiry has been recorded. You can also launch your mail client to send immediately to ${successState.targetEmail}.`}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <a
                          href={successState.mailtoUrl}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 whitespace-nowrap"
                        >
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>
                            {lang === 'id' ? 'Buka di Aplikasi Email' : 'Open in Email App'}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                    >
                      {lang === 'id' ? 'Nama Lengkap' : 'Full Name'}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'id' ? 'Contoh: Budi Santoso' : 'e.g. Alex Morgan'}
                      className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#080B12] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-[#0B101B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                    >
                      {lang === 'id' ? 'Alamat Email' : 'Email Address'}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'id' ? 'nama@domain.com' : 'you@domain.com'}
                      className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#080B12] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-[#0B101B]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                  >
                    {lang === 'id' ? 'Subjek' : 'Subject'}
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={
                      lang === 'id'
                        ? 'Contoh: Kemitraan atau diskusi produk'
                        : 'e.g. Product partnership or collaboration'
                    }
                    className="mt-1.5 min-h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#080B12] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-[#0B101B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200"
                  >
                    {lang === 'id' ? 'Pesan' : 'Message'}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'id'
                        ? 'Ceritakan ide, kebutuhan proyek, atau rencana kolaborasi Anda...'
                        : 'Share your goals, product vision, or partnership idea...'
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-[#080B12] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:bg-[#0B101B]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {submitting
                        ? lang === 'id'
                          ? 'Mengirim...'
                          : 'Sending...'
                        : lang === 'id'
                          ? 'Kirim Pesan'
                          : 'Send Message'}
                    </span>
                  </button>

                  <a
                    href={buildClientMailto()}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5 whitespace-nowrap shrink-0"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>{lang === 'id' ? 'Kirim via Email App' : 'Open Email App'}</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
