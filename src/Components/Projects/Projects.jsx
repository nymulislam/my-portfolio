import { TERipple } from "tw-elements-react";
import ScrollDown from "../Home/ScrollDown";

const Projects = () => {
  return (
    <div className="max-w-4xl mx-auto" id="projects">
      <h2 className="section_title">Projects</h2>
      <span className="section_subtitle">Showcase of My Work</span>

      <div className="grid md:grid-cols-2 gap-3 md:gap-10">
        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <TERipple rippleColor="light">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                className="rounded-t-lg h-72"
                src="https://i.postimg.cc/T37M2fpc/Ilm-Med-preview.png"
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
          </TERipple>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              IlmMed Solution
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Welcome to IlmMed Solution! Your personalized health management
              platform for convenient and efficient healthcare services. 🏥
            </p>
            <TERipple rippleColor="light">
              <a href="https://ilm-med-solution.vercel.app/" target="_black">
                <button className="btn border border-b-4 border-black border-x-neutral-content  border-t-neutral-content uppercase">
                  Preview
                </button>
              </a>
            </TERipple>
          </div>
        </div>

        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <TERipple rippleColor="light">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                className="rounded-t-lg h-72"
                src="https://i.postimg.cc/Gm4w2t6m/Job-Heaven-Preview.png"
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
          </TERipple>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Job Heaven
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              💡 Revolutionizing job search! Seamless recruitment on our
              tech-driven platform, connecting seekers and employers
              effortlessly.
            </p>
            <TERipple rippleColor="light">
              <a href="https://job-heaven.vercel.app/" target="_black">
                <button className="btn border border-b-4 border-black border-x-neutral-content  border-t-neutral-content uppercase">
                  Preview
                </button>
              </a>
            </TERipple>
          </div>
        </div>

        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <TERipple rippleColor="light">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                className="rounded-t-lg h-72"
                src="https://i.postimg.cc/hvK8yJV8/Car-Universe-preview.png"
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
          </TERipple>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Car Universe
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Explore our MERN Stack app, dedicated to showcasing premium
              automotive products tailored for our upcoming website.🚗✨
            </p>
            <TERipple rippleColor="light">
              <a href="https://car-universe.vercel.app/" target="_black">
                <button className="btn border border-b-4 border-black border-x-neutral-content  border-t-neutral-content uppercase">
                  Preview
                </button>
              </a>
            </TERipple>
          </div>
        </div>

        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <TERipple rippleColor="light">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                className="rounded-t-lg h-72"
                src="https://i.postimg.cc/QCB7npHT/Training-Ninja-preview.png"
                alt=""
              />
              <a href="#!">
                <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
              </a>
            </div>
          </TERipple>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Training Ninja
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Explore the Training Ninja platform and elevate your web
              development journey. Start learning with style and efficiency! 🚀
            </p>
            <TERipple rippleColor="light">
              <a href="https://training-ninja.vercel.app/" target="_black">
                <button className="btn border border-b-4 border-black border-x-neutral-content  border-t-neutral-content uppercase">
                  Preview
                </button>
              </a>
            </TERipple>
          </div>
        </div>
      </div>
      <div className="w-full text-center mt-16">
        <a href="#contact">
          <ScrollDown />
        </a>
        </div>
    </div>
  );
};

export default Projects;
