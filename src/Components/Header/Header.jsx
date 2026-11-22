import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { FiChevronDown, FiSun, FiMoon, FiFileText } from "react-icons/fi";
import { WiSunset, WiSunrise, WiDaySunny } from "react-icons/wi";
import { useTimeOfDay } from "../../context/TimeOfDayContext";
import { PROFILE } from "../../data/portfolioData";
import { smoothScrollToId, smoothScrollToTop } from "../../utils/smoothScroll";
import Tooltip from "../UI/Tooltip";

const NAV_LINKS = [
  { id: "projects", label: "Systems" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "Craft" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

const MOOD_OPTIONS = [
  { key: "auto", label: "Auto", sublabel: "সময় অনুযায়ী", icon: <FiSun className="text-sm text-[#9A4E24] dark:text-amber-400" /> },
  { key: "morning", label: "Morning", sublabel: "সকাল", icon: <WiSunrise className="text-lg text-amber-600 dark:text-amber-400" /> },
  { key: "afternoon", label: "Afternoon", sublabel: "দুপুর", icon: <WiDaySunny className="text-lg text-orange-500 dark:text-amber-400" /> },
  { key: "evening", label: "Evening", sublabel: "সন্ধ্যা", icon: <WiSunset className="text-lg text-[#8C583A] dark:text-amber-400" /> },
  { key: "night", label: "Night", sublabel: "রাত", icon: <FiMoon className="text-sm text-indigo-400" /> },
];

const PERIOD_ICON = {
  morning: <WiSunrise className="text-base text-amber-700 dark:text-amber-400 shrink-0" />,
  afternoon: <WiDaySunny className="text-base text-orange-600 dark:text-orange-400 shrink-0" />,
  evening: <WiSunset className="text-base text-[#6E5644] dark:text-amber-400 shrink-0" />,
  night: <FiMoon className="text-xs text-indigo-400 shrink-0" />,
};

const Header = ({ onOpenResume, onOpenContact }) => {
  const { selectedMood, setSelectedMood, activePeriod, currentDetails } = useTimeOfDay();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dropdownRef = useRef(null);
  const progressRef = useRef(null);
  const manualScrollLockRef = useRef(false);
  const manualScrollTimerRef = useRef(null);

  useEffect(() => {
    const onOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 16);

      // Update GPU hairline reading progress bar directly (zero React re-renders)
      if (progressRef.current) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;
        progressRef.current.style.transform = `scaleX(${pct})`;
      }

      if (manualScrollLockRef.current) return;
      if (y < 140) return setActiveSection("");
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 48) {
        return setActiveSection("contact");
      }

      let current = "";
      const trigger = y + 180;
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + y <= trigger) current = id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(manualScrollTimerRef.current);
    };
  }, []);

  const lockScrollSpy = (ms) => {
    manualScrollLockRef.current = true;
    clearTimeout(manualScrollTimerRef.current);
    manualScrollTimerRef.current = setTimeout(() => {
      manualScrollLockRef.current = false;
    }, ms);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    lockScrollSpy(760);
    smoothScrollToId(id, 84, 700);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setActiveSection("");
    lockScrollSpy(680);
    smoothScrollToTop(620);
  };

  const handleSelectMood = (key, e) => {
    const root = document.documentElement;
    root.classList.add("vt-mood-switching");
    flushSync(() => setDropdownOpen(false));
    void root.offsetHeight;
    root.classList.remove("vt-mood-switching");
    setSelectedMood(key, e);
  };

  const currentMoodObj = MOOD_OPTIONS.find((m) => m.key === selectedMood) || MOOD_OPTIONS[0];
  const buttonMoodLabel = selectedMood === "auto" ? `Auto · ${currentDetails.label}` : currentMoodObj.label;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "py-2.5 sm:py-3 studio-header-scrolled backdrop-blur-md border-b shadow-sm"
          : "pt-4 sm:pt-6 pb-2.5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="studio-container">
        {/* 3-Zone Wide Editorial Top Bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-5 text-[14px] text-[#3B3128] dark:text-[#DFD7CC]">
          {/* Zone 1: Monogram + Identity */}
          <Tooltip content="Naymul Islam · Back to top" position="bottom" align="left">
            <a href="#home" onClick={handleHomeClick} aria-label="Naymul Islam — Home" className="group inline-flex items-center gap-3 shrink-0">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-[10px] bg-[#1C1917] dark:bg-[#221F1C] border border-[#362F2A] dark:border-[#38322C] shadow-sm group-hover:border-[#9A4E24] dark:group-hover:border-amber-400/70 transition-all shrink-0">
                <svg viewBox="0 0 64 64" fill="none" className="w-6 h-6 transition-transform duration-150 group-hover:scale-105" aria-hidden="true">
                  <path d="M18 46V18H24.2L40.5 38.2V18H45.5V46H39.6L23 25.4V46H18Z" fill="#F3ECE2" />
                  <circle cx="50.5" cy="42.5" r="3.8" fill="#C85A32" />
                </svg>
              </span>
              <span className="hidden lg:flex flex-col leading-tight">
                <span className="font-serif text-[15.5px] font-medium text-[#231D18] dark:text-[#F3ECE2] group-hover:text-[#9A4E24] dark:group-hover:text-amber-400 transition-colors">
                  {PROFILE.name}
                </span>
                <span className="text-[11px] font-mono text-[#5C4E41] dark:text-[#A89E93]">{PROFILE.role}</span>
              </span>
            </a>
          </Tooltip>

          {/* Zone 2: Floating Pill Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden sm:flex items-center gap-0.5 lg:gap-1 md:p-1 md:rounded-full md:border md:border-[#D2C3AE]/85 md:dark:border-[#302A25] md:bg-[#EFE6D8]/75 md:dark:bg-[#1D1A17]/85 md:shadow-sm"
          >
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative px-2 sm:px-2.5 lg:px-3.5 py-1.5 rounded-full text-[12.5px] lg:text-[13.5px] font-medium transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#231D18] text-[#F6EFE2] dark:bg-[#F3ECE2] dark:text-[#1C1917] shadow-sm"
                      : "text-[#3B3128] dark:text-[#D5CCC0] hover:text-[#9A4E24] dark:hover:text-amber-400 hover:bg-[#E5D9C5]/60 dark:hover:bg-[#27231F]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Quick Recruiter Actions + Studio Light Selector */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onOpenResume && (
              <Tooltip content="Preview Executive CV & Download PDF" position="bottom" align="right">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#CBBBA4] dark:border-[#332E29] bg-[#EFE6D8]/85 dark:bg-[#221F1C] text-[12px] font-mono font-medium text-[#231D18] dark:text-[#F3ECE2] hover:border-[#9A4E24] dark:hover:border-amber-400/70 transition-all cursor-pointer whitespace-nowrap"
                >
                  <FiFileText className="text-xs text-[#9A4E24] dark:text-amber-400 shrink-0" />
                  <span>CV</span>
                </button>
              </Tooltip>
            )}

            {onOpenContact && (
              <Tooltip content="Start a hiring conversation" position="bottom" align="right">
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1 px-2.5 lg:px-3.5 py-1.5 min-h-[36px] sm:min-h-0 rounded-lg bg-[#9A4E24] dark:bg-amber-400 text-[#FBF8F3] dark:text-[#1A1612] text-[11.5px] lg:text-[12px] font-mono font-medium hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <span className="lg:hidden">Hire</span>
                  <span className="hidden lg:inline">Hire me →</span>
                </button>
              </Tooltip>
            )}

            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-expanded={dropdownOpen}
                aria-label="Select ambient time of day"
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-lg border border-[#CBBBA4] dark:border-[#332E29] bg-[#F4ECE0]/90 dark:bg-[#201D1A]/95 text-[12px] sm:text-[12.5px] font-mono font-medium text-[#3B3128] dark:text-[#E2D9CE] hover:border-[#9A4E24] dark:hover:border-amber-400/70 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span key={activePeriod} className="inline-flex items-center animate-mood-icon">
                  {PERIOD_ICON[activePeriod]}
                </span>
                <span key={buttonMoodLabel} className="animate-editorial-fade">{buttonMoodLabel}</span>
                <FiChevronDown className={`text-xs text-[#5C4E41] dark:text-[#A89E93] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <div
                aria-hidden={!dropdownOpen}
                className={`absolute right-0 mt-2 w-52 rounded-xl border border-[#D2C3AE] dark:border-[#332E29] bg-[#F6EFE2] dark:bg-[#1E1B18] shadow-xl p-1.5 z-50 text-xs origin-top-right transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  dropdownOpen ? "visible opacity-100 scale-100 translate-y-0 pointer-events-auto" : "invisible opacity-0 scale-95 -translate-y-1.5 pointer-events-none"
                }`}
              >
                <div className="px-2.5 py-1.5 text-[11px] font-mono text-[#6E5E4F] dark:text-[#A89E93] flex items-center justify-between">
                  <span>Studio Light</span>
                  <span className="text-[10px] opacity-75">{currentDetails.label}</span>
                </div>
                <div className="space-y-0.5">
                  {MOOD_OPTIONS.map((opt) => {
                    const isSelected = selectedMood === opt.key;
                    return (
                      <button
                        type="button"
                        key={opt.key}
                        tabIndex={dropdownOpen ? 0 : -1}
                        onClick={(e) => handleSelectMood(opt.key, e)}
                        className={`group/mood w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                          isSelected
                            ? "bg-[#E5D9C5] dark:bg-[#2B2622] text-[#231D18] dark:text-[#F3ECE2] font-medium shadow-sm"
                            : "text-[#3B3128] dark:text-[#D5CCC0] hover:bg-[#EAE0CE]/70 dark:hover:bg-[#26221E] hover:translate-x-0.5"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex items-center transition-transform duration-200 group-hover/mood:scale-110 group-hover/mood:rotate-6">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-[#6E5E4F] dark:text-[#A89E93]">{opt.sublabel}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#9A4E24] dark:bg-amber-400 shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Touch-Friendly Navigation Bar (< 640px) — Zero Clipping down to 320px */}
        <nav
          aria-label="Mobile navigation"
          className="flex sm:hidden items-center justify-between gap-0.5 xs:gap-1 mt-2 pt-2 border-t border-[#DCD0C0]/60 dark:border-[#2B2622] text-[11px] xs:text-[12px] text-[#3B3128] dark:text-[#D5CCC0] overflow-x-auto no-scrollbar"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`py-1 px-1.5 xs:px-2 rounded-md transition-colors whitespace-nowrap shrink-0 font-medium cursor-pointer ${
                  isActive
                    ? "text-[#9A4E24] dark:text-amber-400 bg-[#E8DEC9]/65 dark:bg-[#28231F]"
                    : "hover:bg-[#E5D9C5]/50 dark:hover:bg-[#24201C] hover:text-[#9A4E24] dark:hover:text-amber-400"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Hairline GPU Reading Progress Bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        style={{ transform: "scaleX(0)" }}
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] origin-left bg-[#9A4E24]/75 dark:bg-amber-400/80 will-change-transform"
      />
    </header>
  );
};

export default Header;
