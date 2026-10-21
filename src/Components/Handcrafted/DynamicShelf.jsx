import { useTimeOfDay } from "../../context/TimeOfDayContext";

const DynamicShelf = () => {
  const { activePeriod } = useTimeOfDay();

  return (
    <div className="flex flex-col items-center absolute -top-8 sm:-top-10 right-2 sm:right-6 lg:right-12 z-20 select-none scale-75 sm:scale-90 md:scale-100 origin-top-right transition-all duration-500">
      {/* Objects resting on top of the shelf */}
      <div className="relative flex items-end justify-center gap-3.5 mb-[-2px] h-24">
        {/* ================= MORNING: Espresso Cup with Steam + Desk Plant ================= */}
        {activePeriod === "morning" && (
          <div className="flex items-end gap-3 animate-in fade-in zoom-in-95 duration-500">
            {/* Potted succulent plant */}
            <div className="relative flex flex-col items-center">
              <svg width="34" height="36" viewBox="0 0 34 36" className="drop-shadow-sm">
                {/* Succulent leaves */}
                <ellipse cx="17" cy="14" rx="5" ry="9" fill="#15803D" />
                <ellipse cx="12" cy="16" rx="4" ry="7" fill="#16A34A" transform="rotate(-30 12 16)" />
                <ellipse cx="22" cy="16" rx="4" ry="7" fill="#16A34A" transform="rotate(30 22 16)" />
                <ellipse cx="17" cy="18" rx="4" ry="6" fill="#22C55E" />
                {/* Terracotta pot */}
                <polygon points="6,22 10,36 24,36 28,22" fill="#C2410C" />
                <rect x="5" y="20" width="24" height="3" rx="1.5" fill="#9A3412" />
              </svg>
            </div>

            {/* Morning Espresso cup with saucer & steam */}
            <div className="relative flex flex-col items-center">
              {/* Rising steam */}
              <div className="absolute -top-10 flex justify-center w-full pointer-events-none">
                <span className="w-1.5 h-6 rounded-full bg-stone-300/60 dark:bg-stone-400/40 blur-[1px] animate-steam-1"></span>
                <span className="w-1.5 h-7 rounded-full bg-stone-200/50 dark:bg-stone-400/30 blur-[1.5px] animate-steam-2 mx-1"></span>
              </div>

              {/* Ceramic cup & saucer */}
              <svg width="42" height="32" viewBox="0 0 42 32" className="drop-shadow-md">
                {/* Saucer */}
                <ellipse cx="21" cy="29" rx="19" ry="3" fill="#D6D3D1" stroke="#A8A29E" strokeWidth="1" />
                {/* Cup Body */}
                <path d="M 10,14 Q 10,27 21,27 Q 32,27 32,14 Z" fill="#F5F5F4" stroke="#D6D3D1" strokeWidth="1" />
                {/* Espresso liquid */}
                <ellipse cx="21" cy="14" rx="10" ry="2.5" fill="#451A03" />
                {/* Handle */}
                <path d="M 31,17 C 36,17 36,24 31,24" fill="none" stroke="#D6D3D1" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}

        {/* ================= AFTERNOON: Developer Notebook, Glasses & Tumbler ================= */}
        {activePeriod === "afternoon" && (
          <div className="flex items-end gap-3 animate-in fade-in zoom-in-95 duration-500">
            {/* Water Tumbler with Lemon / Ice */}
            <div className="relative flex flex-col items-center">
              <svg width="26" height="42" viewBox="0 0 26 42" className="drop-shadow-md">
                {/* Glass */}
                <path d="M 4,4 L 6,40 L 20,40 L 22,4 Z" fill="none" stroke="#A8A29E" strokeWidth="1.5" />
                {/* Water */}
                <path d="M 5,14 L 6,39 L 20,39 L 21,14 Z" fill="#38BDF8" fillOpacity="0.35" />
                {/* Ice cube */}
                <rect x="9" y="24" width="7" height="7" rx="1" fill="#FFFFFF" fillOpacity="0.6" transform="rotate(15 12 27)" />
              </svg>
            </div>

            {/* Open Developer Notebook with Glasses */}
            <div className="relative flex flex-col items-center">
              <svg width="58" height="38" viewBox="0 0 58 38" className="drop-shadow-md">
                {/* Notebook cover & pages */}
                <polygon points="4,24 28,18 52,24 50,35 28,31 6,35" fill="#FAF5EE" stroke="#A8A29E" strokeWidth="1" />
                <line x1="28" y1="18" x2="28" y2="31" stroke="#78716C" strokeWidth="1.5" />
                {/* Code lines */}
                <line x1="10" y1="23" x2="24" y2="21" stroke="#D6D3D1" strokeWidth="1" />
                <line x1="10" y1="26" x2="22" y2="24" stroke="#D6D3D1" strokeWidth="1" />
                <line x1="32" y1="21" x2="46" y2="23" stroke="#D6D3D1" strokeWidth="1" />
                <line x1="32" y1="24" x2="44" y2="26" stroke="#D6D3D1" strokeWidth="1" />

                {/* Developer Eyeglasses on notebook */}
                <circle cx="20" cy="18" r="6" fill="none" stroke="#44403C" strokeWidth="1.5" />
                <circle cx="36" cy="18" r="6" fill="none" stroke="#44403C" strokeWidth="1.5" />
                <line x1="26" y1="18" x2="30" y2="18" stroke="#44403C" strokeWidth="1.5" />
                {/* Pen */}
                <line x1="48" y1="12" x2="56" y2="34" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}

        {/* ================= EVENING: Classic Tea Kettle & Steaming Doodh Cha ================= */}
        {activePeriod === "evening" && (
          <div className="flex items-end gap-3.5 animate-in fade-in zoom-in-95 duration-500">
            {/* Glass Cup with Steaming Milk Tea */}
            <div className="relative flex flex-col items-center">
              {/* Animated Steam */}
              <div className="absolute -top-11 flex justify-center w-full pointer-events-none">
                <span className="w-1.5 h-7 rounded-full bg-stone-300/60 dark:bg-stone-400/40 blur-[1px] animate-steam-1"></span>
                <span className="w-2 h-9 rounded-full bg-stone-200/50 dark:bg-stone-400/30 blur-[1.5px] animate-steam-2 mx-1"></span>
                <span className="w-1.5 h-6 rounded-full bg-stone-300/60 dark:bg-stone-400/40 blur-[1px] animate-steam-3"></span>
              </div>

              {/* Ribbed Chai Glass */}
              <div className="relative w-8 h-13 rounded-b-md border-2 border-stone-400/40 bg-gradient-to-t from-amber-900/80 via-amber-700/60 to-amber-500/30 overflow-hidden shadow-md">
                <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-[#B45309] via-[#D97706] to-[#F59E0B]/80 opacity-90"></div>
                <div className="absolute inset-0 flex justify-between px-1 opacity-40">
                  <div className="w-[1px] h-full bg-white/70"></div>
                  <div className="w-[1px] h-full bg-white/70"></div>
                </div>
              </div>
            </div>

            {/* Vintage Metal Kettle (Ketli) */}
            <div className="relative w-18 h-18">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                <path d="M 30,50 C 30,10 70,10 70,50" fill="none" stroke="#292524" strokeWidth="6" strokeLinecap="round" />
                <path d="M 25,50 Q 15,75 25,90 L 75,90 Q 85,75 75,50 Z" fill="url(#kettleGradDynamic)" stroke="#1C1917" strokeWidth="2" />
                <path d="M 22,65 Q 10,60 12,45 L 18,45 Q 16,58 25,72 Z" fill="url(#kettleGradDynamic)" stroke="#1C1917" strokeWidth="1.5" />
                <ellipse cx="50" cy="50" rx="24" ry="7" fill="#44403C" stroke="#1C1917" strokeWidth="1.5" />
                <circle cx="50" cy="45" r="4" fill="#78716C" stroke="#1C1917" strokeWidth="1" />
                <defs>
                  <linearGradient id="kettleGradDynamic" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A8A29E" />
                    <stop offset="50%" stopColor="#78716C" />
                    <stop offset="100%" stopColor="#292524" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        )}

        {/* ================= NIGHT: Glowing Desk Lamp + Studio Headphones ================= */}
        {activePeriod === "night" && (
          <div className="flex items-end gap-3.5 animate-in fade-in zoom-in-95 duration-500">
            {/* Studio Developer Headphones */}
            <div className="relative flex flex-col items-center">
              <svg width="36" height="38" viewBox="0 0 36 38" className="drop-shadow-md">
                {/* Headband */}
                <path d="M 6,24 C 6,6 30,6 30,24" fill="none" stroke="#78716C" strokeWidth="3" strokeLinecap="round" />
                {/* Left Ear cup */}
                <rect x="3" y="20" width="7" height="15" rx="3.5" fill="#292524" stroke="#57534E" strokeWidth="1.5" />
                {/* Right Ear cup */}
                <rect x="26" y="20" width="7" height="15" rx="3.5" fill="#292524" stroke="#57534E" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Glowing Desk Lamp */}
            <div className="relative flex flex-col items-center">
              {/* Warm light cone radiating downward onto the shelf */}
              <div className="absolute top-10 -left-6 w-24 h-16 bg-gradient-to-b from-amber-300/40 via-amber-400/20 to-transparent pointer-events-none blur-xs [clip-path:polygon(40%_0%,60%_0%,100%_100%,0%_100%)]"></div>

              <svg width="46" height="52" viewBox="0 0 46 52" className="drop-shadow-lg relative z-10">
                {/* Base */}
                <rect x="18" y="47" width="16" height="3" rx="1.5" fill="#78350F" />
                {/* Stem */}
                <path d="M 26,47 L 26,24 L 16,14" fill="none" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
                {/* Shade */}
                <polygon points="6,22 26,10 28,14 10,24" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
                {/* Glowing bulb */}
                <circle cx="11" cy="22" r="4.5" fill="#FDE68A" className="drop-shadow-[0_0_8px_rgba(253,230,138,0.9)]" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Rustic Wooden Wall Shelf Base */}
      <div className="relative w-40 sm:w-44">
        {/* Shelf Top Surface */}
        <div className="w-full h-3.5 rounded-xs bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 border-t border-amber-700/60 shadow-lg"></div>
        {/* Shelf Bevel/Depth */}
        <div className="w-full h-1.5 bg-[#451A03]"></div>

        {/* Wall Bracket Supports Underneath */}
        <div className="absolute left-6 top-4 w-3.5 h-8 border-l-2 border-b-2 border-stone-800/80 -rotate-12"></div>
        <div className="absolute right-6 top-4 w-3.5 h-8 border-r-2 border-b-2 border-stone-800/80 rotate-12"></div>
      </div>
    </div>
  );
};

export default DynamicShelf;
