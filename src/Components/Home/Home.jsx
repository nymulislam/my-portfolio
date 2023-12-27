import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";

const Home = () => {
  return (
    <section className="home md:mt-28" id="home">
      <div className="grid">
        <div className="grid md:grid-cols-2 justify-center items-center grid-flow-col">
          <Data />
          <Social />
        </div>
        <div className="w-full text-center mt-16">
        <a href="#about">
          <ScrollDown />
        </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
