import { BiMessageSquareDots } from "react-icons/bi";

const Data = () => {
  return (
    <div className="ml-0 md:ml-5 max-w-xl">

      <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
        Naymul Islam
      </h1>

      <h3 className="text-xl lg:text-2xl font-semibold my-4 text-zinc-700 dark:text-zinc-300">
        Full Stack Software Engineer
      </h3>

      <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
        I engineer fast, scalable web platforms using <strong className="text-zinc-900 dark:text-zinc-200">Next.js</strong>, <strong className="text-zinc-900 dark:text-zinc-200">TypeScript</strong>, and the <strong className="text-zinc-900 dark:text-zinc-200">MERN stack</strong>. I also design intelligent <strong className="text-zinc-900 dark:text-zinc-200">Agentic AI</strong> workflows that automate tasks with speed and precision.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href="#contact"
          className="btn-tactile uppercase"
        >
          <span>Say Hi</span>
          <BiMessageSquareDots className="text-xl animate-pulse" />
        </a>

        <a
          href="#projects"
          className="px-6 py-3 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
        >
          Explore Work ↓
        </a>
      </div>
    </div>
  );
};

export default Data;
