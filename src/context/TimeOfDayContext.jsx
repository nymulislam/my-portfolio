import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { flushSync } from "react-dom";

const TimeOfDayContext = createContext();

const MOOD_DETAILS = {
  morning: {
    label: "Morning",
    bangla: "সকাল",
    windowCaption: "Morning sunbeams · Espresso & keys",
    devAtmosphere: "Morning sun · System design & fresh coffee",
    skyNote: "Morning studio light",
    themeColor: "#FAF3E6",
    defaultLamp: false,
  },
  afternoon: {
    label: "Afternoon",
    bangla: "দুপুর",
    windowCaption: "Crisp daylight · Deep architecture",
    devAtmosphere: "Bright daylight · Deep work & shipping features",
    skyNote: "Crisp afternoon light",
    themeColor: "#F4F5F1",
    defaultLamp: false,
  },
  evening: {
    label: "Evening",
    bangla: "সন্ধ্যা",
    windowCaption: "Golden sunset · Warm desk lamp",
    devAtmosphere: "Golden hour · Architecture review & evening tea",
    skyNote: "Golden hour studio",
    themeColor: "#E9DAC5",
    defaultLamp: true,
  },
  night: {
    label: "Night",
    bangla: "রাত",
    windowCaption: "Starlit window · Backlit keys",
    devAtmosphere: "Quiet night · Warm desk lamp & late-night builds",
    skyNote: "Late-night studio focus",
    themeColor: "#141210",
    defaultLamp: true,
  },
};

const MOOD_ORDER = ["morning", "afternoon", "evening", "night"];
const STORAGE_KEY = "portfolio_time_mood_v2";
const LEGACY_STORAGE_KEY = "portfolio_time_mood";
const VALID_MOODS = [...MOOD_ORDER, "auto"];

/**
 * Accurate natural daylight schedule (visitor local clock):
 * Morning:   05:00 – 11:59
 * Afternoon: 12:00 – 16:59
 * Evening:   17:00 – 18:59 (Golden Hour / Dusk)
 * Night:     19:00 – 04:59
 */
const getSystemPeriod = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 19) return "evening";
  return "night";
};

const resolvePeriod = (mood, sysPeriod) =>
  mood === "auto" ? sysPeriod : MOOD_ORDER.includes(mood) ? mood : sysPeriod;

const applyRootMoodClasses = (period, moodToStore) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("mood-morning", "mood-afternoon", "mood-evening", "mood-night", "dark");
  root.classList.add(`mood-${period}`);
  if (period === "night") {
    root.classList.add("dark");
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && MOOD_DETAILS[period]) {
    meta.setAttribute("content", MOOD_DETAILS[period].themeColor);
  }
  try {
    localStorage.setItem(STORAGE_KEY, moodToStore);
  } catch {
    // ignore storage errors
  }
};

const setTransitionOrigin = (originEvent) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let x = vw - 72;
  let y = 36;

  if (originEvent) {
    if (typeof originEvent.clientX === "number" && (originEvent.clientX > 0 || originEvent.clientY > 0)) {
      x = originEvent.clientX;
      y = originEvent.clientY;
    } else if (originEvent.currentTarget?.getBoundingClientRect) {
      const rect = originEvent.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
  }

  const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));
  const root = document.documentElement;
  root.style.setProperty("--vt-x", `${Math.round(x)}px`);
  root.style.setProperty("--vt-y", `${Math.round(y)}px`);
  root.style.setProperty("--vt-radius", `${Math.ceil(maxRadius)}px`);
};

export const TimeOfDayProvider = ({ children }) => {
  const [selectedMood, setSelectedMoodState] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && VALID_MOODS.includes(stored)) return stored;
      } catch {
        // ignore storage errors
      }
    }
    return "auto";
  });

  const [systemPeriod, setSystemPeriod] = useState(() => getSystemPeriod());
  const transitionTimerRef = useRef(null);

  const activePeriod = useMemo(
    () => resolvePeriod(selectedMood, systemPeriod),
    [selectedMood, systemPeriod]
  );

  const currentDetails = MOOD_DETAILS[activePeriod] || MOOD_DETAILS.evening;
  const [studioLampOn, setStudioLampOn] = useState(() => currentDetails.defaultLamp);

  // Sync root classes on initial mount
  useLayoutEffect(() => {
    applyRootMoodClasses(activePeriod, selectedMood);
  }, [activePeriod, selectedMood]);

  // Cinematic GPU Radial Light-Wave transition for all mood changes
  const runMoodTransition = useCallback((nextMood, nextPeriod, nextSys, originEvent) => {
    if (typeof document === "undefined") {
      setSelectedMoodState(nextMood);
      setSystemPeriod(nextSys);
      setStudioLampOn(MOOD_DETAILS[nextPeriod]?.defaultLamp ?? true);
      return;
    }

    const root = document.documentElement;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setSelectedMoodState(nextMood);
      setSystemPeriod(nextSys);
      setStudioLampOn(MOOD_DETAILS[nextPeriod]?.defaultLamp ?? true);
      applyRootMoodClasses(nextPeriod, nextMood);
      return;
    }

    // Path 1: GPU Radial Light-Wave View Transition expanding from click point
    if (typeof document.startViewTransition === "function") {
      try {
        setTransitionOrigin(originEvent);
        const vt = document.startViewTransition(() => {
          root.classList.add("vt-mood-switching");
          flushSync(() => {
            setSelectedMoodState(nextMood);
            setSystemPeriod(nextSys);
            setStudioLampOn(MOOD_DETAILS[nextPeriod]?.defaultLamp ?? true);
          });
          applyRootMoodClasses(nextPeriod, nextMood);
          void root.offsetHeight;
        });

        vt.finished.finally(() => {
          root.classList.remove("vt-mood-switching");
        });
        return;
      } catch {
        root.classList.remove("vt-mood-switching");
      }
    }

    // Path 2: Synchronized CSS S-curve fallback for browsers without View Transitions API
    root.classList.add("mood-transitioning");
    clearTimeout(transitionTimerRef.current);
    setSelectedMoodState(nextMood);
    setSystemPeriod(nextSys);
    setStudioLampOn(MOOD_DETAILS[nextPeriod]?.defaultLamp ?? true);
    applyRootMoodClasses(nextPeriod, nextMood);

    transitionTimerRef.current = setTimeout(() => {
      root.classList.remove("mood-transitioning");
    }, 700);
  }, []);

  const setSelectedMood = useCallback(
    (nextMood, originEvent) => {
      const currentSys = getSystemPeriod();
      const nextPeriod = resolvePeriod(nextMood, currentSys);
      if (nextPeriod === activePeriod) {
        setSelectedMoodState(nextMood);
        applyRootMoodClasses(nextPeriod, nextMood);
        return;
      }
      runMoodTransition(nextMood, nextPeriod, currentSys, originEvent);
    },
    [activePeriod, runMoodTransition]
  );

  // Smoothly transition automatically when the visitor's clock crosses a time-of-day boundary in Auto mode
  useEffect(() => {
    if (selectedMood !== "auto") return;
    const checkClock = () => {
      const latest = getSystemPeriod();
      if (latest !== activePeriod) {
        runMoodTransition("auto", latest, latest, null);
      }
    };
    const interval = setInterval(checkClock, 60000);
    return () => clearInterval(interval);
  }, [selectedMood, activePeriod, runMoodTransition]);

  const toggleStudioLamp = useCallback(() => {
    setStudioLampOn((prev) => !prev);
  }, []);

  const cycleMood = useCallback(
    (originEvent) => {
      const currentIndex = MOOD_ORDER.indexOf(activePeriod);
      const nextIndex = (currentIndex + 1) % MOOD_ORDER.length;
      setSelectedMood(MOOD_ORDER[nextIndex], originEvent);
    },
    [activePeriod, setSelectedMood]
  );

  useEffect(() => () => clearTimeout(transitionTimerRef.current), []);

  return (
    <TimeOfDayContext.Provider
      value={{
        selectedMood,
        setSelectedMood,
        activePeriod,
        cycleMood,
        currentDetails,
        studioLampOn,
        toggleStudioLamp,
      }}
    >
      {children}
    </TimeOfDayContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTimeOfDay = () => {
  const context = useContext(TimeOfDayContext);
  if (!context) {
    throw new Error("useTimeOfDay must be used within a TimeOfDayProvider");
  }
  return context;
};
