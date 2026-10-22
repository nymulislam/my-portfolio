import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiX,
  FiDownload,
  FiPrinter,
  FiCheck,
  FiCopy,
  FiEye,
  FiArrowLeft,
} from "react-icons/fi";
import Tooltip from "./Tooltip";
import {
  PROFILE,
  EXPERIENCE_TIMELINE,
  CASE_STUDIES,
  RESUME_SNAPSHOT,
  EDUCATION_CREDENTIALS,
} from "../../data/portfolioData";
import { downloadResumePdf, printResumePdf } from "../../utils/generateResumePdf";

/**
 * Clean 1-Page A4 Paper Sheet Component
 * Used both for the interactive A4 Paper Preview inside the modal
 * and for the dedicated #a4-print-root portal during window.print().
 */
const A4PaperSheet = ({ isPrintPortal = false }) => {
  const engineeringExperience = EXPERIENCE_TIMELINE.filter(
    (exp) => exp.id !== "exp-education"
  );
  const topProjects = CASE_STUDIES.filter((p) => p.cvSelected);

  return (
    <div
      className={
        isPrintPortal
          ? "a4-sheet-print bg-white text-[#1E1A17] font-sans"
          : "w-full max-w-[760px] mx-auto bg-[#FCFBF8] text-[#1E1A17] rounded-xl border border-[#D4C7B4] shadow-xl p-6 sm:p-9 font-sans space-y-3.5"
      }
    >
      {/* 1. HEADER */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-xl sm:text-[22px] font-bold tracking-tight uppercase text-[#1E1A17]">
            {PROFILE.name}
          </h1>
          <span className="text-[11.5px] text-[#5C4E41]">
            {PROFILE.location} (UTC+6)
          </span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-[12.5px] font-bold text-[#9A4E24]">
            {PROFILE.role} | {PROFILE.tagline}
          </div>
          <a
            href={PROFILE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11.5px] text-[#4A3E33] hover:text-[#9A4E24] hover:underline"
          >
            WhatsApp: {PROFILE.phoneFormatted}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] text-[#332B24] pt-0.5">
          <a
            href={`mailto:${PROFILE.email}`}
            className="hover:text-[#9A4E24] hover:underline"
          >
            {PROFILE.email}
          </a>
          <span className="text-[#9E8F7E]">|</span>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#9A4E24] hover:underline"
          >
            GitHub ({PROFILE.repoCount} Repos, {PROFILE.orgCount} Orgs) ↗
          </a>
          <span className="text-[#9E8F7E]">|</span>
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#9A4E24] hover:underline"
          >
            LinkedIn Profile ↗
          </a>
          <span className="text-[#9E8F7E]">|</span>
          <a
            href="https://learnhikmah.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9A4E24] hover:underline"
          >
            LearnHikmah Live ↗
          </a>
          <span className="text-[#9E8F7E]">|</span>
          <a
            href="https://an-nujum-foundation.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9A4E24] hover:underline"
          >
            An-Nujum Foundation Live ↗
          </a>
        </div>
      </div>

      {/* 2. PROFESSIONAL SUMMARY */}
      <div className="border-t border-[#D5C8B8] pt-2.5 space-y-1">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#9A4E24]">
          Professional Summary
        </h2>
        <p className="text-[12px] leading-[1.48] text-[#2B241E]">
          {RESUME_SNAPSHOT.executiveSummary}
        </p>
      </div>

      {/* 3. CORE TECHNICAL STACK */}
      <div className="border-t border-[#D5C8B8] pt-2.5 space-y-1">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#9A4E24]">
          Core Technical Stack
        </h2>
        <div className="space-y-0.5 text-[11.8px] leading-[1.45]">
          {RESUME_SNAPSHOT.skillGroups.map((group) => (
            <div
              key={group.category}
              className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-2"
            >
              <span className="sm:col-span-3 font-bold text-[#1E1A17]">
                {group.category}:
              </span>
              <span className="sm:col-span-9 text-[#332B24]">{group.items}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PROFESSIONAL EXPERIENCE */}
      <div className="border-t border-[#D5C8B8] pt-2.5 space-y-2">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#9A4E24]">
          Professional Experience
        </h2>
        <div className="space-y-2.5">
          {engineeringExperience.map((exp) => (
            <div key={exp.id} className="space-y-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div className="text-[12.2px] font-bold text-[#1E1A17]">
                  {exp.role} — {exp.organization} ({exp.location})
                </div>
                <span className="text-[11px] font-bold text-[#9A4E24]">
                  {exp.period}
                </span>
              </div>
              <div className="text-[11px] text-[#5C4E41]">Stack: {exp.stack}</div>
              <ul className="list-disc list-inside space-y-0.5 text-[11.5px] leading-[1.42] text-[#2B241E]">
                {exp.highlights.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 5. SELECTED PRODUCTION SYSTEMS */}
      <div className="border-t border-[#D5C8B8] pt-2.5 space-y-1.5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#9A4E24]">
          Selected Production Systems
        </h2>
        <div className="space-y-2">
          {topProjects.map((proj) => (
            <div key={proj.id} className="space-y-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="text-[11.8px] font-bold text-[#1E1A17]">
                  {proj.name} | {proj.role} | {proj.stack}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9A4E24] hover:underline"
                  >
                    {proj.id === "balzo-financial" ? "GitHub Org ↗" : "Live Site ↗"}
                  </a>
                  {proj.repoUrl && (
                    <>
                      <span className="text-[#B8A896]">|</span>
                      <a
                        href={proj.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4A3E33] hover:text-[#9A4E24] hover:underline"
                      >
                        Source Code ↗
                      </a>
                    </>
                  )}
                </div>
              </div>
              <p className="text-[11.4px] leading-[1.4] text-[#332B24]">
                {proj.shortSummary} Outcome: {proj.impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. EDUCATION & CREDENTIALS */}
      <div className="border-t border-[#D5C8B8] pt-2.5 space-y-1.5">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#9A4E24]">
          Education & Credentials
        </h2>
        <div className="space-y-1.5">
          {EDUCATION_CREDENTIALS.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-[11.8px] font-bold text-[#1E1A17]">
                  {edu.degree}
                </span>
                <span className="text-[11px] font-bold text-[#9A4E24]">
                  {edu.year}
                </span>
              </div>
              <div className="text-[11.2px] text-[#3F352C]">
                {edu.institution} | {edu.board}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. FOOTER */}
      <div className="border-t border-[#D5C8B8] pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#5C4E41]">
        <span>{PROFILE.hiringStatus}</span>
        <div className="flex items-center gap-2 font-semibold text-[#9A4E24]">
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <span className="text-[#B8A896]">|</span>
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <span className="text-[#B8A896]">|</span>
          <a href={`mailto:${PROFILE.email}`} className="hover:underline">
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

const ResumeModal = ({ isOpen, onClose, onCopyEmail, onDownloadPdf }) => {
  // viewMode: "web" (interactive modal overview) or "a4-preview" (exact A4 sheet preview before print/download)
  const [viewMode, setViewMode] = useState("web");
  // actionIntent tracks whether the user clicked Print A4 or Download PDF to open the A4 preview
  const [actionIntent, setActionIntent] = useState("download");
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setViewMode("web");
    }
  }, [isOpen]);

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

  // Step 1: Clicking "Print A4" or "Download CV (PDF)" in Web View shows the A4 Paper Preview first
  const handleOpenA4PreviewFor = (intent) => {
    setActionIntent(intent);
    setViewMode("a4-preview");
  };

  // Step 2A: Confirming Download inside A4 Preview saves Naymul_Islam_Resume.pdf
  const handleConfirmDownloadPdf = () => {
    downloadResumePdf();
    setDownloaded(true);
    if (onDownloadPdf) {
      onDownloadPdf();
    }
    setTimeout(() => setDownloaded(false), 2500);
  };

  // Step 2B: Confirming Print inside A4 Preview triggers the clean A4 print portal
  const handleConfirmPrintA4 = () => {
    printResumePdf();
  };

  const engineeringExperience = EXPERIENCE_TIMELINE.filter(
    (exp) => exp.id !== "exp-education"
  );

  return (
    <>
      {/* Dedicated Print Portal mounted in document.body so window.print() always outputs a 1-page A4 CV */}
      {typeof document !== "undefined" &&
        createPortal(
          <div id="a4-print-root" aria-hidden="true">
            <A4PaperSheet isPrintPortal={true} />
          </div>,
          document.body
        )}

      <div
        className="no-print fixed inset-0 z-50 bg-stone-950/60 dark:bg-black/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}
      >
        <div
          className="max-w-4xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[#F6EFE2] dark:bg-[#1B1917] border-t sm:border border-[#D5C7B4] dark:border-stone-800 p-4 sm:p-7 shadow-2xl space-y-5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sticky Top Action Bar */}
          <div className="sticky -top-4 sm:-top-7 -mx-4 sm:-mx-7 px-4 sm:px-7 py-3.5 bg-[#F6EFE2]/95 dark:bg-[#1B1917]/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 border-b border-[#DCD0C0] dark:border-stone-800 z-10">
            <div className="flex items-center gap-2 min-w-0">
              {viewMode === "a4-preview" ? (
                <button
                  onClick={() => setViewMode("web")}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#CBBBA4] dark:border-stone-700 bg-[#EAE0CE]/70 dark:bg-stone-800 text-xs font-mono text-[#231D18] dark:text-stone-200 hover:border-[#9A4E24] cursor-pointer"
                >
                  <FiArrowLeft className="text-xs text-[#9A4E24] dark:text-amber-400" />
                  <span>Back to Overview</span>
                </button>
              ) : (
                <span className="text-[11.5px] font-mono font-medium text-[#9A4E24] dark:text-amber-400">
                  Curriculum Vitae · Single Source of Truth
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {viewMode === "web" ? (
                <>
                  {/* In Web View: Both buttons open the A4 Paper Preview first (with distinct labels) */}
                  <Tooltip content="Preview A4 sheet & Print" position="bottom" align="right">
                    <button
                      onClick={() => handleOpenA4PreviewFor("print")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] rounded-lg border border-[#CBBBA4] dark:border-stone-700 bg-[#EAE0CE]/70 dark:bg-stone-800/80 text-xs font-mono font-medium text-[#231D18] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 cursor-pointer transition-colors"
                    >
                      <FiPrinter className="text-xs text-[#9A4E24] dark:text-amber-400" />
                      <span>Print A4</span>
                    </button>
                  </Tooltip>

                  <Tooltip content="Preview A4 sheet & Download PDF" position="bottom" align="right">
                    <button
                      onClick={() => handleOpenA4PreviewFor("download")}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[34px] rounded-lg bg-[#231D18] text-[#F6EFE2] dark:bg-stone-100 dark:text-stone-900 text-xs font-mono font-medium hover:opacity-90 cursor-pointer transition-opacity"
                    >
                      <FiEye className="text-xs" />
                      <span>Download CV (PDF)</span>
                    </button>
                  </Tooltip>
                </>
              ) : (
                <>
                  {/* In A4 Paper Preview: Both Print and Download actions are directly available */}
                  <button
                    onClick={handleConfirmPrintA4}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[34px] rounded-lg text-xs font-mono font-medium cursor-pointer transition-all ${
                      actionIntent === "print"
                        ? "bg-[#9A4E24] text-white shadow-xs hover:opacity-95"
                        : "border border-[#CBBBA4] dark:border-stone-700 bg-[#EAE0CE]/80 dark:bg-stone-800 text-[#231D18] dark:text-stone-200 hover:border-[#9A4E24]"
                    }`}
                  >
                    <FiPrinter className="text-xs" />
                    <span>Print A4 Now</span>
                  </button>

                  <button
                    onClick={handleConfirmDownloadPdf}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[34px] rounded-lg text-xs font-mono font-medium cursor-pointer transition-all ${
                      actionIntent === "download"
                        ? "bg-[#231D18] text-[#F6EFE2] dark:bg-stone-100 dark:text-stone-900 shadow-xs hover:opacity-90"
                        : "border border-[#CBBBA4] dark:border-stone-700 bg-[#EAE0CE]/80 dark:bg-stone-800 text-[#231D18] dark:text-stone-200 hover:border-[#9A4E24]"
                    }`}
                  >
                    {downloaded ? (
                      <>
                        <FiCheck className="text-xs text-emerald-400 dark:text-emerald-600" />
                        <span>PDF Downloaded</span>
                      </>
                    ) : (
                      <>
                        <FiDownload className="text-xs" />
                        <span>Save PDF File</span>
                      </>
                    )}
                  </button>
                </>
              )}

              <button
                onClick={onClose}
                className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg text-[#5C4E41] hover:text-[#231D18] dark:hover:text-white cursor-pointer"
                aria-label="Close resume preview"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          </div>

          {/* Conditional Body: Interactive A4 Paper Preview vs Web Overview */}
          {viewMode === "a4-preview" ? (
            <div className="space-y-4">
              {/* Helpful Preview Banner */}
              <div className="rounded-xl border border-[#D5C7B4] dark:border-stone-800 bg-[#EAE0CE]/65 dark:bg-stone-900/80 px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#332B24] dark:text-stone-200">
                  A4 Paper Preview (100% ATS-Friendly · Clickable Hyperlinks · Zero Overlap)
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleConfirmPrintA4}
                    className="text-[#9A4E24] dark:text-amber-400 font-medium hover:underline cursor-pointer"
                  >
                    Print A4 Sheet ↗
                  </button>
                  <span className="text-[#B8A48C]">·</span>
                  <button
                    onClick={handleConfirmDownloadPdf}
                    className="text-[#231D18] dark:text-stone-100 font-medium hover:underline cursor-pointer"
                  >
                    Save PDF File ↓
                  </button>
                </div>
              </div>

              {/* Exact 1-Page A4 Paper Sheet */}
              <A4PaperSheet isPrintPortal={false} />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Resume Header */}
              <div className="space-y-2.5 border-b border-[#DCD0C0] dark:border-stone-800 pb-5">
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
                    className="text-[#9A4E24] dark:text-amber-400 hover:underline"
                  >
                    GitHub ({PROFILE.repoCount} Repos · {PROFILE.orgCount} Orgs) ↗
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn Profile ↗
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

                <p className="pt-2 text-xs sm:text-[13.5px] text-[#3F352C] dark:text-stone-300 leading-relaxed">
                  {RESUME_SNAPSHOT.executiveSummary}
                </p>
              </div>

              {/* Core Technical Stack */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9A4E24] dark:text-amber-400 font-medium">
                  Core Technical Stack
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

              {/* Professional Experience */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9A4E24] dark:text-amber-400 font-medium">
                  Professional Experience
                </h3>
                <div className="space-y-4">
                  {engineeringExperience.map((exp) => (
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
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9A4E24] dark:text-amber-400 font-medium">
                  Selected Production Systems
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CASE_STUDIES.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3 rounded-xl border border-[#DCD0C0] dark:border-stone-800 bg-[#EAE0CE]/40 dark:bg-stone-900/50 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif text-sm text-[#2B241E] dark:text-stone-100 truncate">
                          {proj.name}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] font-mono shrink-0">
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#9A4E24] dark:text-amber-400 hover:underline"
                          >
                            {proj.liveLabel || "Live Site ↗"}
                          </a>
                          {proj.repoUrl && (
                            <a
                              href={proj.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#5C5146] dark:text-stone-400 hover:underline"
                            >
                              Source Code ↗
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="text-[10.5px] font-mono text-[#9A4E24] dark:text-amber-400/90">
                        {proj.role} · {proj.stack}
                      </div>
                      <p className="text-[11.5px] text-[#5C5146] dark:text-stone-400 leading-snug">
                        {proj.shortSummary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Credentials */}
              <div className="space-y-2.5 border-t border-[#DCD0C0] dark:border-stone-800 pt-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#9A4E24] dark:text-amber-400 font-medium">
                  Education & Credentials
                </h3>
                <div className="space-y-2.5">
                  {EDUCATION_CREDENTIALS.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-3 rounded-xl border border-[#DCD0C0] dark:border-stone-800 bg-[#EAE0CE]/35 dark:bg-stone-900/45 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                    >
                      <div className="space-y-0.5">
                        <div className="font-serif text-sm sm:text-[15px] text-[#2B241E] dark:text-stone-100">
                          {edu.degree}
                        </div>
                        <div className="text-[11.5px] text-[#5C5146] dark:text-stone-400">
                          {edu.institution} ·{" "}
                          <span className="font-mono text-[11px]">{edu.board}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 shrink-0">
                        {edu.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Bar */}
          <div className="pt-3 border-t border-[#DCD0C0] dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-[#6E6053] dark:text-stone-400">
              {PROFILE.hiringStatus}
            </span>
            <div className="flex items-center gap-2">
              {viewMode === "web" && (
                <button
                  onClick={() => handleOpenA4PreviewFor("download")}
                  className="px-3.5 py-2 rounded-lg border border-[#CBBBA4] dark:border-stone-700 text-[#2B241E] dark:text-stone-200 cursor-pointer hover:border-[#9A4E24]"
                >
                  Open A4 Preview
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#2B241E] dark:bg-stone-100 text-[#F6EFE2] dark:text-stone-900 cursor-pointer hover:opacity-90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeModal;
