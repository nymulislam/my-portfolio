import { useEffect } from "react";
import { FiX, FiExternalLink, FiPrinter, FiCopy } from "react-icons/fi";
import {
  PROFILE,
  EXPERIENCE_TIMELINE,
  CASE_STUDIES,
  RESUME_SNAPSHOT,
} from "../../data/portfolioData";

const ResumeModal = ({ isOpen, onClose, onCopyEmail }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/55 dark:bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-full max-h-[90vh] sm:max-h-[86vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[#F6EFE2] dark:bg-[#1B1917] border-t sm:border border-[#D5C7B4] dark:border-stone-800 p-5 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Action Bar */}
        <div className="sticky -top-5 sm:-top-8 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3.5 bg-[#F6EFE2]/95 dark:bg-[#1B1917]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 border-b border-[#DCD0C0] dark:border-stone-800 z-10">
          <div className="min-w-0">
            <span className="text-[11px] font-mono text-[#9A4E24] dark:text-amber-400">
              Curriculum Vitae · Executive Snapshot
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] rounded-lg border border-[#D5C7B4] dark:border-stone-700 text-xs font-mono text-[#4A3F35] dark:text-stone-300 hover:bg-[#EAE0CE] dark:hover:bg-stone-800 cursor-pointer transition-colors"
              title="Print or save as PDF"
            >
              <FiPrinter className="text-xs" />
              <span className="hidden xs:inline">Print / PDF</span>
            </button>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] rounded-lg bg-[#2B241E] text-[#F6EFE2] dark:bg-stone-100 dark:text-stone-900 text-xs font-mono hover:opacity-90 transition-opacity"
            >
              <span>Full CV</span>
              <FiExternalLink className="text-xs" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg text-[#7A6E62] hover:text-[#2B241E] dark:hover:text-white cursor-pointer"
              aria-label="Close resume preview"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* Resume Header */}
        <div className="space-y-2 border-b border-[#DCD0C0] dark:border-stone-800 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#2B241E] dark:text-stone-50">
                {PROFILE.name}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-[#9A4E24] dark:text-amber-400 mt-0.5">
                {PROFILE.role} · {PROFILE.tagline}
              </p>
            </div>
            <div className="text-xs font-mono text-[#6E6053] dark:text-stone-400 space-y-0.5 sm:text-right">
              <div>{PROFILE.location} (UTC+6)</div>
              <div>{PROFILE.phoneFormatted}</div>
            </div>
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#5C5146] dark:text-stone-400">
            <button
              onClick={onCopyEmail}
              className="hover:text-[#9A4E24] dark:hover:text-amber-400 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{PROFILE.email}</span>
              <FiCopy className="text-[11px]" />
            </button>
            <span aria-hidden="true">·</span>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/nymulislam ({PROFILE.repoCount} repos)
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/nymulislam
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9A4E24] dark:text-amber-400 hover:underline"
            >
              WhatsApp ↗
            </a>
          </div>

          <p className="pt-2 text-xs sm:text-[13.5px] text-[#4A3F35] dark:text-stone-300 leading-relaxed">
            {RESUME_SNAPSHOT.executiveSummary}
          </p>
        </div>

        {/* Core Technical Stack */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono text-[#7A6E62] dark:text-stone-400">
            Core Technical Architecture & Stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {RESUME_SNAPSHOT.skillGroups.map((group) => (
              <div
                key={group.category}
                className="p-3 rounded-xl border border-[#DCD0C0] dark:border-stone-800 bg-[#EAE0CE]/55 dark:bg-stone-900/70 space-y-1"
              >
                <div className="text-xs font-mono font-medium text-[#2B241E] dark:text-stone-200">
                  {group.category}
                </div>
                <p className="text-[11.5px] text-[#5C5146] dark:text-stone-400 leading-relaxed">
                  {group.items}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience & Education Timeline */}
        <div className="space-y-3.5">
          <h3 className="text-xs font-mono text-[#7A6E62] dark:text-stone-400">
            Experience & Foundational Training
          </h3>
          <div className="space-y-4">
            {EXPERIENCE_TIMELINE.map((exp) => (
              <div
                key={exp.id}
                className="pb-4 border-b border-[#E4D9C8] dark:border-stone-800/80 last:border-b-0 last:pb-0 space-y-1.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="font-serif text-base text-[#2B241E] dark:text-stone-100">
                    {exp.role}{" "}
                    <span className="text-xs font-sans text-[#6E6053] dark:text-stone-400">
                      · {exp.organization}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#9A4E24] dark:text-amber-400 tabular-nums shrink-0">
                    {exp.period}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#7A6E62] dark:text-stone-400">
                  {exp.stack}
                </div>
                <ul className="space-y-1 pt-0.5 text-xs sm:text-[13px] text-[#4A3F35] dark:text-stone-300 leading-relaxed list-disc list-inside">
                  {exp.highlights.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Production Systems */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-mono text-[#7A6E62] dark:text-stone-400">
            Key Production Systems
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CASE_STUDIES.map((proj) => (
              <div
                key={proj.id}
                className="p-3 rounded-xl border border-[#DCD0C0] dark:border-stone-800 bg-[#EAE0CE]/40 dark:bg-stone-900/50 space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-sm text-[#2B241E] dark:text-stone-100 hover:text-[#9A4E24] dark:hover:text-amber-400 hover:underline"
                  >
                    {proj.name} ↗
                  </a>
                  <span className="text-[10px] font-mono text-[#7A6E62] dark:text-stone-400">
                    {proj.role}
                  </span>
                </div>
                <p className="text-[11.5px] text-[#5C5146] dark:text-stone-400 leading-snug">
                  {proj.impact}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="pt-3 border-t border-[#DCD0C0] dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[#6E6053] dark:text-stone-400">
            {PROFILE.hiringStatus}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#2B241E] dark:bg-stone-100 text-[#F6EFE2] dark:text-stone-900 cursor-pointer hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
