import { useState } from "react";
import DynamicShelf from "../Handcrafted/DynamicShelf";
import { Toast } from "../UI/Toast";

const Hero = () => {
  const [copiedSnippet, setCopiedSnippet] = useState("");

  const handleCopyTag = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(`Copied: ${text}`);
    setTimeout(() => setCopiedSnippet(""), 2200);
  };

  const codePills = [
    { label: "<Next.js />", code: "import { AppRouter } from 'next/app';" },
    { label: "TypeScript", code: "type FullStackEngineer = { architect: boolean };" },
    { label: "MERN Stack", code: "const mern = ['MongoDB', 'Express', 'React', 'Node'];" },
    { label: "Agentic AI", code: "const agent = await gemini.tools.execute();" },
  ];

  return (
    <section className="relative pt-10 sm:pt-14 pb-14" id="home">
      <div className="max-w-2xl mx-auto px-6 relative">
        {/* Dynamic Shelf on the upper right (scaled and responsive on all devices) */}
        <DynamicShelf />

        {/* Hero Text */}
        <div className="space-y-4 max-w-sm sm:max-w-md md:max-w-lg">
          <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-normal">
            Dhaka, Bangladesh
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-stone-900 dark:text-stone-50 tracking-tight leading-none">
            Hi, I’m Naymul.
          </h1>

          <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-normal pt-1">
            I build software, modern full-stack systems, and autonomous AI workflows.
          </p>

          {/* Interactive Developer Code Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
            {codePills.map((pill) => (
              <button
                key={pill.label}
                onClick={() => handleCopyTag(pill.code)}
                className="px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono bg-stone-200/60 dark:bg-stone-800/60 hover:bg-stone-300/70 dark:hover:bg-stone-700/70 text-stone-800 dark:text-stone-200 transition-all cursor-pointer border border-transparent hover:border-stone-400/40 dark:hover:border-stone-600/40"
                title={`Click to copy: ${pill.code}`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Toast
        message={copiedSnippet}
        isVisible={!!copiedSnippet}
        onClose={() => setCopiedSnippet("")}
      />
    </section>
  );
};

export default Hero;
