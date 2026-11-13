import { motion } from 'motion/react';
import { ArrowDownToLine, ArrowUpRight, FileText } from 'lucide-react';
import { NAV_ITEMS, PROFILE, RESUME_FILENAME, RESUME_PDF_PATH } from '../data/profile';
import { downloadVerifiedResumePdf } from '../utils/resumeDownload';
import { GkMonogram } from './GkMonogram';
import { NetworkDiagram } from './NetworkDiagram';

interface HeroSectionProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  onPreviewResume: () => void;
}

export function HeroSection({ activeSection, onNavigate, onPreviewResume }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] pt-18 sm:pt-20 pb-10 sm:pb-12 flex flex-col justify-between border-b border-[#20211E]/20 overflow-hidden bg-[#F1EEE5]"
    >
      {/* Atmospheric Technical Network & Server Topology Background */}
      <NetworkDiagram />

      {/* Vertical Section Rail on Desktop */}
      <aside
        aria-label="Section index"
        className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-2.5"
      >
        {NAV_ITEMS.map((item, idx) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-label={`Jump to ${item.label}`}
              className="group flex items-center gap-2 py-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
            >
              <span
                className={`font-tech text-[10px] tracking-[0.14em] transition-opacity duration-200 ${
                  isActive
                    ? 'opacity-100 text-[#C65B36] font-medium'
                    : 'opacity-0 group-hover:opacity-100 text-[#20211E]/70'
                }`}
              >
                {item.label}
              </span>
              <span
                className={`font-tech text-[10px] tabular-nums transition-colors ${
                  isActive ? 'text-[#C65B36] font-medium' : 'text-[#A5A49B] group-hover:text-[#20211E]'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span
                className={`h-[1.5px] transition-all duration-200 ${
                  isActive
                    ? 'w-5 bg-[#C65B36]'
                    : 'w-2.5 bg-[#20211E]/25 group-hover:w-4 group-hover:bg-[#20211E]'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-between gap-8 sm:gap-10">
        {/* Top Technical Identification Strip */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pt-3 sm:pt-4 pb-3.5 sm:pb-4 border-b border-[#20211E]/15 flex items-center justify-between gap-4"
        >
          <p className="font-tech text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.18em] text-[#20211E]/85 uppercase leading-relaxed">
            {PROFILE.identificationStrip}
          </p>
        </motion.div>

        {/* Asymmetrical Editorial Hero Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end my-auto py-2 sm:py-4">
          {/* Oversized Typographic Statement */}
          <div className="lg:col-span-8 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 sm:mb-6"
            >
              <span className="font-display-sans font-bold text-[11px] sm:text-sm tracking-[0.2em] sm:tracking-[0.26em] uppercase text-[#C65B36]">
                {PROFILE.heroRole}
              </span>
            </motion.div>

            <h1 className="font-editorial text-[clamp(2.85rem,11.5vw,8.75rem)] leading-[0.88] tracking-[-0.02em] text-[#20211E] uppercase">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.72, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  GOKULA
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.72, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  KANNAN R<span className="text-[#C65B36]">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 sm:mt-8 max-w-xl font-editorial italic text-xl sm:text-3xl lg:text-[2.15rem] leading-[1.24] text-[#20211E]/90"
            >
              “{PROFILE.tagline}”
            </motion.p>
          </div>

          {/* Right Asymmetrical Editorial Plate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-center lg:items-end justify-end gap-4 sm:gap-5"
          >
            <GkMonogram />
            <div className="max-w-[340px] lg:max-w-[360px] w-full flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs font-tech text-[#777B61] border-t border-[#20211E]/15 pt-3">
              <span>{PROFILE.company}</span>
              <span className="tabular-nums">{PROFILE.period}</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Structural Hero Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="pt-5 sm:pt-6 border-t border-[#20211E]/20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          {/* Experience Feature Counter */}
          <div className="lg:col-span-4 flex items-baseline gap-3.5 sm:gap-4">
            <span className="font-editorial text-4xl sm:text-6xl leading-none text-[#20211E] tabular-nums">
              {PROFILE.experienceYearsBadge}
            </span>
            <div className="flex flex-col">
              <span className="font-tech text-[10px] sm:text-[11px] tracking-[0.14em] text-[#20211E] uppercase">
                {PROFILE.experienceLabel}
              </span>
              <span className="font-tech text-[11px] text-[#777B61] mt-0.5">
                {PROFILE.experienceFullText} in IT Operations
              </span>
            </div>
          </div>

          {/* Primary Action Cluster */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:flex sm:flex-wrap items-center lg:justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => onNavigate('experience')}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 bg-[#C65B36] text-[#FAF9F5] hover:bg-[#20211E] transition-colors font-tech text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.14em] uppercase cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
            >
              <span>Explore Experience</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-3 border border-[#20211E]/35 bg-[#FAF9F5] text-[#20211E] hover:border-[#20211E] hover:bg-[#20211E] hover:text-[#FAF9F5] transition-colors font-tech text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.14em] uppercase cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
            >
              <span>Contact</span>
            </button>

            <a
              href={RESUME_PDF_PATH}
              download={RESUME_FILENAME}
              onClick={(e) => {
                e.preventDefault();
                void downloadVerifiedResumePdf();
              }}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-3 border border-[#20211E]/25 text-[#20211E] hover:border-[#C65B36] hover:text-[#C65B36] transition-colors font-tech text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.14em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Resume</span>
            </a>

            <button
              type="button"
              onClick={onPreviewResume}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 border border-[#20211E]/15 sm:border-transparent text-[#777B61] hover:text-[#20211E] transition-colors font-tech text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.14em] uppercase cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>View PDF</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
