import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { flushSync } from "react-dom";
import { FiSun, FiMoon, FiFileText } from "react-icons/fi";
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
  { key: "auto", label: "Auto", sublabel: "Local time", icon: <FiSun className="text-sm text-[#9A4E24] dark:text-amber-400" /> },
  { key: "morning", label: "Morning", sublabel: "5am–12pm", icon: <WiSunrise className="text-lg text-amber-600 dark:text-amber-400" /> },
  { key: "afternoon", label: "Afternoon", sublabel: "12–5pm", icon: <WiDaySunny className="text-lg text-orange-500 dark:text-amber-400" /> },
  { key: "evening", label: "Evening", sublabel: "5–7pm", icon: <WiSunset className="text-lg text-[#8C583A] dark:text-amber-400" /> },
  { key: "night", label: "Night", sublabel: "7pm–5am", icon: <FiMoon className="text-sm text-indigo-400" /> },
];

const PERIOD_ICON = {
  morning: <WiSunrise className="text-[19px] text-amber-700 dark:text-amber-400 shrink-0" />,
  afternoon: <WiDaySunny className="text-[19px] text-orange-600 dark:text-orange-400 shrink-0" />,
  evening: <WiSunset className="text-[19px] text-[#8C4A27] dark:text-amber-400 shrink-0" />,
  night: <FiMoon className="text-[14px] text-indigo-400 shrink-0" />,
};

const Header = ({ onOpenResume, onOpenContact }) => {
  const { selectedMood, setSelectedMood, activePeriod, currentDetails } = useTimeOfDay();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, visible: false });

  const dropdownRef = useRef(null);
  const progressRef = useRef(null);
  const navRef = useRef(null);
  const tabRefs = useRef({});
  const manualScrollLockRef = useRef(false);

  // Measure active tab position for the smooth GPU sliding pill
  const syncSlidingPill = useCallback(() => {
    const navEl = navRef.current;
    const activeEl = activeSection ? tabRefs.current[activeSection] : null;
    if (!navEl || !activeEl) {
      setPillStyle((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      return;
    }
    const left = activeEl.offsetLeft;
    const width = activeEl.offsetWidth;
    setPillStyle((prev) =>
      prev.left === left && prev.width === width && prev.visible
        ? prev
        : { left, width, visible: true }
    );
  }, [activeSection]);

  useLayoutEffect(() => {
    syncSlidingPill();
  }, [syncSlidingPill]);

  useEffect(() => {
    window.addEventListener("resize", syncSlidingPill, { passive: true });
    document.fonts?.ready?.then(syncSlidingPill);
    return () => window.removeEventListener("resize", syncSlidingPill);
  }, [syncSlidingPill]);

  useEffect(() => {
    const onOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const computeActiveSection = useCallback(() => {
    const y = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    if (window.innerHeight + y >= docHeight - 36) return "contact";

    const triggerOffset = 160;
    let current = "";
    for (const { id } of NAV_LINKS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= triggerOffset) {
        current = id;
      }
    }
    return current;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 16);

      if (progressRef.current) {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0;
        progressRef.current.style.transform = `scaleX(${pct})`;
      }

      if (manualScrollLockRef.current) return;
      const next = computeActiveSection();
      setActiveSection((prev) => (prev === next ? prev : next));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [computeActiveSection]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    manualScrollLockRef.current = true;
    smoothScrollToId(id, 88, undefined, (interrupted) => {
      requestAnimationFrame(() => {
        manualScrollLockRef.current = false;
        if (interrupted) {
          setActiveSection(computeActiveSection());
        }
      });
    });
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setActiveSection("");
    manualScrollLockRef.current = true;
    smoothScrollToTop(undefined, (interrupted) => {
      requestAnimationFrame(() => {
        manualScrollLockRef.current = false;
        if (interrupted) {
          setActiveSection(computeActiveSection());
        }
      });
    });
  };

  const handleSelectMood = (key, e) => {
    const root = document.documentElement;
    root.classList.add("vt-mood-switching");
    flushSync(() => setDropdownOpen(false));
    void root.offsetHeight;
    root.classList.remove("vt-mood-switching");
    setSelectedMood(key, e);
  };

  const moodTooltipText =
    selectedMood === "auto"
      ? `Studio Light · Auto (${currentDetails.label})`
      : `Studio Light · ${currentDetails.label}`;

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

          {/* Zone 2: Floating Pill Navigation with GPU Sliding Active Indicator */}
          <nav
            ref={navRef}
            aria-label="Primary navigation"
            className="relative hidden sm:flex items-center gap-0.5 lg:gap-1 p-1 rounded-full border studio-surface-muted shadow-sm"
          >
            {/* Gliding GPU Active Pill */}
            <span
              aria-hidden="true"
              style={{
                width: `${pillStyle.width}px`,
                transform: `translate3d(${pillStyle.left}px, 0, 0)`,
                opacity: pillStyle.visible ? 1 : 0,
              }}
              className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-[#231D18] dark:bg-[#F3ECE2] shadow-sm transition-[transform,width,opacity] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            />

            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[item.id] = el;
                  }}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative z-10 px-2.5 lg:px-3.5 py-1.5 rounded-full text-[12.5px] lg:text-[13.5px] font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? "text-[#F6EFE2] dark:text-[#1C1917]"
                      : "text-[#3B3128] dark:text-[#D5CCC0] hover:text-[#9A4E24] dark:hover:text-amber-400"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Quick Recruiter Actions + Compact Icon-Only Studio Light Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {onOpenResume && (
              <Tooltip content="Preview Executive CV & Download PDF" position="bottom" align="right">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 h-9 rounded-lg border studio-surface-muted text-[12px] font-mono font-medium text-[#231D18] dark:text-[#F3ECE2] hover:border-[#9A4E24] dark:hover:border-amber-400/70 transition-all cursor-pointer whitespace-nowrap"
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
                  className="inline-flex items-center gap-1 px-3 lg:px-3.5 h-9 rounded-lg bg-[#9A4E24] dark:bg-amber-400 text-[#FBF8F3] dark:text-[#1A1612] text-[12px] font-mono font-medium hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <span className="lg:hidden">Hire</span>
                  <span className="hidden lg:inline">Hire me →</span>
                </button>
              </Tooltip>
            )}

            {/* Sleek Compact 36x36 Studio Light Icon Trigger (Zero Width Shift Across Moods) */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <Tooltip content={dropdownOpen ? "" : moodTooltipText} position="bottom" align="right">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-expanded={dropdownOpen}
                  aria-label={moodTooltipText}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg border studio-surface-muted text-[#3B3128] dark:text-[#E2D9CE] hover:border-[#9A4E24] dark:hover:border-amber-400/70 active:scale-[0.96] transition-all cursor-pointer shrink-0"
                >
                  <span key={activePeriod} className="inline-flex items-center animate-mood-icon">
                    {PERIOD_ICON[activePeriod]}
                  </span>
                </button>
              </Tooltip>

              <div
                aria-hidden={!dropdownOpen}
                className={`absolute right-0 mt-2 w-56 rounded-xl border border-[#D2C3AE] dark:border-[#332E29] bg-[#F6EFE2] dark:bg-[#1E1B18] shadow-xl p-1.5 z-50 text-xs origin-top-right transition-[opacity,transform,visibility] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  dropdownOpen ? "visible opacity-100 scale-100 translate-y-0 pointer-events-auto" : "invisible opacity-0 scale-95 -translate-y-1.5 pointer-events-none"
                }`}
              >
                <div className="px-2.5 py-1.5 text-[11px] font-mono text-[#6E5E4F] dark:text-[#A89E93] flex items-center justify-between">
                  <span>Studio Light</span>
                  <span className="text-[10px] opacity-75">
                    {selectedMood === "auto" ? `Auto · ${currentDetails.label}` : currentDetails.label}
                  </span>
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
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-mono text-[10.5px] text-[#6E5E4F] dark:text-[#A89E93]">{opt.sublabel}</span>
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
                className={`py-1 px-1.5 xs:px-2 rounded-md transition-all duration-200 whitespace-nowrap shrink-0 font-medium cursor-pointer ${
                  isActive
                    ? "text-[#F6EFE2] dark:text-[#1C1917] bg-[#231D18] dark:bg-[#F3ECE2]"
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
