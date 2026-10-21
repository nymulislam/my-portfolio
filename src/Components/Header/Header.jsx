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
    { key: "morning", label: "Morning", sublabel: "সকাল", icon: <WiSunrise className="text-xl text-amber-500" /> },
    { key: "afternoon", label: "Afternoon", sublabel: "দুপুর", icon: <WiDaySunny className="text-xl text-orange-500" /> },
    { key: "evening", label: "Evening", sublabel: "সন্ধ্যা", icon: <WiSunset className="text-xl text-rose-500" /> },
    { key: "night", label: "Night", sublabel: "রাত", icon: <FiMoon className="text-base text-indigo-400" /> },
    { key: "auto", label: "System Auto", sublabel: "স্বয়ংক্রিয়", icon: <FiSun className="text-base text-stone-500" /> },
  ];

  const currentMoodObj = moodOptions.find((m) => m.key === selectedMood) || moodOptions[2];

  return (
    <header className="w-full pt-8 pb-4 relative z-30">
      <div className="max-w-2xl mx-auto px-6 flex items-center justify-end gap-6 sm:gap-8 text-sm text-stone-700 dark:text-stone-300">
        {/* Navigation Links */}
        <nav className="flex items-center gap-5 sm:gap-7">
          <a
            href="#home"
            className="text-stone-900 dark:text-stone-100 font-medium border-b border-stone-800 dark:border-stone-200 pb-0.5"
          >
            Home
          </a>
          <a href="#writing" className="hover:text-stone-950 dark:hover:text-white transition-colors">
            Writing
          </a>
          <a href="#projects" className="hover:text-stone-950 dark:hover:text-white transition-colors">
            Projects
          </a>
          <a href="#about" className="hover:text-stone-950 dark:hover:text-white transition-colors">
            About
          </a>
        </nav>

        {/* Time of Day Dropdown Pill */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-300/80 dark:border-stone-700/80 bg-stone-100/50 dark:bg-stone-900/60 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-stone-400 dark:hover:border-stone-600 transition-all shadow-xs"
            aria-label="Select ambient time of day"
          >
            {activePeriod === "morning" && <WiSunrise className="text-base text-amber-600" />}
            {activePeriod === "afternoon" && <WiDaySunny className="text-base text-orange-500" />}
            {activePeriod === "evening" && <WiSunset className="text-base text-rose-500" />}
            {activePeriod === "night" && <FiMoon className="text-xs text-indigo-400" />}
            <span className="capitalize">{currentMoodObj.label}</span>
            <FiChevronDown className="text-xs text-stone-500 ml-0.5" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-stone-200 dark:border-stone-800 bg-[#FAF7F0] dark:bg-[#1E1C1A] shadow-xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-stone-400">
                Time of Day Ambient
              </div>
              {moodOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    setSelectedMood(opt.key);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                    selectedMood === opt.key
                      ? "bg-stone-200/80 dark:bg-stone-800 text-stone-950 dark:text-stone-50 font-medium"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </div>
                  <span className="text-[11px] font-bangla text-stone-400">
                    {opt.sublabel}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
