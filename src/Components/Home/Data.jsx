import { BiMessageSquareDots } from "react-icons/bi";

const Data = () => {
  return (
    <div className="ml-5">
      <h1 className="text-3xl lg:text-6xl font-semibold">Naymul Islam </h1>
      <h3 className="text-xl lg:text-3xl my-5 md:my-10">MERN stack Developer</h3>

      <p className="md:text-lg">
        I&apos;m a MERN stack developer, coding with HTML, CSS, and JavaScript.
        Passionate about easy-to-love interfaces! Ready to team up for web
        wonder?
      </p>

      <a
        href="#contact"
        className="btn border border-b-4 border-black border-x-neutral-content  border-t-neutral-content uppercase mt-16"
      >
        {" "}
        Say Hi
        <BiMessageSquareDots className="text-xl animate-pulse" />
      </a>
    </div>
  );
};

export default Data;
