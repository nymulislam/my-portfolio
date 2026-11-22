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
import ModalShell from "./ModalShell";
import Tooltip from "./Tooltip";
import {
  PROFILE,
  EXPERIENCE_TIMELINE,
  CASE_STUDIES,
  RESUME_SNAPSHOT,
  EDUCATION_CREDENTIALS,
} from "../../data/portfolioData";
import { downloadResumePdf, printResumePdf } from "../../utils/generateResumePdf";

const ENGINEERING_EXP = EXPERIENCE_TIMELINE.filter((e) => e.id !== "exp-education");
const TOP_PROJECTS = CASE_STUDIES.filter((p) => p.cvSelected);

const A4Section = ({ title, children }) => (
  <div className="border-t border-[#D5C8B8] pt-2.5 space-y-1.5">
    <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#9A4E24]">{title}</h2>
    {children}
  </div>
);

const WebSection = ({ title, bordered = false, children }) => (
  <div className={`space-y-2.5 ${bordered ? "border-t border-[#DCD0C0] dark:border-stone-800 pt-4" : ""}`}>
    <h3 className="text-xs font-mono uppercase tracking-wider text-[#9A4E24] dark:text-amber-400 font-medium">
      {title}
    </h3>
    {children}
  </div>
);

const A4PaperSheet = ({ isPrintPortal = false }) => {
  const headerLinks = [
    { label: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { label: `GitHub (${PROFILE.repoCount} Repos, ${PROFILE.orgCount} Orgs) ↗`, href: PROFILE.githubUrl, accent: true },
    { label: "LinkedIn Profile ↗", href: PROFILE.linkedinUrl, accent: true },
    { label: "LearnHikmah Live ↗", href: "https://learnhikmah.com" },
    { label: "An-Nujum Foundation Live ↗", href: "https://an-nujum-foundation.vercel.app/" },
  ];

  return (
    <div
      className={
        isPrintPortal
          ? "a4-sheet-print bg-white text-[#1E1A17] font-sans"
          : "w-full max-w-[760px] mx-auto bg-[#FCFBF8] text-[#1E1A17] rounded-xl border border-[#D4C7B4] shadow-xl p-6 sm:p-9 font-sans space-y-3.5"
      }
    >
      {/* 1. Header */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-xl sm:text-[22px] font-bold tracking-tight uppercase text-[#1E1A17]">
            {PROFILE.name}
          </h1>
          <span className="text-[11.5px] text-[#5C4E41]">{PROFILE.location} (UTC+6)</span>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-[12.5px] font-bold text-[#9A4E24]">
            {PROFILE.role} | {PROFILE.tagline}
          </div>
          <a href={PROFILE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[11.5px] text-[#4A3E33] hover:text-[#9A4E24] hover:underline">
            WhatsApp: {PROFILE.phoneFormatted}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] text-[#332B24] pt-0.5">
          {headerLinks.map((lnk, idx) => (
            <span key={lnk.label} className="inline-flex items-center gap-2.5">
              {idx > 0 && <span className="text-[#9E8F7E]">|</span>}
              <a
                href={lnk.href}
                target={lnk.href.startsWith("http") ? "_blank" : undefined}
                rel={lnk.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={lnk.accent ? "font-semibold text-[#9A4E24] hover:underline" : "hover:text-[#9A4E24] hover:underline"}
              >
                {lnk.label}
              </a>
            </span>
          ))}
        </div>
      </div>

      {/* 2. Summary */}
      <A4Section title="Professional Summary">
        <p className="text-[12px] leading-[1.48] text-[#2B241E]">{RESUME_SNAPSHOT.executiveSummary}</p>
      </A4Section>

      {/* 3. Core Technical Stack */}
      <A4Section title="Core Technical Stack">
        <div className="space-y-0.5 text-[11.8px] leading-[1.45]">
          {RESUME_SNAPSHOT.skillGroups.map((group) => (
            <div key={group.category} className="grid grid-cols-1 sm:grid-cols-12 gap-0.5 sm:gap-2">
              <span className="sm:col-span-3 font-bold text-[#1E1A17]">{group.category}:</span>
              <span className="sm:col-span-9 text-[#332B24]">{group.items}</span>
            </div>
          ))}
        </div>
      </A4Section>

      {/* 4. Experience */}
      <A4Section title="Professional Experience">
        <div className="space-y-2.5">
          {ENGINEERING_EXP.map((exp) => (
            <div key={exp.id} className="space-y-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div className="text-[12.2px] font-bold text-[#1E1A17]">
                  {exp.role} — {exp.organization} ({exp.location})
                </div>
                <span className="text-[11px] font-bold text-[#9A4E24]">{exp.period}</span>
              </div>
              <div className="text-[11px] text-[#5C4E41]">Stack: {exp.stack}</div>
              <ul className="list-disc list-inside space-y-0.5 text-[11.5px] leading-[1.42] text-[#2B241E]">
                {exp.highlights.map((pt, i) => <li key={i}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </A4Section>

      {/* 5. Selected Production Systems */}
      <A4Section title="Selected Production Systems">
        <div className="space-y-2">
          {TOP_PROJECTS.map((proj) => (
            <div key={proj.id} className="space-y-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="text-[11.8px] font-bold text-[#1E1A17]">
                  {proj.name} | {proj.role} | {proj.stack}
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold">
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-[#9A4E24] hover:underline">
                    {proj.liveLabel || "Live Site ↗"}
                  </a>
                  {proj.repoUrl && (
                    <>
                      <span className="text-[#B8A896]">|</span>
                      <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="text-[#4A3E33] hover:text-[#9A4E24] hover:underline">
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
      </A4Section>

      {/* 6. Education */}
      <A4Section title="Education & Credentials">
        <div className="space-y-1.5">
          {EDUCATION_CREDENTIALS.map((edu) => (
            <div key={edu.id} className="space-y-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-[11.8px] font-bold text-[#1E1A17]">{edu.degree}</span>
                <span className="text-[11px] font-bold text-[#9A4E24]">{edu.year}</span>
              </div>
              <div className="text-[11.2px] text-[#3F352C]">{edu.institution} | {edu.board}</div>
            </div>
          ))}
        </div>
      </A4Section>

      {/* 7. Footer */}
      <div className="border-t border-[#D5C8B8] pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#5C4E41]">
        <span>{PROFILE.hiringStatus}</span>
        <div className="flex items-center gap-2 font-semibold text-[#9A4E24]">
          <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
          <span className="text-[#B8A896]">|</span>
          <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
          <span className="text-[#B8A896]">|</span>
          <a href={`mailto:${PROFILE.email}`} className="hover:underline">Email</a>
        </div>
      </div>
    </div>
  );
};

const ResumeModal = ({ isOpen, onClose, onCopyEmail, onDownloadPdf }) => {
  const [viewMode, setViewMode] = useState("web");
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!isOpen) setViewMode("web");
  }, [isOpen]);

  const handleConfirmDownloadPdf = () => {
    downloadResumePdf();
    setDownloaded(true);
    onDownloadPdf?.();
    setTimeout(() => setDownloaded(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(
          <div id="a4-print-root" aria-hidden="true">
            <A4PaperSheet isPrintPortal={true} />
          </div>,
          document.body
        )}

      <ModalShell
        isOpen={isOpen}
        onClose={onClose}
        labelledBy="resume-modal-title"
        maxWidth="max-w-4xl"
        overlayClass="no-print"
        panelClass="max-h-[92vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-7 space-y-5"
      >
        {/* Sticky Top Action Bar */}
        <div className="studio-modal-header sticky -top-4 sm:-top-7 -mx-4 sm:-mx-7 px-4 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b z-10">
          <div className="flex items-center gap-2 min-w-0">
            {viewMode === "a4-preview" ? (
              <>
                <button
                  type="button"
                  onClick={() => setViewMode("web")}
                  className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#CBBBA4] dark:border-stone-700 bg-[#EAE0CE]/70 dark:bg-stone-800 text-xs font-mono text-[#231D18] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <FiArrowLeft className="text-xs text-[#9A4E24] dark:text-amber-400 transition-transform duration-150 group-hover:-translate-x-0.5" />
                  <span>Back to Overview</span>
                </button>
                <span id="resume-modal-title" className="sr-only">A4 Resume Print Preview</span>
              </>
            ) : (
              <span id="resume-modal-title" className="text-[11.5px] font-mono font-medium text-[#9A4E24] dark:text-amber-400">
                Curriculum Vitae · Single Source of Truth
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {viewMode === "web" ? (
              <Tooltip content="Preview 1-page A4 sheet & print" position="bottom" align="right">
                <button
                  type="button"
                  onClick={() => setViewMode("a4-preview")}
                  className="group inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] rounded-lg border border-[#CBBBA4] dark:border-stone-700 bg-[#EAE0CE]/70 dark:bg-stone-800/80 text-xs font-mono font-medium text-[#231D18] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer transition-all"
                >
                  <FiEye className="text-xs text-[#9A4E24] dark:text-amber-400 transition-transform duration-150 group-hover:scale-110" />
                  <span>A4 Preview</span>
                </button>
              </Tooltip>
            ) : (
              <button
                type="button"
                onClick={printResumePdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[34px] rounded-lg bg-[#9A4E24] text-white text-xs font-mono font-medium shadow-sm hover:opacity-95 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer transition-all"
              >
                <FiPrinter className="text-xs" />
                <span>Print A4 Now</span>
              </button>
            )}

            <Tooltip content="Save ATS-friendly A4 PDF immediately" position="bottom" align="right">
              <button
                type="button"
                onClick={handleConfirmDownloadPdf}
                className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 min-h-[34px] rounded-lg bg-[#231D18] text-[#F6EFE2] dark:bg-stone-100 dark:text-stone-900 text-xs font-mono font-medium hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer transition-all shadow-sm"
              >
                {downloaded ? (
                  <>
                    <FiCheck className="text-xs text-emerald-400 dark:text-emerald-600" />
                    <span>Downloaded</span>
                  </>
                ) : (
                  <>
                    <FiDownload className="text-xs transition-transform duration-150 group-hover:translate-y-0.5" />
                    <span>{viewMode === "a4-preview" ? "Save PDF File" : "Download PDF"}</span>
                  </>
                )}
              </button>
            </Tooltip>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-lg text-[#5C4E41] hover:text-[#231D18] dark:hover:text-white hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/60 active:scale-[0.96] transition-all cursor-pointer"
              aria-label="Close resume preview"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* Body: A4 Paper Preview vs Web Overview */}
        {viewMode === "a4-preview" ? (
          <div key="a4-preview" className="animate-editorial-fade space-y-4">
            <div className="studio-modal-subcard rounded-xl border px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
              <span className="text-[#332B24] dark:text-stone-200">
                A4 Paper Preview (100% ATS-Friendly · Clickable Hyperlinks · Zero Overlap)
              </span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={printResumePdf} className="text-[#9A4E24] dark:text-amber-400 font-medium hover:underline cursor-pointer">
                  Print A4 Sheet ↗
                </button>
                <span className="text-[#B8A48C]">·</span>
                <button type="button" onClick={handleConfirmDownloadPdf} className="text-[#231D18] dark:text-stone-100 font-medium hover:underline cursor-pointer">
                  Save PDF File ↓
                </button>
              </div>
            </div>
            <A4PaperSheet isPrintPortal={false} />
          </div>
        ) : (
          <div key="web-overview" className="animate-editorial-fade space-y-6">
            {/* Header */}
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
                <button type="button" onClick={onCopyEmail} className="hover:text-[#9A4E24] dark:hover:text-amber-400 inline-flex items-center gap-1 cursor-pointer">
                  <span>{PROFILE.email}</span>
                  <FiCopy className="text-[11px]" />
                </button>
                <span aria-hidden="true">·</span>
                <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#9A4E24] dark:text-amber-400 hover:underline">
                  GitHub ({PROFILE.repoCount} Repos · {PROFILE.orgCount} Orgs) ↗
                </a>
                <span aria-hidden="true">·</span>
                <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#231D18] dark:hover:text-stone-200 hover:underline">
                  LinkedIn Profile ↗
                </a>
                <span aria-hidden="true">·</span>
                <a href={PROFILE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-[#9A4E24] dark:text-amber-400 hover:underline">
                  WhatsApp ↗
                </a>
              </div>

              <p className="pt-2 text-xs sm:text-[13.5px] text-[#3F352C] dark:text-stone-300 leading-relaxed">
                {RESUME_SNAPSHOT.executiveSummary}
              </p>
            </div>

            <WebSection title="Core Technical Stack">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {RESUME_SNAPSHOT.skillGroups.map((group) => (
                  <div key={group.category} className="editorial-card-lift studio-modal-subcard p-3.5 rounded-xl border hover:border-[#B8A48C] hover:shadow-sm space-y-1">
                    <div className="text-xs font-mono font-medium text-[#2B241E] dark:text-stone-200">{group.category}</div>
                    <p className="text-[11.5px] text-[#5C5146] dark:text-stone-400 leading-relaxed">{group.items}</p>
                  </div>
                ))}
              </div>
            </WebSection>

            <WebSection title="Professional Experience">
              <div className="space-y-3">
                {ENGINEERING_EXP.map((exp) => (
                  <div key={exp.id} className="editorial-card-lift studio-modal-subcard p-3.5 rounded-xl border hover:border-[#B8A48C] hover:shadow-sm space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="font-serif text-base text-[#2B241E] dark:text-stone-100">
                        {exp.role} <span className="text-xs font-sans text-[#6E6053] dark:text-stone-400">· {exp.organization}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#9A4E24] dark:text-amber-400 tabular-nums shrink-0">{exp.period}</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#7A6E62] dark:text-stone-400">{exp.stack}</div>
                    <ul className="space-y-1 pt-0.5 text-xs sm:text-[13px] text-[#4A3F35] dark:text-stone-300 leading-relaxed list-disc list-inside">
                      {exp.highlights.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </WebSection>

            <WebSection title="Selected Production Systems">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CASE_STUDIES.map((proj) => (
                  <div key={proj.id} className="editorial-card-lift studio-modal-subcard p-3.5 rounded-xl border hover:border-[#B8A48C] hover:shadow-sm space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <a href={proj.url} target="_blank" rel="noopener noreferrer" className="font-serif text-sm text-[#2B241E] dark:text-stone-100 hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors truncate">
                        {proj.name}
                      </a>
                      <div className="flex items-center gap-2.5 text-[11px] font-mono shrink-0">
                        <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-[#9A4E24] dark:text-amber-400 hover:underline">
                          {proj.liveLabel || "Live Site ↗"}
                        </a>
                        {proj.repoUrl && (
                          <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="text-[#5C5146] dark:text-stone-400 hover:text-[#231D18] dark:hover:text-stone-200 hover:underline">
                            Source ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="text-[10.5px] font-mono text-[#9A4E24] dark:text-amber-400/90">
                      {proj.role} · {proj.stack}
                    </div>
                    <p className="text-[11.5px] text-[#5C5146] dark:text-stone-400 leading-snug">{proj.shortSummary}</p>
                  </div>
                ))}
              </div>
            </WebSection>

            <WebSection title="Education & Credentials" bordered={true}>
              <div className="space-y-2.5">
                {EDUCATION_CREDENTIALS.map((edu) => (
                  <div key={edu.id} className="editorial-card-lift studio-modal-subcard p-3.5 rounded-xl border hover:border-[#B8A48C] hover:shadow-sm flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="space-y-0.5">
                      <div className="font-serif text-sm sm:text-[15px] text-[#2B241E] dark:text-stone-100">{edu.degree}</div>
                      <div className="text-[11.5px] text-[#5C5146] dark:text-stone-400">
                        {edu.institution} · <span className="font-mono text-[11px]">{edu.board}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 shrink-0">{edu.year}</span>
                  </div>
                ))}
              </div>
            </WebSection>
          </div>
        )}

        {/* Footer Bar */}
        <div className="pt-3 border-t border-[#DCD0C0] dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <span className="text-[#6E6053] dark:text-stone-400">{PROFILE.hiringStatus}</span>
          <div className="flex items-center gap-2">
            {viewMode === "web" && (
              <button
                type="button"
                onClick={() => setViewMode("a4-preview")}
                className="px-3.5 py-2 rounded-lg border border-[#CBBBA4] dark:border-stone-700 text-[#2B241E] dark:text-stone-200 cursor-pointer hover:border-[#9A4E24] dark:hover:border-amber-400 active:scale-[0.98] transition-all"
              >
                Open A4 Preview
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#2B241E] dark:bg-stone-100 text-[#F6EFE2] dark:text-stone-900 cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </ModalShell>
    </>
  );
};

export default ResumeModal;
