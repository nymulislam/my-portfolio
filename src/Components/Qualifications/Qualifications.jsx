import { useState } from "react";
import "./qualifications.css";

const Qualifications = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <section className="qualification my-64" id="qualifications">
      <h2 className="section_title">Qualification</h2>
      <span className="section_subtitle">My personal journey</span>

      <div className="qualification_container container">
        <div className="qualification_tabs">
          {/* Educations */}
          <div
            className={
              toggleState === 1
                ? "qualification_button button--flex qualification_active"
                : "qualification_button button--flex"
            }
            onClick={() => toggleTab(1)}
          >
            <i className="uil uil-graduation-cap qualification_icon"></i>
            Education
          </div>

          {/* Experience */}
          <div
            className={
              toggleState === 2
                ? "qualification_button button--flex qualification_active"
                : "qualification_button button--flex"
            }
            onClick={() => toggleTab(2)}
          >
            <i className="uil uil-briefcase-alt qualification_icon"></i>
            Experience
          </div>
        </div>

        <div className="qualification_sections">
          <div
            className={
              toggleState === 1
                ? "qualification_content qualification_content-active"
                : "qualification_content"
            }
          >
            <div className="qualification_data">
              <div>
                <h3 className="qualification_title">Islamic Studies</h3>
                <span className="qualification_subtitle">
                  Jamia Rahmania Arabia - Dhaka
                </span>

                {/* Date */}
                <div className="qualification_calender">
                  <i className="bx bx-calendar"></i>
                  2015 - Present
                </div>
              </div>
              <div>
                <span className="qualification_rounder"></span>
                <span className="qualification_line"></span>
              </div>
            </div>

            <div className="qualification_data">
              <div></div>
              <div>
                <span className="qualification_rounder"></span>
                <span className="qualification_line"></span>
              </div>

              {/* Empty section2 for Education */}
              <div>
                <h3 className="qualification_title"></h3>
                <span className="qualification_subtitle"></span>
                <div className="qualification_calender">
                  {/* <i className="bx bx-calendar"></i> */}
                </div>
              </div>
            </div>

            {/* Empty section3 for Education */}
            <div className="qualification_data">
              <div>
                <h3 className="qualification_title"></h3>
                <span className="qualification_subtitle"></span>

                {/* Date */}
                <div className="qualification_calender">
                  {/* <i className="bx bx-calendar"></i> */}
                </div>
              </div>
              <div>
                <span className="qualification_rounder"></span>
                <span className="qualification_line"></span>
              </div>
            </div>
          </div>

          <div
            className={
              toggleState === 2
                ? "qualification_content qualification_content-active"
                : "qualification_content"
            }
          >
            <div className="qualification_data">
              <div>
                <h3 className="qualification_title">No Experience</h3>
                <span className="qualification_subtitle">Learning - Dhaka</span>

                {/* Date */}
                <div className="qualification_calender">
                  <i className="bx bx-calendar"></i>
                  2023 - Present
                </div>
              </div>
              <div>
                <span className="qualification_rounder"></span>
                <span className="qualification_line"></span>
              </div>
            </div>

            <div className="qualification_data">
              <div></div>
              <div>
                <span className="qualification_rounder"></span>
                <span className="qualification_line"></span>
              </div>

              {/* Empty section2 for Experience*/}
              <div>
                <h3 className="qualification_title"></h3>
                <span className="qualification_subtitle"></span>
                <div className="qualification_calender">
                  {/* <i className="bx bx-calendar"></i> */}
                </div>
              </div>
            </div>

            {/* Empty section3 for Experience */}
            <div className="qualification_data">
              <div>
                <h3 className="qualification_title"></h3>
                <span className="qualification_subtitle"></span>

                {/* Date */}
                <div className="qualification_calender">
                  {/* <i className="bx bx-calendar"></i> */}
                </div>
              </div>
              <div>
                <span className="qualification_rounder"></span>
                <span className="qualification_line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualifications;
