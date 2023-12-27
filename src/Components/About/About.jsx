import "./about.css";
import Info from "./Info";
import ScrollDown from "../Home/ScrollDown";

const About = () => {
  return (
    <section className="about my-52" id="about">
      <h2 className="section_title">About Me</h2>
      <span className="section_subtitle">My introduction</span>

      <div className="max-w-4xl mx-auto text-center">
        <div>
          <Info />

          <p className="py-10 px-6 lg:px-40">
            MERN stack developer driven to contributing to dynamic web projects.
            Proficient in MongoDB, Express.js, React, and Node.js Committed to
            ongoing learning and innovation.
          </p>
        </div>
      </div>
      <div className="w-full text-center mt-16">
        <a href="#skills">
          <ScrollDown />
        </a>
      </div>
    </section>
  );
};

export default About;
