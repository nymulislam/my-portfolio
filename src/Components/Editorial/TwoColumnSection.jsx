import { FiArrowRight } from "react-icons/fi";

const TwoColumnSection = () => {
  return (
    <section className="py-12 border-t border-stone-200 dark:border-stone-800/80" id="projects">
      <div className="max-w-2xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {/* Left Column: Projects & open source */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100 mb-6">
              Projects & open source
            </h2>

            {/* LearnHikmah Public Site */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between gap-2">
                <a
                  href="https://learnhikmah.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-base text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400 inline-flex items-center gap-1 group font-medium"
                >
                  <span>LearnHikmah Platform</span>
                  <span className="text-xs text-stone-400 group-hover:text-amber-800 dark:group-hover:text-amber-400">↗</span>
                </a>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400">Solo Build</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Full educational & community portal completed solo. Engineered with Next.js, responsive Tailwind layouts, and fast SSR for global learners.
              </p>
              <div className="flex gap-1.5 text-[10px] font-mono text-stone-400 pt-0.5">
                <span>Next.js</span> · <span>TypeScript</span> · <span>Tailwind</span>
              </div>
            </div>

            {/* LearnHikmah LMS */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between gap-2">
                <a
                  href="https://app.learnhikmah.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-base text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400 inline-flex items-center gap-1 group font-medium"
                >
                  <span>LearnHikmah LMS</span>
                  <span className="text-xs text-stone-400 group-hover:text-amber-800 dark:group-hover:text-amber-400">↗</span>
                </a>
                <span className="text-[10px] font-mono text-stone-400">Private Org</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Dedicated Learning Management System developed solo in private organization. Handles course progression, student dashboard, and role-based access.
              </p>
              <div className="flex gap-1.5 text-[10px] font-mono text-stone-400 pt-0.5">
                <span>Full Stack</span> · <span>Auth & RBAC</span> · <span>Node.js</span>
              </div>
            </div>

            {/* E-Page */}
            <div className="space-y-1">
              <div className="flex items-baseline justify-between gap-2">
                <a
                  href="https://e-page.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-base text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400 inline-flex items-center gap-1 group font-medium"
                >
                  <span>E-Page Commerce</span>
                  <span className="text-xs text-stone-400 group-hover:text-amber-800 dark:group-hover:text-amber-400">↗</span>
                </a>
                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400">Top Pinned</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Top pinned full-stack MERN application on GitHub. Features dynamic catalog management, reactive cart state, and smooth checkout.
              </p>
              <div className="flex gap-1.5 text-[10px] font-mono text-stone-400 pt-0.5">
                <span>React</span> · <span>Node.js</span> · <span>MongoDB</span>
              </div>
            </div>

            {/* Selected Works Archive */}
            <div className="space-y-1">
              <div className="font-serif text-base text-stone-900 dark:text-stone-100 font-medium">
                Selected Works Archive
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                <a href="https://ilm-med-solution.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-white">IlmMed Solution</a>,{" "}
                <a href="https://job-heaven.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-white">Job Heaven</a>,{" "}
                <a href="https://car-universe.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-white">Car Universe</a>, and{" "}
                <a href="https://training-ninja.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-white">Training Ninja</a>.
              </p>
            </div>

            {/* Bottom link */}
            <div className="pt-2">
              <a
                href="https://github.com/nymulislam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-amber-800 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Explore my work</span>
                <FiArrowRight className="text-xs" />
              </a>
            </div>
          </div>

          {/* Right Column: Books & teaching / Journey */}
          <div className="space-y-6" id="about">
            <h2 className="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100 mb-6">
              Books & foundations
            </h2>

            {/* Academic Foundation */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                Academic Foundation
              </div>
              <div className="font-serif text-base text-stone-900 dark:text-stone-100 font-medium">
                Islamic Studies & Classical Arabic
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Jamia Rahmania Arabia (Dhaka). Rigorous training in textual analysis, grammatical syntax, formal logic, and disciplined study habits.
              </p>
            </div>

            {/* Full Stack Architecture */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                Engineering Discipline
              </div>
              <div className="font-serif text-base text-stone-900 dark:text-stone-100 font-medium">
                Modern Full-Stack Systems
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Next.js (App Router), TypeScript, React, and Node.js. Architecting server-side rendered platforms with clean schema modeling.
              </p>
            </div>

            {/* Intelligent Systems */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                AI & Systems
              </div>
              <div className="font-serif text-base text-stone-900 dark:text-stone-100 font-medium">
                Agentic AI & Autonomous Tools
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Integrating LLM function calling, structured schemas, autonomous tool execution, and automated testing into production apps.
              </p>
            </div>

            {/* Philosophy */}
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                Engineering Philosophy
              </div>
              <div className="font-serif text-base text-stone-900 dark:text-stone-100 font-medium">
                Think Like a Software Engineer
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Learning to question requirements and uncover hidden edge cases on paper before touching the keyboard.
              </p>
            </div>

            {/* Bottom link */}
            <div className="pt-2">
              <a
                href="#contact"
                className="text-xs font-mono text-amber-800 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Journey & mentoring</span>
                <FiArrowRight className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnSection;
