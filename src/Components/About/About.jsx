import "./about.css";
import Info from "./Info";
import ScrollDown from "../Home/ScrollDown";

const About = () => {
  return (
    <section className="about py-24 relative" id="about">
      <div className="ambient-glow top-1/2 left-1/4 w-72 h-72 bg-blue-500/10"></div>

      <div className="relative max-w-4xl mx-auto px-6">
        <h2 className="section_title">About Me</h2>
        <span className="section_subtitle">My introduction</span>

        <div className="text-center">
          <Info />

          <p className="py-8 px-2 sm:px-12 md:px-20 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal">
            I am a full-stack software engineer dedicated to building resilient, easy-to-use digital products. Proficient in <strong className="text-zinc-900 dark:text-zinc-200">Next.js</strong>, <strong className="text-zinc-900 dark:text-zinc-200">TypeScript</strong>, <strong className="text-zinc-900 dark:text-zinc-200">React</strong>, <strong className="text-zinc-900 dark:text-zinc-200">Node.js</strong>, and <strong className="text-zinc-900 dark:text-zinc-200">MongoDB</strong>, I thrive at taking ideas from zero to production. I love clean code, intuitive user interfaces, and automating workflows with <strong className="text-zinc-900 dark:text-zinc-200">Agentic AI</strong>.
          </p>
        </div>

        <div className="w-full text-center mt-10">
          <a href="#skills">
            <ScrollDown />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
