import { useState } from "react";
import ScrollDown from "../Home/ScrollDown";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const flagshipProjects = [
    {
      id: "learnhikmah-public",
      title: "LearnHikmah Platform",
      category: "flagship",
      badge: "Completed Solo Build",
      role: "Solo Architecture & Engineering",
      summary:
        "Full-fledged educational and community platform completed solo. Engineered with Next.js, responsive Tailwind interfaces, and SEO optimization for global students.",
      link: "https://learnhikmah.com",
      image: "https://i.postimg.cc/T37M2fpc/Ilm-Med-preview.png", // fallback or project representation
      tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "REST API"],
      isFlagship: true,
      displayDomain: "learnhikmah.com",
    },
    {
      id: "learnhikmah-lms",
      title: "LearnHikmah LMS",
      category: "flagship",
      badge: "Solo LMS Architecture",
      role: "Solo Full-Stack Engineer (Private Org)",
      summary:
        "Dedicated Learning Management System developed solo inside a private GitHub organization. Handles course progression, student dashboard, and role-based access control.",
      link: "https://app.learnhikmah.com",
      image: "https://i.postimg.cc/Gm4w2t6m/Job-Heaven-Preview.png",
      tags: ["Full Stack", "TypeScript", "Auth & RBAC", "LMS Engine", "Private Org"],
      isFlagship: true,
      displayDomain: "app.learnhikmah.com",
    },
    {
      id: "e-page",
      title: "E-Page Commerce System",
      category: "flagship",
      badge: "GitHub Top Pinned",
      role: "Solo Full-Stack Creator",
      summary:
        "My top pinned full-stack showcase project on GitHub. Features dynamic catalog management, responsive cart workflows, backend API integration, and smooth checkout.",
      link: "https://e-page.vercel.app",
      image: "https://i.postimg.cc/hvK8yJV8/Car-Universe-preview.png",
      tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      isFlagship: true,
      displayDomain: "e-page.vercel.app",
    },
  ];

  const otherProjects = [
    {
      id: "ilm-med",
      title: "IlmMed Solution",
      category: "mern",
      badge: "Healthcare Platform",
      summary:
        "Personalized health management platform for convenient and efficient healthcare services, patient appointment booking, and medical schedules.",
      link: "https://ilm-med-solution.vercel.app/",
      image: "https://i.postimg.cc/T37M2fpc/Ilm-Med-preview.png",
      tags: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      id: "job-heaven",
      title: "Job Heaven",
      category: "mern",
      badge: "Recruitment Portal",
      summary:
        "Revolutionizing job search! Seamless recruitment platform connecting seekers and employers effortlessly with instant applications.",
      link: "https://job-heaven.vercel.app/",
      image: "https://i.postimg.cc/Gm4w2t6m/Job-Heaven-Preview.png",
      tags: ["React", "Express", "MongoDB", "Tailwind CSS"],
    },
    {
      id: "car-universe",
      title: "Car Universe",
      category: "web",
      badge: "Automotive Catalog",
      summary:
        "Dedicated to showcasing premium automotive products tailored for our modern e-commerce platform and vehicle enthusiasts.",
      link: "https://car-universe.vercel.app/",
      image: "https://i.postimg.cc/hvK8yJV8/Car-Universe-preview.png",
      tags: ["MERN Stack", "React", "Express", "Node.js"],
    },
    {
      id: "training-ninja",
      title: "Training Ninja",
      category: "web",
      badge: "EdTech Learning",
      summary:
        "Explore the Training Ninja platform and elevate your web development journey. Start learning modern coding with style and efficiency!",
      link: "https://training-ninja.vercel.app/",
      image: "https://i.postimg.cc/QCB7npHT/Training-Ninja-preview.png",
      tags: ["React", "Firebase", "JavaScript", "Tailwind CSS"],
    },
  ];

  const allCombined = [...flagshipProjects, ...otherProjects];

  const displayedProjects =
    filter === "all"
      ? allCombined
      : filter === "flagship"
      ? flagshipProjects
      : allCombined.filter((p) => p.category === filter);

  return (
    <section className="projects py-24 relative" id="projects">
      <div className="ambient-glow top-20 right-10 w-96 h-96 bg-blue-500/10"></div>
      <div className="ambient-glow bottom-20 left-10 w-96 h-96 bg-emerald-500/10"></div>

      <div className="relative max-w-5xl mx-auto px-6">
        <h2 className="section_title">Projects</h2>
        <span className="section_subtitle">Showcase of My Work</span>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { label: "All Projects", key: "all" },
            { label: "Flagship Solo Works", key: "flagship" },
            { label: "MERN Full Stack", key: "mern" },
            { label: "Web Applications", key: "web" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                filter === tab.key
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md"
                  : "bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className={`group rounded-xl bg-white dark:bg-[#121215] border border-black/10 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                project.isFlagship ? "ring-2 ring-blue-500/30" : ""
              }`}
            >
              {/* Image with zoom overlay */}
              <div className="relative overflow-hidden h-64 sm:h-72 bg-zinc-100 dark:bg-zinc-800">
                <img
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <span className="px-4 py-2 rounded-lg bg-white text-zinc-900 font-semibold text-xs uppercase tracking-wider shadow-lg">
                    Visit Live Platform ↗
                  </span>
                </a>

                {/* Badge Tag on top */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/70 text-white shadow">
                  {project.badge}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                {project.displayDomain && (
                  <div className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    {project.displayDomain}
                  </div>
                )}

                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {project.title}
                </h3>

                {project.role && (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                    {project.role}
                  </span>
                )}

                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 flex-grow">
                  {project.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Tactile Preview Button */}
                <div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tactile text-xs uppercase w-full sm:w-auto"
                  >
                    <span>Preview</span>
                    <i className="bx bx-right-arrow-alt text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full text-center mt-16">
          <a href="#qualifications">
            <ScrollDown />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
