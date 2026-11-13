import { motion } from 'motion/react';
import { EDUCATION } from '../data/profile';

export function EducationSection() {
  return (
    <section id="education" className="relative bg-[#FAF9F5] border-b border-[#20211E]/20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Header */}
          <div className="lg:col-span-4">
            <p className="font-tech text-[11px] tracking-[0.2em] text-[#C65B36] uppercase mb-3">
              06 / ACADEMIC BACKGROUND
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl leading-[0.98] tracking-tight text-[#20211E] uppercase">
              EDUCATION
            </h2>
            <p className="mt-4 font-display-sans text-sm leading-relaxed text-[#20211E]/75 max-w-xs">
              Foundational computer application studies forming the technical base for enterprise IT
              operations.
            </p>
          </div>

          {/* Right Minimal Academic Timeline */}
          <div className="lg:col-span-8">
            <div className="relative border-t border-[#20211E]/20 divide-y divide-[#20211E]/20">
              {EDUCATION.map((item, idx) => (
                <motion.article
                  key={item.shortCode}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-12 gap-5 items-baseline"
                >
                  <div className="sm:col-span-3 flex items-center gap-3">
                    <span className="font-tech text-xs tracking-[0.16em] text-[#C65B36] uppercase">
                      DEGREE {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true" className="h-[1px] flex-1 bg-[#20211E]/15 sm:hidden" />
                  </div>

                  <div className="sm:col-span-9 space-y-2.5">
                    <h3 className="font-editorial text-2xl sm:text-3xl leading-tight text-[#20211E] uppercase">
                      {item.degree}
                    </h3>
                    <p className="font-display-sans font-medium text-base text-[#20211E]/90">
                      {item.institution}
                    </p>
                    <p className="font-tech text-xs tracking-[0.06em] text-[#777B61]">
                      {item.university}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
