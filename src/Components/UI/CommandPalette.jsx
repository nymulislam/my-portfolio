import { useEffect } from "react";
import { FiX, FiSun, FiMoon, FiArrowRight, FiCopy, FiZap, FiExternalLink, FiFileText } from "react-icons/fi";
import { WiSunrise, WiDaySunny, WiSunset } from "react-icons/wi";
import { useTimeOfDay } from "../../context/TimeOfDayContext";
import { PROFILE } from "../../data/portfolioData";

const CommandPalette = ({ isOpen, onClose, onCopyEmail, onCopyPhone, onOpenResume }) => {
  const { selectedMood, setSelectedMood, studioLampOn, toggleStudioLamp } = useTimeOfDay();

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

  const moods = [
    { key: "morning", label: "Morning — Sunbeams & Espresso", icon: <WiSunrise className="text-lg text-amber-500 shrink-0" /> },
    { key: "afternoon", label: "Afternoon — Daylight & Deep Work", icon: <WiDaySunny className="text-lg text-orange-500 shrink-0" /> },
    { key: "evening", label: "Evening — Golden Sunset & Desk Lamp", icon: <WiSunset className="text-lg text-rose-500 shrink-0" /> },
    { key: "night", label: "Night — Starlit Window & Backlit Keys", icon: <FiMoon className="text-sm text-indigo-400 shrink-0" /> },
    { key: "auto", label: "Auto — Sync with System Clock", icon: <FiSun className="text-sm text-stone-500 shrink-0" /> },
  ];

  const jumpLinks = [
    { label: "Go to Systems & Case Studies", href: "#projects" },
    { label: "Go to Experience & Career Timeline", href: "#experience" },
    { label: "Go to Foundations & Craft", href: "#about" },
    { label: "Go to Engineering Essays", href: "#writing" },
    { label: "Go to Contact & Console", href: "#contact" },
  ];

  return (
    <div
      className="animate-modal-backdrop fixed inset-0 z-[80] bg-stone-950/60 dark:bg-black/80 backdrop-blur-xs flex items-end sm:items-start justify-center sm:pt-20 p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="animate-modal-sheet studio-modal-surface max-w-md w-full rounded-t-2xl sm:rounded-2xl border-t sm:border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="studio-modal-header flex items-center justify-between px-4 py-3.5 border-b">
          <span className="text-xs font-mono text-[#7A6E62] dark:text-stone-300">
            Studio Command Palette (⌘K)
          </span>
          <button
            onClick={onClose}
            className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-md text-[#7A6E62] hover:text-[#2B241E] dark:hover:text-white cursor-pointer"
            aria-label="Close palette"
          >
            <FiX className="text-base" />
          </button>
        </div>

        <div className="p-3 sm:p-3.5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Studio Light & Desk Lamp Controls */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono text-[#8C7E70] dark:text-stone-400">
              Studio Window Light & Task Lamp
            </div>
            <button
              onClick={() => {
                toggleStudioLamp();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-left text-[#4A3F35] dark:text-stone-300 hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <FiZap className="text-sm text-amber-500 shrink-0" />
                <span>Toggle Architect Desk Lamp</span>
              </span>
              <span className="text-[10px] font-mono text-[#9A4E24] dark:text-amber-400 shrink-0">
                {studioLampOn ? "ON" : "OFF"}
              </span>
            </button>
            {moods.map((m) => (
              <button
                key={m.key}
                onClick={() => {
                  setSelectedMood(m.key);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-left transition-colors cursor-pointer ${
                  selectedMood === m.key
                    ? "bg-[#E5D9C5] dark:bg-stone-800 text-[#2B241E] dark:text-stone-50 font-medium"
                    : "text-[#4A3F35] dark:text-stone-300 hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/50"
                }`}
              >
                <span className="flex items-center gap-2.5 truncate">
                  {m.icon}
                  <span className="truncate">{m.label}</span>
                </span>
                {selectedMood === m.key && (
                  <span className="text-[10px] font-mono text-[#9A4E24] dark:text-amber-400 shrink-0 ml-2">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Navigation & Direct Actions */}
          <div className="space-y-1 border-t border-[#DCD0C0]/70 dark:border-stone-800/70 pt-3">
            <div className="px-2 py-1 text-[10px] font-mono text-[#8C7E70] dark:text-stone-400">
              Hiring, Resume & Navigation
            </div>
            {onOpenResume && (
              <button
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-[#2B241E] dark:text-stone-100 font-medium bg-[#EAE0CE]/60 dark:bg-stone-800/60 hover:bg-[#E5D9C5] dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 truncate">
                  <FiFileText className="text-[#9A4E24] dark:text-amber-400 shrink-0" />
                  <span className="truncate">Preview Executive CV / Resume</span>
                </span>
                <FiArrowRight className="text-[#9A4E24] dark:text-amber-400 shrink-0 ml-2" />
              </button>
            )}
            {jumpLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-[#4A3F35] dark:text-stone-300 hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/50 transition-colors"
              >
                <span>{item.label}</span>
                <FiArrowRight className="text-[#8C7E70] shrink-0" />
              </a>
            ))}
            <button
              onClick={() => {
                onCopyEmail();
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-[#4A3F35] dark:text-stone-300 hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
            >
              <span className="truncate">Copy Email ({PROFILE.email})</span>
              <FiCopy className="text-[#8C7E70] shrink-0 ml-2" />
            </button>
            {onCopyPhone && (
              <button
                onClick={() => {
                  onCopyPhone();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-[#4A3F35] dark:text-stone-300 hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
              >
                <span className="truncate">Copy WhatsApp ({PROFILE.phoneFormatted})</span>
                <FiCopy className="text-[#8C7E70] shrink-0 ml-2" />
              </button>
            )}
            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-[#4A3F35] dark:text-stone-300 hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/50 transition-colors"
            >
              <span className="truncate">Message on WhatsApp ({PROFILE.phoneFormatted})</span>
              <FiExternalLink className="text-[#8C7E70] shrink-0 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
