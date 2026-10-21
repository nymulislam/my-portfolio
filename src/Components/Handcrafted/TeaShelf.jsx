const TeaShelf = () => {
  return (
    <div className="hidden md:flex flex-col items-center absolute -top-8 right-6 lg:right-16 z-20 pointer-events-none select-none">
      {/* Kettle & Glass Cup container */}
      <div className="relative flex items-end justify-center gap-4 mb-[-2px]">
        {/* Glass Cup with Steaming Milk Tea */}
        <div className="relative flex flex-col items-center">
          {/* Animated Steam Waves Rising */}
          <div className="absolute -top-12 flex justify-center w-full pointer-events-none">
            <span className="w-1.5 h-7 rounded-full bg-stone-300/60 dark:bg-stone-400/40 blur-[1px] animate-steam-1"></span>
            <span className="w-2 h-9 rounded-full bg-stone-200/50 dark:bg-stone-400/30 blur-[1.5px] animate-steam-2 mx-1"></span>
            <span className="w-1.5 h-6 rounded-full bg-stone-300/60 dark:bg-stone-400/40 blur-[1px] animate-steam-3"></span>
          </div>

          {/* Ribbed Chai Glass */}
          <div className="relative w-9 h-14 rounded-b-lg border-2 border-stone-400/40 dark:border-stone-500/30 bg-gradient-to-t from-amber-900/80 via-amber-700/60 to-amber-500/30 overflow-hidden shadow-md backdrop-blur-[1px]">
            {/* Liquid level */}
            <div className="absolute bottom-0 w-full h-11 bg-gradient-to-t from-[#B45309] via-[#D97706] to-[#F59E0B]/80 opacity-90"></div>
            {/* Glass ribs/highlights */}
            <div className="absolute inset-0 flex justify-between px-1 opacity-40">
              <div className="w-[1px] h-full bg-white/70"></div>
              <div className="w-[1px] h-full bg-white/70"></div>
              <div className="w-[1px] h-full bg-white/70"></div>
            </div>
            {/* Top rim sheen */}
            <div className="absolute top-0 w-full h-1 bg-white/50"></div>
          </div>
        </div>

        {/* Vintage Rustic Metal Kettle (Ketli) */}
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Handle */}
            <path
              d="M 30,50 C 30,10 70,10 70,50"
              fill="none"
              stroke="#292524"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 30,50 C 30,10 70,10 70,50"
              fill="none"
              stroke="#57534E"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Kettle Body */}
            <path
              d="M 25,50 Q 15,75 25,90 L 75,90 Q 85,75 75,50 Z"
              fill="url(#kettleGrad)"
              stroke="#1C1917"
              strokeWidth="2"
            />

            {/* Spout on Left */}
            <path
              d="M 22,65 Q 10,60 12,45 L 18,45 Q 16,58 25,72 Z"
              fill="url(#kettleGrad)"
              stroke="#1C1917"
              strokeWidth="1.5"
            />

            {/* Kettle Lid */}
            <ellipse cx="50" cy="50" rx="24" ry="7" fill="#44403C" stroke="#1C1917" strokeWidth="1.5" />
            <circle cx="50" cy="45" r="4" fill="#78716C" stroke="#1C1917" strokeWidth="1" />

            {/* Weathered Patina Gradients */}
            <defs>
              <linearGradient id="kettleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A8A29E" />
                <stop offset="40%" stopColor="#78716C" />
                <stop offset="70%" stopColor="#57534E" />
                <stop offset="100%" stopColor="#292524" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Rustic Wooden Wall Shelf */}
      <div className="relative w-44">
        {/* Shelf Top Surface */}
        <div className="w-full h-4 rounded-xs bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 border-t border-amber-700/60 shadow-lg"></div>
        {/* Shelf Bevel/Depth */}
        <div className="w-full h-1.5 bg-[#451A03]"></div>

        {/* Wall Bracket Support Underneath */}
        <div className="absolute left-6 top-5 w-4 h-9 border-l-3 border-b-3 border-stone-800/80 -rotate-12"></div>
        <div className="absolute right-6 top-5 w-4 h-9 border-r-3 border-b-3 border-stone-800/80 rotate-12"></div>
      </div>
    </div>
  );
};

export default TeaShelf;
