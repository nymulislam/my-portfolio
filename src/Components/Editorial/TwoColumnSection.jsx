import { useState } from "react";
import { FiArrowUpRight, FiLayers, FiFileText, FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  PROFILE,
  CASE_STUDIES,
  EARLIER_BUILDS,
  EXPERIENCE_TIMELINE,
  FOUNDATION_CATEGORIES,
  FOUNDATIONS,
  FOUNDATIONS_INITIAL_LIMIT,
} from "../../data/portfolioData";

const TwoColumnSection = ({ onOpenResume }) => {
  // Initialize Case Study Story/Arch view state from portfolioData defaults
  const [archViewMap, setArchViewMap] = useState(() =>
    CASE_STUDIES.reduce((acc, item) => {
      acc[item.id] = !!item.defaultArchOpen;
      return acc;
    }, {})
  );

  // Scalable Foundations & Craft state: Category filter + Show More progressive disclosure
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAllFoundations, setShowAllFoundations] = useState(false);

  const allArchOpen = CASE_STUDIES.every((item) => !!archViewMap[item.id]);

  const toggleCardMode = (id, mode) => {
    setArchViewMap((prev) => ({
      ...prev,
      [id]: mode === "architecture",
    }));
  };

  const toggleAllArch = () => {
    const nextState = !allArchOpen;
    const updated = {};
    CASE_STUDIES.forEach((item) => {
      updated[item.id] = nextState;
    });
    setArchViewMap(updated);
  };

  const filteredFoundations =
    activeCategory === "all"
      ? FOUNDATIONS
      : FOUNDATIONS.filter((item) => item.category === activeCategory);

  const hasMoreFoundations = filteredFoundations.length > FOUNDATIONS_INITIAL_LIMIT;
  const visibleFoundations = showAllFoundations
    ? filteredFoundations
    : filteredFoundations.slice(0, FOUNDATIONS_INITIAL_LIMIT);

  const getCategoryCount = (catId) =>
    catId === "all"
      ? FOUNDATIONS.length
      : FOUNDATIONS.filter((item) => item.category === catId).length;

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* ==================== SECTION 1: INTERACTIVE CASE STUDY CARDS ==================== */}
      <section className="py-3 sm:py-4" id="projects">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6">
          <div className="border-t border-[#D2C3AE] dark:border-stone-800/80 pt-8 sm:pt-10 space-y-6">
            {/* Section Header with Global Architecture Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <h2 className="font-serif text-[24px] sm:text-[27px] font-normal text-[#231D18] dark:text-stone-50">
                  Selected systems & case studies
                </h2>
                <p className="text-[13.5px] sm:text-[14.5px] text-[#52453A] dark:text-stone-300 mt-0.5">
                  Toggle any project between human overview and system architecture blueprint.
                </p>
              </div>

              <button
                onClick={toggleAllArch}
                className="w-full sm:w-auto justify-center inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 rounded-lg border border-[#CBBBA4] dark:border-stone-700 bg-[#E8DEC9]/60 dark:bg-stone-900 text-[12px] font-mono font-medium text-[#332B24] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              >
                <FiLayers className="text-[#9A4E24] dark:text-amber-400 text-xs" />
                <span>{allArchOpen ? "Show all overviews" : "Inspect all architectures"}</span>
              </button>
            </div>

            {/* 2-Column Case Study Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
              {CASE_STUDIES.map((item) => {
                const isArch = !!archViewMap[item.id];
                return (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-[#D2C3AE] dark:border-stone-800/90 bg-[#F6EFE2]/75 dark:bg-[#1A1816]/90 p-4 sm:p-5.5 flex flex-col justify-between space-y-4 transition-colors hover:border-[#B8A48C] dark:hover:border-stone-700"
                  >
                    <div className="space-y-3.5">
                      {/* Zero-Overlap Card Header: Row 1 Full-Width Title, Row 2 Single-Line Metadata + Story/Arch Switcher */}
                      <div className="space-y-2.5">
                        {/* Row 1: Full-Width Project Title + External Arrow */}
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between gap-2 font-serif text-[18.5px] sm:text-[20px] font-normal text-[#231D18] dark:text-stone-50 hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors group leading-snug"
                        >
                          <span className="break-words">{item.name}</span>
                          <FiArrowUpRight className="text-base text-[#5C4E41] dark:text-stone-400 group-hover:text-[#9A4E24] dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                        </a>

                        {/* Row 2: Dedicated Sub-Bar with Role/Stack & Story | Arch Switcher on One Line */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pt-2 border-t border-[#DFD2C0] dark:border-stone-800">
                          <div className="text-[12px] font-mono text-[#52453A] dark:text-stone-300 leading-snug truncate">
                            {item.role} · {item.stack}
                          </div>

                          {/* Segmented Control: Story | Arch */}
                          <div className="flex items-center p-0.5 rounded-lg bg-[#E5D9C5]/90 dark:bg-stone-900 border border-[#CBBBA4]/80 dark:border-stone-800 shrink-0">
                            <button
                              onClick={() => toggleCardMode(item.id, "overview")}
                              className={`px-2.5 py-1 min-h-[28px] sm:min-h-0 rounded-md text-[11.5px] font-mono transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                                !isArch
                                  ? "bg-[#F6EFE2] dark:bg-stone-800 text-[#231D18] dark:text-stone-100 font-medium shadow-2xs"
                                  : "text-[#52453A] dark:text-stone-400 hover:text-[#231D18] dark:hover:text-stone-200"
                              }`}
                              title="Human overview"
                            >
                              <FiFileText className="text-[10px] shrink-0" />
                              <span>Story</span>
                            </button>
                            <button
                              onClick={() => toggleCardMode(item.id, "architecture")}
                              className={`px-2.5 py-1 min-h-[28px] sm:min-h-0 rounded-md text-[11.5px] font-mono transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                                isArch
                                  ? "bg-[#231D18] text-[#F6EFE2] dark:bg-amber-400/90 dark:text-stone-950 font-medium shadow-2xs"
                                  : "text-[#52453A] dark:text-stone-400 hover:text-[#231D18] dark:hover:text-stone-200"
                              }`}
                              title="System architecture blueprint"
                            >
                              <FiLayers className="text-[10px] shrink-0" />
                              <span>Arch</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Conditional Body: Overview vs Clean Structured Architecture Pipeline */}
                      {!isArch ? (
                        <div className="space-y-3 pt-0.5">
                          <p className="text-[14.5px] sm:text-[15px] text-[#332B24] dark:text-stone-200 leading-[1.65]">
                            {item.summary}
                          </p>
                          <div className="pt-0.5 text-[12.5px] font-mono text-[#4A3E33] dark:text-stone-300 leading-relaxed">
                            <span className="text-[#9A4E24] dark:text-amber-400 font-medium">Outcome: </span>
                            {item.impact}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-[#D2C3AE] dark:border-stone-800 bg-[#EAE0CE]/70 dark:bg-stone-900/90 p-3.5 space-y-2.5 font-mono text-[12px]">
                          <div className="text-[11px] text-[#5C4E41] dark:text-stone-400">
                            Request & Data Pipeline:
                          </div>

                          {/* Clean Step-by-Step Pipeline */}
                          <div className="space-y-1.5 text-[#231D18] dark:text-stone-200">
                            {item.architecture.pipeline.map((node, i) => (
                              <div
                                key={node}
                                className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#F6EFE2]/95 dark:bg-stone-800/90 border border-[#CBBBA4]/80 dark:border-stone-700/80"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-[11px] text-[#9A4E24] dark:text-amber-400 tabular-nums shrink-0 font-medium">
                                    0{i + 1}.
                                  </span>
                                  <span className="truncate">{node}</span>
                                </div>
                                {i < item.architecture.pipeline.length - 1 ? (
                                  <span className="text-[11px] text-[#9A4E24] dark:text-amber-400 shrink-0">
                                    ↓
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 shrink-0">
                                    ✓
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="pt-1.5 border-t border-[#D2C3AE]/80 dark:border-stone-800 text-[#332B24] dark:text-stone-300 leading-relaxed">
                            <span className="text-[#9A4E24] dark:text-amber-400 font-medium">Invariant: </span>
                            {item.architecture.invariant}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Single-Line Card Footer Action Row */}
                    <div className="pt-2.5 border-t border-[#DFD2C0] dark:border-stone-800/80 flex items-center justify-between gap-2 text-[12.5px] font-mono">
                      <div className="flex items-center gap-2 min-w-0">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#9A4E24] dark:text-amber-400 font-medium hover:underline inline-flex items-center gap-1 py-1 whitespace-nowrap"
                        >
                          <span>Live system</span>
                          <span>↗</span>
                        </a>
                        <span aria-hidden="true" className="text-[#B8A48C] dark:text-stone-700">
                          ·
                        </span>
                        {item.repoUrl ? (
                          <a
                            href={item.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#4A3E33] dark:text-stone-300 hover:text-[#231D18] dark:hover:text-stone-100 hover:underline py-1 whitespace-nowrap"
                          >
                            {item.repoLabel}
                          </a>
                        ) : (
                          <span
                            className="text-[12px] text-[#5C4E41] dark:text-stone-400 py-1 whitespace-nowrap"
                            title="Proprietary organization repository engineered solo"
                          >
                            {item.repoLabel}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => toggleCardMode(item.id, isArch ? "overview" : "architecture")}
                        className="text-[#52453A] dark:text-stone-300 hover:text-[#231D18] dark:hover:text-stone-100 cursor-pointer py-1 whitespace-nowrap shrink-0"
                      >
                        {isArch ? "← Story" : "Blueprint →"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Additional Archive & GitHub Link Row */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[13px] text-[#4A3E33] dark:text-stone-300">
              <div className="leading-relaxed">
                <span className="font-medium">Earlier builds: </span>
                {EARLIER_BUILDS.map((build, idx) => (
                  <span key={build.name}>
                    <a
                      href={build.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[#B8A48C] underline-offset-2 hover:text-[#231D18] dark:hover:text-white"
                    >
                      {build.name}
                    </a>
                    {idx < EARLIER_BUILDS.length - 1 && " · "}
                  </span>
                ))}
              </div>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline inline-flex items-center gap-1 py-1 self-start sm:self-auto whitespace-nowrap"
              >
                <span>All {PROFILE.repoCount} repositories on GitHub</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: EXPERIENCE & CAREER TIMELINE ==================== */}
      <section className="py-3 sm:py-4" id="experience">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6">
          <div className="border-t border-[#D2C3AE] dark:border-stone-800/80 pt-8 sm:pt-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="space-y-1">
                <h2 className="font-serif text-[24px] sm:text-[27px] font-normal text-[#231D18] dark:text-stone-50">
                  Experience & career trajectory
                </h2>
                <p className="text-[13.5px] sm:text-[14.5px] text-[#52453A] dark:text-stone-300">
                  Production engineering ownership, open-source builds, and analytical training.
                </p>
              </div>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="text-[13px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline inline-flex items-center gap-1 py-1 self-start sm:self-auto cursor-pointer whitespace-nowrap"
                >
                  <span>Open full CV / Resume</span>
                  <span>↗</span>
                </button>
              )}
            </div>

            <div className="divide-y divide-[#DFD2C0] dark:divide-stone-800/75">
              {EXPERIENCE_TIMELINE.map((exp) => (
                <article
                  key={exp.id}
                  className="py-5.5 first:pt-1 last:pb-1 grid grid-cols-1 md:grid-cols-12 gap-2.5 md:gap-6"
                >
                  {/* Left Column: Period & Location */}
                  <div className="md:col-span-4 space-y-1">
                    <div className="text-[13px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 tabular-nums">
                      {exp.period}
                    </div>
                    <div className="text-[13.5px] font-medium text-[#3B3128] dark:text-stone-200">
                      {exp.organization}
                    </div>
                    <div className="text-[12px] font-mono text-[#5C4E41] dark:text-stone-400">
                      {exp.location}
                    </div>
                  </div>

                  {/* Right Column: Role, Stack & Impact Highlights */}
                  <div className="md:col-span-8 space-y-2.5">
                    <div>
                      <h3 className="font-serif text-[19px] sm:text-[20px] font-normal text-[#231D18] dark:text-stone-50">
                        {exp.role}
                      </h3>
                      <div className="text-[12px] font-mono text-[#52453A] dark:text-stone-300 mt-0.5">
                        {exp.stack}
                      </div>
                    </div>

                    <div className="space-y-2 pt-0.5">
                      {exp.highlights.map((point, index) => (
                        <p
                          key={index}
                          className="text-[14.5px] sm:text-[15px] text-[#332B24] dark:text-stone-200 leading-[1.66]"
                        >
                          {point}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: SCALABLE FOUNDATIONS & ENGINEERING CRAFT ==================== */}
      <section className="py-3 sm:py-4" id="about">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6">
          <div className="border-t border-[#D2C3AE] dark:border-stone-800/80 pt-8 sm:pt-10 space-y-6">
            {/* Header & Category Filter Bar */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-2">
                <div className="space-y-1">
                  <h2 className="font-serif text-[24px] sm:text-[27px] font-normal text-[#231D18] dark:text-stone-50">
                    Foundations & engineering craft
                  </h2>
                  <p className="text-[13.5px] sm:text-[14.5px] text-[#52453A] dark:text-stone-300">
                    From classical grammatical logic in Dhaka to modern full-stack & AI systems.
                  </p>
                </div>

                <span className="text-[12px] font-mono text-[#5C4E41] dark:text-stone-400 tabular-nums shrink-0">
                  Showing {visibleFoundations.length} of {filteredFoundations.length}
                </span>
              </div>

              {/* Interactive Category Filter Tabs */}
              <div
                className="flex flex-wrap items-center gap-1.5"
                role="tablist"
                aria-label="Filter foundations by domain"
              >
                {FOUNDATION_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const count = getCategoryCount(cat.id);
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setShowAllFoundations(false);
                      }}
                      className={`px-3 py-1.5 min-h-[34px] sm:min-h-0 rounded-lg text-[12px] font-mono transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? "bg-[#231D18] text-[#F6EFE2] dark:bg-stone-200 dark:text-stone-900 font-medium shadow-2xs"
                          : "bg-[#E8DEC9]/65 dark:bg-stone-900/70 text-[#4A3E33] dark:text-stone-300 hover:bg-[#DDD0BC]/80 dark:hover:bg-stone-800 border border-[#CBBBA4]/80 dark:border-stone-800"
                      }`}
                    >
                      <span className="sm:hidden">{cat.shortLabel || cat.label}</span>
                      <span className="hidden sm:inline">{cat.label}</span>
                      <span
                        className={`text-[11px] tabular-nums ${
                          isActive
                            ? "text-[#D8CBB8] dark:text-stone-600"
                            : "text-[#6E5E4F] dark:text-stone-400"
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2-Column Editorial Foundations Grid (Single-Line Metadata for Aligned Headings) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {visibleFoundations.map((item) => (
                <div
                  key={item.id || item.index}
                  className="space-y-1.5 pb-4 sm:pb-2 border-b sm:border-b-0 border-[#DFD2C0]/70 dark:border-stone-800/60 last:border-b-0"
                >
                  <div className="flex items-center gap-x-2 text-[12px] font-mono text-[#9A4E24] dark:text-amber-400 truncate">
                    <span className="font-medium shrink-0">{item.index}</span>
                    <span aria-hidden="true" className="text-[#8C7E70] shrink-0">·</span>
                    <span className="text-[#52453A] dark:text-stone-300 truncate">{item.meta}</span>
                  </div>
                  <h3 className="font-serif text-[18.5px] sm:text-[19.5px] font-normal text-[#231D18] dark:text-stone-50">
                    {item.title}
                  </h3>
                  <p className="text-[14.5px] sm:text-[15px] text-[#332B24] dark:text-stone-200 leading-[1.65]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Progressive Disclosure: Show More / Show Less Toggle when items > 4 */}
            {hasMoreFoundations && (
              <div className="pt-1">
                <button
                  onClick={() => setShowAllFoundations((prev) => !prev)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[38px] sm:min-h-0 rounded-lg border border-[#CBBBA4] dark:border-stone-700 bg-[#E8DEC9]/60 dark:bg-stone-900/80 text-[12.5px] font-mono font-medium text-[#332B24] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {showAllFoundations ? (
                    <>
                      <span>Show fewer items</span>
                      <FiChevronUp className="text-xs text-[#9A4E24] dark:text-amber-400" />
                    </>
                  ) : (
                    <>
                      <span>
                        Show all {filteredFoundations.length} foundations (+
                        {filteredFoundations.length - FOUNDATIONS_INITIAL_LIMIT} more)
                      </span>
                      <FiChevronDown className="text-xs text-[#9A4E24] dark:text-amber-400" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TwoColumnSection;
