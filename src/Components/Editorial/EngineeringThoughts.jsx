const EngineeringThoughts = () => {
  const thoughts = [
    {
      index: "01",
      title: "Understanding Before Implementation",
      summary:
        "One of the most valuable lessons in software engineering is learning to resist the urge to jump directly into the code editor. Spending thoughtful hours clarifying schema boundaries, user states, and failure modes on paper regularly saves weeks of painful refactoring. Clean code is always a byproduct of clear thinking.",
    },
    {
      index: "02",
      title: "The Discipline of Solo Building",
      summary:
        "Architecting platforms like LearnHikmah and its LMS entirely solo teaches an engineer profound accountability across the full stack. When you are solely responsible for database indexing, server responses, client hydration, and user interface polish, you quickly learn to value simplicity and eliminate ornamental complexity.",
    },
    {
      index: "03",
      title: "Agentic AI as a Force Multiplier",
      summary:
        "Agentic AI and autonomous tool-calling workflows are not meant to replace software craftsmanship; they are meant to amplify it. By offloading mechanical boilerplate, complex test generation, and multi-step data pipelines to structured AI workflows, an engineer can focus their attention where it matters most: system architecture, business logic, and human empathy.",
    },
  ];

  return (
    <section className="py-20 border-b border-stone-200/80 dark:border-stone-800/80" id="thinking">
      <div className="max-w-2xl mx-auto px-6 space-y-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
            02 / Reflections
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 mt-1">
            Thinking Behind the Code
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
            Notes and principles that guide how I approach software architecture, developer velocity, and product craftsmanship.
          </p>
        </div>

        <div className="space-y-8">
          {thoughts.map((item) => (
            <article
              key={item.index}
              className="p-6 rounded-xl border border-stone-200/70 dark:border-stone-800/70 bg-[#F5F1EA]/40 dark:bg-[#1E1C1A]/40 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-stone-400 dark:text-stone-500">
                  {item.index}
                </span>
                <h3 className="font-serif text-lg font-normal text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                {item.summary}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngineeringThoughts;
