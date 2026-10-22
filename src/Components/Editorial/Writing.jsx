import { useState } from "react";
import { FiX } from "react-icons/fi";
import Tooltip from "../UI/Tooltip";
import { ARTICLES } from "../../data/portfolioData";

const Writing = () => {
  const [activeArticle, setActiveArticle] = useState(null);
  const [fontScale, setFontScale] = useState("normal");

  const currentIdx = activeArticle
    ? ARTICLES.findIndex((a) => a.id === activeArticle.id)
    : -1;

  const handleNextArticle = () => {
    if (currentIdx === -1) return;
    const nextIdx = (currentIdx + 1) % ARTICLES.length;
    setActiveArticle(ARTICLES[nextIdx]);
  };

  const handlePrevArticle = () => {
    if (currentIdx === -1) return;
    const prevIdx = (currentIdx - 1 + ARTICLES.length) % ARTICLES.length;
    setActiveArticle(ARTICLES[prevIdx]);
  };

  return (
    <section className="py-3 sm:py-4 scroll-mt-24" id="writing">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6">
        <div className="border-t border-[#D2C3AE] dark:border-[#2B2622] pt-8 sm:pt-10">
          {/* Section Header */}
          <div className="flex items-baseline justify-between mb-5 sm:mb-6">
            <h2 className="font-serif text-[24px] sm:text-[27px] font-normal text-[#231D18] dark:text-[#F3ECE2]">
              Writing
            </h2>
            <button
              onClick={() => setActiveArticle(ARTICLES[0])}
              className="text-[13.5px] font-mono font-medium text-[#9A4E24] dark:text-amber-400 hover:underline inline-flex items-center gap-1.5 cursor-pointer py-1"
            >
              <span>All posts ({ARTICLES.length})</span>
              <span>→</span>
            </button>
          </div>

          {/* Clean Editorial Essay List */}
          <div className="divide-y divide-[#DFD2C0] dark:divide-[#2B2622]">
            {ARTICLES.map((post) => (
              <article
                key={post.id}
                onClick={() => setActiveArticle(post)}
                className="group py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1 min-w-0">
                  <h3 className="font-serif text-[18px] sm:text-[19.5px] font-normal text-[#231D18] dark:text-[#F3ECE2] group-hover:text-[#9A4E24] dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[12.5px] sm:text-[13px] text-[#52453A] dark:text-[#B8AEA2] tabular-nums">
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <span className="text-[#9A4E24] dark:text-amber-400 group-hover:translate-x-1 transition-transform text-base shrink-0 p-1">
                  →
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Distraction-Free Article Reader (Bottom Sheet on Mobile, Centered Modal on Tablet/Desktop) */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/50 dark:bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setActiveArticle(null)}
        >
          <div
            key={activeArticle.id}
            className="animate-editorial-fade max-w-xl w-full max-h-[88vh] sm:max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[#F6EFE2] dark:bg-[#1E1C19] border-t sm:border border-[#D5C7B4] dark:border-[#332E29] p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Top Bar inside Reader for easy Mobile Thumb Reach */}
            <div className="sticky -top-5 sm:-top-8 -mx-5 sm:-mx-8 px-5 sm:px-8 py-3.5 bg-[#F6EFE2]/95 dark:bg-[#1E1C19]/95 backdrop-blur-md flex items-start justify-between gap-3 border-b border-[#DCD0C0] dark:border-[#2E2925] z-10">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-[#5C4E41] dark:text-[#9C9184] tabular-nums">
                  <span>{activeArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2 className="font-serif text-lg sm:text-2xl font-normal text-[#231D18] dark:text-[#F3ECE2] leading-snug">
                  {activeArticle.title}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <Tooltip content="Adjust reading text size" position="bottom" align="right">
                  <button
                    onClick={() =>
                      setFontScale(fontScale === "normal" ? "lg" : fontScale === "lg" ? "sm" : "normal")
                    }
                    className="px-2.5 py-1.5 min-h-[36px] rounded-lg border border-[#D5C7B4] dark:border-[#38322C] text-xs font-mono text-[#332B24] dark:text-[#DFD7CC] hover:bg-[#E6DAC8] dark:hover:bg-[#2A2622] cursor-pointer"
                  >
                    {fontScale === "lg" ? "A+" : fontScale === "sm" ? "A-" : "Aa"}
                  </button>
                </Tooltip>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center rounded-lg text-[#5C4E41] dark:text-[#9C9184] hover:text-[#231D18] dark:hover:text-[#F3ECE2] cursor-pointer"
                  aria-label="Close article"
                >
                  <FiX className="text-lg" />
                </button>
              </div>
            </div>

            {/* Key Takeaway Summary */}
            <div className="p-3.5 rounded-xl bg-[#EAE0CE]/70 dark:bg-[#171513] border border-[#DCD0C0] dark:border-[#2E2925] text-xs sm:text-[14px] text-[#332B24] dark:text-[#DFD7CC] leading-relaxed">
              <span className="font-mono font-medium text-[#9A4E24] dark:text-amber-400 mr-1.5">
                Key idea:
              </span>
              {activeArticle.takeaway}
            </div>

            {/* Article Paragraphs */}
            <div
              className={`space-y-4 text-[#231D18] dark:text-[#DFD7CC] leading-[1.8] ${
                fontScale === "lg"
                  ? "text-base sm:text-[18px]"
                  : fontScale === "sm"
                  ? "text-xs sm:text-sm"
                  : "text-[15px] sm:text-[16px]"
              }`}
            >
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

            {/* Reader Footer with Prev, Next & Done */}
            <div className="pt-4 border-t border-[#DCD0C0] dark:border-[#2E2925] flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevArticle}
                  className="py-2 px-2.5 rounded-lg text-xs font-mono text-[#52453A] dark:text-[#9C9184] hover:text-[#231D18] dark:hover:text-[#F3ECE2] cursor-pointer"
                >
                  ← Prev
                </button>
                <button
                  onClick={handleNextArticle}
                  className="py-2 px-2.5 rounded-lg text-xs font-mono text-[#9A4E24] dark:text-amber-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Next essay</span>
                  <span>→</span>
                </button>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 min-h-[38px] rounded-lg bg-[#231D18] dark:bg-[#F3ECE2] text-[#F6EFE2] dark:text-[#1C1917] text-xs font-mono cursor-pointer hover:opacity-90"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Writing;
