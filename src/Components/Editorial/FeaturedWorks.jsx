import { FiArrowUpRight, FiLock } from "react-icons/fi";

const FeaturedWorks = () => {
  const flagshipProjects = [
    {
      id: "learnhikmah-public",
      title: "LearnHikmah Platform",
      domain: "learnhikmah.com",
      link: "https://learnhikmah.com",
      status: "Production Live · Completed",
      role: "Solo Architecture & Engineering",
      narrative:
        "A full-fledged educational and community platform engineered entirely solo. Built with Next.js to provide fast server-side rendering, smooth multi-device navigation, and accessibility for learners globally.",
      stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "REST API"],
      points: [
        "Sole engineer handling design, frontend, and production deployment",
        "Optimized server-rendered pages for swift global page loads",
        "Clean, distraction-free reading and lesson exploration interface",
      ],
      isPrivate: false,
    },
    {
      id: "learnhikmah-lms",
      title: "LearnHikmah LMS System",
      domain: "app.learnhikmah.com",
      link: "https://app.learnhikmah.com",
      status: "Active Production",
      role: "Solo Full-Stack Engineer (Private Org)",
      narrative:
        "A comprehensive Learning Management System developed solo within a private GitHub organization. Powers student account onboarding, interactive video curriculum, course completion tracking, and administrative control.",
      stack: ["Full Stack", "TypeScript", "Node.js", "Auth & RBAC", "LMS Engine"],
      points: [
        "Architected role-based access for students, instructors, and administrators",
        "Engineered reliable state persistence for lesson progress and assessments",
        "Maintained and deployed through private organization CI/CD workflows",
      ],
      isPrivate: true,
    },
    {
      id: "e-page",
      title: "E-Page Commerce Platform",
      domain: "e-page.vercel.app",
      link: "https://e-page.vercel.app",
      status: "GitHub Top Pinned",
      role: "Full-Stack Creator",
      narrative:
        "My top pinned full-stack showcase on GitHub. Demonstrates robust end-to-end MERN architecture with dynamic catalog filtering, reactive shopping cart state, and a frictionless multi-step checkout workflow.",
      stack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      points: [
        "Full-stack MERN implementation with structured schema modeling",
        "Dynamic client-side search, filtering, and instant state reactivity",
        "Tested across mobile, tablet, and desktop viewports",
      ],
      isPrivate: false,
    },
  ];

  const archiveProjects = [
    {
      title: "IlmMed Solution",
      link: "https://ilm-med-solution.vercel.app/",
      summary: "Patient appointment scheduling and healthcare management platform.",
      tech: "React · MongoDB · Node.js",
    },
    {
      title: "Job Heaven",
      link: "https://job-heaven.vercel.app/",
      summary: "Recruitment portal connecting qualified candidates with employers.",
      tech: "React · Express · MongoDB",
    },
    {
      title: "Car Universe",
      link: "https://car-universe.vercel.app/",
      summary: "Automotive showcase and parts catalog with shopping workflow.",
      tech: "MERN Stack · React · Node",
    },
    {
      title: "Training Ninja",
      link: "https://training-ninja.vercel.app/",
      summary: "Interactive web development learning platform with milestone tracking.",
      tech: "React · Firebase · Tailwind",
    },
  ];

  return (
    <section className="py-20 border-b border-stone-200/80 dark:border-stone-800/80" id="work">
      <div className="max-w-2xl mx-auto px-6 space-y-12">
        {/* Section Kicker & Title */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-stone-500 dark:text-stone-400">
            01 / Craft & Code
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 mt-1">
            Featured Systems & Products
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
            Major platforms I have engineered solo, focusing on structural reliability, clear user journeys, and clean code.
          </p>
        </div>

        {/* Flagship Projects Editorial List */}
        <div className="space-y-12">
          {flagshipProjects.map((project, idx) => (
            <article
              key={project.id}
              className="p-6 sm:p-7 rounded-xl border border-stone-200/80 dark:border-stone-800/80 bg-[#F5F1EA]/60 dark:bg-[#1E1C1A]/60 space-y-4 hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200/60 dark:border-stone-800/60 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-stone-400">0{idx + 1}</span>
                    <h3 className="font-serif text-xl font-normal text-stone-900 dark:text-stone-100">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-1">
                    <span className="font-mono text-stone-700 dark:text-stone-300">{project.role}</span>
                    {project.isPrivate && (
                      <span className="flex items-center gap-1 text-stone-400">
                        · <FiLock className="text-xs" /> Private Org
                      </span>
                    )}
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white editorial-link self-start sm:self-auto"
                >
                  <span>{project.domain}</span>
                  <FiArrowUpRight className="text-xs" />
                </a>
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-stone-700 dark:text-stone-300">
                {project.narrative}
              </p>

              <div className="space-y-1.5 pt-1">
                {project.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                    <span className="text-stone-400 select-none">→</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-200/50 dark:border-stone-800/50 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-stone-500 dark:text-stone-400">
                <span className="text-stone-400">Stack:</span>
                {project.stack.map((tech, tIdx) => (
                  <span key={tech}>
                    <span className="text-stone-700 dark:text-stone-300">{tech}</span>
                    {tIdx < project.stack.length - 1 && <span className="ml-2 text-stone-400">·</span>}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Archive of other selected projects */}
        <div className="pt-4 space-y-4">
          <h3 className="font-serif text-lg font-normal text-stone-900 dark:text-stone-100">
            Selected Works Archive
          </h3>
          <div className="divide-y divide-stone-200/70 dark:divide-stone-800/70 border-y border-stone-200/70 dark:border-stone-800/70">
            {archiveProjects.map((item) => (
              <div key={item.title} className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-stone-900 dark:text-stone-100 hover:underline inline-flex items-center gap-1"
                  >
                    <span>{item.title}</span>
                    <FiArrowUpRight className="text-xs text-stone-400" />
                  </a>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {item.summary}
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-400 dark:text-stone-500 whitespace-nowrap self-start sm:self-auto">
                  {item.tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
