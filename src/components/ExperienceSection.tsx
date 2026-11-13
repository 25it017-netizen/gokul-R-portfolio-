import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { EXPERIENCE_GROUPS, PROFILE } from '../data/profile';

export function ExperienceSection() {
  const [expandedCodes, setExpandedCodes] = useState<string[]>(['A', 'B']);

  const toggleGroup = (code: string) => {
    setExpandedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const allExpanded = expandedCodes.length === EXPERIENCE_GROUPS.length;

  const handleToggleAll = () => {
    if (allExpanded) {
      setExpandedCodes([]);
    } else {
      setExpandedCodes(EXPERIENCE_GROUPS.map((g) => g.code));
    }
  };

  return (
    <section id="experience" className="relative bg-[#FAF9F5] border-b border-[#20211E]/20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        {/* Editorial Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#20211E]/25">
          <div className="lg:col-span-8">
            <p className="font-tech text-[11px] tracking-[0.2em] text-[#C65B36] uppercase mb-3">
              04 / CAREER TIMELINE
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl leading-[0.96] tracking-tight text-[#20211E] uppercase">
              WHERE EXPERIENCE MEETS EXECUTION.
            </h2>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              type="button"
              onClick={handleToggleAll}
              className="px-4 py-2.5 border border-[#20211E]/30 bg-[#F1EEE5] hover:bg-[#20211E] hover:text-[#FAF9F5] transition-colors font-tech text-[11px] tracking-[0.14em] uppercase cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
            >
              {allExpanded ? 'Collapse All Modules' : 'Expand All Modules'}
            </button>
          </div>
        </div>

        {/* Career Dossier Specification Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#20211E]/20 divide-y sm:divide-y-0 sm:divide-x divide-[#20211E]/15 bg-[#F1EEE5]/60">
          <div className="p-5 sm:p-6">
            <p className="font-tech text-[10px] tracking-[0.16em] text-[#777B61] uppercase mb-1.5">
              COMPANY
            </p>
            <p className="font-display-sans font-bold text-sm text-[#20211E] uppercase tracking-wide">
              {PROFILE.company}
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="font-tech text-[10px] tracking-[0.16em] text-[#777B61] uppercase mb-1.5">
              DESIGNATION
            </p>
            <p className="font-display-sans font-bold text-sm text-[#C65B36] uppercase tracking-wide">
              {PROFILE.role}
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="font-tech text-[10px] tracking-[0.16em] text-[#777B61] uppercase mb-1.5">
              PERIOD
            </p>
            <p className="font-tech font-medium text-sm text-[#20211E] uppercase tabular-nums">
              {PROFILE.period}
            </p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="font-tech text-[10px] tracking-[0.16em] text-[#777B61] uppercase mb-1.5">
              CLIENT LOCATION
            </p>
            <p className="font-display-sans font-bold text-sm text-[#20211E] uppercase tracking-wide">
              {PROFILE.clientLocation}
            </p>
          </div>
        </div>

        {/* Expandable Responsibilities Timeline */}
        <div className="mt-8 relative">
          <div className="divide-y divide-[#20211E]/20 border-t border-b border-[#20211E]/20">
            {EXPERIENCE_GROUPS.map((group) => {
              const isOpen = expandedCodes.includes(group.code);
              const panelId = `exp-panel-${group.code}`;

              return (
                <div key={group.code} className="bg-[#FAF9F5]">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.code)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full py-6 sm:py-7 px-3 sm:px-6 flex items-center justify-between gap-6 text-left hover:bg-[#F1EEE5]/70 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C65B36]"
                  >
                    <div className="flex items-baseline sm:items-center gap-5 sm:gap-8 min-w-0">
                      <span
                        className={`font-editorial text-3xl sm:text-4xl leading-none shrink-0 transition-colors ${
                          isOpen ? 'text-[#C65B36]' : 'text-[#777B61]'
                        }`}
                      >
                        {group.code}.
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display-sans font-bold text-base sm:text-lg tracking-wide text-[#20211E] uppercase">
                          {group.title}
                        </h3>
                        <p className="font-tech text-[11px] text-[#777B61] mt-1">
                          {group.focus} · {String(group.items.length).padStart(2, '0')} Responsibilities
                        </p>
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`w-9 h-9 flex items-center justify-center border shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#20211E] text-[#FAF9F5] border-[#20211E]'
                          : 'bg-transparent text-[#20211E] border-[#20211E]/25'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 sm:px-6 pb-8 pt-2 lg:pl-[4.75rem]">
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 border-t border-[#20211E]/12 pt-5">
                            {group.items.map((item, idx) => (
                              <li
                                key={item}
                                className="flex items-baseline gap-3 text-sm sm:text-[15px] text-[#20211E]/90 leading-relaxed"
                              >
                                <span className="font-tech text-[11px] text-[#C65B36] tabular-nums shrink-0">
                                  {group.code}.{idx + 1}
                                </span>
                                <span className="font-display-sans">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
