import { useState } from "react";
import { useTimeOfDay } from "../../context/TimeOfDayContext";
import Tooltip from "../UI/Tooltip";

const StudioDeskVignette = ({ activeKeyIndex = 0, onCycleKey }) => {
  const { activePeriod, cycleMood, studioLampOn, toggleStudioLamp, currentDetails } = useTimeOfDay();
  const [hoverZone, setHoverZone] = useState(null);

  const hoverLabel =
    hoverZone === "window"
      ? "Click window → Shift studio time of day"
      : hoverZone === "lamp"
      ? `Click lamp → Turn ${studioLampOn ? "off" : "on"} desk light`
      : hoverZone === "keyboard"
      ? "Click keyboard → Cycle stack code snippet"
      : null;

  return (
    <div className="relative w-full max-w-full md:max-w-[380px] mx-auto select-none">
      {/* Main Studio Desk & Window Card */}
      <div className="relative rounded-2xl border border-[#D2C3AE] dark:border-stone-800/90 bg-[#E8DEC9]/55 dark:bg-[#1A1816]/90 p-3 sm:p-3.5 shadow-xs">
        {/* Floating Editorial Tooltip Pill when hovering interactive SVG objects */}
        {hoverLabel && (
          <div className="pointer-events-none absolute top-2.5 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1 rounded-lg bg-[#231D18] dark:bg-[#2B2520] text-[#F6EFE2] dark:text-stone-100 border border-[#524336] dark:border-stone-700 shadow-lg text-[11px] font-mono flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97736] dark:bg-amber-400 shrink-0" />
            <span>{hoverLabel}</span>
          </div>
        )}

        <svg
          viewBox="0 0 340 210"
          className="w-full h-auto max-h-[210px] sm:max-h-none mx-auto block overflow-hidden rounded-xl"
          role="img"
          aria-label="Naymul's Studio Desk with Window Light, Articulated Desk Lamp, and Mechanical Keyboard"
        >
          <defs>
            {/* Window Sky Gradients by Time of Day */}
            <linearGradient id="skyMorning" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="55%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDBA74" />
            </linearGradient>
            <linearGradient id="skyAfternoon" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="65%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#FEF9C3" />
            </linearGradient>
            <linearGradient id="skyEvening" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C2D12" />
              <stop offset="45%" stopColor="#EA580C" />
              <stop offset="80%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="skyNight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#090A0F" />
              <stop offset="65%" stopColor="#161925" />
              <stop offset="100%" stopColor="#232738" />
            </linearGradient>

            {/* Interior Window Sunbeam Gradients (Streaming from Window Panes to Desk) */}
            <linearGradient id="sunbeamMorning" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.38" />
              <stop offset="55%" stopColor="#FCD34D" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sunbeamAfternoon" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#E0F2FE" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#FEF9C3" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sunbeamEvening" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.34" />
              <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#FDBA74" stopOpacity="0" />
            </linearGradient>

            {/* Warm Desk Lamp Cone Gradient */}
            <radialGradient id="lampGlowCone" cx="50%" cy="0%" r="85%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>

            {/* Walnut Desk Surface */}
            <linearGradient id="walnutDesk" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={activePeriod === "night" ? "#261E18" : "#6E4F35"} />
              <stop offset="50%" stopColor={activePeriod === "night" ? "#332820" : "#825E40"} />
              <stop offset="100%" stopColor={activePeriod === "night" ? "#1F1813" : "#5A3F29"} />
            </linearGradient>
          </defs>

          {/* ==================== 1. FRAMED STUDIO WINDOW (Top Left - Tap/Click to Shift Time) ==================== */}
          <g
            className="cursor-pointer"
            onClick={cycleMood}
            onMouseEnter={() => setHoverZone("window")}
            onMouseLeave={() => setHoverZone(null)}
          >
            <rect
              x="18"
              y="10"
              width="148"
              height="104"
              rx="4"
              fill={
                activePeriod === "morning"
                  ? "url(#skyMorning)"
                  : activePeriod === "afternoon"
                  ? "url(#skyAfternoon)"
                  : activePeriod === "evening"
                  ? "url(#skyEvening)"
                  : "url(#skyNight)"
              }
              stroke={activePeriod === "night" ? "#3A332C" : "#8C7660"}
              strokeWidth="3.5"
            />

            {activePeriod === "morning" && (
              <circle cx="62" cy="76" r="14" fill="#F59E0B" opacity="0.85" />
            )}
            {activePeriod === "afternoon" && (
              <g>
                <circle cx="122" cy="36" r="11" fill="#FACC15" opacity="0.9" />
                <rect x="44" y="42" width="38" height="9" rx="4.5" fill="#FFFFFF" opacity="0.75" />
              </g>
            )}
            {activePeriod === "evening" && (
              <circle cx="88" cy="82" r="17" fill="#FEF08A" opacity="0.85" />
            )}
            {activePeriod === "night" && (
              <g>
                <circle cx="56" cy="40" r="8" fill="#FDE68A" />
                <circle cx="60" cy="38" r="7" fill="#121520" />
                <circle cx="105" cy="32" r="1.2" fill="#FFFFFF" opacity="0.9" />
                <circle cx="132" cy="48" r="1.4" fill="#FDE68A" opacity="0.85" />
                <circle cx="88" cy="62" r="1" fill="#FFFFFF" opacity="0.75" />
                <circle cx="122" cy="72" r="1.1" fill="#FFFFFF" opacity="0.8" />
              </g>
            )}

            <line
              x1="92"
              y1="10"
              x2="92"
              y2="114"
              stroke={activePeriod === "night" ? "#3A332C" : "#8C7660"}
              strokeWidth="2.5"
            />
            <line
              x1="18"
              y1="62"
              x2="166"
              y2="62"
              stroke={activePeriod === "night" ? "#3A332C" : "#8C7660"}
              strokeWidth="2.5"
            />

            <g stroke={activePeriod === "night" ? "#2B2622" : "#B5A28C"} strokeWidth="2">
              <line x1="20" y1="16" x2="164" y2="16" />
              <line x1="20" y1="22" x2="164" y2="22" />
              <line x1="20" y1="28" x2="164" y2="28" />
              <line x1="154" y1="12" x2="154" y2="54" strokeWidth="1" />
              <circle cx="154" cy="55" r="2" fill="#9A4E24" stroke="none" />
            </g>

            <rect
              x="12"
              y="112"
              width="160"
              height="5"
              rx="1.5"
              fill={activePeriod === "night" ? "#2E2823" : "#7D6752"}
            />
          </g>

          {/* ==================== 1B. INTERIOR WINDOW SUNBEAMS (Soft Rays from Panes onto Desk) ==================== */}
          {activePeriod !== "night" && (
            <g className="pointer-events-none animate-window-rays">
              <polygon
                points="22,30 88,30 155,168 48,168"
                fill={
                  activePeriod === "morning"
                    ? "url(#sunbeamMorning)"
                    : activePeriod === "evening"
                    ? "url(#sunbeamEvening)"
                    : "url(#sunbeamAfternoon)"
                }
              />
              <polygon
                points="96,30 162,30 238,168 164,168"
                fill={
                  activePeriod === "morning"
                    ? "url(#sunbeamMorning)"
                    : activePeriod === "evening"
                    ? "url(#sunbeamEvening)"
                    : "url(#sunbeamAfternoon)"
                }
              />
            </g>
          )}

          {/* ==================== 2. ARTICULATED ARCHITECT DESK LAMP (Right - Tap/Click to Toggle Light) ==================== */}
          <g
            className="cursor-pointer"
            onClick={toggleStudioLamp}
            onMouseEnter={() => setHoverZone("lamp")}
            onMouseLeave={() => setHoverZone(null)}
          >
            {studioLampOn && (
              <g className="pointer-events-none">
                <polygon points="214,62 95,180 315,180" fill="url(#lampGlowCone)" />
                <ellipse
                  cx="205"
                  cy="176"
                  rx="95"
                  ry="10"
                  fill="#F59E0B"
                  opacity={activePeriod === "night" ? "0.28" : "0.16"}
                />
              </g>
            )}

            <ellipse cx="292" cy="168" rx="22" ry="4.5" fill="#292524" stroke="#57534E" strokeWidth="1.2" />
            <rect x="282" y="160" width="20" height="7" rx="2" fill="#44403C" />

            <line x1="292" y1="160" x2="310" y2="96" stroke="#57534E" strokeWidth="4" strokeLinecap="round" />
            <line x1="288" y1="160" x2="306" y2="96" stroke="#78716C" strokeWidth="1.8" strokeLinecap="round" />

            <circle cx="308" cy="94" r="4.5" fill="#D97706" stroke="#292524" strokeWidth="1.2" />

            <line x1="308" y1="94" x2="236" y2="42" stroke="#57534E" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="306" y1="98" x2="238" y2="46" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round" />

            <circle cx="234" cy="42" r="4" fill="#D97706" stroke="#292524" strokeWidth="1.2" />

            <circle
              cx="214"
              cy="60"
              r="7.5"
              fill={studioLampOn ? "#FEF08A" : "#78716C"}
              className={studioLampOn ? "drop-shadow-[0_0_12px_rgba(254,240,138,0.95)]" : ""}
            />

            <path
              d="M 234,42 L 242,48 L 230,68 L 196,54 L 222,38 Z"
              fill={activePeriod === "night" ? "#B45309" : "#292524"}
              stroke="#1C1917"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <rect x="228" y="34" width="6" height="5" rx="1" fill="#D97706" transform="rotate(-20 228 34)" />
          </g>

          {/* ==================== 3. WALNUT ARCHITECT DESK & DESK MAT ==================== */}
          <g>
            <polygon
              points="6,164 334,164 340,186 0,186"
              fill="url(#walnutDesk)"
              stroke={activePeriod === "night" ? "#3A2E25" : "#4A3320"}
              strokeWidth="1.2"
            />
            <rect
              x="0"
              y="186"
              width="340"
              height="8"
              rx="1.5"
              fill={activePeriod === "night" ? "#17120E" : "#3D2919"}
            />

            <polygon
              points="72,167 268,167 274,183 66,183"
              fill={activePeriod === "night" ? "#1C1917" : "#44403C"}
              stroke={activePeriod === "night" ? "#292524" : "#57534E"}
              strokeWidth="0.8"
            />
          </g>

          {/* ==================== 4. WARM STUDIO MUG ON CORK COASTER (Left Desk) ==================== */}
          <g>
            <g className="pointer-events-none">
              <path
                d="M 42,134 Q 39,124 44,116"
                fill="none"
                stroke={activePeriod === "night" ? "#A8A29E" : "#78716C"}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="animate-mug-steam-1"
              />
              <path
                d="M 49,132 Q 52,122 47,113"
                fill="none"
                stroke={activePeriod === "night" ? "#A8A29E" : "#78716C"}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="animate-mug-steam-2"
              />
            </g>
            <ellipse cx="45" cy="174" rx="18" ry="3" fill="#B48352" stroke="#7C532B" strokeWidth="0.8" />
            <path d="M 33,142 L 35,172 Q 45,175 55,172 L 57,142 Z" fill="#E7E0D6" stroke="#78716C" strokeWidth="1.2" />
            <path d="M 34.4,163 L 35,172 Q 45,175 55,172 L 55.6,163 Z" fill="#9A4E24" />
            <path d="M 33,148 C 25,148 25,164 34,164" fill="none" stroke="#D6CEC2" strokeWidth="2.8" strokeLinecap="round" />
            <ellipse cx="45" cy="142" rx="12" ry="2.2" fill="#451A03" stroke="#78716C" strokeWidth="1" />
          </g>

          {/* ==================== 5. 65% CUSTOM MECHANICAL KEYBOARD (Center Desk - Interactive) ==================== */}
          <g
            className="cursor-pointer"
            onClick={onCycleKey}
            onMouseEnter={() => setHoverZone("keyboard")}
            onMouseLeave={() => setHoverZone(null)}
          >
            {(studioLampOn || activePeriod === "night") && (
              <ellipse cx="172" cy="176" rx="68" ry="5" fill="#F59E0B" opacity="0.35" />
            )}

            <polygon
              points="96,154 246,154 252,176 90,176"
              fill={activePeriod === "night" ? "#27272A" : "#D6CFC5"}
              stroke={activePeriod === "night" ? "#52525B" : "#78716C"}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <rect
              x="90"
              y="174"
              width="162"
              height="4"
              rx="1"
              fill={activePeriod === "night" ? "#18181B" : "#8C8275"}
            />

            <g>
              <rect x="100" y="156.5" width="9" height="5" rx="1" fill="#9A4E24" />
              {[...Array(11)].map((_, i) => {
                const isHighlighted = i === activeKeyIndex * 3;
                return (
                  <rect
                    key={`r1-${i}`}
                    x={111 + i * 11}
                    y={isHighlighted ? "157.5" : "156.5"}
                    width="9"
                    height="5"
                    rx="1"
                    fill={
                      isHighlighted
                        ? "#D97706"
                        : activePeriod === "night"
                        ? "#3F3F46"
                        : "#F5F2EB"
                    }
                  />
                );
              })}
              <rect x="232" y="156.5" width="11" height="5" rx="1" fill={activePeriod === "night" ? "#52525B" : "#BFB6A8"} />
            </g>

            <g>
              <rect x="98" y="162.5" width="11" height="5" rx="1" fill={activePeriod === "night" ? "#52525B" : "#BFB6A8"} />
              {[...Array(10)].map((_, i) => (
                <rect
                  key={`r2-${i}`}
                  x={111 + i * 11}
                  y="162.5"
                  width="9"
                  height="5"
                  rx="1"
                  fill={activePeriod === "night" ? "#3F3F46" : "#F5F2EB"}
                />
              ))}
              <rect x="221" y="162.5" width="23" height="5" rx="1" fill="#D97706" />
            </g>

            <g>
              <rect x="96" y="168.5" width="10" height="4.5" rx="1" fill={activePeriod === "night" ? "#52525B" : "#BFB6A8"} />
              <rect x="108" y="168.5" width="10" height="4.5" rx="1" fill={activePeriod === "night" ? "#52525B" : "#BFB6A8"} />
              <rect x="120" y="168.5" width="12" height="4.5" rx="1" fill="#9A4E24" />
              <rect
                x="134"
                y="168.5"
                width="64"
                height="4.5"
                rx="1"
                fill={activePeriod === "night" ? "#52525B" : "#EAE3D7"}
              />
              <rect x="200" y="168.5" width="10" height="4.5" rx="1" fill={activePeriod === "night" ? "#52525B" : "#BFB6A8"} />
              <rect x="212" y="168.5" width="10" height="4.5" rx="1" fill={activePeriod === "night" ? "#3F3F46" : "#F5F2EB"} />
              <rect x="224" y="168.5" width="10" height="4.5" rx="1" fill={activePeriod === "night" ? "#3F3F46" : "#F5F2EB"} />
              <rect x="236" y="168.5" width="10" height="4.5" rx="1" fill={activePeriod === "night" ? "#3F3F46" : "#F5F2EB"} />
            </g>

            <path
              d="M 172,154 L 172,147 C 172,144 195,144 195,147 C 195,150 260,150 280,164"
              fill="none"
              stroke="#78716C"
              strokeWidth="1.8"
              strokeDasharray="3 1.5"
            />
          </g>
        </svg>

        {/* Touch-Friendly Studio Controls Bar at Bottom of Vignette */}
        <div className="mt-2 pt-2.5 border-t border-[#D2C3AE]/80 dark:border-stone-800 flex flex-col gap-2 text-[11.5px] font-mono text-[#4A3E33] dark:text-stone-300">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate">{currentDetails.windowCaption}</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 w-full">
            <Tooltip content="Toggle warm studio desk lamp" position="top" align="left" className="w-full">
              <button
                onClick={toggleStudioLamp}
                className={`w-full px-2.5 py-1.5 min-h-[32px] rounded-lg text-[11.5px] cursor-pointer transition-colors border whitespace-nowrap text-center ${
                  studioLampOn
                    ? "bg-amber-500/20 border-amber-600/45 text-[#9A4E24] dark:text-amber-300 font-medium"
                    : "border-[#C5B49E] dark:border-stone-700 text-[#4A3E33] dark:text-stone-300"
                }`}
              >
                Lamp: {studioLampOn ? "ON" : "OFF"}
              </button>
            </Tooltip>

            <Tooltip content="Shift studio time of day" position="top" align="right" className="w-full">
              <button
                onClick={cycleMood}
                className="w-full px-2.5 py-1.5 min-h-[32px] rounded-lg text-[11.5px] border border-[#C5B49E] dark:border-stone-700 text-[#332B24] dark:text-stone-200 hover:bg-[#DDD0BC]/70 dark:hover:bg-stone-800 cursor-pointer transition-colors whitespace-nowrap text-center"
              >
                {currentDetails.label} ↻
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioDeskVignette;

