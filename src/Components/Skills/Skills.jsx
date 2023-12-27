import "./skills.css";
import FrontEnd from "./FrontEnd";
import BackEnd from "./BackEnd";
import ScrollDown from "../Home/ScrollDown";

const Skills = () => {
  return (
    <section className="skills my-52" id="skills">
      <h2 className="section_title">Skills</h2>
      <span className="section_subtitle">My technical level</span>

      <div className="skills_container container grid mb-16">
        <FrontEnd />
        <BackEnd />
      </div>
      <a href="#projects">
        <ScrollDown />
      </a>
    </section>
  );
};

export default Skills;
