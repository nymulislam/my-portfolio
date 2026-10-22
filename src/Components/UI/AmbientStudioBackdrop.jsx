import { useTimeOfDay } from "../../context/TimeOfDayContext";

/**
 * AmbientStudioBackdrop
 * Ultra-smooth, zero-distraction atmospheric studio lighting.
 * Uses wide, seamless radial light diffusions (no grid lines or visual noise).
 * In Night mode, eliminates side orange glare so dark reading remains uniform and soothing.
 */
const AmbientStudioBackdrop = () => {
  const { activePeriod, studioLampOn } = useTimeOfDay();

  const atmosphereByMood = {
    morning: {
      skylight:
        "radial-gradient(ellipse 95% 48% at 50% -10%, rgba(255, 247, 232, 0.72), rgba(242, 214, 174, 0.18) 55%, transparent 85%)",
      windowAura:
        "radial-gradient(circle at 78% 18%, rgba(232, 172, 98, 0.14), rgba(214, 145, 76, 0.04) 48%, transparent 74%)",
      lowerWash:
        "radial-gradient(circle at 16% 78%, rgba(212, 162, 108, 0.08), transparent 65%)",
    },
    afternoon: {
      skylight:
        "radial-gradient(ellipse 95% 48% at 50% -10%, rgba(255, 252, 245, 0.78), rgba(235, 218, 192, 0.14) 55%, transparent 85%)",
      windowAura:
        "radial-gradient(circle at 74% 16%, rgba(218, 172, 118, 0.11), rgba(190, 148, 102, 0.03) 50%, transparent 74%)",
      lowerWash:
        "radial-gradient(circle at 20% 80%, rgba(196, 164, 126, 0.06), transparent 65%)",
    },
    evening: {
      skylight:
        "radial-gradient(ellipse 95% 48% at 50% -10%, rgba(247, 224, 194, 0.45), rgba(208, 130, 74, 0.11) 55%, transparent 85%)",
      windowAura:
        "radial-gradient(circle at 80% 20%, rgba(204, 112, 54, 0.14), rgba(168, 86, 38, 0.05) 48%, transparent 75%)",
      lowerWash:
        "radial-gradient(circle at 18% 76%, rgba(186, 104, 54, 0.07), transparent 65%)",
    },
    night: {
      skylight:
        "radial-gradient(ellipse 95% 45% at 50% -10%, rgba(251, 191, 36, 0.055), rgba(217, 119, 6, 0.02) 55%, transparent 82%)",
      windowAura:
        "radial-gradient(circle at 80% 18%, rgba(245, 158, 11, 0.075), rgba(180, 83, 9, 0.025) 48%, transparent 72%)",
      lowerWash:
        "radial-gradient(circle at 18% 82%, rgba(217, 119, 6, 0.035), transparent 65%)",
    },
  };

  const moods = Object.keys(atmosphereByMood);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none print:hidden"
    >
      {moods.map((moodKey) => {
        const isActive = activePeriod === moodKey;
        const layer = atmosphereByMood[moodKey];
        return (
          <div
            key={moodKey}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Top Editorial Skylight Wash */}
            <div
              className="absolute inset-0"
              style={{
                background: layer.skylight,
              }}
            />

            {/* Slow-Breathing Studio Window Light Diffusion */}
            <div
              className="absolute -inset-[8%] animate-studio-aura"
              style={{
                background: layer.windowAura,
              }}
            />

            {/* Subtle Counter-Balance Warmth in Lower Viewport */}
            <div
              className="absolute inset-0"
              style={{
                background: layer.lowerWash,
              }}
            />
          </div>
        );
      })}

      {/* Interactive Desk Lamp Silk Halo */}
      <div
        className={`absolute top-[4%] right-[6%] w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] rounded-full transition-opacity duration-700 ease-out ${
          studioLampOn ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            activePeriod === "night"
              ? "radial-gradient(circle, rgba(251, 191, 36, 0.085) 0%, rgba(217, 119, 6, 0.03) 45%, transparent 72%)"
              : "radial-gradient(circle, rgba(217, 119, 6, 0.075) 0%, rgba(180, 83, 9, 0.02) 48%, transparent 74%)",
        }}
      />
    </div>
  );
};

export default AmbientStudioBackdrop;
