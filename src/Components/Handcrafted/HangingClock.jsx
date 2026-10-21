import { useState, useEffect } from "react";

const HangingClock = () => {
  const [time, setTime] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      className="absolute top-0 left-6 sm:left-12 z-30 flex flex-col items-center animate-clock-swing cursor-pointer select-none"
      onClick={() => setShowTooltip(!showTooltip)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      title="Interactive Clock · Click to view time"
    >
      {/* Hanging Wire from Ceiling */}
      <div className="w-[1.5px] h-14 bg-gradient-to-b from-stone-400 to-amber-900/60 dark:from-stone-600 dark:to-stone-400"></div>

      {/* Clock Outer Rim & Brass Ring */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 shadow-lg border border-amber-950/40">
        {/* Clock Face */}
        <div className="relative w-full h-full rounded-full bg-[#FBF7EE] dark:bg-[#201D1A] border border-amber-900/20 shadow-inner flex items-center justify-center">
          {/* Hour markers */}
          <span className="absolute top-1 text-[8px] sm:text-[9px] font-serif font-bold text-stone-700 dark:text-stone-300">12</span>
          <span className="absolute right-1 text-[8px] sm:text-[9px] font-serif font-bold text-stone-700 dark:text-stone-300">3</span>
          <span className="absolute bottom-1 text-[8px] sm:text-[9px] font-serif font-bold text-stone-700 dark:text-stone-300">6</span>
          <span className="absolute left-1 text-[8px] sm:text-[9px] font-serif font-bold text-stone-700 dark:text-stone-300">9</span>

          {/* Center Pin */}
          <div className="absolute w-2 h-2 rounded-full bg-stone-900 dark:bg-amber-400 z-20 shadow-xs"></div>

          {/* Hour Hand */}
          <div
            className="absolute w-[2px] h-4 sm:h-5 bg-stone-900 dark:bg-stone-100 rounded-full origin-bottom bottom-1/2 left-[calc(50%-1px)] z-10 transition-transform duration-200"
            style={{ transform: `rotate(${hourDeg}deg)` }}
          ></div>

          {/* Minute Hand */}
          <div
            className="absolute w-[1.5px] h-6 sm:h-7 bg-stone-800 dark:bg-stone-300 rounded-full origin-bottom bottom-1/2 left-[calc(50%-0.75px)] z-10 transition-transform duration-200"
            style={{ transform: `rotate(${minuteDeg}deg)` }}
          ></div>

          {/* Second Hand */}
          <div
            className="absolute w-[1px] h-7 sm:h-8 bg-rose-600 rounded-full origin-bottom bottom-1/2 left-[calc(50%-0.5px)] z-15 transition-transform duration-75"
            style={{ transform: `rotate(${secondDeg}deg)` }}
          ></div>
        </div>
      </div>

      {/* Tooltip showing real time */}
      {showTooltip && (
        <div className="absolute top-26 px-3 py-1.5 rounded-md bg-stone-900/90 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-mono shadow-xl backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95">
          <span>{formattedTime}</span> · <span>Dhaka</span>
        </div>
      )}
    </div>
  );
};

export default HangingClock;
