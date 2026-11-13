import { motion } from 'motion/react';
import { ABOUT_CONTENT, PROFILE } from '../data/profile';

const MARQUEE_ITEMS = [
  'SYSTEM ADMINISTRATION',
  'IT ASSET MANAGEMENT',
  'WINDOWS SERVER MAINTENANCE',
  'ACTIVE DIRECTORY',
  'ENDPOINT CENTRAL',
  'MICROSOFT 365 SUPPORT',
  'NETWORK TROUBLESHOOTING',
  'LICENSE COMPLIANCE',
];

export function AboutSection() {
  return (
    <section id="about" className="relative bg-[#FAF9F5] border-b border-[#20211E]/20">
      {/* Subtle Horizontal Editorial Ticker Divider */}
      <div
        className="border-b border-[#20211E]/15 bg-[#F1EEE5] py-3 overflow-hidden select-none"
        aria-hidden="true"
      >
        <div className="animate-editorial-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-6 pr-6">
              {MARQUEE_ITEMS.map((item) => (
                <div key={`${dup}-${item}`} className="flex items-center gap-6 whitespace-nowrap">
                  <span className="font-tech text-[11px] tracking-[0.2em] text-[#777B61]">
                    {item}
                  </span>
                  <span className="text-[#C65B36] text-xs">·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Asymmetric Magazine Spread */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Oversized Editorial Title + Technical Ledger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between gap-10"
          >
            <div>
              <p className="font-tech text-[11px] tracking-[0.2em] text-[#C65B36] uppercase mb-4">
                02 / EDITORIAL PROFILE
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl leading-[0.98] tracking-tight text-[#20211E] uppercase">
                {ABOUT_CONTENT.heading}
              </h2>
            </div>

            {/* Technical Information Ledger */}
            <dl className="border-t border-[#20211E]/20 divide-y divide-[#20211E]/12 text-xs">
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="font-tech tracking-[0.14em] text-[#777B61] uppercase shrink-0">
                  Role
                </dt>
                <dd className="font-display-sans font-medium text-[#20211E] text-right">
                  {PROFILE.role}
                </dd>
              </div>
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="font-tech tracking-[0.14em] text-[#777B61] uppercase shrink-0">
                  Organization
                </dt>
                <dd className="font-display-sans font-medium text-[#20211E] text-right">
                  {PROFILE.company}
                </dd>
              </div>
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="font-tech tracking-[0.14em] text-[#777B61] uppercase shrink-0">
                  Client Site
                </dt>
                <dd className="font-display-sans font-medium text-[#20211E] text-right">
                  {PROFILE.clientLocation}
                </dd>
              </div>
              <div className="py-3.5 flex items-baseline justify-between gap-4">
                <dt className="font-tech tracking-[0.14em] text-[#777B61] uppercase shrink-0">
                  Experience
                </dt>
                <dd className="font-tech font-medium text-[#C65B36] text-right tabular-nums">
                  {PROFILE.experienceFullText} ({PROFILE.period})
                </dd>
              </div>
            </dl>
          </motion.div>

          {/* Right Column: Narrow Reading Columns + Summary Statement */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 lg:col-start-7 flex flex-col gap-10"
          >
            <div className="space-y-6 max-w-prose">
              {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`font-display-sans text-base sm:text-[17px] leading-[1.75] text-[#20211E]/90 ${
                    index === 0
                      ? 'first-letter:font-editorial first-letter:text-6xl first-letter:leading-[0.82] first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:text-[#C65B36]'
                      : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Editorial Summary Pull Statement (Hairline Top/Bottom, No Left Border Cliché) */}
            <div className="border-t border-b border-[#20211E]/25 py-7 my-2">
              <p className="font-tech text-[10px] tracking-[0.2em] text-[#777B61] uppercase mb-3">
                EXECUTIVE SUMMARY
              </p>
              <p className="font-editorial italic text-xl sm:text-2xl leading-[1.38] text-[#20211E]">
                “{PROFILE.summary}”
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
