import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowDownToLine, Menu, X } from 'lucide-react';
import { NAV_ITEMS, PROFILE, RESUME_FILENAME, RESUME_PDF_PATH } from '../data/profile';
import { downloadVerifiedResumePdf } from '../utils/resumeDownload';

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#F1EEE5]/95 backdrop-blur-sm border-b border-[#20211E]/15'
          : 'bg-[#F1EEE5]/80 backdrop-blur-[2px] border-b border-[#20211E]/10'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-14 sm:h-15 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-editorial text-xl sm:text-2xl tracking-tight text-[#20211E] hover:text-[#C65B36] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C65B36]"
        >
          {PROFILE.fullName}
        </a>

        {/* Zone 2: Clean single-line editorial navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7"
        >
          {NAV_ITEMS.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <div key={item.id} className="flex items-center gap-5 xl:gap-7">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative py-1 font-tech text-[11px] tracking-[0.14em] whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C65B36] ${
                    isActive
                      ? 'text-[#C65B36] font-medium'
                      : 'text-[#20211E]/75 hover:text-[#20211E]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#C65B36]"
                    />
                  )}
                </a>
                {idx < NAV_ITEMS.length - 1 && (
                  <span aria-hidden="true" className="text-[#A5A49B]/60 text-[10px] select-none">
                    /
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={RESUME_PDF_PATH}
            download={RESUME_FILENAME}
            onClick={(e) => {
              e.preventDefault();
              void downloadVerifiedResumePdf();
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-[#20211E] bg-[#20211E] text-[#FAF9F5] hover:bg-[#C65B36] hover:border-[#C65B36] transition-colors font-tech text-[11px] tracking-[0.12em] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
          >
            <ArrowDownToLine className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Resume PDF</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-editorial-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-[#20211E]/25 bg-[#FAF9F5] text-[#20211E] hover:border-[#20211E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C65B36]"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Scroll depth hairline */}
      <motion.div
        style={{ scaleX }}
        className="h-[1.5px] bg-[#C65B36] origin-left w-full"
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-editorial-menu"
          className="lg:hidden border-t border-[#20211E]/15 bg-[#FAF9F5] px-4 sm:px-5 py-5 max-h-[calc(100svh-3.75rem)] overflow-y-auto"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-[#20211E]/10">
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className="py-3.5 flex items-center justify-between text-sm font-tech tracking-[0.14em] text-[#20211E] hover:text-[#C65B36] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[11px] text-[#777B61]">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className={isActive ? 'text-[#C65B36] font-medium' : ''}>
                      {item.label}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-xs text-[#A5A49B]">
                    →
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="pt-5 mt-2 border-t border-[#20211E]/15">
            <a
              href={RESUME_PDF_PATH}
              download={RESUME_FILENAME}
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                void downloadVerifiedResumePdf();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#20211E] text-[#FAF9F5] hover:bg-[#C65B36] transition-colors font-tech text-xs tracking-[0.14em] uppercase"
            >
              <ArrowDownToLine className="w-4 h-4" aria-hidden="true" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
