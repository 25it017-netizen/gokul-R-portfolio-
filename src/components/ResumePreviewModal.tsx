import { useEffect } from 'react';
import { ArrowDownToLine, X } from 'lucide-react';
import { PROFILE, RESUME_FILENAME, RESUME_PDF_PATH } from '../data/profile';
import { downloadVerifiedResumePdf } from '../utils/resumeDownload';

interface ResumePreviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumePreviewModal({ open, onClose }: ResumePreviewModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Resume PDF Preview"
      className="fixed inset-0 z-[70] bg-[#20211E]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl h-[88vh] bg-[#FAF9F5] border border-[#20211E] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 border-b border-[#20211E]/20 flex items-center justify-between gap-4 bg-[#F1EEE5]">
          <div className="min-w-0">
            <p className="font-tech text-[10px] tracking-[0.16em] text-[#777B61] uppercase">
              DOCUMENT PREVIEW
            </p>
            <p className="font-editorial text-xl text-[#20211E] truncate">
              {PROFILE.fullName} — Resume
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={RESUME_PDF_PATH}
              download={RESUME_FILENAME}
              onClick={(e) => {
                e.preventDefault();
                void downloadVerifiedResumePdf();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C65B36] text-[#FAF9F5] hover:bg-[#20211E] transition-colors font-tech text-[11px] tracking-[0.12em] uppercase whitespace-nowrap"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume preview"
              className="w-9 h-9 inline-flex items-center justify-center border border-[#20211E]/25 text-[#20211E] hover:bg-[#20211E] hover:text-[#FAF9F5] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#20211E]/5 overflow-hidden">
          <iframe
            src={`${RESUME_PDF_PATH}?inline=1`}
            title="Gokula Kannan R Resume PDF"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
