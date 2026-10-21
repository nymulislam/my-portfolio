const Info = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 justify-center max-w-2xl mx-auto gap-4 sm:gap-6">
      <div className="about_box">
        <i className="bx bx-award about_icon"></i>
        <h3 className="about_title">Experience</h3>
        <span className="about_subtitle">1.5+ Years Engineering</span>
      </div>

      <div className="about_box">
        <i className="bx bx-briefcase-alt about_icon"></i>
        <h3 className="about_title">Completed</h3>
        <span className="about_subtitle">10+ Real-World Projects</span>
      </div>

      <div className="about_box">
        <i className="bx bx-support about_icon"></i>
        <h3 className="about_title">Support</h3>
        <span className="about_subtitle">Online & Responsive 24/7</span>
      </div>
    </div>
  );
};

export default Info;
