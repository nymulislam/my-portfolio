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
    defaultLamp: false,
  },
  afternoon: {
    label: "Afternoon",
    bangla: "দুপুর",
    windowCaption: "Daylight studio · Clean architecture",
    devAtmosphere: "Bright daylight · Deep work & shipping features",
    skyNote: "Clear afternoon light",
    defaultLamp: false,
  },
  evening: {
    label: "Evening",
    bangla: "সন্ধ্যা",
    windowCaption: "Golden sunset · Warm desk lamp",
    devAtmosphere: "Warm sunset · Architecture review & evening tea",
    skyNote: "Golden hour studio",
    defaultLamp: true,
  },
  night: {
    label: "Night",
    bangla: "রাত",
    windowCaption: "Starlit window · Backlit keys",
    devAtmosphere: "Quiet night · Warm desk lamp & late-night builds",
    skyNote: "Late-night studio focus",
    defaultLamp: true,
  },
};

const MOOD_ORDER = ["morning", "afternoon", "evening", "night"];

const STORAGE_KEY = "portfolio_time_mood_v2";
const LEGACY_STORAGE_KEY = "portfolio_time_mood";
const VALID_MOODS = ["morning", "afternoon", "evening", "night", "auto"];

const getSystemPeriod = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

const resolvePeriod = (mood, sysPeriod) => {
  if (mood === "auto") return sysPeriod;
  return MOOD_ORDER.includes(mood) ? mood : sysPeriod;
};

const applyRootMoodClasses = (period, moodToStore) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("mood-morning", "mood-afternoon", "mood-evening", "mood-night", "dark");
  root.classList.add(`mood-${period}`);
  if (period === "night") {
    root.classList.add("dark");
  }
  try {
    localStorage.setItem(STORAGE_KEY, moodToStore);
  } catch {
    // ignore in sandboxed environments
  }
};

export const TimeOfDayProvider = ({ children }) => {
  const [selectedMood, setSelectedMoodState] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && VALID_MOODS.includes(stored)) {
          return stored;
        }
      } catch {
        // ignore storage errors
      }
    }
    return "auto";
  });

  const [systemPeriod, setSystemPeriod] = useState(() => getSystemPeriod());
  const transitionTimerRef = useRef(null);

  // Keep system period updated every 60s when in "auto" mode
  useEffect(() => {
    if (selectedMood !== "auto") return;
    setSystemPeriod(getSystemPeriod());
    const interval = setInterval(() => {
      setSystemPeriod(getSystemPeriod());
    }, 60000);
    return () => clearInterval(interval);
  }, [selectedMood]);

  const activePeriod = useMemo(
    () => resolvePeriod(selectedMood, systemPeriod),
    [selectedMood, systemPeriod]
  );

  const currentDetails = MOOD_DETAILS[activePeriod] || MOOD_DETAILS.evening;

  // Interactive desk lamp state (syncs with period default when period changes, but user can toggle anytime)
  const [studioLampOn, setStudioLampOn] = useState(() => currentDetails.defaultLamp);

  // Ensure initial mount and auto-clock updates apply root classes
  useLayoutEffect(() => {
    applyRootMoodClasses(activePeriod, selectedMood);
    setStudioLampOn(MOOD_DETAILS[activePeriod]?.defaultLamp ?? true);
  }, [activePeriod, selectedMood]);

  // Smooth GPU View-Transition wrapper for all mood changes (Morning <-> Night, etc.)
  const setSelectedMood = useCallback(
    (nextMood) => {
      const currentSys = getSystemPeriod();
      const nextPeriod = resolvePeriod(nextMood, currentSys);
      const isSamePeriod = nextPeriod === activePeriod;

      if (typeof document === "undefined") {
        setSelectedMoodState(nextMood);
        return;
      }

      const root = document.documentElement;
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // If only switching between "auto" and the current matching period (no visual change), update immediately
      if (isSamePeriod || prefersReducedMotion) {
        setSelectedMoodState(nextMood);
        applyRootMoodClasses(nextPeriod, nextMood);
        return;
      }

      // Path 1: Modern GPU View Transitions API — captures old & new scenes and cross-fades every pixel in unison
      if (typeof document.startViewTransition === "function") {
        try {
          const vt = document.startViewTransition(() => {
            root.classList.add("vt-mood-switching");
            flushSync(() => {
              setSelectedMoodState(nextMood);
              setSystemPeriod(currentSys);
              setStudioLampOn(MOOD_DETAILS[nextPeriod]?.defaultLamp ?? true);
            });
            applyRootMoodClasses(nextPeriod, nextMood);
            // Force synchronous style computation so the new ViewTransition snapshot is 100% in its final state
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

      // Path 2: Fallback synchronized CSS S-curve transition for browsers without startViewTransition
      root.classList.add("mood-transitioning");
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
      setSelectedMoodState(nextMood);
      setSystemPeriod(currentSys);
      setStudioLampOn(MOOD_DETAILS[nextPeriod]?.defaultLamp ?? true);
      applyRootMoodClasses(nextPeriod, nextMood);

      transitionTimerRef.current = setTimeout(() => {
        root.classList.remove("mood-transitioning");
      }, 900);
    },
    [activePeriod]
  );

  const toggleStudioLamp = useCallback(() => {
    setStudioLampOn((prev) => !prev);
  }, []);

  const cycleMood = useCallback(() => {
    const currentIndex = MOOD_ORDER.indexOf(activePeriod);
    const nextIndex = (currentIndex + 1) % MOOD_ORDER.length;
    setSelectedMood(MOOD_ORDER[nextIndex]);
  }, [activePeriod, setSelectedMood]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

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
