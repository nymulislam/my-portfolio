import "./skills.css";
import FrontEnd from "./FrontEnd";
import BackEnd from "./BackEnd";
import ScrollDown from "../Home/ScrollDown";

const Skills = () => {
  return (
    <section className="skills py-24 relative" id="skills">
      <div className="ambient-glow top-1/3 right-1/4 w-80 h-80 bg-purple-500/10"></div>

      <div className="relative max-w-5xl mx-auto px-6">
        <h2 className="section_title">Skills</h2>
        <span className="section_subtitle">My technical level</span>

        <div className="skills_container grid mb-16">
          <FrontEnd />
          <BackEnd />
        </div>

        <div className="w-full text-center mt-12">
          <a href="#projects">
            <ScrollDown />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
