import { useState, useEffect } from "react";
import { FiCopy, FiCheck, FiPlay, FiFileText } from "react-icons/fi";
import StudioDeskVignette from "../Handcrafted/StudioDeskVignette";
import { Toast } from "../UI/Toast";
import Tooltip from "../UI/Tooltip";
import { useTimeOfDay } from "../../context/TimeOfDayContext";
import { PROFILE, STACK_PLAYGROUND } from "../../data/portfolioData";

const Hero = ({ onOpenResume }) => {
  const { currentDetails } = useTimeOfDay();
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [verified, setVerified] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [dhakaClock, setDhakaClock] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const formatted = new Date().toLocaleTimeString([], {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
      });
      setDhakaClock(formatted);
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = STACK_PLAYGROUND[activeTab];

  const handleCycleTab = () => {
    setActiveTab((prev) => (prev + 1) % STACK_PLAYGROUND.length);
    setVerified(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentItem.code);
    setCopied(true);
    setToastMsg(`Copied ${currentItem.file}`);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const handleRunVerify = () => {
    setVerified(true);
  };

  return (
    <section className="relative w-full pt-4 sm:pt-8 pb-8 sm:pb-10" id="home">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
        {/* Split-Screen Hero: Left Editorial Bio + Right Interactive Studio Desk Vignette */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Left Column: Editorial Identity */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] sm:text-[13px] text-[#5C4E41] dark:text-stone-300 font-mono tabular-nums">
              <span>{PROFILE.location}</span>
              {dhakaClock && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{dhakaClock} BST</span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span className="text-[#9A4E24] dark:text-amber-400 font-medium">
                {currentDetails.skyNote}
              </span>
            </div>

            <h1 className="font-serif text-[36px] xs:text-4xl sm:text-[52px] font-normal text-[#231D18] dark:text-stone-50 tracking-[-0.02em] leading-[1.08]">
              Hi, I’m {PROFILE.shortName}.
            </h1>

            <div className="space-y-2">
              <p className="text-[15.5px] sm:text-[17px] text-[#332B24] dark:text-stone-200 leading-[1.65] font-normal">
                {PROFILE.shortBio}{" "}
                <button
                  type="button"
                  onClick={() => setBioExpanded((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-[13px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline cursor-pointer whitespace-nowrap ml-1"
                >
                  <span>{bioExpanded ? "Show less ↑" : "Read more ↓"}</span>
                </button>
              </p>

              {bioExpanded && (
                <p className="text-[14.5px] sm:text-[15.5px] text-[#4A3E33] dark:text-stone-300 leading-[1.65] pl-3 border-l-2 border-[#D2C3AE] dark:border-stone-700">
                  {PROFILE.expandedBio}
                </p>
              )}
            </div>

            {/* Quick Hiring Status & Single-Line Executive Action Bar */}
            <div className="pt-1 space-y-3">
              <div className="text-[12.5px] sm:text-[13px] font-mono text-[#4A3E33] dark:text-stone-300 leading-relaxed">
                <span className="font-medium text-[#231D18] dark:text-stone-100">{PROFILE.role}</span>
                <span aria-hidden="true"> · </span>
                <span className="text-[#9A4E24] dark:text-amber-400 font-medium">
                  Remote or Dhaka
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-lg bg-[#231D18] text-[#F6EFE2] dark:bg-stone-100 dark:text-stone-900 text-[12.5px] font-mono font-medium hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                  >
                    <FiFileText className="text-xs shrink-0" />
                    <span>Preview CV / Resume</span>
                  </button>
                )}
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1 px-3.5 py-2 min-h-[38px] rounded-lg border border-[#CBBBA4] dark:border-stone-700 bg-[#E8DEC9]/60 dark:bg-stone-900/80 text-[12.5px] font-mono text-[#332B24] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 transition-colors whitespace-nowrap"
                >
                  <span>Inspect systems ↓</span>
                </a>
                <a
                  href="#experience"
                  className="text-[12.5px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline px-1.5 py-1 whitespace-nowrap"
                >
                  Experience →
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Studio Window, Desk Lamp & Mechanical Keyboard */}
          <div className="md:col-span-5">
            <StudioDeskVignette
              activeKeyIndex={activeTab}
              onCycleKey={handleCycleTab}
            />
          </div>
        </div>

        {/* Full-Width Interactive Stack & Code Snippet Playground */}
        <div className="rounded-2xl border border-[#D2C3AE] dark:border-stone-800 bg-[#E8DEC9]/50 dark:bg-[#1A1816]/95 shadow-xs">
          {/* Playground Header Tabs (Symmetrical 2x2 Grid on Mobile, Single-Line Row on Tablet/Desktop) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-t-2xl border-b border-[#D2C3AE] dark:border-stone-800 bg-[#EFE6D8]/70 dark:bg-stone-900/70">
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 shrink-0">
              {STACK_PLAYGROUND.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(idx);
                    setVerified(false);
                  }}
                  className={`px-3 py-1.5 min-h-[34px] sm:min-h-0 rounded-lg text-[12px] font-mono transition-colors cursor-pointer whitespace-nowrap text-center ${
                    activeTab === idx
                      ? "bg-[#231D18] text-[#F6EFE2] dark:bg-stone-200 dark:text-stone-900 font-medium"
                      : "text-[#4A3E33] dark:text-stone-300 hover:bg-[#DDD0BC]/70 dark:hover:bg-stone-800 border border-[#D2C3AE]/70 dark:border-stone-800 sm:border-transparent"
                  }`}
                >
                  <span className="sm:hidden">{item.label}</span>
                  <span className="hidden sm:inline">{item.fullLabel}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#D2C3AE]/60 dark:border-stone-800/80 min-w-0">
              <span className="text-[12px] font-mono text-[#5C4E41] dark:text-stone-400 truncate">
                {currentItem.file}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Tooltip content="Verify architectural invariant" position="top" align="right">
                  <button
                    onClick={handleRunVerify}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-1 min-h-[32px] sm:min-h-0 rounded-md text-[11.5px] font-mono border border-[#C5B49E] dark:border-stone-700 text-[#332B24] dark:text-stone-200 hover:bg-[#DDD0BC]/70 dark:hover:bg-stone-800 cursor-pointer transition-colors"
                  >
                    <FiPlay className="text-[10px] text-[#9A4E24] dark:text-amber-400" />
                    <span>Verify</span>
                  </button>
                </Tooltip>
                <Tooltip content="Copy code snippet" position="top" align="right">
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-1 min-h-[32px] sm:min-h-0 rounded-md text-[11.5px] font-mono border border-[#C5B49E] dark:border-stone-700 text-[#332B24] dark:text-stone-200 hover:bg-[#DDD0BC]/70 dark:hover:bg-stone-800 cursor-pointer transition-colors"
                  >
                    {copied ? <FiCheck className="text-emerald-600" /> : <FiCopy />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Code Block */}
          <div className="p-4 sm:p-5 overflow-x-auto">
            <pre className="text-[12.5px] sm:text-[13.5px] font-mono leading-[1.68] text-[#231D18] dark:text-stone-100">
              <code>{currentItem.code}</code>
            </pre>
          </div>

          {/* Architectural Invariant Footer Bar */}
          <div className="px-4 py-2.5 rounded-b-2xl border-t border-[#D2C3AE]/80 dark:border-stone-800/80 bg-[#F4ECE0]/60 dark:bg-stone-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[12px] font-mono">
            <span className="text-[#4A3E33] dark:text-stone-300 leading-relaxed">
              Architecture: {currentItem.architectureNote}
            </span>
            {verified && (
              <span className="text-emerald-800 dark:text-emerald-400 font-medium leading-relaxed">
                {currentItem.verifyOutput}
              </span>
            )}
          </div>
        </div>
      </div>

      <Toast
        message={toastMsg}
        isVisible={!!toastMsg}
        onClose={() => setToastMsg("")}
      />
    </section>
  );
};

export default Hero;
