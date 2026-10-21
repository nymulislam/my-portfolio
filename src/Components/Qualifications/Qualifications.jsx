import { useState } from "react";
import "./qualifications.css";

const Qualifications = () => {
  const [toggleState, setToggleState] = useState(2); // default Experience or 1 for Education

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="qualification py-24 relative" id="qualifications">
      <div className="ambient-glow top-1/2 right-1/4 w-80 h-80 bg-blue-500/10"></div>

      <div className="relative max-w-4xl mx-auto px-6">
        <h2 className="section_title">Qualification</h2>
        <span className="section_subtitle">My personal journey</span>

        <div className="qualification_container">
          {/* Tabs */}
          <div className="qualification_tabs">
            <div
              className={
                toggleState === 2
                  ? "qualification_button qualification_active"
                  : "qualification_button"
              }
              onClick={() => toggleTab(2)}
            >
              <i className="uil uil-briefcase-alt qualification_icon"></i>
              Experience
            </div>

            <div
              className={
                toggleState === 1
                  ? "qualification_button qualification_active"
                  : "qualification_button"
              }
              onClick={() => toggleTab(1)}
            >
              <i className="uil uil-graduation-cap qualification_icon"></i>
              Education
            </div>
          </div>

          <div className="qualification_sections">
            {/* Experience Section */}
            <div
              className={
                toggleState === 2
                  ? "qualification_content qualification_content-active"
                  : "qualification_content"
              }
            >
              {/* Item 1 */}
              <div className="qualification_data">
                <div>
                  <h3 className="qualification_title">Solo Full-Stack Engineer</h3>
                  <span className="qualification_subtitle">
                    LearnHikmah & LMS Platform
                  </span>
                  <div className="qualification_calender">
                    <i className="bx bx-calendar"></i>
                    2023 - Present
                  </div>
                </div>
                <div>
                  <span className="qualification_rounder"></span>
                  <span className="qualification_line"></span>
                </div>
                <div></div>
              </div>

              {/* Item 2 */}
              <div className="qualification_data">
                <div></div>
                <div>
                  <span className="qualification_rounder"></span>
                  <span className="qualification_line"></span>
                </div>
                <div>
                  <h3 className="qualification_title">Full-Stack MERN Developer</h3>
                  <span className="qualification_subtitle">
                    E-Page & Independent Projects
                  </span>
                  <div className="qualification_calender">
                    <i className="bx bx-calendar"></i>
                    2023 - Present
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="qualification_data">
                <div>
                  <h3 className="qualification_title">Agentic AI & Systems Builder</h3>
                  <span className="qualification_subtitle">
                    Autonomous Workflows & LLMs
                  </span>
                  <div className="qualification_calender">
                    <i className="bx bx-calendar"></i>
                    2024 - Present
                  </div>
                </div>
                <div>
                  <span className="qualification_rounder"></span>
                  <span className="qualification_line"></span>
                </div>
                <div></div>
              </div>
            </div>

            {/* Education Section */}
            <div
              className={
                toggleState === 1
                  ? "qualification_content qualification_content-active"
                  : "qualification_content"
              }
            >
              {/* Education Item 1 */}
              <div className="qualification_data">
                <div>
                  <h3 className="qualification_title">Islamic Studies & Arabic</h3>
                  <span className="qualification_subtitle">
                    Jamia Rahmania Arabia - Dhaka
                  </span>
                  <div className="qualification_calender">
                    <i className="bx bx-calendar"></i>
                    2015 - Completed
                  </div>
                </div>
                <div>
                  <span className="qualification_rounder"></span>
                  <span className="qualification_line"></span>
                </div>
                <div></div>
              </div>

              {/* Education Item 2 */}
              <div className="qualification_data">
                <div></div>
                <div>
                  <span className="qualification_rounder"></span>
                  <span className="qualification_line"></span>
                </div>
                <div>
                  <h3 className="qualification_title">Computer Science & Full-Stack</h3>
                  <span className="qualification_subtitle">
                    Self-Directed & Engineering Mentorship
                  </span>
                  <div className="qualification_calender">
                    <i className="bx bx-calendar"></i>
                    2022 - Present
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualifications;
