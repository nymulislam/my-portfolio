import { flushSync } from "react-dom";
import {
  FiX,
  FiSun,
  FiMoon,
  FiArrowRight,
  FiCopy,
  FiZap,
  FiExternalLink,
  FiFileText,
  FiDownload,
  FiMail,
} from "react-icons/fi";
import { WiSunrise, WiDaySunny, WiSunset } from "react-icons/wi";
import ModalShell from "./ModalShell";
import { useTimeOfDay } from "../../context/TimeOfDayContext";
import { PROFILE } from "../../data/portfolioData";
import { smoothScrollToId } from "../../utils/smoothScroll";

const ROW_CLASS =
  "w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-left text-[#4A3F35] dark:text-stone-300 hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/50 transition-colors cursor-pointer";

const MOODS = [
  { key: "morning", label: "Morning — Sunbeams & Espresso", icon: <WiSunrise className="text-lg text-amber-500 shrink-0" /> },
  { key: "afternoon", label: "Afternoon — Daylight & Deep Work", icon: <WiDaySunny className="text-lg text-orange-500 shrink-0" /> },
  { key: "evening", label: "Evening — Golden Sunset & Desk Lamp", icon: <WiSunset className="text-lg text-rose-500 shrink-0" /> },
  { key: "night", label: "Night — Starlit Window & Backlit Keys", icon: <FiMoon className="text-sm text-indigo-400 shrink-0" /> },
  { key: "auto", label: "Auto — Sync with System Clock", icon: <FiSun className="text-sm text-stone-500 shrink-0" /> },
];

const JUMP_LINKS = [
  { id: "projects", label: "Go to Systems & Case Studies" },
  { id: "experience", label: "Go to Engineering Experience" },
  { id: "about", label: "Go to Foundations & Craft" },
  { id: "writing", label: "Go to Engineering Essays" },
  { id: "contact", label: "Go to Contact & Console" },
];

const CommandPalette = ({
  isOpen,
  onClose,
  onCopyEmail,
  onCopyPhone,
  onOpenResume,
  onDownloadPdf,
  onOpenContact,
}) => {
  const { selectedMood, setSelectedMood, studioLampOn, toggleStudioLamp } = useTimeOfDay();

  const runAndClose = (fn) => () => {
    onClose();
    fn?.();
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="command-palette-title"
      alignClass="items-end sm:items-start sm:pt-20"
      panelClass="overflow-hidden"
    >
      <div className="studio-modal-header flex items-center justify-between px-4 py-3.5 border-b">
        <span id="command-palette-title" className="text-xs font-mono text-[#7A6E62] dark:text-stone-300">
          Studio Command Palette (⌘K)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 min-h-[34px] min-w-[34px] flex items-center justify-center rounded-md text-[#7A6E62] hover:text-[#2B241E] dark:hover:text-white cursor-pointer"
          aria-label="Close palette"
        >
          <FiX className="text-base" />
        </button>
      </div>

      <div className="p-3 sm:p-3.5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
        <div className="space-y-1">
          <div className="px-2 py-1 text-[10px] font-mono text-[#8C7E70] dark:text-stone-400">
            Studio Window Light &amp; Task Lamp
          </div>
          <button type="button" onClick={runAndClose(toggleStudioLamp)} className={ROW_CLASS}>
            <span className="flex items-center gap-2.5">
              <FiZap className="text-sm text-amber-500 shrink-0" />
              <span>Toggle Architect Desk Lamp</span>
            </span>
            <span className="text-[10px] font-mono text-[#9A4E24] dark:text-amber-400 shrink-0">
              {studioLampOn ? "ON" : "OFF"}
            </span>
          </button>

          {MOODS.map((m) => (
            <button
              type="button"
              key={m.key}
              onClick={(e) => {
                const root = document.documentElement;
                root.classList.add("vt-mood-switching");
                flushSync(onClose);
                void root.offsetHeight;
                root.classList.remove("vt-mood-switching");
                setSelectedMood(m.key, e);
              }}
              className={`${ROW_CLASS} ${
                selectedMood === m.key
                  ? "bg-[#E5D9C5] dark:bg-stone-800 text-[#2B241E] dark:text-stone-50 font-medium"
                  : ""
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

        <div className="space-y-1 border-t border-[#DCD0C0]/70 dark:border-stone-800/70 pt-3">
          <div className="px-2 py-1 text-[10px] font-mono text-[#8C7E70] dark:text-stone-400">
            Hiring, Resume &amp; Navigation
          </div>

          {onDownloadPdf && (
            <button
              type="button"
              onClick={runAndClose(onDownloadPdf)}
              className="w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-[#F6EFE2] dark:text-stone-900 font-medium bg-[#231D18] dark:bg-stone-100 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span className="flex items-center gap-2 truncate">
                <FiDownload className="shrink-0" />
                <span className="truncate">Download CV / Resume (PDF)</span>
              </span>
              <FiArrowRight className="shrink-0 ml-2" />
            </button>
          )}

          {onOpenResume && (
            <button
              type="button"
              onClick={runAndClose(onOpenResume)}
              className="w-full flex items-center justify-between px-3 py-2.5 sm:py-2 min-h-[40px] sm:min-h-0 rounded-lg text-[#2B241E] dark:text-stone-100 font-medium bg-[#EAE0CE]/60 dark:bg-stone-800/60 hover:bg-[#E5D9C5] dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 truncate">
                <FiFileText className="text-[#9A4E24] dark:text-amber-400 shrink-0" />
                <span className="truncate">Preview Executive CV / Resume</span>
              </span>
              <FiArrowRight className="text-[#9A4E24] dark:text-amber-400 shrink-0 ml-2" />
            </button>
          )}

          {onOpenContact && (
            <button type="button" onClick={runAndClose(onOpenContact)} className={ROW_CLASS}>
              <span className="flex items-center gap-2 truncate">
                <FiMail className="text-[#9A4E24] dark:text-amber-400 shrink-0" />
                <span className="truncate">Hire / Send a Direct Message</span>
              </span>
              <FiArrowRight className="text-[#8C7E70] shrink-0 ml-2" />
            </button>
          )}

          {JUMP_LINKS.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={runAndClose(() => smoothScrollToId(item.id))}
              className={ROW_CLASS}
            >
              <span>{item.label}</span>
              <FiArrowRight className="text-[#8C7E70] shrink-0" />
            </button>
          ))}

          <button type="button" onClick={runAndClose(onCopyEmail)} className={ROW_CLASS}>
            <span className="truncate">Copy Email ({PROFILE.email})</span>
            <FiCopy className="text-[#8C7E70] shrink-0 ml-2" />
          </button>

          {onCopyPhone && (
            <button type="button" onClick={runAndClose(onCopyPhone)} className={ROW_CLASS}>
              <span className="truncate">Copy WhatsApp ({PROFILE.phoneFormatted})</span>
              <FiCopy className="text-[#8C7E70] shrink-0 ml-2" />
            </button>
          )}

          <a href={PROFILE.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onClose} className={ROW_CLASS}>
            <span className="truncate">Message on WhatsApp ({PROFILE.phoneFormatted})</span>
            <FiExternalLink className="text-[#8C7E70] shrink-0 ml-2" />
          </a>
        </div>
      </div>
    </ModalShell>
  );
};

export default CommandPalette;
