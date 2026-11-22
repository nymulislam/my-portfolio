import { useState } from "react";
import { FiCopy, FiTerminal, FiCheck, FiDownload, FiMail } from "react-icons/fi";
import Reveal from "../UI/Reveal";
import Tooltip from "../UI/Tooltip";
import { useTimeOfDay } from "../../context/TimeOfDayContext";
import { PROFILE, DEV_COMMANDS } from "../../data/portfolioData";

const FOOTER_SOCIALS = [
  { label: "LinkedIn", href: PROFILE.linkedinUrl },
  { label: "GitHub", href: PROFILE.githubUrl },
  { label: "WhatsApp", href: PROFILE.whatsappUrl },
];

const Footer = ({ onOpenCommand, onOpenResume, onDownloadPdf, onOpenContact, onCopyEmail }) => {
  const [showDevConsole, setShowDevConsole] = useState(true);
  const [activeCmd, setActiveCmd] = useState("stack");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { activePeriod, cycleMood } = useTimeOfDay();

  const handleCopy = () => {
    if (onCopyEmail) onCopyEmail();
    else navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="pb-12 sm:pb-16 scroll-mt-24" id="contact">
      <div className="studio-container studio-frame-rails pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        <Reveal className="rounded-2xl border border-[#CBBBA4] dark:border-amber-500/20 bg-[#E8DEC9]/65 dark:bg-[#1B1815] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <span className="studio-eyebrow">Available for Remote &amp; Dhaka Engineering Roles</span>
            <h2 className="font-serif text-[24px] sm:text-[30px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-snug">
              Looking for an engineer who owns systems end-to-end?
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#4A3E33] dark:text-stone-300 leading-relaxed">
              From Next.js SSR portals and RBAC LMS platforms to React Native financial apps and deterministic AI tools — let’s talk about what your team is building.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl bg-[#9A4E24] dark:bg-amber-400 text-[#FBF8F3] dark:text-[#1A1612] text-[13px] font-mono font-medium hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer whitespace-nowrap shadow-sm"
              >
                <FiMail className="text-xs shrink-0" />
                <span>Start a conversation →</span>
              </button>
            )}
            {onDownloadPdf && (
              <button
                type="button"
                onClick={onDownloadPdf}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl border border-[#CBBBA4] dark:border-stone-700 bg-[#F6EFE2]/80 dark:bg-[#221F1C] text-[13px] font-mono font-medium text-[#231D18] dark:text-stone-100 hover:border-[#9A4E24] dark:hover:border-amber-400 transition-colors cursor-pointer whitespace-nowrap"
              >
                <FiDownload className="text-xs text-[#9A4E24] dark:text-amber-400 shrink-0" />
                <span>Download CV (PDF)</span>
              </button>
            )}
          </div>
        </Reveal>

        {showDevConsole && (
          <Reveal delay={60} className="rounded-xl border studio-surface-muted p-3.5 sm:p-4 text-[12.5px] font-mono space-y-2.5 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D2C3AE]/80 dark:border-stone-800/80 pb-2.5">
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[#9A4E24] dark:text-amber-400 font-medium">~/naymul</span>
                <span className="text-[#6E5E4F] dark:text-stone-400">git:(main)</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {Object.keys(DEV_COMMANDS).map((key) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setActiveCmd(key)}
                    className={`px-2.5 py-1 sm:py-0.5 rounded text-[11.5px] cursor-pointer transition-colors whitespace-nowrap ${
                      activeCmd === key
                        ? "bg-[#231D18] text-[#F6EFE2] dark:bg-amber-400 dark:text-stone-950 font-medium"
                        : "text-[#4A3E33] dark:text-stone-300 hover:bg-[#DDD0BC]/80 dark:hover:bg-stone-800"
                    }`}
                  >
                    --{key}
                  </button>
                ))}
                <Tooltip content="Cycle ambient time of day" position="top" align="right">
                  <button
                    type="button"
                    onClick={(e) => cycleMood(e)}
                    className="px-2.5 py-1 sm:py-0.5 rounded text-[11.5px] text-[#9A4E24] dark:text-amber-400 font-medium hover:bg-[#DDD0BC]/80 dark:hover:bg-stone-800 cursor-pointer transition-colors whitespace-nowrap"
                  >
                    --mood={activePeriod}
                  </button>
                </Tooltip>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5 text-[12px] sm:text-[12.5px]">
              <div className="text-[#231D18] dark:text-stone-200 leading-relaxed break-words">
                <span className="text-[#9A4E24] dark:text-amber-400 font-medium mr-2">$ {DEV_COMMANDS[activeCmd].cmd}</span>
                <span className="opacity-60 mr-2">→</span>
                <span>{DEV_COMMANDS[activeCmd].output}</span>
                <span className="inline-block w-1.5 h-3.5 bg-[#9A4E24] dark:bg-amber-400 ml-1.5 align-middle animate-cursor-blink" />
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 min-h-[32px] sm:min-h-0 rounded border border-[#C5B49E] dark:border-stone-700 text-[11.5px] text-[#332B24] dark:text-stone-200 hover:bg-[#DFD3C0] dark:hover:bg-stone-800 cursor-pointer transition-colors whitespace-nowrap"
                >
                  {copiedEmail ? <FiCheck className="text-emerald-600 dark:text-emerald-400" /> : <FiCopy />}
                  <span>{copiedEmail ? "Copied" : "Copy email"}</span>
                </button>
                {onOpenCommand && (
                  <Tooltip content="Open Command Palette (⌘K)" position="top" align="right">
                    <button
                      type="button"
                      onClick={onOpenCommand}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-1 min-h-[32px] sm:min-h-0 rounded border border-[#C5B49E] dark:border-stone-700 text-[11.5px] text-[#332B24] dark:text-stone-200 hover:bg-[#DFD3C0] dark:hover:bg-stone-800 cursor-pointer transition-colors whitespace-nowrap"
                    >
                      <span>⌘K</span>
                    </button>
                  </Tooltip>
                )}
              </div>
            </div>
          </Reveal>
        )}

        <div className="pt-4 border-t border-[#D2C3AE] dark:border-[#2B2622] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] sm:text-[13.5px]">
          <div className="text-[#6E5E4F] dark:text-[#9C9184]">
            &copy; {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#3B3128] dark:text-[#D5CCC0]">
            <Tooltip content="Toggle developer console" position="top" align="center">
              <button
                type="button"
                onClick={() => setShowDevConsole((s) => !s)}
                className="hover:text-[#9A4E24] dark:hover:text-amber-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1 font-medium"
              >
                <FiTerminal className="text-xs text-[#9A4E24] dark:text-amber-400" />
                <span>Console</span>
              </button>
            </Tooltip>
            {FOOTER_SOCIALS.map((lnk) => (
              <a key={lnk.label} href={lnk.href} target="_blank" rel="noopener noreferrer" className="hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors py-1">
                {lnk.label}
              </a>
            ))}
            {onOpenResume && (
              <button type="button" onClick={onOpenResume} className="hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors py-1 cursor-pointer">
                Resume
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
