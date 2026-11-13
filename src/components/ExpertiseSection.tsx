import { useState } from 'react';
import { motion } from 'motion/react';
import { EXPERTISE_CATEGORIES } from '../data/profile';

export function ExpertiseSection() {
  const [activeId, setActiveId] = useState<string>('os');
  const [filterId, setFilterId] = useState<string>('all');

  const visibleCategories =
    filterId === 'all'
      ? EXPERTISE_CATEGORIES
      : EXPERTISE_CATEGORIES.filter((cat) => cat.id === filterId);

  return (
    <section
      id="expertise"
      className="relative bg-[#F1EEE5] border-b border-[#20211E]/20 journal-grid-bg"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        {/* Section Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-[#20211E]/25">
          <div className="lg:col-span-7">
            <p className="font-tech text-[11px] tracking-[0.2em] text-[#C65B36] uppercase mb-3">
              03 / TECHNICAL INDEX
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl leading-[0.96] tracking-tight text-[#20211E] uppercase">
              TECHNICAL EXPERTISE
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col lg:items-end gap-4">
            <p className="font-display-sans text-sm leading-relaxed text-[#20211E]/75 lg:text-right max-w-md">
              Nine operational domains spanning Windows infrastructure, directory administration,
              asset lifecycle governance, endpoint patching, and enterprise connectivity.
            </p>
          </div>
        </div>

        {/* Interactive Category Quick-Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter technical expertise categories"
          className="py-4 sm:py-5 border-b border-[#20211E]/15 flex flex-wrap items-center gap-1.5 sm:gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filterId === 'all'}
            onClick={() => setFilterId('all')}
            className={`px-2.5 sm:px-3 py-2 font-tech text-[10px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.14em] uppercase border transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36] ${
              filterId === 'all'
                ? 'bg-[#20211E] text-[#FAF9F5] border-[#20211E]'
                : 'bg-[#FAF9F5] text-[#20211E]/75 border-[#20211E]/20 hover:border-[#20211E]'
            }`}
          >
            ALL CATEGORIES (09)
          </button>
          {EXPERTISE_CATEGORIES.map((cat) => {
            const isSelected = filterId === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setFilterId(cat.id);
                  setActiveId(cat.id);
                }}
                className={`px-2.5 sm:px-3 py-2 font-tech text-[10px] sm:text-[11px] tracking-[0.08em] sm:tracking-[0.12em] uppercase border transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36] ${
                  isSelected
                    ? 'bg-[#C65B36] text-[#FAF9F5] border-[#C65B36]'
                    : 'bg-transparent text-[#20211E]/70 border-[#20211E]/15 hover:border-[#20211E] hover:text-[#20211E]'
                }`}
              >
                {cat.number} · {cat.title}
              </button>
            );
          })}
        </div>

        {/* Interactive Technical Directory Rows */}
        <div className="divide-y divide-[#20211E]/20 border-b border-[#20211E]/20">
          {visibleCategories.map((category) => {
            const isActive = activeId === category.id || filterId === category.id;
            return (
              <motion.article
                key={category.id}
                onMouseEnter={() => setActiveId(category.id)}
                onFocus={() => setActiveId(category.id)}
                onClick={() => setActiveId(category.id)}
                tabIndex={0}
                aria-expanded={isActive}
                className={`group py-7 sm:py-8 px-3 sm:px-6 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#C65B36] ${
                  isActive ? 'bg-[#FAF9F5]' : 'bg-transparent hover:bg-[#FAF9F5]/65'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Category Number & Title */}
                  <div className="lg:col-span-4 flex items-start gap-5">
                    <motion.span
                      animate={{
                        x: isActive ? 4 : 0,
                        color: isActive ? '#C65B36' : '#777B61',
                      }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="font-editorial text-4xl sm:text-5xl leading-none tabular-nums select-none shrink-0"
                    >
                      {category.number}
                    </motion.span>

                    <div className="pt-1">
                      <p className="font-tech text-[10px] tracking-[0.16em] text-[#777B61] uppercase mb-1">
                        CATEGORY {category.number}
                      </p>
                      <h3 className="font-display-sans font-bold text-base sm:text-lg tracking-wide text-[#20211E] uppercase">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Interactive Hover/Focus Description + Skills Grid */}
                  <div className="lg:col-span-8 flex flex-col gap-5">
                    {/* Smoothly Revealed Operational Summary */}
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        isActive ? 'opacity-100 max-h-24' : 'opacity-70 max-h-24 lg:opacity-65'
                      }`}
                    >
                      <p className="font-display-sans text-sm leading-relaxed text-[#20211E]/80">
                        {category.description}
                      </p>
                    </div>

                    {/* Clean Unboxed Typographic Skill Cells (Zero Pills, Zero Percentages) */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2.5 pt-2 border-t border-[#20211E]/12">
                      {category.skills.map((skill, idx) => (
                        <li
                          key={skill}
                          className={`flex items-baseline gap-2.5 py-1 text-sm transition-colors duration-150 ${
                            isActive ? 'text-[#20211E]' : 'text-[#20211E]/75'
                          }`}
                        >
                          <span
                            className={`font-tech text-[10px] tabular-nums shrink-0 ${
                              isActive ? 'text-[#C65B36]' : 'text-[#A5A49B]'
                            }`}
                          >
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="font-display-sans font-medium leading-snug">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
