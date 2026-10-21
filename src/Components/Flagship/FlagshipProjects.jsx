import React from "react";
import { FiArrowUpRight, FiLock, FiCheckCircle } from "react-icons/fi";

const FlagshipProjects = () => {
  const flagshipWorks = [
    {
      id: "learnhikmah-public",
      title: "LearnHikmah Platform",
      domain: "learnhikmah.com",
      link: "https://learnhikmah.com",
      status: "Production Live",
      role: "Solo Architecture & Engineering",
      summary:
        "Comprehensive educational & community portal developed entirely solo. Built to deliver seamless learning experiences with high performance, intuitive navigation, and search-optimized structure.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "REST API"],
      highlights: [
        "Architected and deployed entirely as an independent engineer",
        "Fast server-side rendering for optimal load speeds & global accessibility",
        "Clean responsive user interface built for multi-device learners",
      ],
      isPrivateRepo: false,
    },
    {
      id: "learnhikmah-lms",
      title: "LearnHikmah LMS System",
      domain: "app.learnhikmah.com",
      link: "https://app.learnhikmah.com",
      status: "Active Production",
      role: "Solo Full-Stack Engineer",
      summary:
        "Dedicated Learning Management System engineered solo inside an organization. Powers student onboarding, course content delivery, progress tracking, and administrative control panels.",
      stack: ["Full Stack", "TypeScript", "Next.js / Node", "Auth & RBAC", "LMS Database"],
      highlights: [
        "Solo development handling frontend, backend workflows, and user permissions",
        "Role-based access control for students, instructors, and system administrators",
        "Hosted in private GitHub organization repository with continuous deployments",
      ],
      isPrivateRepo: true,
    },
    {
      id: "e-page",
      title: "E-Page Commerce System",
      domain: "e-page.vercel.app",
      link: "https://e-page.vercel.app",
      status: "Featured GitHub Pin",
      role: "Full-Stack Creator",
      summary:
        "Flagship full-stack web application featuring dynamic catalog management, lightning-fast client filtering, structured state handling, and a frictionless end-to-end checkout experience.",
      stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Vercel"],
      highlights: [
        "Top pinned showcase project on GitHub demonstrating full-stack MERN mastery",
        "Robust database modeling and reactive state management",
        "Polished micro-interactions and smooth checkout workflow",
      ],
      isPrivateRepo: false,
      githubUrl: "https://github.com/nymulislam",
    },
  ];

  return (
    <section className="py-20 md:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80" id="flagship">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
            Featured Highlights
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
            Flagship Platforms & Case Studies
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">
            Selected major platforms engineered solo from concept to production, emphasizing high reliability, clean architecture, and practical scale.
          </p>
        </div>

        {/* Case Studies Cards */}
        <div className="space-y-8">
          {flagshipWorks.map((project, index) => (
            <div
              key={project.id}
              className="p-6 sm:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-[#121215] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm"
            >
              {/* Top row: Project Title & Direct Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-semibold text-zinc-400 dark:text-zinc-500">
                      0{index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    <span className="font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <FiCheckCircle className="text-xs" />
                      {project.status}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-600 dark:text-zinc-300 font-medium">
                      {project.role}
                    </span>
                    {project.isPrivateRepo && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 text-zinc-400" title="Private organization repository">
                          <FiLock className="text-xs" /> Private Org
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 transition-colors whitespace-nowrap"
                  >
                    <span>Visit Live</span>
                    <FiArrowUpRight className="text-sm" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="py-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {project.summary}
              </p>

              {/* Engineering Highlights */}
              <div className="mb-4 space-y-1.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="text-zinc-400 dark:text-zinc-600 select-none">→</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack rendered as clean unboxed text with separators */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                <span className="font-sans text-xs text-zinc-400 dark:text-zinc-500">Tech:</span>
                {project.stack.map((item, idx) => (
                  <React.Fragment key={item}>
                    <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                    {idx < project.stack.length - 1 && (
                      <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlagshipProjects;
