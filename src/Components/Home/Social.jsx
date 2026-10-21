import { FaFacebookSquare, FaGithubSquare, FaWhatsapp } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Social = () => {
  return (
    <div className="grid text-lg items-center justify-center md:justify-end mr-0 md:mr-5 gap-6 pt-6 md:pt-0">
      <a
        href="https://github.com/nymulislam"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="transition-transform hover:-translate-y-1"
      >
        <FaGithubSquare className="text-4xl text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors duration-200" />
      </a>

      <a
        href="https://linkedin.com/in/nymulislam"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="transition-transform hover:-translate-y-1"
      >
        <FaLinkedin className="text-4xl text-zinc-700 dark:text-zinc-300 hover:text-blue-600 transition-colors duration-200" />
      </a>

      <a
        href="https://www.facebook.com/naym4islam"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="transition-transform hover:-translate-y-1"
      >
        <FaFacebookSquare className="text-4xl text-zinc-700 dark:text-zinc-300 hover:text-blue-600 transition-colors duration-200" />
      </a>

      <a
        href="https://wa.me/8801401380467"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="transition-transform hover:-translate-y-1"
      >
        <FaWhatsapp className="text-4xl text-zinc-700 dark:text-zinc-300 hover:text-emerald-500 transition-colors duration-200" />
      </a>
    </div>
  );
};

export default Social;
