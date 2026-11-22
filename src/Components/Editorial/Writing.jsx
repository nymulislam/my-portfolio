import { useState } from "react";
import { FiX } from "react-icons/fi";
import ModalShell from "../UI/ModalShell";
import Reveal from "../UI/Reveal";
import Tooltip from "../UI/Tooltip";
import { ARTICLES } from "../../data/portfolioData";

const FONT_SCALE_MAP = {
  sm: { label: "A-", next: "normal", cls: "text-xs sm:text-sm" },
  normal: { label: "Aa", next: "lg", cls: "text-[15px] sm:text-[16px]" },
  lg: { label: "A+", next: "sm", cls: "text-base sm:text-[18px]" },
};

const Writing = () => {
  const [activeArticle, setActiveArticle] = useState(null);
  const [fontScale, setFontScale] = useState("normal");

  const currentIdx = activeArticle ? ARTICLES.findIndex((a) => a.id === activeArticle.id) : -1;
  const stepArticle = (delta) => {
    if (currentIdx === -1) return;
    setActiveArticle(ARTICLES[(currentIdx + delta + ARTICLES.length) % ARTICLES.length]);
  };
  const scaleMeta = FONT_SCALE_MAP[fontScale];

  return (
    <section className="scroll-mt-24" id="writing">
      <div className="studio-section studio-frame-rails">
        <div className="border-t border-[#D2C3AE] dark:border-stone-800/90 pt-8 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <Reveal className="lg:col-span-4 space-y-3">
              <span className="studio-eyebrow">Engineering Notes</span>
              <h2 className="font-serif text-[26px] sm:text-[32px] font-normal text-[#231D18] dark:text-[#F3ECE2] leading-tight">
                Writing
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#52453A] dark:text-stone-400 leading-relaxed">
                Short, plain-English explanations of the systems concepts behind reliable software — authentication, concurrency locks, reverse proxies, and data structures.
              </p>
              <button
                type="button"
                onClick={() => setActiveArticle(ARTICLES[0])}
                className="group pt-1 text-[13px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open essay reader ({ARTICLES.length})</span>
                <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
              </button>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-8 divide-y divide-[#DFD2C0] dark:divide-stone-800/80">
              {ARTICLES.map((post) => (
                <article key={post.id}>
                  <button
                    type="button"
                    onClick={() => setActiveArticle(post)}
                    className="group w-full py-4 sm:py-5 first:pt-0 flex items-start sm:items-center justify-between gap-4 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9A4E24] dark:focus-visible:ring-amber-400 rounded-lg"
                  >
                    <div className="space-y-1 min-w-0">
                      <h3 className="font-serif text-[18.5px] sm:text-[20.5px] font-normal text-[#231D18] dark:text-[#F3ECE2] group-hover:text-[#9A4E24] dark:group-hover:text-amber-400 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-[13px] sm:text-[13.5px] text-[#5C4E41] dark:text-stone-400 leading-relaxed line-clamp-1">
                        {post.takeaway}
                      </p>
                      <div className="flex items-center gap-2 text-[12px] font-mono text-[#6E5E4F] dark:text-stone-500 tabular-nums pt-0.5">
                        <span>{post.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <span className="text-[#9A4E24] dark:text-amber-400 group-hover:translate-x-1 transition-transform text-base shrink-0 p-1 mt-1 sm:mt-0">
                      →
                    </span>
                  </button>
                </article>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      {/* Distraction-Free Article Reader Portal */}
      <ModalShell
        isOpen={!!activeArticle}
        onClose={() => setActiveArticle(null)}
        labelledBy="article-reader-title"
        maxWidth="max-w-xl"
        panelKey={activeArticle?.id}
        panelClass="max-h-[88vh] sm:max-h-[85vh] overflow-y-auto p-5 sm:p-8 space-y-5 sm:space-y-6"
      >
        {activeArticle && (
          <>
            <div className="studio-modal-header sticky -top-5 sm:-top-8 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3.5 flex items-start justify-between gap-3 border-b z-10">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-[#5C4E41] dark:text-stone-400 tabular-nums">
                  <span>{activeArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2 id="article-reader-title" className="font-serif text-lg sm:text-2xl font-normal text-[#231D18] dark:text-[#F3ECE2] leading-snug">
                  {activeArticle.title}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <Tooltip content="Adjust reading text size" position="bottom" align="right">
                  <button
                    type="button"
                    onClick={() => setFontScale(scaleMeta.next)}
                    className="px-2.5 py-1.5 min-h-[36px] rounded-lg border border-[#D5C7B4] dark:border-stone-700 text-xs font-mono text-[#332B24] dark:text-stone-200 hover:bg-[#E6DAC8] dark:hover:bg-stone-800 active:scale-[0.97] transition-all cursor-pointer"
                  >
                    {scaleMeta.label}
                  </button>
                </Tooltip>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-[#5C4E41] dark:text-stone-400 hover:text-[#231D18] dark:hover:text-[#F3ECE2] hover:bg-[#EAE0CE]/60 dark:hover:bg-stone-800/60 active:scale-[0.96] transition-all cursor-pointer"
                  aria-label="Close article"
                >
                  <FiX className="text-lg" />
                </button>
              </div>
            </div>

            <div className="studio-modal-subcard p-3.5 rounded-xl border text-xs sm:text-[14px] text-[#332B24] dark:text-stone-200 leading-relaxed">
              <span className="font-mono font-medium text-[#9A4E24] dark:text-amber-400 mr-1.5">Key idea:</span>
              {activeArticle.takeaway}
            </div>

            <div className={`space-y-4 text-[#231D18] dark:text-[#E5DDD2] leading-[1.8] ${scaleMeta.cls}`}>
              {activeArticle.content.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? "first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-2.5 first-letter:text-[#231D18] dark:first-letter:text-[#F3ECE2] first-letter:leading-none"
                      : ""
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="pt-4 border-t border-[#DCD0C0] dark:border-stone-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => stepArticle(-1)}
                  className="group py-2 px-2.5 rounded-lg text-xs font-mono text-[#52453A] dark:text-stone-400 hover:text-[#231D18] dark:hover:text-[#F3ECE2] inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span className="transition-transform duration-150 group-hover:-translate-x-0.5">←</span>
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() => stepArticle(1)}
                  className="group py-2 px-2.5 rounded-lg text-xs font-mono text-[#9A4E24] dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Next essay</span>
                  <span className="transition-transform duration-150 group-hover:translate-x-0.5">→</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 min-h-[38px] rounded-lg bg-[#231D18] dark:bg-stone-100 text-[#F6EFE2] dark:text-stone-900 text-xs font-mono cursor-pointer hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Done
              </button>
            </div>
          </>
        )}
      </ModalShell>
    </section>
  );
};

export default Writing;
