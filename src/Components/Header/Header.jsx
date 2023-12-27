import { MdFileDownload } from "react-icons/md";

const Header = () => {
  return (
    <>
      <div className="navbar bg-gray-50 md:pt-5  shadow">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl font-semibold">NAYM</a>
        </div>
        <div className="navbar-center hidden lg:flex"></div>
        <div className="navbar-end">
          <a
            download=""
            href="https://t.ly/aR09W"
            className="btn border border-b-4 border-black border-x-neutral-content  border-t-neutral-content uppercase "
          >
            Resume{" "}
            <MdFileDownload className="animate-bounce text-xl text-black" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
