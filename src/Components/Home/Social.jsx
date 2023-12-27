import { FaFacebookSquare, FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Social = () => {
  return (
    <div className="grid text-lg items-center justify-end mr-5 gap-5">

      <a href="https://github.com/nymulislam" target="_black">
        <FaGithubSquare  className="text-4xl hover:text-black transition-colors duration-200"/>
      </a>

      <a href="https://linkedin.com/in/nymulislam" target="_black">
        <FaLinkedin className="text-4xl hover:text-blue-600 transition-colors duration-200" />
      </a>

      <a href="https://www.facebook.com/naym4islam" target="_black">
       <FaFacebookSquare  className="text-4xl hover:text-blue-600 transition-colors duration-200" />
      </a>
    </div>
  );
};

export default Social;
