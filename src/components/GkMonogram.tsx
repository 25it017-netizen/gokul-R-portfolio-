import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function GkMonogram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const yShift = useTransform(scrollYProgress, [0, 1], [-12, 18]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[340px] lg:max-w-[360px] mx-auto lg:mx-0">
      <motion.div
        style={{ y: yShift }}
        className="relative bg-[#FAF9F5] border border-[#20211E]/20 p-4 sm:p-7"
      >
        {/* Corner Registration Crosshairs */}
        <span
          aria-hidden="true"
          className="absolute -top-2 -left-2 font-tech text-[11px] text-[#777B61] leading-none select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -top-2 -right-2 font-tech text-[11px] text-[#777B61] leading-none select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-2 -left-2 font-tech text-[11px] text-[#777B61] leading-none select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute -bottom-2 -right-2 font-tech text-[11px] text-[#777B61] leading-none select-none"
        >
          +
        </span>

        {/* Top plate metadata */}
        <div className="flex items-center justify-between border-b border-[#20211E]/15 pb-3 mb-5 font-tech text-[10px] tracking-[0.16em] text-[#777B61]">
          <span>PORTRAIT PLATE</span>
          <span className="tabular-nums">FIG. 01</span>
        </div>

        {/* Cropped Editorial Portrait */}
        <div className="relative aspect-[4/5] w-full border border-[#20211E]/15 bg-[#F1EEE5] overflow-hidden">
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-11-13_at_7.57.39_PM_1df79a64.jpeg"
            alt="Portrait of Gokula Kannan R, L1 IT Support Engineer"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[46%_21%] scale-[1.22] origin-[46%_12%] contrast-[1.03] saturate-[0.94] select-none"
          />
        </div>

        {/* Bottom plate caption */}
        <div className="mt-4 pt-3 border-t border-[#20211E]/15 flex items-center justify-between font-tech text-[10px] tracking-[0.12em] text-[#20211E]/75">
          <span>IT INFRASTRUCTURE</span>
          <span className="text-[#C65B36]">GOKULA KANNAN R</span>
        </div>
      </motion.div>
    </div>
  );
}
