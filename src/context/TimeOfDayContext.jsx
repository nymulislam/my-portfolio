import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";

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

export const TimeOfDayProvider = ({ children }) => {
  const [selectedMood, setSelectedMood] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("portfolio_time_mood");
        if (stored) return stored;
      } catch {
        // ignore storage errors
      }
    }
    return "evening";
  });

  const getSystemPeriod = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  };

  const activePeriod = useMemo(() => {
    if (selectedMood === "auto") {
      return getSystemPeriod();
    }
    return MOOD_ORDER.includes(selectedMood) ? selectedMood : "evening";
  }, [selectedMood]);

  const currentDetails = MOOD_DETAILS[activePeriod] || MOOD_DETAILS.evening;

  // Interactive desk lamp state (syncs with period default when period changes, but user can toggle anytime)
  const [studioLampOn, setStudioLampOn] = useState(() => currentDetails.defaultLamp);

  useEffect(() => {
    setStudioLampOn(MOOD_DETAILS[activePeriod]?.defaultLamp ?? true);
  }, [activePeriod]);

  const toggleStudioLamp = useCallback(() => {
    setStudioLampOn((prev) => !prev);
  }, []);

  const cycleMood = useCallback(() => {
    const currentIndex = MOOD_ORDER.indexOf(activePeriod);
    const nextIndex = (currentIndex + 1) % MOOD_ORDER.length;
    setSelectedMood(MOOD_ORDER[nextIndex]);
  }, [activePeriod]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("mood-morning", "mood-afternoon", "mood-evening", "mood-night", "dark");
    root.classList.add(`mood-${activePeriod}`);

    if (activePeriod === "night") {
      root.classList.add("dark");
    }

    try {
      localStorage.setItem("portfolio_time_mood", selectedMood);
    } catch {
      // ignore in sandboxed environments
    }
  }, [activePeriod, selectedMood]);

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
