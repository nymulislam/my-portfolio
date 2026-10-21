const Journey = () => {
  const competencies = [
    { label: "Full Stack", items: "Next.js, React, TypeScript, Node.js, Express, REST APIs" },
    { label: "Data & Systems", items: "MongoDB & Mongoose, PostgreSQL, Firebase Auth & Firestore" },
    { label: "Intelligent Workflows", items: "Agentic AI systems, LLM tool calling, prompt engineering" },
    { label: "Engineering Practices", items: "Clean architecture, solo platform ownership, Git CI/CD" },
  ];

  return (
    <section className="py-20 border-b border-stone-200/80 dark:border-stone-800/80" id="journey">
      <div className="max-w-2xl mx-auto px-6 space-y-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
            03 / Background
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 mt-1">
            Foundations & Education
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
            The formative disciplines that shaped my analytical thinking and transition into software engineering.
          </p>
        </div>

        {/* Narrative */}
        <div className="space-y-4 text-base leading-relaxed text-stone-700 dark:text-stone-300">
          <p>
            My intellectual journey began with an intensive study of <strong className="font-medium text-stone-900 dark:text-stone-100">Islamic Studies and Classical Arabic Literature</strong> at <strong className="font-medium text-stone-900 dark:text-stone-100">Jamia Rahmania Arabia</strong> in Dhaka (2015 - Completed). That education gave me far more than language comprehension: it instilled deep rigor in textual analysis, grammatical syntax, formal logic, and the patience needed to trace complex arguments to their roots.
          </p>
          <p>
            When I transitioned into <strong className="font-medium text-stone-900 dark:text-stone-100">Computer Science and Software Engineering</strong>, I found that programming shares the exact same heartbeat—strict syntax rules, structured logic trees, and the beauty of building coherent systems from fundamental principles.
          </p>
          <p>
            Today, I bring that same disciplined focus and continuous learning into engineering modern web applications, designing scalable databases, and integrating Agentic AI tools.
          </p>
        </div>

        {/* Competencies Breakdown */}
        <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800/60 space-y-3">
          <h3 className="font-serif text-lg font-normal text-stone-900 dark:text-stone-100">
            Technical Competencies
          </h3>
          <div className="space-y-2.5">
            {competencies.map((comp) => (
              <div key={comp.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-xs sm:text-sm">
                <span className="font-mono text-stone-500 dark:text-stone-400 w-44 shrink-0">
                  {comp.label}:
                </span>
                <span className="text-stone-800 dark:text-stone-200 font-normal">
                  {comp.items}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
