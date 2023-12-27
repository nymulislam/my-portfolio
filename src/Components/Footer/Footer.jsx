import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-css">
      <div className="footer_container container">
        <h1 className="text-center text-2xl mb-2 font-semibold">Naym</h1>

        <ul className="footer_list">
          <li className="">
            <a href="#about" className="footer_link">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="footer_link">
              Skills
            </a>
          </li>
          <li className="">
            <a href="#contact" className="footer_link">
              Contact
            </a>
          </li>
        </ul>

        <div className="footer_social">
          <a href="https://www.facebook.com/naym4islam" target="_black">
            <FaFacebookSquare className="text-4xl hover:text-blue-600 transition-colors duration-200" />
          </a>

          <a href="https://linkedin.com/in/nymulislam" target="_black">
            <FaLinkedin className="text-4xl hover:text-blue-600 transition-colors duration-200" />
          </a>

          <a href="https://github.com/nymulislam" target="_black">
            <FaGithubSquare className="text-4xl hover:text-black transition-colors duration-200" />
          </a>
        </div>

        <span className="footer_copy">
          &copy; {currentYear}{" "}
          <a
            className="footer_link"
            href="/https://linkedin.com/in/nymulislam"
            target="_blank"
          >
            NAYMI
          </a>{" "}
          All Rights Reserved.{""}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
