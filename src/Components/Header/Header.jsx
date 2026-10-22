import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
import { WiSunset, WiSunrise, WiDaySunny } from "react-icons/wi";
import { useTimeOfDay } from "../../context/TimeOfDayContext";

const Header = () => {
  const { selectedMood, setSelectedMood, activePeriod } = useTimeOfDay();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const moodOptions = [
    { key: "morning", label: "Morning", sublabel: "সকাল", icon: <WiSunrise className="text-lg text-amber-600" /> },
    { key: "afternoon", label: "Afternoon", sublabel: "দুপুর", icon: <WiDaySunny className="text-lg text-orange-500" /> },
    { key: "evening", label: "Evening", sublabel: "সন্ধ্যা", icon: <WiSunset className="text-lg text-[#8C583A] dark:text-amber-400" /> },
    { key: "night", label: "Night", sublabel: "রাত", icon: <FiMoon className="text-sm text-indigo-400" /> },
    { key: "auto", label: "Auto", sublabel: "সময় অনুযায়ী", icon: <FiSun className="text-sm text-stone-500" /> },
  ];

  const currentMoodObj = moodOptions.find((m) => m.key === selectedMood) || moodOptions[2];

  const navLinks = [
    { label: "Systems", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Craft", href: "#about" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="w-full pt-5 sm:pt-8 pb-3 relative z-30">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6">
        {/* Desktop & Tablet 3-Zone Row / Mobile Top Row */}
        <div className="flex items-center justify-between gap-4 sm:gap-8 text-[14px] sm:text-[15px] text-[#3B3128] dark:text-stone-200">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            className="font-serif text-[19px] sm:text-[21px] font-normal text-[#231D18] dark:text-stone-50 tracking-tight whitespace-nowrap shrink-0 py-1"
          >
            Naymul Islam
          </a>

          {/* Zone 2: Desktop & Tablet Single-Line Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 md:gap-8">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1 font-medium text-[#3B3128] dark:text-stone-200 hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Ambient Time-of-Day Selector Pill */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 rounded-full border border-[#CBBBA4] dark:border-stone-700 bg-[#F4ECE0]/85 dark:bg-stone-900/90 text-[12.5px] sm:text-[13px] font-medium text-[#3B3128] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-stone-500 transition-all cursor-pointer whitespace-nowrap shrink-0"
              aria-label="Select ambient time of day"
            >
              {activePeriod === "morning" && <WiSunrise className="text-base text-amber-700 dark:text-amber-400 shrink-0" />}
              {activePeriod === "afternoon" && <WiDaySunny className="text-base text-orange-600 dark:text-orange-400 shrink-0" />}
              {activePeriod === "evening" && <WiSunset className="text-base text-[#6E5644] dark:text-amber-400 shrink-0" />}
              {activePeriod === "night" && <FiMoon className="text-xs text-indigo-400 shrink-0" />}
              <span>{currentMoodObj.label}</span>
              <FiChevronDown
                className={`text-xs text-[#5C4E41] dark:text-stone-400 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#D2C3AE] dark:border-stone-800 bg-[#F6EFE2] dark:bg-[#1E1C1A] shadow-xl p-1.5 z-50 text-xs">
                <div className="px-2.5 py-1.5 text-[11px] font-mono text-[#6E5E4F] dark:text-stone-400">
                  Studio Light
                </div>
                {moodOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      setSelectedMood(opt.key);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 sm:py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedMood === opt.key
                        ? "bg-[#E5D9C5] dark:bg-stone-800 text-[#231D18] dark:text-stone-50 font-medium"
                        : "text-[#3B3128] dark:text-stone-300 hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {opt.icon}
                      <span>{opt.label}</span>
                    </div>
                    <span className="text-[11px] text-[#6E5E4F] dark:text-stone-400">{opt.sublabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Touch-Friendly Navigation Bar (< 640px) */}
        <nav
          aria-label="Mobile navigation"
          className="flex sm:hidden items-center justify-between gap-1.5 mt-3 pt-2.5 border-t border-[#DCD0C0]/70 dark:border-stone-800/80 text-[12.5px] text-[#3B3128] dark:text-stone-200"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1.5 px-2 rounded-md hover:bg-[#E5D9C5]/50 dark:hover:bg-stone-800/60 hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
