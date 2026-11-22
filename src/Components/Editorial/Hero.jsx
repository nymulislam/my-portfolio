import { useState, useEffect } from "react";
import {
  FiCopy,
  FiCheck,
  FiPlay,
  FiFileText,
  FiDownload,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiMessageCircle,
  FiArrowUpRight,
} from "react-icons/fi";
import StudioDeskVignette from "../Handcrafted/StudioDeskVignette";
import Reveal from "../UI/Reveal";
import Tooltip from "../UI/Tooltip";
import { useTimeOfDay } from "../../context/TimeOfDayContext";
import { PROFILE, STACK_PLAYGROUND, CASE_STUDIES } from "../../data/portfolioData";
import { smoothScrollToId } from "../../utils/smoothScroll";

const ICON_BTN_CLASS =
  "inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#D2C3AE] dark:border-[#332E29] bg-[#EFE6D8]/65 dark:bg-[#1E1B18] text-[#332B24] dark:text-stone-300 hover:border-[#9A4E24] dark:hover:border-amber-400 hover:text-[#9A4E24] dark:hover:text-amber-400 hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-200 cursor-pointer";

const Hero = ({ onOpenResume, onDownloadPdf, onOpenContact, onCopyEmail, onNotify }) => {
  const { currentDetails } = useTimeOfDay();
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [verified, setVerified] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [dhakaClock, setDhakaClock] = useState("");

  useEffect(() => {
    const updateClock = () =>
      setDhakaClock(
        new Date().toLocaleTimeString([], { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" })
      );
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = STACK_PLAYGROUND[activeTab];
  const flagship = CASE_STUDIES[0];
  const marqueeItems = [...PROFILE.techMarquee, ...PROFILE.techMarquee];

  const handleCycleTab = () => {
    setActiveTab((prev) => (prev + 1) % STACK_PLAYGROUND.length);
    setVerified(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentItem.code);
    setCopied(true);
    onNotify?.(`Copied ${currentItem.file}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const jumpToProjects = (e) => {
    e.preventDefault();
    smoothScrollToId("projects", 84, 720);
  };

  const connectLinks = [
    { href: PROFILE.githubUrl, label: "GitHub Profile", tip: `GitHub · ${PROFILE.repoCount} repos & ${PROFILE.orgCount} orgs`, icon: <FiGithub className="text-[15px]" />, align: "left" },
    { href: PROFILE.linkedinUrl, label: "LinkedIn Profile", tip: "LinkedIn Profile", icon: <FiLinkedin className="text-[15px]" /> },
    { href: PROFILE.whatsappUrl, label: "Message on WhatsApp", tip: `WhatsApp · ${PROFILE.phoneFormatted}`, icon: <FiMessageCircle className="text-[15px]" /> },
  ];

  const heroMetrics = [
    { value: "4+ Live", label: "Systems Shipped" },
    { value: `${PROFILE.repoCount} Repos`, label: `${PROFILE.orgCount} GitHub Orgs` },
    { value: "Remote", label: "Or Dhaka (UTC+6)", accent: true },
  ];

  return (
    <section className="relative w-full pt-4 sm:pt-7 pb-6 sm:pb-10" id="home">
      {/* 1. Wide Asymmetric Architect's Hero */}
      <div className="studio-container studio-frame-rails pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column (7/12) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="animate-hero-in flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] sm:text-[13px] text-[#5C4E41] dark:text-[#B8AEA2] font-mono tabular-nums">
              <span>{PROFILE.location}</span>
              {dhakaClock && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{dhakaClock} BST</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="text-[#9A4E24] dark:text-amber-400 font-medium">{currentDetails.skyNote}</span>
            </div>

            <h1
              style={{ animationDelay: "70ms" }}
              className="animate-hero-in font-serif text-[36px] xs:text-[42px] sm:text-[54px] lg:text-[58px] 2xl:text-[64px] font-normal text-[#231D18] dark:text-[#F3ECE2] tracking-[-0.025em] leading-[1.06]"
            >
              Hi, I’m {PROFILE.shortName}.
              <span className="block mt-1 text-[28px] xs:text-[32px] sm:text-[42px] lg:text-[46px] 2xl:text-[50px] text-[#3B3128] dark:text-[#DFD7CC] leading-[1.12]">
                I architect fast{" "}
                <span className="italic text-[#9A4E24] dark:text-amber-400 studio-underline-draw">
                  full-stack &amp; AI systems.
                </span>
              </span>
            </h1>

            <div style={{ animationDelay: "130ms" }} className="animate-hero-in space-y-2 max-w-[64ch]">
              <p className="text-[15.5px] sm:text-[17px] text-[#332B24] dark:text-[#DFD7CC] leading-[1.72]">
                {PROFILE.shortBio}{" "}
                <button
                  type="button"
                  onClick={() => setBioExpanded((p) => !p)}
                  className="inline-flex items-center gap-1 text-[13px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline cursor-pointer whitespace-nowrap ml-1"
                >
                  {bioExpanded ? "Show less ↑" : "Read more ↓"}
                </button>
              </p>
              <div className={`studio-accordion ${bioExpanded ? "is-open" : ""}`} aria-hidden={!bioExpanded}>
                <div>
                  <p className="pt-1 text-[14.5px] sm:text-[15.5px] text-[#4A3E33] dark:text-[#C8BEB2] leading-[1.72] pl-3.5 border-l-2 border-[#D2C3AE] dark:border-[#38322C]">
                    {PROFILE.expandedBio}
                  </p>
                </div>
              </div>
            </div>

            {/* Executive Actions */}
            <div style={{ animationDelay: "190ms" }} className="animate-hero-in flex flex-wrap items-center gap-2.5 pt-1">
              {onDownloadPdf && (
                <Tooltip content="Save 1-page ATS-friendly A4 PDF" position="top" align="left">
                  <button
                    type="button"
                    onClick={onDownloadPdf}
                    className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl bg-[#231D18] text-[#F6EFE2] dark:bg-[#F3ECE2] dark:text-[#1C1917] text-[13px] font-mono font-medium hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer whitespace-nowrap shadow-sm"
                  >
                    <FiDownload className="text-xs shrink-0" />
                    <span>Download CV (PDF)</span>
                  </button>
                </Tooltip>
              )}

              {onOpenResume && (
                <Tooltip content="Inspect interactive web & A4 CV" position="top" align="center">
                  <button
                    type="button"
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] rounded-xl border border-[#CBBBA4] dark:border-[#38322C] bg-[#EFE6D8]/75 dark:bg-[#221F1C] text-[13px] font-mono font-medium text-[#231D18] dark:text-[#DFD7CC] hover:border-[#9A4E24] dark:hover:border-amber-400 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    <FiFileText className="text-xs text-[#9A4E24] dark:text-amber-400 shrink-0" />
                    <span>Preview CV</span>
                  </button>
                </Tooltip>
              )}

              <a
                href="#projects"
                onClick={jumpToProjects}
                className="group inline-flex items-center gap-1.5 px-3 py-2 min-h-[42px] text-[13px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline whitespace-nowrap"
              >
                <span>Explore systems</span>
                <span className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
              </a>
            </div>

            {/* Hairline-Divided Proof Strip */}
            <div
              style={{ animationDelay: "240ms" }}
              className="animate-hero-in pt-4 border-t border-[#D8CBB8]/85 dark:border-[#2B2622] grid grid-cols-3 gap-4 sm:gap-6 max-w-xl"
            >
              {heroMetrics.map((m, idx) => (
                <div
                  key={m.label}
                  className={`${idx > 0 ? "pl-4 sm:pl-6 border-l border-[#D8CBB8]/85 dark:border-[#2B2622]" : ""} space-y-0.5`}
                >
                  <div className={`font-serif text-[20px] sm:text-[24px] leading-tight tabular-nums ${m.accent ? "text-[#9A4E24] dark:text-amber-400" : "text-[#231D18] dark:text-[#F3ECE2]"}`}>
                    {m.value}
                  </div>
                  <div className="text-[11px] sm:text-[11.5px] font-mono uppercase tracking-wider text-[#5C4E41] dark:text-stone-400">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Connect Icon Bar with Custom Tooltips */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#6E5E4F] dark:text-stone-400 mr-1">
                Connect
              </span>
              {connectLinks.map((lnk) => (
                <Tooltip key={lnk.label} content={lnk.tip} position="top" align={lnk.align || "center"}>
                  <a href={lnk.href} target="_blank" rel="noopener noreferrer" aria-label={lnk.label} className={ICON_BTN_CLASS}>
                    {lnk.icon}
                  </a>
                </Tooltip>
              ))}
              <Tooltip content={`Copy ${PROFILE.email}`} position="top" align="center">
                <button type="button" onClick={onCopyEmail || onOpenContact} aria-label="Copy email address" className={ICON_BTN_CLASS}>
                  <FiMail className="text-[15px]" />
                </button>
              </Tooltip>
              {onOpenContact && (
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="ml-1 text-[12px] font-mono text-[#5C4E41] dark:text-stone-400 hover:text-[#9A4E24] dark:hover:text-amber-400 hover:underline cursor-pointer"
                >
                  Open message form →
                </button>
              )}
            </div>
          </div>

          {/* Right Column (5/12): Elevated Studio Showcase Card */}
          <div style={{ animationDelay: "140ms" }} className="animate-hero-in lg:col-span-5">
            <div className="rounded-2xl border studio-surface-muted p-3.5 sm:p-4 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between gap-2 px-1 text-[12px] font-mono">
                <span className="text-[#231D18] dark:text-[#F3ECE2] font-medium">Architect’s Studio Desk</span>
                <span className="text-[#9A4E24] dark:text-amber-400">Open to roles · Remote</span>
              </div>

              <StudioDeskVignette activeKeyIndex={activeTab} onCycleKey={handleCycleTab} embedded={true} />

              {flagship && (
                <div className="rounded-xl border border-[#D2C3AE]/90 dark:border-stone-800 bg-[#F6EFE2]/85 dark:bg-[#151311]/95 p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                    <span className="uppercase tracking-wider text-[#9A4E24] dark:text-amber-400 font-medium">
                      Flagship Solo Monorepo
                    </span>
                    <span className="text-[#5C4E41] dark:text-stone-400">{flagship.role}</span>
                  </div>
                  <div className="space-y-1">
                    <h2 className="font-serif text-[17px] text-[#231D18] dark:text-[#F3ECE2] leading-snug">
                      {flagship.name} &amp; LMS
                    </h2>
                    <p className="text-[12.5px] text-[#4A3E33] dark:text-stone-400 leading-relaxed">
                      {flagship.impact}
                    </p>
                  </div>
                  <div className="pt-1 flex items-center justify-between gap-3 text-[12px] font-mono">
                    <a href={flagship.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#9A4E24] dark:text-amber-400 font-medium hover:underline">
                      <span>Visit learnhikmah.com</span>
                      <FiArrowUpRight className="text-xs" />
                    </a>
                    <a href="#projects" onClick={jumpToProjects} className="text-[#52453A] dark:text-stone-300 hover:text-[#231D18] dark:hover:text-white hover:underline">
                      All 6 systems ↓
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Full-Bleed Studio Tech Marquee Band */}
      <div aria-label="Production technology stack" className="w-full border-y studio-surface-muted py-3.5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto studio-marquee-mask overflow-hidden">
          <div className="studio-marquee-track items-center gap-3">
            {marqueeItems.map((tech, idx) => (
              <span
                key={`${tech}-${idx}`}
                className="studio-chip inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[12px] text-[#332B24] dark:text-stone-300 whitespace-nowrap shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#9A4E24]/75 dark:bg-amber-400/80 shrink-0" />
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Side-by-Side Live Architecture Workbench */}
      <div className="studio-container studio-frame-rails pt-8 sm:pt-10">
        <Reveal className="rounded-2xl border studio-surface-muted shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 p-4 sm:p-5 lg:p-6 rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl border-b lg:border-b-0 lg:border-r border-[#D2C3AE] dark:border-stone-800/90 bg-[#EFE6D8]/70 dark:bg-[#1E1C19]/90 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="studio-eyebrow">Live Architecture Workbench</span>
                  <h2 className="font-serif text-[21px] sm:text-[23px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-snug">
                    How I structure production code
                  </h2>
                  <p className="text-[13px] text-[#52453A] dark:text-stone-400 leading-relaxed">
                    Click any layer — or tap the mechanical keyboard above — to inspect and verify invariants.
                  </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 pt-1">
                  {STACK_PLAYGROUND.map((item, idx) => {
                    const isSelected = activeTab === idx;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => {
                          setActiveTab(idx);
                          setVerified(false);
                        }}
                        className={`px-3 py-2 rounded-xl text-left font-mono transition-all duration-150 cursor-pointer flex items-center justify-between gap-2 ${
                          isSelected
                            ? "bg-[#231D18] text-[#F6EFE2] dark:bg-amber-400 dark:text-stone-950 font-medium shadow-sm"
                            : "text-[#4A3E33] dark:text-stone-300 hover:bg-[#DDD0BC]/70 dark:hover:bg-stone-800/80 border border-[#D2C3AE]/80 dark:border-stone-800 bg-[#F6EFE2]/55 dark:bg-[#171513]/60"
                        }`}
                      >
                        <span className="text-[12px] truncate">
                          <span className="sm:hidden">{item.label}</span>
                          <span className="hidden sm:inline">{item.fullLabel}</span>
                        </span>
                        <span className={`hidden lg:inline text-[10.5px] opacity-75 shrink-0 ${isSelected ? "" : "text-[#6E5E4F] dark:text-stone-500"}`}>
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="hidden lg:block pt-3 border-t border-[#D2C3AE]/75 dark:border-stone-800 text-[11.5px] font-mono text-[#5C4E41] dark:text-stone-400 leading-relaxed">
                Press <span className="px-1.5 py-0.5 rounded border border-[#C5B49E] dark:border-stone-700 text-[#231D18] dark:text-stone-200">⌘K</span> anytime for quick navigation &amp; studio controls.
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-between rounded-b-2xl lg:rounded-bl-none lg:rounded-r-2xl bg-[#F6EFE2]/55 dark:bg-[#151311]/90">
              <div className="px-4 sm:px-5 py-2.5 lg:rounded-tr-2xl border-b border-[#D2C3AE]/80 dark:border-stone-800/90 bg-[#EFE6D8]/50 dark:bg-[#191714]/90 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#9A4E24] dark:bg-amber-400 shrink-0" />
                  <span className="text-[12px] sm:text-[12.5px] font-mono text-[#231D18] dark:text-stone-200 break-all">
                    {currentItem.file}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Tooltip content="Verify architectural invariant" position="top" align="right">
                    <button
                      type="button"
                      onClick={() => setVerified(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-1 min-h-[32px] sm:min-h-0 rounded-md text-[11.5px] font-mono border border-[#C5B49E] dark:border-stone-700 bg-[#F6EFE2]/80 dark:bg-[#221F1C] text-[#332B24] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 cursor-pointer transition-colors"
                    >
                      <FiPlay className="text-[10px] text-[#9A4E24] dark:text-amber-400" />
                      <span>Verify</span>
                    </button>
                  </Tooltip>
                  <Tooltip content="Copy code snippet" position="top" align="right">
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-1 min-h-[32px] sm:min-h-0 rounded-md text-[11.5px] font-mono border border-[#C5B49E] dark:border-stone-700 bg-[#F6EFE2]/80 dark:bg-[#221F1C] text-[#332B24] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 cursor-pointer transition-colors"
                    >
                      {copied ? <FiCheck className="text-emerald-600 dark:text-emerald-400" /> : <FiCopy />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </Tooltip>
                </div>
              </div>

              <div key={currentItem.id} className="p-4 sm:p-6 overflow-x-auto animate-editorial-fade flex-1 flex items-center">
                <pre className="w-full text-[12px] sm:text-[13.5px] font-mono leading-[1.75] text-[#231D18] dark:text-[#E6DFD5]">
                  <code>{currentItem.code}</code>
                </pre>
              </div>

              <div className="px-4 sm:px-5 py-3 rounded-b-2xl lg:rounded-bl-none border-t border-[#D2C3AE]/80 dark:border-stone-800/90 bg-[#EFE6D8]/55 dark:bg-[#191714]/90 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[12px] font-mono">
                <span className="text-[#4A3E33] dark:text-stone-300 leading-relaxed">
                  <span className="text-[#9A4E24] dark:text-amber-400 font-medium">Pattern: </span>
                  {currentItem.architectureNote}
                </span>
                {verified && (
                  <span className="animate-editorial-fade text-emerald-800 dark:text-emerald-400 font-medium leading-relaxed">
                    {currentItem.verifyOutput}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
