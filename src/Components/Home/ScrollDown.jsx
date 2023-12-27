import { FaArrowDown } from "react-icons/fa";

const ScrollDown = () => {
  return (
    <div className="text-center w-full flex items-center gap-1 justify-center">
      <span className="text-lg">Scroll Down</span>
      <FaArrowDown className="animate-bounce text-lg" />
    </div>
  );
};

export default ScrollDown;
