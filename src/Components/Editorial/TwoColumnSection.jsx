import { useState } from "react";
import {
  FiArrowUpRight,
  FiLayers,
  FiFileText,
  FiChevronDown,
  FiChevronUp,
  FiDownload,
  FiAward,
} from "react-icons/fi";
import Reveal from "../UI/Reveal";
import Tooltip from "../UI/Tooltip";
import {
  PROFILE,
  CASE_STUDIES,
  EARLIER_BUILDS,
  EXPERIENCE_TIMELINE,
  EDUCATION_CREDENTIALS,
  RESUME_SNAPSHOT,
  FOUNDATION_CATEGORIES,
  FOUNDATIONS,
  FOUNDATIONS_INITIAL_LIMIT,
} from "../../data/portfolioData";

const ENGINEERING_EXP = EXPERIENCE_TIMELINE.filter((e) => e.id !== "exp-education");

const toFlagMap = (items, key) =>
  items.reduce((acc, item) => ({ ...acc, [item.id]: !!item[key] }), {});

const TwoColumnSection = ({ onOpenResume, onDownloadPdf }) => {
  const [archViewMap, setArchViewMap] = useState(() => toFlagMap(CASE_STUDIES, "defaultArchOpen"));
  const [expandedCards, setExpandedCards] = useState(() => toFlagMap(CASE_STUDIES, "defaultExpanded"));
  const [expandedExp, setExpandedExp] = useState({});
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAllFoundations, setShowAllFoundations] = useState(false);

  const allArchOpen = CASE_STUDIES.every((item) => !!archViewMap[item.id]);

  const toggleAllArch = () => {
    const next = !allArchOpen;
    setArchViewMap(CASE_STUDIES.reduce((acc, i) => ({ ...acc, [i.id]: next }), {}));
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
    catId === "all" ? FOUNDATIONS.length : FOUNDATIONS.filter((i) => i.category === catId).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* ==================== 1. 3-COLUMN CASE STUDY GALLERY ==================== */}
      <section className="scroll-mt-24" id="projects">
        <div className="studio-section studio-frame-rails">
          <div className="border-t border-[#D2C3AE] dark:border-stone-800/90 pt-8 sm:pt-10 space-y-7">
            <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="studio-eyebrow">Selected Production Work</span>
                <h2 className="font-serif text-[26px] sm:text-[32px] lg:text-[36px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-tight">
                  Selected systems &amp; case studies
                </h2>
                <p className="text-[14px] sm:text-[15px] text-[#52453A] dark:text-stone-300 max-w-2xl">
                  Six shipped web &amp; mobile architectures — toggle any card to inspect its request pipeline &amp; invariants.
                </p>
              </div>

              <button
                type="button"
                onClick={toggleAllArch}
                className="w-full sm:w-auto justify-center inline-flex items-center gap-1.5 px-4 py-2 min-h-[38px] rounded-xl border border-[#CBBBA4] dark:border-stone-700 bg-[#E8DEC9]/65 dark:bg-stone-900/80 text-[12px] font-mono font-medium text-[#332B24] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              >
                <FiLayers className="text-[#9A4E24] dark:text-amber-400 text-xs" />
                <span>{allArchOpen ? "Show all overviews" : "Inspect all architectures"}</span>
              </button>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
              {CASE_STUDIES.map((item, idx) => {
                const isArch = !!archViewMap[item.id];
                const isExpanded = !!expandedCards[item.id];
                const stackTags = item.stackList || item.stack.split(" · ");

                return (
                  <Reveal key={item.id} delay={(idx % 3) * 65} as="article" className="editorial-card-lift studio-card p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-3.5">
                      <div className="space-y-2.5">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between gap-2 font-serif text-[19px] sm:text-[20.5px] font-normal text-[#231D18] dark:text-[#F3ECE2] hover:text-[#9A4E24] dark:hover:text-amber-400 transition-colors group leading-snug"
                        >
                          <span className="break-words">{item.name}</span>
                          <FiArrowUpRight className="text-base text-[#5C4E41] dark:text-stone-400 group-hover:text-[#9A4E24] dark:group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                        </a>

                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#DFD2C0] dark:border-stone-800/80">
                          <span className="text-[12px] font-mono font-medium text-[#52453A] dark:text-stone-300 leading-snug">
                            {item.role}
                          </span>
                          <div className="flex items-center p-0.5 rounded-lg bg-[#E5D9C5]/90 dark:bg-stone-900/90 border border-[#CBBBA4]/80 dark:border-stone-800 shrink-0">
                            <Tooltip content="Human product overview" position="top" align="right">
                              <button
                                type="button"
                                onClick={() => setArchViewMap((p) => ({ ...p, [item.id]: false }))}
                                className={`px-2.5 py-1 min-h-[28px] sm:min-h-0 rounded-md text-[11.5px] font-mono transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                                  !isArch
                                    ? "bg-[#F6EFE2] dark:bg-stone-800 text-[#231D18] dark:text-stone-100 font-medium shadow-sm"
                                    : "text-[#52453A] dark:text-stone-400 hover:text-[#231D18] dark:hover:text-stone-200"
                                }`}
                              >
                                <FiFileText className="text-[10px] shrink-0" />
                                <span>Story</span>
                              </button>
                            </Tooltip>
                            <Tooltip content="System architecture & invariant" position="top" align="right">
                              <button
                                type="button"
                                onClick={() => setArchViewMap((p) => ({ ...p, [item.id]: true }))}
                                className={`px-2.5 py-1 min-h-[28px] sm:min-h-0 rounded-md text-[11.5px] font-mono transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                                  isArch
                                    ? "bg-[#231D18] text-[#F6EFE2] dark:bg-amber-400 dark:text-stone-950 font-medium shadow-sm"
                                    : "text-[#52453A] dark:text-stone-400 hover:text-[#231D18] dark:hover:text-stone-200"
                                }`}
                              >
                                <FiLayers className="text-[10px] shrink-0" />
                                <span>Arch</span>
                              </button>
                            </Tooltip>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {stackTags.map((tag) => (
                            <span key={tag} className="studio-chip">{tag}</span>
                          ))}
                        </div>
                      </div>

                      {!isArch ? (
                        <div key="story" className="animate-editorial-fade space-y-2.5 pt-0.5">
                          <p className="text-[14.5px] text-[#332B24] dark:text-[#E5DDD2] leading-[1.68]">
                            {item.shortSummary}{" "}
                            <button
                              type="button"
                              onClick={() => setExpandedCards((p) => ({ ...p, [item.id]: !p[item.id] }))}
                              className="inline-flex items-center gap-0.5 text-[12px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline cursor-pointer whitespace-nowrap ml-1"
                            >
                              {isExpanded ? "Show less ↑" : "Read more ↓"}
                            </button>
                          </p>
                          <div className={`studio-accordion ${isExpanded ? "is-open" : ""}`} aria-hidden={!isExpanded}>
                            <div>
                              <p className="pl-3 border-l-2 border-[#D2C3AE] dark:border-stone-700 text-[13.5px] text-[#4A3E33] dark:text-stone-300 leading-[1.66]">
                                {item.expandedDetails}
                              </p>
                            </div>
                          </div>
                          <div className="rounded-lg border border-[#DFD2C0] dark:border-stone-800/90 bg-[#EFE6D8]/60 dark:bg-[#151311]/90 px-3 py-2 text-[12px] font-mono text-[#332B24] dark:text-stone-200 leading-relaxed">
                            <span className="text-[#9A4E24] dark:text-amber-400 font-medium">Outcome: </span>
                            {item.impact}
                          </div>
                        </div>
                      ) : (
                        <div key="arch" className="animate-editorial-fade rounded-xl border border-[#D2C3AE] dark:border-stone-800/90 bg-[#EAE0CE]/70 dark:bg-[#141210]/90 p-3.5 space-y-2.5 font-mono text-[12px]">
                          <div className="text-[11px] text-[#5C4E41] dark:text-stone-400">Request &amp; Data Pipeline:</div>
                          <div className="space-y-1.5 text-[#231D18] dark:text-stone-200">
                            {item.architecture.pipeline.map((node, i) => (
                              <div
                                key={node}
                                style={{ animationDelay: `${i * 55}ms` }}
                                className="animate-pipeline-step flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#F6EFE2]/95 dark:bg-[#1C1917] border border-[#CBBBA4]/80 dark:border-stone-800"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-[11px] text-[#9A4E24] dark:text-amber-400 tabular-nums shrink-0 font-medium">0{i + 1}.</span>
                                  <span className="break-words">{node}</span>
                                </div>
                                <span className={`text-[11px] shrink-0 ${i < item.architecture.pipeline.length - 1 ? "text-[#9A4E24] dark:text-amber-400" : "text-emerald-700 dark:text-emerald-400"}`}>
                                  {i < item.architecture.pipeline.length - 1 ? "↓" : "✓"}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-1.5 border-t border-[#D2C3AE]/80 dark:border-stone-800/80 text-[#332B24] dark:text-stone-300 leading-relaxed">
                            <span className="text-[#9A4E24] dark:text-amber-400 font-medium">Invariant: </span>
                            {item.architecture.invariant}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2.5 border-t border-[#DFD2C0] dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-[12px] font-mono">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-[#9A4E24] dark:text-amber-400 font-medium hover:underline py-0.5 whitespace-nowrap">
                          {item.liveLabel || "Live Site ↗"}
                        </a>
                        <span aria-hidden="true" className="text-[#B8A48C] dark:text-[#443C35]">·</span>
                        <Tooltip content={item.repoTooltip} position="top" align="left" className="inline-flex">
                          {item.repoUrl ? (
                            <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="text-[#4A3E33] dark:text-[#C8BEB2] hover:text-[#231D18] dark:hover:text-[#F3ECE2] hover:underline py-0.5 whitespace-nowrap">
                              {item.repoLabel}
                            </a>
                          ) : (
                            <span className="text-[11.5px] sm:text-[12px] text-[#5C4E41] dark:text-[#A89E93] py-0.5 whitespace-nowrap cursor-help border-b border-dashed border-[#B8A48C] dark:border-[#4A4037]">
                              {item.repoLabel}
                            </span>
                          )}
                        </Tooltip>
                      </div>
                      <button
                        type="button"
                        onClick={() => setArchViewMap((p) => ({ ...p, [item.id]: !isArch }))}
                        className="text-[#52453A] dark:text-[#C8BEB2] hover:text-[#231D18] dark:hover:text-[#F3ECE2] cursor-pointer py-0.5 whitespace-nowrap shrink-0"
                      >
                        {isArch ? "← Story" : "Blueprint →"}
                      </button>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[13px] text-[#4A3E33] dark:text-[#C8BEB2]">
              <div className="leading-relaxed">
                <span className="font-medium">More live deployments: </span>
                {EARLIER_BUILDS.map((build, idx) => (
                  <span key={build.name}>
                    <a href={build.url} target="_blank" rel="noopener noreferrer" className="underline decoration-[#B8A48C] dark:decoration-[#4A4037] underline-offset-2 hover:text-[#231D18] dark:hover:text-[#F3ECE2]">
                      {build.name}
                    </a>
                    {idx < EARLIER_BUILDS.length - 1 && " · "}
                  </span>
                ))}
              </div>
              <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline inline-flex items-center gap-1 py-1 self-start sm:self-auto whitespace-nowrap">
                <span>All {PROFILE.repoCount} repositories &amp; {PROFILE.orgCount} orgs on GitHub →</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 2. ASYMMETRIC CAPABILITIES & CREDENTIALS BENTO ==================== */}
      <section aria-label="Core technical stack and credentials">
        <div className="studio-section studio-frame-rails py-8 sm:py-10">
          <div className="border-t border-[#D2C3AE] dark:border-[#2B2622] pt-8 sm:pt-10 space-y-6">
            <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div className="space-y-1">
                <span className="studio-eyebrow">Capabilities &amp; Credentials</span>
                <h2 className="font-serif text-[26px] sm:text-[32px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-tight">
                  Technical stack &amp; formal grounding
                </h2>
              </div>
              <span className="text-[12px] font-mono text-[#5C4E41] dark:text-stone-400 shrink-0">
                Single Source of Truth · Synced with ATS Resume
              </span>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RESUME_SNAPSHOT.skillGroups.map((group, idx) => {
                  const tags = group.tags || group.items.split(",").map((s) => s.trim());
                  return (
                    <Reveal
                      key={group.category}
                      delay={idx * 60}
                      className={`editorial-card-lift studio-card p-5 space-y-3.5 ${idx === 2 ? "sm:col-span-2" : ""}`}
                    >
                      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#DFD2C0] dark:border-stone-800/80">
                        <span className="text-[12px] font-mono font-medium uppercase tracking-wider text-[#9A4E24] dark:text-amber-400">
                          0{idx + 1}. {group.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#6E5E4F] dark:text-stone-400 tabular-nums">
                          {tags.length} core tools
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((skill) => (
                          <span key={skill} className="studio-chip px-2.5 py-1 rounded-lg text-[12px] text-[#231D18] dark:text-stone-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal delay={100} className="lg:col-span-5 rounded-2xl border border-[#CBBBA4] dark:border-amber-500/20 bg-[#E8DEC9]/65 dark:bg-[#1B1815] p-5 sm:p-6 flex flex-col justify-between space-y-5 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#D2C3AE] dark:border-stone-800">
                    <span className="inline-flex items-center gap-2 text-[12px] font-mono font-medium uppercase tracking-wider text-[#9A4E24] dark:text-amber-400">
                      <FiAward className="text-sm" />
                      <span>Education &amp; Formal Logic</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#5C4E41] dark:text-stone-400">Dhaka, BD</span>
                  </div>

                  <div className="space-y-4 divide-y divide-[#D5C8B5] dark:divide-stone-800">
                    {EDUCATION_CREDENTIALS.map((edu, idx) => (
                      <article key={edu.id} className={idx === 0 ? "space-y-1.5" : "pt-4 space-y-1.5"}>
                        <div className="flex items-baseline justify-between gap-2 text-[11.5px] font-mono">
                          <span className="font-medium text-[#9A4E24] dark:text-amber-400 tabular-nums">Class of {edu.year}</span>
                          <span className="text-[#5C4E41] dark:text-stone-400 text-right">{edu.board}</span>
                        </div>
                        <h3 className="font-serif text-[18px] sm:text-[19px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-snug">
                          {edu.degree}
                        </h3>
                        <div className="text-[13px] font-medium text-[#4A3E33] dark:text-stone-300">{edu.institution}</div>
                        <p className="text-[13px] text-[#52453A] dark:text-stone-400 leading-relaxed">{edu.details}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D2C3AE] dark:border-stone-800 text-[12px] font-mono text-[#4A3E33] dark:text-stone-300 leading-relaxed">
                  Classical deductive logic (<span className="text-[#9A4E24] dark:text-amber-400">Mantiq</span>) directly informs how I design strict TypeScript contracts &amp; database invariants.
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 3. 2-COLUMN ENGINEERING EXPERIENCE ==================== */}
      <section className="scroll-mt-24" id="experience">
        <div className="studio-section studio-frame-rails">
          <div className="border-t border-[#D2C3AE] dark:border-[#2B2622] pt-8 sm:pt-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <Reveal className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
                <div className="space-y-1.5">
                  <span className="studio-eyebrow">Career Trajectory</span>
                  <h2 className="font-serif text-[26px] sm:text-[32px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-tight">
                    Engineering experience
                  </h2>
                  <p className="text-[14px] sm:text-[15px] text-[#52453A] dark:text-[#B8AEA2] leading-relaxed">
                    Solo 0→1 product architecture, private monorepo ownership, mobile financial apps, and open-source delivery.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {onDownloadPdf && (
                    <button
                      type="button"
                      onClick={onDownloadPdf}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#231D18] text-[#F6EFE2] dark:bg-[#F3ECE2] dark:text-[#1C1917] text-[12px] font-mono font-medium hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
                    >
                      <FiDownload className="text-xs" />
                      <span>Download PDF</span>
                    </button>
                  )}
                  {onOpenResume && (
                    <button
                      type="button"
                      onClick={onOpenResume}
                      className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg border border-[#CBBBA4] dark:border-stone-700 text-[12px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:border-[#9A4E24] dark:hover:border-amber-400 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>Preview full CV ↗</span>
                    </button>
                  )}
                </div>
              </Reveal>

              <div className="lg:col-span-8 divide-y divide-[#DFD2C0] dark:divide-[#2B2622]">
                {ENGINEERING_EXP.map((exp, idx) => {
                  const isExpOpen = !!expandedExp[exp.id];
                  return (
                    <Reveal key={exp.id} delay={idx * 65} as="article" className="py-6 sm:py-7 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-2.5 md:gap-6 items-start">
                      <div className="md:col-span-4 space-y-1">
                        <div className="text-[13px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 tabular-nums">{exp.period}</div>
                        <div className="text-[13px] text-[#4A3E33] dark:text-[#C8BEB2]">
                          <span className="font-medium text-[#231D18] dark:text-[#E6DFD5]">{exp.organization}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="text-[#5C4E41] dark:text-[#9C9184]">{exp.location}</span>
                        </div>
                      </div>

                      <div className="md:col-span-8 space-y-2">
                        <div className="space-y-1">
                          <h3 className="font-serif text-[20px] sm:text-[21px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-snug">{exp.role}</h3>
                          <div className="text-[11.5px] font-mono text-[#5C4E41] dark:text-[#9C9184]">{exp.stack}</div>
                        </div>

                        <p className="text-[14.5px] sm:text-[15.5px] text-[#332B24] dark:text-[#DFD7CC] leading-[1.7]">
                          {exp.shortSummary || exp.summary}{" "}
                          <button
                            type="button"
                            onClick={() => setExpandedExp((p) => ({ ...p, [exp.id]: !p[exp.id] }))}
                            className="inline-flex items-center gap-0.5 text-[12px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline cursor-pointer whitespace-nowrap ml-1"
                          >
                            {isExpOpen ? "Hide details ↑" : "Read details ↓"}
                          </button>
                        </p>

                        <div className={`studio-accordion ${isExpOpen ? "is-open" : ""}`} aria-hidden={!isExpOpen}>
                          <div>
                            <ul className="space-y-1.5 pt-1 pl-3 border-l-2 border-[#D2C3AE] dark:border-[#36302A] text-[13.5px] text-[#4A3E33] dark:text-[#C8BEB2] leading-[1.68] list-disc list-inside">
                              {exp.highlights.map((pt, i) => <li key={i}>{pt}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4. SCALABLE FOUNDATIONS & CRAFT ==================== */}
      <section className="scroll-mt-24" id="about">
        <div className="studio-section studio-frame-rails">
          <div className="border-t border-[#D2C3AE] dark:border-stone-800/90 pt-8 sm:pt-10 space-y-6">
            <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="studio-eyebrow">Engineering Philosophy</span>
                <h2 className="font-serif text-[26px] sm:text-[32px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-tight">
                  Foundations &amp; engineering craft
                </h2>
                <p className="text-[14px] sm:text-[15px] text-[#52453A] dark:text-stone-300">
                  From classical grammatical logic in Dhaka to modern full-stack &amp; AI systems.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter foundations by domain">
                {FOUNDATION_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setShowAllFoundations(false);
                      }}
                      className={`px-3 py-1.5 min-h-[34px] sm:min-h-0 rounded-lg text-[12px] font-mono transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? "bg-[#231D18] text-[#F6EFE2] dark:bg-amber-400 dark:text-stone-950 font-medium shadow-sm"
                          : "bg-[#E8DEC9]/65 dark:bg-stone-900/75 text-[#4A3E33] dark:text-stone-300 hover:bg-[#DDD0BC]/80 dark:hover:bg-stone-800 border border-[#CBBBA4]/80 dark:border-stone-800"
                      }`}
                    >
                      <span className="sm:hidden">{cat.shortLabel || cat.label}</span>
                      <span className="hidden sm:inline">{cat.label}</span>
                      <span className={`text-[11px] tabular-nums ${isActive ? "text-[#D8CBB8] dark:text-stone-800" : "text-[#6E5E4F] dark:text-stone-400"}`}>
                        ({getCategoryCount(cat.id)})
                      </span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <div
              key={`${activeCategory}-${showAllFoundations}`}
              className={`animate-editorial-fade grid grid-cols-1 sm:grid-cols-2 ${
                visibleFoundations.length === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"
              } gap-4 sm:gap-5 items-stretch`}
            >
              {visibleFoundations.map((item) => (
                <article key={item.id || item.index} className="editorial-card-lift studio-card p-5 flex flex-col justify-between space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#DFD2C0] dark:border-stone-800/80 text-[11.5px] font-mono">
                    <span className="font-medium text-[#9A4E24] dark:text-amber-400 shrink-0">{item.index}</span>
                    <span className="text-[#52453A] dark:text-stone-400 text-right">{item.meta}</span>
                  </div>
                  <div className="space-y-1.5 pt-0.5">
                    <h3 className="font-serif text-[19px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-snug">{item.title}</h3>
                    <p className="text-[14px] text-[#332B24] dark:text-[#E5DDD2] leading-[1.68]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            {hasMoreFoundations && (
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowAllFoundations((p) => !p)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[38px] rounded-xl border border-[#CBBBA4] dark:border-stone-700 bg-[#E8DEC9]/60 dark:bg-stone-900/80 text-[12.5px] font-mono font-medium text-[#332B24] dark:text-stone-200 hover:border-[#9A4E24] dark:hover:border-amber-400 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {showAllFoundations ? (
                    <>
                      <span>Show fewer items</span>
                      <FiChevronUp className="text-xs text-[#9A4E24] dark:text-amber-400" />
                    </>
                  ) : (
                    <>
                      <span>Show all {filteredFoundations.length} foundations (+{filteredFoundations.length - FOUNDATIONS_INITIAL_LIMIT} more)</span>
                      <FiChevronDown className="text-xs text-[#9A4E24] dark:text-amber-400" />
                    </>
                  )}
                </button>
                <span className="hidden sm:inline text-[12px] font-mono text-[#5C4E41] dark:text-stone-400 tabular-nums">
                  Showing {visibleFoundations.length} of {filteredFoundations.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TwoColumnSection;
