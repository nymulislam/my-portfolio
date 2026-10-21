import { useTimeOfDay } from "../../context/TimeOfDayContext";

const RooftopSkyline = () => {
  const { activePeriod } = useTimeOfDay();

  return (
    <div className="relative w-full overflow-hidden mt-16 select-none border-t border-stone-200/40 dark:border-stone-800/40">
      {/* Sky Backdrop with Dynamic Lighting depending on Time of Day */}
      <div
        className={`w-full h-40 sm:h-56 md:h-72 transition-colors duration-500 relative flex items-end justify-center ${
          activePeriod === "morning"
            ? "bg-gradient-to-t from-amber-100/60 via-orange-50/30 to-transparent"
            : activePeriod === "evening"
            ? "bg-gradient-to-t from-orange-200/50 via-amber-100/30 to-transparent"
            : activePeriod === "night"
            ? "bg-gradient-to-t from-stone-900/90 via-stone-950/80 to-stone-950"
            : "bg-gradient-to-t from-stone-100/40 via-stone-50/20 to-transparent"
        }`}
      >
        {/* Night Stars (visible at night) */}
        {activePeriod === "night" && (
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <span className="absolute top-8 left-1/4 w-1 h-1 rounded-full bg-white animate-pulse"></span>
            <span className="absolute top-12 left-1/2 w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse"></span>
            <span className="absolute top-6 right-1/3 w-1 h-1 rounded-full bg-white animate-pulse"></span>
            <span className="absolute top-16 right-1/5 w-1 h-1 rounded-full bg-amber-100"></span>
          </div>
        )}

        {/* Birds flying across sky */}
        <div className="absolute top-6 left-1/3 flex gap-4 opacity-40 dark:opacity-30">
          <svg width="18" height="10" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 2,10 Q 7,2 12,8 Q 17,2 22,10" />
          </svg>
          <svg width="14" height="8" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 2,10 Q 7,2 12,8 Q 17,2 22,10" />
          </svg>
        </div>

        {/* SVG Dhaka Rooftop Skyline */}
        <svg
          viewBox="0 0 1200 240"
          className="w-full h-auto max-h-72 object-cover object-bottom"
          preserveAspectRatio="none"
        >
          {/* Distant background buildings */}
          <g className="fill-stone-300/50 dark:fill-stone-800/50">
            <rect x="50" y="90" width="80" height="150" />
            <rect x="150" y="70" width="110" height="170" />
            <rect x="280" y="100" width="90" height="140" />
            <rect x="390" y="80" width="130" height="160" />
            <rect x="540" y="110" width="100" height="130" />
            <rect x="660" y="60" width="140" height="180" />
            <rect x="820" y="85" width="100" height="155" />
            <rect x="940" y="75" width="120" height="165" />
            <rect x="1080" y="95" width="100" height="145" />
          </g>

          {/* Distant building window slots */}
          <g className="fill-stone-400/40 dark:fill-stone-700/40">
            <rect x="170" y="90" width="8" height="12" />
            <rect x="190" y="90" width="8" height="12" />
            <rect x="210" y="90" width="8" height="12" />
            <rect x="170" y="115" width="8" height="12" />
            <rect x="190" y="115" width="8" height="12" />
            <rect x="210" y="115" width="8" height="12" />

            <rect x="680" y="80" width="10" height="14" />
            <rect x="710" y="80" width="10" height="14" />
            <rect x="740" y="80" width="10" height="14" />
            <rect x="680" y="105" width="10" height="14" />
            <rect x="710" y="105" width="10" height="14" />
            <rect x="740" y="105" width="10" height="14" />
          </g>

          {/* Lush Green Rooftop Trees & foliage */}
          <g className="fill-emerald-800/70 dark:fill-emerald-950/80">
            <circle cx="120" cy="140" r="35" />
            <circle cx="340" cy="150" r="40" />
            <circle cx="580" cy="160" r="32" />
            <circle cx="780" cy="150" r="38" />
            <circle cx="1020" cy="155" r="36" />
          </g>

          {/* Midground Rooftop Concrete Parapets & Buildings */}
          <g className="fill-[#8C827A] dark:fill-[#2B2724]">
            {/* Left pillar */}
            <rect x="0" y="120" width="130" height="120" />
            {/* Main center roof wall */}
            <rect x="130" y="150" width="600" height="90" />
            {/* Right roof platform */}
            <rect x="730" y="140" width="220" height="100" />
            {/* Rooftop room structure on the right */}
            <rect x="950" y="100" width="250" height="140" />
          </g>

          {/* Overgrown roof ledge vegetation */}
          <g className="fill-emerald-700/80 dark:fill-emerald-900/90">
            <path d="M 940,110 Q 980,85 1020,105 Q 1060,80 1100,105 L 1200,100 L 1200,120 L 940,120 Z" />
          </g>

          {/* Black Water Tanks (Iconic Dhaka rooftop feature) */}
          <g className="fill-[#1A1816] dark:fill-[#0F0E0D]">
            {/* Tank 1 */}
            <rect x="230" y="100" width="55" height="60" rx="6" />
            <line x1="230" y1="115" x2="285" y2="115" stroke="#333" strokeWidth="2" />
            <line x1="230" y1="130" x2="285" y2="130" stroke="#333" strokeWidth="2" />
            <line x1="230" y1="145" x2="285" y2="145" stroke="#333" strokeWidth="2" />
            {/* Tank 2 */}
            <rect x="295" y="110" width="50" height="50" rx="5" />
            <line x1="295" y1="125" x2="345" y2="125" stroke="#333" strokeWidth="2" />
            <line x1="295" y1="140" x2="345" y2="140" stroke="#333" strokeWidth="2" />

            {/* Connecting Water Pipes */}
            <path d="M 285,115 L 320,115 L 320,160" fill="none" stroke="#78716C" strokeWidth="3" />
          </g>

          {/* Clothesline with hanging laundry */}
          <g>
            {/* Bamboo/metal poles */}
            <line x1="390" y1="120" x2="390" y2="160" stroke="#57534E" strokeWidth="3" />
            <line x1="475" y1="125" x2="475" y2="160" stroke="#57534E" strokeWidth="3" />
            {/* The string */}
            <path d="M 390,125 Q 432,133 475,130" fill="none" stroke="#44403C" strokeWidth="1.5" />
            {/* Clothes drying */}
            <rect x="400" y="130" width="16" height="24" fill="#C2410C" rx="2" />
            <rect x="420" y="132" width="18" height="22" fill="#0284C7" rx="2" />
            <rect x="442" y="131" width="14" height="20" fill="#D97706" rx="2" />
          </g>

          {/* Potted plants on parapet (Tob) */}
          <g>
            {/* Pot 1 on left roof */}
            <polygon points="40,120 48,105 72,105 80,120" fill="#9A3412" />
            <circle cx="60" cy="95" r="14" fill="#15803D" />

            {/* Pot 2 near right room */}
            <polygon points="865,140 872,125 892,125 900,140" fill="#9A3412" />
            <circle cx="882" cy="118" r="12" fill="#15803D" />
          </g>

          {/* Rooftop Room Warm Lit Window (Key artistic focal point) */}
          <g>
            <rect
              x="990"
              y="125"
              width="26"
              height="44"
              fill={activePeriod === "night" ? "#F59E0B" : "#FDE68A"}
              stroke="#44403C"
              strokeWidth="3"
              className={activePeriod === "night" ? "drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" : ""}
            />
            {/* Window window panes */}
            <line x1="1003" y1="125" x2="1003" y2="169" stroke="#44403C" strokeWidth="1.5" />
            <line x1="990" y1="140" x2="1016" y2="140" stroke="#44403C" strokeWidth="1.5" />
            <line x1="990" y1="155" x2="1016" y2="155" stroke="#44403C" strokeWidth="1.5" />

            {/* Window 2 */}
            <rect
              x="1035"
              y="125"
              width="26"
              height="44"
              fill={activePeriod === "night" ? "#F59E0B" : "#FDE68A"}
              stroke="#44403C"
              strokeWidth="3"
              className={activePeriod === "night" ? "drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" : ""}
            />
            <line x1="1048" y1="125" x2="1048" y2="169" stroke="#44403C" strokeWidth="1.5" />
            <line x1="1035" y1="140" x2="1061" y2="140" stroke="#44403C" strokeWidth="1.5" />
            <line x1="1035" y1="155" x2="1061" y2="155" stroke="#44403C" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default RooftopSkyline;
