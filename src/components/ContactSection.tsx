import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  ArrowDownToLine,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Linkedin,
  Mail,
  Phone,
} from 'lucide-react';
import { NAV_ITEMS, PROFILE, RESUME_FILENAME, RESUME_PDF_PATH } from '../data/profile';
import { downloadVerifiedResumePdf } from '../utils/resumeDownload';

interface ContactSectionProps {
  onNavigate: (id: string) => void;
  onPreviewResume: () => void;
}

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'delivered'; recipient: string }
  | { status: 'relay_unconfigured'; mailtoUrl: string; recipient: string }
  | { status: 'error'; message: string };

export function ContactSection({ onNavigate, onPreviewResume }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | 'linkedin' | 'draft' | null>(
    null
  );

  const handleCopy = async (text: string, field: 'email' | 'phone' | 'linkedin' | 'draft') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField((cur) => (cur === field ? null : cur)), 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState({ status: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitState({
          status: 'error',
          message: data?.error || 'Unable to process your inquiry. Please email directly.',
        });
        return;
      }

      if (data.delivered) {
        setSubmitState({ status: 'delivered', recipient: data.recipient });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        return;
      }

      // Honest fallback when no server-side mail provider is configured
      setSubmitState({
        status: 'relay_unconfigured',
        mailtoUrl: data.mailtoUrl,
        recipient: data.recipient || PROFILE.email,
      });
    } catch {
      setSubmitState({
        status: 'error',
        message: 'Network error while reaching the contact endpoint. Please email directly.',
      });
    }
  };

  const formattedDraft = `To: ${PROFILE.email}\nSubject: ${subject}\nFrom: ${name} (${email})\n\n${message}`;

  return (
    <footer id="contact" className="relative bg-[#20211E] text-[#F1EEE5]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-24 lg:pt-28 pb-12">
        {/* Top Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12 border-b border-[#F1EEE5]/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-8">
            <p className="font-tech text-[11px] tracking-[0.2em] text-[#C65B36] uppercase mb-4">
              07 / DIRECT CONTACT
            </p>
            <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl leading-[0.94] tracking-tight text-[#FAF9F5] uppercase">
              LET&apos;S KEEP THINGS RUNNING.
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="font-display-sans text-base leading-relaxed text-[#F1EEE5]/80">
              Have an IT support requirement or professional opportunity? Let&apos;s connect.
            </p>
          </div>
        </motion.div>

        {/* Main Contact Grid */}
        <div className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Channels & Resume */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <div className="space-y-8">
              <div>
                <p className="font-tech text-[10px] tracking-[0.2em] text-[#A5A49B] uppercase mb-2">
                  PROFESSIONAL CONTACT
                </p>
                <p className="font-editorial text-3xl text-[#FAF9F5] uppercase tracking-wide">
                  GOKULA KANNAN R
                </p>
                <p className="font-tech text-xs text-[#777B61] mt-1 uppercase tracking-[0.12em]">
                  {PROFILE.role} · {PROFILE.experienceYearsBadge} Years Experience
                </p>
              </div>

              <div className="divide-y divide-[#F1EEE5]/15 border-t border-b border-[#F1EEE5]/15">
                {/* Click-to-call Phone */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <a
                    href={PROFILE.phoneHref}
                    className="group flex items-center gap-3.5 text-[#FAF9F5] hover:text-[#C65B36] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C65B36]"
                  >
                    <Phone className="w-4 h-4 text-[#C65B36] shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block font-tech text-[10px] tracking-[0.16em] text-[#A5A49B] uppercase">
                        Phone
                      </span>
                      <span className="font-tech text-base tabular-nums">
                        {PROFILE.phoneDisplay}
                      </span>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.phoneDisplay, 'phone')}
                    aria-label="Copy phone number"
                    className="p-2 border border-[#F1EEE5]/20 text-[#A5A49B] hover:text-[#FAF9F5] hover:border-[#F1EEE5]/50 transition-colors cursor-pointer"
                  >
                    {copiedField === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-[#C65B36]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Click-to-email */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <a
                    href={PROFILE.emailHref}
                    className="group flex items-center gap-3.5 text-[#FAF9F5] hover:text-[#C65B36] transition-colors min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C65B36]"
                  >
                    <Mail className="w-4 h-4 text-[#C65B36] shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="block font-tech text-[10px] tracking-[0.16em] text-[#A5A49B] uppercase">
                        Email
                      </span>
                      <span className="font-tech text-base break-all">{PROFILE.email}</span>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.email, 'email')}
                    aria-label="Copy email address"
                    className="p-2 border border-[#F1EEE5]/20 text-[#A5A49B] hover:text-[#FAF9F5] hover:border-[#F1EEE5]/50 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-[#C65B36]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* LinkedIn Profile */}
                <div className="py-4 flex items-center justify-between gap-4">
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 text-[#FAF9F5] hover:text-[#C65B36] transition-colors min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C65B36]"
                  >
                    <Linkedin className="w-4 h-4 text-[#C65B36] shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <span className="block font-tech text-[10px] tracking-[0.16em] text-[#A5A49B] uppercase">
                        LinkedIn
                      </span>
                      <span className="font-tech text-sm sm:text-base break-all inline-flex items-center gap-1.5">
                        <span>{PROFILE.linkedinDisplay}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(PROFILE.linkedinUrl, 'linkedin')}
                    aria-label="Copy LinkedIn profile URL"
                    className="p-2 border border-[#F1EEE5]/20 text-[#A5A49B] hover:text-[#FAF9F5] hover:border-[#F1EEE5]/50 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedField === 'linkedin' ? (
                      <Check className="w-3.5 h-3.5 text-[#C65B36]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={RESUME_PDF_PATH}
                  download={RESUME_FILENAME}
                  onClick={(e) => {
                    e.preventDefault();
                    void downloadVerifiedResumePdf();
                  }}
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#C65B36] text-[#FAF9F5] hover:bg-[#FAF9F5] hover:text-[#20211E] transition-colors font-tech text-xs tracking-[0.14em] uppercase whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
                >
                  <ArrowDownToLine className="w-4 h-4" aria-hidden="true" />
                  <span>Download Resume PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onPreviewResume}
                  className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#F1EEE5]/25 text-[#F1EEE5] hover:border-[#FAF9F5] transition-colors font-tech text-xs tracking-[0.14em] uppercase cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>View PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="border border-[#F1EEE5]/15 bg-[#FAF9F5]/[0.03] p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#F1EEE5]/15 pb-4">
                <span className="font-tech text-[11px] tracking-[0.16em] text-[#A5A49B] uppercase">
                  INQUIRY DISPATCH
                </span>
                <span className="font-tech text-[11px] text-[#777B61]">
                  TO: {PROFILE.email}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-tech text-[11px] tracking-[0.14em] text-[#A5A49B] uppercase mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3.5 py-2.5 bg-[#20211E] border border-[#F1EEE5]/20 text-[#FAF9F5] placeholder:text-[#A5A49B]/50 text-sm font-display-sans focus:outline-none focus:border-[#C65B36] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-tech text-[11px] tracking-[0.14em] text-[#A5A49B] uppercase mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 bg-[#20211E] border border-[#F1EEE5]/20 text-[#FAF9F5] placeholder:text-[#A5A49B]/50 text-sm font-display-sans focus:outline-none focus:border-[#C65B36] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-tech text-[11px] tracking-[0.14em] text-[#A5A49B] uppercase mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="IT Support Opportunity / Inquiry"
                  className="w-full px-3.5 py-2.5 bg-[#20211E] border border-[#F1EEE5]/20 text-[#FAF9F5] placeholder:text-[#A5A49B]/50 text-sm font-display-sans focus:outline-none focus:border-[#C65B36] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-tech text-[11px] tracking-[0.14em] text-[#A5A49B] uppercase mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share role details, infrastructure needs, or scheduling availability..."
                  className="w-full px-3.5 py-2.5 bg-[#20211E] border border-[#F1EEE5]/20 text-[#FAF9F5] placeholder:text-[#A5A49B]/50 text-sm font-display-sans focus:outline-none focus:border-[#C65B36] transition-colors resize-y"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitState.status === 'submitting'}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF9F5] text-[#20211E] hover:bg-[#C65B36] hover:text-[#FAF9F5] disabled:opacity-60 transition-colors font-tech text-xs tracking-[0.14em] uppercase cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
                >
                  <span>
                    {submitState.status === 'submitting' ? 'Processing...' : 'Send Message'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Honest Submission States (Zero Fake Success Messages) */}
              {submitState.status === 'delivered' && (
                <div
                  role="status"
                  className="p-4 border border-[#777B61] bg-[#777B61]/15 text-sm text-[#FAF9F5]"
                >
                  Message delivered to {submitState.recipient}. Thank you for reaching out.
                </div>
              )}

              {submitState.status === 'relay_unconfigured' && (
                <div
                  role="status"
                  className="p-4 border border-[#C65B36]/60 bg-[#C65B36]/10 space-y-3"
                >
                  <p className="text-xs sm:text-sm text-[#F1EEE5] leading-relaxed">
                    Direct server email relay is not configured in this environment. Use your mail
                    client below to send your prepared message directly to{' '}
                    <span className="font-tech text-[#FAF9F5]">{submitState.recipient}</span>.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={submitState.mailtoUrl}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#C65B36] text-[#FAF9F5] hover:bg-[#FAF9F5] hover:text-[#20211E] transition-colors font-tech text-[11px] tracking-[0.12em] uppercase"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Open Email Client</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopy(formattedDraft, 'draft')}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#F1EEE5]/25 text-[#F1EEE5] hover:border-[#F1EEE5] transition-colors font-tech text-[11px] tracking-[0.12em] uppercase cursor-pointer"
                    >
                      {copiedField === 'draft' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#C65B36]" aria-hidden="true" />
                          <span>Message Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {submitState.status === 'error' && (
                <div
                  role="alert"
                  className="p-4 border border-[#C65B36] bg-[#C65B36]/15 text-sm text-[#FAF9F5]"
                >
                  {submitState.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Editorial Footer Bar */}
        <div className="pt-8 border-t border-[#F1EEE5]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="font-tech text-[11px] tracking-[0.12em] text-[#A5A49B]">
            © {new Date().getFullYear()} {PROFILE.fullName.toUpperCase()} · {PROFILE.role.toUpperCase()}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className="font-tech text-[10px] tracking-[0.14em] text-[#A5A49B] hover:text-[#FAF9F5] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 font-tech text-[11px] tracking-[0.14em] text-[#FAF9F5] hover:text-[#C65B36] transition-colors uppercase cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
