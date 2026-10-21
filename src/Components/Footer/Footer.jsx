import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-css">
      <div className="footer_container max-w-4xl mx-auto px-6">
        <h1 className="footer_title text-2xl font-bold tracking-tight">Naym</h1>

        <ul className="footer_list text-sm">
          <li>
            <a href="#about" className="footer_link font-medium">
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="footer_link font-medium">
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="footer_link font-medium">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="footer_link font-medium">
              Contact
            </a>
          </li>
        </ul>

        <div className="footer_social gap-6">
          <a
            href="https://www.facebook.com/naym4islam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-transform hover:-translate-y-1"
          >
            <FaFacebookSquare className="text-3xl hover:text-blue-600 transition-colors duration-200" />
          </a>

          <a
            href="https://linkedin.com/in/nymulislam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-transform hover:-translate-y-1"
          >
            <FaLinkedin className="text-3xl hover:text-blue-600 transition-colors duration-200" />
          </a>

          <a
            href="https://github.com/nymulislam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-transform hover:-translate-y-1"
          >
            <FaGithubSquare className="text-3xl hover:text-black dark:hover:text-white transition-colors duration-200" />
          </a>
        </div>

        <span className="footer_copy text-xs">
          &copy; {currentYear}{" "}
          <a
            className="footer_link font-semibold hover:underline"
            href="https://linkedin.com/in/nymulislam"
            target="_blank"
            rel="noopener noreferrer"
          >
            NAYMI
          </a>{" "}
          · All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
