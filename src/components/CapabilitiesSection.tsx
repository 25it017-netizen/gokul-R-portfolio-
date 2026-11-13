import { motion } from 'motion/react';
import { CAPABILITIES } from '../data/profile';

function CapabilityGlyph({ index }: { index: number }) {
  const strokeProps = {
    stroke: '#777B61',
    strokeWidth: 1.25,
    fill: 'none',
  };

  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 64 40" className="w-14 h-9" aria-hidden="true">
          <rect x="6" y="6" width="32" height="22" {...strokeProps} />
          <line x1="14" y1="34" x2="30" y2="34" {...strokeProps} />
          <line x1="22" y1="28" x2="22" y2="34" {...strokeProps} />
          <circle cx="50" cy="17" r="7" stroke="#C65B36" strokeWidth="1.25" fill="none" />
          <line x1="38" y1="17" x2="43" y2="17" {...strokeProps} />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 64 40" className="w-14 h-9" aria-hidden="true">
          <rect x="10" y="5" width="44" height="9" {...strokeProps} />
          <rect x="10" y="16" width="44" height="9" {...strokeProps} />
          <rect x="10" y="27" width="44" height="9" {...strokeProps} />
          <circle cx="47" cy="9.5" r="1.8" fill="#C65B36" />
          <circle cx="47" cy="20.5" r="1.8" fill="#777B61" />
          <circle cx="47" cy="31.5" r="1.8" fill="#777B61" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 64 40" className="w-14 h-9" aria-hidden="true">
          <circle cx="12" cy="20" r="5" {...strokeProps} />
          <circle cx="32" cy="10" r="5" stroke="#C65B36" strokeWidth="1.25" fill="none" />
          <circle cx="52" cy="20" r="5" {...strokeProps} />
          <circle cx="32" cy="30" r="5" {...strokeProps} />
          <line x1="17" y1="18" x2="27" y2="12" {...strokeProps} />
          <line x1="37" y1="12" x2="47" y2="18" {...strokeProps} />
          <line x1="17" y1="22" x2="27" y2="28" {...strokeProps} />
          <line x1="37" y1="28" x2="47" y2="22" {...strokeProps} />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 64 40" className="w-14 h-9" aria-hidden="true">
          <rect x="8" y="8" width="20" height="24" {...strokeProps} />
          <rect x="34" y="8" width="22" height="10" stroke="#C65B36" strokeWidth="1.25" fill="none" />
          <rect x="34" y="22" width="22" height="10" {...strokeProps} />
          <line x1="13" y1="16" x2="23" y2="16" {...strokeProps} />
          <line x1="13" y1="22" x2="23" y2="22" {...strokeProps} />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 64 40" className="w-14 h-9" aria-hidden="true">
          <rect x="8" y="8" width="48" height="24" {...strokeProps} />
          <polyline points="8,10 32,23 56,10" stroke="#C65B36" strokeWidth="1.25" fill="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 64 40" className="w-14 h-9" aria-hidden="true">
          <rect x="24" y="13" width="16" height="14" stroke="#C65B36" strokeWidth="1.25" fill="none" />
          <line x1="8" y1="20" x2="24" y2="20" {...strokeProps} />
          <line x1="40" y1="20" x2="56" y2="20" {...strokeProps} />
          <line x1="32" y1="4" x2="32" y2="13" {...strokeProps} />
          <line x1="32" y1="27" x2="32" y2="36" {...strokeProps} />
        </svg>
      );
  }
}

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative bg-[#F1EEE5] border-b border-[#20211E]/20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12">
          <div className="lg:col-span-7">
            <p className="font-tech text-[11px] tracking-[0.2em] text-[#C65B36] uppercase mb-3">
              05 / WHAT I DO
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl leading-[0.96] tracking-tight text-[#20211E] uppercase">
              CORE CAPABILITIES
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <p className="font-display-sans text-sm leading-relaxed text-[#20211E]/75 max-w-md lg:ml-auto">
              Focused operational disciplines keeping enterprise endpoints, networks, and people
              running smoothly every day.
            </p>
          </div>
        </div>

        {/* Custom Architectural Grid with 1px Shared Hairline Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#20211E]/20 bg-[#FAF9F5]">
          {CAPABILITIES.map((cap, idx) => (
            <motion.article
              key={cap.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group p-7 sm:p-9 border-r border-b border-[#20211E]/20 flex flex-col justify-between gap-10 hover:bg-[#F1EEE5]/75 transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-editorial text-5xl sm:text-6xl leading-none text-[#20211E]/85 group-hover:text-[#C65B36] transition-colors tabular-nums">
                  {cap.number}
                </span>
                <CapabilityGlyph index={idx} />
              </div>

              <div className="space-y-3">
                <p className="font-tech text-[10px] tracking-[0.18em] text-[#777B61] uppercase">
                  {cap.number} / DISCIPLINE
                </p>
                <h3 className="font-display-sans font-bold text-lg tracking-wide text-[#20211E] uppercase">
                  {cap.title}
                </h3>
                <p className="font-display-sans text-sm leading-relaxed text-[#20211E]/80">
                  {cap.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
