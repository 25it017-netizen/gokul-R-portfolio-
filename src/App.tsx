import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ContactSection } from './components/ContactSection';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { ResumePreviewModal } from './components/ResumePreviewModal';
import { NAV_ITEMS } from './data/profile';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [resumePreviewOpen, setResumePreviewOpen] = useState<boolean>(false);

  const handleNavigate = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 60;
    const elementTop = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = id === 'home' ? 0 : Math.max(0, elementTop - headerOffset);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F1EEE5] text-[#20211E]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#20211E] focus:text-[#FAF9F5] focus:font-tech focus:text-xs"
        >
          Skip to main content
        </a>

        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

        <main id="main-content">
          <HeroSection
            activeSection={activeSection}
            onNavigate={handleNavigate}
            onPreviewResume={() => setResumePreviewOpen(true)}
          />
          <AboutSection />
          <ExpertiseSection />
          <ExperienceSection />
          <CapabilitiesSection />
          <EducationSection />
        </main>

        <ContactSection
          onNavigate={handleNavigate}
          onPreviewResume={() => setResumePreviewOpen(true)}
        />

        <ResumePreviewModal
          open={resumePreviewOpen}
          onClose={() => setResumePreviewOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
