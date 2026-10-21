import { FaArrowDown } from "react-icons/fa";

const ScrollDown = () => {
  return (
    <div className="text-center w-full flex items-center gap-2 justify-center text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer">
      <span className="text-base font-medium">Scroll Down</span>
      <FaArrowDown className="animate-bounce text-base" />
    </div>
  );
};

export default ScrollDown;
