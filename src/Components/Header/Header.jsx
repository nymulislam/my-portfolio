import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
import { WiSunset, WiSunrise, WiDaySunny } from "react-icons/wi";
import { useTimeOfDay } from "../../context/TimeOfDayContext";
import Tooltip from "../UI/Tooltip";

const Header = () => {
  const { selectedMood, setSelectedMood, activePeriod, currentDetails } = useTimeOfDay();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const dropdownRef = useRef(null);
  const manualScrollLockRef = useRef(false);
  const manualScrollTimerRef = useRef(null);

  const navLinks = [
    { id: "projects", label: "Systems", href: "#projects" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "about", label: "Craft", href: "#about" },
    { id: "writing", label: "Writing", href: "#writing" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 16);

      // Do not override activeSection while smooth scrolling from a user nav click
      if (manualScrollLockRef.current) {
        return;
      }

      if (scrollY < 140) {
        setActiveSection("");
        return;
      }

      // Check if user has scrolled to the bottom of the page (Footer / Contact)
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 48
      ) {
        setActiveSection("contact");
        return;
      }

      const sectionIds = ["projects", "experience", "about", "writing", "contact"];
      let current = "";
      const triggerLine = scrollY + 180;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const elTop = el.getBoundingClientRect().top + scrollY;
          if (elTop <= triggerLine) {
            current = id;
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (manualScrollTimerRef.current) {
        clearTimeout(manualScrollTimerRef.current);
      }
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    setActiveSection(id);
    manualScrollLockRef.current = true;
    if (manualScrollTimerRef.current) {
      clearTimeout(manualScrollTimerRef.current);
    }

    const headerOffset = 76;
    const targetY = Math.max(
      0,
      el.getBoundingClientRect().top + window.scrollY - headerOffset
    );

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });

    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }

    manualScrollTimerRef.current = setTimeout(() => {
      manualScrollLockRef.current = false;
    }, 750);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setActiveSection("");
    manualScrollLockRef.current = true;
    if (manualScrollTimerRef.current) {
      clearTimeout(manualScrollTimerRef.current);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    manualScrollTimerRef.current = setTimeout(() => {
      manualScrollLockRef.current = false;
    }, 700);
  };

  const moodOptions = [
    { key: "auto", label: "Auto", sublabel: "সময় অনুযায়ী", icon: <FiSun className="text-sm text-[#9A4E24] dark:text-amber-400" /> },
    { key: "morning", label: "Morning", sublabel: "সকাল", icon: <WiSunrise className="text-lg text-amber-600 dark:text-amber-400" /> },
    { key: "afternoon", label: "Afternoon", sublabel: "দুপুর", icon: <WiDaySunny className="text-lg text-orange-500 dark:text-amber-400" /> },
    { key: "evening", label: "Evening", sublabel: "সন্ধ্যা", icon: <WiSunset className="text-lg text-[#8C583A] dark:text-amber-400" /> },
    { key: "night", label: "Night", sublabel: "রাত", icon: <FiMoon className="text-sm text-indigo-400" /> },
  ];

  const currentMoodObj = moodOptions.find((m) => m.key === selectedMood) || moodOptions[0];
  const buttonMoodLabel =
    selectedMood === "auto"
      ? `Auto · ${currentDetails.label}`
      : currentMoodObj.label;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "py-2.5 sm:py-3 bg-[#F6EFE2]/90 dark:bg-[#171513]/90 backdrop-blur-md border-b border-[#D8CBB8]/85 dark:border-[#2B2622] shadow-2xs"
          : "pt-4 sm:pt-7 pb-2.5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[880px] mx-auto px-4 sm:px-6">
        {/* 3-Zone Editorial Top Bar */}
        <div className="flex items-center justify-between gap-4 sm:gap-8 text-[14px] sm:text-[14.5px] text-[#3B3128] dark:text-[#DFD7CC]">
          {/* Zone 1: Minimal Serif N Monogram Badge matching the Favicon */}
          <Tooltip content="Naymul Islam · Home" position="bottom" align="left">
            <a
              href="#home"
              onClick={handleHomeClick}
              aria-label="Naymul Islam — Home"
              className="group relative inline-flex items-center justify-center w-9 h-9 sm:w-9.5 sm:h-9.5 rounded-[10px] bg-[#1C1917] dark:bg-[#221F1C] border border-[#362F2A] dark:border-[#38322C] shadow-2xs hover:border-[#9A4E24] dark:hover:border-amber-400/70 transition-all shrink-0"
            >
              <svg
                viewBox="0 0 64 64"
                fill="none"
                className="w-6 h-6 transition-transform duration-150 group-hover:scale-105"
                aria-hidden="true"
              >
                <path
                  d="M18 46V18H24.2L40.5 38.2V18H45.5V46H39.6L23 25.4V46H18Z"
                  fill="#F3ECE2"
                />
                <circle cx="50.5" cy="42.5" r="3.8" fill="#C85A32" />
              </svg>
            </a>
          </Tooltip>

          {/* Zone 2: Desktop & Tablet Single-Line Navigation Links with Active Section Highlight */}
          <nav
            aria-label="Primary navigation"
            className="hidden sm:flex items-center gap-6 md:gap-7"
          >
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`relative py-1 font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? "text-[#9A4E24] dark:text-amber-400"
                      : "text-[#3B3128] dark:text-[#D5CCC0] hover:text-[#9A4E24] dark:hover:text-amber-400"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#9A4E24] dark:bg-amber-400 transition-all duration-200 ${
                      isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Ambient Time-of-Day Selector */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 min-h-[36px] sm:min-h-0 rounded-lg border border-[#CBBBA4] dark:border-[#332E29] bg-[#F4ECE0]/90 dark:bg-[#201D1A]/95 text-[12.5px] font-mono font-medium text-[#3B3128] dark:text-[#E2D9CE] hover:border-[#9A4E24] dark:hover:border-amber-400/70 transition-all cursor-pointer whitespace-nowrap shrink-0"
              aria-label="Select ambient time of day"
            >
              {activePeriod === "morning" && <WiSunrise className="text-base text-amber-700 dark:text-amber-400 shrink-0" />}
              {activePeriod === "afternoon" && <WiDaySunny className="text-base text-orange-600 dark:text-orange-400 shrink-0" />}
              {activePeriod === "evening" && <WiSunset className="text-base text-[#6E5644] dark:text-amber-400 shrink-0" />}
              {activePeriod === "night" && <FiMoon className="text-xs text-indigo-400 shrink-0" />}
              <span>{buttonMoodLabel}</span>
              <FiChevronDown
                className={`text-xs text-[#5C4E41] dark:text-[#A89E93] transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#D2C3AE] dark:border-[#332E29] bg-[#F6EFE2] dark:bg-[#1E1B18] shadow-xl p-1.5 z-50 text-xs">
                <div className="px-2.5 py-1.5 text-[11px] font-mono text-[#6E5E4F] dark:text-[#A89E93]">
                  Studio Light
                </div>
                {moodOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setSelectedMood(opt.key);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedMood === opt.key
                        ? "bg-[#E5D9C5] dark:bg-[#2B2622] text-[#231D18] dark:text-[#F3ECE2] font-medium"
                        : "text-[#3B3128] dark:text-[#D5CCC0] hover:bg-[#EAE0CE]/60 dark:hover:bg-[#26221E]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <span>{opt.label}</span>
                    </div>
                    <span className="text-[11px] text-[#6E5E4F] dark:text-[#A89E93]">{opt.sublabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Touch-Friendly Navigation Bar (< 640px) */}
        <nav
          aria-label="Mobile navigation"
          className="flex sm:hidden items-center justify-between gap-1 mt-2 pt-2 border-t border-[#DCD0C0]/60 dark:border-[#2B2622] text-[12px] text-[#3B3128] dark:text-[#D5CCC0]"
        >
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`py-1 px-2 rounded-md transition-colors whitespace-nowrap shrink-0 font-medium cursor-pointer ${
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
    </header>
  );
};

export default Header;
