import Social from "./Social";
import Data from "./Data";
import ScrollDown from "./ScrollDown";

const Home = () => {
  return (
    <section className="relative home pt-12 md:pt-24 pb-16" id="home">
      {/* Racdox subtle ambient glow */}
      <div className="ambient-glow top-10 right-10 w-80 h-80 bg-blue-500/15"></div>
      <div className="ambient-glow bottom-0 left-10 w-96 h-96 bg-purple-500/10"></div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_max-content] justify-between items-center gap-10">
          <Data />
          <Social />
        </div>

        <div className="w-full text-center mt-20">
          <a href="#about">
            <ScrollDown />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
